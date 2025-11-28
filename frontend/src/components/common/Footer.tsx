'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Exhibitions', href: '/exhibitions' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Shop', href: '/shop' },
  { label: 'Press', href: '/press' },
  { label: 'Contact', href: '/contact' },
];

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/tundeodunladearts?igsh=MWp1dWEyam14N3c5Nw==',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/tundeodunladearts',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@tunde.odunlade.ar',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [subscribedEmail, setSubscribedEmail] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'website',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubscribedEmail(email);
        setEmail('');
        setShowSuccessModal(true);
      } else {
        console.error('Newsletter subscription failed:', data);
        alert(data.details || data.error || 'Failed to subscribe. Please try again.');
      }
    } catch (error: unknown) {
      console.error('Newsletter subscription error:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="relative text-[#3D2817] overflow-hidden border-t-4 border-[#D4AF37]">
      {/* Simplified Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #6B4423 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4A574' fill-opacity='0.3'%3E%3Ccircle cx='60' cy='60' r='25'/%3E%3Ccircle cx='0' cy='0' r='25'/%3E%3Ccircle cx='120' cy='0' r='25'/%3E%3Ccircle cx='0' cy='120' r='25'/%3E%3Ccircle cx='120' cy='120' r='25'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '120px 120px',
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 xs:px-6 sm:px-8 py-8 xs:py-10 w-full">
          {/* Newsletter - Inline with content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-8 mb-6 xs:mb-8 items-center">
            {/* Logo & Info */}
            <div className="text-center lg:text-left w-full">
              <Link href="/" className="inline-flex items-center gap-3 mb-3 group">
                <div className="relative w-12 h-12 ring-2 ring-[#D4AF37] rounded-full overflow-hidden group-hover:ring-4 transition-all">
                  <Image
                    src="/Assets/logo.png"
                    alt="TOACC Logo"
                    fill
                    sizes="(max-width: 640px) 120px, 150px"
                    quality={90}
                    className="object-cover"
                  />
                </div>
                <span className="text-xl font-bold text-[#F5EFE7]">TOACC</span>
              </Link>
              <p className="text-sm text-[#E8DCC8] mb-2">
                2, Ladoke Akintola Avenue, Off Aare, New Bodija, Ibadan
              </p>
              <a 
                href="tel:+2348160082118" 
                className="text-sm text-[#D4AF37] hover:text-[#FFD700] transition-colors"
              >
                📞 +234 816 008 2118
              </a>
            </div>

            {/* Newsletter Form */}
            <div>
              <h3 className="text-lg font-bold mb-2 font-serif text-[#F5EFE7] text-center lg:text-left">
                Stay Connected
              </h3>
              <form onSubmit={handleSubmit} className="flex flex-col xs:flex-row gap-2 xs:gap-2 w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={isSubmitting}
                  className="flex-1 w-full xs:w-auto px-4 py-2.5 xs:py-2 text-sm xs:text-base rounded-lg bg-white/95 border-2 border-[#D4AF37] focus:border-[#FFD700] focus:outline-none text-[#3D2817] placeholder:text-[#6B4423]/60 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <motion.button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  whileHover={isSubmitting ? {} : { scale: 1.05 }}
                  whileTap={isSubmitting ? {} : { scale: 0.98 }}
                  className="w-full xs:w-auto px-6 py-2.5 xs:py-2 text-sm xs:text-base bg-[#C17C2E] hover:bg-[#8B4513] text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </motion.button>
              </form>
            </div>
          </div>

          {/* Links & Social */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 xs:gap-6 border-t border-[#D4AF37]/40 pt-4 xs:pt-6">
            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-3 xs:gap-4 w-full md:w-auto">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#E8DCC8] hover:text-[#D4AF37] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-full bg-[#D4AF37]/20 hover:bg-[#D4AF37] text-[#F5EFE7] hover:text-[#3D2817] flex items-center justify-center transition-all"
                  aria-label={`Follow us on ${social.name}`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-6 pt-4 border-t border-[#D4AF37]/30">
            <p className="text-xs text-[#E8DCC8]">
              © {new Date().getFullYear()} Tunde Odunlade Arts & Culture Connexions. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Success Modal - Same as NewsletterSection */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-[9999] pointer-events-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuccessModal(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none"
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-[95vw] sm:max-w-md w-full p-4 xs:p-6 sm:p-8 relative pointer-events-auto mx-2 sm:mx-0 touch-manipulation"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="absolute top-3 right-3 xs:top-4 xs:right-4 w-10 h-10 xs:w-8 xs:h-8 rounded-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 flex items-center justify-center transition-colors z-10 touch-manipulation"
                  aria-label="Close modal"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Success Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-[#3D2817] text-center mb-4 font-serif">
                  Thank You!
                </h3>

                {/* Message */}
                <div className="text-center text-[#6B4423] mb-6 leading-relaxed">
                  <p className="mb-2">
                    You&apos;ve successfully subscribed to our newsletter.
                  </p>
                  {subscribedEmail && (
                    <p className="text-sm font-medium text-[#8B4513] mb-2">
                      Confirmation sent to: <span className="font-bold">{subscribedEmail}</span>
                    </p>
                  )}
                  <p className="text-sm">
                    You&apos;ll receive updates about our latest exhibitions, events, and artist stories.
                  </p>
                </div>

                {/* Action Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full py-3 bg-[#C17C2E] hover:bg-[#8B4513] text-white font-bold rounded-lg transition-colors duration-300 shadow-lg"
                >
                  Continue Browsing
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}