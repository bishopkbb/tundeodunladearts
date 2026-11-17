'use client';

import { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import HeroStatic from './HeroStatic';

const HeroPlaceholder = () => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-[#8B4513] to-[#6B3410]">
    <div className="w-16 h-16 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
  </div>
);

const Hero3DCarousel = dynamic(() => import('./Hero3DCarousel'), {
  ssr: false,
  loading: () => <HeroPlaceholder />,
});

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  // The heavy 3D bundle is only requested once the browser is idle, so the page
  // (navbar, menu, scrolling) is interactive before three.js starts loading.
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setIsReady(true), { timeout: 1200 });
      return () => w.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(() => setIsReady(true), 300);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[400px] xs:min-h-[450px] sm:min-h-[550px] md:min-h-[600px] lg:min-h-screen"
      style={{ touchAction: 'pan-y', overflow: 'visible' }}
    >
      {!isReady ? (
        <HeroPlaceholder />
      ) : prefersReducedMotion ? (
        <HeroStatic />
      ) : (
        <>
          <Suspense fallback={<HeroPlaceholder />}>
            <Hero3DCarousel />
          </Suspense>
        </>
      )}
    </section>
  );
}