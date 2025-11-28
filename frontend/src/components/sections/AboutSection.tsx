'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' as const },
  },
};

const videoVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: 'easeOut' as const },
  },
};

export default function AboutSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const handleVideoEnd = () => {
    if (videoRef.current) {
      videoRef.current.load(); // Reload video to show poster
    }
  };

  // Lazy load video when it enters viewport
  useEffect(() => {
    if (!videoContainerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldLoadVideo) {
            setShouldLoadVideo(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '100px' } // Start loading 100px before video enters viewport
    );

    observer.observe(videoContainerRef.current);
    return () => observer.disconnect();
  }, [shouldLoadVideo]);

  return (
    <section
      id="about"
      className="py-16 xs:py-20 md:py-32 px-4 xs:px-6 md:px-8 bg-white/90 backdrop-blur-sm w-full"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#3D2817] mb-4 font-serif">
            About TOACC
          </h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto rounded-full" />
        </motion.div>

        {/* Two Column Layout */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Left: Video */}
          <motion.div variants={videoVariants} className="order-2 lg:order-1 lg:sticky lg:top-24">
            <div ref={videoContainerRef} className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl bg-black">
              {shouldLoadVideo ? (
                <video
                  ref={videoRef}
                  src="/Assets/ghighlight.mp4"
                  controls
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center 20%' }}
                  poster="/Assets/cover1.jpg"
                  preload="metadata"
                  playsInline
                  onEnded={handleVideoEnd}
                  width={1280}
                  height={720}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                // Placeholder with poster image while video loads
                <div className="relative w-full h-full">
                  <Image
                    src="/Assets/cover1.jpg"
                    alt="TOACC Gallery Video Preview"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={85}
                    className="object-cover"
                    style={{ objectPosition: 'center 20%' }}
                    priority={false}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                      <svg className="w-8 h-8 text-[#C17C2E]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <p className="text-sm text-[#6B4423] mt-4 text-center italic">
              Take a visual journey through TOACC where ancestral wisdom meets contemporary creativity
            </p>
          </motion.div>

          {/* Right: Text Content */}
          <motion.div variants={itemVariants} className="order-1 lg:order-2">
            <div className="space-y-5 text-[#3D2817] leading-relaxed">
              <p className="text-lg md:text-xl font-serif italic text-[#C17C2E]">
                Where art breathes, culture speaks, and stories live.
              </p>
              
              <p className="text-base md:text-lg">
                Founded in Ibadan by master artist <strong className="text-[#8B4513]">Prince Tunde Odunlade</strong>, TOACC brings together tradition and innovation in one vibrant creative space. Yoruba indigo patterns blend with music and craftsmanship to express the richness of African identity.
              </p>
              
              <p className="text-base md:text-lg">
                Every wall tells a story. Every sound carries meaning. Every stroke speaks of purpose, connection, and pride. We believe art has the power to heal and transform. That&apos;s why we work to inspire, unite, and celebrate the soul of our people.
              </p>
              
              <p className="text-lg md:text-xl font-serif italic text-[#8B4513] pt-4">
                Step inside. Feel the rhythm. Experience art with purpose.
              </p>
            
              {/* CTA Button */}
              <motion.div
                className="pt-6"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/about"
                  className="inline-block px-8 py-4 bg-[#C17C2E] hover:bg-[#8B4513] text-white font-bold text-lg rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Learn More About Us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}