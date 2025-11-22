'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import CartSidebar from '@/components/cart/CartSidebar';

type ExhibitionStatus = 'current' | 'upcoming' | 'past';

interface Exhibition {
  id: number;
  title: string;
  artist: string;
  status: ExhibitionStatus;
  startDate: string;
  endDate: string;
  description: string;
  longDescription: string;
  image: string;
  category: string;
  location: string;
  artworks: number;
}

const exhibitions: Exhibition[] = [
  {
    id: 1,
    title: 'Chain of Souls (ASOPO OKAN)',
    artist: 'Taofeek Olalekan',
    status: 'upcoming',
    startDate: '2025-12-16',
    endDate: '2026-01-10',
    description: 'An art exhibition of mixed media, fiber/textile art, beadworks, & oil on canvas. A new talent born to celebrate Arewa Odunlade\'s birthday.',
    longDescription: 'Chain of Souls (ASOPO OKAN) presents a powerful exploration of connection, heritage, and artistic expression through diverse mediums. This groundbreaking exhibition features works by emerging talent Taofeek Olalekan, showcasing innovative approaches to mixed media, fiber/textile art, beadworks, and traditional oil on canvas. The exhibition serves as both a celebration of new artistic voices and a tribute to Arewa Odunlade\'s birthday. Visitors will experience a dynamic interplay between traditional African craft techniques and contemporary artistic practices, with each piece telling a story of cultural continuity and creative evolution. The opening reception promises an intimate encounter with the artist, allowing visitors to meet Taofeek Olalekan live and experience his creative process firsthand.',
    image: '/Assets/hero1.jpg',
    category: 'Mixed Media, Fiber/Textile Art, Beadworks & Oil on Canvas',
    location: 'Femi Osofisan Amphitheater, Tunde Odunlade Arts and Culture Gallery, No 2, Ladoke Akintola, Off Aare Avenue, New Bodija',
    artworks: 30,
  },
  {
    id: 2,
    title: '6TH ORÍKÌ YORÙBÁ FESTIVAL',
    artist: 'Prince Tunde Odunlade',
    status: 'upcoming',
    startDate: '2025-12-13',
    endDate: '2025-12-13',
    description: 'A celebration of Yoruba culture and heritage featuring guest speaker Prince Tunde Odunlade, an accomplished print and textile artist with extensive background in exhibiting, teaching, lecturing, and studying.',
    longDescription: 'The 6TH ORÍKÌ YORÙBÁ FESTIVAL brings together cultural enthusiasts, artists, and scholars for a day-long celebration of Yoruba heritage and oral traditions. This year\'s festival features Prince Tunde Odunlade as the guest speaker, a highly accomplished print and textile artist whose work bridges traditional African art forms with contemporary expression. Prince Tunde Odunlade brings decades of experience from his studies in Anthropology at Iowa State University and Stillman College in Tuscaloosa, Alabama, where he served as an artist-in-residence in 1986 and 1989. His extensive travels throughout Nigeria, Africa, North America, and Europe have enriched his understanding of global artistic practices while maintaining deep roots in Yoruba cultural traditions. The festival promises engaging discussions, cultural performances, and insights into the preservation and evolution of Yoruba artistic heritage.',
    image: '/Assets/hero2.jpg',
    category: 'Cultural Festival',
    location: 'Iyaniwura Palace, Iba town Osun State, Nigeria',
    artworks: 0,
  },
  {
    id: 3,
    title: 'Abuja 2025 African Descent Creative Industry Awards & Honours',
    artist: 'Prince Tunde Odunlade',
    status: 'upcoming',
    startDate: '2025-12-11',
    endDate: '2025-12-11',
    description: 'Creative Arts Promotion Icon Award honoring Prince Tunde Odunlade for his outstanding contributions to African arts and culture.',
    longDescription: 'The Abuja 2025 African Descent Creative Industry Awards & Honours recognizes exceptional individuals who have made significant contributions to the creative arts across the African diaspora. Prince Tunde Odunlade is being honored as the Creative Arts Promotion Icon for his decades of dedication to advancing African artistic expression, cultural preservation, and creative education. This prestigious award acknowledges his role as a bridge between traditional African art forms and contemporary global artistic practices. The ceremony at Nicon Luxury Abuja brings together leaders from across the African creative industry to celebrate excellence, innovation, and cultural impact. Prince Tunde Odunlade\'s recognition highlights the importance of artistic advocacy and the power of creative expression in shaping cultural identity and global understanding.',
    image: '/Assets/hero3.jpg',
    category: 'Awards Ceremony',
    location: 'Nicon Luxury Abuja, Nigeria',
    artworks: 0,
  },
  {
    id: 4,
    title: 'ARIYA GENGE 2025',
    artist: 'Iyaniwura Alarinjo Troupe',
    status: 'upcoming',
    startDate: '2025-12-15',
    endDate: '2025-12-15',
    description: 'Presented by Iyaniwura Alarinjo Troupe in collaboration with Tunde Odunlade Arts Gallery. A vibrant celebration of traditional Nigerian performing arts and culture.',
    longDescription: 'ARIYA GENGE 2025 is a spectacular showcase of traditional Nigerian performing arts, presented by the renowned Iyaniwura Alarinjo Troupe in collaboration with Tunde Odunlade Arts Gallery. This vibrant cultural event brings together music, dance, storytelling, and theatrical performances that celebrate the rich heritage of Nigerian and Yoruba traditions. The event transforms the gallery space into a dynamic stage where ancient artistic practices meet contemporary presentation, creating an immersive experience for audiences of all ages. ARIYA GENGE 2025 offers a unique opportunity to witness living cultural traditions and the ongoing evolution of African performing arts, all within the inspiring setting of Tunde Odunlade Arts Gallery.',
    image: '/Assets/featured1.jpg',
    category: 'Cultural Event',
    location: 'Tunde Odunlade Arts Gallery, No 2, Ladoke Akintola, Off Aare Avenue, New Bodija',
    artworks: 0,
  },
  {
    id: 5,
    title: 'Ancestral Threads',
    artist: 'Prince Tunde Odunlade',
    status: 'current',
    startDate: '2025-01-15',
    endDate: '2025-03-30',
    description: 'A breathtaking exploration of Yoruba heritage through contemporary batik art, weaving stories of tradition into modern textile masterpieces.',
    longDescription: 'Ancestral Threads is a profound journey through the rich tapestry of Yoruba culture, where Prince Tunde Odunlade\'s innovative floatography technique brings centuries-old stories to life. This exhibition features over 30 original batik works that bridge the gap between traditional Nigerian art forms and contemporary expression. Each piece is a meditation on identity, heritage, and the enduring power of cultural memory. Through vibrant indigo dyes and intricate patterns, visitors will discover how ancestral wisdom continues to shape modern African artistry.',
    image: '/Assets/hero1.jpg',
    category: 'Textile Art',
    location: 'Main Gallery',
    artworks: 32,
  },
  {
    id: 6,
    title: 'Metamorphosis',
    artist: 'Various Artists',
    status: 'past',
    startDate: '2024-09-01',
    endDate: '2024-12-15',
    description: 'A transformative journey through change, growth, and evolution depicted through sculpture, painting, and performance art.',
    longDescription: 'Metamorphosis explored the universal themes of transformation and personal evolution through diverse artistic mediums. Artists examined how individuals, communities, and cultures adapt and transform in response to social change, environmental pressures, and technological advancement. The exhibition featured powerful sculptural works that literally transformed as viewers interacted with them, alongside paintings that documented personal journeys of growth and change. Performance art pieces conducted throughout the exhibition period added a temporal dimension, reminding visitors that transformation is an ongoing process rather than a destination.',
    image: '/Assets/featured2.jpg',
    category: 'Sculpture & Performance',
    location: 'Main Gallery',
    artworks: 28,
  },
  {
    id: 7,
    title: 'Urban Stories',
    artist: 'Street Art Collective',
    status: 'past',
    startDate: '2024-06-15',
    endDate: '2024-08-30',
    description: 'Bold street art and graffiti pieces brought indoors, celebrating the raw energy and social commentary of urban artistic expression.',
    longDescription: 'Urban Stories challenged traditional gallery boundaries by bringing the rebellious spirit of street art into the formal exhibition space. This groundbreaking show featured works by some of Nigeria\'s most celebrated street artists, whose murals typically grace city walls and highway underpasses. By placing these works in dialogue with contemporary fine art, the exhibition sparked important conversations about accessibility, public space, and who gets to define what counts as "serious" art. The show proved enormously popular with younger audiences and helped bridge the gap between gallery culture and street culture.',
    image: '/Assets/hero5.jpg',
    category: 'Street Art',
    location: 'Urban Space',
    artworks: 25,
  },
];

