import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'artist',
  title: 'Artist',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'portrait',
      title: 'Portrait',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'shortBio',
      title: 'Short Biography',
      type: 'text',
      rows: 3,
      description: 'Brief biography for preview cards',
    }),
    defineField({
      name: 'socials',
      title: 'Social Media',
      type: 'object',
      fields: [
        { name: 'website', title: 'Website', type: 'url' },
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'twitter', title: 'Twitter', type: 'url' },
        { name: 'facebook', title: 'Facebook', type: 'url' },
      ],
    }),
    defineField({
      name: 'quote',
      title: 'Artist Quote',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'featured',
      title: 'Featured Artist',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'portrait',
    },
  },
});

