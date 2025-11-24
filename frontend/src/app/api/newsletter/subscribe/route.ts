import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { z } from 'zod';

const subscribeSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  source: z.string().optional().default('website'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('📧 Newsletter subscription request:', body);
    
    const validatedData = subscribeSchema.parse(body);
    const normalizedEmail = validatedData.email.toLowerCase().trim();
    console.log('📝 Normalized email:', normalizedEmail);

    if (!supabaseAdmin) {
      console.error('❌ Supabase admin client not initialized!');
      console.error('   SUPABASE_SERVICE_ROLE_KEY is missing from environment variables.');
      console.error('   Please add it to your .env.local file.');
      return NextResponse.json(
        { 
          error: 'Server configuration error', 
          details: 'Supabase service role key not configured. Please contact the administrator.',
          code: 'MISSING_CONFIG'
        },
        { status: 500 }
      );
    }
    
    // Verify Supabase URL is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      console.error('❌ NEXT_PUBLIC_SUPABASE_URL is missing!');
      return NextResponse.json(
        { 
          error: 'Server configuration error', 
          details: 'Supabase URL not configured',
          code: 'MISSING_CONFIG'
        },
        { status: 500 }
      );
    }

    // Check if already subscribed
    console.log('🔍 Checking for existing subscription...');
    console.log('📊 Supabase Admin Client Status:', {
      initialized: !!supabaseAdmin,
      url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing',
      serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Set' : 'Missing',
    });
    
    const { data: existing, error: checkError } = await supabaseAdmin
      .from('newsletter_subscriptions')
      .select('id, email, status')
      .eq('email', normalizedEmail)
      .maybeSingle();

    if (checkError) {
      console.error('❌ Error checking existing subscription:', checkError);
      // PGRST116 is "not found" which is fine, but other errors are real problems
      if (checkError.code !== 'PGRST116') {
        return NextResponse.json(
          { error: 'Database error', details: checkError.message, code: checkError.code },
          { status: 500 }
        );
      }
    }

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
      const { data: updated, error: updateError } = await supabaseAdmin
        .from('newsletter_subscriptions')
        .update({
          status: 'active',
          subscribed_at: new Date().toISOString(),
          unsubscribed_at: null,
        })
        .eq('email', normalizedEmail)
        .select()
        .single();

      if (updateError) {
        console.error('❌ Error reactivating subscription:', updateError);
        return NextResponse.json(
          { error: 'Failed to reactivate subscription', details: updateError.message, code: updateError.code },
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
      status: 'active',
      subscribed_at: new Date().toISOString(),
    };
    console.log('📝 Inserting data:', JSON.stringify(subscriptionData, null, 2));

    // Use upsert to handle race conditions and ensure insert
    const { data: newSubscription, error: insertError } = await supabaseAdmin
      .from('newsletter_subscriptions')
      .upsert(
        subscriptionData,
        {
          onConflict: 'email',
          ignoreDuplicates: false,
        }
      )
      .select()
      .single();

    if (insertError) {
      console.error('❌ Newsletter subscription insert error:');
      console.error('   Message:', insertError.message);
      console.error('   Code:', insertError.code);
      console.error('   Hint:', insertError.hint);
      console.error('   Details:', insertError.details);
      console.error('   Full error:', JSON.stringify(insertError, null, 2));
      console.error('   Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
      console.error('   Service Role Key Present:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);
      
      // Check for common errors
      if (insertError.code === '23505') {
        // Try to get the existing record
        const { data: existingRecord } = await supabaseAdmin
          .from('newsletter_subscriptions')
          .select('*')
          .eq('email', normalizedEmail)
          .single();
          
        console.log('📋 Found existing record despite error:', existingRecord);
        
        // If we found it, it's actually a success
        if (existingRecord) {
          return NextResponse.json(
            { 
              message: 'Already subscribed! Thank you for your interest.', 
              subscribed: true,
              data: existingRecord,
            },
            { status: 200 }
          );
        }
        
        return NextResponse.json(
          { 
            error: 'This email is already subscribed', 
            details: 'Duplicate email address',
            code: insertError.code,
          },
          { status: 409 }
        );
      }
      
      if (insertError.code === '42P01') {
        return NextResponse.json(
          { 
            error: 'Database table not found', 
            details: 'The newsletter_subscriptions table does not exist. Please run migrations.',
            code: insertError.code,
          },
          { status: 500 }
        );
      }

      // Try alternative insert method if upsert fails
      console.log('⚠️ Upsert failed, trying regular insert...');
      const { data: altSubscription, error: altError } = await supabaseAdmin
        .from('newsletter_subscriptions')
        .insert(subscriptionData)
        .select()
        .single();
        
      if (altError) {
        console.error('❌ Alternative insert also failed:', altError);
        return NextResponse.json(
          { 
            error: 'Failed to subscribe', 
            details: altError.message || insertError.message,
            code: altError.code || insertError.code,
            hint: altError.hint || insertError.hint,
          },
          { status: 500 }
        );
      }
      
      console.log('✅ Successfully created newsletter subscription (alternative method):', altSubscription);
      return NextResponse.json(
        { 
          message: 'Successfully subscribed! Thank you for joining us.', 
          subscribed: true,
          data: altSubscription,
        },
        { status: 201 }
      );
    }

    console.log('✅ Successfully created newsletter subscription:', JSON.stringify(newSubscription, null, 2));
    console.log('📊 Verification - Checking database...');
    
    // Verify the insert by querying the database
    const { data: verifyData, error: verifyError } = await supabaseAdmin
      .from('newsletter_subscriptions')
      .select('*')
      .eq('email', normalizedEmail)
      .single();
      
    if (verifyError) {
      console.error('⚠️ Verification query failed (but insert might have succeeded):', verifyError);
    } else {
      console.log('✅ Verification successful - Record found in database:', verifyData);
    }

    return NextResponse.json(
      { message: 'Successfully subscribed! Thank you for joining us.', subscribed: true },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Unexpected error in newsletter subscription:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

