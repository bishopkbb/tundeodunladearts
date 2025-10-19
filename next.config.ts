import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    unoptimized: true, // Temporarily disable optimization for local images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: 'asset/resource',
    });
    return config;
  },
  experimental: {
    optimizePackageImports: ['@react-three/fiber', '@react-three/drei'],
  },
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  eslint: {
    dirs: ['src'],
  },
};

export default nextConfig;