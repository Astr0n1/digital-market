'use client';

import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import ProductCard, { ProductCardSkeleton } from '@/components/product/product-card';
import ProductFilters, { Filters, ProductFiltersSkeleton } from '@/components/product/product-filters';
import ProductSorter, { SortOption } from '@/components/product/product-sorter';
import { getProducts, Product } from '@/services/product-api';
import { useFetchData } from '@/hooks/use-fetch-data';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ServerCrash } from 'lucide-react';

const DEFAULT_MAX_PRICE = 5000; // Set a default max price

export default function ProductListing() {
  const { data: products, loading: productsLoading, error, refetch } = useFetchData<Product[]>(getProducts, [], true);
  const [filters, setFilters] = useState<Filters>({ categories: [], brands: [], priceRange: [0, DEFAULT_MAX_PRICE] });
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [maxPrice, setMaxPrice] = useState<number>(DEFAULT_MAX_PRICE);
  const [isInitialLoad, setIsInitialLoad] = useState(true); // Track initial load

  console.log("ProductListing - Hook state:", { products, productsLoading, error, filters, sortOption, maxPrice, isInitialLoad }); // Debug log

  // Calculate max price only once when products are loaded
   useEffect(() => {
     console.log("ProductListing - Max Price Effect - Start", { products, productsLoading }); // Debug log
     if (products && products.length > 0) {
       const calculatedMax = Math.max(...products.map(p => p.price), DEFAULT_MAX_PRICE);
       console.log("ProductListing - Max Price Effect - Calculated Max:", calculatedMax); // Debug log
       setMaxPrice(calculatedMax);
       // Set initial filter price range *after* maxPrice is calculated
       setFilters(f => {
           const newFilters = { ...f, priceRange: [f.priceRange[0] === 0 ? 0 : f.priceRange[0], calculatedMax] };
           console.log("ProductListing - Max Price Effect - Setting Filters:", newFilters); // Debug log
           return newFilters;
        });
       setIsInitialLoad(false); // Mark initial load complete
       console.log("ProductListing - Max Price Effect - Initial load complete (with products)"); // Debug log
     } else if (!productsLoading && !error) { // Only update if not loading and no error, but products array might be empty
         console.log("ProductListing - Max Price Effect - No products or empty, using default max price"); // Debug log
         setMaxPrice(DEFAULT_MAX_PRICE);
         setFilters(f => {
             const newFilters = { ...f, priceRange: [f.priceRange[0], DEFAULT_MAX_PRICE] };
             console.log("ProductListing - Max Price Effect - Setting Filters (default):", newFilters); // Debug log
             return newFilters;
            });
         setIsInitialLoad(false); // Mark initial load complete even if no products
         console.log("ProductListing - Max Price Effect - Initial load complete (no products/empty)"); // Debug log
     } else if (error) {
          console.log("ProductListing - Max Price Effect - Error occurred, using default max price"); // Debug log
          setMaxPrice(DEFAULT_MAX_PRICE);
          setIsInitialLoad(false);
          console.log("ProductListing - Max Price Effect - Initial load complete (error)"); // Debug log
     }
   }, [products, productsLoading, error]);


   // Memoize filter change handler to avoid unnecessary re-renders in child
  const handleFilterChange = useCallback((newFilters: Filters) => {
    console.log("ProductListing - handleFilterChange:", newFilters); // Debug log
    setFilters(newFilters);
  }, []);

   const handleSortChange = useCallback((newSortOption: SortOption) => {
    console.log("ProductListing - handleSortChange:", newSortOption); // Debug log
    setSortOption(newSortOption);
  }, []);


  const filteredAndSortedProducts = useMemo(() => {
     console.log("ProductListing - Filter/Sort Memo - Start", { isInitialLoad, products }); // Debug log
     // Wait for initial load and products before filtering
    if (isInitialLoad || !products) {
         console.log("ProductListing - Filter/Sort Memo - Bailing: initialLoad or no products"); // Debug log
        return [];
    }

    let filtered = products.filter(product => {
      const categoryMatch = filters.categories.length === 0 || filters.categories.includes(product.category);
      const brandMatch = filters.brands.length === 0 || filters.brands.includes(product.brand);
      const priceMatch = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
      return categoryMatch && brandMatch && priceMatch;
    });

    console.log("ProductListing - Filter/Sort Memo - After filtering:", filtered.length); // Debug log

    switch (sortOption) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'default':
      default:
        // Keep original order or apply a default sort if needed
        break;
    }
    console.log("ProductListing - Filter/Sort Memo - After sorting:", filtered.length); // Debug log
    return filtered;
  }, [products, filters, sortOption, isInitialLoad]); // Depend on isInitialLoad

   // Determine loading state more accurately
  const isLoading = productsLoading || isInitialLoad;
  console.log("ProductListing - Derived isLoading:", isLoading); // Debug log


  return (
     <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
        {/* Filters Sidebar */}
        <aside className="md:sticky md:top-20 h-fit">
             {isLoading ? (
                 <ProductFiltersSkeleton />
              ) : (
                 <ProductFilters
                    key={maxPrice} // Re-mount if maxPrice changes drastically (unlikely but safe)
                    onFilterChange={handleFilterChange}
                    initialFilters={filters} // Pass current filters
                    maxPrice={maxPrice}
                 />
              )}
        </aside>

         {/* Product Grid and Sorter */}
         <main>
            <div className="flex justify-end mb-4">
                <ProductSorter onSortChange={handleSortChange} currentSort={sortOption}/>
            </div>

            {error && (
                 <Alert variant="destructive" className="mb-6">
                    <ServerCrash className="h-4 w-4" />
                    <AlertTitle>Error Loading Products</AlertTitle>
                    <AlertDescription>
                    Could not fetch product data. Please try again later.
                    </AlertDescription>
                </Alert>
             )}

             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {isLoading ? (
                    Array.from({ length: 6 }).map((_, index) => <ProductCardSkeleton key={index} />)
                 ) : filteredAndSortedProducts.length > 0 ? (
                    filteredAndSortedProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                 ) : (
                    <div className="col-span-full text-center py-10">
                        <p className="text-muted-foreground text-lg">No products match your current filters.</p>
                    </div>
                 )}
            </div>
        </main>
     </div>
  );
}
