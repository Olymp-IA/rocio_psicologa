import { Request, Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth.middleware';

// Listar posts públicos
export const getPosts = async (req: Request, res: Response) => {
    try {
        const { category, limit, page } = req.query;
        const take = parseInt(limit as string) || 10;
        const skip = ((parseInt(page as string) || 1) - 1) * take;

        const where: any = { isPublished: true };
        if (category) {
            where.categories = { some: { slug: category } };
        }

        const [posts, total] = await Promise.all([
            prisma.post.findMany({
                where,
                include: {
                    author: { select: { name: true } },
                    categories: true,
                },
                orderBy: { publishedAt: 'desc' },
                take,
                skip,
            }),
            prisma.post.count({ where }),
        ]);

        res.json({
            posts,
            pagination: {
                total,
                page: parseInt(page as string) || 1,
                pages: Math.ceil(total / take),
            },
        });
    } catch (error) {
        console.error('Error listando posts:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener post por slug
export const getPostBySlug = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;

        const post = await prisma.post.findUnique({
            where: { slug },
            include: {
                author: { select: { name: true } },
                categories: true,
            },
        });

        if (!post || !post.isPublished) {
            return res.status(404).json({ error: 'Artículo no encontrado' });
        }

        res.json(post);
    } catch (error) {
        console.error('Error obteniendo post:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Crear post (admin)
export const createPost = async (req: AuthRequest, res: Response) => {
    try {
        const { title, slug, excerpt, content, coverImage, isPublished, categoryIds } = req.body;

        const post = await prisma.post.create({
            data: {
                title,
                slug,
                excerpt,
                content,
                coverImage,
                isPublished,
                publishedAt: isPublished ? new Date() : null,
                authorId: req.userId!,
                categories: categoryIds ? { connect: categoryIds.map((id: string) => ({ id })) } : undefined,
            },
            include: {
                author: { select: { name: true } },
                categories: true,
            },
        });

        res.status(201).json(post);
    } catch (error) {
        console.error('Error creando post:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Actualizar post (admin)
export const updatePost = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { title, slug, excerpt, content, coverImage, isPublished, categoryIds } = req.body;

        const existingPost = await prisma.post.findUnique({ where: { id } });
        if (!existingPost) {
            return res.status(404).json({ error: 'Post no encontrado' });
        }

        const post = await prisma.post.update({
            where: { id },
            data: {
                ...(title && { title }),
                ...(slug && { slug }),
                ...(excerpt && { excerpt }),
                ...(content && { content }),
                ...(coverImage !== undefined && { coverImage }),
                ...(isPublished !== undefined && {
                    isPublished,
                    publishedAt: isPublished && !existingPost.isPublished ? new Date() : existingPost.publishedAt,
                }),
                ...(categoryIds && { categories: { set: categoryIds.map((id: string) => ({ id })) } }),
            },
            include: {
                author: { select: { name: true } },
                categories: true,
            },
        });

        res.json(post);
    } catch (error) {
        console.error('Error actualizando post:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Eliminar post (admin)
export const deletePost = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;

        await prisma.post.delete({ where: { id } });

        res.json({ message: 'Post eliminado correctamente' });
    } catch (error) {
        console.error('Error eliminando post:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Listar categorías
export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await prisma.category.findMany({
            include: { _count: { select: { posts: true } } },
        });

        res.json(categories);
    } catch (error) {
        console.error('Error listando categorías:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
