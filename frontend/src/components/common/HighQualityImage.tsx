import Image from 'next/image';
import { ComponentProps } from 'react';

interface HighQualityImageProps extends Omit<ComponentProps<typeof Image>, 'quality'> {
  quality?: number;
}

/**
 * High-quality Image wrapper component
 * Ensures all images are optimized with high quality (90) by default
 * Automatically provides proper sizes for responsive images
 */
export default function HighQualityImage({
  quality = 90,
  sizes,
  className,
  ...props
}: HighQualityImageProps) {
  // Default sizes for responsive images if not provided
  const defaultSizes = props.fill
    ? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
    : sizes;

  return (
    <Image
      {...props}
      quality={quality}
      sizes={defaultSizes}
      className={className}
      alt={props.alt || ''}
      // Remove unoptimized to enable Next.js optimization
      // Next.js will automatically convert to WebP/AVIF for better quality and smaller file sizes
    />
  );
}

