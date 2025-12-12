import { NextRequest, NextResponse } from 'next/server';
import { RSVPs } from '@/lib/mongodb-models';
import { z } from 'zod';

const rsvpSchema = z.object({
  eventId: z.string(),
  eventType: z.enum(['exhibition', 'event']),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  guestCount: z.number().int().min(1).default(1),
  dietaryRequirements: z.string().optional(),
  specialRequests: z.string().optional(),
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
    const validatedData = rsvpSchema.parse(body);

    let collection;
    try {
      collection = await RSVPs.collection();
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

    const rsvpData = {
      event_id: validatedData.eventId,
      event_type: validatedData.eventType,
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      guest_count: validatedData.guestCount || 1,
      dietary_requirements: validatedData.dietaryRequirements || undefined,
      special_requests: validatedData.specialRequests || undefined,
      status: 'pending',
      created_at: new Date(),
    };

    const result = await collection.insertOne(rsvpData);

    if (!result.insertedId) {
      console.error('RSVP creation error: Failed to insert');
      return NextResponse.json(
        { error: 'Failed to create RSVP', details: 'Could not insert RSVP' },
        { status: 500 }
      );
    }

    const rsvp = await collection.findOne({ _id: result.insertedId });

    return NextResponse.json(
      { message: 'RSVP confirmed', rsvp },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    // Check for MongoDB-specific errors
    if (error instanceof Error) {
      console.error('Error in RSVP creation:', error.message);
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

    console.error('Unexpected error:', error);
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
