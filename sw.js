const CACHE='jay-chuay-wan-1.1.0';
const FILES=["./", "./index.html", "./style.css", "./app.js", "./db.js", "./logic.js", "./theme.js", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./manifests/pink.webmanifest", "./manifests/yellow.webmanifest", "./manifests/blue.webmanifest", "./icons/pink/icon-192.png", "./icons/pink/icon-512.png", "./icons/yellow/icon-192.png", "./icons/yellow/icon-512.png", "./icons/blue/icon-192.png", "./icons/blue/icon-512.png"];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES.map(url=>new Request(url,{cache:"reload"})))).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(k=>/^jay-chuay-(thai|wan)-/.test(k)&&k!==CACHE).map(k=>caches.delete(k)));
  await self.clients.claim();
})()));
self.addEventListener('message',e=>{if(e.data&&e.data.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET'||!e.request.url.startsWith(self.registration.scope))return;
 e.respondWith((async()=>{const c=await caches.open(CACHE);if(e.request.mode==='navigate')return (await c.match('./index.html'))||fetch(e.request);return (await c.match(e.request))||fetch(e.request)})());
});
