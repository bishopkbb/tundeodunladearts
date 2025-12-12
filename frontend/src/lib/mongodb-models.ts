import { getDb } from './mongodb';
import { ObjectId } from 'mongodb';

// Cart item type
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  [key: string]: unknown; // Allow additional properties
}

// Types matching your Supabase schema
export interface Order {
  _id?: ObjectId;
  order_id: string;
  customer_email: string;
  customer_name: string;
  customer_phone?: string;
  shipping_address: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  billing_address?: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  cart_items: CartItem[];
  subtotal: number;
  shipping_cost: number;
  tax: number;
  total: number;
  payment_status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  payment_provider?: string;
  payment_transaction_id?: string;
  order_status: 'pending' | 'processing' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  shipping_status?: string;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

export interface RSVP {
  _id?: ObjectId;
  event_id: string;
  event_type: 'exhibition' | 'event';
  name: string;
  email: string;
  phone?: string;
  guest_count: number;
  dietary_requirements?: string;
  special_requests?: string;
  status: string;
  created_at: Date;
}

export interface NewsletterSubscription {
  _id?: ObjectId;
  email: string;
  name?: string;
  subscribed_at: Date;
  status: 'active' | 'inactive';
  unsubscribed_at?: Date;
  source?: string;
}

export interface ContactSubmission {
  _id?: ObjectId;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: string;
  responded_at?: Date;
  created_at: Date;
}

export interface ArtworkRequest {
  _id?: ObjectId;
  artwork_id: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  status: string;
  created_at: Date;
}

// Collection helpers
export const Orders = {
  collection: async () => {
    const db = await getDb();
    return db.collection<Order>('orders');
  },
};

export const RSVPs = {
  collection: async () => {
    const db = await getDb();
    return db.collection<RSVP>('rsvps');
  },
};

export const NewsletterSubscriptions = {
  collection: async () => {
    const db = await getDb();
    return db.collection<NewsletterSubscription>('newsletter_subscriptions');
  },
};

export const ContactSubmissions = {
  collection: async () => {
    const db = await getDb();
    return db.collection<ContactSubmission>('contact_submissions');
  },
};

export const ArtworkRequests = {
  collection: async () => {
    const db = await getDb();
    return db.collection<ArtworkRequest>('artwork_requests');
  },
};