'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCategories, getBrands } from '@/services/product-api';
import { X } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';


export interface Filters {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
}

interface ProductFiltersProps {
  onFilterChange: (filters: Filters) => void;
  initialFilters?: Partial<Filters>;
  maxPrice: number; // Max possible price from all products
}

const DEBOUNCE_DELAY = 300; // milliseconds for price slider debounce

// Helper to compare filter objects
const areFiltersEqual = (filtersA: Filters, filtersB: Filters): boolean => {
  return (
    JSON.stringify(filtersA.categories.sort()) === JSON.stringify(filtersB.categories.sort()) &&
    JSON.stringify(filtersA.brands.sort()) === JSON.stringify(filtersB.brands.sort()) &&
    filtersA.priceRange[0] === filtersB.priceRange[0] &&
    filtersA.priceRange[1] === filtersB.priceRange[1]
  );
};


export default function ProductFilters({ onFilterChange, initialFilters, maxPrice = 1000 }: ProductFiltersProps) {
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentFilters, setCurrentFilters] = useState<Filters>(() => ({
    categories: initialFilters?.categories ?? [],
    brands: initialFilters?.brands ?? [],
    priceRange: initialFilters?.priceRange ?? [0, maxPrice],
   }));

  const [internalPriceRange, setInternalPriceRange] = useState<[number, number]>(currentFilters.priceRange);


   // Fetch categories and brands on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [cats, brds] = await Promise.all([getCategories(), getBrands()]);
        setAvailableCategories(cats);
        setAvailableBrands(brds);
         // Set initial price range correctly after fetching maxPrice (if applicable, though passed as prop now)
         // Or if initialFilters are provided later
         setCurrentFilters(prev => ({
            ...prev,
            priceRange: initialFilters?.priceRange ?? [0, maxPrice]
         }));
         setInternalPriceRange(initialFilters?.priceRange ?? [0, maxPrice]);
      } catch (error) {
        console.error("Failed to fetch filter options:", error);
         // Handle error appropriately, maybe show a toast
      } finally {
        setLoading(false);
      }
    };
    fetchData();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

    // Update internal state if initialFilters or maxPrice prop changes externally
   useEffect(() => {
        const newFilters = {
            categories: initialFilters?.categories ?? [],
            brands: initialFilters?.brands ?? [],
            priceRange: initialFilters?.priceRange ?? [0, maxPrice],
        };
        setCurrentFilters(newFilters);
        setInternalPriceRange(newFilters.priceRange);
   }, [initialFilters, maxPrice]);


   // Handle category selection
  const handleCategoryChange = useCallback((category: string, checked: boolean | string) => {
    const isChecked = !!checked;
     setCurrentFilters(prev => {
       const newCategories = isChecked
          ? [...prev.categories, category]
          : prev.categories.filter(c => c !== category);
        const newState = { ...prev, categories: newCategories };
        stableOnFilterChange(newState); // Apply filter immediately
        return newState;
     });
  }, []);

   // Handle brand selection
   const handleBrandChange = useCallback((brand: string, checked: boolean | string) => {
      const isChecked = !!checked;
     setCurrentFilters(prev => {
        const newBrands = isChecked
           ? [...prev.brands, brand]
           : prev.brands.filter(b => b !== brand);
        const newState = { ...prev, brands: newBrands };
        stableOnFilterChange(newState); // Apply filter immediately
         return newState;
     });
  }, []);

   // Handle immediate price input changes
   const handlePriceInputChange = (index: 0 | 1, value: number) => {
      setInternalPriceRange(prev => {
         const newRange = [...prev] as [number, number];
         if (index === 0) {
            newRange[0] = Math.max(0, Math.min(value, prev[1])); // Ensure min <= max
         } else {
            newRange[1] = Math.min(maxPrice, Math.max(value, prev[0])); // Ensure max >= min
         }
         return newRange;
      });
   };


    // Debounce price range updates before applying filters
   useEffect(() => {
     const handler = setTimeout(() => {
       setCurrentFilters(prev => {
           const newState = { ...prev, priceRange: internalPriceRange };
           stableOnFilterChange(newState); // Apply filter after debounce
           return newState;
        });
     }, DEBOUNCE_DELAY);

     return () => {
       clearTimeout(handler);
     };
   }, [internalPriceRange]);


    // Memoize onFilterChange to prevent unnecessary re-renders if the parent component provides a stable function
   const stableOnFilterChange = useCallback(onFilterChange, [onFilterChange]);
   const previousFiltersRef = useRef<Filters>();

    // Call onFilterChange ONLY when currentFilters actually change (Removed as filters are applied immediately or after debounce)
    // useEffect(() => {
    //     if (previousFiltersRef.current && areFiltersEqual(previousFiltersRef.current, currentFilters)) {
    //         return; // Filters haven't changed, do nothing
    //     }
    //     stableOnFilterChange(currentFilters);
    //     previousFiltersRef.current = currentFilters; // Store the current filters for the next comparison
    // }, [currentFilters, stableOnFilterChange]);


   // Reset filters function
   const resetFilters = useCallback(() => {
      const defaultFilters: Filters = {
        categories: [],
        brands: [],
        priceRange: [0, maxPrice],
      };
       setCurrentFilters(defaultFilters);
       setInternalPriceRange(defaultFilters.priceRange);
       stableOnFilterChange(defaultFilters); // Apply reset immediately
   }, [maxPrice, stableOnFilterChange]);


   if (loading) {
      return <ProductFiltersSkeleton />;
   }

  return (
     <Card>
       <CardHeader className="flex flex-row items-center justify-between pb-2">
         <CardTitle className="text-lg font-semibold">Filters</CardTitle>
         <Button variant="ghost" size="sm" onClick={resetFilters} className="text-xs text-muted-foreground">
            <X className="mr-1 h-3 w-3" /> Reset
         </Button>
       </CardHeader>
       <CardContent className="space-y-6">
          {/* Category Filter */}
          <div>
            <Label className="text-base font-medium mb-3 block">Category</Label>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
              {availableCategories.map(category => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={currentFilters.categories.includes(category)}
                    onCheckedChange={(checked) => handleCategoryChange(category, checked)}
                    aria-labelledby={`category-label-${category}`}
                  />
                   <Label htmlFor={`category-${category}`} id={`category-label-${category}`} className="font-normal cursor-pointer">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

           {/* Brand Filter */}
           <div>
            <Label className="text-base font-medium mb-3 block">Brand</Label>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
              {availableBrands.map(brand => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={currentFilters.brands.includes(brand)}
                    onCheckedChange={(checked) => handleBrandChange(brand, checked)}
                     aria-labelledby={`brand-label-${brand}`}
                  />
                   <Label htmlFor={`brand-${brand}`} id={`brand-label-${brand}`} className="font-normal cursor-pointer">
                    {brand}
                  </Label>
                </div>
              ))}
            </div>
          </div>


          {/* Price Range Filter */}
          <div>
            <Label className="text-base font-medium mb-4 block">Price Range</Label>
            <Slider
              min={0}
              max={maxPrice}
              step={10}
               value={internalPriceRange} // Bind to internal state for responsiveness
               onValueChange={setInternalPriceRange} // Update internal state directly
              className="mb-3"
              minStepsBetweenThumbs={1}
               aria-label="Price range slider"
            />
            <div className="flex justify-between items-center text-sm text-muted-foreground">
               <Input
                    type="number"
                     value={internalPriceRange[0]}
                     onChange={(e) => handlePriceInputChange(0, Number(e.target.value))}
                    className="w-20 h-8 text-xs"
                    aria-label="Minimum price"
                     min={0}
                     max={internalPriceRange[1]}
               />
                <span>-</span>
               <Input
                    type="number"
                     value={internalPriceRange[1]}
                    onChange={(e) => handlePriceInputChange(1, Number(e.target.value))}
                    className="w-20 h-8 text-xs"
                    aria-label="Maximum price"
                    min={internalPriceRange[0]}
                    max={maxPrice}
                />
            </div>
          </div>
        </CardContent>
      </Card>
  );
}


export function ProductFiltersSkeleton() {
  return (
     <Card>
       <CardHeader className="flex flex-row items-center justify-between pb-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-8 w-16" />
       </CardHeader>
       <CardContent className="space-y-6">
         {/* Category Skeleton */}
          <div>
            <Skeleton className="h-5 w-24 mb-3" />
            <div className="space-y-2">
               {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-2">
                     <Skeleton className="h-4 w-4" />
                     <Skeleton className="h-4 w-32" />
                  </div>
                ))}
            </div>
          </div>
           {/* Brand Skeleton */}
          <div>
            <Skeleton className="h-5 w-16 mb-3" />
            <div className="space-y-2">
               {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-2">
                     <Skeleton className="h-4 w-4" />
                     <Skeleton className="h-4 w-28" />
                  </div>
                ))}
            </div>
          </div>
           {/* Price Skeleton */}
           <div>
            <Skeleton className="h-5 w-32 mb-4" />
            <Skeleton className="h-2 w-full mb-3" />
             <div className="flex justify-between items-center">
                 <Skeleton className="h-8 w-20" />
                 <Skeleton className="h-8 w-20" />
             </div>
           </div>
       </CardContent>
     </Card>
  );
}
