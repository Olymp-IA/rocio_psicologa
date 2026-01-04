'use client';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import { ArrowLeft, Check, Calendar, Clock, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const services = [
    { id: 'ind', title: 'Terapia Individual', duration: '50 min', price: '$45.000' },
    { id: 'par', title: 'Terapia de Pareja', duration: '60 min', price: '$55.000' },
    { id: 'fam', title: 'Terapia Familiar', duration: '90 min', price: '$70.000' },
];

const mockTimeSlots = ['09:00', '10:00', '11:00', '15:00', '16:00', '17:00'];

interface BookingFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
}

export default function BookingForm({ onSuccess, onCancel }: BookingFormProps) {
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
        <div className="flex flex-col h-full bg-white rounded-xl overflow-hidden">

            {/* Header / Progress - Adapted for Modal */}
            <div className="bg-primary text-white p-6">
                <h2 className="text-xl font-heading font-bold mb-1">Nueva Reserva</h2>
                <p className="text-gray-400 text-xs mb-4">Paso {step} de 3</p>

                <div className="flex items-center gap-2">
                    {/* Simple Progress Bar */}
                    <div className={cn("h-1 flex-1 rounded-full bg-white/20", step >= 1 && "bg-accent")} />
                    <div className={cn("h-1 flex-1 rounded-full bg-white/20", step >= 2 && "bg-accent")} />
                    <div className={cn("h-1 flex-1 rounded-full bg-white/20", step >= 3 && "bg-accent")} />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 overflow-y-auto max-h-[60vh]">
                {step === 1 && (
                    <div className="space-y-4 animate-in slide-in-from-right-4 fade-in duration-300">
                        <h3 className="text-lg font-bold text-primary">Selecciona un Servicio</h3>
                        <div className="grid gap-3">
                            {services.map((service) => (
                                <button
                                    key={service.id}
                                    onClick={() => setSelectedService(service.id)}
                                    className={cn(
                                        "text-left p-4 rounded-xl border transition-all flex justify-between items-center group",
                                        selectedService === service.id
                                            ? "border-accent bg-accent/5 ring-1 ring-accent"
                                            : "border-gray-100 hover:border-accent/30 hover:bg-gray-50"
                                    )}
                                >
                                    <div>
                                        <h4 className="font-bold text-sm text-primary group-hover:text-accent transition-colors">{service.title}</h4>
                                        <p className="text-xs text-text-light mt-1">{service.duration}</p>
                                    </div>
                                    <span className="font-semibold text-sm text-primary">{service.price}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4 animate-in slide-in-from-right-4 fade-in duration-300">
                        <h3 className="text-lg font-bold text-primary">Elige Horario</h3>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h4 className="font-medium text-sm text-text-primary">Enero 2024</h4>
                                <div className="flex gap-1">
                                    <button className="p-1 hover:bg-gray-100 rounded"><ChevronLeft size={16} /></button>
                                    <button className="p-1 hover:bg-gray-100 rounded"><ChevronRight size={16} /></button>
                                </div>
                            </div>

                            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                                {[10, 11, 12, 13, 14, 15, 16].map((date) => (
                                    <button
                                        key={date}
                                        onClick={() => setSelectedDate(date)}
                                        className={cn(
                                            "flex flex-col items-center justify-center w-12 h-16 rounded-lg border transition-all flex-shrink-0",
                                            selectedDate === date
                                                ? "bg-primary text-white border-primary shadow-md"
                                                : "bg-white border-gray-100 text-text-light hover:border-primary/30 hover:bg-gray-50"
                                        )}
                                    >
                                        <span className="text-[10px] font-medium uppercase">Lun</span>
                                        <span className="text-lg font-bold">{date}</span>
                                    </button>
                                ))}
                            </div>

                            <div>
                                <h4 className="font-medium text-sm text-text-primary mb-2">Horas</h4>
                                <div className="grid grid-cols-3 gap-2">
                                    {mockTimeSlots.map((time) => (
                                        <button
                                            key={time}
                                            onClick={() => setSelectedTime(time)}
                                            disabled={!selectedDate}
                                            className={cn(
                                                "py-2 px-3 rounded-lg text-xs font-medium transition-all",
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
                    <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300 text-center py-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
                            <Check size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-primary">¡Reserva Confirmada!</h3>
                        <p className="text-sm text-text-secondary">
                            Te hemos enviado un correo con los detalles.
                        </p>

                        <div className="bg-gray-50 rounded-xl p-4 mt-4 text-left space-y-2 text-sm border border-gray-100">
                            <div className="flex justify-between">
                                <span className="text-text-light">Servicio:</span>
                                <span className="font-medium text-primary text-right">{services.find(s => s.id === selectedService)?.title}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-text-light">Fecha:</span>
                                <span className="font-medium text-primary">Lun {selectedDate} Ene, {selectedTime}</span>
                            </div>
                            <div className="pt-2 border-t border-gray-200 mt-2 flex justify-between items-center bg-white p-2 rounded-lg">
                                <span className="text-text-light">Total</span>
                                <span className="font-bold text-accent">{services.find(s => s.id === selectedService)?.price}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Actions */}
            <div className="p-6 pt-0 flex justify-between">
                {(step > 1 && step < 3) ? (
                    <Button variant="ghost" size="sm" onClick={handleBack}>Atrás</Button>
                ) : <div />}

                {step < 3 ? (
                    <Button
                        onClick={handleNext}
                        size="sm"
                        disabled={(step === 1 && !selectedService) || (step === 2 && (!selectedDate || !selectedTime))}
                    >
                        Continuar
                    </Button>
                ) : (
                    <Button className="w-full" onClick={onSuccess}>Finalizar</Button>
                )}
            </div>
        </div>
    );
}
