import { NextResponse } from 'next/server';

/**
 * Comprehensive backend connection test endpoint
 * Tests Supabase connection, database access, and all tables
 */
import type { SupabaseClient } from '@supabase/supabase-js';

export async function GET() {
  // Declare supabaseAdmin in outer scope so it's accessible in catch block
  let supabaseAdmin: SupabaseClient | null = null;
  
  try {
    // Import supabaseAdmin inside try-catch to handle import errors
    try {
      const supabaseModule = await import('@/lib/supabase');
      supabaseAdmin = supabaseModule.supabaseAdmin;
    } catch (importError) {
      return NextResponse.json(
        {
          timestamp: new Date().toISOString(),
          error: 'Failed to import Supabase client',
          details: importError instanceof Error ? importError.message : 'Unknown import error',
          environment: {
            supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
            supabaseAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            supabaseServiceRoleKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
          },
        },
        { status: 200 }
      );
    }

    const results: Record<string, unknown> = {
      timestamp: new Date().toISOString(),
      environment: {
        supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        supabaseServiceRoleKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      },
      supabaseClient: {
        initialized: !!supabaseAdmin,
      },
      database: {
        connected: false,
        tables: {} as Record<string, unknown>,
        errors: [] as string[],
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

    // Test Supabase configuration
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      results.database.errors.push('NEXT_PUBLIC_SUPABASE_URL is missing');
      return NextResponse.json(results, { status: 200 }); // Return 200 with errors, not 500
    }

    if (!supabaseAdmin) {
      results.database.errors.push('Supabase admin client not initialized (SUPABASE_SERVICE_ROLE_KEY missing)');
      return NextResponse.json(results, { status: 200 }); // Return 200 with errors, not 500
    }

    // Test database connection and tables
    const tables = [
      'newsletter_subscriptions',
      'orders',
      'rsvps',
      'contact_submissions',
      'artwork_requests',
    ];

    for (const table of tables) {
      try {
        const { error, count } = await supabaseAdmin
          .from(table)
          .select('*', { count: 'exact', head: true })
          .limit(1);

        results.database.tables[table] = {
          exists: !error || error.code !== '42P01',
          accessible: !error,
          recordCount: count || 0,
          error: error ? {
            code: error.code,
            message: error.message,
            hint: error.hint,
          } : null,
        };

        if (error && error.code === '42P01') {
          results.database.errors.push(`Table '${table}' does not exist. Run migrations.`);
        } else if (error) {
          results.database.errors.push(`Table '${table}': ${error.message}`);
        }
      } catch (error) {
        results.database.tables[table] = {
          exists: false,
          accessible: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        };
        results.database.errors.push(`Error accessing '${table}': ${error instanceof Error ? error.message : 'Unknown'}`);
      }
    }

    // Overall connection status
    results.database.connected = results.database.errors.length === 0 && supabaseAdmin !== null;

    // Summary
    results.summary = {
      status: results.database.connected ? '✅ Connected' : '❌ Issues Found',
      message: results.database.connected
        ? 'Backend is properly connected to Supabase database'
        : `Found ${results.database.errors.length} issue(s). Check errors array.`,
      recommendations: [] as string[],
    };

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      results.summary.recommendations.push('Add SUPABASE_SERVICE_ROLE_KEY to frontend/.env.local');
    }

    const missingTables = Object.entries(results.database.tables)
      .filter(([, info]) => {
        const tableInfo = info as { exists?: boolean };
        return !tableInfo.exists;
      })
      .map(([table]) => table);

    if (missingTables.length > 0) {
      results.summary.recommendations.push(
        `Run migrations: cd backend && npx supabase db push (Missing tables: ${missingTables.join(', ')})`
      );
    }

    // Always return 200, errors are in the response
    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    // Catch any unexpected errors
    console.error('❌ Unexpected error in test-backend-connection:', error);
    
    return NextResponse.json(
      {
        timestamp: new Date().toISOString(),
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        environment: {
          supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
          supabaseAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          supabaseServiceRoleKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        },
        supabaseClient: {
          initialized: !!supabaseAdmin,
        },
        message: 'An unexpected error occurred. Check server logs for details.',
      },
      { status: 500 }
    );
  }
}

