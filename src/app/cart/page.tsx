
'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/hooks/use-cart';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, ShoppingBag, Loader2, CheckCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, itemCount } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false); // Track hydration state

  // Ensure client-side hydration is complete before rendering cart-dependent UI
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleQuantityChange = (productId: string, newQuantity: number, stock: number) => {
     if (newQuantity > stock) {
        toast({
            title: "Stock Limit Exceeded",
            description: `Only ${stock} items available.`,
            variant: "destructive",
        });
         updateQuantity(productId, stock); // Set to max available stock
     } else {
        updateQuantity(productId, newQuantity);
     }
  };

  const handleClearCart = () => {
    clearCart();
     toast({
        title: "Cart Cleared",
        description: "Your shopping cart has been emptied.",
      });
     setCheckoutSuccess(false); // Reset success state if cart is cleared manually
  }

  const handleRemoveItem = (productId: string, productName: string) => {
     removeFromCart(productId);
      toast({
        title: "Item Removed",
        description: `${productName} has been removed from your cart.`,
      });
      setCheckoutSuccess(false); // Reset success state on item removal
  }

  const handleCheckout = async () => {
      setIsCheckingOut(true);
      setCheckoutSuccess(false); // Reset success state before starting
      toast({
          title: "Processing Checkout",
          description: "Please wait while we simulate your order placement...",
      });

      // Simulate API call or processing delay
      await new Promise(resolve => setTimeout(resolve, 2500)); // Simulate 2.5 seconds delay

      try {
          // Simulate successful checkout
          clearCart();
          setCheckoutSuccess(true); // Set success state
          toast({
              title: "Checkout Successful!",
              description: "Your order has been confirmed. Thank you for shopping!",
              variant: "default", // Use default variant for success
          });
          // Optional: Redirect after a short delay
          // setTimeout(() => {
          //   router.push('/'); // Redirect to home page
          // }, 1500);

      } catch (error) {
           // Simulate error during checkout (optional)
           console.error("Checkout simulation failed:", error);
            toast({
                title: "Checkout Failed",
                description: "Something went wrong during checkout. Please try again.",
                variant: "destructive",
            });
             setCheckoutSuccess(false);
      } finally {
         setIsCheckingOut(false);
      }
  }

  // Loading/Skeleton state before hydration is complete
  if (!isHydrated) {
    return <CartPageSkeleton />;
  }

  // Show success message if checkout was successful and cart is now empty
  if (checkoutSuccess && itemCount === 0) {
      return (
          <div className="space-y-8 flex flex-col items-center text-center">
             <h1 className="text-3xl font-bold text-primary">Checkout Complete</h1>
                <Alert variant="default" className="max-w-md bg-green-100 border-green-300 dark:bg-green-900/30 dark:border-green-700">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <AlertTitle className="text-green-800 dark:text-green-200">Order Confirmed!</AlertTitle>
                    <AlertDescription className="text-green-700 dark:text-green-300">
                        Thank you for your purchase. Your order has been successfully placed.
                    </AlertDescription>
                </Alert>
                 <Link href="/products" passHref>
                    <Button variant="outline">Continue Shopping</Button>
                 </Link>
            </div>
       );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-primary">Your Shopping Cart</h1>

      {itemCount === 0 ? (
        <Card className="text-center py-10">
             <CardContent className="flex flex-col items-center gap-4">
                 <ShoppingBag size={48} className="text-muted-foreground" />
                 <p className="text-lg text-muted-foreground">Your cart is currently empty.</p>
                 <Link href="/products" passHref>
                     <Button>Start Shopping</Button>
                 </Link>
             </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
             <Card>
                <CardHeader className="flex flex-row justify-between items-center">
                    <CardTitle>Cart Items ({itemCount})</CardTitle>
                     <Button variant="outline" size="sm" onClick={handleClearCart} disabled={isCheckingOut}>
                        <Trash2 className="mr-2 h-4 w-4" /> Clear Cart
                     </Button>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Product</TableHead>
                            <TableHead>Details</TableHead>
                            <TableHead className="text-center">Quantity</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {cart.map(item => (
                            <TableRow key={item.id}>
                            <TableCell>
                                <Link href={`/products/${item.id}`}>
                                <Image
                                    src={item.imageUrl}
                                    alt={item.name}
                                    width={64}
                                    height={64}
                                    className="rounded-md object-cover aspect-square"
                                />
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link href={`/products/${item.id}`} className="font-medium hover:text-primary transition-colors">
                                    {item.name}
                                </Link>
                                <p className="text-xs text-muted-foreground">
                                    {item.stock > 0 ? `${item.stock} in stock` : <span className="text-destructive">Out of stock</span>}
                                </p>
                            </TableCell>
                            <TableCell className="text-center">
                                <Input
                                type="number"
                                min="1"
                                max={item.stock} // Set max based on stock
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1, item.stock)}
                                className="w-16 h-8 text-center"
                                aria-label={`Quantity for ${item.name}`}
                                disabled={isCheckingOut}
                                />
                            </TableCell>
                            <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                            <TableCell className="text-right font-medium">${(item.price * item.quantity).toFixed(2)}</TableCell>
                             <TableCell className="text-right">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleRemoveItem(item.id, item.name)}
                                    className="text-muted-foreground hover:text-destructive"
                                    aria-label={`Remove ${item.name}`}
                                    title={`Remove ${item.name}`}
                                    disabled={isCheckingOut}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </CardContent>
             </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
             <Card className="sticky top-20"> {/* Make summary sticky */}
                <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="flex justify-between">
                        <span>Subtotal ({itemCount} items)</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Shipping</span>
                        <span className="text-green-600">FREE</span> {/* Example */}
                    </div>
                     <div className="flex justify-between">
                        <span>Tax</span>
                        <span>Calculated at checkout</span> {/* Example */}
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                        <span>Estimated Total</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>
                </CardContent>
                <CardFooter>
                     <Button
                        size="lg"
                        className="w-full"
                        onClick={handleCheckout}
                        disabled={isCheckingOut || itemCount === 0} // Disable if checking out or cart empty
                      >
                        {isCheckingOut ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                            </>
                        ) : (
                            'Proceed to Checkout'
                        )}
                     </Button>
                </CardFooter>
             </Card>
          </div>
        </div>
      )}
    </div>
  );
}


