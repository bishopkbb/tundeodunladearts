'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface CollectionImage {
  src: string;
  id: string;
  uniqueId?: string; // Human-readable unique identifier like "TOACC-001"
}

// Generate image paths for all picturedoscope images - fallback if API fails
const generateCollectionImages = (): CollectionImage[] => {
  const images: CollectionImage[] = [];
  
  // Generate all possible image paths based on file naming patterns
  // Date range: 20251026 (WA0053-WA0059), 20251121 (WA0042+), 20251125 (WA0271-WA0376)
  
  // 20251125 images (WA0271 to WA0376)
  for (let i = 376; i >= 271; i--) {
    images.push({
      id: `collection-20251125-${i}`,
      src: `/Assets/picturedoscope/IMG-20251125-WA${String(i).padStart(4, '0')}.jpg`,
    });
  }
  
  // 20251121 images (WA0042 onwards - estimate range based on file count, excluding WA0050)
  for (let i = 100; i >= 42; i--) {
    if (i !== 50) { // Exclude IMG-20251121-WA0050.jpg
      images.push({
        id: `collection-20251121-${i}`,
        src: `/Assets/picturedoscope/IMG-20251121-WA${String(i).padStart(4, '0')}.jpg`,
      });
    }
  }
  
  // 20251026 images excluded (WA0053 to WA0059 are removed)
  
  return images;
};

