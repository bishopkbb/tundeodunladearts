import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Navbar from '@/components/common/Navbar';
import HeroSection from '@/components/hero/HeroSection';
import Footer from '@/components/common/Footer';
import CartSidebar from '@/components/cart/CartSidebar';
import { SectionSkeleton } from '@/components/ui/Skeleton';
import BatikBackground from '@/components/ui/BatikBackground';
import AdireDivider from '@/components/ui/AdireDivider';

// Dynamic imports for heavy components - load after initial render
const FeaturedExhibitions = dynamic(() => import('@/components/sections/FeaturedExhibitions'), {
  loading: () => <SectionSkeleton />,
});
const AboutSection = dynamic(() => import('@/components/sections/AboutSection'), {
  loading: () => <SectionSkeleton />,
});
const GalleryHighlights = dynamic(() => import('@/components/sections/GalleryHighlights'), {
  loading: () => <SectionSkeleton />,
});
const ShopPreview = dynamic(() => import('@/components/sections/ShopPreview'), {
  loading: () => <SectionSkeleton />,
});
const VisitUs = dynamic(() => import('@/components/sections/VisitUs'), {
  loading: () => <SectionSkeleton />,
});

// Event statuses (upcoming / past) depend on today's date, so refresh the static page hourly.
export const revalidate = 3600;

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
      {/* Batik / adire background (oniko rosettes) */}
      <BatikBackground motif="oniko" variant="home" strength={0.5} overlay={0.5} />

      {/* Main Content - Above background */}
      <main className="relative z-10 w-full min-h-screen max-w-full overflow-x-hidden">
        {/* Navigation */}
        <Navbar />

        {/* Hero Section */}
        <HeroSection />

        {/* Indigo adire divider */}
        <AdireDivider />

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