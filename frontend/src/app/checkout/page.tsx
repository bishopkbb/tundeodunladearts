'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useCart } from '@/contexts/CartContext';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

// Lazy load checkout components for faster initial load
const CheckoutForm = dynamic(() => import('@/components/checkout/CheckoutForm'), {
  loading: () => (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    </div>
  ),
  ssr: false,
});

const OrderSummary = dynamic(() => import('@/components/checkout/OrderSummary'), {
  loading: () => (
    <div className="bg-white rounded-2xl shadow-xl p-6 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="space-y-3">
        <div className="h-16 bg-gray-200 rounded"></div>
        <div className="h-16 bg-gray-200 rounded"></div>
      </div>
    </div>
  ),
  ssr: false,
});

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartTotal, cartCount } = useCart();
  const [currentStep, setCurrentStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    // Check for order ID in URL (from Flutterwave redirect)
    const urlParams = new URLSearchParams(window.location.search);
    const orderParam = urlParams.get('order');
    const status = urlParams.get('status');
    const tx_ref = urlParams.get('tx_ref');
    
    if (orderParam && status === 'successful') {
      // Payment was successful via redirect
      setOrderId(orderParam);
      setCurrentStep('confirmation');
    } else if (orderParam && tx_ref) {
      // Check if order exists in session storage
      const savedOrder = sessionStorage.getItem(`toacc-order-${orderParam}`);
      if (savedOrder) {
        setOrderId(orderParam);
        setCurrentStep('confirmation');
      }
    }
  }, []);

  useEffect(() => {
    // Redirect if cart is empty
    if (cartItems.length === 0 && currentStep !== 'confirmation') {
      router.push('/shop');
    }
  }, [cartItems.length, router, currentStep]);

  if (cartItems.length === 0 && currentStep !== 'confirmation') {
    return null; // Will redirect
  }

  return (
    <>

      <main className="relative z-10 min-h-screen pt-20">
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 xs:px-6 md:px-8 py-8 xs:py-12 md:py-20 w-full">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-center gap-4 md:gap-8">
              {[
                { id: 'details', label: 'Details' },
                { id: 'payment', label: 'Payment' },
                { id: 'confirmation', label: 'Confirmation' },
              ].map((step, index) => {
                const stepIndex = ['details', 'payment', 'confirmation'].indexOf(currentStep);
                const isActive = index === stepIndex;
                const isCompleted = index < stepIndex;

                return (
                  <div key={step.id} className="flex items-center">
                    <motion.div
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4, ease: 'easeOut' }}
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                          isCompleted
                            ? 'bg-green-500 text-white'
                            : isActive
                            ? 'bg-[#C17C2E] text-white scale-110'
                            : 'bg-gray-300 text-gray-600'
                        }`}
                      >
                        {isCompleted ? (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          index + 1
                        )}
                      </div>
                      <span
                        className={`mt-2 text-sm font-semibold transition-colors ${
                          isActive ? 'text-[#C17C2E]' : isCompleted ? 'text-green-600' : 'text-gray-500'
                        }`}
                      >
                        {step.label}
                      </span>
                    </motion.div>
                    {index < 2 && (
                      <div
                        className={`w-16 md:w-24 h-1 mx-2 md:mx-4 transition-colors ${
                          isCompleted ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form - 2/3 width */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {currentStep === 'details' && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                  >
                    <Suspense fallback={
                      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                        <div className="animate-pulse space-y-4">
                          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                          <div className="h-4 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    }>
                      <CheckoutForm onNext={() => setCurrentStep('payment')} />
                    </Suspense>
                  </motion.div>
                )}
                {currentStep === 'payment' && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                  >
                    <Suspense fallback={
                      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                        <div className="animate-pulse space-y-4">
                          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                          <div className="h-4 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    }>
                      <CheckoutForm
                        onNext={(orderId?: string) => {
                          if (orderId) {
                            setOrderId(orderId);
                          }
                          setCurrentStep('confirmation');
                        }}
                        isPaymentStep
                      />
                    </Suspense>
                  </motion.div>
                )}
                {currentStep === 'confirmation' && orderId && (
                  <motion.div
                    key="confirmation"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="text-center py-12"
                  >
                    <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', delay: 0.2, stiffness: 200, damping: 15 }}
                        className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                      >
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                      <h2 className="text-3xl md:text-4xl font-bold text-[#3D2817] mb-4 font-serif">
                        Order Confirmed!
                      </h2>
                      <p className="text-lg text-[#6B4423] mb-2">Thank you for your purchase</p>
                      <p className="text-sm text-[#8B4513] mb-8">Order ID: {orderId}</p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => router.push('/')}
                          className="px-8 py-4 bg-[#C17C2E] hover:bg-[#8B4513] text-white font-bold text-lg rounded-lg transition-all duration-300 shadow-lg"
                        >
                          Continue Shopping
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => router.push('/shop')}
                          className="px-8 py-4 bg-white border-2 border-[#D4AF37] hover:bg-[#D4AF37] text-[#3D2817] font-bold text-lg rounded-lg transition-all duration-300"
                        >
                          View Order
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Order Summary - 1/3 width */}
            <div className="lg:col-span-1">
              <Suspense fallback={
                <div className="bg-white rounded-2xl shadow-xl p-6 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-16 bg-gray-200 rounded"></div>
                    <div className="h-16 bg-gray-200 rounded"></div>
                  </div>
                </div>
              }>
                <OrderSummary
                  items={cartItems}
                  total={cartTotal}
                  itemCount={cartCount}
                />
              </Suspense>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}

