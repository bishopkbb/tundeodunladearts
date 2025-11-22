'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface Exhibition {
  id: number;
  title: string;
  subtitle?: string;
  artist: string;
  category: string;
  type: 'exhibition' | 'festival' | 'awards' | 'event';
  startDate: string;
  endDate?: string;
  openingTime?: string;
  venue: string;
  address: string;
  description: string;
  image: string;
}

const exhibitions: Exhibition[] = [
  {
    id: 1,
    title: 'Chain of Souls',
    subtitle: '(ASOPO OKAN)',
    artist: 'Taofeek Olalekan',
    category: 'Mixed Media, Fiber/Textile Art, Beadworks & Oil on Canvas',
    type: 'exhibition',
    startDate: '2025-12-16',
    endDate: '2026-01-10',
    openingTime: '04:00 PM',
    venue: 'Femi Osofisan Amphitheater',
    address: 'No 2, Ladoke Akintola, Off Aare Avenue, New Bodija',
    description: 'An art exhibition of mixed media, fiber/textile art, beadworks, & oil on canvas. A new talent born to celebrate Arewa Odunlade\'s birthday.',
    image: '/Assets/chain of souls.png',
  },
  {
    id: 2,
    title: '6TH ORÍKÌ YORÙBÁ FESTIVAL',
    artist: 'Prince Tunde Odunlade',
    category: 'Cultural Festival',
    type: 'festival',
    startDate: '2025-12-13',
    openingTime: '9:00 AM',
    venue: 'Iyaniwura Palace',
    address: 'Iba town Osun State, Nigeria',
    description: 'A celebration of Yoruba culture and heritage featuring guest speaker Prince Tunde Odunlade, an accomplished print and textile artist with extensive background in exhibiting, teaching, lecturing, and studying.',
    image: '/Assets/oriki.jpg',
  },
  {
    id: 3,
    title: 'Abuja 2025 African Descent Creative Industry Awards & Honours',
    artist: 'Prince Tunde Odunlade',
    category: 'Awards Ceremony',
    type: 'awards',
    startDate: '2025-12-11',
    venue: 'Nicon Luxury Abuja',
    address: 'Abuja, Nigeria',
    description: 'Creative Arts Promotion Icon Award honoring Prince Tunde Odunlade for his outstanding contributions to African arts and culture.',
    image: '/Assets/abuja .jpg',
  },
  {
    id: 4,
    title: 'ARIYA GENGE 2025',
    artist: 'Iyaniwura Alarinjo Troupe',
    category: 'Cultural Event',
    type: 'event',
    startDate: '2025-12-15',
    venue: 'Tunde Odunlade Arts Gallery',
    address: 'No 2, Ladoke Akintola, Off Aare Avenue, New Bodija',
    description: 'Presented by Iyaniwura Alarinjo Troupe in collaboration with Tunde Odunlade Arts Gallery. A vibrant celebration of traditional Nigerian performing arts and culture.',
    image: '/Assets/Ariya.jpg',
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
          <h2 className="text-3xl md:text-5xl font-bold text-[#3D2817] mb-6 font-serif">
            Upcoming Exhibitions and Events
          </h2>
          <p className="text-base md:text-lg text-[#6B4423] max-w-2xl mx-auto leading-relaxed">
            Discover upcoming art exhibitions, cultural festivals, and special events celebrating African heritage and contemporary expression.
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
          {exhibitions.map((exhibit) => {
            const formatDate = (dateStr: string) => {
              return new Date(dateStr).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });
            };

            const getTypeBadge = (type: string) => {
              const badges: Record<string, { text: string; bg: string; textColor: string }> = {
                exhibition: { text: 'Exhibition', bg: 'bg-[#C17C2E]', textColor: 'text-white' },
                festival: { text: 'Festival', bg: 'bg-[#D4AF37]', textColor: 'text-[#3D2817]' },
                awards: { text: 'Awards', bg: 'bg-[#8B4513]', textColor: 'text-white' },
                event: { text: 'Event', bg: 'bg-[#6B4423]', textColor: 'text-white' },
              };
              return badges[type] || badges.event;
            };

            const badge = getTypeBadge(exhibit.type);

            return (
              <motion.div
                key={exhibit.id}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group"
              >
                <Link href={`/exhibitions#exhibition-${exhibit.id}`}>
                  <div className="relative h-72 md:h-80 overflow-hidden rounded-xl mb-4 shadow-lg group-hover:shadow-2xl transition-all duration-300 border-4 border-[#D4AF37]">
                    <Image
                      src={exhibit.image}
                      alt={exhibit.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      quality={90}
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Type Badge */}
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${badge.bg} ${badge.textColor} shadow-lg`}>
                      {badge.text}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-end justify-between p-4">
                      <div className="text-right text-white">
                        <p className="text-xs font-semibold mb-1">{formatDate(exhibit.startDate)}</p>
                        {exhibit.endDate && (
                          <p className="text-xs">to {formatDate(exhibit.endDate)}</p>
                        )}
                        {exhibit.openingTime && (
                          <p className="text-xs mt-1">📍 {exhibit.openingTime}</p>
                        )}
                      </div>
                      <span className="text-white text-sm font-semibold px-6 py-2 bg-[#C17C2E] rounded-full">
                        View Details →
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-[#3D2817] mb-1 group-hover:text-[#C17C2E] transition-colors font-serif">
                      {exhibit.title}
                    </h3>
                    {exhibit.subtitle && (
                      <p className="text-sm text-[#8B4513] italic mb-1">{exhibit.subtitle}</p>
                    )}
                    <p className="text-sm text-[#C17C2E] font-semibold mb-2">{exhibit.artist}</p>
                    <p className="text-xs text-[#6B4423] line-clamp-2">{exhibit.category}</p>
                    <p className="text-xs text-[#8B4513] mt-2 line-clamp-1">📍 {exhibit.venue}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
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
            View All Exhibitions
          </Link>
        </motion.div>
      </div>
    </section>
  );
}