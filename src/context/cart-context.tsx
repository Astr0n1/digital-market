'use client';

import type React from 'react';
import { createContext, useState, useEffect, useCallback } from 'react';
import type { Product } from '@/services/product-api';
import { useLocalStorage } from '@/hooks/use-local-storage'; // Assuming useLocalStorage hook exists

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string) => number;
  cartTotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [storedCart, setStoredCart] = useLocalStorage<CartItem[]>('shoppingCart', []);
  const [cart, setCart] = useState<CartItem[]>(storedCart);

  // Sync state with local storage value on initial load
  useEffect(() => {
    setCart(storedCart);
  }, [storedCart]);

  // Update local storage whenever cart changes
  useEffect(() => {
    setStoredCart(cart);
  }, [cart, setStoredCart]);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.id === product.id);
      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        // Ensure quantity doesn't exceed stock
        updatedCart[existingItemIndex].quantity = Math.min(updatedCart[existingItemIndex].quantity, product.stock);
        return updatedCart;
      } else {
         // Ensure quantity doesn't exceed stock
        const newQuantity = Math.min(quantity, product.stock);
        if (newQuantity <= 0) return prevCart; // Don't add if stock is 0 or requested quantity is invalid
        return [...prevCart, { ...product, quantity: newQuantity }];
      }
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setCart((prevCart) => {
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        return prevCart.filter((item) => item.id !== productId);
      }
      return prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: Math.min(quantity, item.stock) } : item // Ensure quantity doesn't exceed stock
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const getItemQuantity = useCallback((productId: string): number => {
     const item = cart.find(item => item.id === productId);
     return item ? item.quantity : 0;
  }, [cart]);


  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemQuantity,
        cartTotal,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
