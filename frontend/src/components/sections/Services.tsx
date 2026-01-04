import Section from '../ui/Section';
import { ArrowRight } from 'lucide-react';
import { IconIndividual, IconCouples, IconFamily, IconWorkshops } from '../ui/Icons';

const services = [
    {
        Icon: IconIndividual,
        title: "Terapia Individual",
        desc: "Un espacio personal para explorar tus emociones, superar la ansiedad y construir una autoestima sólida.",
        price: "Sesión de 50 min"
    },
    {
        Icon: IconCouples,
        title: "Terapia de Pareja",
        desc: "Herramientas para mejorar la comunicación, resolver conflictos y reconectar desde la empatía.",
        price: "Sesión de 60 min"
    },
    {
        Icon: IconFamily,
        title: "Terapia Familiar",
        desc: "Abordaje sistémico para sanar vínculos y mejorar la dinámica en el núcleo familiar.",
        price: "Sesión de 90 min"
    },
    {
        Icon: IconWorkshops,
        title: "Talleres y Grupos",
        desc: "Espacios de aprendizaje colectivo sobre manejo de estrés, mindfulness y habilidades sociales.",
        price: "Consultar próximas fechas"
    }
];

export default function Services() {
    return (
        <Section id="services" className="bg-secondary/20 backdrop-blur-sm">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-accent font-semibold tracking-wider text-sm uppercase">Mis Servicios</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mt-2">
                    ¿Cómo puedo ayudarte hoy?
                </h2>
                <p className="mt-4 text-text-secondary">
                    Adaptamos el proceso terapéutico a tus necesidades específicas, con flexibilidad y compromiso.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((s, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group cursor-default border border-gray-100 hover:border-accent/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/10 transition-colors" />

                        <div className="w-14 h-14 bg-primary text-white rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <s.Icon size={28} strokeWidth={1.5} />
                        </div>

                        <h3 className="text-xl font-heading font-bold text-primary mb-3 font-heading group-hover:text-accent transition-colors">
                            {s.title}
                        </h3>
                        <p className="text-text-secondary text-sm leading-relaxed mb-6">
                            {s.desc}
                        </p>
                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                            <span className="text-xs font-medium text-text-light">{s.price}</span>
                            <ArrowRight className="h-4 w-4 text-accent opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
}
