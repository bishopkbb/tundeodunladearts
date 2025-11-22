import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'pressPost',
  title: 'Press Post',
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
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary for preview cards',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt Text', type: 'string' },
            { name: 'caption', title: 'Caption', type: 'string' },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Article', value: 'article' },
          { title: 'Essay', value: 'essay' },
          { title: 'Interview', value: 'interview' },
          { title: 'Review', value: 'review' },
          { title: 'News', value: 'news' },
        ],
      },
      initialValue: 'article',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'publication',
      title: 'Publication/Outlet',
      type: 'string',
      description: 'Name of publication or media outlet',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      description: 'Author name (if different from Prince Tunde Odunlade)',
      initialValue: 'Prince Tunde Odunlade',
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString().split('T')[0],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show in featured press section',
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
      author: 'author',
      publishDate: 'publishDate',
      media: 'coverImage',
      category: 'category',
    },
    prepare({ title, author, publishDate, media, category }) {
      return {
        title,
        subtitle: `${author || 'Unknown'} • ${publishDate ? new Date(publishDate).toLocaleDateString() : 'No date'} • ${category || 'Uncategorized'}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Publish Date, Newest',
      name: 'publishDateDesc',
      by: [{ field: 'publishDate', direction: 'desc' }],
    },
  ],
});

