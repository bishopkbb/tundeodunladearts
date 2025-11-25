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

const sortOptions = [
  { label: 'Featured First', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Newest First', value: 'newest' },
  { label: 'Title: A-Z', value: 'title-asc' },
];

export default function ShopPage() {
  const [artworks, setArtworks] = useState<Artwork[]>(staticArtworks);
  const [, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArtist, setSelectedArtist] = useState('All Artists');
  const maxPrice = useMemo(() => Math.max(...artworks.map(a => a.price)), [artworks]);
  const [priceRange, setPriceRange] = useState(() => {
    const max = Math.max(...staticArtworks.map(a => a.price));
    return [0, max];
  });
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const { addToCart } = useCart();

  // Fetch artworks from CMS on mount
  useEffect(() => {
    let cancelled = false;
    
    async function loadArtworks() {
      try {
        setIsLoading(true);
        const fetchedArtworks = await fetchArtworks(false);
        
        // Check if component is still mounted
        if (cancelled) return;
        
        // Ensure we have artworks
        if (fetchedArtworks && fetchedArtworks.length > 0) {
          setArtworks(fetchedArtworks);
          // Update price range if needed
          const newMax = Math.max(...fetchedArtworks.map(a => a.price));
          if (newMax > maxPrice && !isNaN(newMax)) {
            setPriceRange([0, newMax]);
          }
        } else {
          // Fallback if empty array
          setArtworks(staticArtworks);
        }
      } catch (error: unknown) {
        // Always fallback to static data on error
        if (!cancelled) {
          console.error('Failed to load artworks from CMS:', error);
          setArtworks(staticArtworks);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }
    
    loadArtworks();
    
    // Cleanup function
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty deps - only run once on mount (maxPrice is stable)

  // Generate categories and artists dynamically from artworks
  const categories = useMemo(() => {
    const cats = new Set(artworks.map(a => a.category));
    return ['All', ...Array.from(cats).sort()];
  }, [artworks]);

  const artists = useMemo(() => {
    const arts = new Set(artworks.map(a => a.artist));
    return ['All Artists', ...Array.from(arts).sort()];
  }, [artworks]);

  // Filter and sort artworks
  const filteredArtworks = useMemo(() => {
    const filtered = artworks.filter(artwork => {
      const categoryMatch = selectedCategory === 'All' || artwork.category === selectedCategory;
      const artistMatch = selectedArtist === 'All Artists' || artwork.artist === selectedArtist;
      const priceMatch = artwork.price >= priceRange[0] && artwork.price <= priceRange[1];
      return categoryMatch && artistMatch && priceMatch;
    });

    // Sort
    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'featured':
          return b.featured === a.featured ? 0 : b.featured ? 1 : -1;
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'newest':
          return b.year - a.year;
        case 'title-asc':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [selectedCategory, selectedArtist, priceRange, sortBy, artworks]);

  // Memoize formatter to prevent hydration mismatches
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

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedArtist('All Artists');
    setPriceRange([0, maxPrice]);
    setSortBy('featured');
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
        <section className="py-12 md:py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-[#3D2817] mb-4 font-serif">
                Art Shop
              </h1>
              <div className="w-32 h-1 bg-[#D4AF37] mx-auto mb-6 rounded-full" />
              <p className="text-lg md:text-xl text-[#6B4423] max-w-3xl mx-auto">
                Own authentic African art from our curated collection
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters & Sort Bar */}
        <section className="sticky top-20 z-40 bg-white/90 backdrop-blur-md border-y-2 border-[#D4AF37]/30 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#C17C2E] text-white font-semibold rounded-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters & Sort ({filteredArtworks.length})
              </button>

              {/* Desktop Filters */}
              <div className="hidden md:flex items-center gap-4 flex-wrap">
                <span className="text-sm font-semibold text-[#8B4513]">Filter by:</span>
                
                {/* Category */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 bg-white border-2 border-[#D4A574] rounded-lg text-sm font-medium text-[#6B4423] focus:border-[#C17C2E] focus:outline-none"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>

                {/* Artist */}
                <select
                  value={selectedArtist}
                  onChange={(e) => setSelectedArtist(e.target.value)}
                  className="px-4 py-2 bg-white border-2 border-[#D4A574] rounded-lg text-sm font-medium text-[#6B4423] focus:border-[#C17C2E] focus:outline-none"
                >
                  {artists.map(artist => (
                    <option key={artist} value={artist}>{artist}</option>
                  ))}
                </select>

                {/* Reset */}
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 text-sm font-medium text-[#C17C2E] hover:text-[#8B4513] underline"
                >
                  Reset All
                </button>
              </div>

              {/* Sort */}
              <div className="hidden md:flex items-center gap-3">
                <span className="text-sm font-semibold text-[#8B4513]">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-white border-2 border-[#D4A574] rounded-lg text-sm font-medium text-[#6B4423] focus:border-[#C17C2E] focus:outline-none"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              {/* Results Count */}
              <div className="text-sm font-semibold text-[#8B4513]">
                {filteredArtworks.length} {filteredArtworks.length === 1 ? 'artwork' : 'artworks'}
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 backdrop-blur-sm border-b-2 border-[#D4AF37]/30 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-bold text-[#8B4513] mb-3">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                      <motion.button
                        key={cat}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                          selectedCategory === cat
                            ? 'bg-[#C17C2E] text-white'
                            : 'bg-white border-2 border-[#D4A574] text-[#6B4423]'
                        }`}
                      >
                        {cat}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Artist Filter */}
                <div>
                  <label className="block text-sm font-bold text-[#8B4513] mb-3">Artist</label>
                  <select
                    value={selectedArtist}
                    onChange={(e) => setSelectedArtist(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-[#D4A574] rounded-lg font-medium text-[#6B4423]"
                  >
                    {artists.map(artist => (
                      <option key={artist} value={artist}>{artist}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-bold text-[#8B4513] mb-3">
                    Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    step="10000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full h-2 bg-[#D4A574] rounded-lg appearance-none cursor-pointer accent-[#C17C2E]"
                  />
                </div>

                {/* Sort */}
                <div>
                  <label className="block text-sm font-bold text-[#8B4513] mb-3">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-[#D4A574] rounded-lg font-medium text-[#6B4423]"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={resetFilters}
                    className="flex-1 px-4 py-3 bg-white border-2 border-[#D4A574] text-[#6B4423] font-semibold rounded-lg"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="flex-1 px-4 py-3 bg-[#C17C2E] text-white font-semibold rounded-lg"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products Grid */}
        <section className="py-12 md:py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              {filteredArtworks.length > 0 ? (
                <motion.div
                  key={`${selectedCategory}-${selectedArtist}-${sortBy}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {filteredArtworks.map((artwork, index) => (
                    <motion.div
                      key={artwork.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="group"
                    >
                      <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-[#D4A574]/30 hover:border-[#D4AF37]">
                        {/* Image */}
                        <div 
                          className="relative h-64 overflow-hidden cursor-pointer"
                          onClick={() => setSelectedArtwork(artwork)}
                        >
                          <Image
                            src={artwork.image}
                            alt={artwork.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            quality={90}
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          {/* Badges */}
                          <div className="absolute top-3 left-3 flex flex-col gap-2">
                            {artwork.featured && (
                              <span className="px-3 py-1 bg-[#FFD700] text-[#3D2817] text-xs font-bold rounded-full">
                                FEATURED
                              </span>
                            )}
                            {!artwork.available && (
                              <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full">
                                SOLD
                              </span>
                            )}
                          </div>
                          {/* Quick View Overlay */}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="px-6 py-3 bg-white text-[#3D2817] font-bold rounded-full text-sm">
                              Quick View
                            </span>
                          </div>
                        </div>

                        {/* Info */}
                        <div className="p-5">
                          <h3 className="text-lg font-bold text-[#3D2817] mb-1 line-clamp-1 group-hover:text-[#C17C2E] transition-colors">
                            {artwork.title}
                          </h3>
                          <p className="text-sm text-[#C17C2E] font-semibold mb-3">{artwork.artist}</p>
                          
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-xl font-bold text-[#8B4513]">
                              {formatPrice(artwork.price)}
                            </span>
                            <span className="text-xs px-2 py-1 bg-[#F5EFE7] text-[#8B4513] rounded-full">
                              {artwork.category}
                            </span>
                          </div>

                          {/* Add to Cart Button */}
                          <motion.button
                            onClick={() => handleAddToCart(artwork)}
                            disabled={!artwork.available}
                            whileHover={artwork.available ? { scale: 1.02, y: -2 } : {}}
                            whileTap={artwork.available ? { scale: 0.98 } : {}}
                            className={`w-full py-3 rounded-lg font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                              artwork.available
                                ? 'bg-[#C17C2E] hover:bg-[#8B4513] text-white shadow-md hover:shadow-lg'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            {artwork.available ? (
                              <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                Add to Cart
                              </>
                            ) : (
                              'Sold Out'
                            )}
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <svg className="w-24 h-24 mx-auto text-[#D4A574] mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 12h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-2xl font-bold text-[#3D2817] mb-4">No artworks found</h3>
                  <p className="text-[#6B4423] mb-6">Try adjusting your filters to see more results</p>
                  <button
                    onClick={resetFilters}
                    className="px-8 py-3 bg-[#C17C2E] hover:bg-[#8B4513] text-white font-bold rounded-lg transition-colors"
                  >
                    Reset Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Quick View Modal */}
        <AnimatePresence>
          {selectedArtwork && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-2 xs:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto touch-manipulation"
              onClick={() => setSelectedArtwork(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-xl sm:rounded-2xl max-w-[95vw] sm:max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl relative touch-manipulation"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedArtwork(null)}
                  className="sticky top-2 xs:top-4 right-2 xs:right-4 ml-auto z-10 w-10 h-10 xs:w-12 xs:h-12 rounded-full bg-white/90 hover:bg-white active:bg-gray-100 text-[#3D2817] transition-colors flex items-center justify-center shadow-lg touch-manipulation"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="grid md:grid-cols-2">
                  {/* Image */}
                  <div className="relative h-64 xs:h-80 sm:h-96 md:h-full min-h-[250px]">
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
                  <div className="p-4 xs:p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <span className="inline-block px-3 py-1 bg-[#F5EFE7] text-[#8B4513] text-sm font-semibold rounded-full mb-4">
                        {selectedArtwork.category}
                      </span>
                      <h2 className="text-3xl font-bold text-[#3D2817] mb-2 font-serif">
                        {selectedArtwork.title}
                      </h2>
                      <p className="text-lg text-[#C17C2E] font-semibold mb-6">{selectedArtwork.artist}</p>
                      
                      <p className="text-[#3D2817] leading-relaxed mb-6">
                        {selectedArtwork.description}
                      </p>

                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-sm">
                          <span className="text-[#6B4423]">Medium:</span>
                          <span className="font-semibold text-[#3D2817]">{selectedArtwork.medium}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[#6B4423]">Dimensions:</span>
                          <span className="font-semibold text-[#3D2817]">{selectedArtwork.dimensions}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[#6B4423]">Year:</span>
                          <span className="font-semibold text-[#3D2817]">{selectedArtwork.year}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="bg-[#F5EFE7] p-4 rounded-lg mb-4">
                        <p className="text-sm text-[#6B4423] mb-1">Price</p>
                        <p className="text-3xl font-bold text-[#8B4513]">
                          {formatPrice(selectedArtwork.price)}
                        </p>
                      </div>

                      <motion.button
                        onClick={() => handleAddToCart(selectedArtwork)}
                        disabled={!selectedArtwork.available}
                        whileHover={selectedArtwork.available ? { scale: 1.02 } : {}}
                        whileTap={selectedArtwork.available ? { scale: 0.98 } : {}}
                        className={`w-full py-3 xs:py-4 rounded-lg font-bold text-base xs:text-lg transition-all duration-300 flex items-center justify-center gap-2 touch-manipulation ${
                          selectedArtwork.available
                            ? 'bg-[#C17C2E] hover:bg-[#8B4513] active:bg-[#6B3410] text-white shadow-lg'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {selectedArtwork.available ? (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            Add to Cart
                          </>
                        ) : (
                          'Sold Out'
                        )}
                      </motion.button>
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