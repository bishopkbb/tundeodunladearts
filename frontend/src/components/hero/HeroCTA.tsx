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
      className="absolute left-1/2 top-16 xs:top-20 sm:top-24 transform -translate-x-1/2 z-30 pointer-events-none w-full max-w-4xl px-4 xs:px-6 sm:px-8 md:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Handwritten Text with Pen Animation - Mobile Only */}
      <div className="relative text-center">
        <h1 
          className="text-lg xs:text-xl sm:text-2xl font-bold leading-[1.2]"
          style={{
            fontFamily: 'var(--font-dancing), "Dancing Script", "Brush Script MT", cursive',
            color: '#3D2817',
            textShadow: '1px 1px 3px rgba(245, 239, 231, 0.9), 0 0 10px rgba(245, 239, 231, 0.7), 0 0 15px rgba(212, 175, 55, 0.4)',
            letterSpacing: '0.02em',
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

        {/* Decorative Pen/Ink Splash Effect - Smaller for mobile */}
        <motion.div
          className="absolute -top-2 -right-2 xs:-top-3 xs:-right-3 sm:-top-4 sm:-right-4 opacity-30"
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: -45 }}
          transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
        >
          <svg 
            width="40" 
            height="40" 
            viewBox="0 0 40 40" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12"
            style={{ color: '#8B4513' }}
          >
            {/* Ink splash */}
            <path 
              d="M20 7 C23 10, 27 13, 30 17 C33 20, 32 23, 28 27 C25 29, 21 31, 19 28 C16 25, 15 21, 17 19 C19 16, 21 13, 20 10 Z" 
              fill="currentColor" 
              opacity="0.6"
            />
            {/* Pen nib */}
            <path 
              d="M17 13 L20 10 L23 13 L21 15 Z" 
              fill="currentColor"
            />
            {/* Pen body */}
            <rect 
              x="19" 
              y="10" 
              width="2" 
              height="17" 
              rx="1" 
              fill="currentColor" 
              opacity="0.8"
            />
          </svg>
        </motion.div>

        {/* Subtle underline animation */}
        <motion.div
          className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-[#C17C2E] to-transparent opacity-60"
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