'use client';

import { useState } from 'react';
import SmartImage from '@/components/ui/SmartImage';

interface LiteYouTubeProps {
  videoId: string;
  title: string;
  /** Public link to the video, offered as a fallback below the player. */
  href?: string;
}

/**
 * Lightweight YouTube player: shows the thumbnail and a play button, and only loads the real
 * YouTube player (about 1 MB of scripts) after the visitor clicks play.
 */
export default function LiteYouTube({ videoId, title, href }: LiteYouTubeProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div>
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-lg">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 h-full w-full"
            aria-label={`Play video: ${title}`}
          >
            <SmartImage
              src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
              alt=""
              sizes="(max-width: 768px) 100vw, 800px"
              unoptimized
              className="object-cover opacity-90 transition-opacity group-hover:opacity-100"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/20">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#A8651F] text-white shadow-xl transition-transform group-hover:scale-110">
                <svg className="ml-1 h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </button>
        )}
      </div>
      {href && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-sm font-semibold text-[#9A5B1F] underline underline-offset-2 hover:text-[#8B4513]"
        >
          Watch on YouTube
        </a>
      )}
    </div>
  );
}
