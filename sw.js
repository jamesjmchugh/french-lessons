// Service Worker for French Flashcards PWA
const CACHE_NAME = 'french-flashcards-v3';

// Core assets to cache immediately
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/sync.js',
  '/app.js',
  '/data.js',
  '/manifest.json'
];

// Install event - cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching core assets');
      return cache.addAll(CORE_ASSETS);
    })
  );
  // Activate immediately
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  // Take control immediately
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // API requests go straight to network (no caching)
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/french/api/')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Core assets (HTML, CSS, JS, JSON) use network-first so updates deploy immediately
  const isCore = request.destination === 'document' ||
                 url.pathname.endsWith('.css') ||
                 url.pathname.endsWith('.js') ||
                 url.pathname.endsWith('.json');

  if (isCore) {
    // Network-first for core assets
    event.respondWith(
      fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        return caches.match(request).then((cachedResponse) => {
          return cachedResponse || new Response('Offline', { status: 503 });
        });
      })
    );
  } else {
    // Cache-first for audio, images, and other static assets
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request).then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }

          const responseToCache = networkResponse.clone();
          if (request.url.includes('/audio/') ||
              request.url.endsWith('.mp3') ||
              request.url.endsWith('.png')) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }

          return networkResponse;
        }).catch(() => {
          return new Response('Offline', { status: 503 });
        });
      })
    );
  }
});

// Handle messages from the main app
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
