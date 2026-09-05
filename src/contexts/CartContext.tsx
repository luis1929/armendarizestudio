'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { CartItem } from '@/types/product';

interface CartContextType {
  items: CartItem[];
  count: number;
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function getInitialItems(): CartItem[] {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('armendariz-cart');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
  }
  return [];
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(getInitialItems);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('armendariz-cart', JSON.stringify(items));
    }
  }, [items, mounted]);

  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  const addItem = useCallback((id: string) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  if (!mounted) {
    return (
      <CartContext.Provider value={{ items: [], count: 0, addItem: () => {}, removeItem: () => {}, clearCart: () => {} }}>
        {children}
      </CartContext.Provider>
    );
  }

  return (
    <CartContext.Provider value={{ items, count, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
