# Tunde Odunlade Arts & Culture Connexions (TOACC)

> A production-ready, full-stack web application for Tunde Odunlade Art Gallery, featuring immersive 3D experiences, e-commerce capabilities, and comprehensive content management.

[![Live Site](https://img.shields.io/badge/Live_Site-www.tundeodunladearts.com-8B4513?style=flat-square)](https://www.tundeodunladearts.com)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)
[![Sanity](https://img.shields.io/badge/Sanity-CMS-F03E2F?style=flat-square&logo=sanity)](https://www.sanity.io/)

## 🌐 Live Website

**🌍 Visit the live site:** [www.tundeodunladearts.com](https://www.tundeodunladearts.com)

![TOACC Gallery Website Preview](https://www.tundeodunladearts.com/Assets/logo.png)

### Website Features Available Online:
- ✅ **Immersive 3D Hero Carousel** - Interactive rotating gallery showcase
- ✅ **Art Gallery** - Browse curated collections of contemporary African art
- ✅ **Shop** - Purchase authentic Nigerian artworks with secure Flutterwave payments
- ✅ **Exhibitions** - View upcoming, current, and past exhibitions with RSVP functionality
- ✅ **About** - Learn about Prince Tunde Odunlade and the gallery
- ✅ **Press** - Read articles, essays, and interviews
- ✅ **Contact** - Get in touch with the gallery team
- ✅ **Newsletter** - Subscribe for updates on new artworks and events

*Tunde Odunlade Arts & Culture Connexions - Showcasing contemporary African art and cultural heritage from Ibadan, Nigeria.*

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Features](#features)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Environment Configuration](#environment-configuration)
- [Development](#development)
- [Deployment](#deployment)
- [Performance](#performance)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

TOACC is a modern, full-stack web application designed to showcase African art and culture through an immersive digital experience. The platform combines cutting-edge web technologies with a robust backend infrastructure to deliver:

- **Immersive 3D Experiences**: Interactive rotating carousel built with React Three Fiber
- **E-Commerce**: Complete shopping cart and checkout flow with Flutterwave payment integration
- **Content Management**: Dual CMS setup using Sanity.io for artworks, exhibitions, and press content
- **Event Management**: RSVP system for exhibitions and events
- **Newsletter System**: Automated subscription management with email verification
- **Performance Optimized**: Sub-2-second load times with code splitting and image optimization

## 🏗️ Architecture

This project follows a **monorepo architecture** with clear separation of concerns:

```
tunde-arts-connexions/
├── frontend/          # Next.js 15 application (App Router)
│   ├── src/
│   │   ├── app/      # App Router pages and API routes
│   │   ├── components/   # Reusable React components
│   │   ├── lib/      # Utilities and configurations
│   │   └── types/    # TypeScript type definitions
│   └── public/       # Static assets
├── backend/          # Supabase database and migrations
│   ├── supabase/
│   │   └── migrations/   # Database schema migrations
│   └── src/
│       └── lib/      # Supabase client configuration
└── cms/              # Sanity.io CMS configuration
    └── schemas/      # Sanity content schemas
```

### System Architecture

```
┌─────────────────────────────────────────────────┐
│              Client Browser                     │
└──────────────┬──────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────┐
│         Next.js Frontend (Vercel)              │
│  ┌─────────────────────────────────────────┐   │
│  │  Pages & Components (React 19)          │   │
│  │  - 3D Hero Carousel (React Three Fiber) │   │
│  │  - Shopping Cart & Checkout             │   │
│  │  - Newsletter & Contact Forms           │   │
│  └──────────────┬──────────────────────────┘   │
│                 │                               │
│  ┌──────────────▼──────────────────────────┐   │
│  │  API Routes (Next.js API Routes)        │   │
│  │  - /api/orders/*                        │   │
│  │  - /api/newsletter/*                    │   │
│  │  - /api/contact/*                       │   │
│  │  - /api/artworks/*                      │   │
│  │  - /api/exhibitions/*                   │   │
│  └──────────────┬──────────────────────────┘   │
└─────────────────┼───────────────────────────────┘
                  │
      ┌───────────┼───────────┐
      ▼           ▼           ▼
┌──────────┐ ┌──────────┐ ┌──────────┐
│ Supabase │ │  Sanity  │ │Flutterwave│
│ Database │ │   CMS    │ │ Payments  │
└──────────┘ └──────────┘ └──────────┘
```

## 🛠️ Technology Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15.5.5 | React framework with App Router, SSR, SSG, and API routes |
| **React** | 19.1.0 | UI library with concurrent features |
| **TypeScript** | 5.0 | Type-safe development |
| **Tailwind CSS** | 3.4.17 | Utility-first CSS framework |
| **Framer Motion** | 12.23.24 | Animation library for smooth transitions |
| **React Three Fiber** | 9.4.0 | React renderer for Three.js |
| **@react-three/drei** | 10.7.6 | Useful helpers for R3F |
| **React Hook Form** | 7.66.1 | Performant form handling with validation |
| **Zod** | 3.22.4 | TypeScript-first schema validation |
| **Flutterwave** | 1.3.2 | Payment gateway integration |

### Backend

| Technology | Purpose |
|------------|---------|
| **Supabase (PostgreSQL)** | Database, authentication, and real-time subscriptions |
| **Next.js API Routes** | Serverless API endpoints |
| **Row Level Security (RLS)** | Database-level security policies |

### CMS

| Technology | Purpose |
|------------|---------|
| **Sanity.io** | Headless CMS for artworks, exhibitions, and press content |
| **Sanity Studio** | Content editing interface |

### Infrastructure

| Service | Purpose |
|---------|---------|
| **Vercel** | Hosting and deployment platform |
| **Supabase Cloud** | Managed PostgreSQL database |
| **Flutterwave** | Payment processing |

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.0.0
- **npm** ≥ 9.0.0 or **pnpm** ≥ 8.0.0 (recommended)
- **Git** ≥ 2.30.0
- **Supabase CLI** (for local development) - Optional

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bishopkbb/tundeodunladearts.git
   cd tunde-arts-connexions
   ```

2. **Install dependencies**

   **Frontend:**
   ```bash
   cd frontend
   pnpm install
   ```

   **Backend (optional, for local Supabase):**
   ```bash
   cd ../backend
   pnpm install
   ```

   **CMS (optional):**
   ```bash
   cd ../cms
   pnpm install
   ```

3. **Configure environment variables**

   Create `frontend/.env.local`:
   ```bash
   cd frontend
   cp .env.example .env.local  # If .env.example exists
   ```

   Add required variables (see [Environment Configuration](#environment-configuration))

4. **Run database migrations**

   ```bash
   cd backend
   npx supabase db push
   ```

   Or manually run migrations in Supabase Dashboard → SQL Editor

5. **Start development server**

   ```bash
   cd frontend
   pnpm dev
   ```

   Visit: `http://localhost:3000`

## 📁 Project Structure

### Frontend (`frontend/`)

```
frontend/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── api/                  # API routes (serverless functions)
│   │   │   ├── orders/          # Order management endpoints
│   │   │   ├── newsletter/      # Newsletter subscription
│   │   │   ├── contact/         # Contact form submissions
│   │   │   ├── artworks/        # Artwork data (from CMS)
│   │   │   └── exhibitions/     # Exhibition data (from CMS)
│   │   ├── checkout/            # Checkout flow pages
│   │   ├── gallery/             # Gallery page
│   │   ├── shop/                # Shop page
│   │   ├── exhibitions/         # Exhibitions listing
│   │   ├── layout.tsx           # Root layout with metadata
│   │   ├── page.tsx             # Homepage
│   │   ├── sitemap.ts           # Dynamic sitemap generation
│   │   ├── robots.ts            # Robots.txt generation
│   │   └── manifest.ts          # PWA manifest
│   ├── components/
│   │   ├── cart/                # Shopping cart components
│   │   ├── checkout/            # Checkout form and summary
│   │   ├── common/              # Shared components (Navbar, Footer)
│   │   ├── hero/                # Hero section (3D carousel)
│   │   └── sections/            # Page sections
│   ├── contexts/
│   │   └── CartContext.tsx      # Global cart state management
│   ├── hooks/
│   │   ├── useCart.ts           # Cart operations hook
│   │   ├── useReducedMotion.ts  # Accessibility hook
│   │   └── useScrollAnimation.ts # Scroll-based animations
│   ├── lib/
│   │   ├── supabase.ts          # Supabase client configuration
│   │   ├── sanity.ts            # Sanity CMS client
│   │   ├── cmsData.ts           # CMS data fetching utilities
│   │   ├── artworksData.ts      # Static artwork data (fallback)
│   │   ├── exhibitionUtils.ts   # Exhibition status calculations
│   │   └── utils/
│   │       └── performance.ts   # Performance utilities
│   └── types/
│       ├── index.ts             # Shared TypeScript types
│       └── flutterwave.d.ts     # Flutterwave type definitions
├── public/
│   ├── Assets/                  # Image assets
│   └── robots.txt               # Static robots.txt
├── next.config.mjs              # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
└── tsconfig.json                # TypeScript configuration
```

### Backend (`backend/`)

```
backend/
├── supabase/
│   ├── migrations/
│   │   ├── 20240101000000_initial_schema.sql        # Initial database schema
│   │   └── 20240101000001_add_newsletter_select_policy.sql  # RLS policies
│   ├── seed.sql                 # Optional seed data
│   └── config.toml              # Supabase local configuration
└── src/
    └── lib/
        └── supabase.ts          # Supabase client (legacy, see frontend)
```

### CMS (`cms/`)

```
cms/
├── schemas/
│   ├── artwork.ts               # Artwork schema
│   ├── exhibition.ts            # Exhibition schema
│   ├── event.ts                 # Event schema
│   ├── artist.ts                # Artist schema
│   ├── pressPost.ts             # Press post schema
│   └── siteConfig.ts            # Site configuration schema
└── sanity.config.ts             # Sanity Studio configuration
```

## ✨ Features

### Core Features

#### 🎨 Immersive 3D Experience
- **Interactive 3D Carousel**: Rotating gallery of featured artworks using React Three Fiber
- **WebGL Fallback**: Graceful degradation for devices without WebGL support
- **Responsive Design**: Optimized rendering for mobile, tablet, and desktop
- **Performance Optimized**: Dynamic quality adjustment based on device capabilities

#### 🛒 E-Commerce
- **Shopping Cart**: Persistent cart with session storage backup
- **Checkout Flow**: Multi-step checkout (Details → Payment → Confirmation)
- **Payment Integration**: Flutterwave payment gateway with multiple payment options
  - Card payments
  - Mobile money (M-Pesa, MTN, etc.)
  - Bank transfer
  - USSD
  - Account transfer
- **Order Management**: Complete order tracking and history
- **Order Persistence**: Orders saved to Supabase database

#### 📧 Newsletter & Communications
- **Newsletter Subscription**: Email subscription with validation
- **Contact Form**: Integrated contact form with submission tracking
- **RSVP System**: Event and exhibition RSVP management
- **Email Verification**: Automatic email normalization and duplicate handling

#### 🖼️ Content Management
- **Dynamic Content**: Artworks and exhibitions fetched from Sanity CMS
- **Fallback System**: Graceful fallback to static data if CMS unavailable
- **Image Optimization**: Next.js Image component with WebP/AVIF support
- **Lazy Loading**: Progressive image loading for performance

#### 🎭 Exhibitions
- **Dynamic Status**: Automatic status calculation (current, upcoming, past)
- **Event Types**: Support for exhibitions, events, and workshops
- **RSVP Integration**: Direct RSVP from exhibition pages

### Technical Features

#### ⚡ Performance
- **Code Splitting**: Dynamic imports for non-critical components
- **Image Optimization**: Next.js Image with quality optimization (90% quality)
- **Lazy Loading**: Components and images load on demand
- **Caching**: Strategic cache headers and service worker support
- **Compression**: Gzip/Brotli compression enabled
- **Bundle Optimization**: Tree shaking and dead code elimination

#### 🔒 Security
- **Row Level Security**: Database-level access control
- **Environment Variables**: Secure credential management
- **Input Validation**: Zod schema validation on all API routes
- **XSS Protection**: Content Security Policy headers
- **HTTPS Only**: Secure connections enforced

#### ♿ Accessibility
- **Semantic HTML**: Proper HTML5 semantic elements
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Reduced Motion**: Respects user motion preferences
- **Color Contrast**: WCAG AA compliant color schemes

#### 📱 Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Breakpoint System**: Custom breakpoints (xs, tablet, laptop, desktop)
- **Touch Optimized**: Touch-friendly interactions
- **Viewport Meta**: Proper viewport configuration

#### 🔍 SEO
- **Meta Tags**: Comprehensive meta tag configuration
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Twitter-specific meta tags
- **Structured Data**: JSON-LD structured data
- **Sitemap**: Dynamic XML sitemap generation
- **Robots.txt**: Search engine crawl configuration
- **PWA Manifest**: Progressive Web App support

## 📡 API Documentation

### Base URL
- **Local**: `http://localhost:3000/api`
- **Production**: `https://your-domain.vercel.app/api`

### Authentication
All API routes use Supabase authentication. Admin operations require `SUPABASE_SERVICE_ROLE_KEY`.

### Endpoints

#### Orders

**Create Order**
```http
POST /api/orders/create-order
Content-Type: application/json

{
  "orderId": "string",
  "customerEmail": "string",
  "customerName": "string",
  "customerPhone": "string (optional)",
  "shippingAddress": {
    "address": "string",
    "city": "string",
    "state": "string",
    "zipCode": "string",
    "country": "string"
  },
  "billingAddress": { ... } (optional),
  "cartItems": [ ... ],
  "subtotal": number,
  "shippingCost": number,
  "tax": number,
  "total": number,
  "paymentTransactionId": "string (optional)",
  "paymentProvider": "flutterwave" (default),
  "notes": "string (optional)"
}
```

**Response:**
```json
{
  "order": {
    "id": "uuid",
    "order_id": "string",
    "customer_email": "string",
    ...
  }
}
```

**Get Order**
```http
GET /api/orders/get-order?orderId=string
```

#### Newsletter

**Subscribe**
```http
POST /api/newsletter/subscribe
Content-Type: application/json

{
  "email": "string",
  "name": "string (optional)",
  "source": "website" (default)
}
```

**Response:**
```json
{
  "message": "Successfully subscribed!",
  "subscribed": true
}
```

#### Contact

**Submit Contact Form**
```http
POST /api/contact/submit
Content-Type: application/json

{
  "name": "string",
  "email": "string",
  "phone": "string (optional)",
  "subject": "string",
  "message": "string"
}
```

#### RSVP

**Create RSVP**
```http
POST /api/rsvp/create-rsvp
Content-Type: application/json

{
  "eventId": "string",
  "eventType": "exhibition" | "event",
  "name": "string",
  "email": "string",
  "phone": "string (optional)",
  "guestCount": number (default: 1),
  "dietaryRequirements": "string (optional)",
  "specialRequests": "string (optional)"
}
```

#### CMS Data

**Get Artworks**
```http
GET /api/artworks?featured=true|false
```

**Get Exhibitions**
```http
GET /api/exhibitions?featured=true|false
```

#### Testing

**Test Backend Connection**
```http
GET /api/test-backend-connection
```

Returns comprehensive connection status and database table accessibility.

## 🗄️ Database Schema

### Tables

#### `orders`
Order records with payment and shipping information.

```sql
- id (UUID, primary key)
- order_id (TEXT, unique)
- customer_email (TEXT)
- customer_name (TEXT)
- customer_phone (TEXT, nullable)
- shipping_address (JSONB)
- billing_address (JSONB, nullable)
- cart_items (JSONB)
- subtotal (DECIMAL)
- shipping_cost (DECIMAL)
- tax (DECIMAL)
- total (DECIMAL)
- payment_status (ENUM: pending, processing, completed, failed, refunded)
- payment_provider (TEXT, nullable)
- payment_transaction_id (TEXT, nullable)
- order_status (ENUM: pending, processing, confirmed, shipped, delivered, cancelled)
- shipping_status (TEXT, default: 'not_shipped')
- notes (TEXT, nullable)
- created_at (TIMESTAMP WITH TIME ZONE)
- updated_at (TIMESTAMP WITH TIME ZONE)
```

#### `newsletter_subscriptions`
Newsletter subscriber list.

```sql
- id (UUID, primary key)
- email (TEXT, unique)
- name (TEXT, nullable)
- status (TEXT, default: 'active')
- source (TEXT, nullable)
- subscribed_at (TIMESTAMP WITH TIME ZONE)
- unsubscribed_at (TIMESTAMP WITH TIME ZONE, nullable)
```

#### `rsvps`
Event and exhibition RSVPs.

```sql
- id (UUID, primary key)
- event_id (TEXT)
- event_type (TEXT: 'exhibition' | 'event')
- name (TEXT)
- email (TEXT)
- phone (TEXT, nullable)
- guest_count (INTEGER, default: 1)
- dietary_requirements (TEXT, nullable)
- special_requests (TEXT, nullable)
- status (TEXT, default: 'pending')
- created_at (TIMESTAMP WITH TIME ZONE)
```

#### `contact_submissions`
Contact form submissions.

```sql
- id (UUID, primary key)
- name (TEXT)
- email (TEXT)
- phone (TEXT, nullable)
- subject (TEXT)
- message (TEXT)
- status (TEXT, default: 'new')
- responded_at (TIMESTAMP WITH TIME ZONE, nullable)
- created_at (TIMESTAMP WITH TIME ZONE)
```

#### `artwork_requests`
Requests for unavailable artworks.

```sql
- id (UUID, primary key)
- artwork_id (TEXT)
- name (TEXT)
- email (TEXT)
- phone (TEXT, nullable)
- message (TEXT, nullable)
- request_type (TEXT, nullable)
- status (TEXT, default: 'pending')
- created_at (TIMESTAMP WITH TIME ZONE)
```

### Row Level Security (RLS)

All tables have RLS enabled with the following policies:

- **Public INSERT**: Allow public to create records (subscriptions, orders, RSVPs, contact)
- **User SELECT**: Users can view their own records
- **Admin SELECT**: Admin users can view all records

See `backend/supabase/migrations/` for complete schema and policies.

## ⚙️ Environment Configuration

### Frontend Environment Variables

Create `frontend/.env.local`:

```env
# Supabase Configuration (REQUIRED)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Sanity CMS (Optional - for dynamic content)
NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
NEXT_PUBLIC_SANITY_DATASET=production

# Flutterwave Payments (Required for checkout)
NEXT_PUBLIC_FLW_PUBLIC_KEY=FLWPUBK-your-public-key
```

### Backend Environment Variables

Create `backend/.env` (for local Supabase development):

```env
SUPABASE_URL=http://localhost:54321
SUPABASE_ANON_KEY=your-local-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-local-service-role-key
```

### CMS Environment Variables

Create `cms/.env`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token
```

### Getting Credentials

**Supabase:**
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Settings → API
4. Copy Project URL, anon key, and service_role key

**Sanity:**
1. Go to [Sanity Dashboard](https://www.sanity.io/manage)
2. Select your project
3. API → Tokens
4. Create and copy API token

**Flutterwave:**
1. Go to [Flutterwave Dashboard](https://dashboard.flutterwave.com)
2. Settings → API Keys
3. Copy Public Key

⚠️ **Never commit `.env.local` or `.env` files to version control!**

## 💻 Development

### Available Scripts

#### Frontend

```bash
cd frontend

# Development
pnpm dev              # Start dev server (http://localhost:3000)

# Production
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
```

#### Backend

```bash
cd backend

# Supabase CLI
npx supabase start    # Start local Supabase
npx supabase stop     # Stop local Supabase
npx supabase db push  # Push migrations to remote
npx supabase gen types typescript --local > types/database.types.ts  # Generate types
```

#### CMS

```bash
cd cms

pnpm dev              # Start Sanity Studio (http://localhost:3333)
pnpm build            # Build Sanity Studio
pnpm deploy           # Deploy Sanity Studio
```

### Development Workflow

1. **Feature Development**
   ```bash
   # Create feature branch
   git checkout -b feature/your-feature-name
   
   # Make changes
   # Test locally
   pnpm dev
   
   # Commit and push
   git add .
   git commit -m "feat: Add your feature"
   git push origin feature/your-feature-name
   ```

2. **Database Migrations**
   ```bash
   # Create migration
   cd backend
   npx supabase migration new your_migration_name
   
   # Edit migration file
   # Test locally
   npx supabase db reset
   
   # Push to remote
   npx supabase db push
   ```

3. **Testing API Routes**
   ```bash
   # Start dev server
   cd frontend
   pnpm dev
   
   # Test endpoint
   curl http://localhost:3000/api/test-backend-connection
   ```

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js recommended config
- **Prettier**: Configured for consistent formatting
- **Conventions**: 
  - PascalCase for components
  - camelCase for functions/variables
  - kebab-case for files/folders

### Best Practices

- ✅ Use TypeScript for type safety
- ✅ Validate inputs with Zod schemas
- ✅ Handle errors gracefully with try/catch
- ✅ Use React hooks for state management
- ✅ Implement loading states for async operations
- ✅ Optimize images with Next.js Image component
- ✅ Use dynamic imports for code splitting
- ✅ Write descriptive commit messages

## 🚢 Deployment

### Vercel Deployment

See [`VERCEL_DEPLOYMENT_GUIDE.md`](./VERCEL_DEPLOYMENT_GUIDE.md) for comprehensive deployment instructions.

**Quick Steps:**

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import GitHub repository
   - **Set Root Directory to `frontend`** ⚠️
   - Add environment variables
   - Deploy

3. **Configure Environment Variables in Vercel**
   - Project Settings → Environment Variables
   - Add all required Supabase variables
   - Set for Production, Preview, and Development

4. **Deploy and Test**
   - Vercel auto-deploys on push to main
   - Test live site
   - Verify API endpoints work

### Database Migrations

**Before deploying, ensure migrations are run:**

```bash
cd backend
npx supabase db push
```

Or manually in Supabase Dashboard → SQL Editor

### Post-Deployment

1. **Verify Environment Variables** in Vercel dashboard
2. **Test Critical Features**:
   - Newsletter subscription
   - Contact form
   - Checkout flow
   - API endpoints
3. **Monitor Logs** in Vercel dashboard
4. **Check Supabase** for data integrity

## ⚡ Performance

### Metrics

- **Lighthouse Score**: 90+ across all categories
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1

### Optimizations

#### Images
- Next.js Image component with automatic optimization
- WebP/AVIF format support
- Responsive image sizes
- Lazy loading for below-fold images
- Priority loading for LCP images

#### Code
- Code splitting with dynamic imports
- Tree shaking for unused code
- Minification in production
- Bundle analysis with Next.js analyzer

#### Caching
- Static page caching
- API route caching (where appropriate)
- Image caching with long TTL
- Browser caching headers

#### Network
- Compression (Gzip/Brotli)
- HTTP/2 support
- DNS prefetching
- Resource hints (preload, prefetch)

### Performance Monitoring

- Vercel Analytics (if enabled)
- Browser DevTools Performance tab
- Lighthouse CI (for continuous monitoring)

## 🔒 Security

### Security Measures

1. **Environment Variables**
   - Never commit `.env.local` or `.env` files
   - Use Vercel environment variables for production
   - Rotate keys regularly

2. **Database Security**
   - Row Level Security (RLS) on all tables
   - Service role key only used server-side
   - Public anon key for client-side operations
   - Input validation on all API routes

3. **API Security**
   - Rate limiting (via Vercel)
   - Input validation with Zod
   - SQL injection protection (via Supabase)
   - XSS protection with Content Security Policy

4. **Payment Security**
   - PCI DSS compliant via Flutterwave
   - No credit card data stored locally
   - Secure payment redirect flow

### Security Checklist

- [ ] All environment variables secured
- [ ] RLS policies configured
- [ ] API routes validate inputs
- [ ] HTTPS enforced in production
- [ ] No sensitive data in client-side code
- [ ] Dependencies up to date
- [ ] Security headers configured

## 🧪 Testing

### Manual Testing Checklist

- [ ] Newsletter subscription saves to database
- [ ] Contact form submissions work
- [ ] Checkout flow completes successfully
- [ ] Payment redirect works correctly
- [ ] Orders saved to database
- [ ] All pages load correctly
- [ ] Images display properly
- [ ] Mobile responsiveness
- [ ] API endpoints return correct data
- [ ] Error handling works

### API Testing

Use `/api/test-backend-connection` to verify:
- Environment variables are set
- Supabase connection works
- All database tables are accessible

## 📚 Documentation

- [`VERCEL_DEPLOYMENT_GUIDE.md`](./VERCEL_DEPLOYMENT_GUIDE.md) - Complete Vercel deployment guide
- [`QUICK_VERCEL_DEPLOY.md`](./QUICK_VERCEL_DEPLOY.md) - Quick deployment steps
- [`SETUP_ENV_LOCAL.md`](./SETUP_ENV_LOCAL.md) - Environment variable setup
- [`SUPABASE_DASHBOARD_SETUP.md`](./SUPABASE_DASHBOARD_SETUP.md) - Supabase configuration
- [`backend/README.md`](./backend/README.md) - Backend-specific documentation

## 🤝 Contributing

### Development Setup

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Review Process

- All PRs require review
- Tests must pass
- Code must follow style guidelines
- Documentation must be updated

## 📄 License

© 2024 Tunde Odunlade Arts & Culture Connexions. All Rights Reserved.

This is a private project. Unauthorized copying, modification, distribution, or use of this software, via any medium is strictly prohibited.

## 👤 Author

**Ajibade Tosin** (@bishopkbb)

- Fullstack Developer
- Technologies: React • Next.js • TypeScript • Supabase • Sanity
- LinkedIn: [Your LinkedIn Profile]

## 🙏 Acknowledgments

- **Tunde Odunlade** - For the vision and artistic inspiration
- **Supabase** - For the excellent backend infrastructure
- **Vercel** - For seamless deployment and hosting
- **Sanity** - For the powerful CMS platform
- **Flutterwave** - For reliable payment processing

---

**Built with ❤️ for African Art & Culture**
