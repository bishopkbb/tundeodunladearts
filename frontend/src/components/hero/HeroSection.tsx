'use client';

import { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import HeroStatic from './HeroStatic';
import HeroCTA from './HeroCTA';

const Hero3DCarousel = dynamic(() => import('./Hero3DCarousel'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-[#8B4513] to-[#6B3410]">
      <div className="w-16 h-16 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[500px] sm:min-h-[600px] md:min-h-screen overflow-hidden"
    >
      {prefersReducedMotion ? (
        <HeroStatic />
      ) : (
        <>
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-[#8B4513] to-[#6B3410]">
                <div className="w-16 h-16 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
              </div>
            }
          >
            <Hero3DCarousel />
          </Suspense>

          <HeroCTA />
        </>
      )}
    </section>
  );
}