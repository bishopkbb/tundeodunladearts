'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CartItem } from '@/contexts/CartContext';

interface OrderSummaryProps {
  items: CartItem[];
  total: number;
  itemCount: number;
  currentStep: 'details' | 'payment' | 'confirmation';
}

export default function OrderSummary({ items, total, itemCount, currentStep }: OrderSummaryProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Calculate shipping (free over 500,000 NGN, otherwise 10,000 NGN)
  const shippingThreshold = 500000;
  const shippingCost = total >= shippingThreshold ? 0 : 10000;
  
  // Calculate tax (5% VAT)
  const taxRate = 0.05;
  const tax = total * taxRate;
  
  // Final total
  const finalTotal = total + shippingCost + tax;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4, ease: 'easeOut' }}
      className="bg-white rounded-2xl shadow-xl p-6 sticky top-24"
    >
      <h3 className="text-2xl font-bold text-[#3D2817] mb-6 font-serif">Order Summary</h3>

      {/* Cart Items */}
      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3, ease: 'easeOut' }}
            className="flex gap-3 pb-4 border-b border-[#D4A574]/30"
          >
            <div className="relative w-16 h-16 rounded-md overflow-hidden border border-[#D4AF37] flex-shrink-0">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm text-[#3D2817] truncate mb-1">
                {item.title}
              </h4>
              <p className="text-xs text-[#6B4423] mb-1">{item.artist}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#8B4513]">Qty: {item.quantity}</span>
                <span className="text-sm font-bold text-[#C17C2E]">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6 pt-6 border-t-2 border-[#D4AF37]">
        <div className="flex justify-between text-[#6B4423]">
          <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
          <span className="font-semibold">{formatPrice(total)}</span>
        </div>
        
        <div className="flex justify-between text-[#6B4423]">
          <span>Shipping</span>
          <span className="font-semibold">
            {shippingCost === 0 ? (
              <span className="text-green-600">Free</span>
            ) : (
              formatPrice(shippingCost)
            )}
          </span>
        </div>
        
        {shippingCost > 0 && total < shippingThreshold && (
          <p className="text-xs text-[#8B4513] italic">
            Add {formatPrice(shippingThreshold - total)} more for free shipping
          </p>
        )}

        <div className="flex justify-between text-[#6B4423]">
          <span>Tax (VAT 5%)</span>
          <span className="font-semibold">{formatPrice(tax)}</span>
        </div>

        <div className="pt-4 border-t border-[#D4A574]/30">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-[#3D2817]">Total</span>
            <span className="text-2xl font-bold text-[#8B4513]">{formatPrice(finalTotal)}</span>
          </div>
        </div>
      </div>

      {/* Security Badge */}
      <div className="pt-6 border-t border-[#D4A574]/30">
        <div className="flex items-center gap-2 text-xs text-[#6B4423] mb-4">
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Secure checkout powered by Flutterwave</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#6B4423]">
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>30-day return policy</span>
        </div>
      </div>
    </motion.div>
  );
}

