import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery | Contemporary African Art Collection | TOACC Gallery',
  description:
    'Explore our curated collection of contemporary African art, featuring works by Tunde Odunlade and other renowned Nigerian artists. Discover batik art, textile art, and modern artistic expressions.',
  keywords: [
    'African art gallery',
    'contemporary African art',
    'Nigerian art gallery',
    'batik art collection',
    'textile art exhibition',
    'Tunde Odunlade gallery',
    'modern African art',
    'Ibadan art gallery',
    'art collection Nigeria',
  ],
  openGraph: {
    title: 'Gallery | TOACC - Contemporary African Art Collection',
    description: 'Explore our curated collection of contemporary African art featuring works by renowned Nigerian artists.',
    type: 'website',
    url: 'https://toacc.com/gallery',
  },
  alternates: {
    canonical: 'https://toacc.com/gallery',
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

