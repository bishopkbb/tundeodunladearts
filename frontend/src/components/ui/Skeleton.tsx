import type { HTMLAttributes } from 'react';

/**
 * Loading placeholders. Warm tones match the site palette, the pulse is
 * disabled automatically for users who prefer reduced motion, and every
 * placeholder reserves the same space as the real content (no layout jump).
 */

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(' ');
}

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cx('rounded-md bg-[#E8DCC8]/70 motion-safe:animate-pulse', className)}
      {...props}
    />
  );
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cx('space-y-2', className)} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={cx('h-3', i === lines - 1 ? 'w-2/3' : 'w-full')} />
      ))}
    </div>
  );
}

/** Image on top, title and a couple of text lines below (artworks, exhibitions, press). */
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cx('rounded-xl overflow-hidden bg-white/70 border border-[#D4A574]/30 shadow-sm', className)}
    >
      <Skeleton className="aspect-[4/5] w-full rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <SkeletonText lines={2} />
        <Skeleton className="h-9 w-1/3 mt-2" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6, className }: { count?: number; className?: string }) {
  return (
    <div className={cx('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

/**
 * Whole-page skeleton used by the route `loading.tsx` files:
 * navbar bar, page heading block, then a content grid.
 */
export function PageSkeleton({ cards = 6 }: { cards?: number }) {
  return (
    <div className="min-h-screen bg-[#FAF8F5]" role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">Loading…</span>
      <div className="h-[64px] sm:h-20 bg-white/90 shadow-md" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="space-y-4 mb-10 max-w-2xl">
          <Skeleton className="h-10 w-2/3" />
          <SkeletonText lines={2} />
        </div>
        <SkeletonGrid count={cards} />
      </div>
    </div>
  );
}

/** Placeholder for a homepage section while its code-split chunk loads (reserves the same ~400px). */
export function SectionSkeleton({ cards = 3 }: { cards?: number }) {
  return (
    <section className="min-h-[400px] py-16 px-4 md:px-8" role="status" aria-busy="true">
      <span className="sr-only">Loading section…</span>
      <div className="max-w-7xl mx-auto">
        <div className="mx-auto mb-10 flex flex-col items-center gap-3" aria-hidden="true">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-80 max-w-full" />
        </div>
        <SkeletonGrid count={cards} />
      </div>
    </section>
  );
}

/** Staggered-height tiles that mirror the gallery's masonry columns. */
export function SkeletonMasonry({ count = 8 }: { count?: number }) {
  const heights = ['h-56', 'h-72', 'h-64', 'h-80', 'h-60', 'h-72', 'h-56', 'h-64'];
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 md:gap-7" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className={cx('mb-5 md:mb-7 break-inside-avoid w-full rounded-xl', heights[i % heights.length])} />
      ))}
    </div>
  );
}
