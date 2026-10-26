import { MASCOTAS } from '../data.js';
import { petCardHTML } from '../components/petCard.js';
import { EDAD_CATEGORIAS, categoriaEdad, $, $$ } from '../utils.js';

const FILTROS_VACIOS = { q:'', especie:'', sexo:'', edad:'', tamano:'', estado:'', orden:'recientes' };
const filtros = { ...FILTROS_VACIOS };

export function render(){
  return `
  <section class="page-head">
    <div class="container">
      <nav class="breadcrumb"><a href="#/">Inicio</a> <span>›</span> <span>Mascotas</span></nav>
      <h1>Mascotas en adopción</h1>
      <p>Encuentra a tu compañero ideal. Perros y gatos rescatados esperan un hogar. Usa los filtros para afinar tu búsqueda por especie, sexo, edad, tamaño o estado.</p>
    </div>
  </section>

  <section class="section" style="padding-top:38px;">
    <div class="container">
      <div class="filters">
        <div class="search-row">
          <div class="search-box">
            <span class="icon">🔍</span>
            <input type="search" class="input" id="fQ" placeholder="Buscar por nombre, raza o especie…" />
          </div>
          <select class="input order-select" id="fOrden">
            <option value="recientes">Ordenar: Recientes</option>
            <option value="nombre">Nombre (A–Z)</option>
            <option value="edad-asc">Edad: menor a mayor</option>
            <option value="edad-desc">Edad: mayor a menor</option>
            <option value="urgente">Casos Urgentes</option>
          </select>
        </div>

        <div class="species-tabs" role="group" aria-label="Filtrar por especie">
          <button type="button" class="species-tab" data-especie="">🐾 Todos</button>
          <button type="button" class="species-tab" data-especie="Perro">🐶 Perros</button>
          <button type="button" class="species-tab" data-especie="Gato">🐱 Gatos</button>
        </div>

        <div class="filter-grid">
          <div>
            <label class="filter-label" for="fSexo">Sexo</label>
            <select class="input" id="fSexo">
              <option value="">Todos</option>
              <option value="Hembra">Hembra</option>
              <option value="Macho">Macho</option>
            </select>
          </div>
          <div>
            <label class="filter-label" for="fEdad">Edad</label>
            <select class="input" id="fEdad">
              <option value="">Todas</option>
              ${EDAD_CATEGORIAS.map(c => `<option value="${c.key}">${c.label}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="filter-label" for="fTamano">Tamaño</label>
            <select class="input" id="fTamano">
              <option value="">Todos</option>
              <option value="Pequeño">Pequeño</option>
              <option value="Mediano">Mediano</option>
              <option value="Grande">Grande</option>
            </select>
          </div>
          <div>
            <label class="filter-label" for="fEstado">Estado</label>
            <select class="input" id="fEstado">
              <option value="">Todos</option>
              <option value="Disponible">Disponible</option>
              <option value="En proceso">En proceso</option>
              <option value="Adoptado">Adoptado</option>
            </select>
          </div>
        </div>

        <div class="filter-actions">
          <span class="results-count" id="resultsCount"></span>
          <button class="link-clear" id="clearFilters" type="button">Limpiar filtros ✕</button>
        </div>
      </div>

      <div id="petsResults"></div>
    </div>
  </section>
  `;
}

export function init(){
  // Restaurar valores
  $('#fQ').value = filtros.q;
  $('#fSexo').value = filtros.sexo;
  $('#fEdad').value = filtros.edad;
  $('#fTamano').value = filtros.tamano;
  $('#fEstado').value = filtros.estado;
  $('#fOrden').value = filtros.orden;
  marcarEspecie();

  $$('.species-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      filtros.especie = btn.dataset.especie;
      marcarEspecie();
      aplicarFiltros();
    });
  });

  const update = () => {
    filtros.q = $('#fQ').value;
    filtros.sexo = $('#fSexo').value;
    filtros.edad = $('#fEdad').value;
    filtros.tamano = $('#fTamano').value;
    filtros.estado = $('#fEstado').value;
    filtros.orden = $('#fOrden').value;
    aplicarFiltros();
  };

  $('#fQ').addEventListener('input', update);
  ['#fSexo','#fEdad','#fTamano','#fEstado','#fOrden'].forEach(sel => {
    $(sel).addEventListener('change', update);
  });

  $('#clearFilters').addEventListener('click', limpiarFiltros);

  aplicarFiltros();
}

function marcarEspecie(){
  $$('.species-tab').forEach(b => {
    const activo = b.dataset.especie === filtros.especie;
    b.classList.toggle('active', activo);
    b.setAttribute('aria-pressed', activo);
  });
}

function limpiarFiltros(){
  Object.assign(filtros, FILTROS_VACIOS);
  $('#fQ').value = '';
  $('#fSexo').value = '';
  $('#fEdad').value = '';
  $('#fTamano').value = '';
  $('#fEstado').value = '';
  $('#fOrden').value = 'recientes';
  marcarEspecie();
  aplicarFiltros();
}

function aplicarFiltros(){
  const q = filtros.q.trim().toLowerCase();
  let lista = MASCOTAS.filter(m => {
    const okQ = !q || m.nombre.toLowerCase().includes(q) || m.raza.toLowerCase().includes(q) || m.especie.toLowerCase().includes(q);
    const okEsp = !filtros.especie || m.especie === filtros.especie;
    const okSexo = !filtros.sexo || m.sexo === filtros.sexo;
    const okEdad = !filtros.edad || categoriaEdad(m) === filtros.edad;
    const okTam = !filtros.tamano || m.tamano === filtros.tamano;
    const okEst = !filtros.estado || m.estado === filtros.estado;
    return okQ && okEsp && okSexo && okEdad && okTam && okEst;
  });

  const edadNum = m => m.unidad === 'años' ? m.edad : m.edad / 12;
  if (filtros.orden === 'nombre') lista.sort((a,b) => a.nombre.localeCompare(b.nombre));
  if (filtros.orden === 'edad-asc') lista.sort((a,b) => edadNum(a) - edadNum(b));
  if (filtros.orden === 'urgente') lista = lista.filter(m => m.estado === 'Disponible');
  if (filtros.orden === 'edad-desc') lista.sort((a,b) => edadNum(b) - edadNum(a));

  const cont = $('#petsResults');
  const count = $('#resultsCount');

  if (count){
    count.innerHTML = `Mostrando <strong>${lista.length}</strong> de <strong>${MASCOTAS.length}</strong> peluditos`;
  }

  if (!lista.length){
    cont.innerHTML = `
      <div class="empty">
        <div class="emoji">🐾</div>
        <h3>No encontramos peluditos con esos filtros</h3>
        <p>Intenta ampliar tu búsqueda o limpiar los filtros para ver todas las mascotas disponibles.</p>
        <button class="btn btn-primary" id="emptyReset" type="button">Ver todas las mascotas</button>
      </div>`;
    $('#emptyReset').addEventListener('click', limpiarFiltros);
    return;
  }

  cont.innerHTML = `<div class="pets-grid">${lista.map(petCardHTML).join('')}</div>`;
}