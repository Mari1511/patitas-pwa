# Patitas-Potosinas
# 🐾 Patitas Potosinas

Plataforma web de adopción de perros en San Luis Potosí, México.  
Conecta perritos rescatados de refugios locales con familias responsables.

> **Adopta, no compres.** Ninguna adopción tiene costo económico.

---

## 📋 ¿De qué trata?

Patitas Potosinas es un sitio web que digitaliza el proceso de adopción canina en San Luis Potosí. Permite a los usuarios:

- Explorar un catálogo de perros disponibles en refugios aliados.
- Ver la ficha completa de cada peludito (raza, edad, salud, refugio).
- Buscar y filtrar mascotas según sus preferencias.
- Registrarse como adoptante y enviar solicitudes de adopción.
- Conocer el proceso paso a paso y los requisitos.

El objetivo es dar visibilidad a los perros rescatados, reducir el abandono y facilitar adopciones responsables con seguimiento real.

---

## 🚀 Cómo ejecutarlo

El proyecto usa **módulos ES6 nativos**, por lo que necesita servirse desde un servidor local (no funciona abriendo `index.html` directo con doble clic).

### Opción 1 — Python (la más simple)

```bash
cd patitas-potosinas
python -m http.server 8000
```

Abre en el navegador: **http://localhost:8000**

### Opción 2 — Node.js

```bash
cd patitas-potosinas
npx serve
```

### Opción 3 — VS Code

1. Instala la extensión **Live Server**.
2. Clic derecho en `index.html` → **"Open with Live Server"**.

### Requisitos

- Un navegador moderno (Chrome, Firefox, Edge o Safari).
- Python 3 o Node.js instalados (solo para levantar el servidor).

---

## ✨ Características

### Vistas disponibles
- **Inicio** — Hero con mensaje de adopción, estadísticas, cómo funciona y mascotas destacadas.
- **Mascotas** — Catálogo con búsqueda y filtros por sexo, edad, tamaño y estado.
- **Detalle de mascota** — Galería, ficha completa, estado de salud, refugio responsable y botón para solicitar adopción.
- **Registro** — Formulario con validaciones y medidor de contraseña.
- **Login** — Inicio de sesión con opción de mostrar/ocultar contraseña.
- **Cómo adoptar** — Guía de 6 pasos y lista de requisitos.
- **Nosotros** — Misión del proyecto y refugios aliados.
- **404** — Página de error personalizada.

### Funcionalidades clave
- Navegación tipo SPA (sin recargas de página).
- Filtros combinables y ordenamiento en el catálogo.
- Modal de solicitud de adopción con validación de campos.
- Correo de confirmación automático al enviar una solicitud (EmailJS).
- Solicitudes sin conexión: se guardan en el dispositivo y se envían solas al volver el Internet.
- Botón para enviar la solicitud al refugio por WhatsApp.
- Toasts (notificaciones) animados.
- Validación de correo, teléfono y contraseña.
- Diseño 100% responsivo (móvil, tablet y escritorio).
- Fallback automático si una imagen no carga.

---

## ⚠️ Cosas importantes que debes saber

### 1. Los datos son de prueba (mock)
Actualmente las mascotas y refugios viven en `js/data.js` como datos estáticos.  
Cuando conectes los microservicios reales, solo hay que reemplazar esas lecturas por llamadas `fetch()`. Busca los comentarios `// TODO:` en el código.

### 2. No funciona abriendo el HTML directo
Debes usar un servidor local. Si abres `index.html` con doble clic, verás errores de CORS en la consola por los módulos ES6.

### 3. El CSS debe estar en su archivo
Todo el diseño va en `css/styles.css`. Si lo pegas ahí tal cual, la página se ve exactamente como debe.

### 4. Rutas con hash
La app usa URLs tipo `#/mascotas` y `#/mascota/1`. Esto permite compartir enlaces directos sin configurar el servidor.

### 5. Sin dependencias ni build
No requiere `npm install`, Webpack, Vite ni nada parecido. Solo HTML, CSS y JavaScript puro.

### 6. Preparado para microservicios
La arquitectura está pensada para conectarse a servicios separados: usuarios, mascotas, adopciones, refugios y notificaciones. Cada `init()` de las vistas es el punto natural de integración.

