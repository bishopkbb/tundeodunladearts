'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

function HeroCTA() {
  return (
    <motion.div
      className="absolute top-20 xs:top-24 sm:top-28 left-1/2 transform -translate-x-1/2 z-40 flex flex-col sm:flex-row gap-3 xs:gap-4 px-4 w-full max-w-[90vw] sm:max-w-none"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Primary Button */}
      <motion.div
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="w-full sm:w-auto"
      >
        <Link
          href="/shop"
          className="inline-block w-full sm:w-auto text-center px-6 xs:px-8 sm:px-10 py-3.5 xs:py-4 sm:py-4 bg-[#C17C2E] hover:bg-[#8B4513] active:bg-[#6B3410] text-white font-bold text-base xs:text-base sm:text-lg rounded-lg transition-colors duration-200 shadow-2xl hover:shadow-xl touch-manipulation min-h-[44px] flex items-center justify-center"
        >
          Explore the Collection
        </Link>
      </motion.div>

      {/* Secondary Button */}
      <motion.div
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="w-full sm:w-auto"
      >
        <Link
          href="/contact"
          className="inline-block w-full sm:w-auto text-center px-6 xs:px-8 sm:px-10 py-3.5 xs:py-4 sm:py-4 bg-[#3D2817] hover:bg-[#2C1810] active:bg-[#1A0F08] text-white font-bold text-base xs:text-base sm:text-lg rounded-lg transition-colors duration-200 shadow-2xl hover:shadow-xl touch-manipulation min-h-[44px] flex items-center justify-center"
        >
          Visit the gallery
        </Link>
      </motion.div>
    </motion.div>
  );
}

// Memoize to prevent unnecessary re-renders
export default memo(HeroCTA);