'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';

export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            alert("Registro completado (Simulación)");
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-secondary/30 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
            <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl space-y-8">
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-text-light hover:text-primary transition-colors flex items-center gap-2">
                        <ArrowLeft size={16} /> Volver
                    </Link>
                    <img src="/assets/logo.png" alt="Logo" className="h-10 w-auto object-contain" />
                </div>

                <div className="text-center">
                    <h2 className="text-3xl font-heading font-bold text-primary">Crear Cuenta</h2>
                    <p className="mt-2 text-text-secondary">Únete para gestionar tus sesiones</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>

                    {/* Nombre */}
                    <div className="space-y-1">
                        <label htmlFor="nombre" className="block text-sm font-medium text-text-primary">Nombre</label>
                        <input type="text" id="nombre" name="nombre" placeholder="Nombre" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
                    </div>

                    {/* RUT (Obligatorio) */}
                    <div className="space-y-1">
                        <label htmlFor="rut" className="block text-sm font-medium text-text-primary">RUT <span className="text-red-500">*</span></label>
                        <input type="text" id="rut" name="rut" required placeholder="12.345.678-9" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
                        <p className="text-xs text-text-light">Obligatorio para iniciar sesión</p>
                    </div>

                    {/* Apellidos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label htmlFor="apellido_paterno" className="block text-sm font-medium text-text-primary">Apellido Paterno</label>
                            <input type="text" id="apellido_paterno" name="apellido_paterno" placeholder="Apellido Paterno" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="apellido_materno" className="block text-sm font-medium text-text-primary">Apellido Materno</label>
                            <input type="text" id="apellido_materno" name="apellido_materno" placeholder="Apellido Materno" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                        <label htmlFor="email" className="block text-sm font-medium text-text-primary">Email</label>
                        <input type="email" id="email" name="email" placeholder="Email" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
                    </div>

                    {/* Telefono */}
                    <div className="space-y-1">
                        <label htmlFor="telefono" className="block text-sm font-medium text-text-primary">Teléfono</label>
                        <div className="flex gap-2">
                            <select className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all bg-white">
                                <option>Chile (+56)</option>
                                <option>Argentina (+54)</option>
                                <option>Perú (+51)</option>
                            </select>
                            <input type="tel" id="telefono" name="telefono" placeholder="Teléfono" className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
                        </div>
                    </div>

                    {/* Comentario */}
                    <div className="space-y-1">
                        <label htmlFor="comentario" className="block text-sm font-medium text-text-primary">Comentario</label>
                        <input type="text" id="comentario" name="comentario" placeholder="Comentario" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
                    </div>

                    {/* Direccion */}
                    <div className="space-y-1">
                        <label htmlFor="direccion" className="block text-sm font-medium text-text-primary">Dirección</label>
                        <input type="text" id="direccion" name="direccion" placeholder="Dirección" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
                    </div>

                    {/* Fecha Nacimiento */}
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-text-primary">Fecha Nacimiento</label>
                        <div className="grid grid-cols-3 gap-2">
                            <input type="number" placeholder="Día" className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
                            <input type="number" placeholder="Mes" className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
                            <input type="number" placeholder="Año" className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
                        </div>
                    </div>

                    {/* Prevision */}
                    <div className="space-y-1">
                        <label htmlFor="prevision" className="block text-sm font-medium text-text-primary">Previsión</label>
                        <select id="prevision" name="prevision" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all bg-white">
                            <option value="">Selecciona Previsión</option>
                            <option value="fonasa">Fonasa</option>
                            <option value="isapre">Isapre</option>
                            <option value="particular">Particular</option>
                        </select>
                    </div>

                    {/* Ubicacion */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                            <label htmlFor="pais" className="block text-sm font-medium text-text-primary">País</label>
                            <select id="pais" name="pais" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all bg-white">
                                <option value="chile">Chile</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="region" className="block text-sm font-medium text-text-primary">Región</label>
                            <select id="region" name="region" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all bg-white">
                                <option value="">Selecciona Región</option>
                                <option value="rm">Metropolitana</option>
                                <option value="valpo">Valparaíso</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="comuna" className="block text-sm font-medium text-text-primary">Comuna</label>
                            <select id="comuna" name="comuna" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all bg-white">
                                <option value="">Selecciona Comuna</option>
                                <option value="providencia">Providencia</option>
                                <option value="santiago">Santiago</option>
                                <option value="las_condes">Las Condes</option>
                            </select>
                        </div>
                    </div>

                    {/* Sexo */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-text-primary">Sexo asignado al nacer</label>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <input type="radio" id="sexro_no_especifica" name="sexo" value="no_especifica" />
                                <label htmlFor="sexro_no_especifica" className="text-sm text-text-secondary">No especifica</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="radio" id="sexo_masculino" name="sexo" value="masculino" />
                                <label htmlFor="sexo_masculino" className="text-sm text-text-secondary">Masculino</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="radio" id="sexo_femenino" name="sexo" value="femenino" />
                                <label htmlFor="sexo_femenino" className="text-sm text-text-secondary">Femenino</label>
                            </div>
                        </div>
                    </div>


                    <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                        {isLoading ? 'Registrando...' : 'Registrarme'}
                    </Button>

                    <p className="text-center text-sm text-text-secondary">
                        ¿Ya tienes cuenta?{' '}
                        <Link href="/auth/login" className="text-accent hover:underline font-medium">
                            Inicia Sesión
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
