// src/types/index.ts

export interface Artwork {
  id: string;
  title: string;
  artist: string;
  medium: string;
  year: number;
  dimensions?: string;
  price?: number;
  availability: 'available' | 'sold' | 'reserved';
  images: string[];
  description?: string;
  category?: string;
  tags?: string[];
}

export interface Exhibition {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  heroImage: string;
  artworks?: string[]; // Artwork IDs
  featured: boolean;
  category: string;
}

export interface Artist {
  id: string;
  name: string;
  bio: string;
  portrait: string;
  birthYear?: number;
  nationality: string;
  website?: string;
  social?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image?: string;
  rsvpRequired: boolean;
  capacity?: number;
}

export interface PressPost {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  coverImage: string;
  publishDate: string;
  author?: string;
  category: 'article' | 'interview' | 'review' | 'news';
  tags?: string[];
  featured: boolean;
}

export interface GalleryImage {
  id: number;
  src: string;
  title: string;
  description: string;
  alt?: string;
}

export interface ContactInfo {
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface SiteConfig {
  name: string;
  shortName: string;
  description: string;
  url: string;
  logo: string;
  contact: ContactInfo;
  social: {
    instagram: string;
    facebook: string;
    tiktok: string;
  };
  openingHours: {
    weekday: string;
    weekend: string;
  };
}