import { Router } from 'express';
import {
    getAvailability,
    getAllAppointments,
    createAppointment,
    getAppointment,
    updateAppointment,
    cancelAppointment,
    getMyAppointments,
} from '../controllers/appointments.controller';
import { authMiddleware, adminOnly } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';

const router = Router();

import { uploadBono } from '../middleware/upload.middleware';

// Rutas públicas
router.get('/availability', getAvailability);

router.post(
    '/',
    uploadBono.single('bono'),
    /* validate({ // Validation middleware complicates FormData handling, moving validation to controller or adapting.
        patientName: { required: true, type: 'string', minLength: 2 },
        patientEmail: { required: true, type: 'email' },
        serviceId: { required: true, type: 'string' },
        date: { required: true, type: 'string' },
    }), */ // Temporarily disabling body validation middleware for FormData
    createAppointment
);

router.get('/:id', getAppointment);
router.delete('/:id', cancelAppointment);

// Rutas protegidas (admin)
router.get('/', authMiddleware, adminOnly, getAllAppointments);
router.put('/:id', authMiddleware, adminOnly, updateAppointment);

// Rutas protegidas (paciente)
router.get('/my-appointments', authMiddleware, getMyAppointments);

export default router;
