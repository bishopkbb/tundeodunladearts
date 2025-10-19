import { Metadata } from 'next';
import Navbar from '@/components/common/Navbar';
import HeroSection from '@/components/hero/HeroSection';
import FeaturedExhibitions from '@/components/sections/FeaturedExhibitions';
import AboutSection from '@/components/sections/AboutSection';
import GalleryHighlights from '@/components/sections/GalleryHighlights';
import ShopPreview from '@/components/sections/ShopPreview';
import VisitUs from '@/components/sections/VisitUs';
import Footer from '@/components/common/Footer';
import CartSidebar from '@/components/cart/CartSidebar';

export const metadata: Metadata = {
  title: 'Tunde Odunlade Arts & Culture Connexions | Home',
  description:
    'Celebrating African heritage through the art of Prince Tunde Odunlade. Discover contemporary artworks, exhibitions, and cultural programs at TOACC Gallery in Ibadan, Nigeria.',
  keywords: [
    'African art',
    'contemporary art',
    'Tunde Odunlade',
    'art gallery',
    'Ibadan Nigeria',
    'cultural heritage',
    'TOACC',
    'buy African art',
    'art shop',
  ],
};

export default function Home() {
  return (
    <>
      {/* Fixed Background Pattern - Full Page */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: 'linear-gradient(to bottom, #8B4513 0%, #6B3410 50%, #4A2810 100%)',
        }}
      >
        {/* Layer 1: Main Batik Pattern */}
        <div
          className="absolute inset-0 opacity-45"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4A574' fill-opacity='0.6' fill-rule='evenodd'%3E%3Cpath d='M9 0h2v20H9V0zm25.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm-20 20l1.732 1-10 17.32-1.732-1 10-17.32zM58.16 4.134l1 1.732-17.32 10-1-1.732 17.32-10zm-40 40l1 1.732-17.32 10-1-1.732 17.32-10zM80 9v2H60V9h20zM20 69v2H0v-2h20zm79.32-55l-1 1.732-17.32-10 1-1.732 17.32 10zm-80 80l-1 1.732-17.32-10 1-1.732 17.32 10zm96.546-75.84l-1.732 1-10-17.32 1.732-1 10 17.32zm-100 100l-1.732 1-10-17.32 1.732-1 10 17.32zM38.16 24.134l1 1.732-17.32 10-1-1.732 17.32-10zM60 29v2H40v-2h20zm19.32 5l-1 1.732-17.32-10 1-1.732 17.32 10zM40 49v2H20v-2h20zm39.32 5l-1 1.732-17.32-10 1-1.732 17.32 10zm-40 40l-1 1.732-17.32-10 1-1.732 17.32 10zM94.134 4.84l1.732 1-10 17.32-1.732-1 10-17.32zm-40 40l1.732 1-10 17.32-1.732-1 10-17.32zm-20 20l1.732 1-10 17.32-1.732-1 10-17.32zM20 89v2H0v-2h20zm79.32 15l-1 1.732-17.32-10 1-1.732 17.32 10zm-80-80l-1 1.732-17.32-10 1-1.732 17.32 10zm96.546 55.84l-1.732 1-10-17.32 1.732-1 10 17.32zM49 69v2H29v-2h20zm40-40v2H69v-2h20zM9 20h2v20H9V20zm25.134 40.84l1.732 1-10 17.32-1.732-1 10-17.32zm-20-20l1.732 1-10 17.32-1.732-1 10-17.32zM89 0h2v20h-2V0zm25.134 40.84l1.732 1-10 17.32-1.732-1 10-17.32zm-100 0l1.732 1-10 17.32-1.732-1 10-17.32zM69 49v2H49v-2h20zm40 40v2H89v-2h20zM49 89v2H29v-2h20zm-20-20v2H9v-2h20zm80-20v2H89v-2h20z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '120px 120px',
            backgroundAttachment: 'fixed',
          }}
        />

        {/* Layer 2: Ankara Circles */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C9A97A' fill-opacity='0.5'%3E%3Ccircle cx='40' cy='40' r='20'/%3E%3Ccircle cx='0' cy='0' r='20'/%3E%3Ccircle cx='80' cy='0' r='20'/%3E%3Ccircle cx='0' cy='80' r='20'/%3E%3Ccircle cx='80' cy='80' r='20'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px',
            backgroundAttachment: 'fixed',
          }}
        />

        {/* Layer 3: Zigzag Pattern */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23F5CBA7' stroke-width='2' stroke-opacity='0.4'%3E%3Cpath d='M0 30 L10 20 L20 30 L30 20 L40 30 L50 20 L60 30'/%3E%3Cpath d='M0 50 L10 40 L20 50 L30 40 L40 50 L50 40 L60 50'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
            backgroundAttachment: 'fixed',
          }}
        />

        {/* Layer 4: Gold Dots */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='0.6'%3E%3Ccircle cx='10' cy='10' r='3'/%3E%3Ccircle cx='50' cy='10' r='4'/%3E%3Ccircle cx='90' cy='10' r='2'/%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='70' cy='30' r='3'/%3E%3Ccircle cx='10' cy='50' r='3'/%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3Ccircle cx='90' cy='50' r='4'/%3E%3Ccircle cx='30' cy='70' r='4'/%3E%3Ccircle cx='70' cy='70' r='3'/%3E%3Ccircle cx='10' cy='90' r='2'/%3E%3Ccircle cx='50' cy='90' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px',
            backgroundAttachment: 'fixed',
          }}
        />

        {/* Cream Overlay */}
        <div className="absolute inset-0 bg-[#F5EFE7]/50" />
      </div>

      {/* Main Content - Above background */}
      <main className="relative z-10 w-full min-h-screen">
        {/* Navigation */}
        <Navbar />

        {/* Hero Section */}
        <HeroSection />

        {/* Featured Exhibitions */}
        <FeaturedExhibitions />

        {/* About Section */}
        <AboutSection />

        {/* Gallery Highlights */}
        <GalleryHighlights />

        {/* Shop Preview */}
        <ShopPreview />

        {/* Visit Us */}
        <VisitUs />

        {/* Footer */}
        <Footer />

        {/* Shopping Cart Sidebar */}
        <CartSidebar />
      </main>
    </>
  );
}