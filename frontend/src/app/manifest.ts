import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Tunde Odunlade Arts & Culture Connexions',
    short_name: 'TOACC',
    description: 'Celebrating African heritage through contemporary art. Discover authentic Nigerian artworks in Ibadan.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAF8F5',
    theme_color: '#C17C2E',
    icons: [
      {
        src: '/favicon.png',
        sizes: 'any',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/Assets/logo.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/Assets/logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: ['art', 'culture', 'shopping'],
    lang: 'en-NG',
    orientation: 'portrait-primary',
  };
}

