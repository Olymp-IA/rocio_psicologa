'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BouncingBalls } from './bouncing-balls';

interface IntroSplashProps {
    onComplete: () => void;
}

export default function IntroSplash({ onComplete }: IntroSplashProps) {
    const [isExiting, setIsExiting] = useState(false);

    const handleClick = () => {
        setIsExiting(true);
        // Wait for animation to finish before unmounting
        setTimeout(onComplete, 800);
    };

    return (
        <AnimatePresence>
            {!isExiting && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-secondary cursor-pointer overflow-hidden"
                    onClick={handleClick}
                >
                    {/* Subtle Background for Intro too */}
                    <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                        <BouncingBalls
                            colors={['#0d9488', '#2dd4bf', '#ffe4e6']}
                            numBalls={30} // Fewer balls for intro
                            minRadius={2}
                            maxRadius={6}
                            speed={0.2} // Slower speed
                            interactive={false}
                        />
                    </div>

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-md px-4"
                    >
                        {/* Logo Container with Pulse Effect */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-full shadow-2xl flex items-center justify-center p-6 mb-4 relative"
                        >
                            <div className="absolute inset-0 rounded-full bg-accent/10 animate-pulse" />
                            <img
                                src="/assets/logo.png"
                                alt="Rocío Manosalva Logo"
                                className="w-full h-full object-contain"
                            />
                        </motion.div>

                        <div className="space-y-2">
                            <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary">
                                Rocío Manosalva
                            </h1>
                            <p className="text-accent text-lg font-medium tracking-wide uppercase">
                                Psicóloga Clínica
                            </p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5, duration: 1 }}
                            className="pt-8"
                        >
                            <span className="text-text-light text-sm tracking-widest uppercase border-b border-accent/30 pb-1">
                                Ingresar al Espacio
                            </span>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
