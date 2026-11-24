// Service worker de la administración del asistente: solo recibe los avisos de casos nuevos.
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });

self.addEventListener('push', function (e) {
  var d = {};
  try { d = e.data ? e.data.json() : {}; } catch (err) { d = { title: 'Asistente DL COMPANY', body: e.data ? e.data.text() : '' }; }
  e.waitUntil(self.registration.showNotification(d.title || 'Asistente DL COMPANY', {
    body: d.body || '',
    tag: d.tag || 'caso',
    icon: '../../assets/dl-company.png',
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
