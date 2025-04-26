'use client';

import { useState, useMemo, useCallback } from 'react';
import ProductCard, { ProductCardSkeleton } from '@/components/product/product-card';
import ProductFilters, { Filters, ProductFiltersSkeleton } from '@/components/product/product-filters';
import ProductSorter, { SortOption } from '@/components/product/product-sorter';
import { getProducts, Product } from '@/services/product-api';
import { useFetchData } from '@/hooks/use-fetch-data';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ServerCrash } from 'lucide-react';

export default function ProductListing() {
  const { data: products, loading, error, refetch } = useFetchData<Product[]>(getProducts, [], true);
  const [filters, setFilters] = useState<Filters>({ categories: [], brands: [], priceRange: [0, 5000] }); // Default max price
  const [sortOption, setSortOption] = useState<SortOption>('default');

   const maxPrice = useMemo(() => {
    if (!products || products.length === 0) return 5000; // Default max if no products
    return Math.max(...products.map(p => p.price), 0);
  }, [products]);

   // Update initial filter price range when products load
   useState(() => {
     if (!loading && products) {
        setFilters(f => ({ ...f, priceRange: [f.priceRange[0], maxPrice] }));
     }
   });


  const handleFilterChange = useCallback((newFilters: Filters) => {
    setFilters(newFilters);
  }, []);

   const handleSortChange = useCallback((newSortOption: SortOption) => {
    setSortOption(newSortOption);
  }, []);


  const filteredAndSortedProducts = useMemo(() => {
    if (!products) return [];

    let filtered = products.filter(product => {
      const categoryMatch = filters.categories.length === 0 || filters.categories.includes(product.category);
      const brandMatch = filters.brands.length === 0 || filters.brands.includes(product.brand);
      const priceMatch = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
      return categoryMatch && brandMatch && priceMatch;
    });

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

    return filtered;
  }, [products, filters, sortOption]);

  return (
     <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
        {/* Filters Sidebar */}
        <aside className="md:sticky md:top-20 h-fit">
             {loading && !products ? (
                <ProductFiltersSkeleton />
              ) : (
                 <ProductFilters
                    onFilterChange={handleFilterChange}
                    initialFilters={filters}
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
                 {loading ? (
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
