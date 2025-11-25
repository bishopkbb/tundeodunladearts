'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroCTA() {
  return (
    <motion.div
      className="absolute top-20 xs:top-24 sm:top-28 left-1/2 transform -translate-x-1/2 z-40 flex flex-col sm:flex-row gap-3 xs:gap-4 px-4 w-full max-w-[90vw] sm:max-w-none"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
    >
      {/* Primary Button */}
      <motion.div
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <Link
          href="/gallery"
          className="inline-block w-full sm:w-auto text-center px-6 xs:px-8 sm:px-10 py-3 xs:py-3.5 sm:py-4 bg-[#C17C2E] hover:bg-[#8B4513] text-white font-bold text-sm xs:text-base sm:text-lg rounded-lg transition-all duration-300 shadow-2xl hover:shadow-xl"
        >
          Explore the Collection
        </Link>
      </motion.div>

      {/* Secondary Button */}
      <motion.div
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <Link
          href="/contact"
          className="inline-block w-full sm:w-auto text-center px-6 xs:px-8 sm:px-10 py-3 xs:py-3.5 sm:py-4 bg-[#3D2817] hover:bg-[#2C1810] text-white font-bold text-sm xs:text-base sm:text-lg rounded-lg transition-all duration-300 shadow-2xl hover:shadow-xl"
        >
          Visit the gallery
        </Link>
      </motion.div>
    </motion.div>
  );
}