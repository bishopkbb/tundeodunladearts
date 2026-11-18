'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import CartSidebar from '@/components/cart/CartSidebar';
import BatikBackground from '@/components/ui/BatikBackground';
import PageHero from '@/components/ui/PageHero';
import { highlightItems, type HighlightItem } from '@/lib/highlightsData';

type Filter = 'all' | 'photo' | 'video';

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'photo', label: 'Photos' },
  { key: 'video', label: 'Videos' },
];

export default function GalleryHighlightsPage() {
  const [filter, setFilter] = useState<Filter>('all');
  const [openId, setOpenId] = useState<string | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const counts = useMemo(
    () => ({
      all: highlightItems.length,
      photo: highlightItems.filter((i) => i.kind === 'photo').length,
      video: highlightItems.filter((i) => i.kind === 'video').length,
    }),
    []
  );

  const visible = useMemo(
    () => (filter === 'all' ? highlightItems : highlightItems.filter((i) => i.kind === filter)),
    [filter]
  );

  // The lightbox steps through photos only (videos play in place with their own controls).
  const photos = useMemo(() => visible.filter((i) => i.kind === 'photo'), [visible]);
  const openIndex = photos.findIndex((p) => p.id === openId);
  const openPhoto = openIndex >= 0 ? photos[openIndex] : null;

  const showAt = useCallback(
    (index: number) => {
      if (photos.length === 0) return;
      setOpenId(photos[(index + photos.length) % photos.length].id);
    },
    [photos]
  );

  useEffect(() => {
    if (!openPhoto) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenId(null);
      else if (e.key === 'ArrowRight') showAt(openIndex + 1);
      else if (e.key === 'ArrowLeft') showAt(openIndex - 1);
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [openPhoto, openIndex, showAt]);

  return (
    <>
      <BatikBackground motif="ibadandun" />

      <main className="relative z-10 min-h-screen pt-20">
        <Navbar />

        <PageHero
          title="Gallery Highlights"
          subtitle="Moments from our creative space: receptions, visitors, studio life and more"
        />

        <section className="px-4 pb-16 md:px-8 md:pb-24">
          <div className="mx-auto max-w-7xl">
            {/* Filter */}
            <div className="mb-8 flex flex-wrap items-center justify-center gap-3" role="tablist" aria-label="Filter highlights">
              {FILTERS.map(({ key, label }) => (
                <button
                  key={key}
                  role="tab"
                  aria-selected={filter === key}
                  onClick={() => setFilter(key)}
                  className={`rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${
                    filter === key
                      ? 'border-[#A8651F] bg-[#A8651F] text-white'
                      : 'border-[#D4AF37]/60 bg-[#FAF8F5]/90 text-[#6B3410] hover:bg-white'
                  }`}
                >
                  {label} <span className="opacity-70">({counts[key]})</span>
                </button>
              ))}
            </div>

            {/* Masonry: columns keep every photo at its natural proportions */}
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
              {visible.map((item, index) => (
                <HighlightCard key={item.id} item={item} index={index} onOpen={() => setOpenId(item.id)} />
              ))}
            </div>
          </div>
        </section>

        <Footer />
        <CartSidebar />
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {openPhoto && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-3 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenId(null)}
            onTouchStart={(e) => {
              touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            }}
            onTouchEnd={(e) => {
              const start = touchStart.current;
              touchStart.current = null;
              if (!start) return;
              const dx = e.changedTouches[0].clientX - start.x;
              const dy = e.changedTouches[0].clientY - start.y;
              if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) showAt(openIndex + (dx < 0 ? 1 : -1));
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
          >
            <button
              onClick={() => setOpenId(null)}
              className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white hover:bg-white/20"
              aria-label="Close"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {photos.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    showAt(openIndex - 1);
                  }}
                  className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30 md:left-6"
                  aria-label="Previous photo"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    showAt(openIndex + 1);
                  }}
                  className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30 md:right-6"
                  aria-label="Next photo"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            <figure className="flex max-h-full max-w-full flex-col items-center" onClick={(e) => e.stopPropagation()}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={openPhoto.src}
                alt={openPhoto.alt}
                className="max-h-[80vh] max-w-[94vw] rounded-lg border-2 border-[#D4AF37] object-contain shadow-2xl"
              />
              <figcaption className="mt-3 max-w-xl text-center text-sm text-white/85">
                {openPhoto.alt}
                <span className="ml-2 text-white/50">
                  {openIndex + 1} / {photos.length}
                </span>
              </figcaption>
            </figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function HighlightCard({ item, index, onOpen }: { item: HighlightItem; index: number; onOpen: () => void }) {
  const base =
    'mb-4 break-inside-avoid overflow-hidden rounded-xl border-2 border-[#D4AF37] bg-[#3D2817] shadow-lg';

  if (item.kind === 'video') {
    return (
      <motion.div
        className={base}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <video
          className="w-full bg-black object-contain"
          style={{ aspectRatio: `${item.width ?? 16} / ${item.height ?? 9}`, maxHeight: '80vh' }}
          src={item.src}
          poster={item.poster}
          controls
          playsInline
          preload="none"
          aria-label={item.alt}
        />
      </motion.div>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      className={`${base} group block w-full cursor-zoom-in text-left`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: Math.min(index, 6) * 0.05 }}
      aria-label={`Open photo: ${item.alt}`}
    >
      <Image
        src={item.src}
        alt={item.alt}
        width={item.width ?? 1080}
        height={item.height ?? 720}
        placeholder={item.blurDataURL ? 'blur' : 'empty'}
        blurDataURL={item.blurDataURL}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
      />
    </motion.button>
  );
}
