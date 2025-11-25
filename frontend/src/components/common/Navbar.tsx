'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { throttle } from '@/lib/utils/performance';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Exhibitions', href: '/exhibitions' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Shop', href: '/shop' },
  { label: 'Press', href: '/press' },
  { label: 'Contact', href: '/contact' },
];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, openCart } = useCart();

  // Optimized scroll handler with throttling for better performance
  useEffect(() => {
    const handleScroll = throttle(() => {
      setIsScrolled(window.scrollY > 20);
    }, 16); // ~60fps throttle

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Optimized mobile menu toggle with useCallback
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => {
      const newValue = !prev;
      // Use requestAnimationFrame for smoother menu opening
      requestAnimationFrame(() => {
        document.body.style.overflow = newValue ? 'hidden' : '';
      });
      return newValue;
    });
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-white/90 backdrop-blur-sm shadow-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo & Brand */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#D4AF37] group-hover:ring-4 transition-all duration-300">
                <Image
                  src="/Assets/logo.png"
                  alt="TOACC Logo"
                  fill
                  sizes="(max-width: 640px) 120px, 150px"
                  quality={90}
                  priority
                  className="object-cover"
                />
              </div>
              <div className="hidden sm:block">
                <p className="text-xl font-bold text-[#8B4513] leading-tight group-hover:text-[#C17C2E] transition-colors">
                  T<span className="text-[#C17C2E]">O</span>ACC
                </p>
                <p className="text-ml text-[#6B4423] leading-tight tracking-wide">
                  Tunde Odunlade
                </p>
                <p className="text-ml text-[#6B4423] leading-tight tracking-wide">
                  Arts & Culture Connexions
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-[#6B4423] hover:text-[#C17C2E] transition-colors duration-200 relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C17C2E] transition-all duration-300 group-hover:w-full" />
                  </Link>
                </motion.div>
              ))}

              {/* Shopping Cart Icon */}
              <motion.button
                onClick={openCart}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="relative p-2 text-[#8B4513] hover:text-[#C17C2E] transition-colors duration-200 group"
                aria-label="Shopping cart"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {/* Cart count badge */}
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-[#C17C2E] text-white text-xs font-bold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Mobile: Cart Icon + Menu Button */}
            <div className="lg:hidden flex items-center gap-3">
              {/* Mobile Cart Icon */}
              <button
                onClick={openCart}
                className="relative p-2 text-[#8B4513] hover:bg-[#F5EFE7] rounded-lg transition-colors"
                aria-label="Shopping cart"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#C17C2E] text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-[#8B4513] hover:bg-[#F5EFE7] active:bg-[#E8DCC8] rounded-lg transition-colors touch-manipulation"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                <motion.div
                  animate={isMobileMenuOpen ? 'open' : 'closed'}
                  className="relative w-6 h-6"
                >
                  <motion.span
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: 45, y: 8 },
                    }}
                    className="absolute top-0 left-0 w-6 h-0.5 bg-current origin-center transition-all"
                    style={{ transformOrigin: '3px 1px' }}
                  />
                  <motion.span
                    variants={{
                      closed: { opacity: 1 },
                      open: { opacity: 0 },
                    }}
                    className="absolute top-2.5 left-0 w-6 h-0.5 bg-current"
                  />
                  <motion.span
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: -45, y: -8 },
                    }}
                    className="absolute top-5 left-0 w-6 h-0.5 bg-current origin-center"
                    style={{ transformOrigin: '3px 5px' }}
                  />
                </motion.div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop - Optimized for performance */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              style={{ willChange: 'opacity' }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={toggleMobileMenu}
            />

            {/* Menu Panel - Optimized with will-change for better performance */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ 
                type: 'spring', 
                damping: 30, 
                stiffness: 300,
                mass: 0.5 // Lighter mass for faster animation
              }}
              style={{ willChange: 'transform' }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-80 max-w-[90vw] sm:max-w-[85vw] bg-white shadow-2xl z-50 lg:hidden overflow-y-auto touch-manipulation"
            >
              {/* Menu Header */}
              <div className="p-6 border-b border-[#D4A574]/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src="/Assets/logo.png"
                        alt="TOACC Logo"
                        fill
                        sizes="(max-width: 640px) 120px, 150px"
                        quality={90}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-[#8B4513]">TOACC</p>
                      <p className="text-xs text-[#6B4423]">Gallery</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-[#8B4513] hover:bg-[#F5EFE7] rounded-lg transition-colors"
                    aria-label="Close menu"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Menu Links */}
              <div className="p-6 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + index * 0.03, duration: 0.2, ease: 'easeOut' }}
                  >
                    <Link
                      href={link.href}
                      className="block px-4 py-3 text-base font-medium text-[#6B4423] hover:text-[#C17C2E] hover:bg-[#F5EFE7] active:bg-[#E8DCC8] rounded-lg transition-colors duration-150 touch-manipulation min-h-[44px] flex items-center"
                      onClick={toggleMobileMenu}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Menu Footer - Contact Info */}
              <div className="p-6 border-t border-[#D4A574]/30 bg-[#F5EFE7]">
                <p className="text-sm font-semibold text-[#8B4513] mb-3">Visit Us</p>
                <div className="space-y-2 text-sm text-[#6B4423]">
                  <p>2, Ladoke Akintola Avenue</p>
                  <p>Ibadan, Oyo State</p>
                  <a 
                    href="tel:+2348160082118" 
                    className="block text-[#C17C2E] hover:text-[#8B4513] active:text-[#6B3410] transition-colors mt-3 touch-manipulation min-h-[44px] flex items-center"
                  >
                    📞 +234 816 008 2118
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// Memoize Navbar to prevent unnecessary re-renders
export default memo(Navbar);