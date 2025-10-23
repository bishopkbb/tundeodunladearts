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
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Newsletter - Inline with content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-center">
            {/* Logo & Info */}
            <div className="text-center lg:text-left">
              <Link href="/" className="inline-flex items-center gap-3 mb-3 group">
                <div className="relative w-12 h-12 ring-2 ring-[#D4AF37] rounded-full overflow-hidden group-hover:ring-4 transition-all">
                  <Image
                    src="/Assets/logo.png"
                    alt="TOACC Logo"
                    fill
                    className="object-cover"
                    unoptimized
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
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-white/95 border-2 border-[#D4AF37] focus:border-[#FFD700] focus:outline-none text-[#3D2817] placeholder:text-[#6B4423]/60"
                />
                <motion.button
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2 bg-[#C17C2E] hover:bg-[#8B4513] text-white font-bold rounded-lg transition-all"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>

          {/* Links & Social */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-[#D4AF37]/40 pt-6">
            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-4">
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
    </footer>
  );
}