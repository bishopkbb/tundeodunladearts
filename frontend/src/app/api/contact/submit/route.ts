import { NextRequest, NextResponse } from 'next/server';
import { ContactSubmissions } from '@/lib/mongodb-models';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(1),
  message: z.string().min(1),
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
    const validatedData = contactSchema.parse(body);

    let collection;
    try {
      collection = await ContactSubmissions.collection();
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

    const submissionData = {
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone || null,
      subject: validatedData.subject,
      message: validatedData.message,
      status: 'new',
      created_at: new Date(),
    };

    const result = await collection.insertOne(submissionData);

    if (!result.insertedId) {
      console.error('Contact form submission error: Failed to insert');
      return NextResponse.json(
        { error: 'Failed to submit contact form', details: 'Could not insert submission' },
        { status: 500 }
      );
    }

    const submission = await collection.findOne({ _id: result.insertedId });

    return NextResponse.json(
      { message: 'Thank you for your message! We will get back to you soon.', submission },
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
      console.error('Error in contact submission:', error.message);
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
