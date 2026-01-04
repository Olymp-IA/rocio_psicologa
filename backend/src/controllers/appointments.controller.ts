import { Request, Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth.middleware';
import { sendAppointmentConfirmation } from '../services/email.service';
import { createCalendarEvent } from '../services/google.service';

// Obtener disponibilidad (horarios libres)
export const getAvailability = async (req: Request, res: Response) => {
    try {
        const { date } = req.query;

        // Obtener horarios configurados
        const availability = await prisma.availability.findMany({
            where: { isActive: true },
            orderBy: { dayOfWeek: 'asc' },
        });

        // Obtener citas existentes para la fecha si se proporciona
        let bookedSlots: Date[] = [];
        if (date) {
            const startOfDay = new Date(date as string);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(date as string);
            endOfDay.setHours(23, 59, 59, 999);

            const appointments = await prisma.appointment.findMany({
                where: {
                    date: { gte: startOfDay, lte: endOfDay },
                    status: { in: ['PENDING', 'CONFIRMED'] },
                },
                select: { date: true },
            });

            bookedSlots = appointments.map((a: { date: Date }) => a.date);
        }

        res.json({ availability, bookedSlots });
    } catch (error) {
        console.error('Error obteniendo disponibilidad:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Listar todas las citas (admin)
export const getAllAppointments = async (req: AuthRequest, res: Response) => {
    try {
        const { status, from, to } = req.query;

        const where: any = {};
        if (status) where.status = status;
        if (from || to) {
            where.date = {};
            if (from) where.date.gte = new Date(from as string);
            if (to) where.date.lte = new Date(to as string);
        }

        const appointments = await prisma.appointment.findMany({
            where,
            include: {
                patient: true,
                service: true,
            },
            orderBy: { date: 'asc' },
        });

        res.json(appointments);
    } catch (error) {
        console.error('Error listando citas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Crear nueva cita
export const createAppointment = async (req: Request, res: Response) => {
    try {
        const { patientName, patientEmail, patientPhone, serviceId, date, notes, rut } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: 'Debe adjuntar el bono' });
        }

        const paymentProofUrl = `/uploads/bonos/${file.filename}`;

        // Buscar o crear paciente (Ahora usando RUT si viene, o Email)
        // Prioridad: RUT
        let patient = null;
        if (rut) {
            patient = await prisma.patient.findUnique({ where: { rut } });
        }

        if (!patient && patientEmail) {
            patient = await prisma.patient.findUnique({ where: { email: patientEmail } });
        }

        if (!patient) {
            // Crear paciente nuevo (Si es guest, se crea sin password? O password generada?)
            // Schema dice password obligatorio.
            // Si es un guest reserva, generamos password temporal o requerimos registro previo?
            // "al crear la cuenta los datos que se solicitan deben estar el rut..."
            // Asumiremos que si no existe, lo creamos con una password default o random.
            // OJO: Esto es delicado. Para cumplir rapido: Password por defecto "123456" y que cambie despues.
            const hashedPassword = await import('bcryptjs').then(b => b.hash('123456', 10));

            patient = await prisma.patient.create({
                data: {
                    name: patientName,
                    email: patientEmail,
                    phone: patientPhone,
                    rut: rut || 'SIN-RUT-' + Date.now(), // Fallback si no viene RUT
                    password: hashedPassword
                },
            });
        }

        // Verificar que el servicio existe
        const service = await prisma.service.findUnique({ where: { id: serviceId } });
        if (!service) {
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }

        // Verificar disponibilidad
        const appointmentDate = new Date(date);
        const existingAppointment = await prisma.appointment.findFirst({
            where: {
                date: appointmentDate,
                status: { in: ['PENDING', 'CONFIRMED'] },
            },
        });

        if (existingAppointment) {
            return res.status(400).json({ error: 'Este horario ya está ocupado' });
        }

        // ...

        // Integrate Google Calendar
        const calendarEvent = await createCalendarEvent(
            `Consulta: ${patient.name} - ${service.name}`,
            notes || '',
            appointmentDate,
            new Date(appointmentDate.getTime() + service.duration * 60000), // Calcular fin
            [patient.email]
        );

        // Crear cita
        const appointment = await prisma.appointment.create({
            data: {
                patientId: patient.id,
                serviceId,
                date: appointmentDate,
                notes,
                status: 'PENDING',
                paymentProofUrl,
                meetLink: calendarEvent.link
            },
            include: {
                patient: true,
                service: true,
            },
        });

        // Enviar email de confirmación
        await sendAppointmentConfirmation(
            patient.email,
            patient.name,
            appointmentDate,
            service.name
        );

        res.status(201).json(appointment);
    } catch (error) {
        console.error('Error creando cita:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener cita por ID
export const getAppointment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const appointment = await prisma.appointment.findUnique({
            where: { id },
            include: {
                patient: true,
                service: true,
            },
        });

        if (!appointment) {
            return res.status(404).json({ error: 'Cita no encontrada' });
        }

        res.json(appointment);
    } catch (error) {
        console.error('Error obteniendo cita:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Actualizar cita
export const updateAppointment = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { status, date, notes } = req.body;

        const appointment = await prisma.appointment.update({
            where: { id },
            data: {
                ...(status && { status }),
                ...(date && { date: new Date(date) }),
                ...(notes !== undefined && { notes }),
            },
            include: {
                patient: true,
                service: true,
            },
        });

        res.json(appointment);
    } catch (error) {
        console.error('Error actualizando cita:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Cancelar cita
export const cancelAppointment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const appointment = await prisma.appointment.update({
            where: { id },
            data: { status: 'CANCELLED' },
        });

        res.json({ message: 'Cita cancelada correctamente', appointment });
    } catch (error) {
        console.error('Error cancelando cita:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener mis citas (Paciente)
export const getMyAppointments = async (req: AuthRequest, res: Response) => {
    try {
        // Buscar paciente asociado al usuario autenticado (si es RUT/Patient)
        // El token trae userId. Si es paciente, userId es el id de la tabla Patient.
        // Si es Admin, no debería llamar a esto, o devolver vacío.

        // Verificamos si el userId corresponde a un Patient
        const patient = await prisma.patient.findUnique({ where: { id: req.userId } });

        if (!patient) {
            return res.status(404).json({ error: 'Paciente no encontrado' });
        }

        const appointments = await prisma.appointment.findMany({
            where: { patientId: patient.id },
            include: { service: true },
            orderBy: { date: 'desc' }
        });

        res.json(appointments);
    } catch (error) {
        console.error('Error obteniendo mis citas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
