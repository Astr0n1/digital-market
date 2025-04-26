'use client';

import type React from 'react';
import { createContext, useState, useEffect, useCallback } from 'react';
import type { Product } from '@/services/product-api';
import { useLocalStorage } from '@/hooks/use-local-storage';

const MAX_COMPARISON_ITEMS = 4; // Limit the number of items to compare

interface ComparisonContextType {
  comparisonList: Product[];
  addToComparison: (product: Product) => boolean; // Returns true if added, false if limit reached
  removeFromComparison: (productId: string) => void;
  clearComparison: () => void;
  isInComparison: (productId: string) => boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const ComparisonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [storedComparison, setStoredComparison] = useLocalStorage<Product[]>('comparisonList', []);
  const [comparisonList, setComparisonList] = useState<Product[]>(storedComparison);

   // Sync state with local storage value on initial load
  useEffect(() => {
    setComparisonList(storedComparison);
  }, [storedComparison]);


  // Update local storage whenever comparison list changes
  useEffect(() => {
    setStoredComparison(comparisonList);
  }, [comparisonList, setStoredComparison]);

  const addToComparison = useCallback((product: Product): boolean => {
    let added = false;
    setComparisonList((prevList) => {
      const isAlreadyInList = prevList.some((item) => item.id === product.id);
      if (!isAlreadyInList && prevList.length < MAX_COMPARISON_ITEMS) {
        added = true;
        return [...prevList, product];
      }
      // If already in list or limit reached, return the previous list
      return prevList;
    });
    return added; // Return whether the product was successfully added
  }, []);

  const removeFromComparison = useCallback((productId: string) => {
    setComparisonList((prevList) => prevList.filter((item) => item.id !== productId));
  }, []);

  const clearComparison = useCallback(() => {
    setComparisonList([]);
  }, []);

  const isInComparison = useCallback((productId: string): boolean => {
    return comparisonList.some((item) => item.id === productId);
  }, [comparisonList]);

  return (
    <ComparisonContext.Provider
      value={{
        comparisonList,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isInComparison,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};

export default ComparisonContext;

