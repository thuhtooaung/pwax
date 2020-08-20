const staticCacheName = 'site-static-v1'; // we can change the name as cache version

const assets = [
    '/pwax/',
    '/pwax/index.html',
    '/pwax/js/app.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
    '/pwax/img/thuhtooaung.png',
    '/pwax/img/android.png',
    '/pwax/img/dish.png',
    '/pwax/font/Jost-Light.ttf',
    '/pwax/font/Jost-Regular.ttf',
    '/pwax/font/Merienda-Regular.ttf',
    '/pwax/font/NanumGothic-ExtraBold.ttf',
    '/pwax/pages/fallback.html'
    //Font size large: or : Error: 'Roboto-Regular.ttf'
];   


// install service worker
self.addEventListener('install', event => {
    console.log('Service Worker has been installed.');

    //caching start
    event.waitUntil(
        caches.open(staticCacheName).then( cache => {
            console.log('caching shell assets');
            cache.addAll(assets);
        })
    )
    //caching end
});

//activate service worker
self.addEventListener('activate', event => {
    console.log('Service Worker has been activated. ');

    //cache versioning - delete the unused cache in browser
    event.waitUntil(
        caches.keys().then( keys => {
            return Promise.all(keys
                .filter(key => key != staticCacheName)
                .map(key => caches.delete(key))
            )
        })
    );
    //end of cache versioning

});

// fetch event to fetch data from server
self.addEventListener('fetch', event => {
    console.log('fetch', event);
    
    //cache fetching
    event.respondWith(
        caches.match(event.request).then( cacheRes => {
            return cacheRes || fetch(event.request)
        }).catch( () => caches.match('/pwax/pages/fallback.html'))
    );
    //cache fetching

}); 