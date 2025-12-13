# Tunde Odunlade Arts & Culture Connexions (TOACC)

> A production-ready, full-stack web application for Tunde Odunlade Art Gallery, featuring immersive 3D experiences, e-commerce capabilities, and comprehensive content management.

[![Live Site](https://img.shields.io/badge/Live_Site-www.tundeodunladearts.com-8B4513?style=flat-square)](https://www.tundeodunladearts.com)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
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
├── backend/          # MongoDB database configuration
│   └── src/
│       └── lib/      # MongoDB client configuration (legacy, see frontend)
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
│ MongoDB  │ │  Sanity  │ │Flutterwave│
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
| **MongoDB Atlas** | Cloud database for orders, newsletter, RSVPs, and contact submissions |
| **Next.js API Routes** | Serverless API endpoints |
| **MongoDB Collections** | Document-based data storage |

### CMS

| Technology | Purpose |
|------------|---------|
| **Sanity.io** | Headless CMS for artworks, exhibitions, and press content |
| **Sanity Studio** | Content editing interface |

### Infrastructure

| Service | Purpose |
|---------|---------|
| **Vercel** | Hosting and deployment platform |
| **MongoDB Atlas** | Managed MongoDB database |
| **Flutterwave** | Payment processing |

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.0.0
- **npm** ≥ 9.0.0 or **pnpm** ≥ 8.0.0 (recommended)
- **Git** ≥ 2.30.0
- **MongoDB Atlas Account** (for database) - Required

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

   **Backend (optional, for local development):**
   ```bash
   cd ../backend
   npm install
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

4. **Configure MongoDB**

   - Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
   - Create a free cluster
   - Get your connection string
   - Add to `frontend/.env.local`:
     ```
     MONGODB_URI=your_mongodb_connection_string
     MONGODB_DB_NAME=toacc
     ```

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
│   │   ├── mongodb.ts           # MongoDB client configuration
│   │   ├── mongodb-models.ts    # MongoDB data models and collections
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
└── src/
    └── lib/                     # Legacy backend files (not used in production)
```

**Note:** Database is now managed via MongoDB Atlas. All API routes are in `frontend/src/app/api/`.

### CMS (`cms/`)

```
cms/
├── schemas/
│   ├── artwork.ts               # Artwork schema (for shop & gallery)
│   ├── exhibition.ts            # Exhibition schema (with tags, badges, prices, dates)
│   ├── event.ts                 # Event schema
│   ├── artist.ts                # Artist schema
│   ├── pressPost.ts             # Press post schema
│   └── siteConfig.ts            # Site configuration schema
├── sanity.config.ts             # Sanity Studio configuration (role-based access)
└── SANITY_CMS_SETUP_GUIDE.md    # Complete CMS setup and role configuration guide
```

**CMS Access & Roles:**
- **Gallery Staff Panel** (`/admin`): For managing artworks, exhibitions, gallery images
- **Press Panel** (`/press-admin`): For managing press content (Super Admin only)
- **Gallery Staff** (adeola@, elizabeth@): Can manage gallery, shop, exhibitions
- **Super Admin** (tunde@): Full access to all content including press

See [`cms/SANITY_CMS_SETUP_GUIDE.md`](./cms/SANITY_CMS_SETUP_GUIDE.md) for complete setup instructions.

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
- **Order Persistence**: Orders saved to MongoDB database

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
All API routes use MongoDB for data storage. No authentication required for public endpoints (newsletter, contact, RSVP, orders).

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

### MongoDB Collections

#### `orders`
Order records with payment and shipping information.

```typescript
{
  _id: ObjectId,
  order_id: string (unique),
  customer_email: string,
  customer_name: string,
  customer_phone?: string,
  shipping_address: {
    address: string,
    city: string,
    state: string,
    zipCode: string,
    country: string
  },
  billing_address?: { ... },
  cart_items: CartItem[],
  subtotal: number,
  shipping_cost: number,
  tax: number,
  total: number,
  payment_status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded',
  payment_provider?: string,
  payment_transaction_id?: string,
  order_status: 'pending' | 'processing' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled',
  shipping_status?: string,
  notes?: string,
  created_at: Date,
  updated_at: Date
}
```

#### `newsletter_subscriptions`
Newsletter subscriber list.

```typescript
{
  _id: ObjectId,
  email: string (unique),
  name?: string,
  status: 'active' | 'inactive',
  source?: string,
  subscribed_at: Date,
  unsubscribed_at?: Date
}
```

#### `rsvps`
Event and exhibition RSVPs.

```typescript
{
  _id: ObjectId,
  event_id: string,
  event_type: 'exhibition' | 'event',
  name: string,
  email: string,
  phone?: string,
  guest_count: number,
  dietary_requirements?: string,
  special_requests?: string,
  status: string,
  created_at: Date
}
```

#### `contact_submissions`
Contact form submissions.

```typescript
{
  _id: ObjectId,
  name: string,
  email: string,
  phone?: string,
  subject: string,
  message: string,
  status: string,
  responded_at?: Date,
  created_at: Date
}
```

#### `artwork_requests`
Requests for unavailable artworks.

```typescript
{
  _id: ObjectId,
  artwork_id: string,
  name: string,
  email: string,
  phone?: string,
  message?: string,
  status: string,
  created_at: Date
}
```

### Indexes

Recommended indexes for performance:
- `orders`: `order_id` (unique), `customer_email`, `created_at`
- `newsletter_subscriptions`: `email` (unique), `status`
- `rsvps`: `event_id`, `email`
- `contact_submissions`: `status`, `created_at`

See `frontend/src/lib/mongodb-indexes.ts` for index creation helper.

## ⚙️ Environment Configuration

### Frontend Environment Variables

Create `frontend/.env.local`:

```env
# MongoDB Configuration (REQUIRED)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/toacc?retryWrites=true&w=majority
MONGODB_DB_NAME=toacc

# Sanity CMS (Optional - for dynamic content)
NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
NEXT_PUBLIC_SANITY_DATASET=production

# Flutterwave Payments (Required for checkout)
NEXT_PUBLIC_FLW_PUBLIC_KEY=FLWPUBK-your-public-key
```

### Backend Environment Variables

Backend now uses MongoDB. All configuration is in `frontend/.env.local` (see above).

### CMS Environment Variables

Create `cms/.env`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token
```

### Getting Credentials

**MongoDB Atlas:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Database Access → Create database user
4. Network Access → Add IP address (or `0.0.0.0/0` for testing)
5. Connect → Get connection string
6. Replace `<password>` with your database user password

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

Backend is now integrated into the frontend. All API routes are in `frontend/src/app/api/`.
No separate backend commands needed.

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

2. **Database Setup**
   ```bash
   # MongoDB collections are created automatically on first insert
   # To create indexes, use MongoDB Compass or run:
   # See frontend/src/lib/mongodb-indexes.ts for index creation
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
   - Add `MONGODB_URI` and `MONGODB_DB_NAME`
   - Set for Production, Preview, and Development

4. **Deploy and Test**
   - Vercel auto-deploys on push to main
   - Test live site
   - Verify API endpoints work

### Database Setup

**MongoDB collections are created automatically on first insert.**

To create indexes for better performance:
- Use MongoDB Compass to run index creation
- Or see `frontend/src/lib/mongodb-indexes.ts` for helper function

### Post-Deployment

1. **Verify Environment Variables** in Vercel dashboard
2. **Test Critical Features**:
   - Newsletter subscription
   - Contact form
   - Checkout flow
   - API endpoints
3. **Monitor Logs** in Vercel dashboard
4. **Check MongoDB Atlas** for data integrity

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
   - MongoDB connection string secured in environment variables
   - Network access restricted via MongoDB Atlas IP whitelist
   - Input validation on all API routes
   - No sensitive data exposed in client-side code

3. **API Security**
   - Rate limiting (via Vercel)
   - Input validation with Zod
   - MongoDB injection protection (via parameterized queries)
   - XSS protection with Content Security Policy

4. **Payment Security**
   - PCI DSS compliant via Flutterwave
   - No credit card data stored locally
   - Secure payment redirect flow

### Security Checklist

- [ ] All environment variables secured
- [ ] MongoDB Atlas network access configured
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

Use `/api/test-backend-connection` or `/api/test-mongodb` to verify:
- Environment variables are set
- MongoDB connection works
- All database collections are accessible

## 📚 Documentation

- [`VERCEL_DEPLOYMENT_GUIDE.md`](./VERCEL_DEPLOYMENT_GUIDE.md) - Complete Vercel deployment guide
- [`QUICK_VERCEL_DEPLOY.md`](./QUICK_VERCEL_DEPLOY.md) - Quick deployment steps
- [`SETUP_ENV_LOCAL.md`](./SETUP_ENV_LOCAL.md) - Environment variable setup
- [`MONGODB_MIGRATION_CHECKLIST.md`](./MONGODB_MIGRATION_CHECKLIST.md) - MongoDB migration checklist
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
- Technologies: React • Next.js • TypeScript • MongoDB • Sanity
- LinkedIn: [Your LinkedIn Profile]

## 🙏 Acknowledgments

- **Tunde Odunlade** - For the vision and artistic inspiration
- **MongoDB Atlas** - For the excellent database infrastructure
- **Vercel** - For seamless deployment and hosting
- **Sanity** - For the powerful CMS platform
- **Flutterwave** - For reliable payment processing

---

**Built with ❤️ for African Art & Culture**
