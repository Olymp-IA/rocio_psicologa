'use client';

// Types
export type UserRole = 'paciente' | 'especialista' | 'admin';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    rut?: string;
    phone?: string;
}

export interface Session {
    id: string;
    patientId: string;
    patientName: string;
    type: string;
    date: string;
    time: string;
    status: 'completada' | 'pendiente' | 'cancelada';
    paymentStatus: 'pagado' | 'pendiente';
    boletaUrl?: string; // URL to the uploaded boleta PDF
}

// Mock Users
export const MOCK_USERS: (User & { password: string })[] = [
    {
        id: '1',
        name: 'María González',
        email: 'paciente@test.com',
        password: '123456',
        role: 'paciente',
        rut: '12.345.678-9',
        phone: '+56 9 1234 5678',
    },
    {
        id: '2',
        name: 'Dra. Rocío Manosalva',
        email: 'especialista@test.com',
        password: '123456',
        role: 'especialista',
        rut: '11.222.333-4',
        phone: '+56 9 8765 4321',
    },
    {
        id: '3',
        name: 'Admin Sistema',
        email: 'admin@test.com',
        password: '123456',
        role: 'admin',
        rut: '10.000.000-0',
        phone: '+56 9 0000 0000',
    },
];

// Mock Sessions
export const MOCK_SESSIONS: Session[] = [
    {
        id: 's1',
        patientId: '1',
        patientName: 'María González',
        type: 'Terapia Individual',
        date: '2026-01-15',
        time: '10:00',
        status: 'pendiente',
        paymentStatus: 'pendiente',
    },
    {
        id: 's2',
        patientId: '1',
        patientName: 'María González',
        type: 'Terapia Individual',
        date: '2026-01-02',
        time: '11:00',
        status: 'completada',
        paymentStatus: 'pagado',
        boletaUrl: '/boletas/boleta-s2.pdf',
    },
    {
        id: 's3',
        patientId: '1',
        patientName: 'María González',
        type: 'Terapia Individual',
        date: '2025-12-15',
        time: '10:00',
        status: 'completada',
        paymentStatus: 'pagado',
        boletaUrl: '/boletas/boleta-s3.pdf',
    },
    {
        id: 's4',
        patientId: '1',
        patientName: 'María González',
        type: 'Evaluación Inicial',
        date: '2025-12-01',
        time: '09:00',
        status: 'completada',
        paymentStatus: 'pagado',
        boletaUrl: '/boletas/boleta-s4.pdf',
    },
];

// Helper functions
export function findUserByEmail(email: string): (User & { password: string }) | undefined {
    return MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
}

export function validateCredentials(email: string, password: string): User | null {
    const user = findUserByEmail(email);
    if (user && user.password === password) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    return null;
}

export function getSessionsForPatient(patientId: string): Session[] {
    return MOCK_SESSIONS.filter(s => s.patientId === patientId);
}

export function getAllSessions(): Session[] {
    return MOCK_SESSIONS;
}

export function getUpcomingSessions(): Session[] {
    const today = new Date().toISOString().split('T')[0];
    return MOCK_SESSIONS.filter(s => s.date >= today && s.status === 'pendiente');
}

export function getPastSessions(): Session[] {
    return MOCK_SESSIONS.filter(s => s.status === 'completada');
}
