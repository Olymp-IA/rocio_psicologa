import Section from '../ui/Section';
import Button from '../ui/Button';
import { ArrowRight } from 'lucide-react';
import { BouncingBalls } from '../ui/bouncing-balls';

export default function Hero() {
    return (
        <Section id="hero" className="pt-32 pb-20 md:pt-48 md:pb-32 bg-secondary/30 relative overflow-hidden">
            {/* Background Animation Removed (Moved to Global Layout) */}

            <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                <div className="space-y-8 animate-in slide-in-from-left-8 duration-700 fade-in">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-secondary-dark text-xs font-semibold tracking-wider text-accent uppercase shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        Psicología Clínica & Bienestar
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-primary">
                        Reencuéntrate con tu <span className="text-accent italic">paz interior</span>.
                    </h1>

                    <p className="text-lg text-text-secondary leading-relaxed max-w-lg">
                        Un espacio seguro y confidencial diseñado para acompañarte en tu proceso de sanación y crecimiento personal. Terapia basada en la empatía y la evidencia.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Button size="lg" className="group shadow-lg shadow-accent/20 hover:shadow-accent/30 transition-all">
                            Comenzar ahora
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                        <Button variant="outline" size="lg" className="bg-white/50 backdrop-blur-sm hover:bg-white/80">
                            Conoce mi enfoque
                        </Button>
                    </div>

                    <div className="pt-8 flex items-center gap-4 text-sm text-text-light">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white" />
                            ))}
                        </div>
                        <p>+200 Pacientes acompañados</p>
                    </div>
                </div>

                <div className="relative animate-in slide-in-from-right-8 duration-1000 fade-in delay-200">
                    <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] bg-gray-200 border-4 border-white">
                        {/* Placeholder for Rocio's Image */}
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">
                            Imagen Principal
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-secondary rounded-full blur-3xl -z-10 opacity-50 animate-pulse" />
                    <div className="absolute top-8 -right-8 w-72 h-72 bg-accent/10 rounded-full blur-3xl -z-10" />
                </div>
            </div>
        </Section>
    );
}
