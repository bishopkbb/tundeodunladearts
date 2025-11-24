import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/checkout', '/admin/', '/_next/', '/private/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/checkout', '/admin/', '/_next/', '/private/'],
        crawlDelay: 1,
      },
    ],
    sitemap: 'https://toacc.com/sitemap.xml',
  };
}

