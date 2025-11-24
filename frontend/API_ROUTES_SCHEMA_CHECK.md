# API Routes Schema Verification

This document verifies that all API routes match the database schema.

## Database Schema (from migrations/20240101000000_initial_schema.sql)

### 1. `newsletter_subscriptions` table
- `id` UUID PRIMARY KEY (auto-generated)
- `email` TEXT UNIQUE NOT NULL
- `name` TEXT (nullable)
- `subscribed_at` TIMESTAMP WITH TIME ZONE (default NOW())
- `status` TEXT NOT NULL (default 'active')
- `unsubscribed_at` TIMESTAMP WITH TIME ZONE (nullable)
- `source` TEXT (nullable)

### 2. `orders` table
- `id` UUID PRIMARY KEY (auto-generated)
- `order_id` TEXT UNIQUE NOT NULL
- `customer_email` TEXT NOT NULL
- `customer_name` TEXT NOT NULL
- `customer_phone` TEXT (nullable)
- `shipping_address` JSONB NOT NULL
- `billing_address` JSONB (nullable)
- `cart_items` JSONB NOT NULL
- `subtotal` DECIMAL(10, 2) NOT NULL
- `shipping_cost` DECIMAL(10, 2) NOT NULL
- `tax` DECIMAL(10, 2) NOT NULL
- `total` DECIMAL(10, 2) NOT NULL
- `payment_status` ENUM: 'pending', 'processing', 'completed', 'failed', 'refunded' (default 'pending')
- `payment_provider` TEXT (nullable)
- `payment_transaction_id` TEXT (nullable)
- `order_status` ENUM: 'pending', 'processing', 'confirmed', 'shipped', 'delivered', 'cancelled' (default 'pending')
- `shipping_status` TEXT (default 'not_shipped')
- `notes` TEXT (nullable)
- `created_at` TIMESTAMP WITH TIME ZONE (default NOW())
- `updated_at` TIMESTAMP WITH TIME ZONE (default NOW())

### 3. `rsvps` table
- `id` UUID PRIMARY KEY (auto-generated)
- `event_id` TEXT NOT NULL
- `event_type` TEXT NOT NULL ('exhibition' or 'event')
- `name` TEXT NOT NULL
- `email` TEXT NOT NULL
- `phone` TEXT (nullable)
- `guest_count` INTEGER (default 1)
- `dietary_requirements` TEXT (nullable)
- `special_requests` TEXT (nullable)
- `status` TEXT NOT NULL (default 'pending')
- `created_at` TIMESTAMP WITH TIME ZONE (default NOW())

### 4. `contact_submissions` table
- `id` UUID PRIMARY KEY (auto-generated)
- `name` TEXT NOT NULL
- `email` TEXT NOT NULL
- `phone` TEXT (nullable)
- `subject` TEXT NOT NULL
- `message` TEXT NOT NULL
- `status` TEXT NOT NULL (default 'new')
- `responded_at` TIMESTAMP WITH TIME ZONE (nullable)
- `created_at` TIMESTAMP WITH TIME ZONE (default NOW())

### 5. `artwork_requests` table
- `id` UUID PRIMARY KEY (auto-generated)
- `artwork_id` TEXT NOT NULL
- `name` TEXT NOT NULL
- `email` TEXT NOT NULL
- `phone` TEXT (nullable)
- `message` TEXT (nullable)
- `status` TEXT NOT NULL (default 'pending')
- `created_at` TIMESTAMP WITH TIME ZONE (default NOW())

---

## API Routes Verification

### ✅ `/api/newsletter/subscribe` (POST)
**File:** `frontend/src/app/api/newsletter/subscribe/route.ts`

**Schema Match:** ✅ CORRECT
- Maps `email` → `email` (normalized to lowercase)
- Maps `name` → `name` (optional/nullable)
- Maps `source` → `source` (defaults to 'website')
- Sets `status` → 'active'
- Sets `subscribed_at` → current timestamp
- Handles existing subscriptions correctly
- Uses `.select().single()` to return inserted data

