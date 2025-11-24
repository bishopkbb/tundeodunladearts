import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Visit TOACC Gallery in Ibadan | Art Gallery Location',
  description:
    'Contact TOACC Gallery in Ibadan, Nigeria. Visit us at 2, Ladoke Akintola Avenue, Off Aare, New Bodija. Call +234 816 008 2118 or email info@tundeodunladearts.com.',
  keywords: [
    'TOACC Gallery contact',
    'art gallery Ibadan address',
    'Nigerian art gallery location',
    'visit art gallery Ibadan',
    'gallery hours Ibadan',
    'contact art gallery',
    'Ibadan art center contact',
  ],
  openGraph: {
    title: 'Contact Us | TOACC Gallery - Ibadan, Nigeria',
    description: 'Contact TOACC Gallery in Ibadan. Visit us or reach out via phone, email, or social media.',
    type: 'website',
    url: 'https://toacc.com/contact',
  },
  alternates: {
    canonical: 'https://toacc.com/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

