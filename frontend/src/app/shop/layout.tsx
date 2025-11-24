import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Art Shop | Buy Authentic Nigerian Artworks Online | TOACC Gallery',
  description:
    'Browse and purchase authentic Nigerian artworks, batik art, textile art, and contemporary pieces from renowned artists including Tunde Odunlade. Shop exclusive African art collections online.',
  keywords: [
    'buy African art online',
    'Nigerian art for sale',
    'batik art shop',
    'contemporary African art',
    'textile art Nigeria',
    'Tunde Odunlade artworks',
    'art gallery shop',
    'authentic Nigerian art',
    'African art collection',
    'artwork for sale Nigeria',
  ],
  openGraph: {
    title: 'Art Shop | TOACC Gallery - Authentic Nigerian Artworks',
    description: 'Browse and purchase authentic Nigerian artworks, batik art, and contemporary pieces online.',
    type: 'website',
    url: 'https://toacc.com/shop',
  },
  alternates: {
    canonical: 'https://toacc.com/shop',
  },
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

