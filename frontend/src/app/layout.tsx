import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/contexts/CartContext';
import { structuredData } from '@/lib/seo-config';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '700', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://toacc.com'),
  title: {
    default: 'Tunde Odunlade Arts & Culture Connexions | TOACC Gallery | African Art in Ibadan',
    template: '%s | TOACC Gallery',
  },
  description:
    'Celebrating African heritage through the art of Prince Tunde Odunlade. Discover contemporary African art, exhibitions, and cultural programs at TOACC Gallery in Ibadan, Nigeria. Buy authentic Nigerian artworks, experience Yoruba culture, and explore traditional batik art.',
  keywords: [
    'African art',
    'Nigerian art',
    'Tunde Odunlade',
    'Contemporary African art',
    'Art gallery Ibadan',
    'Nigerian contemporary artists',
    'Yoruba art',
    'African textile art',
    'Batik art Nigeria',
    'Cultural heritage',
    'Buy African art',
    'Art shop Nigeria',
    'TOACC Gallery',
    'Ibadan art gallery',
    'African cultural center',
    'Nigerian art exhibitions',
    'Adire patterns',
    'Contemporary African artists',
  ],
  authors: [{ name: 'Prince Tunde Odunlade' }],
  creator: 'Prince Tunde Odunlade',
  publisher: 'Tunde Odunlade Arts & Culture Connexions',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Tunde Odunlade Arts & Culture Connexions | TOACC Gallery',
    description: 'Celebrating African heritage through contemporary art. Discover authentic Nigerian artworks, exhibitions, and cultural programs in Ibadan.',
    type: 'website',
    locale: 'en_NG',
    alternateLocale: ['en_US', 'en_GB'],
    url: 'https://toacc.com',
    siteName: 'TOACC Gallery',
    images: [
      {
        url: '/Assets/logo.png',
        width: 1200,
        height: 630,
        alt: 'TOACC Gallery - African Art & Culture Connexions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tunde Odunlade Arts & Culture Connexions',
    description: 'Celebrating African heritage through contemporary art. Authentic Nigerian artworks in Ibadan.',
    images: ['/Assets/logo.png'],
    creator: '@tundeodunladearts',
    site: '@tundeodunladearts',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://toacc.com',
    languages: {
      'en-NG': 'https://toacc.com',
      'en-US': 'https://toacc.com',
    },
  },
  category: 'Art & Culture',
  icons: {
    icon: [
      { url: '/favicon.png', sizes: 'any' },
      { url: '/Assets/logo.png', sizes: 'any' },
    ],
    apple: [
      { url: '/favicon.png', sizes: '180x180' },
      { url: '/Assets/logo.png', sizes: '180x180' },
    ],
    shortcut: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        {/* Favicon - Multiple formats for better browser support */}
        <link rel="icon" type="image/png" href="/favicon.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/Assets/logo.png" sizes="any" />
        <link rel="apple-touch-icon" href="/Assets/logo.png" sizes="180x180" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="manifest" href="/manifest.json" />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans bg-[#FAF8F5] text-slate-900 transition-colors duration-300 antialiased w-full max-w-full overflow-x-hidden`}
      >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}