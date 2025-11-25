'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

function HeroCTA() {
  return (
    <motion.div
      className="absolute top-14 xs:top-18 sm:top-24 md:top-28 left-1/2 transform -translate-x-1/2 z-40 flex flex-col sm:flex-row gap-2.5 xs:gap-3 sm:gap-4 px-3 xs:px-4 sm:px-0 w-full max-w-[95vw] sm:max-w-none"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2, ease: 'easeOut' }}
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Primary Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full sm:w-auto"
      >
        <Link
          href="/shop"
          className="block w-full sm:w-auto text-center px-5 xs:px-7 sm:px-10 py-3.5 xs:py-4 sm:py-4 bg-[#C17C2E] hover:bg-[#8B4513] active:bg-[#6B3410] text-white font-bold text-base xs:text-base sm:text-lg rounded-lg transition-colors duration-150 shadow-xl hover:shadow-2xl touch-manipulation min-h-[50px] xs:min-h-[48px] sm:min-h-[44px] flex items-center justify-center whitespace-nowrap"
        >
          Explore the Collection
        </Link>
      </motion.div>

      {/* Secondary Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full sm:w-auto"
      >
        <Link
          href="/contact"
          className="block w-full sm:w-auto text-center px-5 xs:px-7 sm:px-10 py-3.5 xs:py-4 sm:py-4 bg-[#3D2817] hover:bg-[#2C1810] active:bg-[#1A0F08] text-white font-bold text-base xs:text-base sm:text-lg rounded-lg transition-colors duration-150 shadow-xl hover:shadow-2xl touch-manipulation min-h-[50px] xs:min-h-[48px] sm:min-h-[44px] flex items-center justify-center whitespace-nowrap"
        >
          Visit the gallery
        </Link>
      </motion.div>
    </motion.div>
  );
}

// Memoize to prevent unnecessary re-renders
export default memo(HeroCTA);