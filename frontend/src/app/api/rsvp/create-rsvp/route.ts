import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
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
    if (!supabaseAdmin) {
      console.error('❌ Supabase admin client not initialized!');
      return NextResponse.json(
        { error: 'Server configuration error', details: 'Supabase service role key not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const validatedData = rsvpSchema.parse(body);

    const { data, error } = await supabaseAdmin
      .from('rsvps')
      .insert({
        event_id: validatedData.eventId,
        event_type: validatedData.eventType,
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        guest_count: validatedData.guestCount || 1,
        dietary_requirements: validatedData.dietaryRequirements || null,
        special_requests: validatedData.specialRequests || null,
        status: 'pending', // Schema default is 'pending', not 'confirmed'
      })
      .select()
      .single();

    if (error) {
      console.error('RSVP creation error:', error);
      return NextResponse.json(
        { error: 'Failed to create RSVP', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'RSVP confirmed', rsvp: data },
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

