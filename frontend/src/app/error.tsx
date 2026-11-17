'use client';

import { useEffect } from 'react';
import ErrorState from '@/components/ui/ErrorState';

export default function RouteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('Route error:', error);
  }, [error]);

  return <ErrorState onRetry={reset} />;
}
