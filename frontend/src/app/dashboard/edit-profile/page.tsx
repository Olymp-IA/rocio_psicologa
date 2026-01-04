'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { ArrowLeft, Save } from 'lucide-react';

export default function EditProfilePage() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            alert("Perfil actualizado correctamente");
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-8">
                <div className="flex items-center justify-between border-b border-gray-100 pb-6">
                    <Link href="/dashboard" className="text-text-light hover:text-primary transition-colors flex items-center gap-2">
                        <ArrowLeft size={16} /> Volver al Dashboard
                    </Link>
                    <h2 className="text-2xl font-heading font-bold text-primary">Editar Perfil</h2>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>

                    {/* Nombre */}
                    <div className="space-y-1">
                        <label htmlFor="nombre" className="block text-sm font-medium text-text-primary">Nombre</label>
                        <input type="text" id="nombre" name="nombre" defaultValue="Paciente" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
                    </div>

                    {/* RUT (Obligatorio) */}
                    <div className="space-y-1">
                        <label htmlFor="rut" className="block text-sm font-medium text-text-primary">RUT <span className="text-red-500">*</span></label>
                        <input type="text" id="rut" name="rut" required defaultValue="12.345.678-9" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all bg-gray-50" readOnly />
                        <p className="text-xs text-text-light">El RUT no se puede modificar.</p>
                    </div>

                    {/* Apellidos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label htmlFor="apellido_paterno" className="block text-sm font-medium text-text-primary">Apellido Paterno</label>
                            <input type="text" id="apellido_paterno" name="apellido_paterno" defaultValue="Ejemplo" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="apellido_materno" className="block text-sm font-medium text-text-primary">Apellido Materno</label>
                            <input type="text" id="apellido_materno" name="apellido_materno" defaultValue="Test" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                        <label htmlFor="email" className="block text-sm font-medium text-text-primary">Email</label>
                        <input type="email" id="email" name="email" defaultValue="paciente@ejemplo.com" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
                    </div>

                    {/* Telefono */}
                    <div className="space-y-1">
                        <label htmlFor="telefono" className="block text-sm font-medium text-text-primary">Teléfono</label>
                        <div className="flex gap-2">
                            <select className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all bg-white" defaultValue="Chile (+56)">
                                <option>Chile (+56)</option>
                                <option>Argentina (+54)</option>
                                <option>Perú (+51)</option>
                            </select>
                            <input type="tel" id="telefono" name="telefono" defaultValue="9 1234 5678" className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
                        </div>
                    </div>

                    {/* Direccion */}
                    <div className="space-y-1">
                        <label htmlFor="direccion" className="block text-sm font-medium text-text-primary">Dirección</label>
                        <input type="text" id="direccion" name="direccion" defaultValue="Av. Siempreviva 742" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
                    </div>

                    {/* Prevision */}
                    <div className="space-y-1">
                        <label htmlFor="prevision" className="block text-sm font-medium text-text-primary">Previsión</label>
                        <select id="prevision" name="prevision" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all bg-white" defaultValue="isapre">
                            <option value="">Selecciona Previsión</option>
                            <option value="fonasa">Fonasa</option>
                            <option value="isapre">Isapre</option>
                            <option value="particular">Particular</option>
                        </select>
                    </div>

                    <div className="pt-4 flex gap-4">
                        <Button type="submit" className="flex-1" size="lg" disabled={isLoading}>
                            <Save size={18} className="mr-2" />
                            {isLoading ? 'Guardando...' : 'Guardar Cambios'}
                        </Button>
                        <Link href="/dashboard" className="flex-1">
                            <Button variant="outline" className="w-full" size="lg">
                                Cancelar
                            </Button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
