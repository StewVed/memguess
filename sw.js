var zAppCache = 'MemGuess-2017-01-13';

self.addEventListener('install', function(event) {
  event.waitUntil(caches.open(zAppCache).then(function(cache) {
    return cache.addAll([
        './'
      , './initialize.js'
      , './inputs.js'
      , './loader.js'
      , './main.css'
      , './main.js'
      , './storage.js'
    ])
  }))
});
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(cacheResponse) {
      return cacheResponse || fetch(event.request).then(function(netResponse) {
        return caches.open(zAppCache).then(function(cache) {
          cache.put(event.request, netResponse.clone());
          console.log('flle not found in cache!');
          return netResponse;
        });
      });
    })
  );
});
self.addEventListener('activate', function(event) {
  event.waitUntil(caches.keys().then(function(cacheNames) {
    return Promise.all(cacheNames.map(function(cacheName) {
      if (cacheName !== zAppCache) {
        return caches.delete(cacheName);
      }
    }))
  }))
});
