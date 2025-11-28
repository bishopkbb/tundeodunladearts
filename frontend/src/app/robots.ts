import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.tundeodunladearts.com';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/shop',
          '/gallery',
          '/exhibitions',
          '/about',
          '/contact',
          '/press',
        ],
        disallow: [
          '/api/',
          '/checkout',
          '/admin/',
          '/press-admin/',
          '/_next/',
          '/private/',
          '*.json',
          '*.xml',
          '/favicon.ico',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/shop',
          '/gallery',
          '/exhibitions',
          '/about',
          '/contact',
          '/press',
        ],
        disallow: [
          '/api/',
          '/checkout',
          '/admin/',
          '/press-admin/',
          '/_next/',
          '/private/',
        ],
        crawlDelay: 0,
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/Assets/',
        disallow: [],
      },
      {
        userAgent: 'Bingbot',
        allow: [
          '/',
          '/shop',
          '/gallery',
          '/exhibitions',
          '/about',
          '/contact',
          '/press',
        ],
        disallow: [
          '/api/',
          '/checkout',
          '/admin/',
          '/_next/',
          '/private/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

