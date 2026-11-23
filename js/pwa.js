/* =========================================================
   Patitas Potosinas — Lado de la página de la PWA
   - Registra el service worker (sw.js)
   - Muestra el aviso "Sin conexión"
   - Botón "Instalar app" (Android / Chrome / Edge)
   - Notificaciones con la Notifications API (sin servidor)
   ========================================================= */
import { toast } from './utils.js';
import { initOutbox } from './outbox.js';

const ICONO = './img/icons/icon-192.png';

export function initPWA() {
  registrarServiceWorker();
  initAvisoSinConexion();
  initBotonInstalar();
  // Solicitudes guardadas sin conexión (Safari/Firefox las envían desde aquí)
  initOutbox((n) => avisarSolicitudesEnviadas(n));
}

function avisarSolicitudesEnviadas(n) {
  avisar(
    'Solicitud enviada 🐾',
    n === 1
      ? 'Ya hay conexión: tu solicitud de adopción pendiente se envió. Revisa tu correo.'
      : `Ya hay conexión: se enviaron ${n} solicitudes pendientes. Revisa tu correo.`,
    '#/mascotas'
  );
}

/* ---------- 1. Service worker ---------- */
async function registrarServiceWorker() {
  if (!('serviceWorker' in navigator)) return;

  navigator.serviceWorker.addEventListener('message', (e) => {
    const { type, url } = e.data || {};
    if (type === 'OFFLINE_READY') {
      avisar('Patitas ya funciona sin conexión', 'Puedes ver el catálogo aunque no tengas Internet.', '#/mascotas');
    }
    if (type === 'UPDATED') {
      avisar('El catálogo se actualizó', 'Hay nuevos peluditos o cambios en las fichas.', '#/mascotas');
    }
    if (type === 'OUTBOX_SENT') avisarSolicitudesEnviadas(e.data.mascotas.length);
    if (type === 'NAVIGATE' && url) location.href = url; // solo cambia el #
  });

  try {
    await navigator.serviceWorker.register('./sw.js');
  } catch (err) {
    console.error('No se pudo registrar el service worker:', err);
  }
}

/* ---------- 2. Aviso "Sin conexión" ---------- */
function initAvisoSinConexion() {
  const aviso = document.createElement('div');
  aviso.className = 'aviso-offline';
  aviso.setAttribute('role', 'status');
  aviso.textContent = 'Sin conexión: estás viendo la versión guardada del catálogo.';

  const header = document.getElementById('navbar');
  if (header) header.after(aviso);
  else document.body.prepend(aviso);

  const actualizar = () => { aviso.hidden = navigator.onLine; };
  window.addEventListener('online', () => { actualizar(); toast('Conexión recuperada', 'ok'); });
  window.addEventListener('offline', actualizar);
  actualizar();
}

/* ---------- 3. Botón "Instalar app" ---------- */
// En Android/Chrome el navegador avisa que la app es instalable (beforeinstallprompt).
// En iPhone no existe ese evento: se instala con Compartir → "Agregar a inicio".
let eventoInstalar = null;

function initBotonInstalar() {
  const btn = document.getElementById('btnInstalar');
  if (!btn) return;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    eventoInstalar = e;
    btn.hidden = false;
  });

  btn.addEventListener('click', async () => {
    if (!eventoInstalar) return;
    eventoInstalar.prompt();
    await eventoInstalar.userChoice;
    eventoInstalar = null;
    btn.hidden = true;
  });

  window.addEventListener('appinstalled', () => {
    btn.hidden = true;
    toast('Patitas Potosinas se instaló en tu dispositivo 🐾', 'ok');
  });
}

/* ---------- 4. Notificaciones ---------- */
// El permiso se pide SOLO después de una acción del usuario
export async function pedirPermisoNotificaciones() {
  if (!('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  if (Notification.permission === 'denied') return false;
  return (await Notification.requestPermission()) === 'granted';
}

// Notificación del sistema si hay permiso; si no, el toast de siempre
export async function avisar(titulo, cuerpo, ruta = '#/') {
  const permitido = 'Notification' in window && Notification.permission === 'granted';
  const reg = permitido && 'serviceWorker' in navigator
    ? await navigator.serviceWorker.getRegistration()
    : null;

  if (reg) {
    await reg.showNotification(titulo, {
      body: cuerpo,
      icon: ICONO,
      badge: ICONO,
      tag: titulo,
      data: { url: ruta },
    });
    return;
  }
  toast(`${titulo}. ${cuerpo}`, 'ok');
}

// Se llama desde js/modals/adopcion.js
// enviada = false → quedó guardada en la cola offline
export async function notificarSolicitudAdopcion(nombreMascota, nombreRefugio, enviada = true) {
  // Se pide el permiso aunque esté en cola: así el SW puede avisar cuando se envíe
  if (!(await pedirPermisoNotificaciones())) return;
  if (enviada) {
    avisar(
      'Solicitud enviada 🐾',
      `Tu solicitud para adoptar a ${nombreMascota} llegó a ${nombreRefugio}. Te enviamos un correo de confirmación.`,
      '#/mascotas'
    );
  } else {
    avisar(
      'Solicitud guardada 📥',
      `No hay conexión. Tu solicitud para adoptar a ${nombreMascota} se enviará en cuanto vuelva el Internet.`,
      '#/mascotas'
    );
  }
}

// Se llama desde el formulario "Recibe novedades" del footer
export async function notificarSuscripcion() {
  if (await pedirPermisoNotificaciones()) {
    avisar('¡Listo! 🐶', 'Te avisaremos cuando lleguen nuevos peluditos.', '#/mascotas');
  }
}
