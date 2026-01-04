import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Mail, Lock, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 md:p-10 animate-in fade-in zoom-in-95 duration-500">

                <Link href="/" className="inline-flex items-center text-sm text-text-light hover:text-primary transition-colors mb-8">
                    <ArrowLeft size={16} className="mr-2" />
                    Volver al inicio
                </Link>

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-heading font-bold text-primary mb-2">Bienvenido</h1>
                    <p className="text-text-secondary">Ingresa a tu cuenta para gestionar tus citas.</p>
                </div>

                <form className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-primary ml-1">Correo Electrónico</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" size={18} />
                            <input
                                type="email"
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

                    <Button className="w-full" size="lg">
                        Iniciar Sesión
                    </Button>
                </form>

                <div className="mt-8 text-center text-sm text-text-secondary">
                    <p>¿Aún no tienes cuenta?</p>
                    <Link href="/auth/register" className="font-medium text-accent hover:text-accent-dark transition-colors">
                        Crear una cuenta nueva
                    </Link>
                </div>
            </div>
        </div>
    );
}
