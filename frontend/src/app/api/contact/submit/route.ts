import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
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
    if (!supabaseAdmin) {
      console.error('❌ Supabase admin client not initialized!');
      return NextResponse.json(
        { error: 'Server configuration error', details: 'Supabase service role key not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    const { data, error } = await supabaseAdmin
      .from('contact_submissions')
      .insert({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        subject: validatedData.subject,
        message: validatedData.message,
        status: 'new', // Schema default
      })
      .select()
      .single();

    if (error) {
      console.error('Contact form submission error:', error);
      return NextResponse.json(
        { error: 'Failed to submit contact form', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Thank you for your message! We will get back to you soon.', submission: data },
      { status: 201 }
    );
  } catch (error: unknown) {
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

