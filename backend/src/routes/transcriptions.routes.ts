import { Router } from 'express';
import { uploadSessionAudio, getTranscriptions } from '../controllers/transcriptions.controller';
import { uploadAudio } from '../middleware/upload.middleware';
import { authMiddleware, psychologistOnly } from '../middleware/auth.middleware';

const router = Router();

// Subir audio de sesión (Solo Psicólogo)
router.post(
    '/:appointmentId/upload',
    authMiddleware,
    psychologistOnly,
    uploadAudio.single('audio'),
    uploadSessionAudio
);

router.get(
    '/:appointmentId',
    authMiddleware,
    psychologistOnly,
    getTranscriptions
);

export default router;
