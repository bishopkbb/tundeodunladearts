import { NextRequest, NextResponse } from 'next/server';
import { NewsletterSubscriptions } from '@/lib/mongodb-models';
import { z } from 'zod';

const subscribeSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  source: z.string().optional().default('website'),
});

export async function POST(request: NextRequest) {
  try {
    // Check MongoDB configuration first
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI is not configured');
      return NextResponse.json(
        { 
          error: 'Server configuration error', 
          details: 'MongoDB connection string not configured. Please add MONGODB_URI to .env.local',
          code: 'MISSING_CONFIG'
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    console.log('📧 Newsletter subscription request:', body);
    
    const validatedData = subscribeSchema.parse(body);
    const normalizedEmail = validatedData.email.toLowerCase().trim();
    console.log('📝 Normalized email:', normalizedEmail);

    let collection;
    try {
      collection = await NewsletterSubscriptions.collection();
    } catch (dbError) {
      console.error('❌ MongoDB connection error:', dbError);
      return NextResponse.json(
        { 
          error: 'Database connection error', 
          details: dbError instanceof Error ? dbError.message : 'Failed to connect to MongoDB',
          code: 'DB_CONNECTION_ERROR'
        },
        { status: 500 }
      );
    }

    // Check if already subscribed
    console.log('🔍 Checking for existing subscription...');
    const existing = await collection.findOne({ email: normalizedEmail });

    if (existing) {
      console.log('📋 Found existing subscription:', existing);
      if (existing.status === 'active') {
        console.log('✅ Already subscribed with active status');
        return NextResponse.json(
          { message: 'Already subscribed! Thank you for your interest.', subscribed: true },
          { status: 200 }
        );
      }

      // Reactivate subscription
      console.log('🔄 Reactivating subscription...');
      const updated = await collection.findOneAndUpdate(
        { email: normalizedEmail },
        {
          $set: {
            status: 'active',
            subscribed_at: new Date(),
            unsubscribed_at: null,
          },
        },
        { returnDocument: 'after' }
      );

      if (!updated) {
        console.error('❌ Error reactivating subscription');
        return NextResponse.json(
          { error: 'Failed to reactivate subscription', details: 'Could not update subscription' },
          { status: 500 }
        );
      }

      console.log('✅ Subscription reactivated:', updated);
      return NextResponse.json(
        { message: 'Subscription reactivated! Welcome back.', subscribed: true },
        { status: 200 }
      );
    }

    // Create new subscription
    console.log('➕ Creating new subscription...');
    const subscriptionData = {
      email: normalizedEmail,
      name: validatedData.name || null,
      source: validatedData.source || 'website',
      status: 'active' as const,
      subscribed_at: new Date(),
    };
    console.log('📝 Inserting data:', JSON.stringify(subscriptionData, null, 2));

    // Use upsert to handle race conditions
    const result = await collection.findOneAndUpdate(
      { email: normalizedEmail },
      { $setOnInsert: subscriptionData },
      { upsert: true, returnDocument: 'after' }
    );

    if (!result) {
      console.error('❌ Failed to create subscription');
      return NextResponse.json(
        { error: 'Failed to subscribe', details: 'Could not create subscription' },
        { status: 500 }
      );
    }

    console.log('✅ Successfully created newsletter subscription:', result);
    return NextResponse.json(
      { message: 'Successfully subscribed! Thank you for joining us.', subscribed: true },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    // Check for MongoDB-specific errors
    if (error instanceof Error) {
      console.error('Error in newsletter subscription:', error.message);
      console.error('Stack:', error.stack);
      
      // MongoDB connection errors
      if (error.message.includes('MONGODB_URI') || error.message.includes('Mongo')) {
        return NextResponse.json(
          { 
            error: 'Database connection error', 
            details: error.message,
            code: 'DB_ERROR'
          },
          { status: 500 }
        );
      }
    }

    console.error('Unexpected error in newsletter subscription:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error',
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    );
  }
}
