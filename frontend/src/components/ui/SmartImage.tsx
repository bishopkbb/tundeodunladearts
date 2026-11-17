'use client';

import Image, { type ImageProps } from 'next/image';
import { useCallback, useState } from 'react';

// Tiny warm-tone placeholder (matches the site's cream/tan palette) used as the blur-up image.
const WARM_BLUR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Crect width='8' height='8' fill='%23E8DCC8'/%3E%3C/svg%3E";

type SmartImageProps = Omit<ImageProps, 'fill' | 'width' | 'height' | 'placeholder'>;

/**
 * Drop-in replacement for `<Image fill />` with three states:
 *  - loading: warm blur placeholder + soft pulse behind the image
 *  - loaded:  the pulse fades out
 *  - failed:  a neutral "Image unavailable" panel instead of a broken image
 *
 * The parent must be `position: relative` (same requirement as `fill`).
 */
export default function SmartImage({ onLoad, onError, className, alt, ...props }: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  // Server-rendered images can finish loading before React hydrates, so onLoad never fires.
  // Checking `complete` on mount covers that case and avoids a placeholder stuck on top.
  const imgRef = useCallback((img: HTMLImageElement | null) => {
    if (img && img.complete && img.naturalWidth > 0) setLoaded(true);
  }, []);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt || 'Image unavailable'}
        className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#E8DCC8] text-[#8B4513]/70"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4-4a3 3 0 014 0l4 4m-2-2l1-1a3 3 0 014 0l2 2M4 6h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1z" />
        </svg>
        <span className="text-xs font-medium">Image unavailable</span>
      </div>
    );
  }

  return (
    <>
      <span
        aria-hidden="true"
        className={`absolute inset-0 bg-[#E8DCC8]/70 transition-opacity duration-300 ${
          loaded ? 'opacity-0' : 'opacity-100 motion-safe:animate-pulse'
        }`}
      />
      <Image
        ref={imgRef}
        fill
        alt={alt}
        placeholder="blur"
        blurDataURL={WARM_BLUR}
        className={className}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        onError={(e) => {
          setFailed(true);
          onError?.(e);
        }}
        {...props}
      />
    </>
  );
}
