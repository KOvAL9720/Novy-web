// Klientska zóna bola zrušená: tento service worker vymaže jej pamäť a odregistruje sa.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) await caches.delete(k);
    await self.registration.unregister();
    for (const c of await self.clients.matchAll({ type: 'window' })) { try { await c.navigate(c.url); } catch (x) { /* ok */ } }
  })());
});
