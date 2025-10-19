'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';

export default function CartSidebar() {
  const { cartItems, cartCount, cartTotal, removeFromCart, updateQuantity, isCartOpen, closeCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(price);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={closeCart}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#D4A574]/30 bg-[#F5EFE7]">
              <div>
                <h2 className="text-2xl font-bold text-[#8B4513] font-serif">Your Cart</h2>
                <p className="text-sm text-[#6B4423]">{cartCount} {cartCount === 1 ? 'item' : 'items'}</p>
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-[#8B4513] hover:bg-[#D4A574]/20 rounded-lg transition-colors"
                aria-label="Close cart"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <svg className="w-24 h-24 text-[#D4A574] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <h3 className="text-xl font-bold text-[#8B4513] mb-2">Your cart is empty</h3>
                  <p className="text-[#6B4423] mb-6">Discover beautiful artworks in our gallery</p>
                  <button
                    onClick={closeCart}
                    className="px-6 py-3 bg-[#C17C2E] hover:bg-[#8B4513] text-white font-semibold rounded-lg transition-colors"
                  >
                    Browse Gallery
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="flex gap-4 p-4 bg-[#F5EFE7] rounded-lg border border-[#D4A574]/30"
                    >
                      {/* Image */}
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 border-[#D4AF37]">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[#3D2817] text-sm mb-1 truncate">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#6B4423] mb-2">{item.artist}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-bold text-[#C17C2E]">
                            {formatPrice(item.price)}
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center bg-white border border-[#D4A574] text-[#8B4513] rounded hover:bg-[#F5EFE7] transition-colors"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="text-sm font-semibold text-[#3D2817] w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center bg-white border border-[#D4A574] text-[#8B4513] rounded hover:bg-[#F5EFE7] transition-colors"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="self-start p-1 text-[#C17C2E] hover:text-[#8B4513] transition-colors"
                        aria-label="Remove item"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer - Checkout */}
            {cartItems.length > 0 && (
              <div className="border-t border-[#D4A574]/30 p-6 bg-[#F5EFE7]">
                {/* Subtotal */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-[#3D2817]">Subtotal</span>
                  <span className="text-2xl font-bold text-[#8B4513]">
                    {formatPrice(cartTotal)}
                  </span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => {
                    // Will implement checkout later
                    alert('Checkout functionality coming soon!');
                  }}
                  className="w-full py-4 bg-[#C17C2E] hover:bg-[#8B4513] text-white font-bold text-lg rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Proceed to Checkout
                </button>

                <p className="text-xs text-[#6B4423] text-center mt-3">
                  Shipping and taxes calculated at checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}