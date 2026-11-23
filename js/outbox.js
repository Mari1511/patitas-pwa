/* =========================================================
   Patitas Potosinas — Bandeja de salida (outbox)
   ---------------------------------------------------------
   Cada solicitud de adopción se guarda primero en IndexedDB
   y luego se intenta enviar. Si no hay Internet:
   - Chrome/Edge/Android: Background Sync → el service worker
     la envía al volver la conexión, aunque la app esté cerrada.
   - Safari/Firefox (sin Background Sync): se envía al
     recuperar la conexión o la próxima vez que se abra la app.

   sw.js tiene una copia mínima de abrirDB()/enviarPendientes();
   si cambias DB_NAME, STORE o el formato del registro,
   cámbialo también allá.
   ========================================================= */
import { EMAILJS, emailConfigurado } from './config.js';

const DB_NAME = 'patitas-outbox';
const STORE = 'solicitudes';
const SYNC_TAG = 'enviar-solicitudes';
const ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';

function abrirDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE, { keyPath: 'id', autoIncrement: true });
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function tx(modo, fn) {
  const db = await abrirDB();
  return new Promise((resolve, reject) => {
    const t = db.transaction(STORE, modo);
    const resultado = fn(t.objectStore(STORE));
    t.oncomplete = () => resolve(resultado?.result);
    t.onerror = () => reject(t.error);
  });
}

const listar = () => tx('readonly', (s) => s.getAll());
const borrar = (id) => tx('readwrite', (s) => s.delete(id));

export const contarPendientes = () => tx('readonly', (s) => s.count());

/**
 * Guarda la solicitud y trata de enviarla.
 * Devuelve true si ya se envió, false si quedó en cola.
 */
export async function encolarSolicitud(params) {
  const registro = {
    creada: Date.now(),
    // endpoint null = modo demo (sin claves de EmailJS)
    endpoint: emailConfigurado() ? ENDPOINT : null,
    payload: {
      service_id: EMAILJS.serviceId,
      template_id: EMAILJS.templateId,
      user_id: EMAILJS.publicKey,
      template_params: params,
    },
  };
  await tx('readwrite', (s) => s.add(registro));

  // Con Background Sync el service worker se encarga (evita envíos dobles)
  if (await registrarSync()) {
    if (!navigator.onLine) return false;
    // Con conexión el sync se dispara casi de inmediato; damos un momento
    await new Promise((r) => setTimeout(r, 1500));
    return (await contarPendientes()) === 0;
  }
  return (await enviarPendientes()) > 0 && (await contarPendientes()) === 0;
}

async function registrarSync() {
  if (!('serviceWorker' in navigator)) return false;
  const reg = await navigator.serviceWorker.ready;
  if (!('sync' in reg)) return false;
  try {
    await reg.sync.register(SYNC_TAG);
    return true;
  } catch {
    return false; // p. ej. permiso de sincronización bloqueado
  }
}

let enviando = false;

/** Envía todo lo pendiente desde la página. Devuelve cuántas se enviaron. */
export async function enviarPendientes() {
  if (enviando || !navigator.onLine) return 0;
  enviando = true;
  let enviadas = 0;
  try {
    for (const r of await listar()) {
      if (await enviar(r)) {
        await borrar(r.id);
        enviadas++;
      }
    }
  } finally {
    enviando = false;
  }
  return enviadas;
}

async function enviar(r) {
  if (!r.endpoint) {
    console.info('[Patitas · MODO DEMO] Correo que se enviaría:', r.payload.template_params);
    return true;
  }
  try {
    const resp = await fetch(r.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(r.payload),
    });
    if (resp.ok) return true;
    // 4xx = error de configuración: no se arreglará reintentando, pero lo dejamos
    // en cola para no perder la solicitud y lo mostramos en consola.
    console.error('EmailJS respondió', resp.status, await resp.text());
    return false;
  } catch {
    return false; // sin red: se queda en la cola
  }
}

/** Para navegadores sin Background Sync: reintenta al abrir la app y al volver la red. */
export async function initOutbox(alEnviar) {
  if (!('indexedDB' in window)) return;
  const intentar = async () => {
    // Se revisa en cada intento: en la primera visita el SW aún no está registrado
    const reg = 'serviceWorker' in navigator ? await navigator.serviceWorker.getRegistration() : null;
    if (reg && 'sync' in reg) {
      // El SW se encarga; solo nos aseguramos de que haya un sync registrado si quedó algo
      if ((await contarPendientes()) > 0) registrarSync();
      return;
    }
    const n = await enviarPendientes();
    if (n > 0) alEnviar(n);
  };
  window.addEventListener('online', intentar);
  intentar();
}
