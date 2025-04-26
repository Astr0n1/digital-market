'use client';

import { useState, useEffect } from 'react';
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

export default function ProductFilters({ onFilterChange, initialFilters, maxPrice = 1000 }: ProductFiltersProps) {
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialFilters?.categories ?? []);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(initialFilters?.brands ?? []);
  const [priceRange, setPriceRange] = useState<[number, number]>(initialFilters?.priceRange ?? [0, maxPrice]);
  const [debouncedPriceRange, setDebouncedPriceRange] = useState<[number, number]>(priceRange);


   // Fetch categories and brands on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [cats, brds] = await Promise.all([getCategories(), getBrands()]);
        setAvailableCategories(cats);
        setAvailableBrands(brds);
      } catch (error) {
        console.error("Failed to fetch filter options:", error);
         // Handle error appropriately, maybe show a toast
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

   // Update initial price range max value when maxPrice prop changes
  useEffect(() => {
    setPriceRange(prev => [prev[0], initialFilters?.priceRange?.[1] ?? maxPrice]);
    setDebouncedPriceRange(prev => [prev[0], initialFilters?.priceRange?.[1] ?? maxPrice]);
  }, [maxPrice, initialFilters?.priceRange]);


   // Handle category selection
  const handleCategoryChange = (category: string, checked: boolean | string) => {
    const isChecked = !!checked;
    setSelectedCategories(prev =>
      isChecked ? [...prev, category] : prev.filter(c => c !== category)
    );
  };

   // Handle brand selection
   const handleBrandChange = (brand: string, checked: boolean | string) => {
    const isChecked = !!checked;
    setSelectedBrands(prev =>
      isChecked ? [...prev, brand] : prev.filter(b => b !== brand)
    );
  };

   // Handle price slider changes with debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedPriceRange(priceRange);
    }, DEBOUNCE_DELAY);

    return () => {
      clearTimeout(handler);
    };
  }, [priceRange]);


   // Call onFilterChange when filters change
  useEffect(() => {
    onFilterChange({
      categories: selectedCategories,
      brands: selectedBrands,
      priceRange: debouncedPriceRange,
    });
  }, [selectedCategories, selectedBrands, debouncedPriceRange, onFilterChange]);

   // Reset filters function
   const resetFilters = () => {
      setSelectedCategories([]);
      setSelectedBrands([]);
      setPriceRange([0, maxPrice]);
      setDebouncedPriceRange([0, maxPrice]);
      // Explicitly trigger update after reset
       onFilterChange({
        categories: [],
        brands: [],
        priceRange: [0, maxPrice],
       });
   };


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
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) => handleCategoryChange(category, checked)}
                  />
                  <Label htmlFor={`category-${category}`} className="font-normal cursor-pointer">
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
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={(checked) => handleBrandChange(brand, checked)}
                  />
                  <Label htmlFor={`brand-${brand}`} className="font-normal cursor-pointer">
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
              value={priceRange}
              onValueChange={setPriceRange} // Update instantly for visual feedback
              className="mb-3"
              minStepsBetweenThumbs={1}
            />
            <div className="flex justify-between items-center text-sm text-muted-foreground">
               <Input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange(prev => [Math.max(0, Number(e.target.value)), prev[1]])}
                    className="w-20 h-8 text-xs"
                    aria-label="Minimum price"
                     min={0}
                     max={priceRange[1]}
               />
                <span>-</span>
               <Input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange(prev => [prev[0], Math.min(maxPrice, Number(e.target.value))])}
                    className="w-20 h-8 text-xs"
                    aria-label="Maximum price"
                    min={priceRange[0]}
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
