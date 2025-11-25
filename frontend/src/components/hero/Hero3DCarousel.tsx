'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const heroImages = [
  { src: '/Assets/hero1.jpg', title: 'Cultural Heritage' },
  { src: '/Assets/hero2.jpg', title: 'Happy Mother and Child' },
  { src: '/Assets/hero3.jpg', title: 'Head' },
  { src: '/Assets/hero5.jpg', title: 'Traditional Wisdom' },
  { src: '/Assets/hero 4.jpg', title: 'The Missing Link' },
  { src: '/Assets/hero10.jpg', title: 'The Melody Maker' },
];

const ORBIT_RADIUS = 5.5;
const ROTATION_SPEED = 0.15;
const FRAME_WIDTH = 3.6;
const FRAME_HEIGHT = 4.8;
const FRAME_DEPTH = 0.12;
const FRAME_THICKNESS = 0.18;
const STAND_HEIGHT = 5.2;

interface FrameProps {
  position: [number, number, number];
  rotation: [number, number, number];
  imagePath: string;
  onClick: () => void;
  isPaused: boolean;
  mobileScale?: number;
}

function ElegantFrame({ position, rotation, imagePath, onClick, isPaused, mobileScale = 1 }: FrameProps) {
  // Scale frame dimensions for mobile
  const scaledFrameWidth = FRAME_WIDTH * mobileScale;
  const scaledFrameHeight = FRAME_HEIGHT * mobileScale;
  const scaledFrameDepth = FRAME_DEPTH * mobileScale;
  const scaledFrameThickness = FRAME_THICKNESS * mobileScale;
  const texture = useTexture(imagePath, (loadedTexture) => {
    loadedTexture.colorSpace = THREE.SRGBColorSpace;
    loadedTexture.minFilter = THREE.LinearFilter;
    loadedTexture.magFilter = THREE.LinearFilter;
    loadedTexture.anisotropy = 16;
    loadedTexture.generateMipmaps = true;
  });

  const meshRef = useRef<THREE.Mesh>(null);

  if (!texture || !texture.image) {
    return null;
  }

  return (
    <group position={position} rotation={rotation}>
      {/* Main Artwork - Front Side */}
      <mesh 
        ref={meshRef}
        position={[0, 0, scaledFrameDepth / 2]}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={() => {
          if (!isPaused && mobileScale >= 1) document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <planeGeometry args={[scaledFrameWidth, scaledFrameHeight]} />
        <meshStandardMaterial 
          map={texture} 
          side={THREE.FrontSide}
          metalness={0.1}
          roughness={0.8}
          transparent={false}
        />
      </mesh>

      {/* Main Artwork - Back Side */}
      <mesh position={[0, 0, -scaledFrameDepth / 2]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[scaledFrameWidth, scaledFrameHeight]} />
        <meshStandardMaterial 
          map={texture} 
          side={THREE.FrontSide}
          metalness={0.1}
          roughness={0.8}
          transparent={false}
        />
      </mesh>

      {/* Gold Frame - Top */}
      <mesh position={[0, scaledFrameHeight / 2 + scaledFrameThickness / 2, 0]}>
        <boxGeometry args={[scaledFrameWidth + scaledFrameThickness * 2, scaledFrameThickness, scaledFrameDepth]} />
        <meshStandardMaterial 
          color="#D4AF37"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Gold Frame - Bottom */}
      <mesh position={[0, -scaledFrameHeight / 2 - scaledFrameThickness / 2, 0]}>
        <boxGeometry args={[scaledFrameWidth + scaledFrameThickness * 2, scaledFrameThickness, scaledFrameDepth]} />
        <meshStandardMaterial 
          color="#D4AF37"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Gold Frame - Left */}
      <mesh position={[-scaledFrameWidth / 2 - scaledFrameThickness / 2, 0, 0]}>
        <boxGeometry args={[scaledFrameThickness, scaledFrameHeight + scaledFrameThickness * 2, scaledFrameDepth]} />
        <meshStandardMaterial 
          color="#D4AF37"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Gold Frame - Right */}
      <mesh position={[scaledFrameWidth / 2 + scaledFrameThickness / 2, 0, 0]}>
        <boxGeometry args={[scaledFrameThickness, scaledFrameHeight + scaledFrameThickness * 2, scaledFrameDepth]} />
        <meshStandardMaterial 
          color="#D4AF37"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Inner Cream Mat - Top */}
      <mesh position={[0, scaledFrameHeight / 2 + scaledFrameThickness / 4, scaledFrameDepth / 4]}>
        <boxGeometry args={[scaledFrameWidth, scaledFrameThickness / 2, scaledFrameDepth / 2]} />
        <meshStandardMaterial 
          color="#F5EFE7"
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>

      {/* Inner Cream Mat - Bottom */}
      <mesh position={[0, -scaledFrameHeight / 2 - scaledFrameThickness / 4, scaledFrameDepth / 4]}>
        <boxGeometry args={[scaledFrameWidth, scaledFrameThickness / 2, scaledFrameDepth / 2]} />
        <meshStandardMaterial 
          color="#F5EFE7"
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>

      {/* Inner Cream Mat - Left */}
      <mesh position={[-scaledFrameWidth / 2 - scaledFrameThickness / 4, 0, scaledFrameDepth / 4]}>
        <boxGeometry args={[scaledFrameThickness / 2, scaledFrameHeight, scaledFrameDepth / 2]} />
        <meshStandardMaterial 
          color="#F5EFE7"
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>

      {/* Inner Cream Mat - Right */}
      <mesh position={[scaledFrameWidth / 2 + scaledFrameThickness / 4, 0, scaledFrameDepth / 4]}>
        <boxGeometry args={[scaledFrameThickness / 2, scaledFrameHeight, scaledFrameDepth / 2]} />
        <meshStandardMaterial 
          color="#F5EFE7"
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>

      {/* Vertical Silver Support Poles - Only show on larger screens */}
      {mobileScale >= 0.8 && (
        <>
          <mesh position={[0, -scaledFrameHeight / 2 - scaledFrameThickness - 0.25 * mobileScale, 0]}>
            <cylinderGeometry args={[0.04 * mobileScale, 0.04 * mobileScale, 0.5 * mobileScale, 16]} />
            <meshStandardMaterial 
              color="#C0C0C0"
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>

          <mesh position={[0, scaledFrameHeight / 2 + scaledFrameThickness + 0.25 * mobileScale, 0]}>
            <cylinderGeometry args={[0.04 * mobileScale, 0.04 * mobileScale, 0.5 * mobileScale, 16]} />
            <meshStandardMaterial 
              color="#C0C0C0"
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        </>
      )}
    </group>
  );
}

