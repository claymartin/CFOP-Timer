const CACHE_NAME = 'cfop-timer-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/stats.html',
    '/style.css',
    '/data.js',
    '/streak.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
