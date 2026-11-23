import { $, validarFormulario, toast, edadTexto } from '../utils.js';
import { refugioDe } from '../components/petCard.js';
import { notificarSolicitudAdopcion } from '../pwa.js';
import { encolarSolicitud } from '../outbox.js';

export function abrirModalAdopcion(m){
  const r = refugioDe(m);
  const root = $('#modalRoot');
  root.innerHTML = '<div class="modal-overlay" id="overlay"><div class="modal" role="dialog" aria-modal="true" aria-label="Solicitar adopción">' +
    '<div class="modal-head"><h3>Solicitar adopción</h3><button class="modal-close" id="modalClose" aria-label="Cerrar">✕</button></div>' +
    '<div class="modal-body">' +
      '<div class="modal-pet"><img src="' + m.img + '" alt="' + m.nombre + '"><div><strong>' + m.nombre + '</strong><small>' + m.raza + ' · ' + edadTexto(m) + ' · ' + m.sexo + '</small></div></div>' +
      '<form id="adopForm" novalidate>' +
        '<div class="form-row">' +
          '<div class="field"><label for="aNombre">Nombre completo *</label><input class="input" id="aNombre" placeholder="Ana Martínez" required><span class="err">Ingresa tu nombre completo.</span></div>' +
          '<div class="field"><label for="aTel">Teléfono *</label><input class="input" id="aTel" placeholder="444 123 4567" required><span class="err">Ingresa un teléfono de contacto.</span></div>' +
        '</div>' +
        '<div class="field"><label for="aCorreo">Correo electrónico *</label><input class="input" id="aCorreo" type="email" placeholder="ana@correo.com" required><span class="err">Ingresa un correo válido.</span></div>' +
        '<div class="form-row">' +
          '<div class="field"><label for="aCiudad">Ciudad *</label><input class="input" id="aCiudad" placeholder="San Luis Potosí" required><span class="err">Ingresa tu ciudad.</span></div>' +
          '<div class="field"><label for="aVivienda">Tipo de vivienda *</label><select class="input" id="aVivienda" required><option value="">Selecciona…</option><option>Casa con patio</option><option>Casa sin patio</option><option>Departamento</option><option>Otro</option></select><span class="err">Selecciona una opción.</span></div>' +
        '</div>' +
        '<div class="field"><label for="aMensaje">¿Por qué quieres adoptar a ' + m.nombre + '?</label><textarea class="input" id="aMensaje" rows="3" placeholder="Cuéntanos un poco sobre ti…" style="resize:vertical;min-height:88px;"></textarea></div>' +
        '<label class="check-row"><input type="checkbox" id="aAcepto" required><span>Acepto el proceso de adopción y entiendo que el refugio <strong>' + r.nombre + '</strong> se pondrá en contacto conmigo para una entrevista.</span></label>' +
        '<button type="submit" class="btn btn-primary btn-block btn-lg">Enviar solicitud</button>' +
      '</form>' +
    '</div></div></div>';

  const overlay = $('#overlay');
  const cerrar = () => { root.innerHTML = ''; document.body.style.overflow = ''; };
  document.body.style.overflow = 'hidden';

  $('#modalClose').addEventListener('click', cerrar);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) cerrar(); });
  document.addEventListener('keydown', function esc(e){
    if (e.key === 'Escape'){ cerrar(); document.removeEventListener('keydown', esc); }
  });

  $('#adopForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validarFormulario(e.target)){ toast('Revisa los campos marcados', 'err'); return; }
    const btn = $('button[type="submit"]', e.target);
    btn.disabled = true;
    btn.textContent = 'Enviando…';

    const datos = {
      to_name: $('#aNombre').value.trim(),
      to_email: $('#aCorreo').value.trim(),
      telefono: $('#aTel').value.trim(),
      ciudad: $('#aCiudad').value.trim(),
      vivienda: $('#aVivienda').value,
      mensaje: $('#aMensaje').value.trim() || '(sin mensaje)',
      mascota: m.nombre,
      mascota_raza: m.raza,
      refugio: r.nombre,
      refugio_correo: r.correo,
      refugio_tel: r.tel,
      fecha: new Date().toLocaleString('es-MX', { dateStyle: 'long', timeStyle: 'short' }),
    };

    let enviada;
    try {
      // Se guarda en el dispositivo primero: si no hay Internet, se envía después
      enviada = await encolarSolicitud(datos);
    } catch (err) {
      console.error(err);
      btn.disabled = false;
      btn.textContent = 'Enviar solicitud';
      toast('No se pudo guardar la solicitud. Intenta de nuevo.', 'err');
      return;
    }

    const nombre = escapar(datos.to_name);
    const correo = escapar(datos.to_email);
    const titulo = enviada ? '¡Solicitud enviada!' : 'Solicitud guardada';
    const texto = enviada
      ? 'Gracias, <strong>' + nombre + '</strong>. Tu solicitud para adoptar a <strong>' + m.nombre + '</strong> fue enviada a <strong>' + r.nombre + '</strong>. Te mandamos una confirmación a <strong>' + correo + '</strong>. Te contactarán en máximo 48 horas.'
      : 'No tienes conexión, <strong>' + nombre + '</strong>, pero no te preocupes: tu solicitud para adoptar a <strong>' + m.nombre + '</strong> quedó guardada en tu dispositivo y <strong>se enviará sola en cuanto vuelva el Internet</strong>. Recibirás la confirmación en <strong>' + correo + '</strong>.';

    $('.modal-body', overlay).innerHTML = '<div class="success-box"><div class="success-icon">' + (enviada ? '✓' : '📥') + '</div><h3>' + titulo + '</h3><p>' + texto + '</p>' +
      '<p style="margin-top:-12px;">¿Quieres agilizarlo? Escríbele directo al refugio:</p>' +
      '<a class="btn btn-whatsapp btn-block" target="_blank" rel="noopener" href="' + enlaceWhatsApp(r.tel, datos) + '">💬 Enviar por WhatsApp</a>' +
      '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:14px;"><a href="#/mascotas" class="btn btn-ghost" id="verMasBtn">Ver más mascotas</a><button class="btn btn-primary" id="cerrarOk">Entendido</button></div></div>';
    $('#cerrarOk').addEventListener('click', cerrar);
    const vm = $('#verMasBtn'); if (vm) vm.addEventListener('click', cerrar);
    toast(enviada ? 'Solicitud de adopción enviada 🐾' : 'Sin conexión: la solicitud se enviará después 📥', 'ok');
    notificarSolicitudAdopcion(m.nombre, r.nombre, enviada);
  });
}

// wa.me abre WhatsApp con el mensaje ya escrito; el usuario solo presiona "Enviar".
// (WhatsApp guarda el mensaje y lo manda cuando el teléfono tenga señal.)
function enlaceWhatsApp(tel, d){
  const numero = String(tel).replace(/\D/g, ''); // "+52 444 123 4567" → "524441234567"
  const msg = 'Hola, ' + d.refugio + ' 🐾\n' +
    'Acabo de enviar una solicitud en Patitas Potosinas para adoptar a *' + d.mascota + '* (' + d.mascota_raza + ').\n\n' +
    'Nombre: ' + d.to_name + '\nTeléfono: ' + d.telefono + '\nCorreo: ' + d.to_email + '\n' +
    'Ciudad: ' + d.ciudad + '\nVivienda: ' + d.vivienda + '\n\n' + d.mensaje;
  return 'https://wa.me/' + numero + '?text=' + encodeURIComponent(msg);
}

function escapar(t){
  return t.replace(/[&<>"']/g, (c) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
}
