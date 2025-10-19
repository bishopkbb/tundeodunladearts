'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const heroImages = [
  '/Assets/hero1.jpg',
  '/Assets/hero2.jpg',
  '/Assets/hero3.jpg',
  '/Assets/hero7.jpg',
  '/Assets/hero5.jpg',
  '/Assets/hero8.jpg',
];

const ORBIT_RADIUS = 5;
const ROTATION_SPEED = 0.2;
const FRAME_WIDTH = 4.4;
const FRAME_HEIGHT = 5.0;

interface FrameProps {
  position: [number, number, number];
  rotation: [number, number, number];
  texture: THREE.Texture | null;
}

function ArtworkFrame({ position, rotation, texture }: FrameProps) {
  if (!texture) {
    console.log('No texture for this frame');
    return null;
  }

  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[FRAME_WIDTH, FRAME_HEIGHT]} />
      <meshBasicMaterial 
        map={texture} 
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function CarouselGroup() {
  const groupRef = useRef<THREE.Group>(null);
  const [textures, setTextures] = useState<(THREE.Texture | null)[]>(
    new Array(heroImages.length).fill(null)
  );
  const [isRotating, setIsRotating] = useState(true);
  const isTabActive = useRef(true);

  // Load textures
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    
    heroImages.forEach((src, index) => {
      console.log(`Loading image ${index + 1}: ${src}`);
      loader.load(
        src,
        (texture) => {
          console.log(`✅ Successfully loaded: ${src}`);
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.needsUpdate = true;
          
          setTextures(prev => {
            const newTextures = [...prev];
            newTextures[index] = texture;
            console.log(`Textures loaded: ${newTextures.filter(t => t !== null).length}/${heroImages.length}`);
            return newTextures;
          });
        },
        undefined,
        (error) => {
          console.error(`❌ Failed to load texture: ${src}`, error);
          console.log('Make sure images are in public/Assets/ folder');
        }
      );
    });
  }, []);

  // Handle tab visibility
  useEffect(() => {
    const handleVisibility = () => {
      isTabActive.current = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Rotation animation
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
      {/* Artwork Frames in Circular Orbit */}
      {heroImages.map((_, i) => {
        const angle = (i / heroImages.length) * Math.PI * 2;
        const x = Math.cos(angle) * ORBIT_RADIUS;
        const z = Math.sin(angle) * ORBIT_RADIUS;
        const rotationY = -angle + Math.PI / 2;

        return (
          <ArtworkFrame
            key={i}
            position={[x, 0, z]}
            rotation={[0, rotationY, 0]}
            texture={textures[i] || null}
          />
        );
      })}

      {/* Center Platform */}
      <mesh position={[0, -1.6, 0]} receiveShadow>
        <cylinderGeometry args={[ORBIT_RADIUS * 1.2, ORBIT_RADIUS * 1.4, 0.4, 64]} />
        <meshStandardMaterial
          color="#E8DCC8"
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>


      {/* Platform Base */}
      <mesh position={[0, -1.8, 0]}>
        <cylinderGeometry args={[ORBIT_RADIUS * 1.5, ORBIT_RADIUS * 1.5, 0.1, 64]} />
        <meshStandardMaterial
          color="#D4A574"
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={1.2} color="#F5EFE7" />
      <directionalLight
        position={[10, 15, 5]}
        intensity={2}
        color="#FFFFFF"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight position={[-8, 10, -8]} intensity={0.8} color="#FFE5B4" />
      <pointLight position={[0, 5, 0]} intensity={0.6} color="#D4AF37" />
      <spotLight
        position={[0, 12, 0]}
        angle={0.5}
        penumbra={0.5}
        intensity={1.2}
        castShadow
        color="#FFFFFF"
      />
    </>
  );
}

export default function Hero3DCarousel() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 3.5, 12], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        shadows
      >
        <Lights />
        <CarouselGroup />
        <OrbitControls
          enableZoom
          enablePan={false}
          minDistance={8}
          maxDistance={25}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 6}
        />
      </Canvas>
    </div>
  );
}