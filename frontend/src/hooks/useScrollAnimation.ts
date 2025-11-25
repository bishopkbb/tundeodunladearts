'use client';

import { useAnimation, useInView } from 'framer-motion';
import { useEffect, RefObject } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  once?: boolean;
}

/**
 * Enhanced useScrollAnimation hook with smoother animations
 * Provides consistent scroll-triggered animations across all sections
 */
export function useScrollAnimation(ref: RefObject<Element>, options?: ScrollAnimationOptions) {
  const controls = useAnimation();
  const isInView = useInView(ref, {
    amount: options?.threshold ?? 0.15, // 15% of the element must be visible for smoother trigger
    once: options?.once ?? false, // Default to false to re-trigger on scroll
  });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else if (!options?.once) {
      // Only reset if not `once` to allow re-animation on scroll
      controls.start('hidden');
    }
  }, [isInView, controls, options?.once]);

  return controls;
}

/**
 * Standard animation variants for consistent animations
 */
export const scrollVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.4, 0, 0.2, 1], // Custom cubic-bezier for smooth animation
      staggerChildren: 0.1,
    },
  },
};

export const scrollItemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export const slideUpVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

