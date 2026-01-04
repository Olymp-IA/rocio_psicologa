import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';
import { config } from '../config/env';
import { AuthRequest } from '../middleware/auth.middleware';

import { validateRut, formatRut } from '../utils/rut.utils';

export const register = async (req: Request, res: Response) => {
    try {
        const { rut, email, password, name, phone } = req.body;

        // Validar RUT
        if (!validateRut(rut)) {
            return res.status(400).json({ error: 'RUT inválido' });
        }
        const formattedRut = formatRut(rut);

        // Verificar si el paciente ya existe (RUT o Email)
        const existingByRut = await prisma.patient.findUnique({ where: { rut: formattedRut } });
        if (existingByRut) {
            return res.status(400).json({ error: 'El RUT ya está registrado' });
        }

        const existingByEmail = await prisma.patient.findUnique({ where: { email } });
        if (existingByEmail) {
            return res.status(400).json({ error: 'El email ya está registrado' });
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 12);

        // Crear paciente
        const patient = await prisma.patient.create({
            data: {
                rut: formattedRut,
                email,
                password: hashedPassword,
                name,
                phone,
            },
        });

        // Generar token
        const token = jwt.sign(
            { userId: patient.id, role: 'PATIENT' },
            config.jwtSecret as string,
            { expiresIn: config.jwtExpiresIn } as any
        );

        res.status(201).json({ user: { ...patient, role: 'PATIENT' }, token });
    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { identifier, password } = req.body; // identifier puede ser RUT o Email

        let user: any = null;
        let role = '';
        let isPatient = false;

        // 1. Intentar login como PACIENTE (RUT)
        if (validateRut(identifier)) {
            const formattedRut = formatRut(identifier);
            user = await prisma.patient.findUnique({ where: { rut: formattedRut } });
            if (user) {
                role = 'PATIENT';
                isPatient = true;
            }
        }

        // 2. Si no es paciente, intentar como ADMIN/PSICÓLOGO (Email)
        if (!user) {
            user = await prisma.user.findUnique({ where: { email: identifier } });
            if (user) {
                role = user.role;
            }
        }

        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Verificar contraseña
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Generar token
        const token = jwt.sign(
            { userId: user.id, role },
            config.jwtSecret as string,
            { expiresIn: config.jwtExpiresIn } as any
        );

        res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role,
                ...(isPatient && { rut: user.rut, phone: user.phone }),
            },
            token,
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const getMe = async (req: AuthRequest, res: Response) => {
    try {
        // Verificar rol para saber dónde buscar
        // Esta info viene del middleware que decodificó el token (pero auth.middleware actual solo pone userId)
        // Necesitamos que el middleware también pase el rol, o buscar en ambas tablas.
        // Por eficiencia, intentaremos buscar en Patient primero si no sabemos, o deducir.
        // Pero lo ideal es que el token tenga el rol. (Lo tiene, decodificado en req.userId?)
        // AuthRequest interface only has userId currently. I should check auth.middleware.

        // Estrategia robusta: Buscar en Patient, si no, en User.
        let user: any = await prisma.patient.findUnique({
            where: { id: req.userId },
        });

        let role = 'PATIENT';

        if (!user) {
            user = await prisma.user.findUnique({
                where: { id: req.userId },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                    createdAt: true,
                },
            });
            role = user?.role;
        }

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json({ ...user, role });
    } catch (error) {
        console.error('Error obteniendo usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const refreshToken = async (req: AuthRequest, res: Response) => {
    try {
        let user: any = await prisma.patient.findUnique({
            where: { id: req.userId },
        });
        let role = 'PATIENT';

        if (!user) {
            user = await prisma.user.findUnique({
                where: { id: req.userId },
                select: { id: true, role: true },
            });
            role = user?.role;
        }

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Generar token
        const token = jwt.sign(
            { userId: user.id, role },
            config.jwtSecret as string,
            { expiresIn: config.jwtExpiresIn } as any
        );

        res.json({ token });
    } catch (error) {
        console.error('Error refrescando token:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
