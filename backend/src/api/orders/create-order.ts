import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { z } from 'zod';

const orderSchema = z.object({
  orderId: z.string(),
  customerEmail: z.string().email(),
  customerName: z.string().min(1),
  customerPhone: z.string().optional(),
  shippingAddress: z.object({
    address: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    country: z.string(),
  }),
  billingAddress: z.object({}).optional(),
  cartItems: z.array(z.any()),
  subtotal: z.number().positive(),
  shippingCost: z.number().min(0),
  tax: z.number().min(0),
  total: z.number().positive(),
  paymentTransactionId: z.string().optional(),
  paymentProvider: z.string().default('flutterwave'),
  notes: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = orderSchema.parse(body);

    const { data, error } = await supabaseAdmin
      .from('orders')
      .insert({
        order_id: validatedData.orderId,
        customer_email: validatedData.customerEmail,
        customer_name: validatedData.customerName,
        customer_phone: validatedData.customerPhone,
        shipping_address: validatedData.shippingAddress,
        billing_address: validatedData.billingAddress || validatedData.shippingAddress,
        cart_items: validatedData.cartItems,
        subtotal: validatedData.subtotal,
        shipping_cost: validatedData.shippingCost,
        tax: validatedData.tax,
        total: validatedData.total,
        payment_transaction_id: validatedData.paymentTransactionId,
        payment_provider: validatedData.paymentProvider,
        payment_status: validatedData.paymentTransactionId ? 'completed' : 'pending',
        order_status: validatedData.paymentTransactionId ? 'confirmed' : 'pending',
        notes: validatedData.notes,
      })
      .select()
      .single();

    if (error) {
      console.error('Order creation error:', error);
      return NextResponse.json(
        { error: 'Failed to create order', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ order: data }, { status: 201 });
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

