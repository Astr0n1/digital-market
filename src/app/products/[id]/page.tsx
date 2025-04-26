'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useFetchData } from '@/hooks/use-fetch-data';
import { getProduct, Product } from '@/services/product-api';
import { Button } from '@/components/ui/button';
import { ShoppingCart, GitCompareArrows, Check, ServerCrash, Loader2 } from 'lucide-react';
import ProductGallery from '@/components/product/product-gallery';
import TechnicalSpecifications from '@/components/product/technical-specifications';
import ProductReviews from '@/components/product/product-reviews';
import StarRating from '@/components/ui/star-rating';
import { useCart } from '@/hooks/use-cart';
import { useComparison } from '@/hooks/use-comparison';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';


export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const { data: product, loading, error } = useFetchData<Product | undefined>(getProduct, [id], !!id);
  const { addToCart, getItemQuantity } = useCart();
  const { addToComparison, removeFromComparison, isInComparison } = useComparison();
  const { toast } = useToast();

   const isComparing = product ? isInComparison(product.id) : false;
   const quantityInCart = product ? getItemQuantity(product.id) : 0;
   const isOutOfStock = product?.stock !== undefined && product.stock <= 0;


   const handleAddToCart = () => {
    if (!product) return;
     if (isOutOfStock) {
         toast({
            title: "Out of Stock",
            description: `${product.name} is currently unavailable.`,
            variant: "destructive",
          });
        return;
    }
     if (quantityInCart >= product.stock) {
        toast({
            title: "Stock Limit Reached",
            description: `You already have the maximum available stock of ${product.name} in your cart.`,
            variant: "destructive",
         });
        return;
     }
    addToCart(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your shopping cart.`,
    });
  };

  const handleToggleComparison = () => {
     if (!product) return;
    if (isComparing) {
      removeFromComparison(product.id);
       toast({
        title: "Removed from Comparison",
        description: `${product.name} has been removed from the comparison list.`,
       });
    } else {
      const added = addToComparison(product);
      if (added) {
        toast({
          title: "Added to Comparison",
          description: `${product.name} has been added to the comparison list.`,
        });
      } else {
         toast({
            title: "Comparison Limit Reached",
            description: "You can only compare up to 4 items.",
            variant: "destructive",
         });
      }
    }
  };


  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (error) {
     return (
        <Alert variant="destructive" className="max-w-2xl mx-auto">
           <ServerCrash className="h-4 w-4" />
           <AlertTitle>Error Loading Product</AlertTitle>
           <AlertDescription>
            Could not fetch product details. Please check the URL or try again later.
           </AlertDescription>
       </Alert>
    );
  }

  if (!product) {
    return (
        <div className="text-center py-10">
             <h1 className="text-2xl font-semibold text-muted-foreground">Product not found</h1>
             <p className="text-muted-foreground mt-2">The product you are looking for does not exist.</p>
             {/* Maybe add a link back to products page */}
        </div>
     );
  }

   // Calculate average rating
  const averageRating = product.reviews.length > 0
    ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
    : 0;

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Gallery */}
        <ProductGallery
          mainImageUrl={product.imageUrl}
          galleryImages={product.gallery}
          altText={product.name}
        />

        {/* Product Info */}
        <div className="space-y-4">
          <Badge variant="outline">{product.category}</Badge>
          <h1 className="text-3xl lg:text-4xl font-bold text-primary">{product.name}</h1>
          <div className="flex items-center space-x-2">
            {averageRating > 0 && <StarRating rating={averageRating} />}
             <span className="text-sm text-muted-foreground">({product.reviews.length} reviews)</span>
          </div>
           <p className="text-foreground/80 text-base">{product.description}</p>
          <p className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</p>

            {isOutOfStock ? (
                 <Badge variant="destructive" className="text-base px-3 py-1">Out of Stock</Badge>
            ) : product.stock < 10 ? (
                 <Badge variant="secondary" className="text-destructive text-base px-3 py-1">Low Stock ({product.stock} left)</Badge>
            ) : (
                 <Badge variant="secondary" className="text-base px-3 py-1">In Stock</Badge>
            )}


          <div className="flex flex-col sm:flex-row gap-3 pt-4">
             <Button onClick={handleAddToCart} size="lg" disabled={isOutOfStock || quantityInCart >= product.stock} className="flex-1">
                <ShoppingCart className="mr-2 h-5 w-5" />
                 {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
             </Button>
              <Button
                onClick={handleToggleComparison}
                variant={isComparing ? "secondary" : "outline"}
                size="lg"
                className="flex-1"
                aria-label={isComparing ? "Remove from comparison" : "Add to comparison"}
              >
                 {isComparing ? <Check className="mr-2 h-5 w-5 text-primary" /> : <GitCompareArrows className="mr-2 h-5 w-5" />}
                 {isComparing ? 'Comparing' : 'Compare'}
              </Button>
          </div>
        </div>
      </div>

      {/* Specifications and Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        <div className="space-y-8">
             <TechnicalSpecifications specifications={product.technicalSpecifications} />
        </div>
         <ProductReviews reviews={product.reviews} />
      </div>

    </div>
  );
}


function ProductDetailSkeleton() {
  return (
     <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Gallery Skeleton */}
         <div className="space-y-4">
             <Skeleton className="w-full aspect-square md:aspect-[4/3]" />
             <div className="grid grid-cols-5 gap-2">
                 {[...Array(5)].map((_, i) => <Skeleton key={i} className="w-full aspect-square rounded-md" />)}
             </div>
         </div>

         {/* Info Skeleton */}
        <div className="space-y-4">
           <Skeleton className="h-6 w-24" />
           <Skeleton className="h-10 w-3/4" />
           <Skeleton className="h-5 w-1/2" />
           <Skeleton className="h-4 w-full" />
           <Skeleton className="h-4 w-5/6" />
           <Skeleton className="h-10 w-1/3" />
           <Skeleton className="h-6 w-28 mb-4" />

           <div className="flex flex-col sm:flex-row gap-3 pt-4">
             <Skeleton className="h-12 flex-1" />
             <Skeleton className="h-12 flex-1" />
           </div>
        </div>
      </div>
      {/* Specs and Reviews Skeleton */}
       <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
         <Card>
            <CardHeader>
                 <Skeleton className="h-8 w-1/2" />
            </CardHeader>
            <CardContent>
                 <Skeleton className="h-40 w-full" />
            </CardContent>
         </Card>
          <Card>
            <CardHeader>
                 <Skeleton className="h-8 w-3/4" />
            </CardHeader>
             <CardContent className="space-y-4">
                 <Skeleton className="h-16 w-full" />
                 <Skeleton className="h-16 w-full" />
             </CardContent>
         </Card>
       </div>
    </div>
  )
}
