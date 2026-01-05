'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { Calendar, Clock, Users, FileText, LogOut, Upload, Check, X } from 'lucide-react';
import { getAllSessions, getUpcomingSessions, MOCK_USERS, Session as SessionType } from '@/lib/mockData';

export default function SpecialistDashboard() {
    const { user, logout, isRole, isLoading } = useAuth();
    const router = useRouter();
    const [sessions, setSessions] = useState<SessionType[]>([]);
    const [upcomingSessions, setUpcomingSessions] = useState<SessionType[]>([]);
    const [uploadingSessionId, setUploadingSessionId] = useState<string | null>(null);

    useEffect(() => {
        // Wait for auth to load
        if (isLoading) return;

        if (!isRole(['especialista', 'admin'])) {
            router.push('/dashboard');
            return;
        }
        setSessions(getAllSessions());
        setUpcomingSessions(getUpcomingSessions());
    }, [isRole, router, isLoading]);

    // Show loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 pt-24 pb-12 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-text-secondary">Cargando...</p>
                </div>
            </div>
        );
    }

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    const handleUploadBoleta = (sessionId: string) => {
        setUploadingSessionId(sessionId);
        // Simulate upload
        setTimeout(() => {
            setSessions(prev => prev.map(s =>
                s.id === sessionId
                    ? { ...s, boletaUrl: `/boletas/boleta-${sessionId}.pdf` }
                    : s
            ));
            setUploadingSessionId(null);
        }, 1500);
    };

    const patients = MOCK_USERS.filter(u => u.role === 'paciente');

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-CL', { day: '2-digit', month: 'short' });
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-700 text-xs font-medium uppercase">
                                Especialista
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary">
                            Hola, {user?.name || 'Especialista'}
                        </h1>
                        <p className="text-text-secondary mt-1">Panel de gestión de pacientes y sesiones.</p>
                    </div>
                    <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
                        <LogOut size={16} /> Cerrar Sesión
                    </Button>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Main Content - Left Column */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Upcoming Sessions */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <Calendar className="text-accent" size={24} />
                                <h2 className="text-xl font-heading font-bold text-primary">Próximas Sesiones</h2>
                            </div>

                            {upcomingSessions.length === 0 ? (
                                <p className="text-text-secondary text-center py-8">No hay sesiones programadas.</p>
                            ) : (
                                <div className="space-y-4">
                                    {upcomingSessions.map((session) => (
                                        <div key={session.id} className="flex flex-col md:flex-row items-center justify-between bg-secondary/10 p-4 rounded-xl border border-secondary/20">
                                            <div className="flex items-center gap-4 mb-4 md:mb-0">
                                                <div className="text-center bg-white p-2 rounded-lg shadow-sm min-w-[60px]">
                                                    <span className="block text-lg font-bold text-primary">{formatDate(session.date).split(' ')[0]}</span>
                                                    <span className="text-xs uppercase font-bold text-accent tracking-wider">{formatDate(session.date).split(' ')[1]}</span>
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-primary">{session.patientName}</h3>
                                                    <div className="flex items-center gap-3 text-sm text-text-secondary">
                                                        <span>{session.type}</span>
                                                        <div className="flex items-center gap-1">
                                                            <Clock size={12} /> {session.time}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {session.paymentStatus === 'pendiente' && (
                                                    <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">Pago Pendiente</span>
                                                )}
                                                {session.paymentStatus === 'pagado' && (
                                                    <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">Pagado</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Session History with Boleta Upload */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <FileText className="text-accent" size={24} />
                                <h2 className="text-xl font-heading font-bold text-primary">Historial de Sesiones</h2>
                            </div>

                            <div className="space-y-4">
                                {sessions.filter(s => s.status === 'completada').map((session) => (
                                    <div key={session.id} className="flex flex-col md:flex-row items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-4 mb-4 md:mb-0">
                                            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                                                <Check className="text-accent" size={18} />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-primary">{session.patientName}</h4>
                                                <p className="text-sm text-text-light">{session.type} • {formatDate(session.date)}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {session.boletaUrl ? (
                                                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                                                    <Check size={12} /> Boleta Subida
                                                </span>
                                            ) : (
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleUploadBoleta(session.id)}
                                                    isLoading={uploadingSessionId === session.id}
                                                    className="flex items-center gap-1"
                                                >
                                                    <Upload size={14} /> Subir Boleta
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Right Column */}
                    <div className="space-y-8">
                        {/* Profile Card */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                            <div className="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-heading text-teal-600">
                                {user?.name?.charAt(0) || 'E'}
                            </div>
                            <h3 className="text-xl font-bold text-primary">{user?.name || 'Especialista'}</h3>
                            <p className="text-sm text-text-light mb-2">{user?.email}</p>
                            <span className="inline-block px-2 py-0.5 rounded-full bg-teal-100 text-teal-700 text-xs font-medium">
                                Especialista
                            </span>
                        </div>

                        {/* Patients List */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-2 mb-4">
                                <Users className="text-accent" size={20} />
                                <h3 className="font-heading font-bold text-primary">Pacientes</h3>
                            </div>
                            <div className="space-y-3">
                                {patients.map((patient) => (
                                    <div key={patient.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-sm font-medium text-rose-600">
                                            {patient.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-primary">{patient.name}</p>
                                            <p className="text-xs text-text-light">{patient.email}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
