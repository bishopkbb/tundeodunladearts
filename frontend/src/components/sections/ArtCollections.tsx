'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface CollectionImage {
  src: string;
  id: string;
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
  
  // 20251026 images (WA0053 to WA0059)
  for (let i = 59; i >= 53; i--) {
    images.push({
      id: `collection-20251026-${i}`,
      src: `/Assets/picturedoscope/IMG-20251026-WA${String(i).padStart(4, '0')}.jpg`,
    });
  }
  
  return images;
};

export default function ArtCollections() {
  const [images, setImages] = useState<CollectionImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<CollectionImage | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
          console.log(`Loaded ${data.images.length} collection images from API`);
          setImages(data.images);
        } else {
          // Fallback to generated images if API returns empty
          console.warn('API returned empty images array, using fallback');
          const collectionImages = generateCollectionImages();
          setImages(collectionImages);
        }
      } catch (error) {
        console.error('Error loading collection images from API, using fallback:', error);
        // Fallback to generated images on error
        const collectionImages = generateCollectionImages();
        setImages(collectionImages);
      } finally {
        setIsLoading(false);
      }
    }
    loadImages();
  }, []);

  const handleInquiry = (image: CollectionImage) => {
    const subject = encodeURIComponent(`Inquiry about Art Collection Image - ${image.id}`);
    const body = encodeURIComponent(
      `Hello,\n\nI am interested in learning more about this artwork from your collection.\n\nImage ID: ${image.id}\n\nPlease provide information about:\n- Availability\n- Pricing\n- Dimensions\n- Medium\n\nThank you!`
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

          {/* Masonry Grid Layout - Performance Optimized */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6">
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.2 }}
                className="mb-4 md:mb-6 break-inside-avoid group cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 bg-white">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={image.src}
                      alt={`Art collection piece ${image.id}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      quality={75}
                      className="object-cover"
                      loading="lazy"
                      onError={(e) => {
                        console.error(`Failed to load image: ${image.src}`);
                        const target = e.target as HTMLImageElement;
                        if (target && target.parentElement) {
                          target.parentElement.style.display = 'none';
                        }
                      }}
                    />
                    {/* Simplified overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                      <p className="text-white text-sm font-semibold">View</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

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
                  alt={`Art collection piece ${selectedImage.id}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 80vw"
                  quality={95}
                  className="object-contain"
                />
              </div>

              {/* Inquiry Section */}
              <div className="p-6 sm:p-8 bg-gradient-to-b from-white to-[#F5EFE7]">
                <h3 className="text-2xl font-bold text-[#3D2817] mb-4 font-serif">
                  Interested in this artwork?
                </h3>
                <p className="text-[#6B4423] mb-6">
                  Contact us for information about availability, pricing, dimensions, and more.
                </p>
                <motion.button
                  onClick={() => {
                    handleInquiry(selectedImage);
                    setSelectedImage(null);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-8 py-4 bg-[#C17C2E] hover:bg-[#8B4513] text-white font-bold rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
                >
                  Inquire About This Piece
                </motion.button>
                <p className="mt-4 text-sm text-[#6B4423]">
                  Email: <a href="mailto:info@tundeodunladearts.com" className="text-[#C17C2E] hover:underline font-semibold">info@tundeodunladearts.com</a>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

