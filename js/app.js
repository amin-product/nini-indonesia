/**
 * 印尼行程移动端网页 — 主程序
 * 数据来自 js/data.js (window.TRIP_DATA)
 */
(function () {
  'use strict';

  const DATA = window.TRIP_DATA || {};
  const days = DATA.days || [];
  const hotels = DATA.hotels || [];
  const flights = DATA.flights || [];
  const transports = DATA.transports || [];
  const foods = DATA.foods || [];
  const guides = DATA.guides || {};

  const state = {
    tab: 'trip',
    // 当前查看日期（用户在日期条上选的）
    dateIndex: 0,
    // 真实今天在行程中的下标；-1 表示真实今天不在行程日期范围内
    realTodayIndex: -1,
    foodFilter: '全部',
    foodSearch: '',
    selectedFood: null,
    // 工具页：home=入口首页，其余为各功能详情
    toolScreen: 'home',
  };

  const RATE_STORAGE_KEY = 'xiaoni_fx_rate_v1';
  const rateState = {
    rate: (DATA.meta && DATA.meta.exchangeRate && DATA.meta.exchangeRate.idrPerCny) || 2652,
    date: (DATA.meta && DATA.meta.exchangeRate && DATA.meta.exchangeRate.asOf) || '2026-09-18',
    time: '',
    source: 'offline', // 'network' | 'cached' | 'offline'
    updating: false,
  };

  const WEATHER_STORAGE_KEY = 'chidaoxiaoni_weather_cache';
  const WEATHER_CACHE_TTL = 12 * 60 * 60 * 1000; // 12 小时
  const weatherState = {
    updatedAt: 0,
    locations: {}, // key: "lat,lon" -> { "YYYY-MM-DD": { weatherCode, tempMin, tempMax, pop, precip, heavyRain } }
    updating: false,
  };

  function mapsSearchUrl(name, address) {
    const q = [name, address].filter(Boolean).join(' ').trim();
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
  }

  function formatIsoDate(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  function initRateState() {
    try {
      const raw = localStorage.getItem(RATE_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed.rate === 'number' && parsed.rate > 0) {
          rateState.rate = parsed.rate;
          rateState.date = parsed.date || '';
          rateState.time = parsed.time || '';
          const today = formatIsoDate(new Date());
          rateState.source = (parsed.date === today && parsed.source === 'network') ? 'network' : 'cached';
        }
      }
    } catch (e) {}
  }

  async function checkAutoRateUpdate() {
    const today = formatIsoDate(new Date());
    if (rateState.source === 'network' && rateState.date === today) {
      return;
    }
    if (!navigator.onLine) {
      return;
    }
    await fetchLatestRate(false);
  }

  async function fetchLatestRate(isManual = false) {
    if (rateState.updating) return;
    rateState.updating = true;
    updateRateRefreshUI(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      const res = await fetch('https://open.er-api.com/v6/latest/CNY', {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const liveRate = data && data.rates && data.rates.IDR;
      if (typeof liveRate !== 'number' || liveRate <= 0) {
        throw new Error('Invalid rate');
      }

      const now = new Date();
      const today = formatIsoDate(now);
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      rateState.rate = liveRate;
      rateState.date = today;
      rateState.time = timeStr;
      rateState.source = 'network';

      try {
        localStorage.setItem(RATE_STORAGE_KEY, JSON.stringify({
          rate: liveRate,
          date: today,
          time: timeStr,
          source: 'network',
        }));
      } catch (e) {}

      if (state.tab === 'rate') {
        renderRate();
      }
      if (isManual) {
        showToast('汇率已更新至最新');
      }
    } catch (err) {
      if (isManual) {
        showToast('获取最新汇率失败，已保留当前汇率');
      }
    } finally {
      rateState.updating = false;
      updateRateRefreshUI(false);
    }
  }

  function updateRateRefreshUI(isUpdating) {
    const btn = document.getElementById('btn-refresh-rate');
    if (!btn) return;
    btn.disabled = isUpdating;
    const icon = btn.querySelector('.rate-refresh-icon');
    const txt = btn.querySelector('.rate-refresh-text');
    if (icon) icon.classList.toggle('spin', isUpdating);
    if (txt) txt.textContent = isUpdating ? '更新中' : '更新汇率';
  }

  // ---------------------------------------------------------------------------
  // 每日天气模块 (Open-Meteo API)
  // ---------------------------------------------------------------------------
  function locKey(loc) {
    if (!loc || typeof loc.latitude !== 'number' || typeof loc.longitude !== 'number') return '';
    return `${loc.latitude.toFixed(4)},${loc.longitude.toFixed(4)}`;
  }

  function weatherCodeToEmoji(code) {
    if (code === 0) return '☀️';
    if (code === 1 || code === 2) return '⛅';
    if (code === 3) return '☁️';
    if (code === 45 || code === 48) return '🌫️';
    if ([51, 53, 55, 61, 80].includes(code)) return '🌦️';
    if ([63, 65, 81, 82].includes(code)) return '🌧️';
    if ([95, 96, 99].includes(code)) return '⛈️';
    return '🌦️';
  }

  function isHeavyRainRisk(weatherCode, pop, precip) {
    // 1. 强对流/暴雨天气且降水概率>=60%
    if ([65, 82, 95, 96, 99].includes(weatherCode) && pop >= 60) return true;
    // 2. 降雨概率>=70% 且累计降雨量>=15mm
    if (pop >= 70 && precip >= 15) return true;
    // 3. 极端累计降雨量>=25mm
    if (precip >= 25) return true;
    return false;
  }

  function initWeatherState() {
    try {
      const raw = localStorage.getItem(WEATHER_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed.updatedAt === 'number' && parsed.locations) {
          weatherState.updatedAt = parsed.updatedAt;
          weatherState.locations = parsed.locations;
        }
      }
    } catch (e) {}
  }

  async function checkWeatherUpdate(force = false) {
    if (!navigator.onLine) {
      if (state.tab === 'trip') renderTrip();
      return;
    }
    const now = Date.now();
    if (!force && weatherState.updatedAt && (now - weatherState.updatedAt < WEATHER_CACHE_TTL)) {
      return;
    }
    await fetchBatchWeather();
  }

  async function fetchBatchWeather() {
    if (weatherState.updating) return;

    const uniqueLocs = [];
    const seen = new Set();
    for (const d of days) {
      const loc = d.weatherLocation;
      const k = locKey(loc);
      if (k && !seen.has(k)) {
        seen.add(k);
        uniqueLocs.push({ key: k, lat: loc.latitude, lon: loc.longitude, name: loc.displayName });
      }
    }
    if (!uniqueLocs.length) return;

    weatherState.updating = true;
    try {
      const lats = uniqueLocs.map(l => l.lat).join(',');
      const lons = uniqueLocs.map(l => l.lon).join(',');
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lons}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum&timezone=auto&forecast_days=16`;

      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 8000);
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timer);

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const list = Array.isArray(data) ? data : [data];
      if (list.length !== uniqueLocs.length) {
        throw new Error('Mismatched locations response');
      }

      const newLocations = {};
      for (let i = 0; i < uniqueLocs.length; i++) {
        const k = uniqueLocs[i].key;
        const item = list[i];
        const daily = item && item.daily;
        if (!daily || !Array.isArray(daily.time)) continue;

        const dayMap = {};
        for (let j = 0; j < daily.time.length; j++) {
          const dateStr = daily.time[j];
          const code = daily.weather_code ? daily.weather_code[j] : 0;
          const tMax = daily.temperature_2m_max ? daily.temperature_2m_max[j] : 0;
          const tMin = daily.temperature_2m_min ? daily.temperature_2m_min[j] : 0;
          const pop = daily.precipitation_probability_max ? daily.precipitation_probability_max[j] : 0;
          const precip = daily.precipitation_sum ? daily.precipitation_sum[j] : 0;

          dayMap[dateStr] = {
            weatherCode: code,
            tempMin: Math.round(tMin),
            tempMax: Math.round(tMax),
            pop: Math.round(pop),
            precip: precip,
            heavyRain: isHeavyRainRisk(code, pop, precip),
          };
        }
        newLocations[k] = dayMap;
      }

      weatherState.updatedAt = Date.now();
      weatherState.locations = newLocations;

      try {
        localStorage.setItem(WEATHER_STORAGE_KEY, JSON.stringify({
          updatedAt: weatherState.updatedAt,
          locations: weatherState.locations,
        }));
      } catch (e) {}

      if (state.tab === 'trip') {
        renderTrip();
      }
    } catch (err) {
      console.warn('[Weather] 获取天气失败，已静默降级:', err);
    } finally {
      weatherState.updating = false;
    }
  }

  function renderWeatherBar(day) {
    if (!navigator.onLine) {
      return '';
    }
    const now = Date.now();
    if (!weatherState.updatedAt || (now - weatherState.updatedAt >= WEATHER_CACHE_TTL)) {
      return '';
    }
    const loc = day.weatherLocation;
    const k = locKey(loc);
    if (!k) return '';

    const locData = weatherState.locations && weatherState.locations[k];
    const info = locData && locData[day.date];
    if (!info) return '';

    const icon = weatherCodeToEmoji(info.weatherCode);
    const rainProb = typeof info.pop === 'number' ? info.pop : 0;
    const riskLine = info.heavyRain ? '<div class="weather-risk">⚠️ 强降雨风险</div>' : '';

    return `
      <div class="day-weather">
        <div class="weather-main">
          <span class="weather-icon">${icon}</span>
          <span class="weather-loc">${esc(loc.displayName || '')}</span>
          <span class="weather-temp">${info.tempMin}° / ${info.tempMax}°</span>
          <span class="weather-rain">降雨 ${rainProb}%</span>
        </div>
        ${riskLine}
      </div>
    `;
  }

  function bindOnlineStatus() {
    window.addEventListener('online', () => {
      checkWeatherUpdate();
    });
    window.addEventListener('offline', () => {
      if (state.tab === 'trip') {
        renderTrip();
      }
    });
  }

  // ---------------------------------------------------------------------------
  // 初始化
  // ---------------------------------------------------------------------------
  function init() {
    initRateState();
    initWeatherState();

    // 真实今天（系统日期）与行程日期范围的关系，只在这里判断一次
    state.realTodayIndex = computeRealTodayIndex();

    // 默认查看日期：真实今天在范围内 → 选中今天；早于行程 → 9/24；晚于行程 → 最后一天
    if (state.realTodayIndex >= 0) {
      state.dateIndex = state.realTodayIndex;
    } else {
      const t = todayStamp();
      state.dateIndex = t < dayStamp(days[0].date) ? 0 : days.length - 1;
    }

    bindNav();
    bindSwipe();
    bindSheet();
    bindLightbox();
    bindToolHistory();
    bindOnlineStatus();
    renderDateStrip();
    renderAllTabs();
    switchTab('trip', false);

    checkAutoRateUpdate();
    checkWeatherUpdate();
  }

  /** 把 'YYYY-MM-DD' 解析为本地时区当天 00:00 的时间戳，避免 UTC 解析偏移 */
  function dayStamp(iso) {
    const p = String(iso).split('-').map(Number);
    return new Date(p[0], p[1] - 1, p[2]).getTime();
  }

  /** 系统日期（真实今天）的当天 00:00 时间戳 */
  function todayStamp() {
    const n = new Date();
    return new Date(n.getFullYear(), n.getMonth(), n.getDate()).getTime();
  }

  /**
   * 真实今天在行程中的下标。
   * 只有系统日期与某天日期「完全一致」才算今天；不在 9/24–10/4 内返回 -1。
   */
  function computeRealTodayIndex() {
    const t = todayStamp();
    return days.findIndex(d => dayStamp(d.date) === t);
  }

  /** 真实今天所在地（用于「吃什么」的今日推荐）；不在行程期间返回空 */
  function realTodayLocation() {
    if (state.realTodayIndex < 0) return { areas: [], label: '' };
    const d = days[state.realTodayIndex];
    return { areas: d.areas || [], label: d.areaLabel || '' };
  }

  // ---------------------------------------------------------------------------
  // 导航
  // ---------------------------------------------------------------------------
  function bindNav() {
    document.querySelectorAll('#bottom-nav .nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        // 每次从底部导航进入「工具」都回到入口首页
        if (btn.dataset.tab === 'tools') state.toolScreen = 'home';
        switchTab(btn.dataset.tab);
      });
    });
  }

  function switchTab(tab, save = true) {
    state.tab = tab;
    document.querySelectorAll('#bottom-nav .nav-item').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    // 顶部日期条只在「行程」页出现
    document.body.classList.toggle('hide-header', tab !== 'trip');
    ['trip', 'food', 'rate', 'tools'].forEach(t => {
      const el = document.getElementById('page-' + t);
      el.hidden = t !== tab;
    });
    if (tab === 'trip') renderTrip();
    if (tab === 'food') renderFood();
    if (tab === 'rate') renderRate();
    if (tab === 'tools') renderTools();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ---------------------------------------------------------------------------
  // 日期条
  // ---------------------------------------------------------------------------
  function renderDateStrip() {
    const list = document.getElementById('date-list');
    list.innerHTML = '';
    days.forEach((d, i) => {
      const chip = document.createElement('button');
      chip.className = 'date-chip' + (i === state.dateIndex ? ' selected' : '');
      chip.type = 'button';
      chip.setAttribute('role', 'tab');
      chip.setAttribute('aria-selected', String(i === state.dateIndex));
      const title = d.short.length <= 7 ? d.short : d.short.slice(0, 7) + '…';
      chip.innerHTML = `<div class="d-label">${d.label}<span class="d-week">${d.weekday}</span></div>
                        <div class="d-title">${title}</div>`;
      if (i === state.realTodayIndex) {
        chip.classList.add('is-today');
        chip.querySelector('.d-label').innerHTML += '<span class="today-badge">今天</span>';
      }
      chip.addEventListener('click', () => selectDate(i));
      list.appendChild(chip);
    });
    scrollChipIntoView(state.dateIndex);
  }

  function selectDate(i) {
    if (i < 0) i = 0;
    if (i >= days.length) i = days.length - 1;
    state.dateIndex = i;
    renderDateStrip();
    renderTrip();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function scrollChipIntoView(i) {
    const list = document.getElementById('date-list');
    const chip = list.children[i];
    if (!chip) return;
    const center = list.clientWidth / 2;
    const left = chip.offsetLeft + chip.clientWidth / 2 - center;
    list.scrollTo({ left: left, behavior: 'smooth' });
  }

  // ---------------------------------------------------------------------------
  // 左右滑动切日
  // ---------------------------------------------------------------------------
  function bindSwipe() {
    const main = document.getElementById('page-trip');
    let sx = 0, sy = 0, ex = 0, ey = 0, tracking = false;
    main.addEventListener('touchstart', e => {
      if (e.touches.length !== 1) return;
      sx = e.touches[0].clientX;
      sy = e.touches[0].clientY;
      ex = sx; ey = sy;
      tracking = true;
    }, { passive: true });
    main.addEventListener('touchmove', e => {
      if (!tracking || e.touches.length !== 1) return;
      ex = e.touches[0].clientX;
      ey = e.touches[0].clientY;
    }, { passive: true });
    main.addEventListener('touchend', () => {
      if (!tracking) return;
      tracking = false;
      const dx = ex - sx, dy = ey - sy;
      if (Math.abs(dx) < 60 || Math.abs(dy) > Math.abs(dx) * 1.2) return;
      if (dx > 0 && state.dateIndex > 0) selectDate(state.dateIndex - 1);
      if (dx < 0 && state.dateIndex < days.length - 1) selectDate(state.dateIndex + 1);
    }, { passive: true });
  }

  // ---------------------------------------------------------------------------
  // 行程页渲染
  // ---------------------------------------------------------------------------
  function renderTrip() {
    const page = document.getElementById('page-trip');
    const day = days[state.dateIndex];
    const html = `
      <header class="day-header">
        <div class="day-meta">${fmtDate(day.date)} · DAY ${day.dayIndex}</div>
        <h1 class="day-title">${esc(day.title)}</h1>
        <p class="day-route">${esc(day.route)}</p>
        <div class="day-tags">${day.areas.map(a => `<span class="tag">${esc(a)}</span>`).join('')}</div>
        ${renderWeatherBar(day)}
      </header>
      ${renderFlights(day)}
      ${renderTimeline(day)}
      ${renderUntimed(day)}
      ${renderDayImages(day)}
      ${renderHotel(day)}
      ${renderClothing(day)}
      ${renderTomorrow(day)}
      <div style="height:20px"></div>
    `;
    page.innerHTML = html;
    page.querySelectorAll('[data-guide]').forEach(btn => {
      btn.addEventListener('click', () => openGuideModal(btn.dataset.guide));
    });
  }

  function renderFlights(day) {
    if (!day.flights.length) return '';
    const cards = day.flights.map(f => {
      const multi = f.segments && f.segments.length > 1;
      const legs = multi ? `
        <div class="flight-legs">
          ${f.segments.map((sg, i) => `
            <div class="flight-leg">
              <span class="flight-leg-idx">${i + 1}</span>
              <div class="flight-leg-main">
                <div class="flight-leg-no">${esc(sg.airline)} ${esc(sg.flightNo)}</div>
                <div class="flight-leg-route">
                  ${esc(sg.fromCity)} <b>${esc(sg.fromCode)}</b>${sg.fromTerminal ? ` ${esc(sg.fromTerminal)}` : ''}
                  <span class="sep">${esc(sg.dep)} → ${esc(sg.arr)}</span>
                  ${esc(sg.toCity)} <b>${esc(sg.toCode)}</b>${sg.toTerminal ? ` ${esc(sg.toTerminal)}` : ''}
                </div>
              </div>
            </div>`).join('')}
        </div>` : '';
      const airportLine = (f.fromAirport || f.toAirport)
        ? `<div class="flight-airports">${esc(f.fromAirport || '')} ${f.fromTerminal ? `<i>${esc(f.fromTerminal)}</i>` : ''} → ${esc(f.toAirport || '')} ${f.toTerminal ? `<i>${esc(f.toTerminal)}</i>` : ''}</div>`
        : '';
      const noLine = f.flightNo
        ? `<div class="flight-no">✈️ ${esc(f.airline || '')} <b>${esc(f.flightNo)}</b></div>`
        : `<div class="flight-no-missing">航班号：${esc(f.flightNoNote || '未提供')}</div>`;
      return `
      <div class="card flight-card">
        <div class="flight-route">
          <div class="flight-city flight-from">
            <span class="code">${esc(f.fromCode || f.from)}</span>
            <span class="name">${esc(f.from)}</span>
            <span class="time">${f.dep || '--:--'}</span>
          </div>
          <div class="flight-arrow">✈️</div>
          <div class="flight-city flight-to">
            <span class="code">${esc(f.toCode || f.to)}</span>
            <span class="name">${esc(f.to)}</span>
            <span class="time">${f.arr || '--:--'}</span>
          </div>
        </div>
        ${noLine}
        ${airportLine}
        ${f.layover ? `<div class="flight-meta"><span>🔁 ${esc(f.layover)}</span></div>` : ''}
        ${f.timezoneNote ? `<div class="flight-hint">🕐 ${esc(f.timezoneNote)}</div>` : ''}
        ${legs}
      </div>`;
    }).join('');
    return `<div><div class="section-title">✈️ 航班</div>${cards}</div>`;
  }

  const ICON = { flight: '✈️', transport: '🚗', activity: '🌋', leisure: '🎫', hotel: '🏨', note: '📌' };

  /** 从 Excel 备注里识别交通方式（仅做归类展示，不改动原文） */
  function transportKind(text) {
    const s = String(text || '');
    if (s.includes('包车')) return '包车';
    if (s.includes('接送')) return '接送';
    if (s.includes('打车')) return '打车';
    if (s.includes('吉普')) return '吉普车';
    if (s.includes('步行')) return '步行';
    return '';
  }

  /**
   * 时间轴 = 当天行程的总骨架。
   * 航班：只做简洁展示（航班号 + 航段），详细信息看上面的航班卡。
   * 普通交通：直接在这里展示必要信息（起讫点、时长、方式、Excel 备注），不再另出交通大卡片。
   */
  function timelineRow(it) {
    const base = {
      icon: ICON[it.type] || '•',
      time: it.time || '--:--',
      title: it.title,
      chips: [],
      detail: it.detail,
      note: it.note,
      guideId: it.guideId,
    };

    if (it.type === 'flight' && it.flightIndex != null) {
      const f = flights[it.flightIndex];
      if (f) {
        base.title = `${f.flightNo || ''}${f.flightNo ? ' ' : ''}${f.from} → ${f.to}`.trim();
        base.time = f.dep || base.time;
        const segs = (f.segments && f.segments.length > 1) ? f.segments : null;
        // 多段航班（如 10/4 泗水 → 香港 → 上海）：逐段简洁列出，
        // 行程页时间轴只有一行，否则第二段会看不到；其余细节仍在航班卡里
        base.detail = segs
          ? segs.map(sg => `${sg.flightNo} ${sg.fromCity} ${sg.dep} → ${sg.toCity} ${sg.arr}`).join('\n')
          : '';
        base.note = '';
      }
      return base;
    }

    if (it.type === 'transport' && it.transportIndex != null) {
      const t = transports[it.transportIndex];
      if (t) {
        base.title = `${t.from} → ${t.to}`;
        base.time = t.arr ? `${t.dep}–${t.arr}` : t.dep;
        const kind = transportKind(`${t.detail} ${t.note}`);
        if (kind) base.chips.push(kind);
        if (t.duration) base.chips.push(t.duration);
        base.detail = t.detail || t.note || '';
      }
      return base;
    }

    return base;
  }

  function renderTimeline(day) {
    if (!day.items.length) return '';
    const items = day.items.map(it => {
      const r = timelineRow(it);
      const chips = r.chips.length
        ? `<div class="tl-chips">${r.chips.map(c => `<span class="tl-chip">${esc(c)}</span>`).join('')}</div>`
        : '';
      return `
      <div class="tl-item ${it.type}">
        <div class="tl-dot">${r.icon}</div>
        <div class="tl-time">${esc(r.time)}</div>
        <div class="tl-title">${esc(r.title)}</div>
        ${chips}
        ${r.detail ? `<div class="tl-detail">${esc(r.detail)}</div>` : ''}
        ${r.note ? `<div class="tl-note">${esc(r.note)}</div>` : ''}
        ${r.guideId ? `<button class="tl-guide-btn" data-guide="${esc(r.guideId)}">查看攻略</button>` : ''}
      </div>
    `;
    }).join('');
    return `<div class="card">
              <div class="section-title">🕐 时间轴</div>
              <div class="timeline">${items}</div>
            </div>`;
  }

  function renderItemImages(imgs) {
    if (!imgs.length) return '';
    return `<div class="tl-images">
      ${imgs.map(src => `<img class="tl-thumb" src="${esc(src)}" alt="参考图" loading="lazy">`).join('')}
    </div>`;
  }

  function renderUntimed(day) {
    if (!day.untimed.length) return '';
    const items = day.untimed.map(it => `
      <div class="untimed-item">
        <div class="untimed-title">${ICON[it.type] || '•'} ${esc(it.title)}</div>
        ${it.detail ? `<div class="untimed-detail">${esc(it.detail)}</div>` : ''}
        ${it.note ? `<div class="tl-note" style="margin-top:8px">${esc(it.note)}</div>` : ''}
      </div>
    `).join('');
    return `<div class="card"><div class="section-title">📌 当日其他安排</div>
            <div class="untimed-list">${items}</div></div>`;
  }

  function renderDayImages(day) {
    if (!day.images.length) return '';
    const imgs = day.images.map(src => `<img class="day-ref-thumb" src="${esc(src)}" alt="路线参考图" loading="lazy">`).join('');
    return `<div class="card"><div class="section-title">🗺️ 路线参考图（来自 Excel）</div>
            <div class="day-ref-strip">${imgs}</div></div>`;
  }

  function renderHotel(day) {
    if (!day.hotel) {
      return `<div class="card"><div class="section-title">🏨 住宿</div><p class="card-sub">今日返程，无住宿安排。</p></div>`;
    }
    const h = day.hotel;
    const addr = esc(h.address);
    return `<div class="card hotel-card">
      <div class="hotel-name-wrap">
        <h3 class="hotel-name">${esc(h.name)}</h3>
        ${h.nameEn ? `<span class="hotel-name-en">${esc(h.nameEn)}</span>` : ''}
        ${h.inherited ? `<span class="hotel-inherited">沿用前一晚</span>` : ''}
      </div>
      <p class="hotel-address">${addr}</p>
      ${h.notes.length ? `<div class="hotel-notes">${h.notes.map(n => `<div>• ${esc(n)}</div>`).join('')}</div>` : ''}
      <div class="hotel-actions">
        <button class="btn" data-copy="${addr}">📋 复制地址</button>
        <a class="btn btn-map" href="${mapsSearchUrl(h.name, h.address)}" target="_blank" rel="noopener noreferrer">🗺️ 地图</a>
      </div>
      ${h.images.length ? `<div class="hotel-screens">${h.images.map(src => `<img src="${esc(src)}" alt="酒店参考图" loading="lazy">`).join('')}</div>` : ''}
    </div>`;
  }

  function renderClothing(day) {
    if (!day.clothing.length) return '';
    const rows = day.clothing.map(c => `
      <div class="clothing-item" style="grid-template-columns:1fr">
        <div style="font-weight:700;font-size:14px;margin-bottom:4px">${esc(c.activity)}</div>
      </div>
      <div class="clothing-item">
        <span class="c-label">上装</span><span class="c-val">${esc(c.top)}</span>
        <span class="c-label">鞋履</span><span class="c-val">${esc(c.shoes)}</span>
        <span class="c-label">随身</span><span class="c-val">${esc(c.bag)}</span>
      </div>
    `).join('');
    return `<div class="card"><div class="section-title">👕 今日穿搭</div>
            <div class="clothing-list">${rows}</div></div>`;
  }

  /**
   * 明天首项行程的时间文案。
   * 按事项的实际类型/内容判断，不臆造 Excel 里没有的「出发时间」。
   */
  function firstItemTimeLabel(it) {
    if (!it || !it.time) return '';
    const t = it.time;
    if (it.type === 'flight') return `${t} 航班`;
    if (it.type === 'transport') return `${t} 出发`;
    if (it.type === 'activity') return `${t} 开始`;

    const text = `${it.title || ''} ${it.detail || ''}`;
    if (/航班|飞机/.test(text)) return `${t} 航班`;
    if (/出发|包车|接送|前往|去酒店|赶车|集合/.test(text)) return `${t} 出发`;
    if (/游玩|一日游|景点|景区|徒步|浮潜|日出|日落|游览|参观/.test(text)) return `${t} 开始`;
    return `首项行程 ${t}`;
  }

  function renderTomorrow(day) {
    if (day.isLastDay) return '';
    const tmr = days[state.dateIndex + 1];
    const tmrCloth = tmr.clothing[0] || {};
    const first = tmr.items[0] || tmr.untimed[0] || {};
    const time = firstItemTimeLabel(first);
    // 只有正在查看「真实今天」时才做晚间加重，避免浏览别的日期时被误导
    const evening = state.realTodayIndex === state.dateIndex && new Date().getHours() >= 18;
    const clothingLines = [];
    if (tmrCloth.top) clothingLines.push(`👕 ${tmrCloth.top}`);
    if (tmrCloth.shoes) clothingLines.push(`👟 ${tmrCloth.shoes}`);
    if (tmrCloth.bag) clothingLines.push(`🎒 ${tmrCloth.bag}`);
    return `<div class="card tomorrow-card ${evening ? 'evening' : ''}">
      <div class="section-title">🌙 明天准备</div>
      <div class="tomorrow-meta">明天 · ${fmtDate(tmr.date)}</div>
      <h3 class="tomorrow-title">${esc(tmr.title)}</h3>
      ${time ? `<div class="tomorrow-time">⏰ ${esc(time)}</div>` : ''}
      <ul class="tomorrow-list">${clothingLines.map(l => `<li>${esc(l)}</li>`).join('')}</ul>
      <button class="btn btn-primary" id="btn-tomorrow">查看明天完整行程</button>
    </div>`;
  }

  // ---------------------------------------------------------------------------
  // 攻略弹窗（用简易 alert 风格浮层，避免引入复杂弹窗）
  // ---------------------------------------------------------------------------
  function openGuideModal(guideId) {
    const g = guides[guideId];
    if (!g) return;
    const blocks = g.blocks.map(b => `
      <li style="margin-bottom:10px">
        <strong style="color:var(--primary)">${esc(b.time)}</strong>
        ${b.spot ? ` · ${esc(b.spot)}` : ''}
        <div>${esc(b.content)}</div>
        ${b.note ? `<div style="font-size:12px;color:var(--text-hint);margin-top:2px">${esc(b.note)}</div>` : ''}
      </li>
    `).join('');
    const html = `<div style="max-height:70dvh;overflow:auto">
      <h2 style="margin:0 0 8px;font-size:18px">${esc(g.displayName)}</h2>
      <p style="font-size:13px;color:var(--text-weak);margin:0 0 12px">${esc(g.flow)}</p>
      <h3 style="font-size:13px;color:var(--text-hint);margin:12px 0 6px">时间安排</h3>
      <ol style="padding-left:18px;font-size:14px">${blocks}</ol>
      ${g.cautions.length ? `<h3 style="font-size:13px;color:var(--text-hint);margin:12px 0 6px">注意事项</h3><ul style="padding-left:18px;font-size:14px">${g.cautions.map(c => `<li>${esc(c)}</li>`).join('')}</ul>` : ''}
      ${g.extras.length ? `<h3 style="font-size:13px;color:var(--text-hint);margin:12px 0 6px">额外需带</h3><ul style="padding-left:18px;font-size:14px">${g.extras.map(c => `<li>${esc(c)}</li>`).join('')}</ul>` : ''}
      ${g.priceNote ? `<p style="font-size:13px;background:var(--accent-soft);padding:8px 10px;border-radius:8px">💰 ${esc(g.priceNote)}</p>` : ''}
      ${g.links.length ? `<div style="margin-top:12px">${g.links.map(l => `<a href="${esc(l)}" target="_blank" rel="noopener" style="display:block;font-size:13px;margin:4px 0">${esc(l)}</a>`).join('')}</div>` : ''}
    </div>`;
    showModal(html);
  }

  function showModal(html) {
    const wrapper = document.createElement('div');
    wrapper.className = 'sheet';
    wrapper.innerHTML = `<div class="sheet-backdrop" data-close-modal></div>
      <div class="sheet-panel" role="dialog" aria-modal="true" style="padding:16px">
        <div class="sheet-handle" data-close-modal></div>${html}
      </div>`;
    document.body.appendChild(wrapper);
    requestAnimationFrame(() => wrapper.hidden = false);
    const close = () => { wrapper.hidden = true; setTimeout(() => wrapper.remove(), 250); };
    wrapper.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', close));
  }

  // ---------------------------------------------------------------------------
  // 吃什么页面
  // ---------------------------------------------------------------------------
  // 筛选维度只有「地区」：只列能明确归属的地区。
  // 全国普遍存在 / 无法归属的食物 region 为空数组，只出现在「全部」里。
  const FOOD_REGION_ORDER = ['东爪哇', '巴厘', '科莫多/弗洛勒斯', '吉隆坡机场', '香港机场'];

  function foodRegions() {
    const present = new Set();
    foods.forEach(f => (f.region || []).forEach(r => present.add(r)));
    return FOOD_REGION_ORDER.filter(r => present.has(r));
  }

  function renderFood() {
    const page = document.getElementById('page-food');
    // 「今日推荐」只看真实今天，与行程页当前浏览的日期无关
    const loc = realTodayLocation();
    const locHint = loc.areas.length
      ? `<div class="food-loc">
           <span class="food-loc-line">📍 今天${esc(loc.label)}</span>
           <span class="food-loc-sub">试试这些当地食物</span>
         </div>`
      : '';
    const filters = ['全部', ...foodRegions()];
    if (!filters.includes(state.foodFilter)) state.foodFilter = '全部';
    page.innerHTML = `
      <div class="food-search-wrap">
        <input type="search" class="food-search" id="food-search" placeholder="搜索美食 / 餐厅" value="${esc(state.foodSearch)}">
        ${locHint}
        <div class="food-filter" id="food-filter">
          ${filters.map(f => `
            <button type="button" data-filter="${esc(f)}" class="${state.foodFilter === f ? 'active' : ''}">${esc(f)}</button>
          `).join('')}
        </div>
      </div>
      <div class="food-grid" id="food-grid"></div>
      <p class="food-hint" style="margin:14px 0 80px;padding:0 4px">
        补充内容（地区归属 / 简介 / 食材）由 AI 依据食物名及网络资料整理，非 Excel 原文。
      </p>
    `;
    document.getElementById('food-search').addEventListener('input', e => {
      state.foodSearch = e.target.value.trim();
      renderFoodGrid(loc.areas);
    });
    document.getElementById('food-filter').addEventListener('click', e => {
      if (e.target.dataset.filter) {
        state.foodFilter = e.target.dataset.filter;
        renderFoodGrid(loc.areas);
        // 更新按钮 active 态
        page.querySelectorAll('#food-filter button').forEach(b => b.classList.toggle('active', b.dataset.filter === state.foodFilter));
      }
    });
    renderFoodGrid(loc.areas);
  }

  function renderFoodGrid(todayAreas) {
    const grid = document.getElementById('food-grid');
    if (!grid) return;
    // 真实今天不在行程期间时不做任何地区推荐，只展示完整食物库
    const areas = todayAreas || [];
    let list = foods.slice();
    const q = state.foodSearch.toLowerCase();
    if (q) {
      list = list.filter(f => {
        const matchBasic = (f.nameId && f.nameId.toLowerCase().includes(q)) ||
          (f.nameCn && f.nameCn.toLowerCase().includes(q)) ||
          (f.desc && f.desc.toLowerCase().includes(q)) ||
          (f.englishName && f.englishName.toLowerCase().includes(q)) ||
          (f.subtitle && f.subtitle.toLowerCase().includes(q)) ||
          (f.ingredients && f.ingredients.toLowerCase().includes(q));
        if (matchBasic) return true;
        if (f.dishes && Array.isArray(f.dishes)) {
          return f.dishes.some(d => (d.name && d.name.toLowerCase().includes(q)) || (d.note && d.note.toLowerCase().includes(q)));
        }
        return false;
      });
    }
    // 只按地区筛选；无法归属地区的食物不会命中任何地区
    const filter = state.foodFilter;
    if (filter !== '全部') {
      list = list.filter(f => (f.region || []).includes(filter));
    }
    // 排序：真实今天所在地的食物优先；无搜索/地区筛选时才调整顺序
    if (areas.length && !q && filter === '全部') {
      list.sort((a, b) => {
        const inA = areas.some(ar => (a.region || []).includes(ar)) ? 0 : 1;
        const inB = areas.some(ar => (b.region || []).includes(ar)) ? 0 : 1;
        return inA - inB;
      });
    }
    if (!list.length) {
      grid.innerHTML = '<div class="food-empty">没有找到匹配的食物</div>';
      return;
    }
    grid.innerHTML = list.map(f => {
      const regions = f.region || [];
      const recommended = f.type !== 'restaurant' && areas.length && areas.some(a => regions.includes(a));
      const subTitle = f.type === 'restaurant' ? (f.subtitle || f.nameCn) : f.nameCn;
      return `
      <article class="food-card" data-food="${esc(f.id)}">
        <div class="img-wrap">
          <img src="${esc(f.img)}" alt="${esc(f.nameId)}" loading="lazy">
          ${recommended ? '<span class="badge">推荐</span>' : ''}
        </div>
        <div class="info">
          <div class="name-id">${esc(f.nameId)}</div>
          <div class="name-cn">${esc(subTitle)}</div>
          ${f.type !== 'restaurant' && regions.length ? `<div class="region">${regions.map(r => esc(r)).join(' · ')}</div>` : ''}
        </div>
      </article>`;
    }).join('');
    grid.querySelectorAll('.food-card').forEach(card => {
      card.addEventListener('click', () => openFoodSheet(foods.find(f => f.id === card.dataset.food)));
    });
  }

  function openFoodSheet(food) {
    if (!food) return;
    state.selectedFood = food;
    const regions = food.region || [];
    const panel = document.getElementById('food-detail');

    if (food.type === 'restaurant') {
      const dishesHtml = (food.dishes || []).map(d => `
        <div class="restaurant-dish-item">
          <div class="dish-name">✨ ${esc(d.name)}</div>
          <div class="dish-note">${esc(d.note)}</div>
        </div>
      `).join('');

      const mapBtnHtml = food.mapUrl ? `
        <a href="${esc(food.mapUrl)}" target="_blank" rel="noopener noreferrer" class="btn-airport-map">
          📍 查看机场位置
        </a>
      ` : '';

      panel.innerHTML = `
        <img class="detail-img" src="${esc(food.img)}" alt="${esc(food.nameId)}">
        <h2 class="detail-name-id">${esc(food.nameId)}</h2>
        <div class="detail-name-cn">${esc(food.nameCn)}</div>
        <div class="detail-meta">
          ${food.airport ? `<span>${esc(food.airport)}</span>` : ''}
          ${food.terminal ? `<span>${esc(food.terminal)}</span>` : ''}
          ${food.subtitle ? `<span>${esc(food.subtitle.split(' · ')[0])}</span>` : ''}
        </div>
        <div class="restaurant-info-box">
          <div class="restaurant-info-row">
            <span class="restaurant-info-icon">📍</span>
            <div class="restaurant-info-content">
              <strong>位置：</strong>${esc(food.locationDesc || food.area)}
              ${food.isAirside ? '<span class="badge-airside">禁区内</span>' : ''}
            </div>
          </div>
          <div class="restaurant-info-row">
            <span class="restaurant-info-icon">🕐</span>
            <div class="restaurant-info-content">
              <strong>营业时间：</strong>${esc(food.hours)}
            </div>
          </div>
        </div>
        <div class="detail-section">
          <h4>餐厅简介</h4>
          <p>${esc(food.desc)}</p>
        </div>
        <div class="detail-section">
          <h4>推荐必点</h4>
          <div class="restaurant-dishes">
            ${dishesHtml}
          </div>
        </div>
        <div class="detail-section">
          <h4>💡 转机食用建议</h4>
          <p>${esc(food.transferTip)}</p>
        </div>
        ${mapBtnHtml}
        <div class="restaurant-footnote">✈️ 赤道小尼的转机觅食备忘</div>
      `;
    } else {
      panel.innerHTML = `
        <img class="detail-img" src="${esc(food.img)}" alt="${esc(food.nameId)}">
        <h2 class="detail-name-id">${esc(food.nameId)}</h2>
        <div class="detail-name-cn">${esc(food.nameCn)}</div>
        ${regions.length ? `<div class="detail-meta">
          ${regions.map(r => `<span>${esc(r)}</span>`).join('')}
        </div>` : ''}
        <div class="detail-section">
          <h4>简介</h4>
          <p>${esc(food.desc)}</p>
        </div>
        <div class="detail-section">
          <h4>主要食材 / 特点</h4>
          <p>${esc(food.ingredients)}</p>
        </div>
        <div class="ai-note">以上地区归属、简介、食材为自动补充，非 Excel 原文。</div>
        <button class="btn-staff" id="btn-staff">给店员看</button>
      `;
      document.getElementById('btn-staff').addEventListener('click', () => openStaffMode(food));
    }

    const sheet = document.getElementById('food-sheet');
    sheet.hidden = false;
  }

  function bindSheet() {
    const sheet = document.getElementById('food-sheet');
    sheet.querySelectorAll('[data-close-sheet]').forEach(el => {
      el.addEventListener('click', () => { sheet.hidden = true; state.selectedFood = null; });
    });
    document.getElementById('staff-close').addEventListener('click', () => {
      document.getElementById('staff-mode').hidden = true;
    });
  }

  function openStaffMode(food) {
    const el = document.getElementById('staff-content');
    el.innerHTML = `
      <img src="${esc(food.img)}" alt="${esc(food.nameId)}">
      <div class="staff-name-id">${esc(food.nameId)}</div>
      <div class="staff-name-cn">${esc(food.nameCn)}</div>
      <div class="staff-line id">Saya mau ini.</div>
      <div class="staff-line">我要这个。</div>
    `;
    document.getElementById('staff-mode').hidden = false;
  }

  // ---------------------------------------------------------------------------
  // 汇率页（一级 Tab）：打开即可直接输入金额换算
  // ---------------------------------------------------------------------------
  function renderRate() {
    const page = document.getElementById('page-rate');
    const rateVal = rateState.rate;
    const formattedRate = (Math.round(rateVal * 10) / 10).toLocaleString();

    let badgeHtml = '';
    if (rateState.source === 'network') {
      badgeHtml = `<span class="rate-badge rate-badge-live">● 实时联网 · 今日已更新 (${esc(rateState.time || rateState.date)})</span>`;
    } else if (rateState.source === 'cached') {
      badgeHtml = `<span class="rate-badge rate-badge-cache">● 本地缓存 · 上次更新于 ${esc(rateState.date)}${rateState.time ? ' ' + esc(rateState.time) : ''}</span>`;
    } else {
      badgeHtml = `<span class="rate-badge rate-badge-base">● 离线基准 · Excel 初始参考值 (2,652)</span>`;
    }

    page.innerHTML = `
      <header class="tool-head">
        <div class="rate-head-row">
          <div>
            <h1 class="tool-h1">汇率</h1>
            <p class="tool-sub">印尼盾换算人民币，随手估算</p>
          </div>
          <button type="button" class="btn-rate-refresh" id="btn-refresh-rate" ${rateState.updating ? 'disabled' : ''}>
            <span class="rate-refresh-icon ${rateState.updating ? 'spin' : ''}">↻</span>
            <span class="rate-refresh-text">${rateState.updating ? '更新中' : '更新汇率'}</span>
          </button>
        </div>
      </header>
      <div class="card converter">
        <div class="converter-label">
          <span>印尼盾 → 人民币</span>
          <span class="converter-rate">1 CNY = ${formattedRate} IDR</span>
        </div>
        <div class="rate-status-wrap">${badgeHtml}</div>
        <input type="number" inputmode="numeric" class="converter-input" id="conv-idr" placeholder="输入 IDR 金额">
        <div class="conv-chips" id="conv-chips">
          <button type="button" class="conv-chip" data-amt="20000">2万</button>
          <button type="button" class="conv-chip" data-amt="50000">5万</button>
          <button type="button" class="conv-chip" data-amt="100000">10万</button>
          <button type="button" class="conv-chip" data-amt="500000">50万</button>
          <button type="button" class="conv-chip" data-amt="1000000">100万</button>
        </div>
        <div class="converter-result" id="conv-cny">≈ ¥0</div>
        <div class="converter-note">
          • 自动更新：每天首次打开自动通过网络获取最新汇率；<br>
          • 离线保障：断网或弱网时优先使用上次缓存，无网也不影响换算；<br>
          • 心算技巧：印尼盾去掉后三位(k)，再除以约 ${(rateVal / 1000).toFixed(1)} = 人民币。
        </div>
      </div>
      <div style="height:20px"></div>
    `;

    setupConverter(rateVal);

    const refreshBtn = document.getElementById('btn-refresh-rate');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => fetchLatestRate(true));
    }

    const chips = document.getElementById('conv-chips');
    if (chips) {
      chips.addEventListener('click', e => {
        const btn = e.target.closest('.conv-chip');
        if (!btn) return;
        const amt = btn.dataset.amt;
        const input = document.getElementById('conv-idr');
        if (input) {
          input.value = amt;
          input.dispatchEvent(new Event('input'));
        }
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 工具页：入口首页 + 各功能详情
  // ---------------------------------------------------------------------------
  const TOOL_META = {
    emergency: { icon: '🆘', title: '紧急求助' },
    hotels: { icon: '🏨', title: '酒店地址' },
    flights: { icon: '✈️', title: '航班信息' },
  };

  function renderTools() {
    const page = document.getElementById('page-tools');
    if (state.toolScreen === 'home' || !TOOL_META[state.toolScreen]) {
      state.toolScreen = 'home';
      page.innerHTML = renderToolHome();
      page.querySelectorAll('[data-tool]').forEach(btn => {
        btn.addEventListener('click', () => openToolScreen(btn.dataset.tool));
      });
      return;
    }
    const meta = TOOL_META[state.toolScreen];
    page.innerHTML = `
      <div class="tool-bar">
        <button class="tool-back" id="tool-back" type="button">‹ 工具</button>
        <span class="tool-bar-title">${meta.icon} ${esc(meta.title)}</span>
      </div>
      ${renderToolScreenBody(state.toolScreen)}
      <div style="height:20px"></div>
    `;
    document.getElementById('tool-back').addEventListener('click', backToToolHome);
    if (state.toolScreen === 'hotels') renderToolHotels();
    if (state.toolScreen === 'flights') renderToolFlights();
  }

  /** 工具首页：3 个入口，「紧急求助」在第一位且视觉权重最高 */
  function renderToolHome() {
    return `
      <header class="tool-head">
        <h1 class="tool-h1">工具</h1>
        <p class="tool-sub">旅行期间的常用信息，点开即用</p>
      </header>

      <button class="tool-entry tool-entry-sos" type="button" data-tool="emergency">
        <span class="te-icon">🆘</span>
        <span class="te-body">
          <span class="te-title">紧急求助</span>
          <span class="te-desc">报警 110 · 急救 119 · 外交部领保 12308</span>
        </span>
        <span class="te-arrow">›</span>
      </button>

      <div class="tool-grid">
        <button class="tool-entry" type="button" data-tool="hotels">
          <span class="te-icon">🏨</span>
          <span class="te-body">
            <span class="te-title">酒店地址</span>
            <span class="te-desc">${hotels.length} 家 · 完整英文地址可一键复制</span>
          </span>
          <span class="te-arrow">›</span>
        </button>
        <button class="tool-entry" type="button" data-tool="flights">
          <span class="te-icon">✈️</span>
          <span class="te-body">
            <span class="te-title">航班信息</span>
            <span class="te-desc">${flights.length} 条 · 含中转与票号</span>
          </span>
          <span class="te-arrow">›</span>
        </button>
      </div>
    `;
  }

  function renderToolScreenBody(screen) {
    if (screen === 'emergency') {
      return `<div class="card"><div class="card-title">🆘 紧急求助</div>${renderEmergency()}</div>`;
    }
    if (screen === 'hotels') {
      return `<div class="card" id="tool-hotel-list"></div>`;
    }
    if (screen === 'flights') {
      return `<div id="tool-flight-list" class="tool-flight-groups"></div>`;
    }
    return '';
  }

  function openToolScreen(screen) {
    state.toolScreen = screen;
    renderTools();
    // 让手机返回手势/返回键回到工具首页，而不是直接退出网页
    try { history.pushState({ tool: screen }, ''); } catch (e) { /* file:// 下可能不支持 */ }
    window.scrollTo({ top: 0 });
  }

  function backToToolHome() {
    if (state.toolScreen === 'home') return;
    if (history.state && history.state.tool) {
      history.back();          // 触发 popstate，由监听器切回首页
      return;
    }
    state.toolScreen = 'home';
    renderTools();
    window.scrollTo({ top: 0 });
  }

  function bindToolHistory() {
    window.addEventListener('popstate', () => {
      if (state.tab === 'tools' && state.toolScreen !== 'home') {
        state.toolScreen = 'home';
        renderTools();
        window.scrollTo({ top: 0 });
      }
    });
  }

  /** 紧急求助：顶部三条一键拨号，其余信息在下面 */
  const SOS_QUICK = [
    { icon: '🚓', label: '报警', num: '110', tel: '110' },
    { icon: '🚑', label: '医疗急救 / 救护车', num: '119', tel: '119' },
    { icon: '🇨🇳', label: '外交部全球领保热线', num: '12308', tel: '+861012308' },
  ];

  function renderEmergency() {
    const em = DATA.emergency || {};
    const groups = em.groups || [];
    const emb = em.embassy;
    if (!groups.length && !emb) return '<div class="em-empty">暂无紧急信息</div>';

    const quickHtml = `
      <div class="sos-quick">
        ${SOS_QUICK.map(q => `
          <a class="sos-btn" href="tel:${esc(q.tel)}">
            <span class="sos-icon">${q.icon}</span>
            <span class="sos-num">${esc(q.num)}</span>
            <span class="sos-label">${esc(q.label)}</span>
          </a>`).join('')}
      </div>
      <div class="sos-tip">点击即可拨号</div>
    `;

    // 顶部已经一键拨过的号码不再重复列一遍（按号码整体匹配，避免把 +86-10-65612308 误判成 12308）
    const digits = s => String(s).replace(/\D/g, '');
    const quickDigits = SOS_QUICK.flatMap(q => [digits(q.tel), digits(q.num)]);
    const groupHtml = groups.map(g => {
      const items = g.items.filter(it => !quickDigits.includes(digits(it.value || '')));
      if (!items.length && !g.intro) return '';
      return `
      <div class="em-group${g.highlight ? ' em-group-hl' : ''}">
        <div class="em-group-title">${esc(g.icon || '')} ${esc(g.title)}</div>
        ${g.intro ? `<div class="em-intro">${esc(g.intro)}</div>` : ''}
        ${items.map(it => `
          <div class="em-item">
            <div class="em-main">
              <div class="em-label">${esc(it.icon || '')} ${esc(it.label)}</div>
              ${it.note ? `<div class="em-note">${esc(it.note)}</div>` : ''}
            </div>
            <a class="em-call" href="tel:${esc(it.tel || it.value)}">${esc(it.value)}</a>
          </div>
        `).join('')}
      </div>`;
    }).join('');

    const embHtml = emb ? `
      <div class="em-group em-embassy">
        <div class="em-group-title">🏛️ ${esc(emb.name)}</div>
        <div class="em-addr">${esc(emb.address)}</div>
        <div class="hotel-actions" style="margin-top:10px">
          <button class="btn btn-copy" data-copy="${esc(emb.address)}">📋 复制地址</button>
          ${emb.email ? `<button class="btn btn-copy" data-copy="${esc(emb.email)}">✉️ 复制邮箱</button>` : ''}
        </div>
        ${emb.email ? `<div class="em-email">${esc(emb.email)}</div>` : ''}
      </div>
    ` : '';

    return quickHtml + groupHtml + embHtml;
  }

  function renderToolHotels() {
    const el = document.getElementById('tool-hotel-list');
    if (!el) return;
    // 按日期列酒店：每天显示当晚酒店
    const html = days.map(d => {
      if (!d.hotel) return '';
      const h = d.hotel;
      return `<div class="tool-hotel-row">
        <div class="tool-hotel-date">${esc(d.label)} · ${esc(d.weekday)}</div>
        <div class="tool-hotel-name">${esc(h.name)}${h.nameEn ? `<span class="tool-hotel-en">${esc(h.nameEn)}</span>` : ''}</div>
        <div class="tool-hotel-addr">${esc(h.address)}</div>
        <div class="hotel-actions" style="margin-top:8px">
          <button class="btn" data-copy="${esc(h.address)}">📋 复制地址</button>
          <a class="btn btn-map" href="${mapsSearchUrl(h.name, h.address)}" target="_blank" rel="noopener noreferrer">🗺️ 地图</a>
        </div>
      </div>`;
    }).join('');
    el.innerHTML = html;
  }

  function formatLayoverBlock(layoverStr, nextDep) {
    if (!layoverStr) return '';
    const parts = layoverStr.split('·').map(s => s.trim());
    let desc = parts[0] || '';
    if (parts[1] && parts[1].includes('停留')) {
      desc += ' · ' + parts[1];
    }
    const luggage = parts.find(p => p.includes('行李')) || '';
    const nextLine = nextDep ? `下一班 <b class="next-time">${nextDep}</b> 起飞` : '';

    return `
      <div class="tool-flight-layover">
        <div class="layover-inner">
          <div class="layover-top">
            <span class="layover-icon">🔁</span>
            <span class="layover-desc">${esc(desc)}</span>
          </div>
          <div class="layover-bot">
            ${nextLine ? `<span class="layover-next">${nextLine}</span>` : ''}
            ${luggage ? `<span class="layover-luggage">${esc(luggage)}</span>` : ''}
          </div>
        </div>
      </div>
    `;
  }

  function renderTicketBox(tickets, orderNo, orderLabel) {
    if ((!tickets || !tickets.length) && !orderNo) return '';
    const ticketRows = (tickets || []).map(t => `
      <div class="ticket-row">
        <span class="ticket-name">${esc(t.name)}</span>
        <span class="ticket-no">${t.ticketNo ? esc(t.ticketNo) : '票号未提供'}</span>
        ${t.bookRef ? `<span class="ticket-pnr">PNR: ${esc(t.bookRef)}</span>` : ''}
      </div>
    `).join('');

    const orderRow = orderNo ? `
      <div class="ticket-order">订单号 ${esc(orderNo)}${orderLabel ? ` · ${esc(orderLabel)}` : ''}</div>
    ` : '';

    return `
      <div class="tool-ticket-box">
        <button type="button" class="btn-ticket-toggle" aria-expanded="false">
          <span class="toggle-icon">⌄</span>
          <span class="toggle-text">查看票务信息</span>
        </button>
        <div class="tool-ticket-drawer" hidden>
          <div class="ticket-list">${ticketRows}</div>
          ${orderRow}
        </div>
      </div>
    `;
  }

  function renderToolFlights() {
    const el = document.getElementById('tool-flight-list');
    if (!el) return;

    // 按乘机日期分组
    const groupMap = new Map();
    const groupList = [];
    flights.forEach(f => {
      if (!groupMap.has(f.date)) {
        const grp = { date: f.date, flights: [] };
        groupMap.set(f.date, grp);
        groupList.push(grp);
      }
      groupMap.get(f.date).flights.push(f);
    });

    const html = groupList.map(grp => {
      const dMatch = days.find(d => d.date === grp.date);
      let dayTag = '';
      if (grp.date === '2026-09-24') dayTag = '去程 · 上海 → 泗水';
      else if (grp.date === '2026-10-04') dayTag = '返程 · 泗水 → 上海';
      else if (dMatch) dayTag = dMatch.short || dMatch.title;
      else dayTag = `${grp.flights[0].from} → ${grp.flights[grp.flights.length - 1].to}`;

      // 展开所有航段（包含 segments 拆分，如 10/4 国泰联程 CX780 + CX362）
      const legs = [];
      grp.flights.forEach(f => {
        if (f.segments && f.segments.length > 1) {
          f.segments.forEach((sg, idx) => {
            legs.push({
              airline: sg.airline,
              flightNo: sg.flightNo,
              from: sg.fromCity,
              fromCode: sg.fromCode,
              fromAirport: sg.fromAirport,
              fromTerminal: sg.fromTerminal,
              dep: sg.dep,
              to: sg.toCity,
              toCode: sg.toCode,
              toAirport: sg.toAirport,
              toTerminal: sg.toTerminal,
              arr: sg.arr,
              layoverAfter: idx === 0 ? f.layover : '',
              nextDep: idx === 0 && f.segments[1] ? f.segments[1].dep : '',
              timezoneNote: f.timezoneNote,
            });
          });
        } else {
          legs.push({
            airline: f.airline,
            flightNo: f.flightNo,
            flightNoNote: f.flightNoNote,
            from: f.from,
            fromCode: f.fromCode,
            fromAirport: f.fromAirport,
            fromTerminal: f.fromTerminal,
            dep: f.dep,
            to: f.to,
            toCode: f.toCode,
            toAirport: f.toAirport,
            toTerminal: f.toTerminal,
            arr: f.arr,
            layoverAfter: f.layover,
            nextDep: '',
            timezoneNote: f.timezoneNote,
          });
        }
      });

      // 同一天多航班联程（如 9/24），补全第一段的下一班起飞时间 nextDep
      for (let i = 0; i < legs.length - 1; i++) {
        if (legs[i].layoverAfter && !legs[i].nextDep && legs[i + 1]) {
          legs[i].nextDep = legs[i + 1].dep;
        }
      }

      let legsHtml = '';
      legs.forEach(lg => {
        legsHtml += `
          <div class="tool-flight-leg">
            <div class="tool-flight-dep">
              <span class="dep-time">${lg.dep || '--:--'}</span>
              <span class="dep-label">起飞</span>
            </div>
            <div class="tool-flight-main">
              <div class="tool-flight-ports">
                <span class="port-codes">
                  <b>${esc(lg.fromCode || lg.from)}</b>${lg.fromTerminal ? `<i class="term">${esc(lg.fromTerminal)}</i>` : ''}
                  <span class="arrow">→</span>
                  <b>${esc(lg.toCode || lg.to)}</b>${lg.toTerminal ? `<i class="term">${esc(lg.toTerminal)}</i>` : ''}
                </span>
                <span class="arr-pill">到达 <b>${lg.arr || '--:--'}</b></span>
              </div>
              <div class="tool-flight-cities">
                <span>${esc(lg.from)}${lg.fromAirport ? ` <small>(${esc(lg.fromAirport)})</small>` : ''}</span>
                <span class="sep">→</span>
                <span>${esc(lg.to)}${lg.toAirport ? ` <small>(${esc(lg.toAirport)})</small>` : ''}</span>
              </div>
              <div class="tool-flight-no">
                ✈️ ${esc(lg.airline || '')} <b>${esc(lg.flightNo || lg.flightNoNote || '')}</b>
              </div>
              ${lg.timezoneNote ? `<div class="tool-flight-tz">🕐 ${esc(lg.timezoneNote)}</div>` : ''}
            </div>
          </div>
        `;

        if (lg.layoverAfter) {
          legsHtml += formatLayoverBlock(lg.layoverAfter, lg.nextDep);
        }
      });

      // 提取当天所有机票与订单
      const allTickets = [];
      const seenTickets = new Set();
      let orderNo = '';
      let orderLabel = '';
      grp.flights.forEach(f => {
        if (f.orderNo) { orderNo = f.orderNo; orderLabel = f.orderLabel || ''; }
        if (f.tickets) {
          f.tickets.forEach(t => {
            const key = `${t.name}-${t.ticketNo}-${t.bookRef}`;
            if (!seenTickets.has(key)) {
              seenTickets.add(key);
              allTickets.push(t);
            }
          });
        }
      });

      const ticketsBox = renderTicketBox(allTickets, orderNo, orderLabel);

      return `
        <div class="card tool-flight-group">
          <div class="tool-group-header">
            <span class="tool-group-date">${fmtDate(grp.date)}</span>
            <span class="tool-group-tag">${esc(dayTag)}</span>
          </div>
          <div class="tool-group-legs">
            ${legsHtml}
          </div>
          ${ticketsBox}
        </div>
      `;
    }).join('');

    el.innerHTML = html;

    // 绑定票务折叠展开事件
    el.querySelectorAll('.btn-ticket-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const drawer = btn.nextElementSibling;
        if (!drawer) return;
        const isExpanded = !drawer.hidden;
        drawer.hidden = isExpanded;
        btn.setAttribute('aria-expanded', String(!isExpanded));
        const icon = btn.querySelector('.toggle-icon');
        const text = btn.querySelector('.toggle-text');
        if (icon) icon.textContent = !isExpanded ? '⌃' : '⌄';
        if (text) text.textContent = !isExpanded ? '收起票务信息' : '查看票务信息';
      });
    });
  }

  function setupConverter(rate) {
    const input = document.getElementById('conv-idr');
    const out = document.getElementById('conv-cny');
    if (!input || !out) return;
    const calc = () => {
      const v = parseFloat(input.value);
      if (isNaN(v) || v <= 0) { out.textContent = '≈ ¥0'; return; }
      const cny = v / rate;
      out.textContent = '≈ ¥' + (cny < 1 ? cny.toFixed(2) : cny.toFixed(1));
    };
    input.addEventListener('input', calc);
    if (!input.value) {
      input.value = '100000';
    }
    calc();
  }

  // ---------------------------------------------------------------------------
  // 通用：复制 / 灯箱 / 工具函数
  // ---------------------------------------------------------------------------
  /**
   * 复制文本。
   * 优先用 Clipboard API；但它可能既不 resolve 也不 reject（权限/环境问题），
   * 所以加一个超时兜底，落到 execCommand，保证「复制地址」一定有结果反馈。
   */
  async function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        const ok = await Promise.race([
          navigator.clipboard.writeText(text).then(() => true, () => false),
          new Promise(r => setTimeout(() => r(false), 600)),
        ]);
        if (ok) return true;
      } catch (e) { /* 落到 execCommand */ }
    }
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.top = '-1000px';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      ta.setSelectionRange(0, text.length);
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch (e) {
      return false;
    }
  }

  function bindCopy() {
    document.addEventListener('click', async e => {
      const btn = e.target.closest('[data-copy]');
      if (!btn) return;
      const ok = await copyText(btn.dataset.copy || '');
      showToast(ok ? '地址已复制' : '复制失败，请手动复制');
    });
  }

  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 1800);
  }

  function bindLightbox() {
    const box = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    document.addEventListener('click', e => {
      const t = e.target.closest('img');
      if (!t || t.id === 'lightbox-img') return;
      if (t.classList.contains('day-ref-thumb') || t.closest('.tl-images') || t.closest('.hotel-screens')) {
        img.src = t.src;
        box.hidden = false;
      }
    });
    box.querySelector('.lightbox-close').addEventListener('click', () => { box.hidden = true; img.src = ''; });
    box.addEventListener('click', () => { box.hidden = true; img.src = ''; });
  }

  function fmtDate(iso) {
    const d = new Date(iso);
    return `${d.getMonth() + 1}月${d.getDate()}日`;
  }

  function esc(str) {
    if (str == null) return '';
    return String(str).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  }

  // ---------------------------------------------------------------------------
  // 启动
  // ---------------------------------------------------------------------------
  function renderAllTabs() {
    renderTrip();
    renderFood();
    renderTools();
  }

  document.addEventListener('DOMContentLoaded', () => {
    bindCopy();
    init();
    document.body.addEventListener('click', e => {
      if (e.target.id === 'btn-tomorrow') {
        selectDate(state.dateIndex + 1);
      }
    });
  });
})();
