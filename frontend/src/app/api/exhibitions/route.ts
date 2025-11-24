import { NextRequest, NextResponse } from 'next/server';
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured') === 'true';

    // Try to fetch from Sanity CMS first
    try {
      const query = featured ? featuredExhibitionsQuery : exhibitionsQuery;
      const sanityExhibitions = await sanityClient.fetch(query);

      if (sanityExhibitions && sanityExhibitions.length > 0) {
        const transformed = sanityExhibitions.map(transformSanityExhibition);
        return NextResponse.json({ exhibitions: transformed, source: 'cms' }, { status: 200 });
      }
    } catch (sanityError) {
      console.warn('Sanity CMS fetch failed, using fallback data:', sanityError);
    }

    // Fallback to static data if CMS is not available
    return NextResponse.json({ exhibitions: [], source: 'static' }, { status: 200 });
  } catch (error) {
    console.error('Error fetching exhibitions:', error);
    return NextResponse.json({ exhibitions: [], source: 'static' }, { status: 200 });
  }
}

