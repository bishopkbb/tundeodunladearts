'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [selectedExhibition, setSelectedExhibition] = useState<Exhibition | null>(null);

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

  return (
    <section
      id="exhibitions"
      className="py-16 xs:py-20 md:py-32 px-4 xs:px-6 md:px-8 bg-white/85 backdrop-blur-sm w-full"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: '-50px' }}
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
          viewport={{ once: true, margin: '-50px' }}
        >
          {exhibitions.map((exhibit) => {
            const badge = getTypeBadge(exhibit.type);

            return (
              <motion.div
                key={exhibit.id}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.2, ease: 'easeOut' } }}
                className="group cursor-pointer"
                onClick={() => setSelectedExhibition(exhibit)}
              >
                <div>
                  <div className="relative h-72 md:h-80 overflow-hidden rounded-xl mb-4 shadow-lg group-hover:shadow-2xl transition-shadow duration-200 border-4 border-[#D4AF37]">
                    <Image
                      src={exhibit.image}
                      alt={exhibit.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      quality={90}
                      className="object-cover group-hover:scale-110 transition-transform duration-300 will-change-transform"
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
                </div>
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

      {/* Exhibition Detail Modal */}
      <AnimatePresence>
        {selectedExhibition && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 xs:p-4 bg-black/80 backdrop-blur-md overflow-y-auto touch-manipulation"
            onClick={() => setSelectedExhibition(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl sm:rounded-2xl max-w-[90vw] md:max-w-3xl lg:max-w-4xl xl:max-w-5xl w-full max-h-[90vh] md:max-h-[85vh] overflow-y-auto shadow-2xl relative touch-manipulation"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedExhibition(null)}
                className="sticky top-2 xs:top-4 right-2 xs:right-4 ml-auto w-10 h-10 xs:w-12 xs:h-12 rounded-full bg-[#D4AF37] hover:bg-[#C17C2E] active:bg-[#8B4513] text-white transition-colors flex items-center justify-center z-10 shadow-lg touch-manipulation"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Exhibition Hero Image */}
              <div className="relative h-80 md:h-96">
                <Image
                  src={selectedExhibition.image}
                  alt={selectedExhibition.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 80vw"
                  quality={90}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className={`absolute top-6 right-6 px-6 py-3 rounded-full text-white text-sm font-bold ${getTypeBadge(selectedExhibition.type).bg} ${getTypeBadge(selectedExhibition.type).textColor} shadow-lg`}>
                  {getTypeBadge(selectedExhibition.type).text}
                </div>
              </div>

              {/* Exhibition Details */}
              <div className="p-4 xs:p-6 sm:p-8 md:p-12">
                <span className="inline-block px-4 py-2 bg-[#F5EFE7] text-[#8B4513] text-sm font-semibold rounded-full mb-4">
                  {selectedExhibition.category}
                </span>
                
                <h2 className="text-2xl xs:text-3xl md:text-4xl lg:text-5xl font-bold text-[#3D2817] mb-2 font-serif">
                  {selectedExhibition.title}
                </h2>
                {selectedExhibition.subtitle && (
                  <p className="text-lg xs:text-xl md:text-2xl text-[#8B4513] italic mb-3">
                    {selectedExhibition.subtitle}
                  </p>
                )}
                <p className="text-lg xs:text-xl text-[#C17C2E] font-semibold mb-6">{selectedExhibition.artist}</p>

                <div className="w-20 h-1 bg-[#D4AF37] mb-8 rounded-full" />

                {/* Exhibition Info Grid */}
                <div className="grid md:grid-cols-2 gap-4 xs:gap-6 mb-8 p-4 xs:p-6 bg-[#F5EFE7] rounded-xl">
                  <div>
                    <p className="text-xs xs:text-sm text-[#8B4513] font-semibold mb-2">Event Dates</p>
                    <p className="text-sm xs:text-base text-[#3D2817]">
                      {formatDate(selectedExhibition.startDate)}
                      {selectedExhibition.endDate && ` - ${formatDate(selectedExhibition.endDate)}`}
                    </p>
                    {selectedExhibition.openingTime && (
                      <p className="text-sm xs:text-base text-[#3D2817] mt-1">
                        Opening: {selectedExhibition.openingTime}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-xs xs:text-sm text-[#8B4513] font-semibold mb-2">Venue</p>
                    <p className="text-sm xs:text-base text-[#3D2817]">{selectedExhibition.venue}</p>
                    {selectedExhibition.address && (
                      <p className="text-xs xs:text-sm text-[#6B4423] mt-1">{selectedExhibition.address}</p>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="prose max-w-none">
                  <h3 className="text-xl xs:text-2xl font-bold text-[#3D2817] mb-4 font-serif">About This Event</h3>
                  <p className="text-sm xs:text-base md:text-lg text-[#3D2817] leading-relaxed whitespace-pre-line">
                    {selectedExhibition.description}
                  </p>
                </div>

                {/* CTA Button */}
                <div className="flex flex-col sm:flex-row gap-3 xs:gap-4 mt-6 xs:mt-8 sm:mt-10">
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto px-6 xs:px-8 py-3 xs:py-4 bg-[#C17C2E] hover:bg-[#8B4513] active:bg-[#6B3410] text-white font-bold text-base xs:text-lg rounded-lg transition-all duration-200 shadow-lg touch-manipulation flex items-center justify-center"
                    onClick={() => setSelectedExhibition(null)}
                  >
                    Plan Your Visit
                  </Link>
                  <Link
                    href={`/exhibitions#exhibition-${selectedExhibition.id}`}
                    className="w-full sm:w-auto px-6 xs:px-8 py-3 xs:py-4 bg-white border-2 border-[#D4AF37] hover:bg-[#D4AF37] active:bg-[#C17C2E] text-[#3D2817] font-bold text-base xs:text-lg rounded-lg transition-all duration-300 touch-manipulation flex items-center justify-center"
                    onClick={() => setSelectedExhibition(null)}
                  >
                    View Full Details
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}