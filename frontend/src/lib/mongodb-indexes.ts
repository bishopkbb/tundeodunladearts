import { getDb } from './mongodb';

export async function createIndexes() {
  const db = await getDb();

  try {
    // Orders indexes
    await db.collection('orders').createIndex({ order_id: 1 }, { unique: true });
    await db.collection('orders').createIndex({ customer_email: 1 });
    await db.collection('orders').createIndex({ created_at: -1 });
    await db.collection('orders').createIndex({ payment_status: 1 });
    await db.collection('orders').createIndex({ order_status: 1 });

    // Newsletter indexes
    await db.collection('newsletter_subscriptions').createIndex({ email: 1 }, { unique: true });
    await db.collection('newsletter_subscriptions').createIndex({ status: 1 });

    // RSVP indexes
    await db.collection('rsvps').createIndex({ event_id: 1 });
    await db.collection('rsvps').createIndex({ email: 1 });

    // Contact submissions indexes
    await db.collection('contact_submissions').createIndex({ status: 1 });
    await db.collection('contact_submissions').createIndex({ created_at: -1 });

    console.log('✅ MongoDB indexes created successfully');
  } catch (error) {
    console.error('❌ Error creating indexes:', error);
  }
}