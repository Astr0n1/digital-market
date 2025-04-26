'use client';

import { useCart } from '@/hooks/use-cart';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, ShoppingBag } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, itemCount } = useCart();
  const { toast } = useToast();

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
  }

  const handleRemoveItem = (productId: string, productName: string) => {
     removeFromCart(productId);
      toast({
        title: "Item Removed",
        description: `${productName} has been removed from your cart.`,
      });
  }

  const handleCheckout = () => {
      // Placeholder for checkout logic
      toast({
          title: "Checkout Initiated",
          description: "Redirecting to checkout... (Not Implemented)",
      });
      // In a real app, you'd redirect to a checkout page or integrate a payment gateway
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
                     <Button variant="outline" size="sm" onClick={handleClearCart}>
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
                     <Button size="lg" className="w-full" onClick={handleCheckout}>
                        Proceed to Checkout
                     </Button>
                </CardFooter>
             </Card>
          </div>
        </div>
      )}
    </div>
  );
}
