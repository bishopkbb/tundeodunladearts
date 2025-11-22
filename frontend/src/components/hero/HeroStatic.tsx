'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroStatic() {
  return (
    <div className="relative w-full h-screen overflow-hidden pt-20">
      {/* Batik Pattern Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%238B4513' fill-opacity='0.3' fill-rule='evenodd'%3E%3Cpath d='M9 0h2v20H9V0zm25.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm-20 20l1.732 1-10 17.32-1.732-1 10-17.32zM58.16 4.134l1 1.732-17.32 10-1-1.732 17.32-10zm-40 40l1 1.732-17.32 10-1-1.732 17.32-10zM80 9v2H60V9h20zM20 69v2H0v-2h20zm79.32-55l-1 1.732-17.32-10 1-1.732 17.32 10zm-80 80l-1 1.732-17.32-10 1-1.732 17.32 10zm96.546-75.84l-1.732 1-10-17.32 1.732-1 10 17.32zm-100 100l-1.732 1-10-17.32 1.732-1 10 17.32zM38.16 24.134l1 1.732-17.32 10-1-1.732 17.32-10zM60 29v2H40v-2h20zm19.32 5l-1 1.732-17.32-10 1-1.732 17.32 10zM40 49v2H20v-2h20zm39.32 5l-1 1.732-17.32-10 1-1.732 17.32 10zm-40 40l-1 1.732-17.32-10 1-1.732 17.32 10zM94.134 4.84l1.732 1-10 17.32-1.732-1 10-17.32zm-40 40l1.732 1-10 17.32-1.732-1 10-17.32zm-20 20l1.732 1-10 17.32-1.732-1 10-17.32zM20 89v2H0v-2h20zm79.32 15l-1 1.732-17.32-10 1-1.732 17.32 10zm-80-80l-1 1.732-17.32-10 1-1.732 17.32 10zm96.546 55.84l-1.732 1-10-17.32 1.732-1 10 17.32zM49 69v2H29v-2h20zm40-40v2H69v-2h20zM9 20h2v20H9V20zm25.134 40.84l1.732 1-10 17.32-1.732-1 10-17.32zm-20-20l1.732 1-10 17.32-1.732-1 10-17.32zM89 0h2v20h-2V0zm25.134 40.84l1.732 1-10 17.32-1.732-1 10-17.32zm-100 0l1.732 1-10 17.32-1.732-1 10-17.32zM69 49v2H49v-2h20zm40 40v2H89v-2h20zM49 89v2H29v-2h20zm-20-20v2H9v-2h20zm80-20v2H89v-2h20z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px',
          backgroundPosition: 'center',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative h-full flex flex-col items-center justify-center px-4 md:px-8 py-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-12 z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            href="/exhibitions"
            className="inline-block px-8 py-3 bg-[#C17C2E] hover:bg-[#8B4513] text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Explore the Collection
          </Link>
          <Link
            href="/gallery"
            className="inline-block px-8 py-3 bg-[#3D2817] hover:bg-[#2C1810] text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Visit the gallery
          </Link>
        </motion.div>

        {/* Static Hero Image */}
        <motion.div
          className="relative w-full max-w-4xl h-96 md:h-[500px] rounded-xl overflow-hidden shadow-2xl border-8 border-[#D4AF37]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Image
            src="/Assets/hero1.jpg"
            alt="Tunde Odunlade Art Collection Display"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}