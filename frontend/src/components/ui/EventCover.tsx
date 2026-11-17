'use client';

import Image from 'next/image';
import SmartImage from '@/components/ui/SmartImage';

interface EventCoverProps {
  src: string;
  alt: string;
  /** 'contain' shows the whole image (flyers); 'cover' crops to fill (photos). */
  fit?: 'cover' | 'contain';
  sizes: string;
  priority?: boolean;
  quality?: number;
  /** Extra classes for the foreground image (e.g. a hover zoom, only applied when cropping). */
  zoomClassName?: string;
}

/**
 * Cover image for events. Flyers contain text, so they are shown in full over a blurred copy of
 * themselves instead of being cropped. The backdrop uses a tiny (64px) version of the same image,
 * so it costs about 2 KB. Photos keep the usual cropped look.
 * The parent must be `position: relative` with a fixed height.
 */
export default function EventCover({ src, alt, fit = 'cover', sizes, priority, quality = 85, zoomClassName = '' }: EventCoverProps) {
  if (fit === 'contain') {
    return (
      <>
        <Image
          src={src}
          alt=""
          aria-hidden="true"
          fill
          sizes="64px"
          className="object-cover scale-125 blur-2xl opacity-70"
        />
        <SmartImage
          src={src}
          alt={alt}
          sizes={sizes}
          quality={quality}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          className="object-contain"
        />
      </>
    );
  }

  return (
    <SmartImage
      src={src}
      alt={alt}
      sizes={sizes}
      quality={quality}
      priority={priority}
      loading={priority ? undefined : 'lazy'}
      className={`object-cover ${zoomClassName}`}
    />
  );
}
