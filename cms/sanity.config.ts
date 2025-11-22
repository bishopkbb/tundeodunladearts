import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { deskTool } from 'sanity/desk';

// Import schemas
import artwork from './schemas/artwork';
import exhibition from './schemas/exhibition';
import event from './schemas/event';
import artist from './schemas/artist';
import siteConfig from './schemas/siteConfig';
import pressPost from './schemas/pressPost';

// Dual CMS configuration
export default defineConfig([
  // Gallery Staff CMS - Main Admin Panel
  {
    name: 'gallery-staff',
    title: 'TOACC Gallery Staff CMS',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    basePath: '/admin',
    plugins: [
      deskTool(),
      visionTool(),
      structureTool({
        structure: (S) =>
          S.list()
            .title('Content')
            .items([
              S.listItem()
                .title('Artworks')
                .schemaType('artwork')
                .child(S.documentTypeList('artwork').title('Artworks')),
              S.listItem()
                .title('Exhibitions')
                .schemaType('exhibition')
                .child(S.documentTypeList('exhibition').title('Exhibitions')),
              S.listItem()
                .title('Events')
                .schemaType('event')
                .child(S.documentTypeList('event').title('Events')),
              S.listItem()
                .title('Artists')
                .schemaType('artist')
                .child(S.documentTypeList('artist').title('Artists')),
              S.divider(),
              S.listItem()
                .title('Site Configuration')
                .schemaType('siteConfig')
                .child(
                  S.document()
                    .schemaType('siteConfig')
                    .documentId('siteConfig')
                ),
            ]),
      }),
    ],
    schema: {
      types: [artwork, exhibition, event, artist, siteConfig],
    },
  },
  // Press CMS - Press Editor Panel
  {
    name: 'press-editor',
    title: 'TOACC Press CMS',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    basePath: '/press-admin',
    plugins: [
      deskTool(),
      visionTool(),
      structureTool({
        structure: (S) =>
          S.list()
            .title('Press Content')
            .items([
              S.listItem()
                .title('Press Posts')
                .schemaType('pressPost')
                .child(S.documentTypeList('pressPost').title('Press Posts')),
            ]),
      }),
    ],
    schema: {
      types: [pressPost],
    },
  },
]);

