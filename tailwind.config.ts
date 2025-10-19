import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      colors: {
        warm: {
          '50': '#FEF6F0',
          '100': '#FDE8DD',
          '200': '#FBD1BA',
          '300': '#F5CBA7',
          '400': '#E7A876',
          '500': '#D4934F',
          '600': '#C17C2E',
          '700': '#8B4513',
          '800': '#6B340D',
          '900': '#4B2306',
        },
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.6s ease-out',
        slideUp: 'slideUp 0.8s ease-out',
        shimmer: 'shimmer 2s infinite',
      },
      boxShadow: {
        'warm-glow': '0 0 30px rgba(231, 168, 118, 0.3)',
        'amber-glow': '0 0 30px rgba(212, 175, 55, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;