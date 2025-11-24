import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// Test endpoint to verify Supabase configuration
export async function GET() {
  try {
    const checks = {
      supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      supabaseServiceRoleKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      supabaseAdminClient: !!supabaseAdmin,
    };

    if (!supabaseAdmin) {
      return NextResponse.json(
        {
          configured: false,
          checks,
          error: 'Supabase admin client not initialized. Please check SUPABASE_SERVICE_ROLE_KEY in .env.local',
        },
        { status: 500 }
      );
    }

    // Try to query the database
    const { error } = await supabaseAdmin
      .from('newsletter_subscriptions')
      .select('count')
      .limit(1);

    if (error) {
      return NextResponse.json(
        {
          configured: true,
          checks,
          databaseError: error.message,
          errorCode: error.code,
          errorHint: error.hint,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      configured: true,
      checks,
      databaseConnected: true,
      message: 'Supabase is properly configured and connected',
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        configured: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

