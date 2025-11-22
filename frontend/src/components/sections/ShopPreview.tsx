'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Featured artworks for landing page preview
const featuredArtworks = [
  {
    id: '1',
    title: 'Cultural Heritage',
    artist: 'Prince Tunde Odunlade',
    price: 450000,
    image: '/Assets/featured1.jpg',
  },
  {
    id: '2',
    title: 'Rhythms of Ibadan',
    artist: 'Prince Tunde Odunlade',
    price: 15000000,
    image: '/Assets/hero2.jpg',
  },
  {
    id: '3',
    title: 'Adire Dreams',
    artist: 'Prince Tunde Odunlade',
    price: 10500000,
    image: '/Assets/hero3.jpg',
  },
];

export default function ShopPreview() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="py-20 md:py-32 px-4 md:px-8 bg-[#F5EFE7]/95 backdrop-blur-sm">
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
            Own a Piece of Heritage
          </h2>
          <p className="text-base md:text-lg text-[#6B4423] max-w-2xl mx-auto leading-relaxed">
            Discover original artworks that celebrate African culture and contemporary expression.
          </p>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Featured Artworks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredArtworks.map((artwork, index) => (
            <motion.div
              key={artwork.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-xl shadow-lg overflow-hidden border-2 border-[#D4A574]/30 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={artwork.image}
                  alt={artwork.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  unoptimized
                />
              </div>

              {/* Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#3D2817] mb-2 group-hover:text-[#C17C2E] transition-colors">
                  {artwork.title}
                </h3>
                <p className="text-sm text-[#6B4423] mb-4">{artwork.artist}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#C17C2E]">
                    {formatPrice(artwork.price)}
                  </span>
                  <span className="text-sm text-[#8B4513] px-3 py-1 bg-[#F5EFE7] rounded-full">
                    Available
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA to Shop Page */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#C17C2E] hover:bg-[#8B4513] text-white font-bold text-lg rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            Browse Full Collection
            <svg 
              className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          <p className="text-sm text-[#6B4423] mt-4">
            Explore over 50+ original artworks in our collection
          </p>
        </motion.div>
      </div>
    </section>
  );
}