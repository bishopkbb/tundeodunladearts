'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import CartSidebar from '@/components/cart/CartSidebar';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Contact form API response:', { status: response.status, data });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        console.error('Contact form submission failed:', data);
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }
    } catch (error: unknown) {
      console.error('Contact form submission error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      {/* Background Pattern */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 25%, #8B6914 50%, #6B4423 75%, #4A2810 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4A574' fill-opacity='0.35' fill-rule='evenodd'%3E%3Ccircle cx='100' cy='100' r='40'/%3E%3Ccircle cx='0' cy='0' r='40'/%3E%3Ccircle cx='200' cy='0' r='40'/%3E%3Ccircle cx='0' cy='200' r='40'/%3E%3Ccircle cx='200' cy='200' r='40'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />
        <div className="absolute inset-0 bg-[#F5EFE7]/30" />
      </div>

      <main className="relative z-10 min-h-screen pt-20">
        <Navbar />

        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-[#3D2817] mb-6 font-serif">
                Visit & Contact Us
              </h1>
              <div className="w-32 h-1 bg-[#D4AF37] mx-auto mb-8 rounded-full" />
              <p className="text-lg md:text-xl text-[#6B4423] max-w-3xl mx-auto leading-relaxed">
                Experience art in the heart of Ibadan. We&apos;d love to hear from you!
              </p>
            </motion.div>
          </div>
        </section>

        {/* Gallery Image */}
        <section className="py-8 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-[#D4AF37]"
            >
              <Image
                src="/Assets/cover2.jpg"
                alt="TOACC Gallery Interior"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 font-serif">Welcome to TOACC</h3>
                  <p className="text-sm md:text-base">Where African heritage meets contemporary expression</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Content: Two Columns */}
        <section className="py-16 md:py-24 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              
              {/* LEFT: Visit Information */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#3D2817] mb-6 font-serif">
                    Plan Your Visit
                  </h2>
                  <p className="text-[#6B4423] leading-relaxed mb-8">
                    Located in the vibrant city of Ibadan, our gallery welcomes you to explore the rich tapestry of Nigerian creativity. Experience live art, exhibitions, and cultural performances.
                  </p>
                </div>

                {/* Location */}
                <div className="flex gap-4 items-start p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border-l-4 border-[#D4AF37]">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#C17C2E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#3D2817] mb-2">Address</h3>
                    <p className="text-[#6B4423] leading-relaxed">
                      2, Ladoke Akintola Avenue<br />
                      Off Aare, New Bodija<br />
                      Ibadan, Oyo State<br />
                      Nigeria
                    </p>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex gap-4 items-start p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border-l-4 border-[#C17C2E]">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#C17C2E]/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#C17C2E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#3D2817] mb-2">Opening Hours</h3>
                    <div className="text-[#6B4423] space-y-1">
                      <p className="font-semibold">Monday - Saturday</p>
                      <p>10:00 AM - 7:00 PM</p>
                      <p className="font-semibold mt-2">Sunday</p>
                      <p>2:00 PM - 7:00 PM</p>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="flex gap-4 items-start p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border-l-4 border-[#8B4513]">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#8B4513]/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#C17C2E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#3D2817] mb-2">Contact</h3>
                    <div className="space-y-2">
                      <a 
                        href="tel:+2348160082118" 
                        className="block text-[#C17C2E] hover:text-[#8B4513] transition-colors font-semibold"
                      >
                        📞 +234 816 008 2118
                      </a>
                      <a 
                        href="mailto:info@tundeodunladearts.com" 
                        className="block text-[#C17C2E] hover:text-[#8B4513] transition-colors font-semibold"
                      >
                        ✉️ info@tundeodunladearts.com
                      </a>
                    </div>
                  </div>
                </div>


                {/* Get Directions Button */}
                <motion.a
                  href="https://www.google.com/maps/search/?api=1&query=Ibadan+Oyo+State+Nigeria"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#C17C2E] hover:bg-[#8B4513] text-white font-bold text-lg rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Get Directions
                </motion.a>
              </motion.div>

              {/* RIGHT: Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="bg-white/90 backdrop-blur-sm p-8 md:p-10 rounded-2xl shadow-2xl border-2 border-[#D4AF37]/30">
                  <h2 className="text-3xl md:text-4xl font-bold text-[#3D2817] mb-4 font-serif">
                    Get in Touch
                  </h2>
                  <p className="text-[#6B4423] mb-8">
                    Have questions? Want to book a tour? We&apos;d love to hear from you!
                  </p>

                  {/* Success Message */}
                  <AnimatePresence>
                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-green-800 font-semibold">Thank you! We&apos;ll get back to you soon.</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-[#3D2817] mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white border-2 border-[#D4A574] rounded-lg focus:border-[#C17C2E] focus:outline-none focus:ring-2 focus:ring-[#C17C2E]/20 transition-all text-[#3D2817]"
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-[#3D2817] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white border-2 border-[#D4A574] rounded-lg focus:border-[#C17C2E] focus:outline-none focus:ring-2 focus:ring-[#C17C2E]/20 transition-all text-[#3D2817]"
                        placeholder="john@example.com"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-[#3D2817] mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border-2 border-[#D4A574] rounded-lg focus:border-[#C17C2E] focus:outline-none focus:ring-2 focus:ring-[#C17C2E]/20 transition-all text-[#3D2817]"
                        placeholder="+234 XXX XXX XXXX"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-[#3D2817] mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white border-2 border-[#D4A574] rounded-lg focus:border-[#C17C2E] focus:outline-none focus:ring-2 focus:ring-[#C17C2E]/20 transition-all text-[#3D2817]"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="tour">Book a Tour</option>
                        <option value="artwork">Artwork Purchase</option>
                        <option value="commission">Commission Artwork</option>
                        <option value="exhibition">Exhibition Inquiry</option>
                        <option value="partnership">Partnership/Collaboration</option>
                        <option value="press">Press/Media</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-[#3D2817] mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 bg-white border-2 border-[#D4A574] rounded-lg focus:border-[#C17C2E] focus:outline-none focus:ring-2 focus:ring-[#C17C2E]/20 transition-all text-[#3D2817] resize-none"
                        placeholder="Tell us how we can help you..."
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                      whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                      className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                        isSubmitting
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-[#C17C2E] hover:bg-[#8B4513] text-white shadow-lg hover:shadow-xl'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Google Map */}
        <section className="py-16 px-4 md:px-8 bg-white/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#3D2817] mb-8 text-center font-serif">
                Find Us on the Map
              </h2>
              <div className="relative w-full h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#D4AF37]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126688.56347862248!2d3.8480571!3d7.377758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1039ed0f999c0a89%3A0x78e3a4cb8dd6a6c7!2sIbadan%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="TOACC Gallery Location"
                  className="grayscale-0 hover:grayscale-0 transition-all"
                />
              </div>
              <p className="text-center text-sm text-[#6B4423] mt-4 italic">
                2, Ladoke Akintola Avenue, Off Aare, New Bodija, Ibadan
              </p>
            </motion.div>
          </div>
        </section>

        <Footer />
        <CartSidebar />
      </main>
    </>
  );
}