'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

interface LoginFormProps {
    onSuccess?: () => void;
    isModal?: boolean;
}

export default function LoginForm({ onSuccess, isModal = false }: LoginFormProps) {
    const { login } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate network delay
        setTimeout(() => {
            const success = login(email, password);
            setIsLoading(false);

            if (success) {
                if (onSuccess) onSuccess();

                // Get user from localStorage to determine redirect
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    const user = JSON.parse(storedUser);
                    switch (user.role) {
                        case 'admin':
                            router.push('/dashboard/admin');
                            break;
                        case 'especialista':
                            router.push('/dashboard/specialist');
                            break;
                        default:
                            router.push('/dashboard');
                    }
                }
            } else {
                setError('Credenciales inválidas. Por favor verifica tu email y contraseña.');
            }
        }, 800);
    };

    return (
        <div className={isModal ? "p-6" : ""}>
            <div className="text-center mb-8">
                <h2 className="text-3xl font-heading font-bold text-primary mb-2">Bienvenido</h2>
                <p className="text-text-secondary">Ingresa a tu cuenta para gestionar tus citas.</p>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm">
                    <AlertCircle size={16} />
                    {error}
                </div>
            )}

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
                            required
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
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

            {/* Test credentials hint */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800">
                <p className="font-semibold mb-2">🧪 Credenciales de prueba:</p>
                <ul className="space-y-1">
                    <li><span className="font-medium">Paciente:</span> paciente@test.com / 123456</li>
                    <li><span className="font-medium">Especialista:</span> especialista@test.com / 123456</li>
                    <li><span className="font-medium">Admin:</span> admin@test.com / 123456</li>
                </ul>
            </div>

            <div className="mt-6 text-center text-sm text-text-secondary">
                <p>¿Aún no tienes cuenta?</p>
                <Link href="/auth/register" className="font-medium text-accent hover:text-accent-dark transition-colors" onClick={onSuccess}>
                    Crear una cuenta nueva
                </Link>
            </div>
        </div>
    );
}