// Skeleton component for CartPage
function CartPageSkeleton() {
    return (
      <div className="space-y-8">
        <Skeleton className="h-9 w-64" /> {/* Title Skeleton */}

         {/* Simulating the empty cart state initially */}
         <Card className="text-center py-10">
             <CardContent className="flex flex-col items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" /> {/* Icon Skeleton */}
                  <Skeleton className="h-6 w-48" /> {/* Text Skeleton */}
                  <Skeleton className="h-10 w-36" /> {/* Button Skeleton */}
             </CardContent>
         </Card>

         {/* Or skeleton for cart items (less common for initial hydration mismatch) */}
         {/*
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                  <Card>
                     <CardHeader className="flex flex-row justify-between items-center">
                         <Skeleton className="h-7 w-40" />
                         <Skeleton className="h-8 w-28" />
                     </CardHeader>
                     <CardContent className="p-0">
                         <Table>
                              <TableHeader>
                                 <TableRow>
                                     <TableHead className="w-[100px]"><Skeleton className="h-5 w-full" /></TableHead>
                                     <TableHead><Skeleton className="h-5 w-full" /></TableHead>
                                     <TableHead className="text-center"><Skeleton className="h-5 w-16 mx-auto" /></TableHead>
                                     <TableHead className="text-right"><Skeleton className="h-5 w-16 ml-auto" /></TableHead>
                                     <TableHead className="text-right"><Skeleton className="h-5 w-16 ml-auto" /></TableHead>
                                     <TableHead className="text-right"><Skeleton className="h-5 w-10 ml-auto" /></TableHead>
                                 </TableRow>
                             </TableHeader>
                             <TableBody>
                                 {[...Array(2)].map((_, i) => ( // Skeleton for 2 rows
                                     <TableRow key={i}>
                                         <TableCell><Skeleton className="h-16 w-16 rounded-md" /></TableCell>
                                         <TableCell><Skeleton className="h-5 w-3/4 mb-1" /><Skeleton className="h-3 w-1/2" /></TableCell>
                                         <TableCell className="text-center"><Skeleton className="h-8 w-16 mx-auto" /></TableCell>
                                         <TableCell className="text-right"><Skeleton className="h-5 w-12 ml-auto" /></TableCell>
                                         <TableCell className="text-right"><Skeleton className="h-5 w-16 ml-auto" /></TableCell>
                                         <TableCell className="text-right"><Skeleton className="h-9 w-9 ml-auto rounded-md" /></TableCell>
                                     </TableRow>
                                 ))}
                             </TableBody>
                         </Table>
                     </CardContent>
                  </Card>
              </div>
               <div className="lg:col-span-1">
                  <Card className="sticky top-20">
                      <CardHeader><Skeleton className="h-7 w-1/2" /></CardHeader>
                     <CardContent className="space-y-4">
                         <Skeleton className="h-5 w-full" />
                         <Skeleton className="h-5 w-full" />
                         <Skeleton className="h-5 w-full" />
                         <Skeleton className="h-px w-full bg-muted my-2" />
                         <Skeleton className="h-7 w-full" />
                     </CardContent>
                     <CardFooter><Skeleton className="h-12 w-full" /></CardFooter>
                  </Card>
               </div>
         </div>
         */}
      </div>
    );
}

