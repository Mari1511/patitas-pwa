import { REFUGIOS } from '../data.js';
import { edadTexto, claseEstado, iconoSexo, iconoEspecie } from '../utils.js';

const KEY_FAVS = 'patitas:favoritos';

function leerFavs(){
  try { return JSON.parse(localStorage.getItem(KEY_FAVS)) || []; } catch { return []; }
}
function guardarFavs(lista){
  try { localStorage.setItem(KEY_FAVS, JSON.stringify(lista)); } catch { /* sin espacio o modo privado */ }
}
export function esFav(id){ return leerFavs().includes(String(id)); }

export function refugioDe(m){
  return REFUGIOS[m.refugio] || { nombre:'Refugio aliado', ciudad:'San Luis Potosí, SLP', tel:'—', correo:'—' };
}

export function petCardHTML(m){
  const r = refugioDe(m);
  const fav = esFav(m.id);
  return `
    <article class="pet-card fade-in">
      <a href="#/mascota/${m.id}" class="pet-photo" aria-label="Ver detalles de ${m.nombre}">
        <img src="${m.img}" alt="${m.nombre}, ${m.raza}">
        <span class="badge ${claseEstado(m.estado)}">${m.estado}</span>
        <button class="pet-fav${fav ? ' on' : ''}" type="button" data-fav="${m.id}"
                aria-label="Guardar en favoritos">${fav ? '❤️' : '🤍'}</button>
      </a>
      <div class="pet-body">
        <div class="pet-title-row">
          <h3 class="pet-name">${m.nombre}</h3>
          <span class="pet-age">${edadTexto(m)}</span>
        </div>
        <div class="pet-meta">
          <span class="chip">${iconoSexo(m.sexo)} ${m.sexo}</span>
          <span class="chip">${iconoEspecie(m.especie)} ${m.raza}</span>
          <span class="chip">📏 ${m.tamano}</span>
        </div>
        <div class="pet-shelter">
          <span class="pin">📍</span> ${r.nombre} · ${r.ciudad.split(',')[0]}
        </div>
        <a href="#/mascota/${m.id}" class="btn btn-primary btn-block btn-sm">Ver detalles</a>
      </div>
    </article>
  `;
}

export function toggleFav(btn){
  const id = String(btn.dataset.fav);
  const lista = leerFavs();
  const activo = !lista.includes(id);
  guardarFavs(activo ? [...lista, id] : lista.filter(x => x !== id));
  btn.classList.toggle('on', activo);
  btn.textContent = activo ? '❤️' : '🤍';
}