### 7. Adopción gratuita por diseño
El sistema no contempla pagos entre adoptante y refugio. Solo se firma un compromiso de adopción responsable.

---

## 📬 Solicitudes de adopción: correo, WhatsApp y modo sin conexión

Al enviar el formulario de adopción, la solicitud ya no solo se muestra en pantalla: se **envía un correo de confirmación** al adoptante y, si no hay Internet, **se guarda y se envía después automáticamente**.

### ¿Cómo funciona?

```
Formulario ──► Se guarda en IndexedDB (bandeja de salida)
                 │
                 ├─ Con Internet ──► Se envía el correo con EmailJS ──► "¡Solicitud enviada!"
                 │
                 └─ Sin Internet ──► "Solicitud guardada 📥"
                                      └─ Al volver la conexión ──► se envía sola + notificación
```

1. **Bandeja de salida (outbox).** Cada solicitud se guarda primero en IndexedDB, una pequeña base de datos del navegador, para que no se pierda aunque se cierre la app.
2. **Envío del correo.** Se hace una petición `fetch()` a la API REST de [EmailJS](https://www.emailjs.com), que manda el correo desde una cuenta de Gmail conectada. No se necesita servidor propio ni librerías.
3. **Envío diferido sin conexión.**
   - **Chrome, Edge y Android:** se usa la **Background Sync API**. El service worker (`sw.js`) envía las solicitudes pendientes en cuanto vuelve la conexión, **aunque la app esté cerrada**, y muestra una notificación del sistema.
   - **Safari y Firefox** (no tienen Background Sync): la página envía las pendientes al detectar el evento `online` o la próxima vez que se abre la app.
   - Si EmailJS falla, la solicitud **no se borra** de la cola y se reintenta después.
4. **WhatsApp.** En la pantalla de éxito hay un botón que abre WhatsApp (`https://wa.me/<número>?text=...`) con un mensaje ya escrito para el refugio, con los datos del adoptante. El usuario solo presiona "Enviar". Es gratis y no requiere cuenta.
5. **Avisos al usuario.** Se muestran toasts y notificaciones del sistema: "Solicitud enviada", "Solicitud guardada (sin conexión)" y "Ya hay conexión: tu solicitud se envió".

### ¿Por qué correo y no SMS o WhatsApp automático?

| Canal | Resultado |
|-------|-----------|
| **Correo (EmailJS)** | ✅ Automático, gratis (200 correos/mes) y sin servidor. Compatible con el envío sin conexión. |
| **WhatsApp (enlace `wa.me`)** | ✅ Gratis, pero el usuario debe presionar "Enviar"; por eso es un complemento. |
| **SMS / WhatsApp automático** | ❌ Requiere Twilio o WhatsApp Business API, un servidor para guardar las claves secretas y pago por mensaje. Queda para una fase futura con backend. |

### Configuración de EmailJS

Las claves están en `js/config.js` (`publicKey`, `serviceId`, `templateId`). Son claves **públicas**: EmailJS está diseñado para usarse desde el navegador. La *Private Key* nunca va en el proyecto.

La plantilla del correo en EmailJS usa estas variables:

| Variable | Contenido |
|----------|-----------|
| `{{to_email}}`, `{{to_name}}` | Correo y nombre del adoptante (destinatario) |
| `{{telefono}}`, `{{ciudad}}`, `{{vivienda}}`, `{{mensaje}}` | Datos del formulario |
| `{{mascota}}`, `{{mascota_raza}}` | Mascota solicitada |
| `{{refugio}}`, `{{refugio_tel}}`, `{{refugio_correo}}` | Refugio responsable (Reply To = correo del refugio) |
| `{{fecha}}` | Fecha y hora de la solicitud |

Si las claves se dejan con `TU_...`, la app funciona en **modo demo**: la cola offline trabaja igual, pero el correo solo se imprime en la consola.

> ⚠️ Si cambias `js/config.js` (o cualquier archivo), **sube el número de `VERSION` en `sw.js`**. Si no, el navegador sigue usando la copia guardada en caché.

> 🔒 Recomendado: en EmailJS → Account → Security, activa **Allowed origins** con el dominio de la app, para que nadie más use la cuota de correos.

### Cómo probarlo

1. Levanta el servidor y abre la app. Solicita una mascota con tu correo: debe llegar la confirmación en segundos (revisa spam la primera vez).
2. En DevTools → **Network** → **Offline**, envía otra solicitud: aparece "Solicitud guardada 📥".
3. Vuelve a **No throttling**: el correo llega solo y aparece el aviso de envío.
4. Las solicitudes pendientes se pueden ver en DevTools → **Application** → **IndexedDB** → `patitas-outbox`.

### Archivos involucrados

| Archivo | Cambio |
|---------|--------|
| `js/config.js` | **Nuevo.** Claves de EmailJS e instrucciones de configuración. |
| `js/outbox.js` | **Nuevo.** Bandeja de salida: guarda en IndexedDB, envía, registra Background Sync y reintenta en `online`. |
| `js/modals/adopcion.js` | El formulario usa la bandeja de salida, muestra "enviada" o "guardada" y agrega el botón de WhatsApp. |
| `js/pwa.js` | Inicia la bandeja de salida y muestra los avisos cuando se envían pendientes. |
| `sw.js` | Evento `sync` que envía las pendientes en segundo plano; nuevos archivos en caché; versión `v4`. |
| `css/styles.css` | Estilos del botón de WhatsApp y del botón deshabilitado ("Enviando…"). |

---

## 📁 Estructura del proyecto

```
patitas-potosinas/
├── index.html              # Entrada + navbar + footer
├── README.md               # Este archivo
├── manifest.json           # Configuración de la PWA (instalable)
├── sw.js                   # Service worker: caché offline y envío en segundo plano
├── css/
│   └── styles.css          # Todos los estilos
└── js/
    ├── app.js              # Bootstrap y eventos globales
    ├── config.js           # Claves de EmailJS
    ├── outbox.js           # Bandeja de salida de solicitudes (offline)
    ├── pwa.js              # Service worker, instalación y notificaciones
    ├── router.js           # Enrutador SPA
    ├── data.js             # Datos mock (mascotas y refugios)
    ├── utils.js            # Helpers, validaciones, toasts
    ├── components/
    │   └── petCard.js      # Tarjeta reutilizable de mascota
    ├── modals/
    │   └── adopcion.js     # Modal de solicitud
    └── views/
        ├── home.js         # Inicio
        ├── mascotas.js     # Catálogo
        ├── detalle.js      # Ficha de mascota
        ├── registro.js     # Registro
        ├── login.js        # Login
        ├── comoAdoptar.js  # Guía de adopción
        ├── nosotros.js     # Sobre el proyecto
        └── notFound.js     # Página 404
```

---

## 🗺 Rutas de la aplicación

| Ruta | Vista |
|------|-------|
| `#/` | Inicio |
| `#/mascotas` | Catálogo |
| `#/mascota/:id` | Detalle (ej: `#/mascota/1`) |
| `#/registro` | Crear cuenta |
| `#/login` | Iniciar sesión |
| `#/como-adoptar` | Guía paso a paso |
| `#/nosotros` | Sobre el proyecto |
| Otra | Página 404 |

---

## 🛠 Tecnologías usadas

- **HTML5** — Estructura semántica.
- **CSS3** — Variables, Grid, Flexbox, animaciones.
- **JavaScript ES6+** — Módulos nativos, router, componentes.
- **Google Fonts** — Fraunces + Nunito Sans.
- **PWA** — Service Worker, Cache API, Background Sync, Notifications API.
- **IndexedDB** — Bandeja de salida de solicitudes sin conexión.
- **EmailJS** (API REST) — Envío de correos de confirmación sin servidor propio.

Sin frameworks, sin dependencias, sin build step.

---

## 🐾 Sobre el proyecto

Patitas Potosinas nació en 2023 como una iniciativa ciudadana sin fines de lucro.  
Trabaja de la mano con refugios locales, veterinarias y voluntarios para garantizar adopciones responsables, con seguimiento y acompañamiento real.

## Estado del Proyecto
- Práctica 1: Completada.
- Práctica 2: En proceso de integración y revisión de Pull Requests.