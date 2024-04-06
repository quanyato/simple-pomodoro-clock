const CACHE_NAME = 'tck-pomo-v1';

const rootFolder = '/simple-pomodoro-clock';
const startSoundUrl = `${rootFolder}/audio/start.m4a`;
const shortBreakStartSoundUrl = `${rootFolder}/audio/short_break_start.m4a`;
const shortBreakEndSoundUrl = `${rootFolder}/audio/short_break_end.m4a`;
const longBreakStartSoundUrl = `${rootFolder}/audio/long_break_start.m4a`;
const longBreakEndSoundUrl = `${rootFolder}/audio/long_break_end.m4a`;

const INITIAL_CACHED_RESOURCES = [
    '/simple-pomodoro-clock/',
    '/simple-pomodoro-clock/index.html',
    '/simple-pomodoro-clock/css/styles.css',
    '/simple-pomodoro-clock/js/app.js',
    '/simple-pomodoro-clock/img/android-chrome-192x192.png',
    '/simple-pomodoro-clock/img/android-chrome-512x512.png',
    '/simple-pomodoro-clock/img/apple-touch-icon.png',
    '/simple-pomodoro-clock/img/favicon-16x16.png',
    '/simple-pomodoro-clock/img/favicon-32x32.png',
    '/simple-pomodoro-clock/img/favicon.ico',
    startSoundUrl,
    shortBreakStartSoundUrl,
    shortBreakEndSoundUrl,
    longBreakStartSoundUrl,
    longBreakEndSoundUrl,
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
];

self.addEventListener( "install", function( event ){
    console.log( "WORKER: install event in progress." );

    event.waitUntil((async () => {
        caches.delete(CACHE_NAME);
        const cache = await caches.open(CACHE_NAME);
        cache.addAll(INITIAL_CACHED_RESOURCES);
    })());
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