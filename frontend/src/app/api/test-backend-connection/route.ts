import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

/**
 * Comprehensive backend connection test endpoint
 * Tests MongoDB connection, database access, and all collections
 */

interface CollectionInfo {
  exists: boolean;
  accessible: boolean;
  recordCount: number;
  error: {
    code?: string;
    message?: string;
  } | null;
}

interface DatabaseInfo {
  connected: boolean;
  collections: Record<string, CollectionInfo>;
  errors: string[];
}

interface Results {
  timestamp: string;
  environment: {
    mongodbUri: boolean;
    mongodbDbName: boolean;
  };
  mongodbClient: {
    initialized: boolean;
  };
  database: DatabaseInfo;
  apiRoutes: {
    newsletter: string;
    orders: {
      create: string;
      get: string;
    };
    rsvp: string;
    contact: string;
    artworks: string;
    exhibitions: string;
  };
  summary?: {
    status: string;
    message: string;
    recommendations: string[];
  };
}

export async function GET() {
  try {
    const results: Results = {
      timestamp: new Date().toISOString(),
      environment: {
        mongodbUri: !!process.env.MONGODB_URI,
        mongodbDbName: !!process.env.MONGODB_DB_NAME,
      },
      mongodbClient: {
        initialized: false,
      },
      database: {
        connected: false,
        collections: {},
        errors: [],
      },
      apiRoutes: {
        newsletter: '/api/newsletter/subscribe',
        orders: {
          create: '/api/orders/create-order',
          get: '/api/orders/get-order',
        },
        rsvp: '/api/rsvp/create-rsvp',
        contact: '/api/contact/submit',
        artworks: '/api/artworks',
        exhibitions: '/api/exhibitions',
      },
    };

    // Test MongoDB configuration
    if (!process.env.MONGODB_URI) {
      results.database.errors.push('MONGODB_URI is missing');
      results.summary = {
        status: '❌ Configuration Missing',
        message: 'MongoDB connection string not configured',
        recommendations: ['Add MONGODB_URI to your environment variables'],
      };
      return NextResponse.json(results, { status: 200 });
    }

    try {
      // Test MongoDB connection
      const db = await getDb();
      results.mongodbClient.initialized = true;

      // Test database connection and collections
      const collections = [
        'newsletter_subscriptions',
        'orders',
        'rsvps',
        'contact_submissions',
        'artwork_requests',
      ];

      for (const collectionName of collections) {
        try {
          const collection = db.collection(collectionName);
          const count = await collection.countDocuments();
          
          results.database.collections[collectionName] = {
            exists: true,
            accessible: true,
            recordCount: count,
            error: null,
          };
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          results.database.collections[collectionName] = {
            exists: false,
            accessible: false,
            recordCount: 0,
            error: {
              message: errorMessage,
            },
          };
          results.database.errors.push(`Error accessing '${collectionName}': ${errorMessage}`);
        }
      }

      // Overall connection status
      results.database.connected = results.database.errors.length === 0;

      // Summary
      results.summary = {
        status: results.database.connected ? '✅ Connected' : '❌ Issues Found',
        message: results.database.connected
          ? 'Backend is properly connected to MongoDB database'
          : `Found ${results.database.errors.length} issue(s). Check errors array.`,
        recommendations: [] as string[],
      };

      if (!process.env.MONGODB_URI) {
        results.summary.recommendations.push('Add MONGODB_URI to your environment variables');
      }

      if (!process.env.MONGODB_DB_NAME) {
        results.summary.recommendations.push('Add MONGODB_DB_NAME to your environment variables (optional, defaults to "toacc")');
      }

      const missingCollections = Object.entries(results.database.collections)
        .filter(([, info]) => !info.exists)
        .map(([collection]) => collection);

      if (missingCollections.length > 0) {
        results.summary.recommendations.push(
          `Collections will be created automatically on first use. Missing: ${missingCollections.join(', ')}`
        );
      }

      // Always return 200, errors are in the response
      return NextResponse.json(results, { status: 200 });
    } catch (dbError: unknown) {
      const errorMessage = dbError instanceof Error ? dbError.message : 'Unknown error';
      results.database.errors.push(`MongoDB connection failed: ${errorMessage}`);
      results.summary = {
        status: '❌ Connection Failed',
        message: 'Failed to connect to MongoDB',
        recommendations: [
          'Check MONGODB_URI is correct',
          'Verify MongoDB Atlas network access allows your IP',
          'Check MongoDB cluster is running (not paused)',
        ],
      };
      return NextResponse.json(results, { status: 200 });
    }
  } catch (error: unknown) {
    // Catch any unexpected errors
    console.error('❌ Unexpected error in test-backend-connection:', error);
    
    return NextResponse.json(
      {
        timestamp: new Date().toISOString(),
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        environment: {
          mongodbUri: !!process.env.MONGODB_URI,
          mongodbDbName: !!process.env.MONGODB_DB_NAME,
        },
        message: 'An unexpected error occurred. Check server logs for details.',
      },
      { status: 500 }
    );
  }
}
