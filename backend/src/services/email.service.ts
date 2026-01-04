import nodemailer from 'nodemailer';
import { config } from '../config/env';

const transporter = nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    secure: config.email.port === 465,
    auth: {
        user: config.email.user,
        pass: config.email.pass,
    },
});

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
    try {
        await transporter.sendMail({
            from: config.email.from,
            to: options.to,
            subject: options.subject,
            html: options.html,
        });
        return true;
    } catch (error) {
        console.error('Error enviando email:', error);
        return false;
    }
};

export const sendAppointmentConfirmation = async (
    patientEmail: string,
    patientName: string,
    date: Date,
    serviceName: string
) => {
    const formattedDate = date.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Inter', Arial, sans-serif; background-color: #FDFCFB; color: #2D3436; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .header h1 { color: #5B8A72; margin: 0; }
        .content { background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .detail { margin: 15px 0; padding: 15px; background: #E8DDD4; border-radius: 8px; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🧠 Consulta de Psicología</h1>
        </div>
        <div class="content">
          <h2>¡Hola ${patientName}!</h2>
          <p>Tu cita ha sido confirmada con éxito.</p>
          <div class="detail">
            <p><strong>📅 Fecha:</strong> ${formattedDate}</p>
            <p><strong>🩺 Servicio:</strong> ${serviceName}</p>
          </div>
          <p>Te esperamos. Si necesitas cancelar o reprogramar, contáctanos con al menos 24 horas de anticipación.</p>
        </div>
        <div class="footer">
          <p>Este es un correo automático, por favor no responder.</p>
        </div>
      </div>
    </body>
    </html>
  `;

    return sendEmail({
        to: patientEmail,
        subject: '✅ Confirmación de Cita - Consulta de Psicología',
        html,
    });
};

export const sendContactNotification = async (
    name: string,
    email: string,
    subject: string,
    message: string
) => {
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Inter', Arial, sans-serif; background-color: #FDFCFB; color: #2D3436; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .content { background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .field { margin: 15px 0; padding: 15px; background: #f5f5f5; border-radius: 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="content">
          <h2>📬 Nuevo mensaje de contacto</h2>
          <div class="field">
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Asunto:</strong> ${subject}</p>
          </div>
          <div class="field">
            <p><strong>Mensaje:</strong></p>
            <p>${message}</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

    return sendEmail({
        to: config.email.user,
        subject: `Nuevo contacto: ${subject}`,
        html,
    });
};
