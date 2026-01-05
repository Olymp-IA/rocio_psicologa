'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import Button from '@/components/ui/Button';
import { Calendar, Clock, FileText, LogOut, Upload, Edit, Download, Check } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getSessionsForPatient, Session as SessionType } from '@/lib/mockData';

export default function DashboardPage() {
    const { user, logout, isRole, isLoading } = useAuth();
    const router = useRouter();
    const [sessions, setSessions] = useState<SessionType[]>([]);

    useEffect(() => {
        // Wait for auth to load
        if (isLoading) return;

        // Redirect if not logged in
        if (!user) {
            router.push('/');
            return;
        }

        // Redirect other roles to their dashboards
        if (isRole('admin')) {
            router.push('/dashboard/admin');
            return;
        }
        if (isRole('especialista')) {
            router.push('/dashboard/specialist');
            return;
        }

        // Load patient sessions
        if (user?.id) {
            setSessions(getSessionsForPatient(user.id));
        }
    }, [user, isRole, router, isLoading]);

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

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-CL', { day: '2-digit', month: 'short' });
    };

    const upcomingSession = sessions.find(s => s.status === 'pendiente');
    const pastSessions = sessions.filter(s => s.status === 'completada');

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-xs font-medium uppercase">
                                Paciente
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary">
                            Hola, {user?.name || 'Paciente'}
                        </h1>
                        <p className="text-text-secondary mt-1">Bienvenido a tu espacio personal de bienestar.</p>
                    </div>
                    <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
                        <LogOut size={16} /> Cerrar Sesión
                    </Button>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Main Content - Left Column */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Next Session Card */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <Calendar className="text-accent" size={24} />
                                <h2 className="text-xl font-heading font-bold text-primary">Próxima Sesión</h2>
                            </div>

                            {upcomingSession ? (
                                <div className="flex flex-col md:flex-row items-center justify-between bg-secondary/10 p-6 rounded-xl border border-secondary/20">
                                    <div className="flex items-center gap-6 mb-4 md:mb-0">
                                        <div className="text-center bg-white p-3 rounded-lg shadow-sm min-w-[80px]">
                                            <span className="block text-2xl font-bold text-primary">{formatDate(upcomingSession.date).split(' ')[0]}</span>
                                            <span className="text-xs uppercase font-bold text-accent tracking-wider">{formatDate(upcomingSession.date).split(' ')[1]}</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-primary">{upcomingSession.type}</h3>
                                            <div className="flex items-center gap-4 text-sm text-text-secondary mt-1">
                                                <div className="flex items-center gap-1">
                                                    <Clock size={14} /> {upcomingSession.time} hrs
                                                </div>
                                                {upcomingSession.paymentStatus === 'pendiente' && (
                                                    <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">Pendiente de Pago</span>
                                                )}
                                                {upcomingSession.paymentStatus === 'pagado' && (
                                                    <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">Pagado</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" className="bg-accent hover:bg-accent/90">
                                            <Upload size={16} className="mr-2" /> Subir Pago
                                        </Button>
                                        <Button variant="outline" size="sm">Reprogramar</Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8 text-text-secondary">
                                    <p>No tienes sesiones programadas.</p>
                                    <Link href="/dashboard/booking">
                                        <Button className="mt-4">Agendar Sesión</Button>
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* History with Boleta Download */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <FileText className="text-accent" size={24} />
                                <h2 className="text-xl font-heading font-bold text-primary">Historial de Sesiones</h2>
                            </div>

                            {pastSessions.length === 0 ? (
                                <p className="text-center py-8 text-text-secondary">Aún no tienes sesiones completadas.</p>
                            ) : (
                                <div className="space-y-4">
                                    {pastSessions.map((session) => (
                                        <div key={session.id} className="flex flex-col md:flex-row items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center gap-4 mb-4 md:mb-0">
                                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                                    <Check className="text-green-600" size={18} />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-primary">{session.type}</h4>
                                                    <p className="text-sm text-text-light">{formatDate(session.date)}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {session.boletaUrl ? (
                                                    <a
                                                        href={session.boletaUrl}
                                                        download
                                                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors"
                                                    >
                                                        <Download size={14} /> Descargar Boleta
                                                    </a>
                                                ) : (
                                                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                                                        <Clock size={12} /> Boleta Pendiente
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar - Right Column */}
                    <div className="space-y-8">
                        {/* Profile Card */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                            <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-heading text-accent">
                                {user?.name?.charAt(0) || 'P'}
                            </div>
                            <h3 className="text-xl font-bold text-primary">{user?.name || 'Paciente'}</h3>
                            <p className="text-sm text-text-light mb-2">{user?.email || 'paciente@ejemplo.com'}</p>
                            <span className="inline-block px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-xs font-medium mb-6">
                                Paciente
                            </span>

                            <div className="space-y-3">
                                <Link href="/dashboard/edit-profile">
                                    <Button variant="outline" className="w-full justify-start">
                                        <Edit size={16} className="mr-2" /> Editar Perfil
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
