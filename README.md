# Tunde Odunlade Arts & Culture Connexions (TOACC)

An immersive, fully responsive web experience built for Tunde Odunlade Art Gallery (Ibadan, Nigeria).
This site celebrates African creativity through exhibitions, artist profiles, and shop collections blending art, culture, and technology.

A modern, interactive, and culturally expressive website for Tunde Odunlade Arts & Culture Connexions, located in Ibadan, Nigeria.

## Project Structure

This project follows a monorepo structure with three main directories:

```
tunde-arts-connexions/
├── frontend/          # Next.js 15 frontend application
├── cms/              # Sanity.io dual CMS setup
└── backend/          # Supabase backend & API
```

## Features

### Frontend
- **Next.js 15.5.5** with App Router and TypeScript
- **Interactive 3D Hero Section** using React Three Fiber
- **Smooth Animations** with Framer Motion
- **Shopping Cart** with persistent storage
- **Checkout Flow** with Flutterwave payment integration
- **Responsive Design** optimized for all devices
- **Fast Loading** - Optimized for 2-second load times
- **SEO Optimized** with structured data

### CMS (Content Management System)
- **Dual CMS Setup** using Sanity.io:
  - **Gallery Staff CMS** (`/admin`) - Manage artworks, exhibitions, events
  - **Press CMS** (`/press-admin`) - Manage press posts and publications
- **Role-Based Access** for different contributors
- **Rich Content Editing** with Sanity Studio

### Backend
- **Supabase** for database and authentication
- **Order Management** system
- **Payment Webhooks** (Flutterwave integration)
- **RSVP System** for events and exhibitions
- **Newsletter Subscriptions**
- **Contact Form** submissions
- **Row Level Security** (RLS) for data protection

## Quick Start

### Frontend

```bash
cd frontend
pnpm install
pnpm dev
```

Visit `http://localhost:3000`

### CMS

```bash
cd cms
pnpm install
cp .env.example .env
# Update .env with your Sanity credentials
pnpm dev
```

Access:
- Gallery Staff CMS: `http://localhost:3333/admin`
- Press CMS: `http://localhost:3333/press-admin`

### Backend

```bash
cd backend
pnpm install
cp .env.example .env
# Update .env with your Supabase credentials
supabase start
pnpm migrate
```

## Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_FLW_PUBLIC_KEY=your-flutterwave-public-key
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

### CMS (.env)
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token
```

### Backend (.env)
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
FLUTTERWAVE_SECRET_KEY=your-flutterwave-secret-key
```

## Technology Stack

### Frontend
- Next.js 15.5.5
- React 19.1.0
- TypeScript
- Tailwind CSS
- Framer Motion
- React Three Fiber
- React Hook Form
- Flutterwave (payments)

### CMS
- Sanity.io v3
- React 18
- TypeScript

### Backend
- Supabase (PostgreSQL)
- Next.js API Routes
- Zod (validation)
- TypeScript

## Project Phases

### Phase 1: Frontend ✅
- [x] Homepage design and 3D hero section
- [x] Shopping cart functionality
- [x] Checkout flow
- [x] Payment integration
- [x] Performance optimizations

### Phase 2: CMS (In Progress)
- [x] Dual CMS structure setup
- [x] Schema definitions
- [ ] CMS integration with frontend
- [ ] Content management workflows

### Phase 3: Backend (In Progress)
- [x] Database schema
- [x] API routes
- [ ] Payment webhook integration
- [ ] Testing and deployment

## Performance Optimizations

- Lazy loading for non-critical components
- Image optimization with WebP format
- Debounced sessionStorage writes
- Optimized button interactions (removed heavy animations)
- Resource preloading for critical assets
- Code splitting and dynamic imports

## Security

- Row Level Security (RLS) on all database tables
- Environment variable protection
- Secure payment processing via Flutterwave
- Input validation with Zod
- XSS protection

## Documentation

- [Frontend README](frontend/README.md)
- [CMS README](cms/README.md)
- [Backend README](backend/README.md)

## License

Private project for Tunde Odunlade Arts & Culture Connexions.

## Support

For technical support, please contact the development team.

## Author

Ajibade Tosin (@bishopkbb)
Fullstack Developer | React • Next.js • Sanity • Tailwind • Supabase
LinkedIn