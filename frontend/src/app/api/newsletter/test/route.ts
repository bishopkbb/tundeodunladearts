import { NextResponse } from 'next/server';
import { NewsletterSubscriptions } from '@/lib/mongodb-models';

export async function GET() {
  try {
    // Check environment variables
    const hasMongoUri = !!process.env.MONGODB_URI;
    const hasDbName = !!process.env.MONGODB_DB_NAME;
    
    const diagnostics: Record<string, unknown> = {
      timestamp: new Date().toISOString(),
      environment: {
        hasMongoUri,
        hasDbName,
        dbName: process.env.MONGODB_DB_NAME || 'toacc (default)',
        nodeEnv: process.env.NODE_ENV,
      },
    };

    if (!hasMongoUri) {
      return NextResponse.json(
        {
          success: false,
          error: 'MONGODB_URI is not configured',
          diagnostics,
        },
        { status: 500 }
      );
    }

    // Test MongoDB connection
    try {
      const collection = await NewsletterSubscriptions.collection();
      const count = await collection.countDocuments();
      
      diagnostics.mongodb = {
        connected: true,
        collectionName: 'newsletter_subscriptions',
        documentCount: count,
      };

      return NextResponse.json({
        success: true,
        message: 'Newsletter API is working correctly',
        diagnostics,
      });
    } catch (dbError) {
      diagnostics.mongodb = {
        connected: false,
        error: dbError instanceof Error ? dbError.message : 'Unknown error',
      };

      return NextResponse.json(
        {
          success: false,
          error: 'MongoDB connection failed',
          diagnostics,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Unexpected error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

