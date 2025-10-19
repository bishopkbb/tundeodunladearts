import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Tunde Odunlade Arts & Culture Connexions | TOACC',
  description:
    'Celebrating African heritage through the art of Prince Tunde Odunlade. Discover contemporary African art, exhibitions, and cultural programs in Ibadan, Nigeria.',
  keywords: [
    'African art',
    'Tunde Odunlade',
    'Contemporary art',
    'Gallery',
    'Ibadan Nigeria',
    'Cultural heritage',
  ],
  openGraph: {
    title: 'Tunde Odunlade Arts & Culture Connexions',
    description: 'Celebrating African heritage through contemporary art',
    type: 'website',
    locale: 'en_NG',
  },
  robots: 'index, follow',
  metadataBase: new URL('https://toacc.com'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans bg-[#FAF8F5] text-slate-900 transition-colors duration-300`}
      >
        {children}
      </body>
    </html>
  );
}