interface CarouselGroupProps {
  isPaused: boolean;
  onFrameClick: (index: number) => void;
  mobileScale?: number;
}

function CarouselGroup({ isPaused, onFrameClick, mobileScale = 1 }: CarouselGroupProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [isRotating, setIsRotating] = useState(true);
  const isTabActive = useRef(true);
  
  // Scale values for mobile
  const scaledOrbitRadius = ORBIT_RADIUS * mobileScale;
  const scaledStandHeight = STAND_HEIGHT * mobileScale;

  useEffect(() => {
    const handleVisibility = () => {
      isTabActive.current = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  useFrame(() => {
    if (groupRef.current && isRotating && isTabActive.current && !isPaused) {
      groupRef.current.rotation.y += ROTATION_SPEED * 0.016;
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerEnter={() => setIsRotating(false)}
      onPointerLeave={() => isTabActive.current && setIsRotating(true)}
    >
      {/* Top Silver Ring */}
      <mesh position={[0, scaledStandHeight / 2 + 0.3 * mobileScale, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[scaledOrbitRadius, 0.08 * mobileScale, 16, mobileScale < 1 ? 32 : 64]} />
        <meshStandardMaterial
          color="#E8E8E8"
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>

      {/* Bottom Silver Ring */}
      <mesh position={[0, -scaledStandHeight / 2 - 0.3 * mobileScale, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[scaledOrbitRadius, 0.08 * mobileScale, 16, mobileScale < 1 ? 32 : 64]} />
        <meshStandardMaterial
          color="#E8E8E8"
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>

      {/* Artwork Frames */}
      {heroImages.map((img, i) => {
        const angle = (i / heroImages.length) * Math.PI * 2;
        const x = Math.cos(angle) * scaledOrbitRadius;
        const z = Math.sin(angle) * scaledOrbitRadius;
        const rotationY = -angle + Math.PI / 2;

        return (
          <ElegantFrame
            key={i}
            position={[x, 0, z]}
            rotation={[0, rotationY, 0]}
            imagePath={img.src}
            onClick={() => onFrameClick(i)}
            isPaused={isPaused}
            mobileScale={mobileScale}
          />
        );
      })}

      {/* Reflective Floor */}
      <mesh position={[0, -scaledStandHeight / 2 - 0.5 * mobileScale, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow={mobileScale >= 1}>
        <circleGeometry args={[scaledOrbitRadius * 1.8, mobileScale < 1 ? 32 : 64]} />
        <meshStandardMaterial
          color="#F5F5F5"
          metalness={0.7}
          roughness={0.1}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Floor Shadow */}
      <mesh position={[0, -scaledStandHeight / 2 - 0.48 * mobileScale, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow={mobileScale >= 1}>
        <circleGeometry args={[scaledOrbitRadius * 1.85, mobileScale < 1 ? 32 : 64]} />
        <meshStandardMaterial
          color="#E8E8E8"
          metalness={0.3}
          roughness={0.6}
          transparent={true}
          opacity={0.4}
        />
      </mesh>
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={1.2} color="#FFF8E7" />
      <spotLight
        position={[0, 12, 0]}
        angle={0.6}
        penumbra={0.4}
        intensity={2.8}
        castShadow
        color="#FFFFFF"
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight
        position={[0, 8, 15]}
        intensity={1.8}
        color="#FFF8DC"
        castShadow
      />
      <directionalLight
        position={[0, 6, -12]}
        intensity={1}
        color="#FFE5B4"
      />
      <pointLight position={[15, 6, 0]} intensity={1.2} color="#FFEFD5" />
      <pointLight position={[-15, 6, 0]} intensity={1.2} color="#FFEFD5" />
      <pointLight position={[0, -2, 0]} intensity={0.6} color="#FFFFFF" />
    </>
  );
}

export default function Hero3DCarousel() {
  const [isMounted, setIsMounted] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Check screen size for responsive adjustments
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const checkImages = async () => {
      try {
        const checks = heroImages.map(async (img) => {
          const response = await fetch(img.src, { method: 'HEAD' });
          if (!response.ok) {
            console.error(`❌ Image not found: ${img.src}`);
          }
        });
        await Promise.all(checks);
      } catch (error: unknown) {
        console.error('Error checking images:', error);
        setLoadError(true);
      }
    };
    
    checkImages();
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (!isMounted) return null;

  if (loadError) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-xl mb-2">Unable to load 3D carousel</p>
          <p className="text-sm opacity-70">Please check image files in /public/Assets/</p>
        </div>
      </div>
    );
  }

  // Responsive scaling for mobile
  const mobileScale = isMobile ? 0.6 : 1;
  const cameraDistance = isMobile ? 12 : 14;
  const cameraFOV = isMobile ? 55 : 45;

  return (
    <div className="w-full h-full relative min-h-[500px] sm:min-h-[600px] md:min-h-screen">
      {/* Layered Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 25%, #8B6914 50%, #6B4423 75%, #4A2810 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4A574' fill-opacity='0.35' fill-rule='evenodd'%3E%3Ccircle cx='100' cy='100' r='40'/%3E%3Ccircle cx='0' cy='0' r='40'/%3E%3Ccircle cx='200' cy='0' r='40'/%3E%3Ccircle cx='0' cy='200' r='40'/%3E%3Ccircle cx='200' cy='200' r='40'/%3E%3Cpath d='M50 100 Q 75 50, 100 100 T 150 100' stroke='%23C9A97A' stroke-width='3' fill='none'/%3E%3Cpath d='M100 50 Q 50 75, 100 100 T 100 150' stroke='%23C9A97A' stroke-width='3' fill='none'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />
        <div
          className="absolute inset-0 opacity-45"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23E8B882' stroke-width='2.5' stroke-opacity='0.4'%3E%3Cpath d='M0 30 L15 15 L30 30 L45 15 L60 30 L75 15 L90 30 L105 15 L120 30'/%3E%3Cpath d='M0 60 L15 45 L30 60 L45 45 L60 60 L75 45 L90 60 L105 45 L120 60'/%3E%3Cpath d='M0 90 L15 75 L30 90 L45 75 L60 90 L75 75 L90 90 L105 75 L120 90'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '120px 120px',
          }}
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='160' height='160' viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4A574' fill-opacity='0.5'%3E%3Ccircle cx='20' cy='20' r='8'/%3E%3Ccircle cx='60' cy='20' r='6'/%3E%3Ccircle cx='100' cy='20' r='8'/%3E%3Ccircle cx='140' cy='20' r='6'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '160px 160px',
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23F5CBA7' fill-opacity='0.25'%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Ccircle cx='30' cy='10' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px',
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(75, 40, 16, 0.3) 100%)',
          }}
        />
        <div 
          className="absolute bottom-0 left-0 right-0 h-1/3"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(245, 239, 231, 0.6) 100%)',
          }}
        />
      </div>

      {/* Canvas with 3D Carousel */}
      <Canvas
        camera={{ position: [0, 2, cameraDistance], fov: cameraFOV }}
        dpr={isMobile ? Math.min(window.devicePixelRatio, 1.5) : undefined} // Limit pixel ratio on mobile
        gl={{
          antialias: !isMobile, // Disable antialiasing on mobile for performance
          alpha: true,
          powerPreference: isMobile ? 'default' : 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        shadows={!isMobile} // Disable shadows on mobile for performance
        className={`relative z-10 transition-opacity duration-500 w-full h-full ${selectedImage !== null ? 'opacity-30' : 'opacity-100'}`}
        style={{ 
          pointerEvents: selectedImage !== null ? 'none' : 'auto',
          touchAction: 'pan-y', // Allow vertical scrolling
        }}
      >
        <Lights />
        <CarouselGroup isPaused={selectedImage !== null} onFrameClick={setSelectedImage} mobileScale={mobileScale} />
        <OrbitControls
          enabled={selectedImage === null && !isMobile} // Disable orbit controls on mobile
          enableZoom={!isMobile}
          enablePan={false}
          minDistance={isMobile ? 8 : 10}
          maxDistance={isMobile ? 20 : 25}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 6}
          dampingFactor={0.05}
          rotateSpeed={0.4}
          autoRotate={false}
        />
        <fog attach="fog" args={['#8B4513', isMobile ? 24 : 28, isMobile ? 40 : 45]} />
      </Canvas>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full h-full max-w-full sm:max-w-[95vw] max-h-full sm:max-h-[95vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                onClick={() => setSelectedImage(null)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border-2 border-white/30 text-white flex items-center justify-center transition-colors shadow-2xl"
                aria-label="Close lightbox"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              {/* Image Container */}
              <div className="relative w-full h-full flex flex-col items-center justify-center overflow-auto">
                <motion.img
                  src={heroImages[selectedImage].src}
                  alt={heroImages[selectedImage].title}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, type: 'spring', damping: 20 }}
                  className="max-w-full max-h-[70vh] sm:max-h-[75vh] md:max-h-[80vh] w-auto h-auto object-contain rounded-lg sm:rounded-xl shadow-2xl border-2 sm:border-4 border-[#D4AF37]"
                  loading="lazy"
                />

                {/* Title */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-3 sm:mt-6 px-4 py-2 sm:px-6 sm:py-3 bg-white/10 backdrop-blur-md rounded-full border-2 border-white/30 text-center"
                >
                  <h3 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-white font-serif">
                    {heroImages[selectedImage].title}
                  </h3>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}