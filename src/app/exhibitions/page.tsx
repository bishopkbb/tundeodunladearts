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
    id: 2,
    title: 'Rhythms of Ibadan',
    artist: 'Collective Artists',
    status: 'current',
    startDate: '2025-02-01',
    endDate: '2025-04-15',
    description: 'An immersive multimedia exhibition capturing the pulse, energy, and vibrant spirit of Ibadan through photography, painting, and sound installations.',
    longDescription: 'Rhythms of Ibadan celebrates the heartbeat of Nigeria\'s cultural capital through a dynamic fusion of visual and auditory art. This collaborative exhibition brings together 15 artists who call Ibadan home, each offering their unique perspective on the city\'s bustling markets, historic architecture, and evolving urban landscape. From dawn prayers echoing across ancient mosque towers to the electric energy of Dugbe Market at midday, this exhibition invites visitors to experience Ibadan through multiple senses. Interactive sound installations complement striking visual works, creating an unforgettable journey through the soul of the city.',
    image: '/Assets/hero2.jpg',
    category: 'Mixed Media',
    location: 'West Wing',
    artworks: 48,
  },
  {
    id: 3,
    title: 'Colors of Heritage',
    artist: 'Emerging Artists',
    status: 'upcoming',
    startDate: '2025-04-10',
    endDate: '2025-06-20',
    description: 'A vibrant showcase of emerging talent exploring African identity through bold contemporary paintings and digital art installations.',
    longDescription: 'Colors of Heritage provides a platform for the next generation of African artists to share their vision of cultural identity in the 21st century. This exhibition features works by 20 emerging artists under 35, each bringing fresh perspectives to age-old questions about belonging, diaspora, and heritage. From hyperrealistic portraits that challenge colonial narratives to abstract digital installations that reimagine traditional motifs, this show pulses with youthful energy and innovative techniques. The exhibition serves as both a celebration of contemporary African creativity and a launching pad for careers that will shape the continent\'s artistic future.',
    image: '/Assets/hero3.jpg',
    category: 'Contemporary',
    location: 'Innovation Space',
    artworks: 40,
  },
  {
    id: 4,
    title: 'Sacred Geometries',
    artist: 'Adire Masters',
    status: 'upcoming',
    startDate: '2025-05-01',
    endDate: '2025-07-15',
    description: 'Traditional Adire textile art reimagined for modern spaces, featuring intricate resist-dye patterns that honor ancient Yoruba symbolism.',
    longDescription: 'Sacred Geometries pays homage to the centuries-old Adire tradition while demonstrating its continuing relevance in contemporary design. Master textile artists from across Nigeria gather to showcase their interpretations of sacred symbols and geometric patterns that have been passed down through generations. Each piece tells a story—of fertility, prosperity, protection, or wisdom—encoded in the indigo-stained cloth through traditional resist-dye techniques. This exhibition bridges past and present, showing how ancient craftsmanship continues to inspire modern fashion, interior design, and fine art.',
    image: '/Assets/featured1.jpg',
    category: 'Textile Art',
    location: 'Heritage Hall',
    artworks: 35,
  },
  {
    id: 5,
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
    id: 6,
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
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        unoptimized
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
                    className="object-cover"
                    unoptimized
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