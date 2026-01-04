import { Request, Response } from 'express';
import prisma from '../config/database';
import { sendContactNotification } from '../services/email.service';

export const submitContact = async (req: Request, res: Response) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        // Guardar mensaje en la base de datos
        const contactMessage = await prisma.contactMessage.create({
            data: {
                name,
                email,
                phone,
                subject,
                message,
            },
        });

        // Enviar notificación por email
        await sendContactNotification(name, email, subject, message);

        res.status(201).json({
            message: 'Mensaje enviado correctamente. Nos pondremos en contacto pronto.',
            id: contactMessage.id,
        });
    } catch (error) {
        console.error('Error enviando mensaje de contacto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const getContactMessages = async (req: Request, res: Response) => {
    try {
        const { unreadOnly } = req.query;

        const messages = await prisma.contactMessage.findMany({
            where: unreadOnly === 'true' ? { isRead: false } : undefined,
            orderBy: { createdAt: 'desc' },
        });

        res.json(messages);
    } catch (error) {
        console.error('Error obteniendo mensajes:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const markAsRead = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await prisma.contactMessage.update({
            where: { id },
            data: { isRead: true },
        });

        res.json({ message: 'Mensaje marcado como leído' });
    } catch (error) {
        console.error('Error marcando mensaje:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
