'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, User as UserIcon, LogOut, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '../ui/Button';
import { useAuth } from '@/lib/AuthContext';
import Modal from '../ui/Modal';
import LoginForm from '../auth/LoginForm';
import BookingForm from '../dashboard/BookingForm';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    const { isLoggedIn, user, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Inicio', href: '/#hero' },
        { name: 'Sobre mí', href: '/#about' },
        { name: 'Terapia', href: '/#services' },
        { name: 'Blog', href: '/blog' },
    ];

    return (
        <>
            <header
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                    isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
                )}
            >
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 font-heading text-2xl font-bold text-primary tracking-tight">
                        <img src="/assets/logo.png" alt="Rocío Manosalva Logo" className="h-12 w-auto object-contain" />
                        <span className="hidden sm:inline">Rocío Manosalva</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-text-primary hover:text-accent font-medium transition-colors text-sm uppercase tracking-wide"
                            >
                                {link.name}
                            </Link>
                        ))}

                        {isLoggedIn ? (
                            <div className="flex items-center gap-4 animate-in fade-in">
                                <Link href="/dashboard" className="flex items-center gap-2 text-primary font-medium text-sm hover:text-accent transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                                        <UserIcon size={16} />
                                    </div>
                                    <span>Hola, {user?.name}</span>
                                </Link>

                                <Button size="sm" variant="primary" onClick={() => setIsBookingModalOpen(true)}>
                                    Reservar Cita
                                </Button>

                                <button
                                    onClick={logout}
                                    className="p-2 text-text-light hover:text-error transition-colors"
                                    title="Cerrar Sesión"
                                >
                                    <LogOut size={18} />
                                </button>
                            </div>
                        ) : (
                            <Button
                                size="sm"
                                variant={isScrolled ? 'primary' : 'outline'}
                                onClick={() => setIsLoginModalOpen(true)}
                            >
                                Ingresar
                            </Button>
                        )}
                    </nav>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden text-primary"
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                    >
                        {isMobileOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileOpen && (
                    <div className="absolute top-full left-0 right-0 bg-white border-t p-6 shadow-lg md:hidden flex flex-col gap-4 animate-in slide-in-from-top-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-lg font-medium py-2 border-b border-gray-100"
                                onClick={() => setIsMobileOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {!isLoggedIn ? (
                            <Button
                                className="w-full mt-2"
                                onClick={() => {
                                    setIsMobileOpen(false);
                                    setIsLoginModalOpen(true);
                                }}
                            >
                                Ingresar
                            </Button>
                        ) : (
                            <>
                                <Link href="/dashboard" onClick={() => setIsMobileOpen(false)} className="flex items-center gap-2 font-medium py-2">
                                    <LayoutDashboard size={18} /> Mi Dashboard
                                </Link>
                                <Button className="w-full mt-2" onClick={() => { setIsMobileOpen(false); setIsBookingModalOpen(true); }}>
                                    Reservar Cita
                                </Button>
                                <button
                                    onClick={() => {
                                        logout();
                                        setIsMobileOpen(false);
                                    }}
                                    className="flex items-center gap-2 text-error font-medium py-2"
                                >
                                    <LogOut size={18} /> Cerrar Sesión
                                </button>
                            </>
                        )}
                    </div>
                )}
            </header>

            {/* Login Modal */}
            <Modal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}>
                <LoginForm onSuccess={() => setIsLoginModalOpen(false)} isModal={true} />
            </Modal>

            {/* Booking Modal */}
            <Modal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} className="max-w-2xl">
                <BookingForm onSuccess={() => setIsBookingModalOpen(false)} onCancel={() => setIsBookingModalOpen(false)} />
            </Modal>
        </>
    );
}
