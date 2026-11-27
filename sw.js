const CACHE='jay-chuay-wan-1.0.2';
const FILES=['./','./index.html','./style.css','./app.js','./db.js','./logic.js','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(k=>/^jay-chuay-(thai|wan)-/.test(k)&&k!==CACHE).map(k=>caches.delete(k)));
  await self.clients.claim();
})()));
self.addEventListener('message',e=>{if(e.data&&e.data.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||!e.request.url.startsWith(self.registration.scope))return;
  e.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    try{
      const fresh=await fetch(e.request,{cache:'no-store'});
      if(fresh && fresh.ok) cache.put(e.request,fresh.clone());
      return fresh;
    }catch(err){
      const cached=await cache.match(e.request);
      if(cached) return cached;
      if(e.request.mode==='navigate') return cache.match('./index.html');
      throw err;
    }
  })())
});
