const CACHE_NAME = 'starstream-v46'; // Version bump forces a reset
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './STARSTREAM-192.png',
  './STARSTREAM0512.png'
];

self.addEventListener('install', (e) => {
  self.skipWaiting(); // Kills the old version immediately
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }));
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});