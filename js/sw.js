const CACHE_NAME = 'tck-pomo-v1';

const INITIAL_CACHED_RESOURCES = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/js/app.js',
    '/img/android-chrome-192x192.png',
    '/img/android-chrome-512x512.png',
    '/img/apple-touch-icon.png',
    '/img/favicon-16x16.png',
    '/img/favicon-32x32.png',
    '/img/favicon.ico',
    '/audio/long_break_start.m4a',
    '/audio/long_break_end.m4a',
    '/audio/short_break_start.m4a',
    '/audio/short_break_end.m4a',
    '/audio/start.m4a',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
];

self.addEventListener( "install", function( event ){
    console.log( "WORKER: install event in progress." );

    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        cache.addAll(INITIAL_CACHED_RESOURCES);
    })());
});

self.addEventListener( "fetch", function( event ){
    console.log( "WORKER: Fetching", event.request );

    event.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME);

        // Try the cache first.
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse !== undefined) {
            // Cache hit, let's send the cached resource.
            return cachedResponse;
        } else {
            // Nothing in cache, let's go to the network.
        }
    }));
});

self.addEventListener( "push", function( event ){
    console.log( "WORKER: Received notification", event.data );
});

self.addEventListener( "activate", function( event ){
    console.log( "WORKER: activation event in progress." );
    clients.claim();
    console.log( "WORKER: all clients are now controlled by me! Mwahahaha!" );
});