export default function ExhibitionsPage() {
  const [filter, setFilter] = useState<ExhibitionStatus | 'all'>('all');
  const [selectedExhibition, setSelectedExhibition] = useState<Exhibition | null>(null);

  const filteredExhibitions = filter === 'all' 
    ? exhibitions 
    : exhibitions.filter(ex => ex.status === filter);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusColor = (status: ExhibitionStatus) => {
    switch(status) {
      case 'current': return 'bg-green-500';
      case 'upcoming': return 'bg-[#FFD700]';
      case 'past': return 'bg-gray-400';
    }
  };

  const getStatusText = (status: ExhibitionStatus) => {
    switch(status) {
      case 'current': return 'Now Showing';
      case 'upcoming': return 'Coming Soon';
      case 'past': return 'Past Exhibition';
    }
  };

  return (
    <>
      {/* Background Pattern */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 25%, #8B6914 50%, #6B4423 75%, #4A2810 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4A574' fill-opacity='0.35' fill-rule='evenodd'%3E%3Ccircle cx='100' cy='100' r='40'/%3E%3Ccircle cx='0' cy='0' r='40'/%3E%3Ccircle cx='200' cy='0' r='40'/%3E%3Ccircle cx='0' cy='200' r='40'/%3E%3Ccircle cx='200' cy='200' r='40'/%3E%3Cpath d='M50 100 Q 75 50, 100 100 T 150 100' stroke='%23C9A97A' stroke-width='3' fill='none'/%3E%3Cpath d='M100 50 Q 50 75, 100 100 T 100 150' stroke='%23C9A97A' stroke-width='3' fill='none'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />
        <div
          className="absolute inset-0 opacity-45"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23E8B882' stroke-width='2.5' stroke-opacity='0.4'%3E%3Cpath d='M0 30 L15 15 L30 30 L45 15 L60 30 L75 15 L90 30 L105 15 L120 30'/%3E%3Cpath d='M0 60 L15 45 L30 60 L45 45 L60 60 L75 45 L90 60 L105 45 L120 60'/%3E%3Cpath d='M0 90 L15 75 L30 90 L45 75 L60 90 L75 75 L90 90 L105 75 L120 90'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '120px 120px',
          }}
        />
        <div className="absolute inset-0 bg-[#F5EFE7]/30" />
      </div>

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
                Exhibitions
              </h1>
              <div className="w-32 h-1 bg-[#D4AF37] mx-auto mb-8 rounded-full" />
              <p className="text-lg md:text-xl text-[#6B4423] max-w-3xl mx-auto leading-relaxed">
                Discover transformative art experiences that celebrate African heritage, contemporary creativity, and cultural innovation
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="py-8 px-4 md:px-8 bg-white/80 backdrop-blur-sm border-y-2 border-[#D4AF37]/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4">
              {(['all', 'current', 'upcoming', 'past'] as const).map((status) => (
                <motion.button
                  key={status}
                  onClick={() => setFilter(status)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-8 py-3 rounded-full font-semibold text-sm md:text-base transition-all duration-300 ${
                    filter === status
                      ? 'bg-[#C17C2E] text-white shadow-lg'
                      : 'bg-white/90 text-[#6B4423] border-2 border-[#D4A574] hover:border-[#C17C2E] hover:text-[#C17C2E]'
                  }`}
                >
                  {status === 'all' ? 'All Exhibitions' : status.charAt(0).toUpperCase() + status.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Exhibitions Grid */}
        <section className="py-16 md:py-24 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={filter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredExhibitions.map((exhibition, index) => (
                  <motion.div
                    key={exhibition.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    onClick={() => setSelectedExhibition(exhibition)}
                    className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-[#D4A574]/30 hover:border-[#D4AF37]"
                  >
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={exhibition.image}
                        alt={exhibition.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={90}
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Status Badge */}
                      <div className={`absolute top-4 right-4 px-4 py-2 rounded-full text-white text-xs font-bold ${getStatusColor(exhibition.status)} shadow-lg`}>
                        {getStatusText(exhibition.status)}
                      </div>
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                        <span className="text-white text-sm font-semibold px-6 py-2 bg-[#D4AF37] rounded-full">
                          View Details →
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <span className="inline-block px-3 py-1 bg-[#F5EFE7] text-[#8B4513] text-xs font-semibold rounded-full mb-3">
                        {exhibition.category}
                      </span>
                      <h3 className="text-2xl font-bold text-[#3D2817] mb-2 group-hover:text-[#C17C2E] transition-colors font-serif">
                        {exhibition.title}
                      </h3>
                      <p className="text-sm text-[#C17C2E] font-semibold mb-3">{exhibition.artist}</p>
                      <p className="text-sm text-[#6B4423] mb-4 line-clamp-2">
                        {exhibition.description}
                      </p>
                      
                      {/* Exhibition Info */}
                      <div className="flex items-center gap-4 text-xs text-[#8B4513] border-t border-[#D4A574]/30 pt-4">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{formatDate(exhibition.startDate)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{exhibition.artworks} works</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredExhibitions.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-2xl text-[#6B4423] mb-4">No {filter} exhibitions found</p>
                <button
                  onClick={() => setFilter('all')}
                  className="px-6 py-3 bg-[#C17C2E] hover:bg-[#8B4513] text-white font-semibold rounded-lg transition-colors"
                >
                  View All Exhibitions
                </button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Exhibition Detail Modal */}
        <AnimatePresence>
          {selectedExhibition && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
              onClick={() => setSelectedExhibition(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedExhibition(null)}
                  className="sticky top-4 left-full ml-4 w-12 h-12 rounded-full bg-[#D4AF37] hover:bg-[#C17C2E] text-white transition-colors flex items-center justify-center z-10 shadow-lg"
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
                  <div className={`absolute top-6 right-6 px-6 py-3 rounded-full text-white text-sm font-bold ${getStatusColor(selectedExhibition.status)} shadow-lg`}>
                    {getStatusText(selectedExhibition.status)}
                  </div>
                </div>

                {/* Exhibition Details */}
                <div className="p-8 md:p-12">
                  <span className="inline-block px-4 py-2 bg-[#F5EFE7] text-[#8B4513] text-sm font-semibold rounded-full mb-4">
                    {selectedExhibition.category}
                  </span>
                  
                  <h2 className="text-3xl md:text-5xl font-bold text-[#3D2817] mb-3 font-serif">
                    {selectedExhibition.title}
                  </h2>
                  
                  <p className="text-xl text-[#C17C2E] font-semibold mb-6">{selectedExhibition.artist}</p>

                  <div className="w-20 h-1 bg-[#D4AF37] mb-8 rounded-full" />

                  {/* Exhibition Info Grid */}
                  <div className="grid md:grid-cols-2 gap-6 mb-8 p-6 bg-[#F5EFE7] rounded-xl">
                    <div>
                      <p className="text-sm text-[#8B4513] font-semibold mb-2">Exhibition Dates</p>
                      <p className="text-[#3D2817]">{formatDate(selectedExhibition.startDate)} - {formatDate(selectedExhibition.endDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#8B4513] font-semibold mb-2">Location</p>
                      <p className="text-[#3D2817]">{selectedExhibition.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#8B4513] font-semibold mb-2">Featured Artworks</p>
                      <p className="text-[#3D2817]">{selectedExhibition.artworks} pieces</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#8B4513] font-semibold mb-2">Category</p>
                      <p className="text-[#3D2817]">{selectedExhibition.category}</p>
                    </div>
                  </div>

                  {/* Long Description */}
                  <div className="prose max-w-none">
                    <h3 className="text-2xl font-bold text-[#3D2817] mb-4 font-serif">About This Exhibition</h3>
                    <p className="text-[#3D2817] leading-relaxed text-lg whitespace-pre-line">
                      {selectedExhibition.longDescription}
                    </p>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-10">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-4 bg-[#C17C2E] hover:bg-[#8B4513] text-white font-bold text-lg rounded-lg transition-all duration-300 shadow-lg"
                    >
                      Plan Your Visit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-4 bg-white border-2 border-[#D4AF37] hover:bg-[#D4AF37] text-[#3D2817] font-bold text-lg rounded-lg transition-all duration-300"
                    >
                      Share Exhibition
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
        <CartSidebar />
      </main>
    </>
  );
}