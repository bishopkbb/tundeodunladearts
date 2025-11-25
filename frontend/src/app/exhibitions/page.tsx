'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import CartSidebar from '@/components/cart/CartSidebar';
import { calculateExhibitionStatus, getStatusText, getStatusColor, type ExhibitionStatus } from '@/lib/exhibitionUtils';
import { fetchExhibitions } from '@/lib/cmsData';
import { shareToFacebook, shareToTwitter, shareToLinkedIn, shareToWhatsApp, shareViaEmail, shareToPinterest, copyToClipboard, getAbsoluteUrl } from '@/lib/shareUtils';
import Link from 'next/link';

interface Exhibition {
  id: number;
  title: string;
  artist: string;
  startDate: string;
  endDate?: string;
  description: string;
  longDescription: string;
  image: string;
  category: string;
  location: string;
  artworks: number;
  type?: 'exhibition' | 'festival' | 'awards' | 'event';
  openingTime?: string;
  address?: string;
  subtitle?: string;
}

const exhibitionsData: Exhibition[] = [
  {
    id: 1,
    title: 'Chain of Souls (ASOPO OKAN)',
    artist: 'Taofeek Olalekan',
    startDate: '2025-12-16',
    endDate: '2026-01-10',
    description: 'An art exhibition of mixed media, fiber/textile art, beadworks, & oil on canvas. A new talent born to celebrate Arewa Odunlade\'s birthday.',
    longDescription: 'Chain of Souls (ASOPO OKAN) presents a powerful exploration of connection, heritage, and artistic expression through diverse mediums. This groundbreaking exhibition features works by emerging talent Taofeek Olalekan, showcasing innovative approaches to mixed media, fiber/textile art, beadworks, and traditional oil on canvas. The exhibition serves as both a celebration of new artistic voices and a tribute to Arewa Odunlade\'s birthday. Visitors will experience a dynamic interplay between traditional African craft techniques and contemporary artistic practices, with each piece telling a story of cultural continuity and creative evolution. The opening reception promises an intimate encounter with the artist, allowing visitors to meet Taofeek Olalekan live and experience his creative process firsthand.',
    image: '/Assets/chain of souls.png',
    category: 'Fiber/Textile Art',
    location: 'Femi Osofisan Amphitheater, Tunde Odunlade Arts and Culture Gallery, No 2, Ladoke Akintola, Off Aare Avenue, New Bodija',
    artworks: 30,
  },
  {
    id: 2,
    title: '6TH ORÍKÌ YORÙBÁ FESTIVAL',
    artist: 'Prince Tunde Odunlade',
    startDate: '2025-12-13',
    endDate: '2025-12-13',
    description: 'A celebration of Yoruba culture and heritage featuring guest speaker Prince Tunde Odunlade, an accomplished print and textile artist with extensive background in exhibiting, teaching, lecturing, and studying.',
    longDescription: 'The 6TH ORÍKÌ YORÙBÁ FESTIVAL brings together cultural enthusiasts, artists, and scholars for a day-long celebration of Yoruba heritage and oral traditions. This year\'s festival features Prince Tunde Odunlade as the guest speaker, a highly accomplished print and textile artist whose work bridges traditional African art forms with contemporary expression. Prince Tunde Odunlade brings decades of experience from his studies in Anthropology at Iowa State University and Stillman College in Tuscaloosa, Alabama, where he served as an artist-in-residence in 1986 and 1989. His extensive travels throughout Nigeria, Africa, North America, and Europe have enriched his understanding of global artistic practices while maintaining deep roots in Yoruba cultural traditions. The festival promises engaging discussions, cultural performances, and insights into the preservation and evolution of Yoruba artistic heritage.',
    image: '/Assets/oriki.jpg',
    category: 'Cultural Festival',
    location: 'Iyaniwura Palace, Iba town Osun State, Nigeria',
    artworks: 0,
  },
  {
    id: 3,
    title: 'Abuja 2025 African Descent Creative Industry Awards & Honours',
    artist: 'Prince Tunde Odunlade',
    startDate: '2025-12-11',
    endDate: '2025-12-11',
    description: 'Creative Arts Promotion Icon Award honoring Prince Tunde Odunlade for his outstanding contributions to African arts and culture.',
    longDescription: 'The Abuja 2025 African Descent Creative Industry Awards & Honours recognizes exceptional individuals who have made significant contributions to the creative arts across the African diaspora. Prince Tunde Odunlade is being honored as the Creative Arts Promotion Icon for his decades of dedication to advancing African artistic expression, cultural preservation, and creative education. This prestigious award acknowledges his role as a bridge between traditional African art forms and contemporary global artistic practices. The ceremony at Nicon Luxury Abuja brings together leaders from across the African creative industry to celebrate excellence, innovation, and cultural impact. Prince Tunde Odunlade\'s recognition highlights the importance of artistic advocacy and the power of creative expression in shaping cultural identity and global understanding.',
    image: '/Assets/abuja .jpg',
    category: 'Awards Ceremony',
    location: 'Nicon Luxury Abuja, Nigeria',
    artworks: 0,
  },
  {
    id: 4,
    title: 'ARIYA GENGE 2025',
    artist: 'Iyaniwura Alarinjo Troupe',
    startDate: '2025-12-15',
    endDate: '2025-12-15',
    description: 'Presented by Iyaniwura Alarinjo Troupe in collaboration with Tunde Odunlade Arts Gallery. A vibrant celebration of traditional Nigerian performing arts and culture.',
    longDescription: 'ARIYA GENGE 2025 is a spectacular showcase of traditional Nigerian performing arts, presented by the renowned Iyaniwura Alarinjo Troupe in collaboration with Tunde Odunlade Arts Gallery. This vibrant cultural event brings together music, dance, storytelling, and theatrical performances that celebrate the rich heritage of Nigerian and Yoruba traditions. The event transforms the gallery space into a dynamic stage where ancient artistic practices meet contemporary presentation, creating an immersive experience for audiences of all ages. ARIYA GENGE 2025 offers a unique opportunity to witness living cultural traditions and the ongoing evolution of African performing arts, all within the inspiring setting of Tunde Odunlade Arts Gallery.',
    image: '/Assets/Ariya.jpg',
    category: 'Cultural Event',
    location: 'Tunde Odunlade Arts Gallery, No 2, Ladoke Akintola, Off Aare Avenue, New Bodija',
    artworks: 0,
  },
  {
    id: 5,
    title: 'Ancestral Threads',
    artist: 'Prince Tunde Odunlade',
    startDate: '2025-01-15',
    endDate: '2025-03-30',
    description: 'A breathtaking exploration of Yoruba heritage through contemporary batik art, weaving stories of tradition into modern textile masterpieces.',
    longDescription: 'Ancestral Threads is a profound journey through the rich tapestry of Yoruba culture, where Prince Tunde Odunlade\'s innovative floatography technique brings centuries-old stories to life. This exhibition features over 30 original batik works that bridge the gap between traditional Nigerian art forms and contemporary expression. Each piece is a meditation on identity, heritage, and the enduring power of cultural memory. Through vibrant indigo dyes and intricate patterns, visitors will discover how ancestral wisdom continues to shape modern African artistry.',
    image: '/Assets/ancestral thread.jpg',
    category: 'Textile Art',
    location: 'Main Gallery',
    artworks: 32,
  },
  {
    id: 6,
    title: 'Metamorphosis',
    artist: 'Various Artists',
    startDate: '2024-09-01',
    endDate: '2024-12-15',
    description: 'A transformative journey through change, growth, and evolution depicted through sculpture, painting, and performance art.',
    longDescription: 'Metamorphosis explored the universal themes of transformation and personal evolution through diverse artistic mediums. Artists examined how individuals, communities, and cultures adapt and transform in response to social change, environmental pressures, and technological advancement. The exhibition featured powerful sculptural works that literally transformed as viewers interacted with them, alongside paintings that documented personal journeys of growth and change. Performance art pieces conducted throughout the exhibition period added a temporal dimension, reminding visitors that transformation is an ongoing process rather than a destination.',
    image: '/Assets/metamorphosis.jpg',
    category: 'Sculpture & Performance',
    location: 'Main Gallery',
    artworks: 28,
  },
  
];

