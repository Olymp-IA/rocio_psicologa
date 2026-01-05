'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { Calendar, Clock, Users, FileText, LogOut, Upload, Check, Settings, BarChart3, Edit, Globe } from 'lucide-react';
import { getAllSessions, getUpcomingSessions, MOCK_USERS, Session as SessionType } from '@/lib/mockData';

export default function AdminDashboard() {
    const { user, logout, isRole, isLoading } = useAuth();
    const router = useRouter();
    const [sessions, setSessions] = useState<SessionType[]>([]);
    const [upcomingSessions, setUpcomingSessions] = useState<SessionType[]>([]);
    const [uploadingSessionId, setUploadingSessionId] = useState<string | null>(null);

    useEffect(() => {
        // Wait for auth to load
        if (isLoading) return;

        if (!isRole('admin')) {
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
        setTimeout(() => {
            setSessions(prev => prev.map(s =>
                s.id === sessionId
                    ? { ...s, boletaUrl: `/boletas/boleta-${sessionId}.pdf` }
                    : s
            ));
            setUploadingSessionId(null);
        }, 1500);
    };

    const allUsers = MOCK_USERS;
    const patients = allUsers.filter(u => u.role === 'paciente');

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-CL', { day: '2-digit', month: 'short' });
    };

    // Stats
    const stats = {
        totalPatients: patients.length,
        totalSessions: sessions.length,
        upcomingSessions: upcomingSessions.length,
        completedSessions: sessions.filter(s => s.status === 'completada').length,
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-xs font-medium uppercase">
                                Administrador
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary">
                            Panel de Administración
                        </h1>
                        <p className="text-text-secondary mt-1">Gestión completa del sistema.</p>
                    </div>
                    <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
                        <LogOut size={16} /> Cerrar Sesión
                    </Button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center">
                                <Users className="text-rose-600" size={20} />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-primary">{stats.totalPatients}</p>
                        <p className="text-sm text-text-light">Pacientes</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                <Calendar className="text-blue-600" size={20} />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-primary">{stats.upcomingSessions}</p>
                        <p className="text-sm text-text-light">Próximas Citas</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                                <Check className="text-green-600" size={20} />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-primary">{stats.completedSessions}</p>
                        <p className="text-sm text-text-light">Sesiones Completadas</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                                <BarChart3 className="text-purple-600" size={20} />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-primary">{stats.totalSessions}</p>
                        <p className="text-sm text-text-light">Total Sesiones</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Content Management */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <Globe className="text-accent" size={24} />
                                <h2 className="text-xl font-heading font-bold text-primary">Gestión de Contenido</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <button className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors text-left">
                                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                                        <Edit className="text-accent" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-primary">Editar Servicios</h4>
                                        <p className="text-sm text-text-light">Gestionar lista de servicios</p>
                                    </div>
                                </button>
                                <button className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors text-left">
                                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                                        <FileText className="text-accent" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-primary">Blog</h4>
                                        <p className="text-sm text-text-light">Crear y editar artículos</p>
                                    </div>
                                </button>
                                <button className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors text-left">
                                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                                        <Settings className="text-accent" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-primary">Configuración</h4>
                                        <p className="text-sm text-text-light">Ajustes del sitio</p>
                                    </div>
                                </button>
                                <button className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors text-left">
                                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                                        <Users className="text-accent" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-primary">Usuarios</h4>
                                        <p className="text-sm text-text-light">Gestionar cuentas</p>
                                    </div>
                                </button>
                            </div>
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

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Profile Card */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                            <div className="w-24 h-24 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-heading text-purple-600">
                                {user?.name?.charAt(0) || 'A'}
                            </div>
                            <h3 className="text-xl font-bold text-primary">{user?.name || 'Admin'}</h3>
                            <p className="text-sm text-text-light mb-2">{user?.email}</p>
                            <span className="inline-block px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
                                Administrador
                            </span>
                        </div>

                        {/* All Users List */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-2 mb-4">
                                <Users className="text-accent" size={20} />
                                <h3 className="font-heading font-bold text-primary">Todos los Usuarios</h3>
                            </div>
                            <div className="space-y-3">
                                {allUsers.map((u) => (
                                    <div key={u.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${u.role === 'admin' ? 'bg-purple-100 text-purple-600' :
                                            u.role === 'especialista' ? 'bg-teal-100 text-teal-600' :
                                                'bg-rose-100 text-rose-600'
                                            }`}>
                                            {u.name.charAt(0)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-primary truncate">{u.name}</p>
                                            <p className="text-xs text-text-light truncate">{u.email}</p>
                                        </div>
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                                            u.role === 'especialista' ? 'bg-teal-100 text-teal-700' :
                                                'bg-rose-100 text-rose-700'
                                            }`}>
                                            {u.role}
                                        </span>
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
