const CACHE_NAME = 'tck-pomo-v1';

const rootFolder = '/';

const INITIAL_CACHED_RESOURCES = [
    `${rootFolder}`,
    `${rootFolder}index.html`,
    `${rootFolder}manifest.json`,
    `${rootFolder}css/styles.css`,
    `${rootFolder}css/bootstrap.min.css`,
    `${rootFolder}js/app.js`,
    `${rootFolder}js/bootstrap.min.js`,
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
];

self.addEventListener( "install", function( event ){
    console.log( "WORKER: install event in progress." );

    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        cache.addAll(INITIAL_CACHED_RESOURCES);
    }));
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    // If the request is in the cache, return it
                    return response;
                }

                // If the request is not in the cache, fetch it from the network
                return fetch(event.request);
            })
            .catch(error => {
                console.error('Error fetching resource from network:', error);
                throw error;
            })
    );
});

self.addEventListener( "push", function( event ){
    console.log( "WORKER: Received notification", event.data );
});

self.addEventListener( "activate", function( event ){
    console.log( "WORKER: activation event in progress." );
    clients.claim();
    console.log( "WORKER: all clients are now controlled by me! Mwahahaha!" );
});