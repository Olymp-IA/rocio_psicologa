import Link from 'next/link';
import { Instagram, Linkedin, Mail, Phone, Globe } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-primary text-white pt-20 pb-10">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-12 mb-16">
                    <div className="space-y-6">
                        <Link href="/" className="font-heading text-2xl font-bold tracking-tight">
                            Rocío Manosalva
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Psicología clínica con enfoque humano. Tu salud mental es el pilar de una vida plena.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                                <Instagram size={18} />
                            </Link>
                            <Link href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                                <Linkedin size={18} />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-heading font-semibold mb-6">Contacto</h3>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li className="flex items-start gap-3">
                                <Globe size={18} className="mt-0.5 text-accent" />
                                <span>
                                    Atención Psicológica Online
                                    <br />
                                    <span className="text-xs opacity-75">Sesiones por Google Meet / Zoom</span>
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-accent" />
                                <span>+56 9 1234 5678</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-accent" />
                                <span>contacto@rocio-psicologa.cl</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-heading font-semibold mb-6">Enlaces</h3>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li><Link href="#about" className="hover:text-accent transition-colors">Sobre mí</Link></li>
                            <li><Link href="#services" className="hover:text-accent transition-colors">Servicios</Link></li>
                            <li><Link href="#" className="hover:text-accent transition-colors">Preguntas Frecuentes</Link></li>
                            <li><Link href="#" className="hover:text-accent transition-colors">Política de Privacidad</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 text-center text-xs text-gray-500">
                    <p>© {new Date().getFullYear()} Rocío Manosalva. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
