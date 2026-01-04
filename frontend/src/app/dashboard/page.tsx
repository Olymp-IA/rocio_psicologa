'use client';

import { useAuth } from '@/lib/AuthContext';
import Button from '@/components/ui/Button';
import { Calendar, Clock, FileText, LogOut, Upload, Edit } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                    <div>
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

                            <div className="flex flex-col md:flex-row items-center justify-between bg-secondary/10 p-6 rounded-xl border border-secondary/20">
                                <div className="flex items-center gap-6 mb-4 md:mb-0">
                                    <div className="text-center bg-white p-3 rounded-lg shadow-sm min-w-[80px]">
                                        <span className="block text-2xl font-bold text-primary">15</span>
                                        <span className="text-xs uppercase font-bold text-accent tracking-wider">ENE</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-primary">Terapia Individual</h3>
                                        <div className="flex items-center gap-4 text-sm text-text-secondary mt-1">
                                            <div className="flex items-center gap-1">
                                                <Clock size={14} /> 10:00 hrs
                                            </div>
                                            <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">Pendiente de Pago</span>
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
                        </div>

                        {/* History */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <FileText className="text-accent" size={24} />
                                <h2 className="text-xl font-heading font-bold text-primary">Historial de Sesiones</h2>
                            </div>

                            <div className="space-y-6 relative border-l-2 border-gray-100 ml-3 pl-8">
                                {[
                                    { title: "Terapia Individual", date: "02 Ene" },
                                    { title: "Terapia Individual", date: "15 Dic" },
                                    { title: "Evaluación Inicial", date: "01 Dic" }
                                ].map((session, i) => (
                                    <div key={i} className="relative">
                                        <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-gray-200 border-2 border-white" />
                                        <h4 className="font-semibold text-primary">{session.title}</h4>
                                        <span className="text-sm text-text-light">{session.date}</span>
                                    </div>
                                ))}
                            </div>
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
                            <p className="text-sm text-text-light mb-6">{user?.email || 'paciente@ejemplo.com'}</p>

                            <div className="space-y-3">
                                <Link href="/dashboard/edit-profile">
                                    <Button variant="outline" className="w-full justify-start">
                                        <Edit size={16} className="mr-2" /> Editar Perfil
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        {/* Removed "Configuración" and "Chat de Soporte" as requested */}
                    </div>
                </div>
            </div>
        </div>
    );
}
