import Section from '../ui/Section';
import { Heart, Brain, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function About() {
    const features = [
        { icon: Heart, title: "Enfoque Empático", desc: "Escucha activa sin juicios." },
        { icon: Brain, title: "Basado en Evidencia", desc: "Técnicas probadas científicamente." },
        { icon: Users, title: "Espacio Seguro", desc: "Confidencialidad absoluta garantizada." },
    ];

    return (
        <Section id="about" className="bg-white/50 backdrop-blur-sm">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="order-2 md:order-1 relative">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-gray-100 relative z-10">
                        {/* Placeholder for About Image */}
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-secondary/20">
                            Foto Profesional en Consulta
                        </div>
                    </div>
                    <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary rounded-full -z-10" />
                    <div className="absolute -top-6 -right-6 w-32 h-32 border-2 border-accent/20 rounded-full -z-10" />
                </div>

                <div className="order-1 md:order-2 space-y-6">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary">
                        Más que una terapia, <br /> un camino hacia ti mismo.
                    </h2>
                    <p className="text-text-secondary leading-relaxed">
                        Hola, soy Rocío Manosalva. Mi práctica se centra en crear un vínculo real y humano. Entiendo que dar el primer paso es difícil, por eso mi consulta está diseñada para ser un refugio.
                    </p>
                    <p className="text-text-secondary leading-relaxed">
                        Con más de 10 años de experiencia clínica, combino la calidez humana con estrategias terapéuticas avanzadas para ayudarte a navegar la ansiedad, el estrés y los desafíos relacionales.
                    </p>

                    <div className="grid sm:grid-cols-3 gap-6 pt-6">
                        {features.map((f, i) => (
                            <div key={i} className="text-center md:text-left space-y-2">
                                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-accent mx-auto md:mx-0">
                                    <f.icon size={20} />
                                </div>
                                <h3 className="font-semibold text-primary">{f.title}</h3>
                                <p className="text-xs text-text-light">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
}
