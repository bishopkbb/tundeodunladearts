'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import CartSidebar from '@/components/cart/CartSidebar';
import ArtCollections from '@/components/sections/ArtCollections';
import BatikBackground from '@/components/ui/BatikBackground';

export default function GalleryPage() {
  return (
    <>
      {/* Background Pattern */}
      <BatikBackground motif="cowrie" />

      <main className="relative z-10 min-h-screen pt-20">
        <Navbar />

        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-[#3D2817] mb-6 font-serif">
                Art Gallery
              </h1>
              <div className="w-32 h-1 bg-[#D4AF37] mx-auto mb-8 rounded-full" />
              <p className="text-lg md:text-xl text-[#6B4423] max-w-3xl mx-auto leading-relaxed">
                Explore our curated collection of unique artworks available for inquiry
              </p>
            </motion.div>
          </div>
        </section>

        {/* Art Collections Section */}
        <ArtCollections />

        <Footer />
        <CartSidebar />
      </main>
    </>
  );
}
