'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const galleryImages = [
  {
    id: 1,
    src: '/Assets/hero1.jpg',
    title: 'Inside the Gallery',
    description: 'Contemporary African art in a vibrant space',
    fallback: '/Assets/gallery1.jpg',
  },
  {
    id: 2,
    src: '/Assets/gallery1.jpg',
    title: 'Cultural Performance',
    description: 'Live artistic expressions and storytelling',
    fallback: '/Assets/gallery2.jpg',
  },
  {
    id: 3,
    src: '/Assets/gallery5.jpg',
    title: 'Art Workshop',
    description: 'Mentorship and creative learning',
    fallback: '/Assets/gallery3.jpg',
  },
  {
    id: 4,
    src: '/Assets/gallery2.jpg',
    title: 'Exhibition Opening',
    description: 'Community gathering and celebration',
    fallback: '/Assets/gallery4.jpg',
  },
  {
    id: 5,
    src: '/Assets/workspace.jpg',
    title: 'Work Space',
    description: 'Where arts are brought to life',
    fallback: '/Assets/gallery1.jpg',
  },
  {
    id: 6,
    src: '/Assets/dance.jpg',
    title: 'Dance Performance',
    description: 'Creating heritage through rhythm and movement',
    fallback: '/Assets/gallery2.jpg',
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function GalleryHighlights() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isHovered, setIsHovered] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [currentImageSrc, setCurrentImageSrc] = useState<string>('');

  const imageIndex = ((page % galleryImages.length) + galleryImages.length) % galleryImages.length;
  const currentImage = galleryImages[imageIndex];

  // Update image source when index changes
  useEffect(() => {
    if (imageErrors.has(imageIndex)) {
      setCurrentImageSrc(currentImage.fallback);
    } else {
      setCurrentImageSrc(currentImage.src);
    }
  }, [imageIndex, imageErrors, currentImage.src, currentImage.fallback]);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        paginate(1);
      }, 5000);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, isHovered]); // paginate is stable and doesn't need to be in deps

  return (
    <section
      id="gallery-highlights"
      className="relative py-12 xs:py-16 md:py-24 px-4 xs:px-6 md:px-8 bg-[#F5F0E8]/95 backdrop-blur-sm overflow-hidden w-full"
    >
      {/* Subtle Batik Pattern Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%238B4513' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Ccircle cx='50' cy='10' r='2'/%3E%3Ccircle cx='10' cy='50' r='2'/%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 md:mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#3D2817] mb-3 font-serif">
            Gallery Highlights
          </h2>
          <p className="text-sm md:text-base text-[#6B4423] max-w-2xl mx-auto">
            A glimpse into our vibrant creative space
          </p>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Carousel Container */}
        <div
          className="relative w-full max-w-5xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Carousel */}
          <div className="relative h-[350px] md:h-[450px] overflow-hidden rounded-2xl shadow-2xl">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.5 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={currentImageSrc || currentImage.src}
                    alt={currentImage.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 80vw"
                    quality={90}
                    priority
                    className="object-cover"
                    onError={() => {
                      console.error(`❌ Failed to load image: ${currentImageSrc || currentImage.src} (Index: ${imageIndex})`);
                      // Try fallback if primary image fails
                      if (currentImageSrc === currentImage.src && currentImage.fallback) {
                        console.log(`🔄 Trying fallback image: ${currentImage.fallback}`);
                        setCurrentImageSrc(currentImage.fallback);
                      } else {
                        // Mark as error if fallback also fails
                        setImageErrors(prev => new Set(prev).add(imageIndex));
                      }
                    }}
                  />

                  {/* Always visible subtle caption overlay */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-6 md:p-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    <motion.h3
                      className="text-lg md:text-2xl font-semibold text-white/95 mb-1 font-serif"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                    >
                      {galleryImages[imageIndex].title}
                    </motion.h3>
                    <motion.p
                      className="text-sm md:text-base text-white/75"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.6 }}
                    >
                      {galleryImages[imageIndex].description}
                    </motion.p>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="Previous image"
          >
            <svg className="w-6 h-6 text-[#8B4513]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => paginate(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="Next image"
          >
            <svg className="w-6 h-6 text-[#8B4513]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setPage([index, index > imageIndex ? 1 : -1])}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === imageIndex
                    ? 'w-8 bg-[#D4AF37]'
                    : 'w-2 bg-[#D4AF37]/30 hover:bg-[#D4AF37]/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            className="text-center mt-8 md:mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <a
                href="/gallery"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#C17C2E] hover:bg-[#8B4513] text-white font-bold text-lg rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Explore Full Gallery
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}