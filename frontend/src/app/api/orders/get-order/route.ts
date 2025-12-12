import { NextRequest, NextResponse } from 'next/server';
import { Orders } from '@/lib/mongodb-models';

export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    let collection;
    try {
      collection = await Orders.collection();
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
    const order = await collection.findOne({ order_id: orderId });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ order }, { status: 200 });
  } catch (error: unknown) {
    // Check for MongoDB-specific errors
    if (error instanceof Error) {
      console.error('Error fetching order:', error.message);
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
