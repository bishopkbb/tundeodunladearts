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
    const validatedData = subscribeSchema.parse(body);

    // Check if already subscribed
    const { data: existing } = await supabaseAdmin
      .from('newsletter_subscriptions')
      .select('email, status')
      .eq('email', validatedData.email)
      .single();

    if (existing) {
      if (existing.status === 'active') {
        return NextResponse.json(
          { message: 'Already subscribed', subscribed: true },
          { status: 200 }
        );
      }

      // Reactivate subscription
      const { error: updateError } = await supabaseAdmin
        .from('newsletter_subscriptions')
        .update({
          status: 'active',
          subscribed_at: new Date().toISOString(),
          unsubscribed_at: null,
        })
        .eq('email', validatedData.email);

      if (updateError) {
        throw updateError;
      }

      return NextResponse.json(
        { message: 'Subscription reactivated', subscribed: true },
        { status: 200 }
      );
    }

    // Create new subscription
    const { error } = await supabaseAdmin
      .from('newsletter_subscriptions')
      .insert({
        email: validatedData.email,
        name: validatedData.name,
        source: validatedData.source,
        status: 'active',
      });

    if (error) {
      console.error('Newsletter subscription error:', error);
      return NextResponse.json(
        { error: 'Failed to subscribe', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Successfully subscribed', subscribed: true },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

