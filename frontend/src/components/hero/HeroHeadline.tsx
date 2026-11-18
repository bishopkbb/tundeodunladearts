'use client';

import Link from 'next/link';

/**
 * Hero overlay: just the two main calls to action in a slim row at the bottom, so the 3D gallery has the
 * whole hero to itself. The page heading is kept for search engines and screen readers but is not shown.
 * The row lets clicks and drags pass through to the 3D scene; only the two buttons are clickable.
 */
export default function HeroHeadline() {
  return (
    <>
      <h1 className="sr-only">Where African Heritage Meets Contemporary Art</h1>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-30 flex flex-wrap justify-center gap-2 px-3 sm:bottom-10 sm:gap-3 sm:px-4">
        <Link
          href="/exhibitions"
          className="pointer-events-auto inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#A8651F] whitespace-nowrap px-4 py-2 text-[13px] font-semibold sm:px-5 sm:text-sm text-white shadow-lg transition-colors hover:bg-[#8B4513]"
        >
          Explore the Collection
        </Link>
        <Link
          href="/gallery"
          className="pointer-events-auto inline-flex min-h-[44px] items-center justify-center rounded-full border border-[#D4AF37] bg-[#3D2817]/90 whitespace-nowrap px-4 py-2 text-[13px] font-semibold sm:px-5 sm:text-sm text-white shadow-lg transition-colors hover:bg-[#2C1810]"
        >
          Visit the Gallery
        </Link>
      </div>
    </>
  );
}
