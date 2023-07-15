const staticCacheName = 'version1'
const assetsUrls = [
    'index.html',
    'main.js',
    'APIs.js',
    'cloak.js',
    'events.js',
    'sound.js',
    'manifest.json',
    "sw.js",
    '/style.css'
   
]
self.addEventListener('install', async e =>{

    const cache = await caches.open(staticCacheName);
    await cache.addAll(assetsUrls)
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
    
    console.log(request)
    const cached = await caches.match(request)
    console.log(request.url,cached)
    return cached ?? await fetch(request) 
}