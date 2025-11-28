// src/lib/seo-config.ts

import { Metadata } from 'next';

const siteConfig = {
  name: 'Tunde Odunlade Arts & Culture Connexions',
  shortName: 'TOACC',
  description:
    'Celebrating African heritage through contemporary art. Discover the vibrant works of Prince Tunde Odunlade and experience authentic Nigerian culture at TOACC Gallery in Ibadan.',
  url: 'https://www.tundeodunladearts.com',
  ogImage: '/Assets/og-image.jpg', // Create this 1200x630px image
  twitterHandle: '@tundeodunladearts',
  keywords: [
    'African art gallery',
    'Nigerian contemporary art',
    'Tunde Odunlade',
    'Ibadan art gallery',
    'African cultural heritage',
    'Contemporary African artists',
    'Nigerian art exhibitions',
    'Yoruba art',
    'African textile art',
    'Adire patterns',
    'Nigerian culture',
    'Art gallery Ibadan',
    'TOACC',
  ],
  location: {
    address: '2, Ladoke Akintola Avenue, Off Aare, New Bodija',
    city: 'Ibadan',
    state: 'Oyo State',
    country: 'Nigeria',
    phone: '+234 816 008 2118',
    email: 'info@tundeodunladearts.com',
  },
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.shortName}`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: 'Prince Tunde Odunlade' }],
  creator: 'Prince Tunde Odunlade',
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - African Art Gallery`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterHandle,
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
  verification: {
    google: 'your-google-verification-code', // Add after setting up Google Search Console
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

// Structured Data for Local Business
export const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ArtGallery',
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: siteConfig.location.phone,
  email: siteConfig.location.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.location.address,
    addressLocality: siteConfig.location.city,
    addressRegion: siteConfig.location.state,
    addressCountry: siteConfig.location.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '7.377758', // Update with exact coordinates
    longitude: '3.848057',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '10:00',
      closes: '19:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Sunday',
      opens: '14:00',
      closes: '19:00',
    },
  ],
  priceRange: '$$',
  image: siteConfig.ogImage,
  founder: {
    '@type': 'Person',
    name: 'Prince Tunde Odunlade',
    jobTitle: 'Artist & Gallery Founder',
  },
  sameAs: [
    'https://instagram.com/tundeodunladearts',
    'https://facebook.com/tundeodunladearts',
    'https://www.tiktok.com/@tunde.odunlade.ar',
  ],
};

export default siteConfig;