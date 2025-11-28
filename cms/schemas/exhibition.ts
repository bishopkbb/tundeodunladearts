import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'exhibition',
  title: 'Exhibition',
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
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'Short description for preview cards',
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'openingTime',
      title: 'Opening Time',
      type: 'string',
      description: 'e.g., "6:00 PM" or "18:00"',
    }),
    defineField({
      name: 'venue',
      title: 'Venue Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Venue Address',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location (Legacy)',
      type: 'object',
      fields: [
        { name: 'name', title: 'Venue Name', type: 'string' },
        { name: 'address', title: 'Address', type: 'string' },
        { name: 'city', title: 'City', type: 'string' },
      ],
    }),
    defineField({
      name: 'artworks',
      title: 'Featured Artworks',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'artwork' }] }],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show in featured exhibitions section',
      initialValue: false,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Upcoming', value: 'upcoming' },
          { title: 'Current', value: 'current' },
          { title: 'Past', value: 'past' },
        ],
      },
      initialValue: 'upcoming',
    }),
    defineField({
      name: 'type',
      title: 'Event Type',
      type: 'string',
      options: {
        list: [
          { title: 'Exhibition', value: 'exhibition' },
          { title: 'Solo Exhibition', value: 'solo_exhibition' },
          { title: 'Group Exhibition', value: 'group_exhibition' },
          { title: 'Workshop', value: 'workshop' },
          { title: 'Event', value: 'event' },
        ],
      },
      initialValue: 'exhibition',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'e.g., Contemporary, Traditional, Mixed Media',
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      description: 'Badge text to display on exhibition card (e.g., "New", "Featured", "Limited Time")',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Tags for filtering and searching exhibitions',
    }),
    defineField({
      name: 'entryPrice',
      title: 'Entry Price (NGN)',
      type: 'number',
      description: 'Entry fee for the exhibition (0 for free)',
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'artist',
      title: 'Artist/Curator',
      type: 'reference',
      to: [{ type: 'artist' }],
      description: 'Main artist or curator for this exhibition',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Subtitle or tagline for the exhibition',
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
      startDate: 'startDate',
      endDate: 'endDate',
      media: 'heroImage',
      status: 'status',
    },
    prepare({ title, startDate, endDate, media, status }) {
      const dateRange = startDate && endDate 
        ? `${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}`
        : 'No dates set';
      return {
        title,
        subtitle: `${dateRange} • ${status || 'No status'}`,
        media,
      };
    },
  },
});

