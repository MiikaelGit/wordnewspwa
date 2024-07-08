
const CACHE_NAME = 'offline';
const OFFLINE_URL = 'offlinePage';

self.addEventListener('install', (event) => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        try {
            const response = await fetch(OFFLINE_URL);
            await cache.put(OFFLINE_URL, response.clone());
        } catch (error) {
            console.error('Failed to cache offline page:', error);
        }
    })());
});

self.addEventListener('activate', (event) => {
    event.waitUntil((async () => {
        if('navigationPreload' in self.registration) {
            await self.registration.navigationPreload.enable();
        }
    })());
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    if(event.request.mode === 'navigate'){
        event.respondWith((async () => {
            try {
                const preloadResponse = await event.preloadResponse;
                if(preloadResponse){
                    return preloadResponse;
                }
                const networkResponse = await fetch(event.request)
                return networkResponse;
            } catch (error) {
                console.log("Fetch failed; returning offline page instead", error);
                const cache = await caches.open(CACHE_NAME);
                const cachedResponse = await cache.match(OFFLINE_URL);
                return cachedResponse;
            }
        })());
    }
});




