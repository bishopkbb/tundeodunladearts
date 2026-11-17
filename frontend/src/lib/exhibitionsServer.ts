import { sanityClient, exhibitionsQuery, featuredExhibitionsQuery } from '@/lib/sanity';
import { calculateExhibitionStatus } from '@/lib/exhibitionUtils';

// Sanity exhibition type
interface SanityExhibition {
  _id: string;
  title: string;
  subtitle?: string;
  artist?: string;
  startDate: string;
  endDate: string;
  summary?: string;
  description?: string | Array<{ children?: Array<{ text?: string }> }>;
  heroImage?: { asset?: { url?: string } };
  location?: {
    name?: string;
    address?: string;
    city?: string;
  };
  artworks?: unknown[];
  category?: string;
  type?: string;
  openingTime?: string;
}

// Transform Sanity exhibition to frontend format
function transformSanityExhibition(sanityExhibition: SanityExhibition) {
  const startDate = sanityExhibition.startDate;
  const endDate = sanityExhibition.endDate;
  const status = calculateExhibitionStatus(startDate, endDate);

  return {
    id: sanityExhibition._id,
    title: sanityExhibition.title,
    subtitle: sanityExhibition.subtitle,
    artist: sanityExhibition.artist || 'Various Artists',
    status,
    startDate,
    endDate,
    description: sanityExhibition.summary || 'Exhibition description coming soon.',
    longDescription: sanityExhibition.description 
      ? (Array.isArray(sanityExhibition.description) 
          ? sanityExhibition.description.map((block) => 
              (block.children || []).map((child) => child.text || '').join('')
            ).join('\n')
          : sanityExhibition.description)
      : 'Full exhibition description coming soon.',
    image: sanityExhibition.heroImage?.asset?.url || '/Assets/hero1.jpg',
    category: sanityExhibition.category || 'Exhibition',
    location: sanityExhibition.location?.name 
      ? `${sanityExhibition.location.name}, ${sanityExhibition.location.address || ''}, ${sanityExhibition.location.city || ''}`
      : sanityExhibition.location?.address || 'Tunde Odunlade Arts Gallery',
    artworks: sanityExhibition.artworks?.length || 0,
    type: sanityExhibition.type || 'exhibition',
    openingTime: sanityExhibition.openingTime,
    address: sanityExhibition.location?.address,
  };
}

/**
 * Fetch exhibitions straight from Sanity (server-only).
 * Returns the same shape the /api/exhibitions route serves, so server code
 * (e.g. the sitemap) can use it without an HTTP round-trip to itself.
 */
export async function getExhibitions(featured = false) {
  try {
    const query = featured ? featuredExhibitionsQuery : exhibitionsQuery;
    const sanityExhibitions: SanityExhibition[] = await sanityClient.fetch(query);

    if (sanityExhibitions && sanityExhibitions.length > 0) {
      return { exhibitions: sanityExhibitions.map(transformSanityExhibition), source: 'cms' as const };
    }
  } catch (sanityError: unknown) {
    const errorMessage = sanityError instanceof Error ? sanityError.message : 'Unknown error';
    console.warn('Sanity CMS fetch failed, using fallback data:', errorMessage);
  }

  return { exhibitions: [], source: 'static' as const };
}
