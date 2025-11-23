'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import CartSidebar from '@/components/cart/CartSidebar';

// Press articles data
const pressArticles = [
  {
    id: 1,
    title: 'Global Africa History Month',
    date: 'February 2025',
    category: 'Cultural Event',
    excerpt: 'Celebrating African heritage and contemporary expression during Global Africa History Month 2025.',
    image: '/Assets/global.jpg',
    link: 'https://tundeodunladeblog.com',
    featured: true,
  },
  {
    id: 2,
    title: 'Tunde Odunlade Batik Tapestry Exhibition at STL Airport',
    date: 'July 2019',
    category: 'Exhibition',
    excerpt: 'Major exhibition showcasing Tunde Odunlade\'s batik tapestry works at St. Louis Airport, running through October 2019.',
    image: '/Assets/batik.jpg',
    link: 'https://tundeodunladeblog.com',
    featured: true,
  },
  {
    id: 3,
    title: 'Asymmetry in Motion: Tunde Odunlade',
    date: 'November 2018',
    category: 'Exhibition',
    excerpt: 'An exploration of dynamic movement and balance in Tunde Odunlade\'s contemporary batik works.',
    image: '/Assets/World Wide Web.jpg',
    link: 'https://tundeodunladeblog.com',
    featured: false,
  },
  {
    id: 4,
    title: 'New Works from Tunde Odunlade',
    date: 'October 2018',
    category: 'Exhibition',
    excerpt: 'Unveiling fresh creations that blend traditional Yoruba aesthetics with contemporary artistic vision.',
    image: '/Assets/new-works.jpg',
    link: 'https://tundeodunladeblog.com',
    featured: false,
  },
  {
    id: 5,
    title: 'Batik Quilt Tapestry Exhibition in Washington, D.C.',
    date: 'August 2018',
    category: 'Exhibition',
    excerpt: 'Exhibition of new works from Nigerian artist and activist Tunde Odunlade, featured at Culture Coffee Too, Washington, D.C.',
    image: '/Assets/tunde-in-washington.jpg',
    link: 'https://tundeodunladeblog.com',
    featured: true,
  },
  {
    id: 6,
    title: 'Closing Reception at Tikhonova @ Wintner Gallery, Harlem',
    date: 'May 2018',
    category: 'Exhibition',
    excerpt: 'Closing reception celebrating Tunde Odunlade\'s successful exhibition at Wintner Gallery in Harlem, New York.',
    image: '/Assets/tunde-in-harlem.png',
    link: 'https://tundeodunladeblog.com',
    featured: false,
  },
  {
    id: 7,
    title: 'Tunde Odunlade: November 2017 Collection',
    date: 'November 2017',
    category: 'Collection',
    excerpt: 'Featuring wax crayon on handmade rice paper, batik on paper, floatograph (oil on paper), and batik quilt tapestry. All works contain references to Yoruba "Ifa" proverbs.',
    image: '/Assets/collections.jpg',
    link: 'https://tundeodunladeblog.com/tunde-odunlade-november-2017/',
    featured: false,
  },
  {
    id: 8,
    title: 'Special Edition: 4 Decades of Printmaking',
    date: 'November 2014',
    category: 'Collection',
    excerpt: 'Hand-carved special edition of seven blocks created in Ile-Ife, Nigeria and San Antonio, Texas. Suite 1/20 is in the Smithsonian National Museum of African Art.',
    image: '/Assets/decades.jpg',
    link: 'https://tundeodunladeblog.com/2014/11/27/tunde-odunlade-special-edition-4-decades-of-printmaking/',
    featured: false,
  },
];

const pressCategories = ['All', 'Exhibition', 'Collection', 'Cultural Event', 'Award'];

