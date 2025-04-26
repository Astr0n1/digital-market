/**
 * @fileOverview Product Filters Component
 * Allows users to filter products by category, brand, and price range.
 */
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


/**
 * Defines the structure for filter criteria.
 */
export interface Filters {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
}

interface ProductFiltersProps {
  /** Callback function invoked when filter values change. */
  onFilterChange: (filters: Filters) => void;
  /** Optional initial filter values. */
  initialFilters?: Partial<Filters>;
  /** The maximum possible price among all products, used for the slider range. */
  maxPrice: number;
}

const DEBOUNCE_DELAY = 300; // milliseconds for price slider debounce


export default function ProductFilters({ onFilterChange, initialFilters, maxPrice = 1000 }: ProductFiltersProps) {
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentFilters, setCurrentFilters] = useState<Filters>(() => ({
    categories: initialFilters?.categories ?? [],
    brands: initialFilters?.brands ?? [],
    priceRange: initialFilters?.priceRange ?? [0, maxPrice],
   }));

  // Internal state for the price range slider/inputs to provide responsiveness before debouncing
  const [internalPriceRange, setInternalPriceRange] = useState<[number, number]>(currentFilters.priceRange);

   // Fetch categories and brands on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [cats, brds] = await Promise.all([getCategories(), getBrands()]);
        setAvailableCategories(cats);
        setAvailableBrands(brds);
         // Initialize filter state based on fetched data and props
         const effectiveMaxPrice = maxPrice > 0 ? maxPrice : 1000; // Use default if maxPrice isn't valid
         const initialPriceRange: [number, number] = initialFilters?.priceRange ?? [0, effectiveMaxPrice];
         setCurrentFilters({
            categories: initialFilters?.categories ?? [],
            brands: initialFilters?.brands ?? [],
            priceRange: initialPriceRange
         });
         setInternalPriceRange(initialPriceRange);
      } catch (error) {
        console.error("Failed to fetch filter options:", error);
         // TODO: Show error toast to user
      } finally {
        setLoading(false);
      }
    };
    fetchData();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

    // Update internal state if initialFilters or maxPrice prop changes externally
   useEffect(() => {
        const effectiveMaxPrice = maxPrice > 0 ? maxPrice : 1000; // Use default if maxPrice isn't valid
        const newFilters = {
            categories: initialFilters?.categories ?? [],
            brands: initialFilters?.brands ?? [],
            priceRange: initialFilters?.priceRange ?? [0, effectiveMaxPrice],
        };
        // Only update if the incoming props actually differ from current state
        if (JSON.stringify(newFilters) !== JSON.stringify(currentFilters)) {
            setCurrentFilters(newFilters);
            setInternalPriceRange(newFilters.priceRange);
        }
   }, [initialFilters, maxPrice, currentFilters]); // Add currentFilters to dependency


   // Memoize onFilterChange to prevent unnecessary re-renders if the parent component provides a stable function
   const stableOnFilterChange = useCallback(onFilterChange, [onFilterChange]);


   // Handle category selection
  const handleCategoryChange = useCallback((category: string, checked: boolean | string) => {
    const isChecked = !!checked;
     setCurrentFilters(prev => {
       const newCategories = isChecked
          ? [...prev.categories, category]
          : prev.categories.filter(c => c !== category);
        const newState = { ...prev, categories: newCategories };
        // Use microtask to ensure parent state update happens after current render cycle
        queueMicrotask(() => stableOnFilterChange(newState));
        return newState;
     });
  }, [stableOnFilterChange]);

   // Handle brand selection
   const handleBrandChange = useCallback((brand: string, checked: boolean | string) => {
      const isChecked = !!checked;
     setCurrentFilters(prev => {
        const newBrands = isChecked
           ? [...prev.brands, brand]
           : prev.brands.filter(b => b !== brand);
        const newState = { ...prev, brands: newBrands };
        // Use microtask to ensure parent state update happens after current render cycle
        queueMicrotask(() => stableOnFilterChange(newState));
         return newState;
     });
  }, [stableOnFilterChange]);

   // Handle immediate price input changes
   const handlePriceInputChange = (index: 0 | 1, value: number) => {
      // Basic validation: ensure value is a number and non-negative
     const numericValue = Number(value);
      if (isNaN(numericValue) || numericValue < 0) {
          return; // Or provide feedback to the user
      }

      setInternalPriceRange(prev => {
         const newRange = [...prev] as [number, number];
          const effectiveMaxPrice = maxPrice > 0 ? maxPrice : Infinity;

         if (index === 0) {
            // Min price: Clamp between 0 and current max price (or overall max if lower)
            newRange[0] = Math.max(0, Math.min(numericValue, prev[1]));
         } else {
            // Max price: Clamp between current min price and overall max price
            newRange[1] = Math.min(effectiveMaxPrice, Math.max(numericValue, prev[0]));
         }
         return newRange;
      });
   };


    // Debounce price range updates from slider/input before applying filters
   useEffect(() => {
     const handler = setTimeout(() => {
       setCurrentFilters(prev => {
            // Only update if internalPriceRange actually changed from the current priceRange filter
            if (prev.priceRange[0] !== internalPriceRange[0] || prev.priceRange[1] !== internalPriceRange[1]) {
                const newState = { ...prev, priceRange: internalPriceRange };
                // Use microtask for the debounced update as well
                queueMicrotask(() => stableOnFilterChange(newState));
                return newState;
            }
            return prev; // No change needed
        });
     }, DEBOUNCE_DELAY);

     return () => {
       clearTimeout(handler);
     };
   }, [internalPriceRange, stableOnFilterChange]);


   // Reset filters function
   const resetFilters = useCallback(() => {
       const effectiveMaxPrice = maxPrice > 0 ? maxPrice : 1000;
      const defaultFilters: Filters = {
        categories: [],
        brands: [],
        priceRange: [0, effectiveMaxPrice],
      };
       setCurrentFilters(defaultFilters);
       setInternalPriceRange(defaultFilters.priceRange);
       // Use microtask for reset as well
       queueMicrotask(() => stableOnFilterChange(defaultFilters));
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
              {availableCategories.length > 0 ? (
                  availableCategories.map(category => (
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
                  ))
              ) : (
                  <p className="text-sm text-muted-foreground">No categories available.</p>
              )}
            </div>
          </div>

           {/* Brand Filter */}
           <div>
            <Label className="text-base font-medium mb-3 block">Brand</Label>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
             {availableBrands.length > 0 ? (
                 availableBrands.map(brand => (
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
                  ))
              ) : (
                 <p className="text-sm text-muted-foreground">No brands available.</p>
              )}
            </div>
          </div>


          {/* Price Range Filter */}
          <div>
            <Label className="text-base font-medium mb-4 block">Price Range</Label>
             {maxPrice > 0 ? (
                 <>
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
                             step={10}
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
                            step={10}
                        />
                    </div>
                 </>
             ) : (
                 <p className="text-sm text-muted-foreground">Price filter unavailable.</p>
             )}
          </div>
        </CardContent>
      </Card>
  );
}


/**
 * Skeleton component displayed while filters are loading.
 */
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
