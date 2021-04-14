/* Este archivo debe estar
 * colocado en la carpeta raíz del
 * sitio.
 * 
 * Cualquier cambio en el
 * contenido de este archivo hace
 * que el service worker se
 * reinstale.
 * 
 * Normalmente se cambia el número
 * en el nombre del caché cuando
 * cambia el contenido de los
 * archivos.
 * 
 * Cuando uses GitHub Pages espera
 * 11 minutos después de hacer los
 * cambios en tu sitio, para
 * depués actualizar este archivo.
 */
const CACHE_NAME = "dmppwa-2.03";

/** Archivos requeridos para que
 * la aplicación funcione fuera de
 * línea.
 */
const ARCHIVOS = [
  "sw.js",
  "favicon.ico",
  "Index.html",
  "site.webmanifest",
  "dispositivo.html",
  "historial.html",
  "internetThings.html",//Cambiar
  "css/colores.css",
  "css/estilos.css",
  "css/estilosThings.css",
  "cmp/mi-footer.js",
  "disp/CtrlDispositivo.js",
  "disp/ProxyEntrada.js",
  "disp/ProxyHistorial.js",
  "disp/ProxySalida.js",
  "disp/ResInt.js",
  "disp/utilIoT.js",
  "img/icono256.png",
  "js/config.js",
  "js/CtrlDivide.js",
  "js/regSw.js",
  "js/tipos.js",
  "js/init.js",
  "js/CtrlMovil.js",
  "js/CtrlHistorial.js",
  "js/CtrlDivide.js",
  "lib/campo-dinamico.js",
  "lib/campos.css",
  "lib/fabrica.js",
  "lib/icono.css",
  "lib/material-icons.css",
  "lib/MaterialIcons-Regular.codepoints",
  "lib/MaterialIcons-Regular.ttf",
  "lib/mi-nav.css",
  "lib/movil.js",
  "lib/principal.css",
  "lib/roboto-v20-latin-700.woff",
  "lib/roboto-v20-latin-700.woff2",
  "lib/roboto-v20-latin-regular.woff",
  "lib/roboto-v20-latin-regular.woff2",
  "lib/roboto.css",
  "lib/tiposFire.js",
  "lib/util.js",
  "/"
];

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
  //Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          //recuperar del cache
          return res
        }
        //recuperar de la petición a la url
        return fetch(e.request)
      }).catch(err => console.log('Falló algo al solicitar recursos', err))
  )
})