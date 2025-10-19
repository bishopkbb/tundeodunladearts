export interface Artwork {
  id: string;
  title: string;
  description: string;
  medium: string;
  year: number;
  price: number;
  images: string[];
  availability: 'available' | 'sold' | 'request';
  artist: string;
  featured?: boolean;
}

export interface Exhibition {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  summary: string;
  heroImage: string;
  location?: string;
}

export interface PressPost {
  id: string;
  title: string;
  coverImage: string;
  excerpt: string;
  body: string;
  category: string;
  tags: string[];
  publishDate: string;
  featured: boolean;
  slug: string;
}