export default function ExhibitionsPage() {
  const [filter, setFilter] = useState<ExhibitionStatus | 'all'>('all');
  const [selectedExhibition, setSelectedExhibition] = useState<Exhibition & { status: ExhibitionStatus } | null>(null);
  const [exhibitions, setExhibitions] = useState<Exhibition[]>(exhibitionsData);
  const [, setIsLoading] = useState(true);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  // Fetch exhibitions from CMS on mount
  useEffect(() => {
    async function loadExhibitions() {
      try {
        setIsLoading(true);
        const fetchedExhibitions = await fetchExhibitions(false);
        if (fetchedExhibitions && fetchedExhibitions.length > 0) {
          // Transform CMS exhibitions to match our interface
          const transformed = fetchedExhibitions.map(ex => ({
            id: parseInt(ex.id) || Math.random(),
            title: ex.title,
            subtitle: ex.subtitle,
            artist: ex.artist,
            startDate: ex.startDate,
            endDate: ex.endDate,
            description: ex.description,
            longDescription: ex.longDescription,
            image: ex.image,
            category: ex.category,
            location: ex.location,
            artworks: ex.artworks,
            type: ex.type,
            openingTime: ex.openingTime,
            address: ex.address,
          }));
          setExhibitions(transformed);
        }
      } catch (error: unknown) {
        console.error('Failed to load exhibitions from CMS:', error);
        setExhibitions(exhibitionsData);
      } finally {
        setIsLoading(false);
      }
    }
    loadExhibitions();
  }, []);

  // Calculate status dynamically for all exhibitions
  const exhibitionsWithStatus = useMemo(() => {
    return exhibitions.map(ex => ({
      ...ex,
      status: calculateExhibitionStatus(ex.startDate, ex.endDate),
    }));
  }, [exhibitions]);

  const filteredExhibitions = filter === 'all' 
    ? exhibitionsWithStatus 
    : exhibitionsWithStatus.filter(ex => ex.status === filter);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Share functionality
  const getShareData = (exhibition: Exhibition & { status: ExhibitionStatus }) => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const imageUrl = getAbsoluteUrl(exhibition.image);
    return {
      title: exhibition.title,
      description: exhibition.description,
      url: url,
      image: imageUrl,
    };
  };

  const handleShare = async (platform: string, exhibition: Exhibition & { status: ExhibitionStatus }) => {
    const shareData = getShareData(exhibition);
    
    switch (platform) {
      case 'facebook':
        shareToFacebook(shareData);
        break;
      case 'twitter':
        shareToTwitter(shareData);
        break;
      case 'linkedin':
        shareToLinkedIn(shareData);
        break;
      case 'whatsapp':
        shareToWhatsApp(shareData);
        break;
      case 'email':
        shareViaEmail(shareData);
        break;
      case 'pinterest':
        shareToPinterest(shareData);
        break;
      case 'copy':
        const success = await copyToClipboard(shareData.url);
        if (success) {
          setCopiedToClipboard(true);
          setTimeout(() => setCopiedToClipboard(false), 2000);
        }
        break;
    }
    setShowShareMenu(false);
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
              className="fixed inset-0 z-50 flex items-center justify-center p-2 xs:p-4 bg-black/80 backdrop-blur-md overflow-y-auto touch-manipulation"
              onClick={() => {
                setSelectedExhibition(null);
                setShowShareMenu(false);
              }}
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
                  onClick={() => {
                    setSelectedExhibition(null);
                    setShowShareMenu(false);
                  }}
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
                  <div className={`absolute top-6 right-6 px-6 py-3 rounded-full text-white text-sm font-bold ${getStatusColor(selectedExhibition.status)} shadow-lg`}>
                    {getStatusText(selectedExhibition.status)}
                  </div>
                </div>

                {/* Exhibition Details */}
                <div className="p-4 xs:p-6 sm:p-8 md:p-12">
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
                      <p className="text-[#3D2817]">
                        {formatDate(selectedExhibition.startDate)}
                        {selectedExhibition.endDate && ` - ${formatDate(selectedExhibition.endDate)}`}
                      </p>
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
                  <div className="flex flex-col sm:flex-row gap-3 xs:gap-4 mt-6 xs:mt-8 sm:mt-10 relative">
                    <Link
                      href="/contact"
                      className="w-full sm:w-auto px-6 xs:px-8 py-3 xs:py-4 bg-[#C17C2E] hover:bg-[#8B4513] active:bg-[#6B3410] text-white font-bold text-base xs:text-lg rounded-lg transition-all duration-200 shadow-lg touch-manipulation flex items-center justify-center"
                      onClick={() => {
                        setSelectedExhibition(null);
                        setShowShareMenu(false);
                      }}
                    >
                      Plan Your Visit
                    </Link>
                    
                    {/* Share Button with Dropdown */}
                    <div className="relative">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowShareMenu(!showShareMenu)}
                        className="w-full sm:w-auto px-6 xs:px-8 py-3 xs:py-4 bg-white border-2 border-[#D4AF37] hover:bg-[#D4AF37] active:bg-[#C17C2E] text-[#3D2817] font-bold text-base xs:text-lg rounded-lg transition-all duration-300 touch-manipulation flex items-center justify-center gap-2"
                      >
                        Share Exhibition
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.button>

                      {/* Share Menu Dropdown */}
                      <AnimatePresence>
                        {showShareMenu && selectedExhibition && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 sm:left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border-2 border-[#D4AF37]/30 p-4 z-50"
                          >
                            <p className="text-sm font-semibold text-[#6B4423] mb-3 pb-2 border-b border-[#D4A574]/30">
                              Share via:
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                              {/* Facebook */}
                              <button
                                onClick={() => handleShare('facebook', selectedExhibition)}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#F5EFE7] transition-colors text-left group"
                              >
                                <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                                <span className="text-sm text-[#3D2817] group-hover:text-[#C17C2E]">Facebook</span>
                              </button>

                              {/* Twitter/X */}
                              <button
                                onClick={() => handleShare('twitter', selectedExhibition)}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#F5EFE7] transition-colors text-left group"
                              >
                                <svg className="w-5 h-5 text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                </svg>
                                <span className="text-sm text-[#3D2817] group-hover:text-[#C17C2E]">Twitter/X</span>
                              </button>

                              {/* LinkedIn */}
                              <button
                                onClick={() => handleShare('linkedin', selectedExhibition)}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#F5EFE7] transition-colors text-left group"
                              >
                                <svg className="w-5 h-5 text-[#0077B5]" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                                <span className="text-sm text-[#3D2817] group-hover:text-[#C17C2E]">LinkedIn</span>
                              </button>

                              {/* WhatsApp */}
                              <button
                                onClick={() => handleShare('whatsapp', selectedExhibition)}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#F5EFE7] transition-colors text-left group"
                              >
                                <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                </svg>
                                <span className="text-sm text-[#3D2817] group-hover:text-[#C17C2E]">WhatsApp</span>
                              </button>

                              {/* Email */}
                              <button
                                onClick={() => handleShare('email', selectedExhibition)}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#F5EFE7] transition-colors text-left group"
                              >
                                <svg className="w-5 h-5 text-[#C17C2E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="text-sm text-[#3D2817] group-hover:text-[#C17C2E]">Email</span>
                              </button>

                              {/* Pinterest */}
                              <button
                                onClick={() => handleShare('pinterest', selectedExhibition)}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#F5EFE7] transition-colors text-left group"
                              >
                                <svg className="w-5 h-5 text-[#BD081C]" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.748.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.487.535 6.624 0 11.99-5.367 11.99-11.987C23.97 5.39 18.592.026 11.97.026L12.017 0z"/>
                                </svg>
                                <span className="text-sm text-[#3D2817] group-hover:text-[#C17C2E]">Pinterest</span>
                              </button>

                              {/* Copy Link */}
                              <button
                                onClick={() => handleShare('copy', selectedExhibition)}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#F5EFE7] transition-colors text-left group col-span-2"
                              >
                                <svg className="w-5 h-5 text-[#8B4513]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                <span className="text-sm text-[#3D2817] group-hover:text-[#C17C2E]">
                                  {copiedToClipboard ? 'Copied!' : 'Copy Link'}
                                </span>
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
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