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
      name: 'location',
      title: 'Location',
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

