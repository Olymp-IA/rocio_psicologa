'use client';
import Section from '../ui/Section';
import { ArrowRight, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { IconIndividual, IconCouples, IconFamily, IconWorkshops } from '../ui/Icons';
import { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import LoginForm from '../auth/LoginForm';

// Import services data (keep same data structure)
const services = [
    {
        Icon: IconIndividual,
        title: "Terapia Individual",
        subtitle: "Acompañamiento personalizado para tu bienestar",
        desc: "Un espacio personal para explorar tus emociones, superar la ansiedad y construir una autoestima sólida.",
        price: "Sesión de 50 min",
        details: {
            duration: "50-60 minutos",
            modality: "Presencial u Online",
            benefits: [
                "Tratamiento de ansiedad y estrés",
                "Superación de la depresión",
                "Mejora de la autoestima",
                "Gestión emocional",
                "Desarrollo personal",
                "Duelo y pérdidas"
            ],
            fullDesc: "Sesiones individuales diseñadas para trabajar en tus objetivos personales, superar dificultades emocionales y desarrollar estrategias de afrontamiento efectivas."
        }
    },
    {
        Icon: IconCouples,
        title: "Terapia de Pareja",
        subtitle: "Reconstruyendo el vínculo desde la empatía",
        desc: "Herramientas para mejorar la comunicación, resolver conflictos y reconectar desde la empatía.",
        price: "Sesión de 60 min",
        details: {
            duration: "60 minutos",
            modality: "Presencial u Online",
            benefits: [
                "Problemas de comunicación",
                "Resolución de conflictos",
                "Recuperación de la confianza",
                "Proyectos de vida en común",
                "Fortalecimiento de la intimidad",
                "Acompañamiento en separaciones"
            ],
            fullDesc: "Un espacio seguro para que ambos miembros de la pareja puedan expresarse, escucharse y encontrar nuevas formas de relacionarse de manera saludable."
        }
    },
    {
        Icon: IconFamily,
        title: "Terapia Familiar",
        subtitle: "Sanando relaciones y dinámicas familiares",
        desc: "Abordaje sistémico para sanar vínculos y mejorar la dinámica en el núcleo familiar.",
        price: "Sesión de 90 min",
        details: {
            duration: "90 minutos",
            modality: "Presencial",
            benefits: [
                "Conflictos padres e hijos",
                "Adaptación a cambios vitales",
                "Problemas de conducta",
                "Mejora de la convivencia",
                "Fortalecimiento de vínculos",
                "Apoyo en crisis familiares"
            ],
            fullDesc: "Trabajamos con el sistema familiar para identificar patrones disfuncionales y promover cambios que beneficien a todos sus miembros."
        }
    },
    {
        Icon: IconWorkshops,
        title: "Talleres y Grupos",
        subtitle: "Espacios de crecimiento compartido",
        desc: "Espacios de aprendizaje colectivo sobre manejo de estrés, mindfulness y habilidades sociales.",
        price: "Consultar próximas fechas",
        details: {
            duration: "Variable por taller",
            modality: "Presencial u Online",
            benefits: [
                "Mindfulness y meditación",
                "Habilidades sociales",
                "Manejo del estrés y ansiedad",
                "Escuela de padres",
                "Autocuidado y bienestar",
                "Grupos de apoyo temáticos"
            ],
            fullDesc: "Experiencias grupales diseñadas para aprender herramientas prácticas en un ambiente de apoyo mutuo y crecimiento colectivo."
        }
    }
];

export default function Services() {
    const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const { user } = useAuth();
    const router = useRouter();

    const handleBooking = () => {
        if (!user) {
            setShowLoginModal(true);
        } else {
            // Redirect to dashboard or booking page
            router.push('/dashboard');
        }
    };

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
                    <div
                        key={i}
                        onClick={() => setSelectedService(s)}
                        className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100 hover:border-accent/20 relative overflow-hidden active:scale-[0.98]"
                    >
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

            <Modal
                isOpen={!!selectedService}
                onClose={() => setSelectedService(null)}
                className="max-w-4xl p-0 overflow-hidden"
            >
                {selectedService && (
                    <div className="grid md:grid-cols-2 h-full">
                        {/* Left Column: Visual/Header */}
                        <div className="bg-gray-50 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-secondary/10" />
                            <div className="absolute top-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

                            <div className="w-20 h-20 bg-white text-primary rounded-2xl flex items-center justify-center mb-6 shadow-sm z-10">
                                <selectedService.Icon size={40} strokeWidth={1.5} />
                            </div>

                            <h3 className="text-2xl font-heading font-bold text-primary mb-2 z-10">
                                {selectedService.title}
                            </h3>
                            <p className="text-accent font-medium text-sm mb-6 z-10">
                                {selectedService.subtitle}
                            </p>

                            <p className="text-text-secondary text-sm leading-relaxed max-w-xs z-10">
                                {selectedService.details.fullDesc}
                            </p>

                            <div className="mt-8 flex gap-4 text-xs font-medium text-gray-500 z-10">
                                <div className="flex items-center gap-1.5">
                                    <Clock size={16} className="text-accent" />
                                    <span>{selectedService.details.duration}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <MapPin size={16} className="text-accent" />
                                    <span>{selectedService.details.modality}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Details */}
                        <div className="p-8 md:p-10 flex flex-col justify-center bg-white">
                            <h4 className="font-heading font-semibold text-lg mb-6 text-primary">
                                ¿Qué trabajamos?
                            </h4>
                            <ul className="space-y-3 mb-8">
                                {selectedService.details.benefits.map((benefit, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                                        <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                className="w-full justify-center"
                                onClick={handleBooking}
                            >
                                Reservar Cita
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Login Modal for Booking */}
            <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}>
                <LoginForm onSuccess={() => {
                    setShowLoginModal(false);
                    router.push('/dashboard');
                }} isModal={true} />
            </Modal>
        </Section>
    );
}
