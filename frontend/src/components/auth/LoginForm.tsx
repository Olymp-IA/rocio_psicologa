'use client';
import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

interface LoginFormProps {
    onSuccess?: () => void;
    isModal?: boolean;
}

export default function LoginForm({ onSuccess, isModal = false }: LoginFormProps) {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate network delay
        setTimeout(() => {
            login(email || 'paciente@ejemplo.com');
            setIsLoading(false);
            if (onSuccess) onSuccess();
        }, 1000);
    };

    return (
        <div className={isModal ? "p-6" : ""}>
            <div className="text-center mb-8">
                <h2 className="text-3xl font-heading font-bold text-primary mb-2">Bienvenido</h2>
                <p className="text-text-secondary">Ingresa a tu cuenta para gestionar tus citas.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-text-primary ml-1">Correo Electrónico</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" size={18} />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="ejemplo@correo.com"
                            className="w-full pl-10 pr-4 py-3 bg-secondary/20 border border-transparent rounded-xl focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all outline-none placeholder:text-text-light/70"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-text-primary ml-1">Contraseña</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" size={18} />
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full pl-10 pr-4 py-3 bg-secondary/20 border border-transparent rounded-xl focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all outline-none placeholder:text-text-light/70"
                        />
                    </div>
                    <div className="flex justify-end">
                        <Link href="#" className="text-xs text-accent hover:underline">¿Olvidaste tu contraseña?</Link>
                    </div>
                </div>

                <Button className="w-full" size="lg" isLoading={isLoading}>
                    Iniciar Sesión
                </Button>
            </form>

            <div className="mt-8 text-center text-sm text-text-secondary">
                <p>¿Aún no tienes cuenta?</p>
                <Link href="/auth/register" className="font-medium text-accent hover:text-accent-dark transition-colors" onClick={onSuccess}>
                    Crear una cuenta nueva
                </Link>
            </div>
        </div>
    );
}
