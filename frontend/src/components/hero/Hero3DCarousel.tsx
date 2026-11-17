'use client';

import { useEffect, useMemo, useRef, useState, type MutableRefObject, type ReactNode } from 'react';
import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber';
import { Environment, Lightformer, OrbitControls, useTexture } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

// `src` is the full-size image (used in the enlarged view); `texture` is a
// 1024px copy used on the 3D frames so phones don't decode 3600px textures.
const heroImages = [
  { src: '/Assets/hero1.jpg', texture: '/Assets/hero-3d/hero1.jpg', title: 'Cultural Heritage' },
  { src: '/Assets/hero2.jpg', texture: '/Assets/hero-3d/hero2.jpg', title: 'Happy Mother and Child' },
  { src: '/Assets/hero3.jpg', texture: '/Assets/hero-3d/hero3.jpg', title: 'Head' },
  { src: '/Assets/hero5.jpg', texture: '/Assets/hero-3d/hero5.jpg', title: 'Traditional Wisdom' },
  { src: '/Assets/hero 4.jpg', texture: '/Assets/hero-3d/hero4.jpg', title: 'The Missing Link' },
  { src: '/Assets/hero10.jpg', texture: '/Assets/hero-3d/hero10.jpg', title: 'The Melody Maker' },
];

const ORBIT_RADIUS = 5.5;
const ROTATION_SPEED = 0.15;
// Each artwork is fitted inside this slot while keeping its own proportions (no stretching).
const SLOT_MAX_WIDTH = 4.2;
const SLOT_MAX_HEIGHT = 4.4;
const STAND_HEIGHT = 5.6;

// Polished gold. Real metal needs something to reflect, so on phones (no environment map) it falls back to a
// lighter, slightly self-lit gold that still reads as gold.
function goldMaterial(lowEnd: boolean) {
  return lowEnd
    ? { color: '#D9B440', metalness: 0.5, roughness: 0.38, emissive: '#4a3706', emissiveIntensity: 0.35 }
    : { color: '#D4AF37', metalness: 0.95, roughness: 0.24, envMapIntensity: 1.5 };
}

// Soft radial gradient used for the light pool on the floor and the contact shadows under each frame.
function makeRadialTexture(inner: string, outer: string) {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, inner);
    g.addColorStop(1, outer);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

interface FrameRingProps {
  innerW: number;
  innerH: number;
  thickness: number;
  depth: number;
  z: number;
  children: ReactNode;
}

