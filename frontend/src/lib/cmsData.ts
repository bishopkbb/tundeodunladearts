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
 * Note: This function works on both client and server side
 */
export async function fetchArtworks(featured = false): Promise<CMSArtwork[]> {
  try {
    // Get the base URL (works in both client and server)
    const baseUrl = typeof window !== 'undefined' 
      ? window.location.origin 
      : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    
    const response = await fetch(`${baseUrl}/api/artworks?featured=${featured}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Client-side: use cache, Server-side: revalidate
      cache: typeof window !== 'undefined' ? 'default' : 'no-store',
    });

    if (!response.ok) {
      // Don't throw, just fall back to static data
      console.warn(`API returned ${response.status}, using fallback data`);
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();
    
    // Ensure artworks array exists
    if (!data.artworks || !Array.isArray(data.artworks)) {
      throw new Error('Invalid API response format');
    }
    
    return data.artworks.map((artwork: Artwork) => ({
      ...artwork,
      source: data.source || 'static',
    }));
  } catch (error) {
    console.error('Error fetching artworks:', error);
    // Fallback to static data - always return something
    const artworks = featured
      ? allArtworks.filter(a => a.featured)
      : allArtworks;
    return artworks.map(a => ({ ...a, source: 'static' as const }));
  }
}

/**
 * Fetch exhibitions from API (which tries CMS first, then falls back to static)
 * Note: This function works on both client and server side
 */
export async function fetchExhibitions(featured = false): Promise<CMSExhibition[]> {
  try {
    // Get the base URL (works in both client and server)
    const baseUrl = typeof window !== 'undefined' 
      ? window.location.origin 
      : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    
    const response = await fetch(`${baseUrl}/api/exhibitions?featured=${featured}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Client-side: use cache, Server-side: revalidate
      cache: typeof window !== 'undefined' ? 'default' : 'no-store',
    });

    if (!response.ok) {
      // Don't throw, just fall back to empty array
      console.warn(`API returned ${response.status}, using fallback data`);
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();
    
    // Ensure exhibitions array exists
    if (!data.exhibitions || !Array.isArray(data.exhibitions)) {
      throw new Error('Invalid API response format');
    }
    
    return data.exhibitions.map((exhibition: Record<string, unknown>) => ({
      ...exhibition,
      source: data.source || 'static',
    }));
  } catch (error) {
    console.error('Error fetching exhibitions:', error);
    // Return empty array if CMS fails - exhibitions page has its own static data
    return [];
  }
}

