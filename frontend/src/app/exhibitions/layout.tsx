import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Exhibitions & Events | Art Shows in Ibadan | TOACC Gallery',
  description:
    'Discover upcoming art exhibitions, cultural festivals, and events at TOACC Gallery in Ibadan. Join us for premier showcases of contemporary African art and Yoruba cultural celebrations.',
  keywords: [
    'art exhibitions Ibadan',
    'African art exhibitions',
    'cultural festivals Nigeria',
    'art events Ibadan',
    'gallery exhibitions',
    'Yoruba art festivals',
    'contemporary art shows',
    'TOACC exhibitions',
    'art gallery events',
  ],
  openGraph: {
    title: 'Exhibitions & Events | TOACC Gallery - Ibadan Art Shows',
    description: 'Discover upcoming art exhibitions, cultural festivals, and events at TOACC Gallery in Ibadan.',
    type: 'website',
    url: 'https://toacc.com/exhibitions',
  },
  alternates: {
    canonical: 'https://toacc.com/exhibitions',
  },
};

export default function ExhibitionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

