const CACHE_NAME = 'tck-pomo-v1';

const rootFolder = '/simple-pomodoro-clock/';

const INITIAL_CACHED_RESOURCES = [
    `${rootFolder}`,
    `${rootFolder}index.html`,
    `${rootFolder}css/styles.css`,
    `${rootFolder}js/app.js`,
    `${rootFolder}img/android-chrome-192x192.png`,
    `${rootFolder}img/android-chrome-512x512.png`,
    `${rootFolder}img/apple-touch-icon.png`,
    `${rootFolder}img/favicon-16x16.png`,
    `${rootFolder}img/favicon-32x32.png`,
    `${rootFolder}img/favicon.ico`,
    `${rootFolder}audio/start.m4a`,
    `${rootFolder}audio/short_break_start.m4a`,
    `${rootFolder}audio/short_break_end.m4a`,
    `${rootFolder}audio/long_break_start.m4a`,
    `${rootFolder}audio/long_break_end.m4a`,
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
];

self.addEventListener( "install", function( event ){
    console.log( "WORKER: install event in progress." );

    event.waitUntil((async () => {
        caches.delete(CACHE_NAME);
        const cache = await caches.open(CACHE_NAME);
        cache.addAll(INITIAL_CACHED_RESOURCES);
    }));
});

self.addEventListener("fetch", function (event) {
    console.log("WORKER: Fetching", event.request);

    event.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME);

        const cachedResponse = await cache.match(event.request);
        if (cachedResponse !== undefined) {
            // Cache hit, let's send the cached resource.
            return cachedResponse;
        } else {
            // Nothing in cache, let's go to the network.
            // ...... truncated ....
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