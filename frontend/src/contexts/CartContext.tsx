'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/components/ui/Toast';

export interface CartItem {
  id: string;
  title: string;
  artist: string;
  price: number;
  image: string;
  quantity: number;
  medium?: string;
  dimensions?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  /** Returns true when the item was added, false when it was already in the cart. */
  addToCart: (item: Omit<CartItem, 'quantity'>) => boolean;
  isInCart: (id: string) => boolean;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toast = useToast();

  // Load cart from memory on mount
  useEffect(() => {
    try {
      const savedCart = sessionStorage.getItem('toacc-cart');
      if (savedCart) setCartItems(JSON.parse(savedCart));
    } catch (error: unknown) {
      // Storage can be blocked (private mode) or hold bad JSON; start with an empty cart.
      console.error('Error loading cart:', error);
    }
  }, []);

  // Save cart to memory whenever it changes
  useEffect(() => {
    try {
      sessionStorage.setItem('toacc-cart', JSON.stringify(cartItems));
    } catch {
      // Ignore: the cart still works for this page view without persistence.
    }
  }, [cartItems]);

  const isInCart = (id: string) => cartItems.some((i) => i.id === id);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    // Custom pieces are unique: limit to 1 per artwork.
    const alreadyInCart = isInCart(item.id);
    if (!alreadyInCart) {
      setCartItems((prevItems) =>
        prevItems.some((i) => i.id === item.id) ? prevItems : [...prevItems, { ...item, quantity: 1 }]
      );
    }
    setIsCartOpen(true); // Auto-open the cart: it is the "added" feedback
    return !alreadyInCart;
  };

  const removeFromCart = (id: string) => {
    const removed = cartItems.find((item) => item.id === id);
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    if (removed) {
      toast.show(`Removed "${removed.title}" from your cart`, 'info', 6000, {
        label: 'Undo',
        onClick: () =>
          setCartItems((prevItems) => (prevItems.some((i) => i.id === removed.id) ? prevItems : [...prevItems, removed])),
      });
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    sessionStorage.removeItem('toacc-cart');
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        isInCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}