import { Router } from 'express';
import {
    getPosts,
    getPostBySlug,
    createPost,
    updatePost,
    deletePost,
    getCategories,
} from '../controllers/blog.controller';
import { authMiddleware, adminOnly } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';

const router = Router();

// Rutas públicas
router.get('/posts', getPosts);
router.get('/posts/:slug', getPostBySlug);
router.get('/categories', getCategories);

// Rutas protegidas (admin)
router.post(
    '/posts',
    authMiddleware,
    adminOnly,
    validate({
        title: { required: true, type: 'string', minLength: 3 },
        slug: { required: true, type: 'string', minLength: 3 },
        excerpt: { required: true, type: 'string', minLength: 10 },
        content: { required: true, type: 'string', minLength: 50 },
    }),
    createPost
);

router.put('/posts/:id', authMiddleware, adminOnly, updatePost);
router.delete('/posts/:id', authMiddleware, adminOnly, deletePost);

export default router;
