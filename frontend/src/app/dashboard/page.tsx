'use client';

import { useEffect, useState } from 'react';
import { appointments } from '@/lib/api';
import Link from 'next/link';

export default function DashboardPage() {
    const [citas, setCitas] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/auth/login';
            return;
        }

        const userStr = localStorage.getItem('user');
        if (userStr) setUser(JSON.parse(userStr));

        loadAppointments();
    }, []);

    const loadAppointments = async () => {
        try {
            const userStr = localStorage.getItem('user');
            let role = 'PATIENT';
            if (userStr) {
                const u = JSON.parse(userStr);
                role = u.role;
            }

            let res;
            if (role === 'PSYCHOLOGIST' || role === 'ADMIN') {
                res = await appointments.getAllAppointments();
            } else {
                res = await appointments.getMyAppointments();
            }

            if (res.data) {
                // Si es admin/psicólogo, res.data podría venir en otro formato si el backend paginara, 
                // pero por ahora appointments.getAllAppointments (backend) devuelve array directo o { data: [] }?
                // Revisando backend getAllAppointments retorna res.json(appointments).
                // Revisando fetchApi, si retorna json directo, el wrapper lo pone en { data, error }.
                // Así que res.data es el array.
                setCitas(res.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl w-full py-8 text-black">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-serif text-primary-dark">
                        {user?.role === 'PSYCHOLOGIST' ? 'Panel de Especialista' : 'Mi Panel'}
                    </h1>
                    {user && <p className="text-gray-600">Bienvenido, {user.name}</p>}
                </div>
                {user?.role !== 'PSYCHOLOGIST' && (
                    <Link href="/appointments" className="btn btn-primary">
                        Nueva Cita
                    </Link>
                )}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-medium mb-6 text-gray-800">
                    {user?.role === 'PSYCHOLOGIST' ? 'Próximas Sesiones' : 'Mis Citas'}
                </h2>

                {loading ? (
                    <p className="text-gray-500">Cargando...</p>
                ) : citas.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">No hay citas registradas.</p>
                        {user?.role !== 'PSYCHOLOGIST' && (
                            <Link href="/appointments" className="text-primary hover:underline">
                                Agendar mi primera cita
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {citas.map((cita) => (
                            <div key={cita.id} className="border border-gray-200 rounded-lg p-4 hover:border-accent transition-colors">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-semibold text-lg text-primary-dark">
                                                {new Date(cita.date).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
                                            </span>
                                            <span className={`text-xs px-2 py-1 rounded-full ${cita.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                                                    cita.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-gray-100 text-gray-800'
                                                }`}>
                                                {cita.status === 'PENDING' ? 'Pendiente' :
                                                    cita.status === 'CONFIRMED' ? 'Confirmada' : cita.status}
                                            </span>
                                        </div>
                                        <p className="text-gray-600">
                                            {new Date(cita.date).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} hrs
                                            {' - '}
                                            <strong>{cita.service?.name}</strong>
                                        </p>
                                        {user?.role === 'PSYCHOLOGIST' && cita.patient && (
                                            <p className="text-sm text-gray-500 mt-1">
                                                Paciente: {cita.patient.name} ({cita.patient.email})
                                            </p>
                                        )}
                                        {cita.notes && (
                                            <p className="text-sm text-gray-400 italic mt-1">
                                                Nota: "{cita.notes}"
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        {cita.meetLink && (
                                            <a
                                                href={cita.meetLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-100 transition-colors text-sm font-medium"
                                            >
                                                <span>📹</span>
                                                Unirse a Meet
                                            </a>
                                        )}
                                        {user?.role === 'PSYCHOLOGIST' && (
                                            <div className="flex gap-1 text-xs">
                                                <a href={`/dashboard/session/${cita.id}`} className="text-primary hover:underline">
                                                    Ver Ficha
                                                </a>
                                                {cita.paymentProofUrl && (
                                                    <a href={cita.paymentProofUrl} target="_blank" className="text-gray-500 hover:text-gray-700 ml-2">
                                                        Ver Bono
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
