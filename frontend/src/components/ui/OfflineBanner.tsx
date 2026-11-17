'use client';

import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/Toast';

/** Shows a banner under the navbar while the browser is offline, and a toast when it reconnects. */
export default function OfflineBanner() {
  const [offline, setOffline] = useState(false);
  const toast = useToast();

  useEffect(() => {
    setOffline(!navigator.onLine);
    const goOffline = () => setOffline(true);
    const goOnline = () => {
      setOffline(false);
      toast.success('You are back online.');
    };
    window.addEventListener('offline', goOffline);
    window.addEventListener('online', goOnline);
    return () => {
      window.removeEventListener('offline', goOffline);
      window.removeEventListener('online', goOnline);
    };
  }, [toast]);

  if (!offline) return null;

  return (
    <div
      role="status"
      className="fixed inset-x-0 top-16 xs:top-[72px] sm:top-20 z-[45] bg-[#3D2817] px-4 py-2 text-center text-sm text-white shadow-md"
    >
      You are offline. Some content may not load until your connection returns.
    </div>
  );
}
