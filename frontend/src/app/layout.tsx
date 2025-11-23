import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/contexts/CartContext';

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
    default: 'Tunde Odunlade Arts & Culture Connexions | TOACC',
    template: '%s | TOACC',
  },
  description:
    'Celebrating African heritage through the art of Prince Tunde Odunlade. Discover contemporary African art, exhibitions, and cultural programs in Ibadan, Nigeria.',
  keywords: [
    'African art',
    'Tunde Odunlade',
    'Contemporary art',
    'Gallery',
    'Ibadan Nigeria',
    'Cultural heritage',
    'Buy African art',
    'Art shop',
  ],
  openGraph: {
    title: 'Tunde Odunlade Arts & Culture Connexions',
    description: 'Celebrating African heritage through contemporary art',
    type: 'website',
    locale: 'en_NG',
    url: 'https://toacc.com',
    siteName: 'TOACC Gallery',
  },
  robots: {
    index: true,
    follow: true,
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        {/* Favicon */}
        <link rel="icon" href="/Assets/logo.png" sizes="any" />
        <link rel="apple-touch-icon" href="/Assets/logo.png" />
        <link rel="shortcut icon" href="/Assets/logo.png" />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans bg-[#FAF8F5] text-slate-900 transition-colors duration-300 antialiased`}
      >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}