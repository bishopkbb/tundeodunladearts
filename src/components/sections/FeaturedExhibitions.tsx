'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const exhibitions = [
  {
    id: 1,
    title: 'Metamorphosis',
    category: 'Oil and Acrylic',
    image: '/Assets/featured2.jpg',
  },
  {
    id: 2,
    title: 'Artforms & Heritage',
    category: 'Contemporary',
    image: '/Assets/hero2.jpg',
  },
  {
    id: 3,
    title: 'Cultural Resonance',
    category: 'Painting',
    image: '/Assets/featured1.jpg',
  },
  {
    id: 4,
    title: 'Floatography',
    category: 'Contemporary',
    image: '/Assets/hero3.jpg',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export default function FeaturedExhibitions() {
  return (
    <section
      id="exhibitions"
      className="py-20 md:py-32 px-4 md:px-8 bg-white/85 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#3D2817] mb-6">
            Featured Exhibitions
          </h2>
          <p className="text-base md:text-lg text-[#6B4423] max-w-2xl mx-auto leading-relaxed">
            Explore our curated collection of contemporary African art and cultural expressions.
          </p>
        </motion.div>

        {/* Exhibition Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {exhibitions.map((exhibit) => (
            <motion.div
              key={exhibit.id}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group"
            >
              <Link href={`#exhibition-${exhibit.id}`}>
                <div className="relative h-72 md:h-80 overflow-hidden rounded-xl mb-4 shadow-lg group-hover:shadow-2xl transition-all duration-300 border-4 border-[#D4AF37]">
                  <Image
                    src={exhibit.image}
                    alt={exhibit.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <span className="text-white text-sm font-semibold px-6 py-2 bg-[#C17C2E] rounded-full">
                      View Exhibition
                    </span>
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-[#3D2817] mb-2 group-hover:text-[#C17C2E] transition-colors">
                  {exhibit.title}
                </h3>
                <p className="text-sm text-[#6B4423]">{exhibit.category}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-16 md:mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <Link
            href="/exhibitions"
            className="inline-block px-10 py-4 bg-[#C17C2E] hover:bg-[#8B4513] text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
          >
            View All Artworks
          </Link>
        </motion.div>
      </div>
    </section>
  );
}