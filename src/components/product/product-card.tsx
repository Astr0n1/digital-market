'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, GitCompareArrows, Check } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/services/product-api';
import { useCart } from '@/hooks/use-cart';
import { useComparison } from '@/hooks/use-comparison';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { name, price, imageUrl, id, category, stock } = product;
  const { addToCart, getItemQuantity } = useCart();
  const { addToComparison, removeFromComparison, isInComparison } = useComparison();
  const { toast } = useToast();
  const isComparing = isInComparison(id);
  const quantityInCart = getItemQuantity(id);
  const isOutOfStock = stock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) {
         toast({
            title: "Out of Stock",
            description: `${name} is currently unavailable.`,
            variant: "destructive",
          });
        return;
    }
     if (quantityInCart >= stock) {
        toast({
            title: "Stock Limit Reached",
            description: `You already have the maximum available stock of ${name} in your cart.`,
            variant: "destructive",
         });
        return;
     }
    addToCart(product);
    toast({
      title: "Added to Cart",
      description: `${name} has been added to your shopping cart.`,
    });
  };

  const handleToggleComparison = () => {
    if (isComparing) {
      removeFromComparison(id);
       toast({
        title: "Removed from Comparison",
        description: `${name} has been removed from the comparison list.`,
       });
    } else {
      const added = addToComparison(product);
      if (added) {
        toast({
          title: "Added to Comparison",
          description: `${name} has been added to the comparison list.`,
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

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <CardHeader className="relative p-0">
        <Link href={`/products/${id}`} className="block aspect-video overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            width={600}
            height={400}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            priority // Prioritize loading images visible on initial load
          />
        </Link>
        <Badge variant="secondary" className="absolute top-2 left-2">{category}</Badge>
         {isOutOfStock && (
            <Badge variant="destructive" className="absolute top-2 right-2">Out of Stock</Badge>
         )}
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <Link href={`/products/${id}`}>
            <CardTitle className="text-lg font-semibold mb-2 hover:text-primary transition-colors line-clamp-2 h-[3.5rem]">{name}</CardTitle>
         </Link>
        <p className="text-xl font-bold text-primary">${price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center gap-2">
         <Button
            onClick={handleToggleComparison}
            variant={isComparing ? "secondary" : "outline"}
            size="icon"
            aria-label={isComparing ? "Remove from comparison" : "Add to comparison"}
            title={isComparing ? "Remove from comparison" : "Add to comparison"}
         >
           {isComparing ? <Check className="h-4 w-4 text-primary" /> : <GitCompareArrows className="h-4 w-4" />}
         </Button>
        <Button onClick={handleAddToCart} disabled={isOutOfStock || quantityInCart >= stock} className="flex-grow">
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </Button>

      </CardFooter>
    </Card>
  );
}


export function ProductCardSkeleton() {
  return (
     <Card className="flex flex-col h-full overflow-hidden">
       <CardHeader className="p-0">
          <Skeleton className="aspect-video w-full" />
       </CardHeader>
        <CardContent className="flex-grow p-4">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-8 w-1/2" />
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center gap-2">
           <Skeleton className="h-10 w-10 rounded-md" />
           <Skeleton className="h-10 flex-grow rounded-md" />
        </CardFooter>
      </Card>
  )
}
