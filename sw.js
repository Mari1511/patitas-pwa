/* =========================================================
   Patitas Potosinas — Service Worker
   Súbele el número a VERSION cada vez que cambie data.js,
   una vista, el CSS o una foto. Así el teléfono descarga
   la versión nueva y avisa que "el catálogo se actualizó".
   ========================================================= */
const VERSION = 'v2';
const CACHE_APP = `patitas-app-${VERSION}`;         // cascarón + código + íconos
const CACHE_RUNTIME = `patitas-runtime-${VERSION}`; // fuentes y fotos externas

// IMPORTANTE: como el proyecto usa módulos ES6, si falta UN solo
// archivo .js aquí, el import falla sin conexión y la app no carga.
// Comando para sacar la lista real:  find css js img -type f
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './css/styles.css',
  './js/app.js',
  './js/pwa.js',
  './js/data.js',
  './js/router.js',
  './js/utils.js',
  './js/components/petCard.js',
  './js/modals/adopcion.js',
  './js/views/home.js',
  './js/views/mascotas.js',
  './js/views/detalle.js',
  './js/views/comoAdoptar.js',
  './js/views/nosotros.js',
  './js/views/login.js',
  './js/views/registro.js',
  './js/views/notFound.js',
  './img/icons/icon-192.png',
  './img/icons/icon-512.png',
  './img/icons/icon-maskable-512.png',
  './img/icons/apple-touch-icon.png',
  // Cuando descarguen las fotos a img/mascotas/ en WebP, agréguenlas aquí:
  // './img/mascotas/luna.webp',
];

/* ---------- INSTALL: guarda todo en el dispositivo ---------- */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_APP)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

/* ---------- ACTIVATE: borra versiones viejas y avisa ---------- */
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    const viejas = keys.filter((k) => k.startsWith('patitas-') && k !== CACHE_APP && k !== CACHE_RUNTIME);
    const eraActualizacion = viejas.some((k) => k.startsWith('patitas-app-'));
    await Promise.all(viejas.map((k) => caches.delete(k)));
    await self.clients.claim();

    // La página decide si lo muestra como notificación del sistema o como toast
    const tipo = eraActualizacion ? 'UPDATED' : 'OFFLINE_READY';
    const ventanas = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    ventanas.forEach((c) => c.postMessage({ type: tipo }));
  })());
});

/* ---------- FETCH: decide de dónde sale cada archivo ---------- */
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // 1) Navegación: siempre el cascarón (las rutas #/ las resuelve router.js)
  if (req.mode === 'navigate') {
    event.respondWith(
      caches.match('./index.html').then((r) => r || fetch(req))
    );
    return;
  }

  // 2) Archivos propios: Cache First
  if (url.origin === self.location.origin) {
    event.respondWith(cacheFirst(req, CACHE_APP));
    return;
  }

  // 3) Google Fonts: Stale While Revalidate
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(staleWhileRevalidate(req));
    return;
  }

  // 4) Fotos de Unsplash (solo mientras no estén en img/mascotas/)
  if (url.hostname.endsWith('unsplash.com')) {
    event.respondWith(cacheFirst(req, CACHE_RUNTIME));
  }
});

async function cacheFirst(req, cacheName) {
  const guardada = await caches.match(req);
  if (guardada) return guardada;
  try {
    const resp = await fetch(req);
    if (resp.ok || resp.type === 'opaque') {
      const cache = await caches.open(cacheName);
      cache.put(req, resp.clone());
    }
    return resp;
  } catch {
    // Sin red y sin copia: el <img> dispara onerror y se usa la huella de respaldo
    return Response.error();
  }
}

async function staleWhileRevalidate(req) {
  const cache = await caches.open(CACHE_RUNTIME);
  const guardada = await cache.match(req);
  const red = fetch(req)
    .then((resp) => { cache.put(req, resp.clone()); return resp; })
    .catch(() => guardada);
  return guardada || red;
}

/* ---------- Clic en una notificación: abre la sección ---------- */
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const destino = new URL(event.notification.data?.url || '#/', self.registration.scope).href;

  event.waitUntil((async () => {
    const ventanas = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    if (ventanas.length) {
      ventanas[0].postMessage({ type: 'NAVIGATE', url: destino });
      return ventanas[0].focus();
    }
    return self.clients.openWindow(destino);
  })());
});
