import { MetadataRoute } from 'next';
import { fetchExhibitions } from '@/lib/cmsData';
import { allArtworks } from '@/lib/artworksData';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.tundeodunladearts.com';
  const currentDate = new Date();

  // Base pages with high priority
  const basePages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/exhibitions`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/press`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Fetch exhibitions dynamically (with fallback)
  let exhibitions: MetadataRoute.Sitemap = [];
  try {
    const fetchedExhibitions = await fetchExhibitions(false);
    if (fetchedExhibitions && fetchedExhibitions.length > 0) {
      exhibitions = fetchedExhibitions.map((exhibition) => ({
        url: `${baseUrl}/exhibitions#exhibition-${exhibition.id}`,
        lastModified: exhibition.endDate 
          ? new Date(exhibition.endDate) 
          : new Date(exhibition.startDate),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error('Error fetching exhibitions for sitemap:', error);
    // Use static exhibitions from exhibitions page as fallback
    exhibitions = [
      {
        url: `${baseUrl}/exhibitions#exhibition-1`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      },
      {
        url: `${baseUrl}/exhibitions#exhibition-2`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      },
      {
        url: `${baseUrl}/exhibitions#exhibition-3`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      },
      {
        url: `${baseUrl}/exhibitions#exhibition-4`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      },
      {
        url: `${baseUrl}/exhibitions#exhibition-5`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      },
      {
        url: `${baseUrl}/exhibitions#exhibition-6`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      },
    ];
  }

  // Add featured artworks (high-value pages for SEO)
  const featuredArtworks = allArtworks
    .filter((artwork) => artwork.featured || artwork.available)
    .slice(0, 20) // Limit to top 20 for performance
    .map((artwork) => ({
      url: `${baseUrl}/shop#artwork-${artwork.id}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

  return [...basePages, ...exhibitions, ...featuredArtworks];
}