/** Four bars forming a rectangular ring around an inner rectangle. `children` is the material. */
function FrameRing({ innerW, innerH, thickness, depth, z, children }: FrameRingProps) {
  const outerW = innerW + 2 * thickness;
  return (
    <>
      <mesh position={[0, innerH / 2 + thickness / 2, z]}>
        <boxGeometry args={[outerW, thickness, depth]} />
        {children}
      </mesh>
      <mesh position={[0, -(innerH / 2 + thickness / 2), z]}>
        <boxGeometry args={[outerW, thickness, depth]} />
        {children}
      </mesh>
      <mesh position={[-(innerW / 2 + thickness / 2), 0, z]}>
        <boxGeometry args={[thickness, innerH, depth]} />
        {children}
      </mesh>
      <mesh position={[innerW / 2 + thickness / 2, 0, z]}>
        <boxGeometry args={[thickness, innerH, depth]} />
        {children}
      </mesh>
    </>
  );
}

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
  const texture = useTexture(imagePath, (loadedTexture) => {
    loadedTexture.colorSpace = THREE.SRGBColorSpace;
    loadedTexture.minFilter = THREE.LinearMipmapLinearFilter;
    loadedTexture.magFilter = THREE.LinearFilter;
    loadedTexture.anisotropy = 8;
    loadedTexture.generateMipmaps = true;
  });

  const shadowTexture = useMemo(() => makeRadialTexture('rgba(0,0,0,0.5)', 'rgba(0,0,0,0)'), []);
  const meshRef = useRef<THREE.Mesh>(null);
  const tapStartTime = useRef<number>(0);
  const tapStartPosition = useRef<{ x: number; y: number } | null>(null);

  if (!texture || !texture.image) {
    return null;
  }

  // Fit the artwork inside the slot using its real proportions, so landscape pieces are no longer squashed.
  const image = texture.image as { width: number; height: number };
  const aspect = image.width / image.height;
  const fitsWidth = aspect >= SLOT_MAX_WIDTH / SLOT_MAX_HEIGHT;
  const scaledFrameWidth = (fitsWidth ? SLOT_MAX_WIDTH : SLOT_MAX_HEIGHT * aspect) * mobileScale;
  const scaledFrameHeight = (fitsWidth ? SLOT_MAX_WIDTH / aspect : SLOT_MAX_HEIGHT) * mobileScale;

  const lowEnd = mobileScale < 1;
  const gold = goldMaterial(lowEnd);
  // Layered moulding, from the artwork outward: gold liner, ivory mat, bronze step, polished gold rail.
  const liner = 0.04 * mobileScale;
  const matWidth = 0.2 * mobileScale;
  const step = 0.07 * mobileScale;
  const rail = 0.24 * mobileScale;
  const matInnerW = scaledFrameWidth + 2 * liner;
  const matInnerH = scaledFrameHeight + 2 * liner;
  const stepInnerW = matInnerW + 2 * matWidth;
  const stepInnerH = matInnerH + 2 * matWidth;
  const railInnerW = stepInnerW + 2 * step;
  const railInnerH = stepInnerH + 2 * step;
  const outerW = railInnerW + 2 * rail;
  const outerH = railInnerH + 2 * rail;
  const bronze = lowEnd
    ? { color: '#B08A28', metalness: 0.4, roughness: 0.5 }
    : { color: '#A37F1F', metalness: 0.85, roughness: 0.42, envMapIntensity: 1.2 };

  // Gold wires hang the frame from the top ring and steady it from the bottom ring.
  const ringY = (STAND_HEIGHT / 2 + 0.3) * mobileScale;
  const wireLength = ringY - outerH / 2;
  const wireXs = outerW > 4.4 * mobileScale ? [-0.28 * outerW, 0.28 * outerW] : [0];

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    tapStartTime.current = Date.now();
    tapStartPosition.current = { x: e.clientX || 0, y: e.clientY || 0 };
    e.stopPropagation();
  };

  const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    const tapDuration = Date.now() - tapStartTime.current;
    const isTap = tapDuration < 300; // Consider it a tap if less than 300ms
    
    // Check if there was significant movement (if mobile, allow some movement for tap detection)
    let isSignificantMove = false;
    if (tapStartPosition.current && (e.clientX !== undefined || e.clientY !== undefined)) {
      const dx = Math.abs((e.clientX || 0) - tapStartPosition.current.x);
      const dy = Math.abs((e.clientY || 0) - tapStartPosition.current.y);
      isSignificantMove = dx > 10 || dy > 10; // Allow 10px movement for tap detection
    }
    
    if (isTap && !isSignificantMove && !isPaused) {
      onClick();
    }
  };

  return (
    <group position={position} rotation={rotation}>
      {/* Main Artwork - Front Side */}
      <mesh 
        ref={meshRef}
        position={[0, 0, 0.02 * mobileScale]}
        onClick={(e) => {
          e.stopPropagation();
          if (!isPaused) {
            onClick();
          }
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
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
          envMapIntensity={0}
          polygonOffset
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </mesh>

      {/* Main Artwork - Back Side */}
      <mesh position={[0, 0, -0.02 * mobileScale]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[scaledFrameWidth, scaledFrameHeight]} />
        <meshStandardMaterial 
          map={texture} 
          side={THREE.FrontSide}
          metalness={0.1}
          roughness={0.8}
          transparent={false}
          envMapIntensity={0}
          polygonOffset
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </mesh>

      {/* Layered frame, from the artwork outward: gold liner, ivory mat, bronze step, polished gold rail */}
      <FrameRing innerW={scaledFrameWidth} innerH={scaledFrameHeight} thickness={liner} depth={0.07 * mobileScale} z={0.035 * mobileScale}>
        <meshStandardMaterial {...gold} />
      </FrameRing>
      <FrameRing innerW={matInnerW} innerH={matInnerH} thickness={matWidth} depth={0.05 * mobileScale} z={0.025 * mobileScale}>
        <meshStandardMaterial color="#F3ECDD" roughness={0.95} metalness={0} envMapIntensity={0}
          polygonOffset
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1} />
      </FrameRing>
      <FrameRing innerW={stepInnerW} innerH={stepInnerH} thickness={step} depth={0.16 * mobileScale} z={0}>
        <meshStandardMaterial {...bronze} />
      </FrameRing>
      <FrameRing innerW={railInnerW} innerH={railInnerH} thickness={rail} depth={0.2 * mobileScale} z={0}>
        <meshStandardMaterial {...gold} />
      </FrameRing>
      {/* Corner blocks */}
      {!lowEnd &&
        [
          [-1, -1],
          [1, -1],
          [-1, 1],
          [1, 1],
        ].map(([sx, sy]) => (
          <mesh key={`corner-${sx}-${sy}`} position={[sx * (railInnerW / 2 + rail / 2), sy * (railInnerH / 2 + rail / 2), 0]}>
            <boxGeometry args={[rail * 1.25, rail * 1.25, 0.24 * mobileScale]} />
            <meshStandardMaterial {...gold} />
          </mesh>
        ))}

      {/* Gold hanging wires: top ring to frame, and bottom ring to frame */}
      {wireLength > 0.05 &&
        wireXs.flatMap((x) => [
          <mesh key={`top-${x}`} position={[x, outerH / 2 + wireLength / 2, 0]}>
            <cylinderGeometry args={[0.022 * mobileScale, 0.022 * mobileScale, wireLength, 8]} />
            <meshStandardMaterial {...gold} />
          </mesh>,
          <mesh key={`bottom-${x}`} position={[x, -(outerH / 2 + wireLength / 2), 0]}>
            <cylinderGeometry args={[0.022 * mobileScale, 0.022 * mobileScale, wireLength, 8]} />
            <meshStandardMaterial {...gold} />
          </mesh>,
        ])}

      {/* Soft contact shadow on the floor under the frame */}
      <mesh position={[0, -(STAND_HEIGHT / 2 + 0.47) * mobileScale, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[outerW * 1.15, 1.5 * mobileScale]} />
        <meshBasicMaterial map={shadowTexture} transparent depthWrite={false} opacity={0.55} toneMapped={false} />
      </mesh>
    </group>
  );
}

interface CarouselGroupProps {
  isPaused: boolean;
  /** True while the pointer is over the hero (set once for the whole canvas, so frames passing under the cursor cannot make it stutter). */
  hoverRef: MutableRefObject<boolean>;
  onFrameClick: (index: number) => void;
  mobileScale?: number;
}

function CarouselGroup({ isPaused, hoverRef, onFrameClick, mobileScale = 1 }: CarouselGroupProps) {
  const groupRef = useRef<THREE.Group>(null);
  const isTabActive = useRef(true);
  
  // Scale values for mobile
  const scaledOrbitRadius = ORBIT_RADIUS * mobileScale;
  const scaledStandHeight = STAND_HEIGHT * mobileScale;
  const gold = goldMaterial(mobileScale < 1);
  const glowTexture = useMemo(() => makeRadialTexture('rgba(212,165,116,0.22)', 'rgba(212,165,116,0)'), []);

  useEffect(() => {
    const handleVisibility = () => {
      isTabActive.current = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current && !hoverRef.current && isTabActive.current && !isPaused) {
      // Use delta time for consistent rotation speed regardless of frame rate
      groupRef.current.rotation.y += ROTATION_SPEED * Math.min(delta, 0.02); // Cap delta to prevent jumps
    }
  });

  return (
    <group
      ref={groupRef}
    >
      {/* Top Gold Ring */}
      <mesh position={[0, scaledStandHeight / 2 + 0.3 * mobileScale, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[scaledOrbitRadius, 0.08 * mobileScale, 16, mobileScale < 1 ? 32 : 64]} />
        <meshStandardMaterial {...gold} />
      </mesh>

      {/* Bottom Gold Ring */}
      <mesh position={[0, -scaledStandHeight / 2 - 0.3 * mobileScale, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[scaledOrbitRadius, 0.08 * mobileScale, 16, mobileScale < 1 ? 32 : 64]} />
        <meshStandardMaterial {...gold} />
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
            imagePath={img.texture}
            onClick={() => onFrameClick(i)}
            isPaused={isPaused}
            mobileScale={mobileScale}
          />
        );
      })}

      {/* Warm pool of light on the floor (replaces the flat white disc) */}
      <mesh position={[0, -scaledStandHeight / 2 - 0.5 * mobileScale, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[scaledOrbitRadius * 1.9, 48]} />
        <meshBasicMaterial map={glowTexture} transparent depthWrite={false} opacity={0.5} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Lights({ isMobile }: { isMobile: boolean }) {
  // Reduce lights on mobile for performance
  if (isMobile) {
    return (
      <>
        <ambientLight intensity={1.5} color="#FFF8E7" />
        <directionalLight position={[0, 8, 15]} intensity={2} color="#FFF8DC" />
      </>
    );
  }
  
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
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
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
    </>
  );
}

export default function Hero3DCarousel() {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const hoverRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  // Prevent body scroll when modal is open - must be called before any conditional returns
  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImage]);

  useEffect(() => {
    setIsMounted(true);
    
    // Check screen size for responsive adjustments
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (!isMounted) return null;

  // Responsive scaling for mobile - even smaller for very small screens
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 768;
  const isVerySmall = screenWidth < 400;
  const mobileScale = isMobile ? (isVerySmall ? 0.45 : 0.55) : 1;
  const cameraDistance = isMobile ? (isVerySmall ? 10 : 11) : 14;
  const cameraFOV = isMobile ? (isVerySmall ? 60 : 58) : 45;

  return (
    <div 
      className="w-full h-full relative min-h-[400px] xs:min-h-[450px] sm:min-h-[550px] md:min-h-[600px] lg:min-h-screen"
      style={{ 
        touchAction: selectedImage === null ? 'pan-y' : 'none', // Allow scrolling when modal is closed
        overflow: 'visible', // Don't clip content
        pointerEvents: isMobile && selectedImage === null ? 'auto' : 'auto', // Allow scrolling on mobile
      }}
    >
      {/* Layered Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, #8B4513 0%, #6B3410 55%, #4A2810 100%)', // brand browns only
          }}
        />
        {/* Batik / adire pattern (oniko rosettes) */}
        <div
          className="absolute inset-0"
          style={{ backgroundImage: 'url(/patterns/oniko.webp)', backgroundSize: '240px 240px', opacity: 0.4 }}
        />

        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center 60%, transparent 30%, rgba(42, 22, 8, 0.55) 100%)',
          }}
        />
      </div>

      {/* Canvas with 3D Carousel - Wrapped to allow mobile scrolling */}
      <div 
        className={`absolute inset-x-0 bottom-[76px] sm:bottom-[88px] top-[84px] sm:top-[92px] z-10 ${selectedImage !== null ? 'pointer-events-none' : ''}`}
        onPointerEnter={() => {
          hoverRef.current = true;
        }}
        onPointerLeave={() => {
          hoverRef.current = false;
        }}
        style={{ 
          touchAction: selectedImage === null ? 'pan-y' : 'none', // Allow vertical scrolling when modal closed
        }}
      >
        <Canvas
          camera={{ position: [0, 2, cameraDistance], fov: cameraFOV }}
          dpr={isMobile ? Math.min(window.devicePixelRatio, 1.2) : Math.min(window.devicePixelRatio, 2)} // Further limit pixel ratio
          gl={{
            antialias: !isMobile, // Disable antialiasing on mobile for performance
            alpha: true,
            powerPreference: isMobile ? 'low-power' : 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2,
            stencil: false, // Disable stencil buffer for performance
            depth: true,
          }}
          shadows={!isMobile} // Disable shadows on mobile for performance
          performance={{ min: 0.5 }} // Lower performance target for smoother frame rate
          className={`transition-opacity duration-300 w-full h-full ${selectedImage !== null ? 'opacity-30' : 'opacity-100'}`}
          style={{ 
            pointerEvents: selectedImage !== null ? 'none' : isMobile ? 'none' : 'auto', // Disable pointer events on mobile to allow scrolling
            touchAction: 'none', // Canvas doesn't handle touch, wrapper handles scrolling
          }}
        >
        <Lights isMobile={isMobile} />
        {/* Procedural studio lighting (no download) so the gold rings and frames have something to reflect */}
        {!isMobile && (
          <Environment resolution={128}>
            <Lightformer form="rect" intensity={2.4} color="#FFF1CF" position={[0, 7, 8]} scale={[16, 3, 1]} />
            <Lightformer form="rect" intensity={1.6} color="#FFD58A" position={[-10, 1, 3]} rotation={[0, Math.PI / 2, 0]} scale={[9, 6, 1]} />
            <Lightformer form="rect" intensity={1.6} color="#FFD58A" position={[10, 1, 3]} rotation={[0, -Math.PI / 2, 0]} scale={[9, 6, 1]} />
            <Lightformer form="ring" intensity={1.2} color="#FFF8E7" position={[0, 2, -10]} scale={8} />
          </Environment>
        )}
        <CarouselGroup 
          isPaused={selectedImage !== null} 
          hoverRef={hoverRef}
          onFrameClick={setSelectedImage}
          mobileScale={mobileScale} 
        />
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
      </div>

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
                  loading="eager"
                  width={1920}
                  height={1080}
                  style={{ maxWidth: '100%', height: 'auto' }}
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