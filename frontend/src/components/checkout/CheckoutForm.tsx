'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useCart } from '@/contexts/CartContext';
import type { FlutterwavePaymentResponse } from '@/types/flutterwave';

interface CheckoutFormData {
  // Customer Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Shipping Address
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  
  // Billing Address (if different)
  useSameBilling: boolean;
  billingAddress?: string;
  billingCity?: string;
  billingState?: string;
  billingZipCode?: string;
  billingCountry?: string;
  
  // Payment Method
  paymentMethod: 'card' | 'banktransfer' | 'mobilemoney';
  
  // Additional Info
  notes?: string;
}

interface CheckoutFormProps {
  onNext: (orderId?: string) => void;
  isPaymentStep?: boolean;
}

export default function CheckoutForm({ onNext, isPaymentStep = false }: CheckoutFormProps) {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentInitiated, setPaymentInitiated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState<'success' | 'error' | 'info'>('info');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    defaultValues: {
      country: 'Nigeria',
      useSameBilling: true,
      paymentMethod: 'card',
    },
  });

  const selectedPaymentMethod = watch('paymentMethod');

  // const useSameBilling = watch('useSameBilling'); // Not used in payment step

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Calculate totals
  const shippingThreshold = 500000;
  const shippingCost = cartTotal >= shippingThreshold ? 0 : 10000;
  const tax = cartTotal * 0.05;
  const finalTotal = cartTotal + shippingCost + tax;

  const onSubmit = async (data: CheckoutFormData) => {
    if (isPaymentStep) {
      // Initiate payment - use saved data if available, otherwise use current data
      const savedData = sessionStorage.getItem('toacc-checkout-details');
      const customerData = savedData ? JSON.parse(savedData) : data;
      await handlePayment(customerData);
    } else {
      // Save customer details and proceed to payment
      sessionStorage.setItem('toacc-checkout-details', JSON.stringify(data));
      onNext();
    }
  };

  const handlePayment = async (customerData?: CheckoutFormData) => {
    // Get customer data from saved session or passed parameter
    let finalCustomerData = customerData;
    if (!finalCustomerData) {
      const savedDetails = sessionStorage.getItem('toacc-checkout-details');
      if (savedDetails) {
        try {
          finalCustomerData = JSON.parse(savedDetails);
        } catch (error: unknown) {
          console.error('Error loading customer data:', error);
          setError('Unable to load customer details. Please try again.');
          setIsSubmitting(false);
          return;
        }
      } else {
        setError('Customer details not found. Please fill in the form again.');
        setIsSubmitting(false);
        return;
      }
    }
    
    if (!finalCustomerData) {
      setIsSubmitting(false);
      return;
    }
    setIsSubmitting(true);
    setPaymentInitiated(true);

    try {
      // Generate unique order ID
      const orderId = `TOACC-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      // Check if Flutterwave key is configured
      const flwKey = process.env.NEXT_PUBLIC_FLW_PUBLIC_KEY;
      if (!flwKey || flwKey.trim() === '') {
        setError('Payment system is not configured. Please contact support.');
        setIsSubmitting(false);
        setPaymentInitiated(false);
        return;
      }

      // Prepare payment payload for Flutterwave
      const paymentData = {
        public_key: flwKey,
        tx_ref: orderId,
        amount: finalTotal,
        currency: 'NGN',
        payment_options: selectedPaymentMethod === 'card' ? 'card' : selectedPaymentMethod === 'banktransfer' ? 'banktransfer' : 'mobilemoney',
        redirect_url: `${window.location.origin}/checkout?order=${orderId}&status=successful`,
        customer: {
          email: finalCustomerData.email,
          phone_number: finalCustomerData.phone,
          name: `${finalCustomerData.firstName} ${finalCustomerData.lastName}`,
        },
        customizations: {
          title: 'TOACC Gallery',
          description: `Purchase of ${cartItems.length} artwork(s)`,
          logo: `${window.location.origin}/Assets/logo.png`,
        },
        meta: {
          order_id: orderId,
          cart_items: cartItems.map((item) => ({
            id: item.id,
            title: item.title,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      };

      // Load Flutterwave script dynamically with timeout
      if (typeof window !== 'undefined' && !window.FlutterwaveCheckout) {
        const script = document.createElement('script');
        script.src = 'https://checkout.flutterwave.com/v3.js';
        script.async = true;
        
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error('Flutterwave script loading timeout'));
          }, 10000); // 10 second timeout
          
          script.onload = () => {
            clearTimeout(timeout);
            resolve(undefined);
          };
          
          script.onerror = () => {
            clearTimeout(timeout);
            reject(new Error('Failed to load Flutterwave script'));
          };
          
          document.body.appendChild(script);
        });
      }

      // Initialize Flutterwave checkout
      if (window.FlutterwaveCheckout) {
        // Set payment initiated state before opening
        setPaymentInitiated(true);
        setError(null);
        
        // Add timeout to detect if Flutterwave doesn't open (popup blocker or error)
        const checkIfOpened = setTimeout(() => {
          // If still showing "redirecting" after 5 seconds, Flutterwave likely didn't open
          setPaymentInitiated(false);
          setIsSubmitting(false);
          setError('Payment window did not open. Please check if pop-ups are blocked and try again.');
          setNotificationMessage('Payment window did not open. Please allow pop-ups or check your browser settings.');
          setNotificationType('error');
          setShowNotification(true);
        }, 5000);
        
        try {
          // Open Flutterwave checkout
          window.FlutterwaveCheckout({
            ...paymentData,
            callback: async (response: FlutterwavePaymentResponse) => {
              clearTimeout(checkIfOpened);
            if (response.status === 'successful') {
              try {
                // Save order to database
                const orderPayload = {
                  orderId,
                  customerEmail: finalCustomerData.email,
                  customerName: `${finalCustomerData.firstName} ${finalCustomerData.lastName}`,
                  customerPhone: finalCustomerData.phone,
                  shippingAddress: {
                    address: finalCustomerData.address,
                    city: finalCustomerData.city,
                    state: finalCustomerData.state,
                    zipCode: finalCustomerData.zipCode,
                    country: finalCustomerData.country,
                  },
                  billingAddress: finalCustomerData.useSameBilling
                    ? undefined
                    : {
                        address: finalCustomerData.billingAddress || finalCustomerData.address,
                        city: finalCustomerData.billingCity || finalCustomerData.city,
                        state: finalCustomerData.billingState || finalCustomerData.state,
                        zipCode: finalCustomerData.billingZipCode || finalCustomerData.zipCode,
                        country: finalCustomerData.billingCountry || finalCustomerData.country,
                      },
                  cartItems: cartItems.map((item) => ({
                    id: item.id,
                    title: item.title,
                    artist: item.artist,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image,
                  })),
                  subtotal: cartTotal,
                  shippingCost,
                  tax,
                  total: finalTotal,
                  paymentTransactionId: response.transaction_id || response.tx_ref,
                  paymentProvider: 'flutterwave',
                };

                try {
                  const orderResponse = await fetch('/api/orders/create-order', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderPayload),
                  });

                  if (!orderResponse.ok) {
                    const errorData = await orderResponse.json().catch(() => ({}));
                    console.error('Failed to save order to database:', errorData);
                    // Still proceed with order but log the error
                  } else {
                    console.log('✅ Order saved to database successfully');
                  }
                } catch (orderError) {
                  console.error('Error calling order API:', orderError);
                  // Still proceed with order completion
                }

                // Also save to session storage as backup
                const orderData = {
                  orderId,
                  customerData: finalCustomerData,
                  cartItems,
                  paymentResponse: response,
                  total: finalTotal,
                  shippingCost,
                  tax,
                  timestamp: new Date().toISOString(),
                };
                
                sessionStorage.setItem(`toacc-order-${orderId}`, JSON.stringify(orderData));
                sessionStorage.removeItem('toacc-checkout-details');
                
                // Clear cart
                clearCart();
                
                // Redirect to confirmation
                onNext(orderId);
              } catch (dbError) {
                const errorMessage = dbError instanceof Error 
                  ? dbError.message.includes('fetch failed') 
                    ? 'Unable to connect to server to save order. Order saved locally.'
                    : dbError.message
                  : 'Error saving order to database';
                console.error('Error saving order:', errorMessage, dbError);
                // Still proceed with order completion
                sessionStorage.setItem(`toacc-order-${orderId}`, JSON.stringify({
                  orderId,
                  customerData: finalCustomerData,
                  cartItems,
                  paymentResponse: response,
                  total: finalTotal,
                  shippingCost,
                  tax,
                  timestamp: new Date().toISOString(),
                }));
                sessionStorage.removeItem('toacc-checkout-details');
                clearCart();
                onNext(orderId);
              }
            } else {
              clearTimeout(checkIfOpened);
              setError('Payment was not successful. Please try again.');
              setIsSubmitting(false);
              setPaymentInitiated(false);
              setNotificationMessage('Payment was not successful. Please try again.');
              setNotificationType('error');
              setShowNotification(true);
            }
          },
          onclose: () => {
            clearTimeout(checkIfOpened);
            // User closed payment modal
            console.log('Payment window closed by user');
            setIsSubmitting(false);
            setPaymentInitiated(false);
            setError('Payment was cancelled. You can try again.');
            setNotificationMessage('Payment was cancelled. You can try again.');
            setNotificationType('info');
            setShowNotification(true);
          },
          modal: {
            closeButton: true,
            displayKey: false,
          },
          });
        } catch (fwError: unknown) {
          clearTimeout(checkIfOpened);
          console.error('Flutterwave checkout error:', fwError);
          setError('Failed to open payment window. Please try again.');
          setIsSubmitting(false);
          setPaymentInitiated(false);
        }
      } else {
        // Fallback: simulate payment for development
        console.warn('Flutterwave not loaded. Using fallback payment simulation.');
        await new Promise((resolve) => setTimeout(resolve, 2000));
        
        const orderId = `TOACC-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        const orderData = {
          orderId,
          customerData: finalCustomerData,
          cartItems,
          paymentResponse: { status: 'successful', transaction_id: `TXN-${Date.now()}` },
          total: finalTotal,
          shippingCost,
          tax,
          timestamp: new Date().toISOString(),
        };
        
        sessionStorage.setItem(`toacc-order-${orderId}`, JSON.stringify(orderData));
        sessionStorage.removeItem('toacc-checkout-details');
        clearCart();
        onNext(orderId);
      }
    } catch (error: unknown) {
      console.error('Payment error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred during payment. Please try again.');
      setIsSubmitting(false);
      setPaymentInitiated(false);
    }
  };

  // Load saved details if returning from payment
  useEffect(() => {
    if (isPaymentStep) {
      const savedDetails = sessionStorage.getItem('toacc-checkout-details');
      if (savedDetails) {
        try {
          const details = JSON.parse(savedDetails);
          // Populate form with saved details
          Object.keys(details).forEach((key) => {
            if (key in details && details[key] !== undefined) {
              setValue(key as keyof CheckoutFormData, details[key]);
            }
          });
        } catch (error: unknown) {
          console.error('Error loading saved details:', error);
        }
      }
    }
  }, [isPaymentStep, setValue]);

  if (isPaymentStep) {
    return (
      <>
        {/* Notification Toast */}
        <AnimatePresence>
          {showNotification && (
            <motion.div
              initial={{ opacity: 0, y: -50, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: -50, x: '-50%' }}
              className={`fixed top-24 left-1/2 z-[1000] p-4 rounded-lg shadow-2xl text-white max-w-md ${
                notificationType === 'success' 
                  ? 'bg-green-500' 
                  : notificationType === 'error' 
                  ? 'bg-red-500' 
                  : 'bg-blue-500'
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <p className="font-semibold">{notificationMessage}</p>
                <button 
                  onClick={() => setShowNotification(false)}
                  className="font-bold text-white hover:text-gray-200 transition-colors"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
      >
        <h2 className="text-3xl font-bold text-[#3D2817] mb-6 font-serif">Payment</h2>
        
        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 bg-red-50 border-2 border-red-300 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-700 font-semibold">{error}</p>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-600 hover:text-red-800"
                aria-label="Dismiss error"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
        
        {!paymentInitiated ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Payment Method Selection */}
            <div>
              <label className="block text-sm font-semibold text-[#3D2817] mb-4">
                Select Payment Method
              </label>
              <div className="space-y-3">
                {/* Card Payment */}
                <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedPaymentMethod === 'card' 
                    ? 'border-[#C17C2E] bg-[#F5EFE7] shadow-md' 
                    : 'border-[#D4AF37] hover:bg-[#F5EFE7]'
                }`}>
                  <input
                    type="radio"
                    {...register('paymentMethod')}
                    value="card"
                    className="w-5 h-5 text-[#C17C2E] focus:ring-[#D4AF37]"
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center gap-2">
                      <svg className="w-6 h-6 text-[#C17C2E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      <span className="font-semibold text-[#3D2817]">Card Payment</span>
                    </div>
                    <p className="text-sm text-[#6B4423] mt-1">Pay with Visa, Mastercard, or Verve</p>
                  </div>
                </label>

                {/* Bank Transfer */}
                <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedPaymentMethod === 'banktransfer' 
                    ? 'border-[#C17C2E] bg-[#F5EFE7] shadow-md' 
                    : 'border-[#D4AF37] hover:bg-[#F5EFE7]'
                }`}>
                  <input
                    type="radio"
                    {...register('paymentMethod')}
                    value="banktransfer"
                    className="w-5 h-5 text-[#C17C2E] focus:ring-[#D4AF37]"
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center gap-2">
                      <svg className="w-6 h-6 text-[#C17C2E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                      </svg>
                      <span className="font-semibold text-[#3D2817]">Bank Transfer</span>
                    </div>
                    <p className="text-sm text-[#6B4423] mt-1">Direct bank transfer to our account</p>
                  </div>
                </label>

                {/* Mobile Money */}
                <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedPaymentMethod === 'mobilemoney' 
                    ? 'border-[#C17C2E] bg-[#F5EFE7] shadow-md' 
                    : 'border-[#D4AF37] hover:bg-[#F5EFE7]'
                }`}>
                  <input
                    type="radio"
                    {...register('paymentMethod')}
                    value="mobilemoney"
                    className="w-5 h-5 text-[#C17C2E] focus:ring-[#D4AF37]"
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center gap-2">
                      <svg className="w-6 h-6 text-[#C17C2E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <span className="font-semibold text-[#3D2817]">Mobile Money</span>
                    </div>
                    <p className="text-sm text-[#6B4423] mt-1">Pay with mobile money (MTN, Airtel, etc.)</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Order Total Display */}
            <div className="bg-[#F5EFE7] rounded-lg p-6">
              <h3 className="font-bold text-lg text-[#3D2817] mb-4">Order Total</h3>
              <div className="space-y-2 text-[#6B4423]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold">
                    {shippingCost === 0 ? <span className="text-green-600">Free</span> : formatPrice(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (VAT 5%)</span>
                  <span className="font-semibold">{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t-2 border-[#D4AF37]">
                  <span className="text-lg font-bold text-[#3D2817]">Total</span>
                  <span className="text-xl font-bold text-[#8B4513]">{formatPrice(finalTotal)}</span>
                </div>
              </div>
            </div>

            {/* Payment Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 ${
                isSubmitting
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-[#C17C2E] hover:bg-[#8B4513] text-white shadow-lg hover:shadow-xl'
              }`}
            >
              {isSubmitting ? 'Processing...' : `Pay ${formatPrice(finalTotal)}`}
            </motion.button>

            <p className="text-xs text-center text-[#6B4423]">
              By clicking &quot;Pay&quot;, you will be redirected to Flutterwave&apos;s secure payment page
            </p>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center py-12"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="inline-block w-16 h-16 border-4 border-[#C17C2E] border-t-transparent rounded-full mb-4"
            />
            <p className="text-lg text-[#3D2817] font-semibold">Redirecting to payment...</p>
            <p className="text-sm text-[#6B4423] mt-2">Please wait while we process your payment</p>
            {error && (
              <p className="text-sm text-red-600 mt-4 font-semibold">{error}</p>
            )}
            <button
              onClick={() => {
                setPaymentInitiated(false);
                setIsSubmitting(false);
                setError(null);
              }}
              className="mt-6 px-6 py-2 bg-gray-200 hover:bg-gray-300 text-[#6B4423] font-semibold rounded-lg transition-colors"
            >
              Cancel & Try Again
            </button>
          </motion.div>
        )}
      </motion.div>
      </>
    );
  }

  return (
    <>
      {/* Notification Toast */}
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: -50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -50, x: '-50%' }}
          className={`fixed top-24 left-1/2 z-[1000] p-4 rounded-lg shadow-2xl text-white max-w-md ${
            notificationType === 'success' 
              ? 'bg-green-500' 
              : notificationType === 'error' 
              ? 'bg-red-500' 
              : 'bg-blue-500'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <p className="font-semibold">{notificationMessage}</p>
            <button 
              onClick={() => setShowNotification(false)}
              className="font-bold text-white hover:text-gray-200 transition-colors"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
      
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
    >
      <h2 className="text-3xl font-bold text-[#3D2817] mb-6 font-serif">Customer Information</h2>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mb-6 p-4 bg-red-50 border-2 border-red-300 rounded-lg"
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-700 font-semibold">{error}</p>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-600 hover:text-red-800"
              aria-label="Dismiss error"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information */}
        <div>
          <h3 className="text-xl font-bold text-[#3D2817] mb-4 font-serif">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-semibold text-[#3D2817] mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                id="firstName"
                type="text"
                {...register('firstName', { required: 'First name is required' })}
                className={`w-full px-4 py-3 rounded-lg border-2 ${
                  errors.firstName ? 'border-red-500' : 'border-[#D4A574]'
                } focus:border-[#C17C2E] focus:outline-none text-[#3D2817]`}
                placeholder="John"
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-semibold text-[#3D2817] mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                id="lastName"
                type="text"
                {...register('lastName', { required: 'Last name is required' })}
                className={`w-full px-4 py-3 rounded-lg border-2 ${
                  errors.lastName ? 'border-red-500' : 'border-[#D4A574]'
                } focus:border-[#C17C2E] focus:outline-none text-[#3D2817]`}
                placeholder="Doe"
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#3D2817] mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                className={`w-full px-4 py-3 rounded-lg border-2 ${
                  errors.email ? 'border-red-500' : 'border-[#D4A574]'
                } focus:border-[#C17C2E] focus:outline-none text-[#3D2817]`}
                placeholder="john.doe@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-[#3D2817] mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                {...register('phone', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                    message: 'Invalid phone number',
                  },
                })}
                className={`w-full px-4 py-3 rounded-lg border-2 ${
                  errors.phone ? 'border-red-500' : 'border-[#D4A574]'
                } focus:border-[#C17C2E] focus:outline-none text-[#3D2817]`}
                placeholder="+234 801 234 5678"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div>
          <h3 className="text-xl font-bold text-[#3D2817] mb-4 font-serif">Shipping Address</h3>
          
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-semibold text-[#3D2817] mb-2">
              Street Address <span className="text-red-500">*</span>
            </label>
            <input
              id="address"
              type="text"
              {...register('address', { required: 'Address is required' })}
              className={`w-full px-4 py-3 rounded-lg border-2 ${
                errors.address ? 'border-red-500' : 'border-[#D4A574]'
              } focus:border-[#C17C2E] focus:outline-none text-[#3D2817]`}
              placeholder="123 Art Gallery Street"
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-semibold text-[#3D2817] mb-2">
                City <span className="text-red-500">*</span>
              </label>
              <input
                id="city"
                type="text"
                {...register('city', { required: 'City is required' })}
                className={`w-full px-4 py-3 rounded-lg border-2 ${
                  errors.city ? 'border-red-500' : 'border-[#D4A574]'
                } focus:border-[#C17C2E] focus:outline-none text-[#3D2817]`}
                placeholder="Ibadan"
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-semibold text-[#3D2817] mb-2">
                State <span className="text-red-500">*</span>
              </label>
              <input
                id="state"
                type="text"
                {...register('state', { required: 'State is required' })}
                className={`w-full px-4 py-3 rounded-lg border-2 ${
                  errors.state ? 'border-red-500' : 'border-[#D4A574]'
                } focus:border-[#C17C2E] focus:outline-none text-[#3D2817]`}
                placeholder="Oyo State"
              />
              {errors.state && (
                <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="zipCode" className="block text-sm font-semibold text-[#3D2817] mb-2">
                ZIP/Postal Code <span className="text-red-500">*</span>
              </label>
              <input
                id="zipCode"
                type="text"
                {...register('zipCode', { required: 'ZIP code is required' })}
                className={`w-full px-4 py-3 rounded-lg border-2 ${
                  errors.zipCode ? 'border-red-500' : 'border-[#D4A574]'
                } focus:border-[#C17C2E] focus:outline-none text-[#3D2817]`}
                placeholder="200001"
              />
              {errors.zipCode && (
                <p className="text-red-500 text-xs mt-1">{errors.zipCode.message}</p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="country" className="block text-sm font-semibold text-[#3D2817] mb-2">
              Country <span className="text-red-500">*</span>
            </label>
            <select
              id="country"
              {...register('country', { required: 'Country is required' })}
              className={`w-full px-4 py-3 rounded-lg border-2 ${
                errors.country ? 'border-red-500' : 'border-[#D4A574]'
              } focus:border-[#C17C2E] focus:outline-none text-[#3D2817]`}
            >
              <option value="Nigeria">Nigeria</option>
              <option value="Ghana">Ghana</option>
              <option value="Kenya">Kenya</option>
              <option value="South Africa">South Africa</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="Other">Other</option>
            </select>
            {errors.country && (
              <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>
            )}
          </div>
        </div>

        {/* Additional Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-semibold text-[#3D2817] mb-2">
            Order Notes (Optional)
          </label>
          <textarea
            id="notes"
            {...register('notes')}
            rows={4}
            className="w-full px-4 py-3 rounded-lg border-2 border-[#D4A574] focus:border-[#C17C2E] focus:outline-none text-[#3D2817] resize-none"
            placeholder="Any special instructions or delivery preferences..."
          />
        </div>

        {/* Continue Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="w-full py-4 bg-[#C17C2E] hover:bg-[#8B4513] text-white font-bold text-lg rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Continue to Payment
        </motion.button>
      </form>
    </motion.div>
    </>
  );
}

