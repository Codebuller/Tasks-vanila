const staticCacheName = 'version1'
const assetsUrls = [
    'index.html',
    '/script/main.js',
    '/script/APIs.js',
    '/script/cloak.js',
    '/script/events.js',
    '/script/sound.js',
    '/manifest.json',
    "/sw.js",
    '/style.css',
   
]
self.addEventListener('install', async e =>{

    const cache = await caches.open(staticCacheName);
    // await cache.add('index.html');
    // await cache.add('index.html');
    // await cache.add('/script/APIs.js');
    // await cache.add('index.html');
    await cache.addAll(assetsUrls);
})
// self.addEventListener('activate', async e => {
//     const cacheKeys = await caches.keys();
//     const oldCaches = cacheKeys.filter(key => key !== staticCacheName);
//     await Promise.all(oldCaches.map(key => caches.delete(key)));
  
//     const cache = await caches.open(staticCacheName);
//     await cache.addAll(assetsUrls);
//   });
self.addEventListener('fetch',(e)=>{
    e.respondWith(cacheFirst(e.request))
})
async function cacheFirst(request){
    // if(request.url ===  "http://localhost:5173/"){
    //     request.url="http://localhost:5173/index.html"
    // return await caches.match(request)
    // }
    const cached = await caches.match(request)
   
    return cached ?? await fetch(request) 
}