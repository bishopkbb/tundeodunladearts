'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

type Phase = 'idle' | 'loading' | 'done';

/**
 * Thin top progress bar for page changes. The App Router has no navigation events,
 * so it starts on a click on an internal link and finishes when the pathname changes.
 */
export default function RouteProgress() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>('idle');

  // Pathname changed: the new page is in, finish the bar.
  useEffect(() => {
    setPhase((p) => (p === 'loading' ? 'done' : p));
    const reset = setTimeout(() => setPhase('idle'), 400);
    return () => clearTimeout(reset);
  }, [pathname]);

  useEffect(() => {
    let safety: ReturnType<typeof setTimeout> | undefined;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.('a');
      if (!link || link.target === '_blank' || link.hasAttribute('download')) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      setPhase('loading');
      // If the navigation never completes (cancelled), don't leave the bar hanging.
      clearTimeout(safety);
      safety = setTimeout(() => setPhase('idle'), 10000);
    };
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
      clearTimeout(safety);
    };
  }, []);

  const style =
    phase === 'loading'
      ? { width: '80%', opacity: 1, transition: 'width 8s cubic-bezier(0.1, 0.5, 0.2, 1)' }
      : phase === 'done'
        ? { width: '100%', opacity: 0, transition: 'width 0.2s ease-out, opacity 0.3s ease-out 0.2s' }
        : { width: '0%', opacity: 0, transition: 'none' };

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[110] h-[3px]">
      <div className="h-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" style={style} />
    </div>
  );
}
