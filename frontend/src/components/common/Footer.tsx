'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';
import { OlympiaFooter } from './OlympiaFooter';


const footerLinks = {
    services: [
        { href: '/services#individual', label: 'Terapia Individual' },
        { href: '/services#couples', label: 'Terapia de Pareja' },
        { href: '/services#family', label: 'Terapia Familiar' },
        { href: '/services#online', label: 'Consultas Online' },
    ],
    company: [
        { href: '/about', label: 'Sobre Nosotros' },
        { href: '/blog', label: 'Blog' },
        { href: '/contact', label: 'Contacto' },
        { href: '/appointments', label: 'Reservar Cita' },
    ],
    legal: [
        { href: '/privacy', label: 'Política de Privacidad' },
        { href: '/terms', label: 'Términos de Uso' },
    ],
};

const socialLinks = [
    { href: '#', label: 'Instagram', icon: '📸' },
    { href: '#', label: 'Facebook', icon: '👤' },
    { href: '#', label: 'LinkedIn', icon: '💼' },
    { href: '#', label: 'WhatsApp', icon: '💬' },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Brand */}
                    <div className={styles.brand}>
                        <Link href="/" className={styles.logo}>
                            <span className={styles.logoIcon}>🧠</span>
                            <div className={styles.logoText}>
                                <span className={styles.logoName}>Rocio Manosalva</span>
                                <span className={styles.logoTagline}>Psicología Clínica</span>
                            </div>
                        </Link>
                        <p className={styles.brandDescription}>
                            Acompañándote en tu camino hacia el bienestar mental y emocional.
                            Terapia profesional con un enfoque humano y cercano.
                        </p>
                        <div className={styles.social}>
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    className={styles.socialLink}
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Services */}
                    <div className={styles.linksColumn}>
                        <h4 className={styles.columnTitle}>Servicios</h4>
                        <ul className={styles.linksList}>
                            {footerLinks.services.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className={styles.link}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div className={styles.linksColumn}>
                        <h4 className={styles.columnTitle}>Navegación</h4>
                        <ul className={styles.linksList}>
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className={styles.link}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className={styles.linksColumn}>
                        <h4 className={styles.columnTitle}>Contacto</h4>
                        <div className={styles.contactInfo}>
                            <p>📍 Consulta Privada, Santiago</p>
                            <p>📞 +56 9 9999 9999</p>
                            <p>✉️ contacto@rociomanosalva.cl</p>
                            <p>🕐 Lun - Vie: 9:00 - 20:00</p>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p className={styles.copyright}>
                        © {currentYear} Rocio Manosalva. Todos los derechos reservados.
                    </p>
                    <OlympiaFooter variant="minimal" />

                    <div className={styles.legalLinks}>
                        {footerLinks.legal.map((link) => (
                            <Link key={link.href} href={link.href} className={styles.legalLink}>
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

