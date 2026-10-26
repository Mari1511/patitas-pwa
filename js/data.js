export const FALLBACK_IMG = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="620"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F7EEE5"/><stop offset="1" stop-color="#EDDFD0"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><text x="400" y="330" font-size="130" text-anchor="middle">🐾</text></svg>'
);

export const REFUGIOS = {
  huizache:   { nombre:'Refugio Huizache',                   ciudad:'San Luis Potosí, SLP',                tel:'+52 444 123 4567', correo:'hola@refugiohuizache.mx' },
  sierra:     { nombre:'Albergue Los Perritos de la Sierra', ciudad:'Soledad de Graciano Sánchez, SLP',    tel:'+52 444 987 1122', correo:'contacto@perritosdesierra.mx' },
  matehuala:  { nombre:'Casa Hogar Canina Matehuala',        ciudad:'Matehuala, SLP',                      tel:'+52 488 555 0198', correo:'info@casahogarmatehuala.mx' },
  desierto:   { nombre:'Refugio Patitas del Desierto',       ciudad:'Soledad de Graciano Sánchez, SLP',    tel:'+52 444 776 3040', correo:'adopta@patitasdeldesierto.mx' },
  rioverde:   { nombre:'Albergue San Francisco',             ciudad:'Rioverde, SLP',                       tel:'+52 487 220 8843', correo:'alberguesf@rioverde.mx' }
};

