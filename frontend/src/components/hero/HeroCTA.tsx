'use client';

import { memo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function HeroCTA() {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = 'Welcome to Tunde Odunlade Arts and Culture Connexions';
  const writingSpeed = 100; // milliseconds per character

  useEffect(() => {
    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;
    let cursorInterval: NodeJS.Timeout;

    const typeText = () => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
        timeoutId = setTimeout(typeText, writingSpeed);
      } else {
        // Blinking cursor effect after typing is complete
        cursorInterval = setInterval(() => {
          setShowCursor((prev) => !prev);
        }, 530);
        
        // Stop blinking after a few seconds and keep cursor visible
        setTimeout(() => {
          if (cursorInterval) clearInterval(cursorInterval);
          setShowCursor(true);
        }, 3000);
      }
    };

    // Start typing animation after a short delay
    timeoutId = setTimeout(typeText, 800);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (cursorInterval) clearInterval(cursorInterval);
    };
  }, [fullText.length, writingSpeed]);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none w-full max-w-4xl px-4 xs:px-6 sm:px-8 md:px-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Semi-transparent background for better readability */}
      <div className="relative text-center">
        <div 
          className="absolute inset-0 -mx-8 -my-4 bg-[#F5EFE7]/20 backdrop-blur-sm rounded-2xl"
          style={{ 
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
          }}
        />
        
        {/* Handwritten Text with Pen Animation */}
        <div className="relative">
          <h1 
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.2]"
            style={{
              fontFamily: 'var(--font-dancing), "Dancing Script", "Brush Script MT", cursive',
              color: '#3D2817',
              textShadow: '2px 2px 6px rgba(245, 239, 231, 0.9), 0 0 15px rgba(245, 239, 231, 0.7), 0 0 25px rgba(212, 175, 55, 0.4), 0 0 35px rgba(193, 124, 46, 0.3)',
              letterSpacing: '0.03em',
              fontWeight: 700,
            }}
          >
            {displayedText}
            {showCursor && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="inline-block ml-1"
                style={{
                  width: '0.08em',
                  height: '1em',
                  backgroundColor: '#C17C2E',
                  verticalAlign: 'baseline',
                }}
                aria-hidden="true"
              >
                |
              </motion.span>
            )}
          </h1>
        </div>

        {/* Decorative Pen/Ink Splash Effect */}
        <motion.div
          className="absolute -top-4 -right-4 xs:-top-6 xs:-right-6 sm:-top-8 sm:-right-8 opacity-30"
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: -45 }}
          transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
        >
          <svg 
            width="60" 
            height="60" 
            viewBox="0 0 60 60" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20"
            style={{ color: '#8B4513' }}
          >
            {/* Ink splash */}
            <path 
              d="M30 10 C35 15, 40 20, 45 25 C50 30, 48 35, 42 40 C38 44, 32 46, 28 42 C24 38, 22 32, 25 28 C28 24, 32 20, 30 15 Z" 
              fill="currentColor" 
              opacity="0.6"
            />
            {/* Pen nib */}
            <path 
              d="M25 20 L30 15 L35 20 L32 22 Z" 
              fill="currentColor"
            />
            {/* Pen body */}
            <rect 
              x="28" 
              y="15" 
              width="4" 
              height="25" 
              rx="2" 
              fill="currentColor" 
              opacity="0.8"
            />
          </svg>
        </motion.div>

        {/* Subtle underline animation */}
        <motion.div
          className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-[#C17C2E] to-transparent opacity-60"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.2, delay: 2.5, ease: 'easeInOut' }}
          style={{ maxWidth: '80%' }}
        />
      </div>
    </motion.div>
  );
}

// Memoize to prevent unnecessary re-renders
export default memo(HeroCTA);