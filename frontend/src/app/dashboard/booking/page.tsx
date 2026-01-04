'use client';
import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { ArrowLeft, Check, Calendar, Clock, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const services = [
    { id: 'ind', title: 'Terapia Individual', duration: '50 min', price: '$45.000' },
    { id: 'par', title: 'Terapia de Pareja', duration: '60 min', price: '$55.000' },
    { id: 'fam', title: 'Terapia Familiar', duration: '90 min', price: '$70.000' },
];

const mockTimeSlots = ['09:00', '10:00', '11:00', '15:00', '16:00', '17:00'];

export default function BookingPage() {
    const [step, setStep] = useState(1);
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    return (
        <div className="min-h-screen bg-secondary/30 p-4 md:p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden min-h-[600px] flex flex-col md:flex-row">

                {/* Sidebar Summary */}
                <div className="bg-primary text-white p-8 md:w-1/3 flex flex-col justify-between">
                    <div>
                        <Link href="/" className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-6">
                            <ArrowLeft size={16} className="mr-2" />
                            Volver
                        </Link>
                        <h2 className="text-2xl font-heading font-bold mb-2">Tu Reserva</h2>
                        <p className="text-gray-400 text-sm">Sigue los pasos para agendar tu sesión.</p>

                        <div className="mt-8 space-y-6">
                            <div className={cn("transition-opacity duration-300", step >= 1 ? "opacity-100" : "opacity-50")}>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold", step > 1 ? "bg-accent text-white" : "bg-white/20")}>
                                        {step > 1 ? <Check size={14} /> : 1}
                                    </div>
                                    <span className="font-medium">Servicio</span>
                                </div>
                                {selectedService && <p className="text-sm text-accent pl-9">{services.find(s => s.id === selectedService)?.title}</p>}
                            </div>

                            <div className={cn("transition-opacity duration-300", step >= 2 ? "opacity-100" : "opacity-50")}>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold", step > 2 ? "bg-accent text-white" : "bg-white/20")}>
                                        {step > 2 ? <Check size={14} /> : 2}
                                    </div>
                                    <span className="font-medium">Fecha y Hora</span>
                                </div>
                                {selectedDate && selectedTime && <p className="text-sm text-accent pl-9">Ene {selectedDate}, {selectedTime}</p>}
                            </div>

                            <div className={cn("transition-opacity duration-300", step >= 3 ? "opacity-100" : "opacity-50")}>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-white/20">3</div>
                                    <span className="font-medium">Confirmación</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/10">
                        <p className="text-xs text-gray-500">¿Necesitas ayuda?</p>
                        <p className="text-sm text-gray-300">+56 9 1234 5678</p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-8 md:p-12 overflow-y-auto">
                    {step === 1 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
                            <h3 className="text-2xl font-bold text-primary">Selecciona un Servicio</h3>
                            <div className="grid gap-4">
                                {services.map((service) => (
                                    <button
                                        key={service.id}
                                        onClick={() => setSelectedService(service.id)}
                                        className={cn(
                                            "text-left p-6 rounded-xl border-2 transition-all flex justify-between items-center group",
                                            selectedService === service.id
                                                ? "border-accent bg-accent/5 ring-1 ring-accent"
                                                : "border-gray-100 hover:border-accent/30 hover:bg-gray-50"
                                        )}
                                    >
                                        <div>
                                            <h4 className="font-bold text-primary group-hover:text-accent transition-colors">{service.title}</h4>
                                            <p className="text-sm text-text-light mt-1">{service.duration} • Presencial o Online</p>
                                        </div>
                                        <span className="font-semibold text-primary">{service.price}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
                            <h3 className="text-2xl font-bold text-primary">Elige un Horario</h3>

                            {/* Fake Calendar Strip */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-medium text-text-primary">Enero 2024</h4>
                                    <div className="flex gap-2">
                                        <button className="p-1 hover:bg-gray-100 rounded"><ChevronLeft size={20} /></button>
                                        <button className="p-1 hover:bg-gray-100 rounded"><ChevronRight size={20} /></button>
                                    </div>
                                </div>

                                <div className="flex gap-2 overflow-x-auto pb-2">
                                    {[10, 11, 12, 13, 14, 15, 16].map((date) => (
                                        <button
                                            key={date}
                                            onClick={() => setSelectedDate(date)}
                                            className={cn(
                                                "flex flex-col items-center justify-center w-16 h-20 rounded-xl border transition-all flex-shrink-0",
                                                selectedDate === date
                                                    ? "bg-primary text-white border-primary shadow-lg scale-105"
                                                    : "bg-white border-gray-100 text-text-light hover:border-primary/30 hover:bg-gray-50"
                                            )}
                                        >
                                            <span className="text-xs font-medium uppercase">Lun</span>
                                            <span className="text-xl font-bold">{date}</span>
                                        </button>
                                    ))}
                                </div>

                                <div className="pt-6">
                                    <h4 className="font-medium text-text-primary mb-4">Horas Disponibles</h4>
                                    <div className="grid grid-cols-3 gap-3">
                                        {mockTimeSlots.map((time) => (
                                            <button
                                                key={time}
                                                onClick={() => setSelectedTime(time)}
                                                disabled={!selectedDate}
                                                className={cn(
                                                    "py-2 px-4 rounded-lg text-sm font-medium transition-all",
                                                    selectedTime === time
                                                        ? "bg-accent text-white shadow-md"
                                                        : "bg-secondary text-primary hover:bg-secondary-dark disabled:opacity-50 disabled:cursor-not-allowed"
                                                )}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300 text-center py-8">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
                                <Check size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-primary">¡Todo Listo!</h3>
                            <p className="text-text-secondary max-w-md mx-auto">
                                Hemos reservado tu cita preliminarmente. Te enviaremos un correo de confirmación con los detalles de pago.
                            </p>

                            <div className="bg-gray-50 rounded-xl p-6 mt-8 max-w-sm mx-auto text-left space-y-3">
                                <div className="flex items-center gap-3 text-sm">
                                    <Calendar className="text-accent" size={18} />
                                    <span className="font-medium text-primary">Lunes {selectedDate} de Enero</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Clock className="text-accent" size={18} />
                                    <span className="font-medium text-primary">{selectedTime} hrs</span>
                                </div>
                                <div className="pt-3 border-t border-gray-200 mt-3 flex justify-between items-center">
                                    <span className="text-sm text-text-light">Total a pagar</span>
                                    <span className="font-bold text-primary text-lg">{services.find(s => s.id === selectedService)?.price}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="mt-8 pt-8 border-t border-gray-100 flex justify-between">
                        {step > 1 && step < 3 ? (
                            <Button variant="ghost" onClick={handleBack}>Atrás</Button>
                        ) : <div></div>}

                        {step < 3 ? (
                            <Button
                                onClick={handleNext}
                                disabled={(step === 1 && !selectedService) || (step === 2 && (!selectedDate || !selectedTime))}
                            >
                                Continuar
                            </Button>
                        ) : (
                            <Link href="/">
                                <Button>Volver al Inicio</Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