export const MASCOTAS = [
  {
    id:1, especie:'Perro', nombre:'Luna', raza:'Golden Retriever', edad:2, unidad:'años', sexo:'Hembra',
    tamano:'Grande', estado:'Disponible', color:'Dorado', peso:'27 kg',
    refugio:'huizache', img:'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=70',
    tags:['Juguetona','Cariñosa','Buena con niños'],
    vacunas:true, esterilizado:true, desparasitado:true, microchip:true,
    descripcion:'Luna fue rescatada junto a sus hermanos en las inmediaciones del Parque Tangamanga. Es una perrita increíblemente cariñosa que adora jugar a traer la pelota y nadar. Se lleva muy bien con niños y con otros perros. Busca una familia activa que le dé paseos diarios y mucho amor.',
    historia:'Rescatada el 12 de marzo de 2024 en la colonia Industrial Mexicana.'
  },
  {
    id:2, especie:'Perro', nombre:'Rocky', raza:'Pastor Alemán', edad:4, unidad:'años', sexo:'Macho',
    tamano:'Grande', estado:'Disponible', color:'Negro y café', peso:'34 kg',
    refugio:'sierra', img:'https://images.unsplash.com/photo-1568572933382-74d440642117?auto=format&fit=crop&w=900&q=70',
    tags:['Tranquilo','Leal','Obediente'],
    vacunas:true, esterilizado:true, desparasitado:true, microchip:true,
    descripcion:'Rocky es un compañero fiel y equilibrado. Ya sabe sentarse, quedarse y caminar con correa sin jalar. Ideal para familias con espacio y tiempo para ejercitarlo. Es protector con su hogar pero sumamente dulce con quienes conoce.',
    historia:'Entregado en adopción por cambio de domicilio de su familia anterior.'
  },
  {
    id:3, especie:'Perro', nombre:'Canela', raza:'Mestiza', edad:11, unidad:'meses', sexo:'Hembra',
    tamano:'Mediano', estado:'Disponible', color:'Canela', peso:'14 kg',
    refugio:'desierto', img:'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=900&q=70',
    tags:['Joven','Energética','Sociable'],
    vacunas:true, esterilizado:false, desparasitado:true, microchip:false,
    descripcion:'¡Canela es pura energía y alegría! Tiene menos de un año y todavía está aprendiendo modales básicos. Necesita una familia paciente que continúe su educación. Se lleva bien con todos los perros del albergue y le encanta correr.',
    historia:'Encontrada en un mercado local buscando comida.'
  },
  {
    id:4, especie:'Perro', nombre:'Toby', raza:'Beagle', edad:3, unidad:'años', sexo:'Macho',
    tamano:'Mediano', estado:'En proceso', color:'Blanco, negro y café', peso:'13 kg',
    refugio:'huizache', img:'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=900&q=70',
    tags:['Curioso','Nariz fina','Tranquilo'],
    vacunas:true, esterilizado:true, desparasitado:true, microchip:true,
    descripcion:'Toby es un Beagle de pura cepa: curioso, olfateador y muy sociable. Es tranquilo dentro de casa y le encantan las siestas al sol. Actualmente tiene una solicitud de adopción en revisión.',
    historia:'Rescatado de situación de calle en el centro de SLP.'
  },
  {
    id:5, especie:'Perro', nombre:'Nala', raza:'Labrador Retriever', edad:5, unidad:'años', sexo:'Hembra',
    tamano:'Grande', estado:'Disponible', color:'Chocolate', peso:'29 kg',
    refugio:'matehuala', img:'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&w=900&q=70',
    tags:['Noble','Tranquila','Ideal para departamento'],
    vacunas:true, esterilizado:true, desparasitado:true, microchip:true,
    descripcion:'Nala es el equilibrio perfecto: activa cuando toca y tranquila en casa. Está acostumbrada a vivir en departamento y jamás ha destrozado nada. Busca una familia que la consienta en su etapa adulta.',
    historia:'Su familia emigró y no pudo llevarla consigo.'
  },
  {
    id:6, especie:'Perro', nombre:'Bruno', raza:'Rottweiler', edad:6, unidad:'años', sexo:'Macho',
    tamano:'Grande', estado:'Disponible', color:'Negro y fuego', peso:'42 kg',
    refugio:'rioverde', img:'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=900&q=70',
    tags:['Guardian','Tranquilo','Adulto'],
    vacunas:true, esterilizado:true, desparasitado:true, microchip:true,
    descripcion:'Bruno es un gigante con corazón de mantequilla. Es un perro adulto, calmado y muy leal. Requiere adoptantes con experiencia en razas grandes y un hogar con patio cercado. Se lleva bien con perras hembra.',
    historia:'Rescatado de una situación de maltrato en Rioverde.'
  },
  {
    id:7, especie:'Perro', nombre:'Chispa', raza:'Chihuahua', edad:8, unidad:'meses', sexo:'Hembra',
    tamano:'Pequeño', estado:'Disponible', color:'Café claro', peso:'3.5 kg',
    refugio:'desierto', img:'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=70',
    tags:['Diminuta','Juguetona','Ideal para departamento'],
    vacunas:true, esterilizado:false, desparasitado:true, microchip:false,
    descripcion:'Chispa es pequeñita pero con una personalidad enorme. Le encanta estar en brazos y seguir a su persona a todas partes. Perfecta para espacios pequeños y personas que pasan mucho tiempo en casa.',
    historia:'Nacida en el refugio, hija de una perrita rescatada.'
  },
  {
    id:8, especie:'Perro', nombre:'Duke', raza:'Husky Siberiano', edad:2, unidad:'años', sexo:'Macho',
    tamano:'Grande', estado:'Disponible', color:'Gris y blanco', peso:'26 kg',
    refugio:'sierra', img:'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=900&q=70',
    tags:['Activo','Escapista','Muy sociable'],
    vacunas:true, esterilizado:true, desparasitado:true, microchip:true,
    descripcion:'Duke necesita una familia con experiencia en huskies: mucho ejercicio, patio seguro y paciencia. Es increíblemente sociable con otros perros y le encanta "hablar". No se recomienda para casas sin patio.',
    historia:'Encontrado deambulando cerca de la carretera 57.'
  },
  {
    id:9, especie:'Perro', nombre:'Maya', raza:'Pug', edad:3, unidad:'años', sexo:'Hembra',
    tamano:'Pequeño', estado:'Adoptado', color:'Beige', peso:'8 kg',
    refugio:'huizache', img:'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=70',
    tags:['Tranquila','Familiar','Comelona'],
    vacunas:true, esterilizado:true, desparasitado:true, microchip:true,
    descripcion:'Maya encontró su hogar definitivo en abril de 2025. Fue adoptada por una familia en San Luis Potosí capital. ¡Gracias por adoptar!',
    historia:'Adoptada en abril de 2025.'
  },
  {
    id:10, especie:'Perro', nombre:'Simba', raza:'Mestizo', edad:1, unidad:'años', sexo:'Macho',
    tamano:'Mediano', estado:'Disponible', color:'Amarillo', peso:'18 kg',
    refugio:'matehuala', img:'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=70',
    tags:['Juguetón','Cariñoso','Buena con gatos'],
    vacunas:true, esterilizado:true, desparasitado:true, microchip:false,
    descripcion:'Simba es un perro jovial y agradecido. Le encanta correr detrás de las mariposas y dormir con la pancita al aire. Convive perfectamente con gatos y con niños pequeños.',
    historia:'Rescatado de un lote baldío en Matehuala.'
  },
  {
    id:11, especie:'Perro', nombre:'Perla', raza:'Poodle', edad:7, unidad:'años', sexo:'Hembra',
    tamano:'Pequeño', estado:'Disponible', color:'Blanco', peso:'6 kg',
    refugio:'rioverde', img:'https://images.unsplash.com/photo-1591160690555-5debfba289f0?auto=format&fit=crop&w=900&q=70',
    tags:['Senior','Tranquila','Hipoalergénica'],
    vacunas:true, esterilizado:true, desparasitado:true, microchip:true,
    descripcion:'Perla es una señorita adulta que busca un hogar tranquilo para sus años dorados. Es limpia, silenciosa y muy apegada a su persona. Ideal para adultos mayores o personas tranquilas.',
    historia:'Su dueña falleció y la familia no pudo quedarse con ella.'
  },
  {
    id:12, especie:'Perro', nombre:'Zeus', raza:'Gran Danés', edad:5, unidad:'años', sexo:'Macho',
    tamano:'Grande', estado:'En proceso', color:'Arlequín', peso:'58 kg',
    refugio:'sierra', img:'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=900&q=70',
    tags:['Gigante','Dócil','Requiere espacio'],
    vacunas:true, esterilizado:true, desparasitado:true, microchip:true,
    descripcion:'Zeus es literalmente un perro gigante con alma de cachorro. Es dócil, obediente y le encanta recostarse sobre las personas. Requiere adoptantes con espacio amplio y presupuesto para su alimentación.',
    historia:'Entregado por criadero clausurado.'
  },

  /* ===================== GATOS ===================== */
  {
    id:13, especie:'Gato', nombre:'Michi', raza:'Doméstico atigrado', edad:2, unidad:'años', sexo:'Hembra',
    tamano:'Mediano', estado:'Disponible', color:'Atigrado café', peso:'4 kg',
    refugio:'huizache', img:'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=900&q=70',
    tags:['Curiosa','Independiente','Ideal para departamento'],
    vacunas:true, esterilizado:true, desparasitado:true, microchip:false,
    descripcion:'Michi es una gatita observadora a la que le encanta explorar cada rincón de la casa y luego acurrucarse junto a la ventana. Es independiente pero muy cariñosa cuando entra en confianza. Usa su arenero sin problema.',
    historia:'Rescatada de una azotea en el Barrio de San Miguelito.'
  },
  {
    id:14, especie:'Gato', nombre:'Garfield', raza:'Doméstico naranja', edad:5, unidad:'años', sexo:'Macho',
    tamano:'Grande', estado:'Disponible', color:'Naranja', peso:'6.5 kg',
    refugio:'sierra', img:'https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=900&q=70',
    tags:['Dormilón','Tranquilo','Apapachador'],
    vacunas:true, esterilizado:true, desparasitado:true, microchip:true,
    descripcion:'Garfield hace honor a su nombre: ama las siestas largas, los rayos de sol y las caricias en la pancita. Es un gato adulto, sereno y perfecto para un hogar tranquilo. Convive bien con otros gatos.',
    historia:'Entregado por una familia que se mudó a un lugar donde no permitían mascotas.'
  },
  {
    id:15, especie:'Gato', nombre:'Oreo', raza:'Doméstico bicolor', edad:1, unidad:'años', sexo:'Macho',
    tamano:'Mediano', estado:'Disponible', color:'Blanco y negro', peso:'4.2 kg',
    refugio:'desierto', img:'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=70',
    tags:['Juguetón','Sociable','Bueno con niños'],
    vacunas:true, esterilizado:true, desparasitado:true, microchip:false,
    descripcion:'Oreo es un gato joven, sociable y muy juguetón. Persigue plumitas y pelotitas por horas y después busca regazo para dormir. Se lleva bien con niños y con perros tranquilos.',
    historia:'Encontrado en una caja junto a sus hermanos afuera de una veterinaria.'
  },
  {
    id:16, especie:'Gato', nombre:'Humo', raza:'Doméstico atigrado gris', edad:4, unidad:'años', sexo:'Macho',
    tamano:'Mediano', estado:'En proceso', color:'Gris atigrado', peso:'5 kg',
    refugio:'matehuala', img:'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=900&q=70',
    tags:['Tranquilo','Leal','Casero'],
    vacunas:true, esterilizado:true, desparasitado:true, microchip:true,
    descripcion:'Humo es un gato tranquilo que disfruta de la rutina y de la compañía silenciosa. Sigue a su persona de cuarto en cuarto. Actualmente tiene una solicitud de adopción en revisión.',
    historia:'Rescatado de un taller mecánico en Matehuala.'
  },
  {
    id:17, especie:'Gato', nombre:'Calcetines', raza:'Calicó de pelo largo', edad:3, unidad:'años', sexo:'Hembra',
    tamano:'Mediano', estado:'Disponible', color:'Tricolor', peso:'4.5 kg',
    refugio:'rioverde', img:'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&w=900&q=70',
    tags:['Elegante','Cariñosa','Requiere cepillado'],
    vacunas:true, esterilizado:true, desparasitado:true, microchip:false,
    descripcion:'Calcetines es una gatita de pelo largo y mirada dulce. Le encanta que la cepillen y ronronea muy fuerte cuando está feliz. Busca un hogar sin mucho ruido donde pueda ser la reina de la casa.',
    historia:'Rescatada de un patio abandonado en Rioverde.'
  },
  {
    id:18, especie:'Gato', nombre:'Pimienta', raza:'Doméstico atigrado', edad:4, unidad:'meses', sexo:'Hembra',
    tamano:'Pequeño', estado:'Disponible', color:'Atigrado gris', peso:'1.6 kg',
    refugio:'huizache', img:'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?auto=format&fit=crop&w=900&q=70',
    tags:['Gatita','Traviesa','Energética'],
    vacunas:true, esterilizado:false, desparasitado:true, microchip:false,
    descripcion:'Pimienta es una gatita bebé llena de energía. Todo le parece un juguete y aprende rápido a usar el rascador. Necesita una familia paciente que la acompañe en su etapa de crecimiento y la lleve a esterilizar.',
    historia:'Nacida en un hogar temporal de voluntarios.'
  },
  {
    id:19, especie:'Gato', nombre:'Bigotes', raza:'Doméstico bicolor', edad:6, unidad:'años', sexo:'Macho',
    tamano:'Mediano', estado:'Adoptado', color:'Blanco y atigrado', peso:'5.2 kg',
    refugio:'sierra', img:'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=900&q=70',
    tags:['Platicador','Familiar','Comelón'],
    vacunas:true, esterilizado:true, desparasitado:true, microchip:true,
    descripcion:'Bigotes encontró su hogar definitivo en junio de 2025 con una familia de Soledad de Graciano Sánchez. ¡Gracias por adoptar!',
    historia:'Adoptado en junio de 2025.'
  },
  {
    id:20, especie:'Gato', nombre:'Nieve', raza:'Persa mestizo', edad:6, unidad:'meses', sexo:'Hembra',
    tamano:'Pequeño', estado:'Disponible', color:'Blanco', peso:'2.3 kg',
    refugio:'desierto', img:'https://images.unsplash.com/photo-1561948955-570b270e7c36?auto=format&fit=crop&w=900&q=70',
    tags:['Expresiva','Cariñosa','Requiere cepillado'],
    vacunas:true, esterilizado:false, desparasitado:true, microchip:false,
    descripcion:'Nieve es una gatita de pelo blanco y ojos enormes que no pasa desapercibida. Es muy expresiva y le gusta que le hablen. Su pelaje requiere cepillado frecuente y revisiones de ojos.',
    historia:'Entregada al refugio por un criadero irregular.'
  },
  {
    id:21, especie:'Gato', nombre:'Mostaza', raza:'Maine Coon mestizo', edad:9, unidad:'años', sexo:'Macho',
    tamano:'Grande', estado:'Disponible', color:'Naranja', peso:'7.5 kg',
    refugio:'matehuala', img:'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=900&q=70',
    tags:['Senior','Noble','Tranquilo'],
    vacunas:true, esterilizado:true, desparasitado:true, microchip:true,
    descripcion:'Mostaza es un gato senior grandote y bonachón. Ya no le interesa correr, pero sí una buena cobija y compañía. Ideal para adultos mayores o personas que buscan un compañero sereno.',
    historia:'Su dueño falleció y los vecinos lo llevaron al refugio.'
  },
  {
    id:22, especie:'Gato', nombre:'Mango', raza:'Doméstico naranja', edad:10, unidad:'meses', sexo:'Macho',
    tamano:'Pequeño', estado:'Disponible', color:'Naranja y blanco', peso:'3.4 kg',
    refugio:'rioverde', img:'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?auto=format&fit=crop&w=900&q=70',
    tags:['Juguetón','Curioso','Bueno con perros'],
    vacunas:true, esterilizado:true, desparasitado:true, microchip:false,
    descripcion:'Mango es un gatito joven y aventurero que se lleva sorprendentemente bien con perros. Le encantan las cajas de cartón y los juguetes con cascabel. Busca una familia activa y divertida.',
    historia:'Rescatado de una carretera cerca de Rioverde.'
  }
];