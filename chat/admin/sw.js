// Service worker de ARIA (administración del asistente): avisos al celular y funcionamiento como app instalada.
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });

// Primero internet (para tener siempre lo último); si no hay señal, la última copia guardada de la app.
var CACHE = 'aria-v1';
self.addEventListener('fetch', function (e) {
  var r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  e.respondWith(fetch(r).then(function (res) {
    if (res.ok) { var copia = res.clone(); caches.open(CACHE).then(function (c) { c.put(r, copia); }); }
    return res;
  }).catch(function () { return caches.match(r, { ignoreSearch: true }); }));
});

self.addEventListener('push', function (e) {
  var d = {};
  try { d = e.data ? e.data.json() : {}; } catch (err) { d = { title: 'ARIA', body: e.data ? e.data.text() : '' }; }
  e.waitUntil(self.registration.showNotification(d.title || 'ARIA', {
    body: d.body || '',
    tag: d.tag || 'caso',
    icon: 'aria-192.png',
    badge: '../../assets/dl-company.png',
    data: { url: d.url || './#chats' },
    requireInteraction: false,
  }));
});

self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  var url = (e.notification.data && e.notification.data.url) || './#chats';
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (lista) {
    for (var i = 0; i < lista.length; i++) {
      if (lista[i].url.indexOf('/chat/admin/') !== -1) {
        lista[i].postMessage({ tipo: 'abrir', url: url });
        return lista[i].focus();
      }
    }
    return self.clients.openWindow(url);
  }));
});
