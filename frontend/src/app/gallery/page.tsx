'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import CartSidebar from '@/components/cart/CartSidebar';
import { useCart } from '@/contexts/CartContext';
import { allArtworks, type Artwork } from '@/lib/artworksData';
import { fetchArtworks } from '@/lib/cmsData';

// Static fallback artworks
const staticArtworks: Artwork[] = allArtworks;

export default function GalleryPage() {
  // Use static artworks initially to prevent hydration mismatch
  const [artworks, setArtworks] = useState<Artwork[]>(staticArtworks);
  const [, setIsLoading] = useState(false); // Start as false to prevent hydration mismatch
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('masonry');
  const { addToCart } = useCart();

  // Fetch artworks from CMS on mount (after initial render to prevent hydration mismatch)
  useEffect(() => {
    let isMounted = true;
    
    async function loadArtworks() {
      try {
        setIsLoading(true);
        const fetchedArtworks = await fetchArtworks(false);
        // Only update if component is still mounted
        if (isMounted) {
          setArtworks(fetchedArtworks);
        }
      } catch (error) {
        console.error('Failed to load artworks from CMS:', error);
        // Keep static artworks if fetch fails
        if (isMounted) {
          setArtworks(staticArtworks);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    
    // Load artworks after initial render
    loadArtworks();
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Generate categories dynamically from artworks
  const categories = useMemo(() => {
    const cats = new Set(artworks.map(a => a.category));
    return ['All', ...Array.from(cats).sort()];
  }, [artworks]);

  const filteredArtworks = selectedCategory === 'All'
    ? artworks
    : artworks.filter(art => art.category === selectedCategory);

  // Memoize formatPrice to ensure consistent formatting and prevent hydration mismatch
  // Create a stable formatter instance that won't change between renders
  const formatter = useMemo(() => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }, []);

  const formatPrice = (price: number) => {
    return formatter.format(price);
  };

  const handleAddToCart = (artwork: Artwork) => {
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
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4A574' fill-opacity='0.35' fill-rule='evenodd'%3E%3Ccircle cx='100' cy='100' r='40'/%3E%3Ccircle cx='0' cy='0' r='40'/%3E%3Ccircle cx='200' cy='0' r='40'/%3E%3Ccircle cx='0' cy='200' r='40'/%3E%3Ccircle cx='200' cy='200' r='40'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
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
                Art Gallery
              </h1>
              <div className="w-32 h-1 bg-[#D4AF37] mx-auto mb-8 rounded-full" />
              <p className="text-lg md:text-xl text-[#6B4423] max-w-3xl mx-auto leading-relaxed">
                Explore our curated collection of contemporary African art, from traditional batik to innovative floatography
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters & View Toggle */}
        <section className="py-8 px-4 md:px-8 bg-white/80 backdrop-blur-sm border-y-2 border-[#D4AF37]/30 sticky top-20 z-40">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              {/* Category Filters */}
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-[#C17C2E] text-white shadow-lg'
                        : 'bg-white/90 text-[#6B4423] border-2 border-[#D4A574] hover:border-[#C17C2E]'
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-[#6B4423] font-semibold">View:</span>
                <div className="flex gap-2 p-1 bg-white rounded-lg border-2 border-[#D4A574]">
                  <button
                    onClick={() => setViewMode('masonry')}
                    className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                      viewMode === 'masonry' ? 'bg-[#C17C2E] text-white' : 'text-[#6B4423]'
                    }`}
                  >
                    Masonry
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                      viewMode === 'grid' ? 'bg-[#C17C2E] text-white' : 'text-[#6B4423]'
                    }`}
                  >
                    Grid
                  </button>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-center">
              <p className="text-sm text-[#8B4513]">
                Showing <span className="font-bold">{filteredArtworks.length}</span> {filteredArtworks.length === 1 ? 'artwork' : 'artworks'}
              </p>
            </div>
          </div>
        </section>

        {/* Artworks Gallery */}
        <section className="py-16 md:py-24 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedCategory}-${viewMode}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={
                  viewMode === 'masonry'
                    ? 'columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6'
                    : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                }
              >
                {filteredArtworks.map((artwork, index) => (
                  <motion.div
                    key={artwork.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`group cursor-pointer bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-[#D4A574]/30 hover:border-[#D4AF37] ${
                      viewMode === 'masonry' ? 'break-inside-avoid mb-6' : ''
                    }`}
                    onClick={() => setSelectedArtwork(artwork)}
                  >
                    {/* Image */}
                    <div className={`relative overflow-hidden ${viewMode === 'grid' ? 'h-64' : 'h-auto'}`}>
                      <Image
                        src={artwork.image}
                        alt={artwork.title}
                        width={600}
                        height={viewMode === 'grid' ? 400 : 800}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={90}
                        priority={index === 0 && artwork.image.includes('bits_and_pieces')}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {!artwork.available && (
                        <div className="absolute top-4 right-4 px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-full">
                          SOLD
                        </div>
                      )}
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white text-sm font-semibold px-6 py-3 bg-[#D4AF37] rounded-full">
                          View Details
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-[#3D2817] mb-1 group-hover:text-[#C17C2E] transition-colors">
                        {artwork.title}
                      </h3>
                      <p className="text-sm text-[#C17C2E] font-semibold mb-2">{artwork.artist}</p>
                      <div className="flex items-center justify-between text-xs text-[#6B4423] mb-3">
                        <span>{artwork.year}</span>
                        <span>{artwork.medium}</span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-[#D4A574]/30">
                        <span className="text-lg font-bold text-[#8B4513]">
                          {formatPrice(artwork.price)}
                        </span>
                        <span className="text-xs px-3 py-1 bg-[#F5EFE7] text-[#8B4513] rounded-full">
                          {artwork.category}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Artwork Lightbox/Modal */}
        <AnimatePresence>
          {selectedArtwork && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-y-auto"
              onClick={() => setSelectedArtwork(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedArtwork(null)}
                  className="sticky top-4 left-full ml-4 w-12 h-12 rounded-full bg-[#D4AF37] hover:bg-[#C17C2E] text-white transition-colors flex items-center justify-center z-10 shadow-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
                  {/* Image */}
                  <div className="relative h-96 md:h-full rounded-xl overflow-hidden border-4 border-[#D4AF37]">
                    <Image
                      src={selectedArtwork.image}
                      alt={selectedArtwork.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 80vw"
                      quality={90}
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <span className="inline-block px-4 py-2 bg-[#F5EFE7] text-[#8B4513] text-sm font-semibold rounded-full mb-4">
                        {selectedArtwork.category}
                      </span>
                      
                      <h2 className="text-3xl md:text-4xl font-bold text-[#3D2817] mb-3 font-serif">
                        {selectedArtwork.title}
                      </h2>
                      
                      <p className="text-xl text-[#C17C2E] font-semibold mb-6">{selectedArtwork.artist}</p>

                      <div className="w-16 h-1 bg-[#D4AF37] mb-6 rounded-full" />

                      {/* Artwork Info */}
                      <div className="space-y-4 mb-6">
                        <div className="flex justify-between py-2 border-b border-[#D4A574]/30">
                          <span className="text-sm text-[#6B4423]">Medium</span>
                          <span className="text-sm font-semibold text-[#3D2817]">{selectedArtwork.medium}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-[#D4A574]/30">
                          <span className="text-sm text-[#6B4423]">Dimensions</span>
                          <span className="text-sm font-semibold text-[#3D2817]">{selectedArtwork.dimensions}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-[#D4A574]/30">
                          <span className="text-sm text-[#6B4423]">Year</span>
                          <span className="text-sm font-semibold text-[#3D2817]">{selectedArtwork.year}</span>
                        </div>
                        <div className="flex justify-between py-2">
                          <span className="text-sm text-[#6B4423]">Availability</span>
                          <span className={`text-sm font-semibold ${selectedArtwork.available ? 'text-green-600' : 'text-red-600'}`}>
                            {selectedArtwork.available ? 'Available' : 'Sold'}
                          </span>
                        </div>
                      </div>

                      <p className="text-[#3D2817] leading-relaxed mb-6">
                        {selectedArtwork.description}
                      </p>
                    </div>

                    {/* Price & CTA */}
                    <div>
                      <div className="bg-[#F5EFE7] p-6 rounded-xl mb-6">
                        <p className="text-sm text-[#6B4423] mb-2">Price</p>
                        <p className="text-3xl font-bold text-[#8B4513]">
                          {formatPrice(selectedArtwork.price)}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <motion.button
                          onClick={() => handleAddToCart(selectedArtwork)}
                          disabled={!selectedArtwork.available}
                          whileHover={selectedArtwork.available ? { scale: 1.05 } : {}}
                          whileTap={selectedArtwork.available ? { scale: 0.98 } : {}}
                          className={`flex-1 py-4 rounded-lg font-bold text-lg transition-all duration-300 ${
                            selectedArtwork.available
                              ? 'bg-[#C17C2E] hover:bg-[#8B4513] text-white shadow-lg'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          {selectedArtwork.available ? 'Add to Cart' : 'Sold Out'}
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 py-4 bg-white border-2 border-[#D4AF37] hover:bg-[#D4AF37] text-[#3D2817] font-bold text-lg rounded-lg transition-all duration-300"
                        >
                          Inquire
                        </motion.button>
                      </div>
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