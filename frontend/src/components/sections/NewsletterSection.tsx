'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [subscribedEmail, setSubscribedEmail] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

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
      console.log('Newsletter API response:', { status: response.status, data });

      if (response.ok) {
        // Save the email before clearing the input
        setSubscribedEmail(email);
        setEmail('');
        setShowSuccessModal(true);
        console.log('✅ Newsletter subscription successful, showing modal');
        // Keep message for inline display too
        setMessage({ type: 'success', text: data.message || 'Successfully subscribed!' });
      } else {
        console.error('❌ Newsletter subscription failed:', data);
        const errorMessage = data.details || data.error || 'Failed to subscribe. Please try again.';
        setMessage({ type: 'error', text: errorMessage });
        
        // If it's a config error, show helpful message
        if (data.code === 'MISSING_CONFIG') {
          console.error('⚠️ MongoDB configuration is missing!');
        }
      }
    } catch (error: unknown) {
      console.error('Newsletter subscription error:', error);
      const errorMessage = error instanceof Error 
        ? error.message.includes('fetch failed') 
          ? 'Unable to connect to server. Please check your connection and try again.'
          : error.message
        : 'An error occurred. Please try again later.';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setIsSubmitting(false);
      // Clear message after 5 seconds
      setTimeout(() => setMessage(null), 5000);
    }
  };

  return (
    <>
    <section
      id="newsletter"
      className="relative py-16 px-6 lg:px-24 bg-[#F5F0E8]/90 backdrop-blur-sm"
    >
      {/* Subtle Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C17C2E' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='10' cy='10' r='1.5'/%3E%3Ccircle cx='50' cy='10' r='1.5'/%3E%3Ccircle cx='10' cy='50' r='1.5'/%3E%3Ccircle cx='50' cy='50' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />

      <motion.div
        className="max-w-3xl mx-auto relative z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Art Quote */}
        <motion.div variants={itemVariants} className="mb-8">
          <p className="text-sm md:text-base text-[#8B4513] italic font-serif">
            &quot;Art is not what you see, but what you make others see.&quot;
          </p>
          <p className="text-xs md:text-sm text-[#6B4423] mt-1">— Edgar Degas</p>
        </motion.div>

        {/* Heading */}
        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold text-[#3D2817] mb-4 font-serif"
        >
          Stay Connected to Art & Culture
        </motion.h2>

        {/* Subtext */}
        <motion.p
          variants={itemVariants}
          className="text-base md:text-lg text-[#6B4423] mb-8 leading-relaxed"
        >
          Join the TOACC Circle — updates, exhibitions, and artist stories delivered to you.
        </motion.p>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          className="w-20 h-1 bg-[#D4AF37] mx-auto mb-8 rounded-full"
        />

        {/* Newsletter Form */}
        <motion.form
          variants={itemVariants}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-10"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={isSubmitting}
            className="w-full sm:w-96 px-6 py-4 rounded-lg border-2 border-[#D4AF37]/30 focus:border-[#C17C2E] focus:outline-none focus:ring-2 focus:ring-[#C17C2E]/20 transition-all duration-300 text-[#3D2817] placeholder:text-[#6B4423]/50 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            className="w-full sm:w-auto px-8 py-4 bg-[#C17C2E] hover:bg-[#8B4513] text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </motion.button>
        </motion.form>

        {/* Message Display */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`text-center px-4 py-2 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {message.text}
          </motion.div>
        )}

        {/* Social Media Icons */}
        <motion.div variants={itemVariants}>
          <p className="text-sm text-[#6B4423] mb-4">Follow us on social media</p>
          <div className="flex justify-center gap-4">
            {/* Instagram */}
            <motion.a
              href="https://instagram.com/tundeodunladearts?igsh=MWp1dWEyam14N3c5Nw=="
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full bg-[#D4AF37]/20 hover:bg-[#D4AF37]/40 flex items-center justify-center transition-colors duration-300"
              aria-label="Follow us on Instagram"
            >
              <svg className="w-6 h-6 text-[#C17C2E]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </motion.a>

            {/* Facebook */}
            <motion.a
              href="https://facebook.com/tundeodunladearts"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full bg-[#D4AF37]/20 hover:bg-[#D4AF37]/40 flex items-center justify-center transition-colors duration-300"
              aria-label="Follow us on Facebook"
            >
              <svg className="w-6 h-6 text-[#C17C2E]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </motion.a>

            {/* TikTok */}
            <motion.a
              href="https://www.tiktok.com/@tunde.odunlade.ar"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full bg-[#D4AF37]/20 hover:bg-[#D4AF37]/40 flex items-center justify-center transition-colors duration-300"
              aria-label="Follow us on TikTok"
            >
              <svg className="w-6 h-6 text-[#C17C2E]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              href="https://wa.me/+2348160082118"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full bg-[#D4AF37]/20 hover:bg-[#D4AF37]/40 flex items-center justify-center transition-colors duration-300"
              aria-label="Contact us on WhatsApp"
            >
              <svg className="w-6 h-6 text-[#C17C2E]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </section>

      {/* Success Modal - Render outside section for proper z-index */}
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
    </>
  );
}