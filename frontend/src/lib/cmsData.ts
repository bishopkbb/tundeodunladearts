/**
 * CMS Data Fetching Utilities
 * Fetches data from Sanity CMS with fallback to static data
 */

import { allArtworks } from './artworksData';
import type { Artwork } from './artworksData';

export interface CMSArtwork extends Artwork {
  source: 'cms' | 'static';
}

export interface CMSExhibition {
  id: string;
  title: string;
  subtitle?: string;
  artist: string;
  status: 'current' | 'upcoming' | 'past';
  startDate: string;
  endDate?: string;
  description: string;
  longDescription: string;
  image: string;
  category: string;
  location: string;
  artworks: number;
  type?: 'exhibition' | 'festival' | 'awards' | 'event';
  openingTime?: string;
  address?: string;
  source: 'cms' | 'static';
}

/**
 * Fetch artworks from API (which tries CMS first, then falls back to static)
 */
export async function fetchArtworks(featured = false): Promise<CMSArtwork[]> {
  try {
    const response = await fetch(`/api/artworks?featured=${featured}`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error('Failed to fetch artworks');
    }

    const data = await response.json();
    return data.artworks.map((artwork: Artwork) => ({
      ...artwork,
      source: data.source || 'static',
    }));
  } catch (error) {
    console.error('Error fetching artworks:', error);
    // Fallback to static data
    const artworks = featured
      ? allArtworks.filter(a => a.featured)
      : allArtworks;
    return artworks.map(a => ({ ...a, source: 'static' as const }));
  }
}

/**
 * Fetch exhibitions from API (which tries CMS first, then falls back to static)
 */
export async function fetchExhibitions(featured = false): Promise<CMSExhibition[]> {
  try {
    const response = await fetch(`/api/exhibitions?featured=${featured}`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error('Failed to fetch exhibitions');
    }

    const data = await response.json();
    return data.exhibitions.map((exhibition: any) => ({
      ...exhibition,
      source: data.source || 'static',
    }));
  } catch (error) {
    console.error('Error fetching exhibitions:', error);
    // Return empty array if CMS fails - exhibitions page has its own static data
    return [];
  }
}

