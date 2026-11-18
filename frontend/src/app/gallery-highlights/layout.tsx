import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery Highlights | Photos & Videos | TOACC Gallery',
  description:
    'Photos and videos from TOACC Gallery in Ibadan: exhibition receptions, visitors, studio life and moments with Prince Tunde Odunlade.',
  openGraph: {
    title: 'Gallery Highlights | TOACC',
    description: 'Photos and videos from TOACC Gallery in Ibadan.',
    type: 'website',
    url: 'https://toacc.com/gallery-highlights',
  },
  alternates: {
    canonical: 'https://toacc.com/gallery-highlights',
  },
};

export default function GalleryHighlightsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
