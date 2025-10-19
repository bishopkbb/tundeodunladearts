'use client';

import { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import HeroStatic from './HeroStatic';
import HeroCTA from './HeroCTA';

const Hero3DCarousel = dynamic(() => import('./Hero3DCarousel'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-[#C17C2E] border-t-transparent rounded-full animate-spin" />
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
      className="relative w-full h-screen overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #8B4513 0%, #6B3410 50%, #4A2810 100%)',
      }}
    >
      {/* Layer 1: Main Batik Pattern (Darker) */}
      <div
        className="absolute inset-0 opacity-45"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4A574' fill-opacity='0.6' fill-rule='evenodd'%3E%3Cpath d='M9 0h2v20H9V0zm25.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm-20 20l1.732 1-10 17.32-1.732-1 10-17.32zM58.16 4.134l1 1.732-17.32 10-1-1.732 17.32-10zm-40 40l1 1.732-17.32 10-1-1.732 17.32-10zM80 9v2H60V9h20zM20 69v2H0v-2h20zm79.32-55l-1 1.732-17.32-10 1-1.732 17.32 10zm-80 80l-1 1.732-17.32-10 1-1.732 17.32 10zm96.546-75.84l-1.732 1-10-17.32 1.732-1 10 17.32zm-100 100l-1.732 1-10-17.32 1.732-1 10 17.32zM38.16 24.134l1 1.732-17.32 10-1-1.732 17.32-10zM60 29v2H40v-2h20zm19.32 5l-1 1.732-17.32-10 1-1.732 17.32 10zM40 49v2H20v-2h20zm39.32 5l-1 1.732-17.32-10 1-1.732 17.32 10zm-40 40l-1 1.732-17.32-10 1-1.732 17.32 10zM94.134 4.84l1.732 1-10 17.32-1.732-1 10-17.32zm-40 40l1.732 1-10 17.32-1.732-1 10-17.32zm-20 20l1.732 1-10 17.32-1.732-1 10-17.32zM20 89v2H0v-2h20zm79.32 15l-1 1.732-17.32-10 1-1.732 17.32 10zm-80-80l-1 1.732-17.32-10 1-1.732 17.32 10zm96.546 55.84l-1.732 1-10-17.32 1.732-1 10 17.32zM49 69v2H29v-2h20zm40-40v2H69v-2h20zM9 20h2v20H9V20zm25.134 40.84l1.732 1-10 17.32-1.732-1 10-17.32zm-20-20l1.732 1-10 17.32-1.732-1 10-17.32zM89 0h2v20h-2V0zm25.134 40.84l1.732 1-10 17.32-1.732-1 10-17.32zm-100 0l1.732 1-10 17.32-1.732-1 10-17.32zM69 49v2H49v-2h20zm40 40v2H89v-2h20zM49 89v2H29v-2h20zm-20-20v2H9v-2h20zm80-20v2H89v-2h20z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px',
          backgroundPosition: 'center',
        }}
      />

      {/* Layer 2: Ankara Circles Pattern (Lighter Brown) */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C9A97A' fill-opacity='0.5'%3E%3Ccircle cx='40' cy='40' r='20'/%3E%3Ccircle cx='0' cy='0' r='20'/%3E%3Ccircle cx='80' cy='0' r='20'/%3E%3Ccircle cx='0' cy='80' r='20'/%3E%3Ccircle cx='80' cy='80' r='20'/%3E%3Cpath d='M20 40 Q 30 30 40 40 T 60 40' stroke='%23E8B882' stroke-width='2' fill='none'/%3E%3Cpath d='M40 20 Q 30 30 40 40 T 40 60' stroke='%23E8B882' stroke-width='2' fill='none'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px',
          backgroundPosition: '40px 40px',
        }}
      />

      {/* Layer 3: Tribal Zigzag Pattern (Light Tan) */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23F5CBA7' stroke-width='2' stroke-opacity='0.4'%3E%3Cpath d='M0 30 L10 20 L20 30 L30 20 L40 30 L50 20 L60 30'/%3E%3Cpath d='M0 50 L10 40 L20 50 L30 40 L40 50 L50 40 L60 50'/%3E%3Cpath d='M0 10 L10 0 L20 10 L30 0 L40 10 L50 0 L60 10'/%3E%3Cpath d='M30 0 L20 10 L30 20 L20 30 L30 40 L20 50 L30 60' transform='rotate(0)'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0',
        }}
      />

      {/* Layer 4: Dots & Swirls (Gold Accents) */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='0.6'%3E%3Ccircle cx='10' cy='10' r='3'/%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='50' cy='10' r='4'/%3E%3Ccircle cx='70' cy='30' r='3'/%3E%3Ccircle cx='90' cy='10' r='2'/%3E%3Ccircle cx='10' cy='50' r='3'/%3E%3Ccircle cx='30' cy='70' r='4'/%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3Ccircle cx='70' cy='70' r='3'/%3E%3Ccircle cx='90' cy='50' r='4'/%3E%3Ccircle cx='10' cy='90' r='2'/%3E%3Ccircle cx='50' cy='90' r='3'/%3E%3Ccircle cx='90' cy='90' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px',
          backgroundPosition: '50px 50px',
        }}
      />

      {prefersReducedMotion ? (
        <HeroStatic />
      ) : (
        <>
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-[#C17C2E] border-t-transparent rounded-full animate-spin" />
              </div>
            }
          >
            <Hero3DCarousel />
          </Suspense>

          <HeroCTA />

          {/* Bottom Gradient Overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#4A2810] via-[#6B3410]/50 to-transparent pointer-events-none z-20" />
        </>
      )}
    </section>
  );
}