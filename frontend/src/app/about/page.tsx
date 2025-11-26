'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import CartSidebar from '@/components/cart/CartSidebar';

// Artist data
const artists = [
  {
    id: 1,
    name: 'Prince Tunde Odunlade',
    role: 'Founder & Lead Artist',
    specialty: 'Batik, Textile Arts, Floatography',
    image: '/Assets/baba1.jpg', 
    bio: `Babatunde Samuel Odunlade was born on November 26, 1954, in Iremo, Ile-Ife, where he spent his formative years. A visionary Nigerian artist, actor, and musician, Prince Tunde Odunlade has become internationally renowned for his exceptional Batik art tapestry, textile designs, and his innovative technique known as floatography.

As a second-generation artist of the prestigious Oshogbo school of arts, Tunde began his artistic journey in the early 1970s under the mentorship of Yinka Adeyemi. He further honed his craft at the Oguntimehin Art-workshop at the University of Ife in 1973, where he developed his unique batik appliqué process on textiles that draws deeply from Yoruba history, culture, and contemporary Nigerian life.

Prince Tunde's artistic excellence has earned him residencies at Stillman College, Tuscaloosa, Alabama (1986, 1989), and his works grace the permanent collections of world-class institutions including the Smithsonian Museum of African Art, the World Bank Headquarters in Washington D.C., the Victoria and Albert Museum in London, the MacArthur Foundation Collection in Chicago, and the State House in Lagos, Nigeria.

Beyond his artistic practice, Prince Tunde is a cultural ambassador and community builder. He served as Artistic Director at the Toki Memorial Arts Centre in Ibadan for 14 years, nurturing countless emerging artists. He founded the International Campaign for Better Arts and Cultural Awareness (ICBACA) and the Nigerian Artists for a Nation Anew (NAFANA), organizations dedicated to using art as a tool for cultural bridge-building and national development.

In 2016, he was named a cultural ambassador for the International Coalition for the Eradication of Hunger and Abuse. In December 2020, he established the Tunde Odunlade Arts and Culture Connexions in Ibadan, creating a vibrant hub where tradition meets contemporary expression, and where over 80 artists have showcased their work since its opening.

A true Renaissance man, Prince Tunde is also an accomplished musician who plays the flute, agidigbo (mbira), and congas, and has recorded several albums integrating poetry and music. He was a performing actor with the Nigerian Cultural Troupe during FESTAC.

His life motto encapsulates his fearless creative spirit: "He who does not attempt the absurd can never achieve the impossible."`,
    achievements: [
      'Works in Smithsonian Museum of African Art',
      'Victoria & Albert Museum Collection',
      'World Bank Headquarters Collection',
      'Artist-in-Residence, Stillman College (1986, 1989)',
      'Cultural Ambassador, ICEHA (2016)',
      'Founder, TOACC Gallery (2020)',
      'Member, Visual Artists Network (VAN) USA',
      'Artistic Director, Toki Memorial Arts Centre (14 years)',
    ],
  },
  {
    id: 2,
    name: 'Yinka Adeyemi',
    role: 'Master Artist & Mentor',
    specialty: 'Traditional African Art, Sculpture, Textile Design',
    image: '/Assets/picturedoscope/IMG-20251121-WA0050.jpg',
    bio: `Yinka Adeyemi is a distinguished Nigerian artist and master craftsman, renowned for his deep commitment to preserving and advancing traditional African artistic techniques. As one of the foundational figures of the Oshogbo school of arts, Adeyemi has been instrumental in training and mentoring generations of artists, including the esteemed Prince Tunde Odunlade.

Born into a family with rich cultural heritage, Adeyemi's artistic journey began in the vibrant artistic community of Osogbo, where he developed his expertise in traditional Yoruba art forms. His mastery spans across multiple disciplines including sculpture, textile design, and ceremonial art, with each piece reflecting profound understanding of Yoruba cosmology and cultural narratives.

Adeyemi's work is characterized by its authentic representation of African identity, blending traditional motifs with contemporary relevance. His sculptures, often carved from indigenous materials, tell stories of ancestral wisdom, community values, and spiritual connections that define the Yoruba worldview.

Throughout his career, Adeyemi has dedicated himself to artistic education and cultural preservation. His mentorship has shaped countless artists who now carry forward the legacy of Nigerian artistic excellence both locally and internationally. His influence extends beyond the studio, as he actively participates in cultural festivals, art workshops, and community initiatives that promote African art and culture.

Adeyemi's commitment to artistic excellence and cultural preservation makes him a cornerstone of the Nigerian art community. His works serve as bridges between the past and present, ensuring that traditional knowledge and artistic techniques continue to inspire and guide future generations.`,
    achievements: [
      'Master Artist, Oshogbo School of Arts',
      'Mentor to Prince Tunde Odunlade and numerous contemporary artists',
      'Cultural Preservation Advocate',
      'Featured in major Nigerian art exhibitions',
      'Works in private collections across Africa and internationally',
    ],
  },
  {
    id: 3,
    name: 'Artist Name 3',
    role: 'Sculptor',
    specialty: 'Wood Carving, Bronze Casting',
    image: '/Assets/hero3.jpg',
    bio: 'Artist biography coming soon. A master sculptor working with traditional materials to create modern interpretations of African heritage.',
    achievements: [
      'Solo Exhibition at National Museum',
      'Public Art Installation, Ibadan',
      'Emerging Artist Award 2021',
    ],
  },
  {
    id: 4,
    name: 'Artist Name 4',
    role: 'Digital Artist',
    specialty: 'Digital Art, Photography',
    image: '/Assets/featured1.jpg',
    bio: 'Artist biography coming soon. Blending traditional African aesthetics with cutting-edge digital techniques.',
    achievements: [
      'Featured in International Photo Magazine',
      'Digital Art Residency, New York',
      'Instagram Artist of the Year Nominee',
    ],
  },
  {
    id: 5,
    name: 'Artist Name 5',
    role: 'Textile Designer',
    specialty: 'Adire, Fashion Design',
    image: '/Assets/featured2.jpg',
    bio: 'Artist biography coming soon. Reviving and modernizing traditional Yoruba textile techniques for contemporary fashion.',
    achievements: [
      'Lagos Fashion Week Participant',
      'UNESCO Heritage Craft Award',
      'Export to 5 Countries',
    ],
  },
];

