'use client';

import { useState, useEffect } from 'react';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import { BouncingBalls } from '@/components/ui/bouncing-balls';
import IntroSplash from '@/components/ui/IntroSplash';

export default function Home() {
  // Check if intro was already shown in this session
  const [showIntro, setShowIntro] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    if (!hasSeenIntro) {
      setShowIntro(true);
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem('hasSeenIntro', 'true');
    setShowIntro(false);
  };

  // Prevent scrolling while intro is visible
  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showIntro]);

  return (
    <>
      {showIntro && <IntroSplash onComplete={handleIntroComplete} />}

      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        <BouncingBalls
          colors={['#0d9488', '#2dd4bf', '#ffe4e6', '#e2e8f0']} // Added mild gray for variety
          numBalls={80} // Doubled number of balls
          minRadius={1} // Smaller balls
          maxRadius={4} // Smaller max size
          speed={0.4}
          interactive={true}
          interactionRadius={60}
        />
      </div>
      <div className="relative z-10">
        <Hero />
        <About />
        <Services />
      </div>
    </>
  );
}
