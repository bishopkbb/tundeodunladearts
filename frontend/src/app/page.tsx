import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Navbar from '@/components/common/Navbar';
import HeroSection from '@/components/hero/HeroSection';
import Footer from '@/components/common/Footer';
import CartSidebar from '@/components/cart/CartSidebar';

// Dynamic imports for heavy components - load after initial render
const FeaturedExhibitions = dynamic(() => import('@/components/sections/FeaturedExhibitions'), {
  loading: () => <div className="min-h-[400px]" />,
});
const AboutSection = dynamic(() => import('@/components/sections/AboutSection'), {
  loading: () => <div className="min-h-[400px]" />,
});
const GalleryHighlights = dynamic(() => import('@/components/sections/GalleryHighlights'), {
  loading: () => <div className="min-h-[400px]" />,
});
const ShopPreview = dynamic(() => import('@/components/sections/ShopPreview'), {
  loading: () => <div className="min-h-[400px]" />,
});
const VisitUs = dynamic(() => import('@/components/sections/VisitUs'), {
  loading: () => <div className="min-h-[400px]" />,
});

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
      {/* Optimized Background Pattern - Reduced layers for performance */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: 'linear-gradient(to bottom, #8B4513 0%, #6B3410 50%, #4A2810 100%)',
        }}
      >
        {/* Single optimized pattern layer */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4A574' fill-opacity='0.35' fill-rule='evenodd'%3E%3Ccircle cx='100' cy='100' r='40'/%3E%3Ccircle cx='0' cy='0' r='40'/%3E%3Ccircle cx='200' cy='0' r='40'/%3E%3Ccircle cx='0' cy='200' r='40'/%3E%3Ccircle cx='200' cy='200' r='40'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
            willChange: 'auto',
          }}
        />

        {/* Cream Overlay */}
        <div className="absolute inset-0 bg-[#F5EFE7]/50" />
      </div>

      {/* Main Content - Above background */}
      <main className="relative z-10 w-full min-h-screen max-w-full overflow-x-hidden">
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