export default function AboutPage() {
  const [selectedArtist, setSelectedArtist] = useState<typeof artists[0] | null>(null);

  return (
    <>
      {/* Background Pattern - Same as Hero Carousel */}
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

        {/* Light overlay for content readability - MORE TRANSPARENT */}
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
                About TOACC
              </h1>
              <div className="w-32 h-1 bg-[#D4AF37] mx-auto mb-8 rounded-full" />
              <p className="text-lg md:text-xl text-[#6B4423] max-w-3xl mx-auto leading-relaxed">
                Where African Heritage Meets Contemporary Expression
              </p>
            </motion.div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-12 md:py-20 px-4 md:px-8 bg-white/90 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* Vision */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-[#F5EFE7] to-white p-8 rounded-xl shadow-lg border-l-4 border-[#D4AF37]"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#8B4513] font-serif">Our Vision</h2>
                </div>
                <p className="text-[#6B4423] leading-relaxed">
                  To become a hub for creative minds, a melting point for all art and a meeting place for lovers of every artistic expression. We envision TOACC as the cultural heartbeat of Ibadan, where traditional Yoruba heritage dances with contemporary innovation, and where every visitor from practitioners to collectors, young to old finds inspiration, connection, and transformation.
                </p>
              </motion.div>

              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-[#F5EFE7] to-white p-8 rounded-xl shadow-lg border-l-4 border-[#C17C2E]"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#C17C2E] flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#8B4513] font-serif">Our Mission</h2>
                </div>
                <p className="text-[#6B4423] leading-relaxed">
                  To celebrate the rich tapestry of African arts and culture by providing a welcoming home where creative minds connect, share ideas, and grow together. We champion accessibility because we believe art should unite communities, inspire healing, and liberate minds. Through exhibitions, workshops, performances, and cultural programs, we nurture the next generation of artists while honoring our heritage.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Meet Our Artists */}
        <section id="artists" className="py-16 md:py-24 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-[#3D2817] mb-4 font-serif">
                Meet Our Artists
              </h2>
              <p className="text-base md:text-lg text-[#6B4423] mb-6">
                Click on any artist card to learn more about their journey and achievements
              </p>
              <div className="w-24 h-1 bg-[#D4AF37] mx-auto rounded-full" />
            </motion.div>

            {/* Artist Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {artists.map((artist, index) => (
                <motion.div
                  key={artist.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedArtist(artist)}
                  className="group cursor-pointer"
                >
                  <div className="relative h-80 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-4 border-[#D4AF37]">
                    <Image
                      src={artist.image}
                      alt={artist.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={90}
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-bold mb-1">{artist.name}</h3>
                      <p className="text-sm text-[#FFD700] mb-2">{artist.role}</p>
                      <p className="text-xs opacity-90">{artist.specialty}</p>
                    </div>
                    {/* Click indicator */}
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-center mt-3 text-sm text-[#8B4513] font-semibold">
                    Click to view full profile →
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Artist Modal/Expanded View */}
        {selectedArtist && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 xs:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto touch-manipulation"
            onClick={() => setSelectedArtist(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-xl sm:rounded-2xl max-w-[95vw] sm:max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl touch-manipulation"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedArtist(null)}
                className="sticky top-2 xs:top-4 right-2 xs:right-4 ml-auto w-10 h-10 xs:w-12 xs:h-12 rounded-full bg-[#D4AF37] text-white hover:bg-[#C17C2E] active:bg-[#8B4513] transition-colors flex items-center justify-center z-10 shadow-lg touch-manipulation"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Artist Image */}
              <div className="relative h-64 md:h-80">
                <Image
                  src={selectedArtist.image}
                  alt={selectedArtist.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 80vw"
                  quality={90}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Artist Details */}
              <div className="p-4 xs:p-6 sm:p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#3D2817] mb-2 font-serif">
                  {selectedArtist.name}
                </h2>
                <p className="text-lg text-[#C17C2E] font-semibold mb-1">{selectedArtist.role}</p>
                <p className="text-sm text-[#6B4423] mb-6">{selectedArtist.specialty}</p>

                <div className="w-16 h-1 bg-[#D4AF37] mb-6 rounded-full" />

                <div className="prose max-w-none">
                  {selectedArtist.bio.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-[#3D2817] leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Achievements */}
                <div className="mt-8 p-6 bg-[#F5EFE7] rounded-xl">
                  <h3 className="text-xl font-bold text-[#8B4513] mb-4 font-serif">
                    Notable Achievements
                  </h3>
                  <ul className="space-y-2">
                    {selectedArtist.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start gap-3 text-[#3D2817]">
                        <span className="text-[#D4AF37] mt-1">✦</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        <Footer />
        <CartSidebar />
      </main>
    </>
  );
}