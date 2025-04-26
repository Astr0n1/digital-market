'use client';

import { useComparison } from '@/hooks/use-comparison';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, GitCompareArrows, Check } from 'lucide-react';
import TechnicalSpecifications from '@/components/product/technical-specifications';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import StarRating from '@/components/ui/star-rating';

export default function ComparePage() {
  const { comparisonList, removeFromComparison, clearComparison } = useComparison();
  const { addToCart, getItemQuantity } = useCart();
  const { toast } = useToast();

  const handleRemoveItem = (productId: string, productName: string) => {
    removeFromComparison(productId);
    toast({
      title: "Removed from Comparison",
      description: `${productName} removed.`,
    });
  };

    const handleAddToCart = (product: typeof comparisonList[0]) => {
     const quantityInCart = getItemQuantity(product.id);
     const isOutOfStock = product.stock <= 0;

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


  // Get all unique specification keys from all products in the list
  const allSpecKeys = useMemo(() => {
    const keys = new Set<string>();
    comparisonList.forEach(product => {
      Object.keys(product.technicalSpecifications).forEach(key => keys.add(key));
    });
    return Array.from(keys).sort(); // Sort keys alphabetically
  }, [comparisonList]);

  // Calculate average rating for each product
    const getAverageRating = (reviews: typeof comparisonList[0]['reviews']) => {
     if (!reviews || reviews.length === 0) return 0;
      return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
         <h1 className="text-3xl font-bold text-primary">Compare Products</h1>
         {comparisonList.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearComparison}>
                <Trash2 className="mr-2 h-4 w-4" /> Clear All
            </Button>
         )}
      </div>


      {comparisonList.length === 0 ? (
        <Card className="text-center py-10">
             <CardContent className="flex flex-col items-center gap-4">
                 <GitCompareArrows size={48} className="text-muted-foreground" />
                 <p className="text-lg text-muted-foreground">You haven't added any products to compare yet.</p>
                 <p className="text-sm text-muted-foreground">Add products from the listing or product pages.</p>
                 <Link href="/products" passHref>
                     <Button>Browse Products</Button>
                 </Link>
             </CardContent>
        </Card>
      ) : (
        <div className="overflow-x-auto">
             <Table className="min-w-[800px]"> {/* Ensure minimum width for horizontal scroll */}
                <TableHeader>
                <TableRow>
                    <TableHead className="w-[200px] align-top sticky left-0 bg-background z-10">Feature</TableHead> {/* Sticky first column */}
                    {comparisonList.map(product => (
                    <TableHead key={product.id} className="w-[250px] align-top text-center">
                        <div className="flex flex-col items-center gap-2 relative">
                             <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveItem(product.id, product.name)}
                                className="absolute top-0 right-0 text-muted-foreground hover:text-destructive h-6 w-6"
                                aria-label={`Remove ${product.name} from comparison`}
                                title={`Remove ${product.name} from comparison`}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                            <Link href={`/products/${product.id}`} className="block aspect-square w-32 h-32 mb-2">
                                <Image
                                src={product.imageUrl}
                                alt={product.name}
                                width={128}
                                height={128}
                                className="rounded-md object-cover w-full h-full"
                                />
                            </Link>
                             <Link href={`/products/${product.id}`} className="font-medium text-sm hover:text-primary transition-colors line-clamp-2 h-10">
                                {product.name}
                             </Link>
                              <p className="text-lg font-semibold text-primary">${product.price.toFixed(2)}</p>
                               <StarRating rating={getAverageRating(product.reviews)} size={16} />
                               <Button size="sm" className="mt-2 w-full" onClick={() => handleAddToCart(product)} disabled={product.stock <= 0}>
                                    {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                               </Button>
                        </div>
                    </TableHead>
                    ))}
                </TableRow>
                </TableHeader>
                <TableBody>
                 {/* Add a row for category */}
                 <TableRow>
                     <TableCell className="font-medium sticky left-0 bg-background z-10">Category</TableCell>
                    {comparisonList.map(product => (
                        <TableCell key={`${product.id}-category`} className="text-center text-sm">{product.category}</TableCell>
                     ))}
                 </TableRow>
                  {/* Add a row for brand */}
                 <TableRow>
                     <TableCell className="font-medium sticky left-0 bg-background z-10">Brand</TableCell>
                    {comparisonList.map(product => (
                        <TableCell key={`${product.id}-brand`} className="text-center text-sm">{product.brand}</TableCell>
                     ))}
                 </TableRow>

                 {/* Add a row for stock */}
                  <TableRow>
                     <TableCell className="font-medium sticky left-0 bg-background z-10">Availability</TableCell>
                    {comparisonList.map(product => (
                        <TableCell key={`${product.id}-stock`} className="text-center text-sm">
                             {product.stock > 0 ? <span className="text-green-600">In Stock ({product.stock})</span> : <span className="text-destructive">Out of Stock</span>}
                        </TableCell>
                     ))}
                 </TableRow>


                {allSpecKeys.map(key => (
                    <TableRow key={key}>
                     <TableCell className="font-medium sticky left-0 bg-background z-10">{key}</TableCell>
                    {comparisonList.map(product => (
                        <TableCell key={`${product.id}-${key}`} className="text-center text-sm">
                         {product.technicalSpecifications[key] || '-'}
                        </TableCell>
                    ))}
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
      )}
    </div>
  );
}
