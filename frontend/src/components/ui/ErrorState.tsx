'use client';

import Link from 'next/link';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  /** Full-screen (route error) or compact (inside a section). */
  fullScreen?: boolean;
}

/** Branded error panel with Retry / Home actions. Same warm palette as the 404 page. */
export default function ErrorState({
  title = 'Something went wrong',
  message = 'We hit an unexpected problem loading this page. Please try again.',
  onRetry,
  fullScreen = true,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={`flex items-center justify-center px-4 text-center ${
        fullScreen
          ? 'min-h-screen bg-gradient-to-b from-[#8B4513] via-[#6B3410] to-[#4A2810]'
          : 'py-16 rounded-xl bg-white/70 border border-[#D4A574]/30'
      }`}
    >
      <div className="max-w-md">
        <h1 className={`font-serif text-3xl md:text-4xl font-bold mb-3 ${fullScreen ? 'text-[#D4AF37]' : 'text-[#8B4513]'}`}>
          {title}
        </h1>
        <p className={`mb-8 ${fullScreen ? 'text-white/80' : 'text-[#6B4423]'}`}>{message}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="px-6 py-3 bg-[#A8651F] hover:bg-[#8B4513] text-white font-semibold rounded-lg shadow-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
            >
              Try again
            </button>
          )}
          <Link
            href="/"
            className="px-6 py-3 bg-[#3D2817] hover:bg-[#2C1810] text-white font-semibold rounded-lg shadow-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
