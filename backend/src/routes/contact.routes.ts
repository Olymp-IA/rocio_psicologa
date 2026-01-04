import { Router } from 'express';
import { submitContact, getContactMessages, markAsRead } from '../controllers/contact.controller';
import { authMiddleware, adminOnly } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';

const router = Router();

// Ruta pública
router.post(
    '/',
    validate({
        name: { required: true, type: 'string', minLength: 2 },
        email: { required: true, type: 'email' },
        subject: { required: true, type: 'string', minLength: 3 },
        message: { required: true, type: 'string', minLength: 10 },
    }),
    submitContact
);

// Rutas protegidas (admin)
router.get('/', authMiddleware, adminOnly, getContactMessages);
router.patch('/:id/read', authMiddleware, adminOnly, markAsRead);

export default router;
