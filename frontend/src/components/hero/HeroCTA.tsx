'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

function HeroCTA() {
  return (
    <motion.div
      className="absolute left-[35%] sm:left-[45%] md:left-1/2 top-20 xs:top-24 sm:top-28 transform -translate-x-1/2 z-40 flex flex-col sm:flex-row gap-2 xs:gap-2 sm:gap-4 px-3 xs:px-4 sm:px-0 w-auto sm:max-w-none"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: 0.1, ease: 'easeOut' }}
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Primary Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-auto"
      >
        <Link
          href="/gallery"
          className="block text-center px-3 xs:px-3.5 sm:px-8 py-2 xs:py-2 sm:py-3 bg-[#C17C2E] hover:bg-[#8B4513] active:bg-[#6B3410] text-white font-semibold text-xs xs:text-xs sm:text-base rounded-md transition-colors duration-150 shadow-md hover:shadow-lg touch-manipulation min-h-[38px] xs:min-h-[40px] sm:min-h-[44px] flex items-center justify-center whitespace-nowrap"
        >
          Explore the Collection
        </Link>
      </motion.div>

      {/* Secondary Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-auto"
      >
        <Link
          href="/contact"
          className="block text-center px-3 xs:px-3.5 sm:px-8 py-2 xs:py-2 sm:py-3 bg-[#3D2817] hover:bg-[#2C1810] active:bg-[#1A0F08] text-white font-semibold text-xs xs:text-xs sm:text-base rounded-md transition-colors duration-150 shadow-md hover:shadow-lg touch-manipulation min-h-[38px] xs:min-h-[40px] sm:min-h-[44px] flex items-center justify-center whitespace-nowrap"
        >
          Visit the gallery
        </Link>
      </motion.div>
    </motion.div>
  );
}

// Memoize to prevent unnecessary re-renders
export default memo(HeroCTA);