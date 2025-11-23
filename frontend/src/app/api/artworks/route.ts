import { NextRequest, NextResponse } from 'next/server';
import { sanityClient, artworksQuery, featuredArtworksQuery } from '@/lib/sanity';
import { allArtworks } from '@/lib/artworksData';

// Transform Sanity artwork to frontend format
function transformSanityArtwork(sanityArtwork: any) {
  return {
    id: sanityArtwork._id,
    title: sanityArtwork.title,
    artist: sanityArtwork.artist?.name || 'Unknown Artist',
    year: sanityArtwork.year || new Date().getFullYear(),
    medium: sanityArtwork.medium || 'Unknown',
    dimensions: sanityArtwork.dimensions || 'N/A',
    price: sanityArtwork.price || 0,
    category: sanityArtwork.category || 'Other',
    image: sanityArtwork.images?.[0]?.asset?.url || '/Assets/hero1.jpg',
    description: sanityArtwork.description || 'Artwork description coming soon.',
    story: sanityArtwork.story,
    available: sanityArtwork.availability === 'available',
    featured: sanityArtwork.featured || false,
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured') === 'true';

    // Try to fetch from Sanity CMS first (only if project ID is configured)
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (projectId && projectId.trim() !== '' && projectId !== 'undefined') {
      try {
        const query = featured ? featuredArtworksQuery : artworksQuery;
        const sanityArtworks = await sanityClient.fetch(query);

        if (sanityArtworks && Array.isArray(sanityArtworks) && sanityArtworks.length > 0) {
          const transformed = sanityArtworks.map(transformSanityArtwork);
          return NextResponse.json({ artworks: transformed, source: 'cms' }, { status: 200 });
        }
      } catch (sanityError: any) {
        // Silently fall back to static data if CMS fails
        // Only log in development mode
        if (process.env.NODE_ENV === 'development') {
          console.warn('Sanity CMS fetch failed, using fallback data:', sanityError?.message || 'Unknown error');
        }
      }
    }

    // Fallback to static data if CMS is not available
    const artworks = featured
      ? allArtworks.filter(a => a.featured)
      : allArtworks;

    return NextResponse.json({ artworks, source: 'static' }, { status: 200 });
  } catch (error: any) {
    // Catch any unexpected errors and still return static data
    console.error('Unexpected error in artworks API:', error);
    
    // Always return something - never fail completely
    const artworks = featured
      ? allArtworks.filter(a => a.featured)
      : allArtworks;
    
    return NextResponse.json(
      { 
        artworks, 
        source: 'static',
        error: process.env.NODE_ENV === 'development' ? error?.message : undefined
      }, 
      { status: 200 }
    );
  }
}

