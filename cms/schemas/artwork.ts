import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'artist',
      title: 'Artist',
      type: 'reference',
      to: [{ type: 'artist' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'medium',
      title: 'Medium',
      type: 'string',
      description: 'e.g., Oil on Canvas, Acrylic, Mixed Media',
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions',
      type: 'string',
      description: 'e.g., 24" x 36"',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.min(1900).max(new Date().getFullYear() + 1),
    }),
    defineField({
      name: 'price',
      title: 'Price (NGN)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'availability',
      title: 'Availability',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Sold', value: 'sold' },
          { title: 'On Hold', value: 'on_hold' },
          { title: 'Not for Sale', value: 'not_for_sale' },
        ],
      },
      initialValue: 'available',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Painting', value: 'painting' },
          { title: 'Sculpture', value: 'sculpture' },
          { title: 'Mixed Media', value: 'mixed_media' },
          { title: 'Digital Art', value: 'digital_art' },
          { title: 'Photography', value: 'photography' },
        ],
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this artwork in featured sections',
      initialValue: false,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      artist: 'artist.name',
      media: 'images.0',
      availability: 'availability',
    },
    prepare({ title, artist, media, availability }) {
      return {
        title,
        subtitle: `${artist || 'Unknown Artist'} • ${availability || 'Unknown'}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Price, Low to High',
      name: 'priceAsc',
      by: [{ field: 'price', direction: 'asc' }],
    },
    {
      title: 'Price, High to Low',
      name: 'priceDesc',
      by: [{ field: 'price', direction: 'desc' }],
    },
    {
      title: 'Year, Newest',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
  ],
});

