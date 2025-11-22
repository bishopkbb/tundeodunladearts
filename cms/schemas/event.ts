import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'event',
  title: 'Event',
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
      name: 'image',
      title: 'Event Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date (Optional)',
      type: 'datetime',
      description: 'For multi-day events',
    }),
    defineField({
      name: 'time',
      title: 'Time',
      type: 'string',
      description: 'e.g., 6:00 PM - 8:00 PM',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        { name: 'name', title: 'Venue Name', type: 'string' },
        { name: 'address', title: 'Address', type: 'string' },
        { name: 'city', title: 'City', type: 'string', initialValue: 'Ibadan' },
      ],
    }),
    defineField({
      name: 'type',
      title: 'Event Type',
      type: 'string',
      options: {
        list: [
          { title: 'Opening Reception', value: 'opening' },
          { title: 'Artist Talk', value: 'talk' },
          { title: 'Workshop', value: 'workshop' },
          { title: 'Performance', value: 'performance' },
          { title: 'Community Event', value: 'community' },
          { title: 'Other', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'rsvpRequired',
      title: 'RSVP Required',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'rsvpLink',
      title: 'RSVP Link',
      type: 'url',
      description: 'Link to RSVP form or booking page',
      hidden: ({ parent }) => !parent?.rsvpRequired,
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
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
      date: 'date',
      location: 'location.name',
      media: 'image',
    },
    prepare({ title, date, location, media }) {
      return {
        title,
        subtitle: `${date ? new Date(date).toLocaleString() : 'No date'} • ${location || 'No location'}`,
        media,
      };
    },
  },
});

