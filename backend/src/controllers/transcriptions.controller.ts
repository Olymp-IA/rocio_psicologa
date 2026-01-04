import { Request, Response } from 'express';
import { processSessionAudio } from '../services/ai.service';
import prisma from '../config/database';

export const uploadSessionAudio = async (req: Request, res: Response) => {
    try {
        const { appointmentId } = req.params;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: 'Debe adjuntar el archivo de audio' });
        }

        // Verificar que la cita existe
        const appointment = await prisma.appointment.findUnique({ where: { id: appointmentId } });
        if (!appointment) {
            return res.status(404).json({ error: 'Cita no encontrada' });
        }

        // Procesar audio (Transcripción + Análisis)
        // Nota: Esto podría ser lento, idealmente usar colas. Aquí lo hacemos await.
        const transcription = await processSessionAudio(appointmentId, file.path);

        res.json({ message: 'Procesamiento completado', transcription });
    } catch (error) {
        console.error('Error procesando audio:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const getTranscriptions = async (req: Request, res: Response) => {
    try {
        const { appointmentId } = req.params;
        const transcriptions = await prisma.transcription.findMany({
            where: { appointmentId },
            orderBy: { createdAt: 'desc' }
        });
        res.json(transcriptions);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo transcripciones' });
    }
};
