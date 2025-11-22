// src/app/not-found.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#8B4513] via-[#6B3410] to-[#4A2810] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='0.3'%3E%3Ccircle cx='40' cy='40' r='20'/%3E%3Ccircle cx='0' cy='0' r='20'/%3E%3Ccircle cx='80' cy='0' r='20'/%3E%3Ccircle cx='0' cy='80' r='20'/%3E%3Ccircle cx='80' cy='80' r='20'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="max-w-2xl w-full text-center relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="mb-8 flex justify-center"
        >
          <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-[#D4AF37]">
            <Image
              src="/Assets/logo.png"
              alt="TOACC Logo"
              fill
              sizes="(max-width: 640px) 200px, 300px"
              quality={90}
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* 404 Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="text-8xl md:text-9xl font-bold text-[#D4AF37] mb-4 font-serif">
            404
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            Artwork Not Found
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-md mx-auto">
            This page seems to have wandered off the gallery walls. Let's get you back to the exhibition.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/"
              className="inline-block px-8 py-4 bg-[#D4AF37] hover:bg-[#C17C2E] text-[#3D2817] font-bold text-lg rounded-lg transition-all duration-300 shadow-lg"
            >
              Return to Gallery
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="#contact"
              className="inline-block px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold text-lg rounded-lg transition-all duration-300 border-2 border-white/30"
            >
              Contact Us
            </Link>
          </motion.div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12 flex justify-center gap-2"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-3 h-3 rounded-full bg-[#D4AF37]"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}