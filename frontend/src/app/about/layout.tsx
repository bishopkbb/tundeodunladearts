import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Tunde Odunlade & TOACC Gallery | Ibadan Art Center',
  description:
    'Learn about Prince Tunde Odunlade, renowned Nigerian artist and founder of TOACC Gallery. Discover our mission to celebrate African heritage through contemporary art in Ibadan, Nigeria.',
  keywords: [
    'Tunde Odunlade biography',
    'Nigerian artist',
    'TOACC Gallery about',
    'Ibadan art center',
    'African art gallery',
    'batik artist Nigeria',
    'contemporary African artist',
    'art gallery founder',
  ],
  openGraph: {
    title: 'About Us | Tunde Odunlade & TOACC Gallery',
    description: 'Learn about Prince Tunde Odunlade and TOACC Gallery\'s mission to celebrate African heritage through art.',
    type: 'website',
    url: 'https://toacc.com/about',
  },
  alternates: {
    canonical: 'https://toacc.com/about',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

