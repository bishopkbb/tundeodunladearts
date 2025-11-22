'use client';

import dynamic from 'next/dynamic';

const CartSidebar = dynamic(() => import('./CartSidebar'), {
  ssr: false,
});

export default function CartSidebarWrapper() {
  return <CartSidebar />;
}

