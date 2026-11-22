/* Service worker voor Siña Papiamentu — maakt de app installeerbaar en offline bruikbaar.
   Bump CACHE bij een nieuwe versie zodat oude bestanden opgeruimd worden. */
const CACHE = "sina-pap-v2";
const CORE = [
  "./", "./index.html", "./manifest.webmanifest",
  "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"
];

self.addEventListener("install", e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await c.addAll(CORE);
    try { await c.add("./audio-pap.js"); } catch (err) {}  /* echte stem; mag ontbreken */
    self.skipWaiting();
  })());
});

self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;  /* Claude API & Supabase met rust laten */

  const isDoc = req.mode === "navigate" || url.pathname.endsWith("/") || url.pathname.endsWith("index.html");
  if (isDoc) {
    /* network-first: online altijd de nieuwste app, offline uit de cache */
    e.respondWith((async () => {
      try {
        const res = await fetch(req);
        const c = await caches.open(CACHE); c.put("./index.html", res.clone());
        return res;
      } catch (err) {
        return (await caches.match("./index.html")) || (await caches.match("./")) || Response.error();
      }
    })());
    return;
  }

  /* overige eigen bestanden (audio, iconen, manifest): cache-first, scheelt data */
  e.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;
    try {
      const res = await fetch(req);
      if (res && res.ok) { const c = await caches.open(CACHE); c.put(req, res.clone()); }
      return res;
    } catch (err) { throw err; }
  })());
});