**Issues Fixed:**
- ✅ Added comprehensive logging
- ✅ Added error code handling
- ✅ Normalized email to lowercase
- ✅ Proper null handling for optional fields

---

### ✅ `/api/orders/create-order` (POST)
**File:** `frontend/src/app/api/orders/create-order/route.ts`

**Schema Match:** ✅ CORRECT
- Maps `orderId` → `order_id`
- Maps `customerEmail` → `customer_email`
- Maps `customerName` → `customer_name`
- Maps `customerPhone` → `customer_phone`
- Maps `shippingAddress` → `shipping_address` (JSONB)
- Maps `billingAddress` → `billing_address` (JSONB, defaults to shipping)
- Maps `cartItems` → `cart_items` (JSONB)
- Maps `subtotal` → `subtotal`
- Maps `shippingCost` → `shipping_cost`
- Maps `tax` → `tax`
- Maps `total` → `total`
- Maps `paymentTransactionId` → `payment_transaction_id`
- Maps `paymentProvider` → `payment_provider`
- Sets `payment_status` → 'completed' or 'pending'
- Sets `order_status` → 'confirmed' or 'pending'
- Sets `shipping_status` → 'not_shipped' (added)
- Maps `notes` → `notes`

**Issues Fixed:**
- ✅ Added `shipping_status` field (was missing)
- ✅ Added null checks for Supabase admin client

---

### ✅ `/api/rsvp/create-rsvp` (POST)
**File:** `frontend/src/app/api/rsvp/create-rsvp/route.ts`

**Schema Match:** ✅ CORRECT
- Maps `eventId` → `event_id`
- Maps `eventType` → `event_type`
- Maps `name` → `name`
- Maps `email` → `email`
- Maps `phone` → `phone`
- Maps `guestCount` → `guest_count` (defaults to 1)
- Maps `dietaryRequirements` → `dietary_requirements` (nullable)
- Maps `specialRequests` → `special_requests` (nullable)
- Sets `status` → 'pending' (changed from 'confirmed' to match schema default)

**Issues Fixed:**
- ✅ Changed default status from 'confirmed' to 'pending' to match schema
- ✅ Added null handling for optional fields
- ✅ Added null checks for Supabase admin client

---

### ✅ `/api/contact/submit` (POST)
**File:** `frontend/src/app/api/contact/submit/route.ts` (NEW)

**Schema Match:** ✅ CORRECT
- Maps `name` → `name`
- Maps `email` → `email`
- Maps `phone` → `phone` (nullable)
- Maps `subject` → `subject`
- Maps `message` → `message`
- Sets `status` → 'new' (schema default)
- `created_at` auto-generated

**Status:** ✅ Created and verified

---

### ✅ `/api/orders/get-order` (GET)
**File:** `frontend/src/app/api/orders/get-order/route.ts`

**Schema Match:** ✅ CORRECT
- Uses `order_id` for query
- Returns all fields with `select('*')`
- Handles not found (PGRST116) correctly

**Note:** Uses regular `supabase` client (not admin) - this is fine if RLS policies allow it.

---

## Missing API Routes

### ❌ `/api/artwork-request` (POST) - NOT IMPLEMENTED
**Expected Table:** `artwork_requests`

**Required Fields:**
- `artwork_id` TEXT NOT NULL
- `name` TEXT NOT NULL
- `email` TEXT NOT NULL
- `phone` TEXT (optional)
- `message` TEXT (optional)
- `status` TEXT (default 'pending')

**Recommendation:** Create this route if artwork requests are needed.

---

## Environment Variables Required

All API routes require:
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (for admin operations)

**Note:** `SUPABASE_SERVICE_ROLE_KEY` must be in `.env.local` (not `.env`) for Next.js API routes to access it.

---

## Testing

To test Supabase configuration, visit:
- `/api/test-supabase` - Returns configuration status and database connectivity

