'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

// Sample artworks - will be replaced with CMS data later
const artworks = [
  {
    id: '1',
    title: 'Cultural Heritage',
    artist: 'Prince Tunde Odunlade',
    price: 450000,
    image: '/Assets/hero1.jpg',
    medium: 'Oil on Canvas',
    dimensions: '36" x 48"',
    category: 'Contemporary',
    available: true,
  },
  {
    id: '2',
    title: 'Rhythms of Ibadan',
    artist: 'Prince Tunde Odunlade',
    price: 380000,
    image: '/Assets/hero2.jpg',
    medium: 'Acrylic on Canvas',
    dimensions: '30" x 40"',
    category: 'Abstract',
    available: true,
  },
  {
    id: '3',
    title: 'Adire Dreams',
    artist: 'Prince Tunde Odunlade',
    price: 520000,
    image: '/Assets/hero3.jpg',
    medium: 'Mixed Media',
    dimensions: '48" x 60"',
    category: 'Textile Art',
    available: true,
  },
  {
    id: '4',
    title: 'Ancestral Wisdom',
    artist: 'Prince Tunde Odunlade',
    price: 410000,
    image: '/Assets/featured1.jpg',
    medium: 'Oil on Canvas',
    dimensions: '36" x 48"',
    category: 'Contemporary',
    available: true,
  },
  {
    id: '5',
    title: 'Dance of Colors',
    artist: 'Prince Tunde Odunlade',
    price: 360000,
    image: '/Assets/featured2.jpg',
    medium: 'Acrylic',
    dimensions: '24" x 36"',
    category: 'Abstract',
    available: true,
  },
  {
    id: '6',
    title: 'Market Day',
    artist: 'Prince Tunde Odunlade',
    price: 480000,
    image: '/Assets/hero5.jpg',
    medium: 'Oil on Canvas',
    dimensions: '40" x 50"',
    category: 'Contemporary',
    available: false,
  },
];

const categories = ['All', 'Contemporary', 'Abstract', 'Textile Art'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export default function ShopSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToCart } = useCart();

  const filteredArtworks = selectedCategory === 'All'
    ? artworks
    : artworks.filter((art) => art.category === selectedCategory);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = (artwork: typeof artworks[0]) => {
    if (!artwork.available) return;
    
    addToCart({
      id: artwork.id,
      title: artwork.title,
      artist: artwork.artist,
      price: artwork.price,
      image: artwork.image,
      medium: artwork.medium,
      dimensions: artwork.dimensions,
    });
  };

  return (
    <section
      id="shop"
      className="py-20 md:py-32 px-4 md:px-8 bg-white/90 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#3D2817] mb-4 font-serif">
            Shop Original Artworks
          </h2>
          <p className="text-base md:text-lg text-[#6B4423] max-w-2xl mx-auto leading-relaxed">
            Own a piece of African heritage. Each artwork is an original creation by Prince Tunde Odunlade.
          </p>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-[#C17C2E] text-white shadow-lg'
                  : 'bg-white text-[#6B4423] border-2 border-[#D4A574] hover:border-[#C17C2E] hover:text-[#C17C2E]'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Artworks Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {filteredArtworks.map((artwork) => (
            <motion.div
              key={artwork.id}
              variants={itemVariants}
              className="group relative bg-white rounded-xl shadow-lg overflow-hidden border-2 border-[#D4A574]/30 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={artwork.image}
                  alt={artwork.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  unoptimized
                />
                {!artwork.available && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="px-6 py-2 bg-red-600 text-white font-bold rounded-full">
                      SOLD
                    </span>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#3D2817] mb-2 group-hover:text-[#C17C2E] transition-colors">
                  {artwork.title}
                </h3>
                <p className="text-sm text-[#6B4423] mb-3">{artwork.artist}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs text-[#8B4513]">
                    <p>{artwork.medium}</p>
                    <p>{artwork.dimensions}</p>
                  </div>
                  <span className="px-3 py-1 bg-[#F5EFE7] text-[#8B4513] text-xs font-semibold rounded-full">
                    {artwork.category}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#D4A574]/30">
                  <span className="text-2xl font-bold text-[#C17C2E]">
                    {formatPrice(artwork.price)}
                  </span>
                  <motion.button
                    onClick={() => handleAddToCart(artwork)}
                    disabled={!artwork.available}
                    whileHover={artwork.available ? { scale: 1.05, y: -2 } : {}}
                    whileTap={artwork.available ? { scale: 0.98 } : {}}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                      artwork.available
                        ? 'bg-[#C17C2E] hover:bg-[#8B4513] text-white shadow-md hover:shadow-lg'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {artwork.available ? (
                      <span className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        Add to Cart
                      </span>
                    ) : (
                      'Sold Out'
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Request Custom Artwork */}
        <motion.div
          className="mt-16 p-8 bg-[#F5EFE7] rounded-xl border-2 border-[#D4AF37] text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-[#8B4513] mb-3 font-serif">
            Looking for Something Unique?
          </h3>
          <p className="text-[#6B4423] mb-6 max-w-2xl mx-auto">
            Commission a custom artwork tailored to your vision. Prince Tunde Odunlade creates personalized pieces that tell your story.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-[#C17C2E] hover:bg-[#8B4513] text-white font-bold text-lg rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Request Custom Artwork
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}