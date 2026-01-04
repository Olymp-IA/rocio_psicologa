import { Router } from 'express';
import { register, login, getMe, refreshToken } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';

const router = Router();

router.post(
    '/register',
    validate({
        email: { required: true, type: 'email' },
        password: { required: true, type: 'string', minLength: 6 },
        name: { required: true, type: 'string', minLength: 2 },
    }),
    register
);

router.post(
    '/login',
    validate({
        email: { required: true, type: 'email' },
        password: { required: true, type: 'string' },
    }),
    login
);

router.get('/me', authMiddleware, getMe);
router.post('/refresh', authMiddleware, refreshToken);

export default router;
