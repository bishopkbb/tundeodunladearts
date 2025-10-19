'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Exhibitions', href: '/exhibitions' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Visit', href: '/visit' },
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
    href: 'https://tiktok.com/tundeodunladearts0',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription email:', email);
    alert(`Thank you for subscribing with: ${email}`);
    setEmail('');
  };

  return (
    <footer className="relative text-[#3D2817] overflow-hidden border-t-4 border-[#D4AF37]">
      {/* Layered African Textile Background - Same as Hero */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient - Warm brown tones */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 25%, #8B6914 50%, #6B4423 75%, #4A2810 100%)',
          }}
        />

        {/* Layer 1: Large Adire Pattern (Dark) */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4A574' fill-opacity='0.35' fill-rule='evenodd'%3E%3Ccircle cx='100' cy='100' r='40'/%3E%3Ccircle cx='0' cy='0' r='40'/%3E%3Ccircle cx='200' cy='0' r='40'/%3E%3Ccircle cx='0' cy='200' r='40'/%3E%3Ccircle cx='200' cy='200' r='40'/%3E%3Cpath d='M50 100 Q 75 50, 100 100 T 150 100' stroke='%23C9A97A' stroke-width='3' fill='none'/%3E%3Cpath d='M100 50 Q 50 75, 100 100 T 100 150' stroke='%23C9A97A' stroke-width='3' fill='none'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />

        {/* Layer 2: Tribal Geometric Pattern */}
        <div
          className="absolute inset-0 opacity-45"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23E8B882' stroke-width='2.5' stroke-opacity='0.4'%3E%3Cpath d='M0 30 L15 15 L30 30 L45 15 L60 30 L75 15 L90 30 L105 15 L120 30'/%3E%3Cpath d='M0 60 L15 45 L30 60 L45 45 L60 60 L75 45 L90 60 L105 45 L120 60'/%3E%3Cpath d='M0 90 L15 75 L30 90 L45 75 L60 90 L75 75 L90 90 L105 75 L120 90'/%3E%3Cpath d='M30 0 L15 15 L30 30 L15 45 L30 60 L15 75 L30 90 L15 105 L30 120'/%3E%3Cpath d='M60 0 L45 15 L60 30 L45 45 L60 60 L45 75 L60 90 L45 105 L60 120'/%3E%3Cpath d='M90 0 L75 15 L90 30 L75 45 L90 60 L75 75 L90 90 L75 105 L90 120'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '120px 120px',
          }}
        />

        {/* Layer 3: Ankara/Batik Detailed Pattern */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='160' height='160' viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4A574' fill-opacity='0.5'%3E%3Ccircle cx='20' cy='20' r='8'/%3E%3Ccircle cx='60' cy='20' r='6'/%3E%3Ccircle cx='100' cy='20' r='8'/%3E%3Ccircle cx='140' cy='20' r='6'/%3E%3Ccircle cx='40' cy='50' r='5'/%3E%3Ccircle cx='80' cy='50' r='7'/%3E%3Ccircle cx='120' cy='50' r='5'/%3E%3Ccircle cx='20' cy='80' r='7'/%3E%3Ccircle cx='60' cy='80' r='5'/%3E%3Ccircle cx='100' cy='80' r='7'/%3E%3Ccircle cx='140' cy='80' r='5'/%3E%3Ccircle cx='40' cy='110' r='6'/%3E%3Ccircle cx='80' cy='110' r='8'/%3E%3Ccircle cx='120' cy='110' r='6'/%3E%3Ccircle cx='20' cy='140' r='5'/%3E%3Ccircle cx='60' cy='140' r='7'/%3E%3Ccircle cx='100' cy='140' r='5'/%3E%3Ccircle cx='140' cy='140' r='7'/%3E%3C/g%3E%3Cg fill='none' stroke='%23C9A97A' stroke-width='2' stroke-opacity='0.3'%3E%3Cpath d='M0,40 Q40,20 80,40 T160,40'/%3E%3Cpath d='M0,80 Q40,60 80,80 T160,80'/%3E%3Cpath d='M0,120 Q40,100 80,120 T160,120'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '160px 160px',
          }}
        />

        {/* Layer 4: Fine Texture Overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23F5CBA7' fill-opacity='0.25'%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Ccircle cx='30' cy='10' r='1.5'/%3E%3Ccircle cx='50' cy='10' r='2'/%3E%3Ccircle cx='70' cy='10' r='1.5'/%3E%3Ccircle cx='20' cy='30' r='1.5'/%3E%3Ccircle cx='40' cy='30' r='2'/%3E%3Ccircle cx='60' cy='30' r='1.5'/%3E%3Ccircle cx='10' cy='50' r='2'/%3E%3Ccircle cx='30' cy='50' r='1.5'/%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3Ccircle cx='70' cy='50' r='1.5'/%3E%3Ccircle cx='20' cy='70' r='1.5'/%3E%3Ccircle cx='40' cy='70' r='2'/%3E%3Ccircle cx='60' cy='70' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Top fade from transparent to pattern */}
        <div 
          className="absolute top-0 left-0 right-0 h-32"
          style={{
            background: 'linear-gradient(to top, transparent 0%, rgba(139, 69, 19, 0.3) 100%)',
          }}
        />

        {/* Light overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Newsletter Section */}
      <div className="relative z-10 border-b border-[#D4AF37]/50">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-3 font-serif text-[#F5EFE7]">
              Stay Connected to Art & Culture
            </h3>
            <p className="text-sm md:text-base text-[#E8DCC8] mb-6">
              Join the TOACC Circle — updates, exhibitions, and artist stories delivered to you.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full sm:w-96 px-6 py-3 rounded-lg bg-white/95 border-2 border-[#D4AF37] focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 transition-all duration-300 text-[#3D2817] placeholder:text-[#6B4423]/60"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-3 bg-[#C17C2E] hover:bg-[#8B4513] text-[#ffffff] font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Column 1: Logo & Quote */}
            <div className="text-center md:text-left">
              <Link href="/" className="inline-flex items-center gap-3 mb-4 group">
                <div className="relative w-14 h-14 ring-2 ring-[#D4AF37] rounded-full overflow-hidden group-hover:ring-4 transition-all">
                  <Image
                    src="/Assets/logo.png"
                    alt="TOACC Logo"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <span className="text-xl font-bold text-[#F5EFE7] group-hover:text-[#D4AF37] transition-colors">
                  TOACC
                </span>
              </Link>
              <p className="text-xs md:text-sm italic text-[#E8DCC8] leading-relaxed font-serif mb-2 max-w-xs mx-auto md:mx-0">
                "Art is the bridge between tradition and tomorrow, where every stroke tells our story."
              </p>
              <p className="text-xs text-[#D4AF37] font-semibold">— Prince Tunde Odunlade</p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="text-center">
              <h4 className="text-lg font-bold text-[#F5EFE7] mb-4 font-serif">Quick Links</h4>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#E8DCC8] hover:text-[#D4AF37] transition-colors duration-300 inline-block relative group"
                    >
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact & Social */}
            <div className="text-center md:text-right">
              <h4 className="text-lg font-bold text-[#F5EFE7] mb-4 font-serif">Connect With Us</h4>
              <p className="text-sm text-[#E8DCC8] mb-4 leading-relaxed">
                2, Ladoke Akintola Avenue<br />
                Off Aare, New Bodija<br />
                Ibadan, Oyo State<br />
                Nigeria
              </p>
              <a 
                href="tel:+2348160082118" 
                className="text-sm text-[#D4AF37] hover:text-[#FFD700] transition-colors block mb-4"
              >
                📞 +234 816 008 2118
              </a>
              <div className="flex justify-center md:justify-end gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-[#D4AF37]/20 hover:bg-[#D4AF37] text-[#F5EFE7] hover:text-[#3D2817] flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg backdrop-blur-sm"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-[#D4AF37]/40 pt-8 text-center">
            <p className="text-xs md:text-sm text-[#E8DCC8] mb-2">
              © {new Date().getFullYear()} Tunde Odunlade Arts & Culture Connexions. All Rights Reserved.
            </p>
            <p className="text-xs text-[#C17C2E] italic">
              Designed with passion for African heritage 🎨
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}