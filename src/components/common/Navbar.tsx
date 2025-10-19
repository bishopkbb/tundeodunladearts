'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const navLinks = [
  { label: 'Exhibitions', href: '#exhibitions' },
  { label: 'Artists', href: '#artists' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Shop', href: '#shop' },
  { label: 'Visit', href: '#visit' },
  { label: 'About', href: '#about' },
  { label: 'Press', href: '#press' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-lg'
          : 'bg-white/90 backdrop-blur-sm shadow-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <Image
                src="/Assets/logo.png"
                alt="TOACC Logo"
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>
            <div className="hidden sm:block">
              <p className="text-xl font-bold text-[#8B4513] leading-tight">
                T<span className="text-[#C17C2E]">O</span>ACC
              </p>
              <p className="text-[22px] text-[#6B4423] leading-tight tracking-wide">
                Tunde Odunlade 
              </p>
              <p className="text-[20px] text-[#6B4423] leading-tight tracking-wide">
                Arts & Culture Connexions
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#6B4423] hover:text-[#C17C2E] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#8B4513]"
            aria-label="Toggle menu"
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
                d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden pb-4 border-t border-[#D4A574]/30"
          >
            <div className="py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-2 text-sm font-medium text-[#6B4423] hover:text-[#C17C2E] hover:bg-[#F5EFE7] rounded transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}