export default function ArtCollections() {
  const [images, setImages] = useState<CollectionImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<CollectionImage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Generate unique identifiers for images (TOACC-001, TOACC-002, etc.)
  const generateUniqueId = (index: number): string => {
    return `TOACC-${String(index + 1).padStart(3, '0')}`;
  };

  // Copy unique ID to clipboard
  const copyToClipboard = async (uniqueId: string) => {
    try {
      await navigator.clipboard.writeText(uniqueId);
      setCopiedId(uniqueId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  useEffect(() => {
    // Load collection images from API
    async function loadImages() {
      try {
        const response = await fetch('/api/collections/images');
        if (!response.ok) {
          throw new Error(`Failed to fetch images: ${response.status}`);
        }
        const data = await response.json();
        if (data.images && data.images.length > 0) {
          console.log(`✅ Loaded ${data.images.length} collection images from API`);
          // Add unique identifiers to each image
          const imagesWithIds = data.images.map((img: CollectionImage, index: number) => ({
            ...img,
            uniqueId: generateUniqueId(index),
          }));
          setImages(imagesWithIds);
        } else {
          // Fallback to generated images if API returns empty
          console.warn('⚠️ API returned empty images array, using fallback');
          const collectionImages = generateCollectionImages();
          console.log(`📸 Fallback: Generated ${collectionImages.length} images`);
          // Add unique identifiers to fallback images
          const imagesWithIds = collectionImages.map((img, index) => ({
            ...img,
            uniqueId: generateUniqueId(index),
          }));
          setImages(imagesWithIds);
        }
      } catch (error) {
        console.error('❌ Error loading collection images from API, using fallback:', error);
        // Fallback to generated images on error
        const collectionImages = generateCollectionImages();
        console.log(`📸 Fallback: Generated ${collectionImages.length} images`);
        // Add unique identifiers to fallback images
        const imagesWithIds = collectionImages.map((img, index) => ({
          ...img,
          uniqueId: generateUniqueId(index),
        }));
        setImages(imagesWithIds);
      } finally {
        setIsLoading(false);
      }
    }
    loadImages();
  }, []);

  const handleInquiry = (image: CollectionImage) => {
    const uniqueId = image.uniqueId || image.id;
    const subject = encodeURIComponent(`Inquiry about Artwork ${uniqueId} - Tunde Odunlade Arts`);
    const body = encodeURIComponent(
      `Hello,\n\nI am interested in learning more about this artwork from your collection.\n\nArtwork Reference: ${uniqueId}\n\nPlease provide information about:\n- Availability\n- Pricing\n- Dimensions\n- Medium\n- Artist Information\n\nThank you!\n\nBest regards`
    );
    window.location.href = `mailto:info@tundeodunladearts.com?subject=${subject}&body=${body}`;
  };

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-[#F5EFE7] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-[#D4A574] rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-[#D4A574]/50 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-[#F5EFE7] to-white">
        <div className="max-w-7xl mx-auto">

          {/* Click Indicator Banner */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37]/20 via-[#C17C2E]/20 to-[#D4AF37]/20 rounded-full border-2 border-[#D4AF37]/40 backdrop-blur-sm">
              <svg className="w-5 h-5 text-[#8B4513]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <p className="text-sm sm:text-base font-semibold text-[#3D2817]">
                Click on any artwork to view details
              </p>
              <svg className="w-5 h-5 text-[#8B4513]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </motion.div>

          {/* Masonry Grid Layout - Beautiful African-Themed Design */}
          {images.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#6B4423] font-semibold">Loading images...</p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 md:gap-7">
              {images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.4, delay: index * 0.02 }}
                className="mb-5 md:mb-7 break-inside-avoid group"
              >
                {/* African Pattern Frame Container */}
                <div 
                  className="relative cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
                  onClick={() => setSelectedImage(image)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedImage(image);
                    }
                  }}
                  aria-label={`View details for artwork ${image.id}`}
                >
                  {/* Outer Border - Kente-inspired Stripes - Behind everything */}
                  <div className="absolute -inset-1 bg-gradient-to-br from-[#D4AF37] via-[#C17C2E] to-[#8B4513] rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300 blur-sm pointer-events-none" style={{ zIndex: 0 }}></div>
                  
                  {/* Middle Border - Geometric Pattern - Behind main card */}
                  <div 
                    className="absolute -inset-0.5 rounded-xl opacity-40 group-hover:opacity-70 transition-opacity duration-300 pointer-events-none"
                    style={{
                      zIndex: 1,
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23D4AF37' stroke-width='2'%3E%3Cpath d='M0 0 L60 0 L60 60 L0 60 Z'/%3E%3Cpath d='M0 30 L60 30'/%3E%3Cpath d='M30 0 L30 60'/%3E%3Ccircle cx='15' cy='15' r='3'/%3E%3Ccircle cx='45' cy='15' r='3'/%3E%3Ccircle cx='15' cy='45' r='3'/%3E%3Ccircle cx='45' cy='45' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
                      backgroundSize: '30px 30px',
                    }}
                  ></div>

                  {/* Main Card */}
                  <div className="relative bg-white rounded-lg shadow-xl group-hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-[#D4AF37]/30" style={{ zIndex: 10 }}>
                    {/* Unique Identifier Badge */}
                    {image.uniqueId && (
                      <div className="absolute top-2 left-2 z-30 bg-[#D4AF37]/95 backdrop-blur-sm text-[#3D2817] px-2 py-1 rounded-md text-xs font-bold shadow-lg border border-[#C17C2E]/50">
                        {image.uniqueId}
                      </div>
                    )}

                    {/* Top Adire Pattern Border */}
                    <div 
                      className="h-2 bg-gradient-to-r from-transparent via-[#C17C2E] to-transparent"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='8' viewBox='0 0 40 8' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37'%3E%3Ccircle cx='5' cy='4' r='1.5'/%3E%3Ccircle cx='15' cy='4' r='1.5'/%3E%3Ccircle cx='25' cy='4' r='1.5'/%3E%3Ccircle cx='35' cy='4' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '20px 8px',
                      }}
                    ></div>
                    
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#F5EFE7] to-white p-1" style={{ zIndex: 20 }}>
                      <div className="relative w-full h-full rounded-sm overflow-hidden bg-white">
                        <Image
                          src={image.src}
                          alt={`Art collection piece ${image.uniqueId || image.id}`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                          quality={75}
                          className="object-cover transition-transform duration-500 group-hover:scale-110 relative"
                          style={{ zIndex: 30 }}
                          loading="lazy"
                          priority={index < 6}
                          unoptimized={true}
                          onError={(e) => {
                            console.error(`❌ Failed to load image: ${image.src}`);
                            console.error(`Image ID: ${image.id}`);
                            const target = e.target as HTMLImageElement;
                            if (target) {
                              console.error('Error details:', {
                                naturalWidth: target.naturalWidth,
                                naturalHeight: target.naturalHeight,
                                complete: target.complete,
                                src: target.src,
                                currentSrc: target.currentSrc || 'N/A'
                              });
                            }
                          }}
                          onLoad={() => {
                            if (index < 3) { // Only log first 3 to avoid spam
                              console.log(`✅ Successfully loaded: ${image.src}`);
                            }
                          }}
                        />
                        
                        {/* Hover Overlay with African Pattern */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#8B4513]/90 via-[#C17C2E]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          {/* Geometric Pattern Overlay */}
                          <div 
                            className="absolute inset-0 opacity-30"
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23F5EFE7' stroke-width='2' stroke-opacity='0.5'%3E%3Cpath d='M0 50 L100 50'/%3E%3Cpath d='M50 0 L50 100'/%3E%3Ccircle cx='50' cy='50' r='20'/%3E%3Ccircle cx='50' cy='50' r='35'/%3E%3C/g%3E%3C/svg%3E")`,
                              backgroundSize: '60px 60px',
                            }}
                          ></div>
                          
                          {/* Click to View Message */}
                          <div className="relative z-10 text-center px-4">
                            <div className="mb-2 inline-block p-2 bg-white/20 backdrop-blur-md rounded-full">
                              <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </div>
                            <p className="text-white font-bold text-sm md:text-base drop-shadow-lg">
                              Click to View
                            </p>
                            <p className="text-white/90 text-xs md:text-sm mt-1 drop-shadow-md">
                              {image.uniqueId && `Ref: ${image.uniqueId}`}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Adire Pattern Border */}
                    <div 
                      className="h-2 bg-gradient-to-r from-transparent via-[#C17C2E] to-transparent"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='8' viewBox='0 0 40 8' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37'%3E%3Ccircle cx='5' cy='4' r='1.5'/%3E%3Ccircle cx='15' cy='4' r='1.5'/%3E%3Ccircle cx='25' cy='4' r='1.5'/%3E%3Ccircle cx='35' cy='4' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '20px 8px',
                      }}
                    ></div>

                    {/* Side Pattern Accents */}
                    <div 
                      className="absolute left-0 top-0 bottom-0 w-1 opacity-50 group-hover:opacity-100 transition-opacity"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='4' height='40' viewBox='0 0 4 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37'%3E%3Crect x='0' y='5' width='2' height='10'/%3E%3Crect x='0' y='25' width='2' height='10'/%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '4px 20px',
                      }}
                    ></div>
                    <div 
                      className="absolute right-0 top-0 bottom-0 w-1 opacity-50 group-hover:opacity-100 transition-opacity"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='4' height='40' viewBox='0 0 4 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37'%3E%3Crect x='2' y='5' width='2' height='10'/%3E%3Crect x='2' y='25' width='2' height='10'/%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '4px 20px',
                      }}
                    ></div>
                  </div>
                </div>
              </motion.div>
              ))}
            </div>
          )}

          {/* Inquiry CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 md:mt-16 text-center"
          >
            <p className="text-lg text-[#6B4423] mb-6">
              Interested in a specific piece? Contact us for more information.
            </p>
            <motion.a
              href="mailto:info@tundeodunladearts.com?subject=General Inquiry about Art Collections"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 bg-[#C17C2E] hover:bg-[#8B4513] text-white font-bold rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Contact Us for Inquiries
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal for Selected Image */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-2 xs:p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 xs:w-12 xs:h-12 rounded-full bg-white/90 hover:bg-white text-[#3D2817] flex items-center justify-center transition-colors shadow-lg"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Image */}
              <div className="relative w-full h-[60vh] sm:h-[70vh]">
                <Image
                  src={selectedImage.src}
                  alt={`Art collection piece ${selectedImage.uniqueId || selectedImage.id}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 80vw"
                  quality={95}
                  className="object-contain"
                  unoptimized={true}
                  onError={(e) => {
                    console.error(`❌ Failed to load modal image: ${selectedImage.src}`);
                  }}
                />
              </div>

              {/* Inquiry Section */}
              <div className="p-6 sm:p-8 bg-gradient-to-b from-white to-[#F5EFE7]">
                {/* Unique Identifier Display */}
                {selectedImage.uniqueId && (
                  <div className="mb-6 flex items-center justify-between flex-wrap gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-lg border-2 border-[#D4AF37]/50 shadow-md">
                    <div>
                      <p className="text-sm text-[#6B4423] font-medium mb-1">Artwork Reference</p>
                      <p className="text-2xl font-bold text-[#3D2817] font-mono">{selectedImage.uniqueId}</p>
                    </div>
                    <motion.button
                      onClick={() => copyToClipboard(selectedImage.uniqueId!)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] hover:bg-[#C17C2E] text-[#3D2817] font-semibold rounded-lg transition-colors shadow-md"
                    >
                      {copiedId === selectedImage.uniqueId ? (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          <span>Copy ID</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                )}

                <h3 className="text-2xl font-bold text-[#3D2817] mb-2 font-serif">
                  Interested in this artwork?
                </h3>
                <p className="text-[#6B4423] mb-6">
                  Contact us for information about availability, pricing, dimensions, medium, and artist details. 
                  {selectedImage.uniqueId && ` Please mention reference ${selectedImage.uniqueId} in your inquiry.`}
                </p>

                {/* Inquiry Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <motion.button
                    onClick={() => handleInquiry(selectedImage)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 sm:flex-initial px-8 py-4 bg-[#C17C2E] hover:bg-[#8B4513] text-white font-bold rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Send Inquiry Email
                  </motion.button>
                  
                  <motion.a
                    href={`tel:+234123456789`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 sm:flex-initial px-8 py-4 bg-white hover:bg-[#F5EFE7] text-[#3D2817] font-bold rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg border-2 border-[#D4AF37] flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call Us
                  </motion.a>
                </div>

                <div className="pt-4 border-t border-[#D4AF37]/30">
                  <p className="text-sm text-[#6B4423] mb-2">
                    <span className="font-semibold">Email:</span>{' '}
                    <a href="mailto:info@tundeodunladearts.com" className="text-[#C17C2E] hover:underline font-semibold">
                      info@tundeodunladearts.com
                    </a>
                  </p>
                  <p className="text-xs text-[#6B4423]/80">
                    We typically respond within 24-48 hours. Please include the artwork reference in your inquiry for faster service.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

