'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { events, sortEventsForDisplay } from '@/lib/eventsData';
import { calculateExhibitionStatus } from '@/lib/exhibitionUtils';

interface EventChip {
  label: string;
  href: string;
}

/** The next upcoming (or currently showing) event, if there is one. */
function findEventChip(): EventChip | null {
  const next = sortEventsForDisplay(events)[0];
  if (!next) return null;
  const status = calculateExhibitionStatus(next.startDate, next.endDate);
  if (status === 'past') return null;
  const when =
    status === 'current'
      ? 'Now showing'
      : `Opens ${new Date(`${next.startDate}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`;
  return { label: `${when}  |  ${next.cardTitle ?? next.title}`, href: `/exhibitions#exhibition-${next.id}` };
}

/**
 * Quiet hero text so the 3D gallery stays the focus: a small event chip and a one-line title at the top,
 * and the two main calls to action in a slim row at the bottom. The text areas let clicks and drags pass
 * through to the 3D scene; only the chip and the buttons are clickable.
 */
export default function HeroHeadline() {
  // Dates depend on "today", so the chip is worked out after mount to avoid a server/client mismatch.
  const [chip, setChip] = useState<EventChip | null>(null);
  useEffect(() => setChip(findEventChip()), []);

  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 px-4 pt-24 text-center sm:pt-28">
        {/* Reserved height so the layout does not jump when the chip appears */}
        <div className="mb-2 flex min-h-[30px] justify-center">
          {chip && (
            <Link
              href={chip.href}
              className="pointer-events-auto inline-flex max-w-[92vw] items-center gap-2 truncate rounded-full border border-[#D4AF37]/70 bg-black/25 px-3.5 py-1 text-[11px] font-semibold text-[#F2D675] backdrop-blur-sm transition-colors hover:bg-black/45 sm:text-xs"
            >
              <span className="truncate">{chip.label}</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>

        <motion.h1
          className="mx-auto max-w-6xl text-balance font-serif text-xl font-semibold leading-snug tracking-wide text-[#F5EFE7]/95 xs:text-2xl sm:text-3xl md:text-[2rem] lg:text-4xl"
          style={{ textShadow: '0 1px 10px rgba(42,22,8,0.55)' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Where African Heritage Meets Contemporary Art
        </motion.h1>
        <div className="mx-auto mt-2.5 h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" aria-hidden="true" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-30 flex justify-center gap-3 px-4 sm:bottom-10">
        <Link
          href="/exhibitions"
          className="pointer-events-auto inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#A8651F] px-5 py-2 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-[#8B4513]"
        >
          Explore the Collection
        </Link>
        <Link
          href="/gallery"
          className="pointer-events-auto inline-flex min-h-[44px] items-center justify-center rounded-full border border-[#D4AF37] bg-[#3D2817]/90 px-5 py-2 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-[#2C1810]"
        >
          Visit the Gallery
        </Link>
      </div>
    </>
  );
}
