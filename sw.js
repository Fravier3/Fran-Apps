'use strict';
const CACHE = 'fran-apps-v4';
const SHELL = ['./', './index.html', './style.css?v=4', './app.js?v=4',  './manifest.webmanifest', './icons/hub-v4-180.png', './icons/hub-v4-192.png', './icons/hub-v4-512.png', './icons/apps/puerto-rico.webp', './icons/apps/miami.webp', './icons/apps/countdown.webp', './icons/apps/qa-tester.webp'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('fran-apps-') && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  const scope = new URL(self.registration.scope);
  // Never cache or intercept the user's other applications on this origin.
  if (event.request.method !== 'GET' || url.origin !== scope.origin || !url.pathname.startsWith(scope.pathname)) return;
  event.respondWith(fetch(event.request).then(response => {
    if (response.ok && SHELL.some(path => new URL(path, scope).pathname === url.pathname)) {
      const copy = response.clone();
      event.waitUntil(caches.open(CACHE).then(cache => cache.put(event.request, copy)));
    }
    return response;
  }).catch(async () => {
    const cached = await caches.match(event.request);
    if (cached) return cached;
    if (event.request.mode === 'navigate') return caches.match('./index.html');
    return Response.error();
  }));
});
