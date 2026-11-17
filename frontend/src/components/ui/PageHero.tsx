'use client';

import { motion } from 'framer-motion';

interface PageHeroProps {
  title: string;
  subtitle: string;
  /** Slightly tighter spacing (used on the shop, which has a filter bar right below). */
  compact?: boolean;
  /** Override the title size when a title is long. */
  titleClassName?: string;
}

/**
 * Page heading block for the inner pages. The title and subtitle sit on a frosted cream plaque with a
 * gold edge, so they stay readable over the batik background (the brown subtitle on the bare background
 * was only about 2.9:1 contrast; on the plaque it is about 8:1).
 */
export default function PageHero({ title, subtitle, compact = false, titleClassName = 'text-4xl md:text-6xl' }: PageHeroProps) {
  return (
    <section className={compact ? 'py-10 md:py-14 px-4 md:px-8' : 'py-12 md:py-20 px-4 md:px-8'}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mx-auto max-w-4xl rounded-2xl border border-[#D4AF37]/50 bg-[#FAF8F5]/90 px-5 py-8 text-center shadow-xl backdrop-blur-sm md:px-12 md:py-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={`${titleClassName} font-bold text-[#3D2817] mb-5 font-serif`}>{title}</h1>
          <div className="w-32 h-1 bg-[#D4AF37] mx-auto mb-6 rounded-full" />
          <p className="text-lg md:text-xl text-[#6B4423] max-w-3xl mx-auto leading-relaxed">{subtitle}</p>
        </motion.div>
      </div>
    </section>
  );
}
