'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const heroImages = [
  '/Assets/hero1.jpg',
  '/Assets/hero2.jpg',
  '/Assets/hero3.jpg',
  '/Assets/hero5.jpg',
  '/Assets/hero7.jpg',
  '/Assets/hero9.jpg',
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
  index: number;
}

function ElegantFrame({ position, rotation, imagePath, index }: FrameProps) {
  const texture = useTexture(imagePath, (loadedTexture) => {
    loadedTexture.colorSpace = THREE.SRGBColorSpace;
    loadedTexture.minFilter = THREE.LinearFilter;
    loadedTexture.magFilter = THREE.LinearFilter;
    loadedTexture.anisotropy = 16;
    loadedTexture.generateMipmaps = true;
  });

  if (!texture || !texture.image) {
    return null;
  }

  return (
    <group position={position} rotation={rotation}>
      {/* Main Artwork - Front Side */}
      <mesh position={[0, 0, FRAME_DEPTH / 2]}>
        <planeGeometry args={[FRAME_WIDTH, FRAME_HEIGHT]} />
        <meshStandardMaterial 
          map={texture} 
          side={THREE.FrontSide}
          metalness={0.1}
          roughness={0.8}
          transparent={false}
        />
      </mesh>

      {/* Main Artwork - Back Side */}
      <mesh position={[0, 0, -FRAME_DEPTH / 2]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[FRAME_WIDTH, FRAME_HEIGHT]} />
        <meshStandardMaterial 
          map={texture} 
          side={THREE.FrontSide}
          metalness={0.1}
          roughness={0.8}
          transparent={false}
        />
      </mesh>

      {/* Gold Frame - Top */}
      <mesh position={[0, FRAME_HEIGHT / 2 + FRAME_THICKNESS / 2, 0]}>
        <boxGeometry args={[FRAME_WIDTH + FRAME_THICKNESS * 2, FRAME_THICKNESS, FRAME_DEPTH]} />
        <meshStandardMaterial 
          color="#D4AF37"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Gold Frame - Bottom */}
      <mesh position={[0, -FRAME_HEIGHT / 2 - FRAME_THICKNESS / 2, 0]}>
        <boxGeometry args={[FRAME_WIDTH + FRAME_THICKNESS * 2, FRAME_THICKNESS, FRAME_DEPTH]} />
        <meshStandardMaterial 
          color="#D4AF37"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Gold Frame - Left */}
      <mesh position={[-FRAME_WIDTH / 2 - FRAME_THICKNESS / 2, 0, 0]}>
        <boxGeometry args={[FRAME_THICKNESS, FRAME_HEIGHT + FRAME_THICKNESS * 2, FRAME_DEPTH]} />
        <meshStandardMaterial 
          color="#D4AF37"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Gold Frame - Right */}
      <mesh position={[FRAME_WIDTH / 2 + FRAME_THICKNESS / 2, 0, 0]}>
        <boxGeometry args={[FRAME_THICKNESS, FRAME_HEIGHT + FRAME_THICKNESS * 2, FRAME_DEPTH]} />
        <meshStandardMaterial 
          color="#D4AF37"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Inner Cream Mat - Top */}
      <mesh position={[0, FRAME_HEIGHT / 2 + FRAME_THICKNESS / 4, FRAME_DEPTH / 4]}>
        <boxGeometry args={[FRAME_WIDTH, FRAME_THICKNESS / 2, FRAME_DEPTH / 2]} />
        <meshStandardMaterial 
          color="#F5EFE7"
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>

      {/* Inner Cream Mat - Bottom */}
      <mesh position={[0, -FRAME_HEIGHT / 2 - FRAME_THICKNESS / 4, FRAME_DEPTH / 4]}>
        <boxGeometry args={[FRAME_WIDTH, FRAME_THICKNESS / 2, FRAME_DEPTH / 2]} />
        <meshStandardMaterial 
          color="#F5EFE7"
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>

      {/* Inner Cream Mat - Left */}
      <mesh position={[-FRAME_WIDTH / 2 - FRAME_THICKNESS / 4, 0, FRAME_DEPTH / 4]}>
        <boxGeometry args={[FRAME_THICKNESS / 2, FRAME_HEIGHT, FRAME_DEPTH / 2]} />
        <meshStandardMaterial 
          color="#F5EFE7"
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>

      {/* Inner Cream Mat - Right */}
      <mesh position={[FRAME_WIDTH / 2 + FRAME_THICKNESS / 4, 0, FRAME_DEPTH / 4]}>
        <boxGeometry args={[FRAME_THICKNESS / 2, FRAME_HEIGHT, FRAME_DEPTH / 2]} />
        <meshStandardMaterial 
          color="#F5EFE7"
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>

      {/* Vertical Silver Support Poles (2 per frame) */}
      {/* Bottom pole - connects frame to bottom ring */}
      <mesh position={[0, -FRAME_HEIGHT / 2 - FRAME_THICKNESS - 0.25, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.5, 16]} />
        <meshStandardMaterial 
          color="#C0C0C0"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Top pole - connects frame to top ring (REDUCED) */}
      <mesh position={[0, FRAME_HEIGHT / 2 + FRAME_THICKNESS + 0.25, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.5, 16]} />
        <meshStandardMaterial 
          color="#C0C0C0"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}

