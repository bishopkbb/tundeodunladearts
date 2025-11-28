import type { Metadata } from 'next';
import { Inter, Playfair_Display, Dancing_Script, Kalam } from 'next/font/google';
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

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const kalam = Kalam({
  subsets: ['latin'],
  variable: '--font-kalam',
  weight: ['300', '400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.tundeodunladearts.com'),
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
    url: 'https://www.tundeodunladearts.com',
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
    canonical: 'https://www.tundeodunladearts.com',
    languages: {
      'en-NG': 'https://www.tundeodunladearts.com',
      'en-US': 'https://www.tundeodunladearts.com',
    },
  },
  category: 'Art & Culture',
  icons: {
    icon: [
      { url: '/Assets/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/Assets/logo.png', sizes: '16x16', type: 'image/png' },
      { url: '/Assets/logo.png', sizes: '192x192', type: 'image/png' },
      { url: '/Assets/logo.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/Assets/logo.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/Assets/logo.png',
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/Assets/logo.png',
      },
    ],
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
        {/* Favicon - Using Tunde Odunlade Logo */}
        <link rel="icon" type="image/png" href="/Assets/logo.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/Assets/logo.png" sizes="16x16" />
        <link rel="icon" type="image/png" href="/Assets/logo.png" sizes="192x192" />
        <link rel="icon" type="image/png" href="/Assets/logo.png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/Assets/logo.png" sizes="180x180" />
        <link rel="shortcut icon" type="image/png" href="/Assets/logo.png" />
        <link rel="manifest" href="https://www.tundeodunladearts.com/manifest.json" />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${dancingScript.variable} ${kalam.variable} font-sans bg-[#FAF8F5] text-slate-900 transition-colors duration-300 antialiased w-full max-w-full overflow-x-hidden`}
      >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}