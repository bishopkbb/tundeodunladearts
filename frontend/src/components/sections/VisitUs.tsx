'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export default function VisitUs() {
  return (
    <section
      id="visit"
      className="relative py-20 md:py-32 px-4 md:px-8 bg-white/90 backdrop-blur-sm overflow-hidden"
    >
      {/* Subtle Batik Pattern Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C17C2E' fill-opacity='0.3'%3E%3Ccircle cx='40' cy='40' r='3'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Ccircle cx='70' cy='10' r='3'/%3E%3Ccircle cx='10' cy='70' r='3'/%3E%3Ccircle cx='70' cy='70' r='2'/%3E%3Cpath d='M20 40 L30 30 L40 40 L50 30 L60 40' stroke='%238B4513' stroke-width='1' fill='none'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#3D2817] mb-4 font-serif">
            Experience Art in the Heart of Ibadan
          </h2>
          <p className="text-base md:text-lg text-[#6B4423] max-w-3xl mx-auto leading-relaxed">
            Located in the vibrant city of Ibadan, our gallery welcomes you to explore the rich tapestry of Nigerian creativity. Come experience live art, exhibitions, and cultural performances.
          </p>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Split Layout */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Left: Contact Information */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Gallery Image */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/Assets/cover2.jpg"
                alt="Visitors at TOACC Gallery"
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {/* Address */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#C17C2E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#3D2817] mb-1">Address</h3>
                  <p className="text-[#6B4423]">
                    Tunde Odunlade Arts & Culture Connexions<br />
                    2, Ladoke Akintola Avenue<br />
                    Off Aare, New Bodija<br />
                    Ibadan, Oyo State<br />
                    Nigeria
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#C17C2E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#3D2817] mb-1">Phone</h3>
                  <a href="tel:+2348160082118" className="text-[#C17C2E] hover:text-[#8B4513] transition-colors">
                    +234 816 008 2118
                  </a>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#C17C2E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#3D2817] mb-1">Opening Hours</h3>
                  <div className="text-[#6B4423] space-y-1">
                    <p>Monday - Saturday: 10:00 AM - 7:00 PM</p>
                    <p>Sunday: 2:00 AM - 7:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#C17C2E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#3D2817] mb-1">Email</h3>
                  <a href="mailto:info@tundeodunladearts.com" className="text-[#C17C2E] hover:text-[#8B4513] transition-colors">
                    info@tundeodunladearts.com
                  </a>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <a
                href="https://www.google.com/maps/search/?api=1&query=Ibadan+Oyo+State+Nigeria"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#C17C2E] hover:bg-[#8B4513] text-white font-bold text-lg rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Get Directions
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Google Map */}
          <motion.div variants={itemVariants} className="lg:sticky lg:top-24">
            <div className="relative w-full h-[500px] md:h-[600px] rounded-xl overflow-hidden shadow-2xl border-4 border-[#D4AF37]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126688.56347862248!2d3.8480571!3d7.377758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1039ed0f999c0a89%3A0x78e3a4cb8dd6a6c7!2sIbadan%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="TOACC Gallery Location"
              />
            </div>
            <p className="text-sm text-[#6B4423] mt-4 text-center italic">
              Find us in the heart of Ibadan
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}