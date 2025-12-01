'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { API_BASE_URL } from '@/lib/constants';

export interface CartItem {
  id: string;
  cart_id: string;
  product_id: string;
  quantity: number;
  price: string;
  created_at: string;
  updated_at: string;
  product?: {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: string;
    sale_price: string | null;
    images: string[];
    is_active: boolean;
  };
}

export interface Cart {
  id: string;
  user_id: string;
  session_id: string | null;
  created_at: string;
  updated_at: string;
  cart_items: CartItem[];
}

interface CartContextType {
  cart: Cart | null;
  cartItemsCount: number;
  isLoading: boolean;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  updateCartItem: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextType>({
  cart: null,
  cartItemsCount: 0,
  isLoading: false,
  addToCart: async () => {},
  updateCartItem: async () => {},
  removeFromCart: async () => {},
  clearCart: async () => {},
  refreshCart: async () => {},
});

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { token, isAuthenticated } = useAuth();

  // Calculate total cart items count
  const cartItemsCount = cart?.cart_items.reduce((total, item) => total + item.quantity, 0) || 0;

  // Fetch cart when user is authenticated
  useEffect(() => {
    if (isAuthenticated && token) {
      refreshCart();
    } else {
      setCart(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, token]);

  // Fetch cart from API
  const refreshCart = async () => {
    if (!token) return;

    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Add item to cart
  const addToCart = async (productId: string, quantity: number = 1) => {
    if (!token) {
      throw new Error('Please login to add items to cart');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/cart/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: productId,
          quantity,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to add to cart');
      }

      // Refresh cart to get updated data
      await refreshCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  // Update cart item quantity
  const updateCartItem = async (itemId: string, quantity: number) => {
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/cart/items/${itemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }),
      });

      if (!response.ok) {
        throw new Error('Failed to update cart item');
      }

      // Refresh cart to get updated data
      await refreshCart();
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId: string) => {
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/cart/items/${itemId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to remove from cart');
      }

      // Refresh cart to get updated data
      await refreshCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/cart`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to clear cart');
      }

      // Refresh cart to get updated data
      await refreshCart();
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  };

  const value: CartContextType = {
    cart,
    cartItemsCount,
    isLoading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    refreshCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