function CarouselGroup() {
  const groupRef = useRef<THREE.Group>(null);
  const [isRotating, setIsRotating] = useState(true);
  const isTabActive = useRef(true);

  useEffect(() => {
    const handleVisibility = () => {
      isTabActive.current = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  useFrame(() => {
    if (groupRef.current && isRotating && isTabActive.current) {
      groupRef.current.rotation.y += ROTATION_SPEED * 0.016;
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerEnter={() => setIsRotating(false)}
      onPointerLeave={() => isTabActive.current && setIsRotating(true)}
    >
      {/* Top Silver Ring (Halo) */}
      <mesh position={[0, STAND_HEIGHT / 2 + 0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[ORBIT_RADIUS, 0.08, 16, 64]} />
        <meshStandardMaterial
          color="#E8E8E8"
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>

      {/* Bottom Silver Ring (Base Circle) */}
      <mesh position={[0, -STAND_HEIGHT / 2 - 0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[ORBIT_RADIUS, 0.08, 16, 64]} />
        <meshStandardMaterial
          color="#E8E8E8"
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>

      {/* Artwork Frames Mounted on Stands */}
      {heroImages.map((imgPath, i) => {
        const angle = (i / heroImages.length) * Math.PI * 2;
        const x = Math.cos(angle) * ORBIT_RADIUS;
        const z = Math.sin(angle) * ORBIT_RADIUS;
        const rotationY = -angle + Math.PI / 2;

        return (
          <ElegantFrame
            key={i}
            position={[x, 0, z]}
            rotation={[0, rotationY, 0]}
            imagePath={imgPath}
            index={i}
          />
        );
      })}

      {/* Reflective Floor Platform */}
      <mesh position={[0, -STAND_HEIGHT / 2 - 0.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[ORBIT_RADIUS * 1.8, 64]} />
        <meshStandardMaterial
          color="#F5F5F5"
          metalness={0.7}
          roughness={0.1}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Floor Shadow Catcher (Subtle) */}
      <mesh position={[0, -STAND_HEIGHT / 2 - 0.48, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[ORBIT_RADIUS * 1.85, 64]} />
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
      {/* Main ambient light */}
      <ambientLight intensity={1.2} color="#FFF8E7" />
      
      {/* Gallery spotlight from above */}
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
      
      {/* Front key light */}
      <directionalLight
        position={[0, 8, 15]}
        intensity={1.8}
        color="#FFF8DC"
        castShadow
      />
      
      {/* Back rim light */}
      <directionalLight
        position={[0, 6, -12]}
        intensity={1}
        color="#FFE5B4"
      />
      
      {/* Side fill lights */}
      <pointLight position={[15, 6, 0]} intensity={1.2} color="#FFEFD5" />
      <pointLight position={[-15, 6, 0]} intensity={1.2} color="#FFEFD5" />
      
      {/* Subtle floor reflection light */}
      <pointLight position={[0, -2, 0]} intensity={0.6} color="#FFFFFF" />
    </>
  );
}

export default function Hero3DCarousel() {
  const [isMounted, setIsMounted] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const checkImages = async () => {
      try {
        const checks = heroImages.map(async (src) => {
          const response = await fetch(src, { method: 'HEAD' });
          if (!response.ok) {
            console.error(`❌ Image not found: ${src}`);
          }
        });
        await Promise.all(checks);
      } catch (error) {
        console.error('Error checking images:', error);
        setLoadError(true);
      }
    };
    
    checkImages();
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

  return (
    <div className="w-full h-full relative">
      {/* Layered Background - Matching Reference Image */}
      <div className="absolute inset-0 z-0">
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

        {/* Bottom fade to lighter cream */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-1/3"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(245, 239, 231, 0.6) 100%)',
          }}
        />
      </div>

      {/* Canvas with 3D Carousel */}
      <Canvas
        camera={{ position: [0, 2, 14], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        shadows
      >
        <Lights />
        <CarouselGroup />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={10}
          maxDistance={25}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 6}
          dampingFactor={0.05}
          rotateSpeed={0.4}
          autoRotate={false}
        />
        <fog attach="fog" args={['#8B4513', 28, 45]} />
      </Canvas>
    </div>
  );
}