-- Initial Database Schema for TOACC Gallery

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id TEXT UNIQUE NOT NULL,
    customer_email TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT,
    shipping_address JSONB NOT NULL,
    billing_address JSONB,
    cart_items JSONB NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    shipping_cost DECIMAL(10, 2) NOT NULL,
    tax DECIMAL(10, 2) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    payment_status TEXT NOT NULL DEFAULT 'pending',
    payment_provider TEXT,
    payment_transaction_id TEXT,
    order_status TEXT NOT NULL DEFAULT 'pending',
    shipping_status TEXT DEFAULT 'not_shipped',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order Status Enum
DO $$ BEGIN
    CREATE TYPE order_status_type AS ENUM ('pending', 'processing', 'confirmed', 'shipped', 'delivered', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_status_type AS ENUM ('pending', 'processing', 'completed', 'failed', 'refunded');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Update orders table with proper types
ALTER TABLE public.orders 
    DROP COLUMN IF EXISTS order_status,
    DROP COLUMN IF EXISTS payment_status;

ALTER TABLE public.orders
    ADD COLUMN order_status order_status_type NOT NULL DEFAULT 'pending',
    ADD COLUMN payment_status payment_status_type NOT NULL DEFAULT 'pending';

-- Events/Exhibitions RSVPs
CREATE TABLE IF NOT EXISTS public.rsvps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id TEXT NOT NULL,
    event_type TEXT NOT NULL, -- 'exhibition' or 'event'
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    guest_count INTEGER DEFAULT 1,
    dietary_requirements TEXT,
    special_requests TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter Subscriptions
CREATE TABLE IF NOT EXISTS public.newsletter_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT NOT NULL DEFAULT 'active',
    unsubscribed_at TIMESTAMP WITH TIME ZONE,
    source TEXT -- 'website', 'exhibition', etc.
);

-- Contact Form Submissions
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new',
    responded_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Artwork Requests (for unavailable pieces)
CREATE TABLE IF NOT EXISTS public.artwork_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    artwork_id TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_orders_order_id ON public.orders(order_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON public.orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON public.orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_order_status ON public.orders(order_status);

CREATE INDEX IF NOT EXISTS idx_rsvps_event_id ON public.rsvps(event_id);
CREATE INDEX IF NOT EXISTS idx_rsvps_email ON public.rsvps(email);

CREATE INDEX IF NOT EXISTS idx_newsletter_email ON public.newsletter_subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_status ON public.newsletter_subscriptions(status);

CREATE INDEX IF NOT EXISTS idx_contact_status ON public.contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_created_at ON public.contact_submissions(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artwork_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Orders: Users can view their own orders
CREATE POLICY "Users can view their own orders"
    ON public.orders
    FOR SELECT
    USING (auth.email() = customer_email);

-- Orders: Public can insert orders (during checkout)
CREATE POLICY "Public can create orders"
    ON public.orders
    FOR INSERT
    WITH CHECK (true);

-- Newsletter: Public can subscribe
CREATE POLICY "Public can subscribe to newsletter"
    ON public.newsletter_subscriptions
    FOR INSERT
    WITH CHECK (true);

-- Contact: Public can submit contact forms
CREATE POLICY "Public can submit contact forms"
    ON public.contact_submissions
    FOR INSERT
    WITH CHECK (true);

-- RSVPs: Public can create RSVPs
CREATE POLICY "Public can create RSVPs"
    ON public.rsvps
    FOR INSERT
    WITH CHECK (true);

-- Artwork Requests: Public can create requests
CREATE POLICY "Public can create artwork requests"
    ON public.artwork_requests
    FOR INSERT
    WITH CHECK (true);

-- Admin access (requires authenticated admin user)
-- Note: In production, configure proper admin roles in Supabase Auth
CREATE POLICY "Admins can view all orders"
    ON public.orders
    FOR SELECT
    USING (auth.role() = 'admin' OR auth.email() = 'admin@toacc.com');

-- Functions
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

