/* =========================================================
   Patitas Potosinas — Configuración de mensajes
   ---------------------------------------------------------
   Los correos de confirmación se envían con EmailJS
   (https://www.emailjs.com, plan gratis: 200 correos/mes),
   que funciona desde el navegador, sin servidor propio.

   Pasos:
   1. Crea una cuenta en emailjs.com.
   2. "Email Services" → conecta tu Gmail/Outlook → copia el Service ID.
   3. "Email Templates" → crea una plantilla:
        To Email:  {{to_email}}
        CC:        {{refugio_correo}}   (opcional, para que el refugio también la reciba)
        Subject:   Solicitud de adopción de {{mascota}} 🐾
        Body: usa las variables de abajo, por ejemplo:
          Hola {{to_name}}, recibimos tu solicitud para adoptar a {{mascota}}
          ({{mascota_raza}}). {{refugio}} te contactará al {{telefono}}
          en máximo 48 horas. Tel. del refugio: {{refugio_tel}}.
          Ciudad: {{ciudad}} · Vivienda: {{vivienda}} · Fecha: {{fecha}}
          Tu mensaje: {{mensaje}}
      Copia el Template ID.
   4. "Account" → copia la Public Key.
   5. Pega los tres valores aquí abajo.

   Mientras sigan con "TU_...", la app funciona en MODO DEMO:
   la cola offline trabaja igual, pero el correo solo se
   muestra en la consola en vez de enviarse.
   ========================================================= */
export const EMAILJS = {
  publicKey:  'oMB91Jev1btBTHy8S',
  serviceId:  'service_lwnyyvm',
  templateId: 'template_bg2pgke',
};

export const emailConfigurado = () =>
  Object.values(EMAILJS).every((v) => v && !v.startsWith('TU_'));
