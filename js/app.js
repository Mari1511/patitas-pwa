import { MASCOTAS } from './data.js';
import { FALLBACK_IMG, $, toast } from './utils.js';
import { toggleFav } from './components/petCard.js';
import { router } from './router.js';
import { initPWA, notificarSuscripcion } from './pwa.js';

// Exponer datos al scope global (temporal, mientras se conectan los microservicios)
window.__MASCOTAS__ = MASCOTAS;

document.addEventListener('DOMContentLoaded', () => {
  // PWA: service worker, aviso sin conexión y botón de instalar
  initPWA();

  // Año dinámico
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Navbar con scroll
  const navbar = $('#navbar');
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 12);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Menú móvil
  $('#navToggle').addEventListener('click', () => {
    const menu = $('#mobileMenu');
    menu.classList.toggle('open');
    $('#navToggle').textContent = menu.classList.contains('open') ? '✕' : '☰';
  });

  // Newsletter
  const nl = $('#newsletterForm');
  if (nl){
    nl.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = nl.querySelector('input');
      toast('¡Gracias! Te avisaremos de nuevos peluditos 🐾', 'ok');
      notificarSuscripcion(); // pide permiso de notificaciones (acción del usuario)
      input.value = '';
    });
  }

  // Manejo global de errores de imágenes
  document.addEventListener('error', (e) => {
    const el = e.target;
    if (el && el.tagName === 'IMG' && !el.dataset.fb){
      el.dataset.fb = '1';
      el.src = FALLBACK_IMG;
    }
  }, true);

  // Delegación global para botón favorito
  document.addEventListener('click', (e) => {
    const fav = e.target.closest('[data-fav]');
    if (fav){
      e.preventDefault();
      e.stopPropagation();
      toggleFav(fav);
      toast(fav.classList.contains('on') ? 'Agregado a tus favoritos' : 'Quitado de tus favoritos', 'ok');
    }
  });

  // Router
  window.addEventListener('hashchange', router);
  if (!location.hash) location.hash = '#/';
  router();
});

