import { NextRequest, NextResponse } from 'next/server';
import { Orders } from '@/lib/mongodb-models';
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

    const body = await request.json();
    const validatedData = orderSchema.parse(body);

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

    const orderData = {
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
      payment_transaction_id: validatedData.paymentTransactionId || null,
      payment_provider: validatedData.paymentProvider || 'flutterwave',
      payment_status: (validatedData.paymentTransactionId ? 'completed' : 'pending') as const,
      order_status: (validatedData.paymentTransactionId ? 'confirmed' : 'pending') as const,
      shipping_status: 'not_shipped',
      notes: validatedData.notes,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const result = await collection.insertOne(orderData);

    if (!result.insertedId) {
      console.error('Order creation error: Failed to insert');
      return NextResponse.json(
        { error: 'Failed to create order', details: 'Could not insert order' },
        { status: 500 }
      );
    }

    const order = await collection.findOne({ _id: result.insertedId });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    // Check for MongoDB-specific errors
    if (error instanceof Error) {
      console.error('Error in order creation:', error.message);
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
