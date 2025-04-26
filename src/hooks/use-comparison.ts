'use client';

import { useContext } from 'react';
import ComparisonContext from '@/context/comparison-context';

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};
