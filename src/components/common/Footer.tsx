'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const footerLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Exhibitions', href: '#exhibitions' },
  { label: 'Visit', href: '#visit' },
  { label: 'Contact', href: '#contact' },
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
    <footer className="relative bg-[#4A2810] text-[#F5EFE7] overflow-hidden">
      {/* Subtle Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='10' cy='10' r='1.5'/%3E%3Ccircle cx='50' cy='10' r='1.5'/%3E%3Ccircle cx='10' cy='50' r='1.5'/%3E%3Ccircle cx='50' cy='50' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Newsletter Section */}
      <div className="relative z-10 border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-3 font-serif text-[#D4AF37]">
              Stay Connected to Art & Culture
            </h3>
            <p className="text-sm md:text-base text-[#F5EFE7]/80 mb-6">
              Join the TOACC Circle — updates, exhibitions, and artist stories delivered to you.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full sm:w-96 px-6 py-3 rounded-lg bg-[#F5EFE7]/10 border border-[#D4AF37]/30 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-300 text-[#F5EFE7] placeholder:text-[#F5EFE7]/40"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-3 bg-[#D4AF37] hover:bg-[#C17C2E] text-[#3D2817] font-bold rounded-lg transition-all duration-300 shadow-lg"
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
              <Link href="/" className="inline-flex items-center gap-2 mb-4">
                <div className="relative w-12 h-12">
                  <Image
                    src="/Assets/logo.png"
                    alt="TOACC Logo"
                    fill
                    className="object-cover rounded-full"
                    unoptimized
                  />
                </div>
                <span className="text-lg font-bold text-[#D4AF37]">TOACC</span>
              </Link>
              <p className="text-xs md:text-sm italic text-[#F5EFE7]/70 leading-relaxed font-serif mb-2">
                "Art is the bridge between tradition and tomorrow, where every stroke tells our story."
              </p>
              <p className="text-xs text-[#D4AF37]">— Prince Tunde Odunlade</p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="text-center">
              <h4 className="text-lg font-bold text-[#D4AF37] mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#F5EFE7]/80 hover:text-[#D4AF37] transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact & Social */}
            <div className="text-center md:text-right">
              <h4 className="text-lg font-bold text-[#D4AF37] mb-4">Connect With Us</h4>
              <p className="text-sm text-[#F5EFE7]/80 mb-4">
                2, Ladoke Akintola Avenue<br />
                Off Aare, New Bodija<br />
                Ibadan, Oyo State<br />
                Nigeria
              </p>
              <div className="flex justify-center md:justify-end gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-[#D4AF37]/20 hover:bg-[#D4AF37] text-[#F5EFE7] hover:text-[#3D2817] flex items-center justify-center transition-all duration-300"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-[#D4AF37]/20 pt-8 text-center">
            <p className="text-xs md:text-sm text-[#F5EFE7]/60">
              © {new Date().getFullYear()} Tunde Odunlade Art & Culture Gallery. All Rights Reserved.
            </p>
            <p className="text-xs text-[#F5EFE7]/40 mt-2">
              Designed with passion for African heritage
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}