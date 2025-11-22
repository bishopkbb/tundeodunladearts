# TOACC Gallery CMS

Dual CMS setup using Sanity.io for managing gallery content and press publications.

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Create a `.env` file with your Sanity project credentials:
```bash
cp .env.example .env
```

3. Get your Sanity project ID and dataset from [sanity.io/manage](https://sanity.io/manage)

4. Update `.env` with your credentials:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Your Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET`: Your dataset (usually "production")
- `SANITY_API_TOKEN`: Your API token with write permissions

5. Run the development server:
```bash
pnpm dev
```

## CMS Access

### Gallery Staff CMS
- URL: `http://localhost:3333/admin`
- Access: Gallery staff and super admins
- Features: Manage artworks, exhibitions, events, artists, and site configuration

### Press CMS
- URL: `http://localhost:3333/press-admin`
- Access: Press editors
- Features: Manage press posts, articles, and publications

## Schema Structure

- **Artwork**: Art pieces with images, pricing, availability, and metadata
- **Exhibition**: Gallery exhibitions with dates, locations, and featured artworks
- **Event**: Gallery events, openings, workshops, and talks
- **Artist**: Artist profiles with biographies and social links
- **Site Config**: Global site settings, contact info, and footer links
- **Press Post**: Articles, essays, interviews, and press coverage

## Role-Based Access

Configure roles in Sanity Dashboard:
- `gallery_staff`: Full access to gallery content (artworks, exhibitions, events)
- `super_admin`: Full access to all content including site configuration
- `press_editor`: Access only to press posts and publications

## Deployment

Deploy to Sanity Hosting:
```bash
pnpm deploy
```

Or build for production:
```bash
pnpm build
```

