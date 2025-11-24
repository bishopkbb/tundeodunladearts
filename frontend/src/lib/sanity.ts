import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';
const token = process.env.SANITY_API_TOKEN || '';

// Create a dummy client if project ID is missing to prevent errors
const createSafeClient = () => {
  if (!projectId || projectId.trim() === '') {
    // Return a mock client that will fail gracefully
      return {
        fetch: async () => {
          throw new Error('Sanity project ID not configured');
        },
      } as ReturnType<typeof createClient>;
  }
  
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true, // Use CDN for faster, cached responses
  });
};

// Sanity client for reading data (public)
export const sanityClient = createSafeClient();

// Sanity client for writing data (requires token)
export const sanityWriteClient = token
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token,
    })
  : null;

// Image URL builder
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// GROQ queries
export const artworksQuery = `*[_type == "artwork" && defined(publishedAt)] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  "artist": artist->{name, _id},
  "images": images[]{
    asset->{
      _id,
      url,
      metadata {
        dimensions
      }
    }
  },
  description,
  medium,
  dimensions,
  year,
  price,
  availability,
  category,
  featured,
  tags,
  publishedAt
}`;

export const featuredArtworksQuery = `*[_type == "artwork" && featured == true && defined(publishedAt)] | order(publishedAt desc)[0...6] {
  _id,
  title,
  "slug": slug.current,
  "artist": artist->{name, _id},
  "images": images[]{
    asset->{
      _id,
      url,
      metadata {
        dimensions
      }
    }
  },
  description,
  medium,
  dimensions,
  year,
  price,
  availability,
  category,
  featured,
  tags,
  publishedAt
}`;

export const exhibitionsQuery = `*[_type == "exhibition" && defined(publishedAt)] | order(startDate desc) {
  _id,
  title,
  "slug": slug.current,
  "heroImage": heroImage.asset->{
    _id,
    url,
    metadata {
      dimensions
    }
  },
  "gallery": gallery[]{
    asset->{
      _id,
      url,
      metadata {
        dimensions
      }
    }
  },
  summary,
  description,
  startDate,
  endDate,
  location,
  "artworks": artworks[]->{
    _id,
    title,
    "slug": slug.current,
    "images": images[0]{
      asset->{
        _id,
        url
      }
    },
    price
  },
  featured,
  status,
  publishedAt
}`;

export const featuredExhibitionsQuery = `*[_type == "exhibition" && featured == true && defined(publishedAt)] | order(startDate desc)[0...4] {
  _id,
  title,
  "slug": slug.current,
  "heroImage": heroImage.asset->{
    _id,
    url,
    metadata {
      dimensions
    }
  },
  summary,
  startDate,
  endDate,
  location,
  status,
  publishedAt
}`;

export const artistsQuery = `*[_type == "artist" && defined(publishedAt)] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  bio,
  "image": image.asset->{
    _id,
    url,
    metadata {
      dimensions
    }
  },
  publishedAt
}`;

