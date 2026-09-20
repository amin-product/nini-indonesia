/*
  赤道小尼 Online - Service Worker
  离线优先策略：
  1. 预缓存：核心代码 + 全部 53 张高质量景点/食物/酒店图片 + PWA 图标（共约 3.5MB）
  2. HTML 页面：网络优先（短超时），保障在线时第一时间感知发布更新，离线秒级回退本地缓存
  3. 静态资源（CSS/JS/图片/图标）：缓存优先，本地毫秒级加载
  4. 外部 API 请求（汇率等）：透传放行，不污染静态缓存
*/

const CACHE_NAME = 'chidaoxiaoni-v1.3';

// A. 核心启动资源（必须成功，任一失败则中断 install，避免生成残缺离线应用）
const CORE_PRECACHE_URLS = [
  './',
  './index.html',
  './css/app.css',
  './js/data.js',
  './js/app.js',
  './manifest.json',
  './欢迎页图.png',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/apple-touch-icon.png',
];

// B. 旅行核心图片资源（全量主动预缓存；允许单张因网络抖动失败，不阻断 SW 安装）
const IMAGE_PRECACHE_URLS = [
  // 行程路线参考图 (13 张)
  './assets/day/d01.jpg',
  './assets/day/d02.jpg',
  './assets/day/d03.jpg',
  './assets/day/d04.jpg',
  './assets/day/d05.jpg',
  './assets/day/d06.jpg',
  './assets/day/d07.jpg',
  './assets/day/d08.jpg',
  './assets/day/d09.jpg',
  './assets/day/d10.jpg',
  './assets/day/d11.jpg',
  './assets/day/d12.jpg',
  './assets/day/d13.jpg',
  // 印尼食物攻略图 (28 张)
  './assets/food/f01.jpg',
  './assets/food/f02.jpg',
  './assets/food/f03.jpg',
  './assets/food/f04.jpg',
  './assets/food/f05.jpg',
  './assets/food/f06.jpg',
  './assets/food/f07.jpg',
  './assets/food/f08.jpg',
  './assets/food/f09.jpg',
  './assets/food/f10.jpg',
  './assets/food/f11.jpg',
  './assets/food/f12.jpg',
  './assets/food/f13.jpg',
  './assets/food/f14.jpg',
  './assets/food/f15.jpg',
  './assets/food/f16.jpg',
  './assets/food/f17.jpg',
  './assets/food/f18.jpg',
  './assets/food/f19.jpg',
  './assets/food/f20.jpg',
  './assets/food/f21.jpg',
  './assets/food/f22.jpg',
  './assets/food/f23.jpg',
  './assets/food/f24.jpg',
  './assets/food/f25.jpg',
  './assets/food/f26.jpg',
  './assets/food/f27.jpg',
  './assets/food/f28.jpg',
  // 机场转机餐厅推荐图 (4 张 WebP)
  './assets/food/serai-klia.webp',
  './assets/food/grandmamas-klia.webp',
  './assets/food/men-wah-hkia.webp',
  './assets/food/tasty-congee-hkia.webp',
  // 酒店参考图 (12 张)
  './assets/hotel/h01.jpg',
  './assets/hotel/h02.jpg',
  './assets/hotel/h03.jpg',
  './assets/hotel/h04.jpg',
  './assets/hotel/h05.jpg',
  './assets/hotel/h06.jpg',
  './assets/hotel/h07.jpg',
  './assets/hotel/h08.jpg',
  './assets/hotel/h09.jpg',
  './assets/hotel/h10.jpg',
  './assets/hotel/h11.jpg',
  './assets/hotel/h12.jpg',
];

// 安装：核心资源严格缓存 + 图片资源容错预缓存
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      // 1. 核心启动资源：必须全部成功，任一失败则中断 install
      await cache.addAll(CORE_PRECACHE_URLS);

      // 2. 图片资源：全量主动预缓存，单张失败容错（Promise.allSettled）
      const results = await Promise.allSettled(
        IMAGE_PRECACHE_URLS.map(async url => {
          try {
            const resp = await fetch(url);
            if (!resp.ok) {
              throw new Error(`HTTP ${resp.status}`);
            }
            await cache.put(url, resp);
          } catch (err) {
            console.warn(`[SW Precache] 图片预缓存失败，已记录并在后续联网请求时自动补充: ${url}`, err);
            throw err;
          }
        })
      );

      const failedCount = results.filter(r => r.status === 'rejected').length;
      if (failedCount > 0) {
        console.warn(`[SW Precache] 共 ${failedCount} 张图片预缓存未成功，核心 Service Worker 已正常安装就绪。`);
      }
    }).then(() => self.skipWaiting())
  );
});

// 激活：清理旧版本缓存并接管页面
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

// 请求拦截
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // 1. 外部 API（汇率等）：透传放行，不拦截不缓存
  if (url.origin !== self.location.origin) {
    return;
  }

  // 2. HTML 导航请求：网络优先（短超时 2s），失败回退缓存
  if (req.mode === 'navigate' || req.destination === 'document') {
    e.respondWith(
      fetchWithTimeout(req, 2000)
        .then(resp => {
          if (resp && resp.status === 200) {
            const copy = resp.clone();
            caches.open(CACHE_NAME).then(c => c.put(req, copy));
          }
          return resp;
        })
        .catch(() => {
          return caches.match(req, { ignoreSearch: true }).then(m => {
            if (m) return m;
            return caches.match('./index.html').then(idx => idx || caches.match('./'));
          });
        })
    );
    return;
  }

  // 3. 核心业务代码（CSS / JS）：优先返回本地缓存保障离线秒开，联网时后台静默校验并刷新缓存（SWR 机制）
  // 解决后续仅修改业务代码而忘记手动递增 CACHE_NAME 时，老用户长期命中旧缓存的风险
  const pathname = url.pathname;
  const isCoreCode = pathname.endsWith('/css/app.css') ||
                     pathname.endsWith('/js/data.js') ||
                     pathname.endsWith('/js/app.js');

  if (isCoreCode) {
    e.respondWith(
      caches.match(req).then(cached => {
        // 后台静默向网络请求最新版本；若联网成功则平滑替换缓存
        const updatePromise = fetch(req).then(resp => {
          if (resp && resp.status === 200) {
            const copy = resp.clone();
            caches.open(CACHE_NAME).then(c => c.put(req, copy));
          }
          return resp;
        }).catch(() => {
          // 离线状态下忽略后台更新失败
        });

        // 本地已有缓存则立即返回（毫秒级离线渲染）；无缓存时等待网络
        return cached || updatePromise;
      })
    );
    return;
  }

  // 4. 其他静态资源（图片、图标等，占 97% 体积）：严格缓存优先（Cache First）
  e.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(resp => {
        if (resp && resp.status === 200) {
          const copy = resp.clone();
          caches.open(CACHE_NAME).then(c => c.put(req, copy));
        }
        return resp;
      }).catch(() => {
        if (req.destination === 'image') {
          return new Response('', { status: 204, statusText: 'Offline placeholder' });
        }
      });
    })
  );
});

function fetchWithTimeout(request, timeoutMs) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Fetch timeout')), timeoutMs);
    fetch(request).then(
      resp => { clearTimeout(timer); resolve(resp); },
      err => { clearTimeout(timer); reject(err); }
    );
  });
}
