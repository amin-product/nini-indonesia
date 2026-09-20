/*
  赤道小尼 Online - Service Worker
  离线优先策略：
  1. 预缓存：核心代码 + 全部 53 张高质量景点/食物/酒店图片 + PWA 图标（共约 3.5MB）
  2. HTML 页面：网络优先（短超时），保障在线时第一时间感知发布更新，离线秒级回退本地缓存
  3. 静态资源（CSS/JS/图片/图标）：缓存优先，本地毫秒级加载
  4. 外部 API 请求（汇率等）：透传放行，不污染静态缓存
*/

const CACHE_NAME = 'chidaoxiaoni-v1.1';

const PRECACHE_URLS = [
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

// 安装：全量预缓存所有静态资源
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
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

  // 3. 静态资源（CSS, JS, 图片, 图标）：缓存优先
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