export default function PressPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState<typeof pressArticles[0] | null>(null);

  const filteredArticles = selectedCategory === 'All' 
    ? pressArticles 
    : pressArticles.filter(article => article.category === selectedCategory);

  const featuredArticles = pressArticles.filter(article => article.featured);

  return (
    <>
      {/* Background Pattern - Same as About Page */}
      <div className="fixed inset-0 z-0">
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

        {/* Vignette effect - darker edges */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(75, 40, 16, 0.3) 100%)',
          }}
        />

        {/* Light overlay for content readability */}
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
                Press & Media
              </h1>
              <div className="w-32 h-1 bg-[#D4AF37] mx-auto mb-8 rounded-full" />
              <p className="text-lg md:text-xl text-[#6B4423] max-w-3xl mx-auto leading-relaxed">
                Discover our latest exhibitions, events, and cultural milestones
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Articles */}
        <section className="py-12 md:py-16 px-4 md:px-8 bg-white/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#3D2817] mb-2 font-serif">
                Featured Stories
              </h2>
              <div className="w-20 h-1 bg-[#D4AF37] rounded-full" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedArticle(article)}
                  className="group cursor-pointer"
                >
                  <div className="bg-gradient-to-br from-[#F5EFE7] to-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-[#D4AF37]">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={90}
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-[#D4AF37] text-white text-xs font-bold rounded-full">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-xs text-[#C17C2E] font-semibold mb-2">{article.date}</p>
                      <h3 className="text-xl font-bold text-[#3D2817] mb-3 line-clamp-2 group-hover:text-[#D4AF37] transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-[#6B4423] line-clamp-3 mb-4">
                        {article.excerpt}
                      </p>
                      <span className="text-sm text-[#D4AF37] font-semibold group-hover:underline">
                        Read More →
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* All Press Articles with Filter */}
        <section className="py-16 md:py-24 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#3D2817] mb-6 font-serif text-center">
                Press Archive
              </h2>
              <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-8 rounded-full" />

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {pressCategories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-[#D4AF37] text-white shadow-lg'
                        : 'bg-white/80 text-[#6B4423] hover:bg-[#F5EFE7] border-2 border-[#D4AF37]/30'
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedArticle(article)}
                  className="group cursor-pointer"
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        quality={90}
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-[#C17C2E] font-semibold">{article.date}</span>
                        <span className="px-2 py-1 bg-[#F5EFE7] text-[#8B4513] text-xs font-bold rounded">
                          {article.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-[#3D2817] mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-[#6B4423] line-clamp-2">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Article Modal */}
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#D4AF37] text-white hover:bg-[#C17C2E] transition-colors flex items-center justify-center z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Article Image */}
              <div className="relative h-72">
                <Image
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 80vw"
                  quality={90}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="px-3 py-1 bg-[#D4AF37] text-white text-xs font-bold rounded-full">
                    {selectedArticle.category}
                  </span>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-8 md:p-10">
                <p className="text-sm text-[#C17C2E] font-semibold mb-2">{selectedArticle.date}</p>
                <h2 className="text-3xl md:text-4xl font-bold text-[#3D2817] mb-4 font-serif">
                  {selectedArticle.title}
                </h2>
                <div className="w-16 h-1 bg-[#D4AF37] mb-6 rounded-full" />
                
                <p className="text-[#3D2817] leading-relaxed mb-6">
                  {selectedArticle.excerpt}
                </p>

                <a
                  href={selectedArticle.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] hover:bg-[#C17C2E] text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  View Full Article
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Press Contact Section */}
        <section className="py-16 md:py-20 px-4 md:px-8 bg-white/90 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#3D2817] mb-4 font-serif">
                Press Inquiries
              </h2>
              <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-6 rounded-full" />
              <p className="text-lg text-[#6B4423] mb-8 leading-relaxed">
                For press inquiries, interview requests, or high-resolution images, please contact our media team.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <a
                  href="tel:+2348160082118"
                  className="flex items-center gap-2 px-6 py-3 bg-[#D4AF37] hover:bg-[#C17C2E] text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Us
                </a>
                <a
                  href="mailto:press@tundeodunladearts.com"
                  className="flex items-center gap-2 px-6 py-3 bg-white text-[#D4AF37] border-2 border-[#D4AF37] hover:bg-[#F5EFE7] font-bold rounded-lg transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Press Team
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
        <CartSidebar />
      </main>
    </>
  );
}