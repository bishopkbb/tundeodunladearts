'use client';

import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import CartSidebar from '@/components/cart/CartSidebar';
import ArtCollections from '@/components/sections/ArtCollections';
import BatikBackground from '@/components/ui/BatikBackground';
import PageHero from '@/components/ui/PageHero';

export default function GalleryPage() {
  return (
    <>
      {/* Background Pattern */}
      <BatikBackground motif="cowrie" />

      <main className="relative z-10 min-h-screen pt-20">
        <Navbar />

        {/* Hero Section */}
        <PageHero title="Art Gallery" subtitle="Explore our curated collection of unique artworks available for inquiry" />

        {/* Art Collections Section */}
        <ArtCollections />

        <Footer />
        <CartSidebar />
      </main>
    </>
  );
}
