'use client';

/**
 * Reusable Hero Background Pattern Component
 * Consistent swirling organic patterns across all pages and footer
 * Matches the deep brown swirling organic pattern with prominent designs
 */
export default function HeroBackgroundPattern() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Deep Brown Base - Rich, earthy tone matching the image */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, #3D2817 0%, #4A2810 20%, #5C3514 40%, #6B4423 60%, #5C3514 80%, #4A2810 100%)',
        }}
      />
      
      {/* Primary Swirling Organic Pattern Layer - Large Fluid Curves (More Prominent) */}
      <div
        className="absolute inset-0 opacity-90"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cfilter id='blur1'%3E%3CfeGaussianBlur stdDeviation='1'/%3E%3C/filter%3E%3C/defs%3E%3Cg fill='none' stroke='%23D4A574' stroke-width='6' stroke-opacity='0.85' filter='url(%23blur1)'%3E%3Cpath d='M50 200 Q 100 100, 200 200 T 350 200' fill='%23C9A97A' fill-opacity='0.25'/%3E%3Cpath d='M0 150 Q 80 80, 200 150 T 400 150' fill='%23E8B882' fill-opacity='0.22'/%3E%3Cpath d='M50 250 Q 130 320, 200 250 T 350 250' fill='%23D4A574' fill-opacity='0.25'/%3E%3Cpath d='M200 0 Q 280 100, 200 200 T 200 400' fill='%23C9A97A' fill-opacity='0.22'/%3E%3Cpath d='M0 280 Q 120 200, 250 280 T 450 280' fill='%23E8B882' fill-opacity='0.25'/%3E%3Cpath d='M100 50 Q 150 120, 100 180 T 100 320' fill='%23D4A574' fill-opacity='0.22'/%3E%3Cpath d='M300 80 Q 350 150, 300 220 T 300 350' fill='%23C9A97A' fill-opacity='0.25'/%3E%3Cpath d='M150 100 Q 200 50, 250 100 T 350 100' fill='%23E8B882' fill-opacity='0.22'/%3E%3Cpath d='M80 300 Q 150 250, 220 300 T 360 300' fill='%23D4A574' fill-opacity='0.25'/%3E%3Cpath d='M20 120 Q 60 80, 100 120 T 180 120' fill='%23C9A97A' fill-opacity='0.2'/%3E%3Cpath d='M220 280 Q 260 240, 300 280 T 380 280' fill='%23E8B882' fill-opacity='0.2'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '400px 400px',
          backgroundPosition: 'center center',
          backgroundAttachment: 'fixed',
        }}
      />
      
      {/* Secondary Swirling Pattern Layer - Medium Spirals (More Intricate & Prominent) */}
      <div
        className="absolute inset-0 opacity-85"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='250' height='250' viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C9A97A' fill-opacity='0.5' stroke='%23D4A574' stroke-width='3' stroke-opacity='0.7'%3E%3Cpath d='M125 125 Q 145 105, 160 125 T 185 125 Q 165 145, 125 125'/%3E%3Cpath d='M85 125 Q 105 85, 125 125 T 165 125 Q 145 165, 85 125'/%3E%3Cpath d='M125 75 Q 155 95, 145 125 T 125 175 Q 95 155, 125 75'/%3E%3Cpath d='M175 105 Q 205 125, 185 155 T 155 185 Q 125 165, 175 105'/%3E%3Cpath d='M75 155 Q 95 135, 85 165 T 75 195 Q 55 175, 75 155'/%3E%3Cpath d='M110 60 Q 130 80, 120 100 T 110 140 Q 90 120, 110 60'/%3E%3Cpath d='M150 160 Q 170 180, 160 200 T 150 230 Q 130 210, 150 160'/%3E%3Cpath d='M50 175 Q 70 155, 65 180 T 60 205 Q 40 185, 50 175'/%3E%3Cpath d='M190 50 Q 210 70, 200 95 T 190 130 Q 170 110, 190 50'/%3E%3Cpath d='M60 100 Q 80 90, 75 110 T 70 130 Q 50 120, 60 100'/%3E%3Cpath d='M180 200 Q 200 190, 195 210 T 190 230 Q 170 220, 180 200'/%3E%3Cpath d='M40 50 Q 55 40, 50 60 T 45 80 Q 30 90, 40 50'/%3E%3Cpath d='M200 200 Q 215 190, 210 210 T 205 230 Q 190 240, 200 200'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '250px 250px',
          backgroundPosition: 'top left',
          backgroundAttachment: 'fixed',
        }}
      />
      
      {/* Tertiary Swirling Pattern Layer - Smaller Organic Twists (More Visible) */}
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23E8B882' stroke-width='4' stroke-opacity='0.9'%3E%3Cpath d='M40 90 Q 55 75, 70 90 T 100 90 Q 85 105, 40 90'/%3E%3Cpath d='M110 70 Q 125 55, 140 70 T 170 70 Q 155 85, 110 70'/%3E%3Cpath d='M70 110 Q 85 125, 100 110 T 130 110 Q 115 95, 70 110'/%3E%3Cpath d='M0 140 Q 20 130, 40 140 T 80 140 Q 60 150, 0 140'/%3E%3Cpath d='M130 140 Q 150 130, 170 140 T 180 150 Q 160 160, 130 140'/%3E%3Cpath d='M30 50 Q 50 40, 45 65 T 50 85 Q 30 95, 30 50'/%3E%3Cpath d='M140 120 Q 160 110, 155 135 T 150 155 Q 130 165, 140 120'/%3E%3Cpath d='M10 90 Q 30 80, 25 105 T 30 125 Q 10 135, 10 90'/%3E%3Cpath d='M160 50 Q 180 40, 175 65 T 170 85 Q 150 95, 160 50'/%3E%3Cpath d='M90 20 Q 110 10, 105 35 T 100 55 Q 80 65, 90 20'/%3E%3Cpath d='M90 160 Q 110 150, 105 175 T 100 180 Q 80 170, 90 160'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
          backgroundPosition: 'bottom right',
          backgroundAttachment: 'fixed',
        }}
      />
      
      {/* Fine Detail Pattern Layer - Gold Accents (More Prominent) */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23F5CBA7' fill-opacity='0.6' stroke='%23D4AF37' stroke-width='2' stroke-opacity='0.5'%3E%3Cpath d='M60 60 Q 65 55, 70 60 T 80 60 Q 75 65, 60 60'/%3E%3Cpath d='M40 80 Q 50 75, 55 80 T 65 80 Q 60 85, 40 80'/%3E%3Cpath d='M80 40 Q 85 45, 85 50 T 85 60 Q 80 55, 80 40'/%3E%3Cpath d='M30 60 Q 35 55, 40 60 T 50 60 Q 45 65, 30 60'/%3E%3Cpath d='M70 90 Q 75 85, 80 90 T 90 90 Q 85 95, 70 90'/%3E%3Cpath d='M20 40 Q 30 35, 28 50 T 32 60 Q 22 65, 20 40'/%3E%3Cpath d='M100 70 Q 110 65, 108 80 T 112 90 Q 102 95, 100 70'/%3E%3Ccircle cx='25' cy='25' r='3.5'/%3E%3Ccircle cx='95' cy='25' r='3.5'/%3E%3Ccircle cx='25' cy='95' r='3.5'/%3E%3Ccircle cx='95' cy='95' r='3.5'/%3E%3Ccircle cx='60' cy='30' r='2.5'/%3E%3Ccircle cx='60' cy='90' r='2.5'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Depth and Texture Overlay - Adds richness */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(61, 40, 23, 0.15) 0%, rgba(61, 40, 23, 0.35) 100%)',
        }}
      />
      
      {/* Warm Overlay - Enhances the earthy tones (same as hero section) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F5EFE7]/20 via-transparent to-[#4A2810]/30" />
    </div>
  );
}
