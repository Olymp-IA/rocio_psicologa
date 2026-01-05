'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';
import { OlympiaFooter } from './OlympiaFooter';


const footerLinks = {
    services: [
        { href: '/services', label: 'Terapia Individual' },
        { href: '/services', label: 'Terapia de Pareja' },
        { href: '/services', label: 'Terapia Familiar' },
        { href: '/services', label: 'Consultas Online' },
    ],
    company: [
        { href: '/about', label: 'Sobre mí' },
        { href: '/blog', label: 'Blog' },
        { href: '/contact', label: 'Contacto' },
    ],
    legal: [
        { href: '/privacy', label: 'Política de Privacidad' },
        { href: '/terms', label: 'Términos de Uso' },
    ],
};



export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Brand */}
                    <div className={styles.brand}>
                        <Link href="/" className={styles.logo}>
                            <img src="/assets/logo.png" alt="Logo" className={styles.logoIcon} style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                            <div className={styles.logoText}>
                                <span className={styles.logoName}>Rocío Manosalva</span>
                                <span className={styles.logoTagline}>Psicología Clínica</span>
                            </div>
                        </Link>
                        <p className={styles.brandDescription}>
                            Acompañándote en tu camino hacia el bienestar mental y emocional.
                            Terapia profesional con un enfoque humano y cercano.
                        </p>

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
                            <p>Atención Online</p>
                            <p>+56 9 1234 5678</p>
                            <p>contacto@rocio-psicologa.cl</p>
                            <p>Lun - Vie: 9:00 - 20:00</p>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p className={styles.copyright}>
                        © {currentYear} Rocío Manosalva. Todos los derechos reservados.
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
