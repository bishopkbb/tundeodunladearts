# TOACC Gallery Backend

Backend API and database setup using Supabase for TOACC Gallery.

## Features

- Order management and tracking
- Payment processing webhooks (Flutterwave)
- Event RSVP system
- Newsletter subscriptions
- Contact form submissions
- Artwork request system
- Row Level Security (RLS) policies

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Install Supabase CLI:
```bash
npm install -g supabase
```

3. Start Supabase locally:
```bash
pnpm dev
```

4. Create a `.env` file:
```bash
cp .env.example .env
```

5. Get your Supabase credentials:
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Copy your project URL, anon key, and service role key

6. Update `.env` with your credentials

## Database Migrations

Run migrations to set up the database schema:
```bash
pnpm migrate
```

Generate TypeScript types from your database:
```bash
pnpm generate
```

## API Routes

### Orders
- `POST /api/orders/create-order` - Create a new order
- `GET /api/orders/get-order?orderId=xxx` - Get order details

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter

### RSVPs
- `POST /api/rsvp/create-rsvp` - Create an RSVP for an event

### Webhooks
- `POST /api/webhooks/flutterwave` - Flutterwave payment webhook

## Database Schema

### Tables

- **orders**: Order records with payment and shipping info
- **rsvps**: Event and exhibition RSVPs
- **newsletter_subscriptions**: Newsletter subscriber list
- **contact_submissions**: Contact form submissions
- **artwork_requests**: Requests for unavailable artworks

## Security

- Row Level Security (RLS) enabled on all tables
- Policies configured for public access (insert) and user-specific access (select)
- Service role key used only for admin operations

## Deployment

### Deploy to Supabase

1. Link your project:
```bash
supabase link --project-ref your-project-ref
```

2. Push migrations:
```bash
supabase db push
```

3. Deploy Edge Functions (if any):
```bash
supabase functions deploy
```

## Environment Variables

Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon/public key
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (server-side only)

Optional:
- `FLUTTERWAVE_SECRET_KEY`: For payment webhook verification
- `DATABASE_URL`: Direct database connection URL

