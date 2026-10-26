export function render(){
  const pasos = [
    { n:'01', t:'Crea tu cuenta', d:'Regístrate gratis con tus datos de contacto. Solo te tomará un minuto y nos ayuda a conocer a las familias interesadas.' },
    { n:'02', t:'Explora el catálogo', d:'Filtra por tamaño, edad, sexo o refugio. Lee con calma la ficha de cada peludito y guarda tus favoritos.' },
    { n:'03', t:'Envía tu solicitud', d:'Desde la ficha de la mascota, presiona "Solicitar adopción" y completa el formulario. Llegará directo al refugio responsable.' },
    { n:'04', t:'Entrevista y visita', d:'El refugio te contactará en máximo 48 horas para agendar una entrevista y una visita presencial con el peludito.' },
    { n:'05', t:'Firma el compromiso', d:'Se firma la carta de adopción responsable y se agenda la entrega en el refugio o a domicilio.' },
    { n:'06', t:'Seguimiento', d:'Te acompañamos durante los primeros meses con asesoría y visitas de seguimiento para asegurar una adaptación exitosa.' }
  ];
  const requisitos = [
    'Ser mayor de 18 años con identificación oficial',
    'Comprobante de domicilio reciente',
    'Contar con espacio adecuado para el tamaño y la especie de la mascota',
    'Compromiso de esterilización si aplica',
    'Para gatos: ventanas y balcones con malla de protección',
    'Estar de acuerdo en recibir visitas de seguimiento',
    'No regalar, vender ni abandonar al peludito adoptado'
  ];

  return `
  <section class="page-head">
    <div class="container">
      <nav class="breadcrumb"><a href="#/">Inicio</a> <span>›</span> <span>Cómo adoptar</span></nav>
      <h1>Cómo adoptar en Patitas Potosinas</h1>
      <p>Un proceso claro, transparente y pensado para el bienestar del peludito y de tu familia.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head center">
        <span class="section-tag">Paso a paso</span>
        <h2>Seis pasos hacia un final feliz</h2>
      </div>
      <div class="steps steps-auto">
        ${pasos.map(p => `
          <article class="step">
            <div class="step-num">${p.n}</div>
            <h3>${p.t}</h3>
            <p>${p.d}</p>
          </article>`).join('')}
      </div>
    </div>
  </section>

  <section class="section section-sand">
    <div class="container split-grid">
      <div>
        <span class="section-tag">Requisitos</span>
        <h2 class="split-title">¿Qué necesitas para adoptar?</h2>
        <div class="health-list">
          ${requisitos.map(r => `<div class="health-item"><span class="tick">✓</span> ${r}</div>`).join('')}
        </div>
      </div>
      <div class="split-photo" style="aspect-ratio:4/3.4;">
        <img src="https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=900&q=75"
             alt="Gato adoptado descansando en casa">
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="cta-banner">
        <h2>¿Comenzamos?</h2>
        <p>Explora el catálogo y encuentra al peludito que cambiará tu vida.</p>
        <div class="cta-actions">
          <a href="#/mascotas" class="btn btn-white btn-lg">Ver mascotas</a>
          <a href="#/registro" class="btn btn-outline-white btn-lg">Crear cuenta</a>
        </div>
      </div>
    </div>
  </section>
  `;
}

export function init(){}