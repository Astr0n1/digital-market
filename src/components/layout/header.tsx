'use client';

import Link from 'next/link';
import { ShoppingCart, GitCompareArrows, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/use-cart';
import { useComparison } from '@/hooks/use-comparison';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/compare', label: 'Compare' },
  { href: '/cart', label: 'Cart' },
];

export default function Header() {
  const { cart } = useCart();
  const { comparisonList } = useComparison();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Tech Emporium
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} passHref>
              <Button
                variant="ghost"
                className={cn(
                  "hover:bg-primary/80 hover:text-primary-foreground",
                   pathname === link.href ? 'bg-primary/70' : ''
                 )}
              >
                {link.label}
              </Button>
            </Link>
           ))}
        </nav>

        {/* Icons */}
        <div className="hidden md:flex items-center space-x-4">
           <Link href="/compare" passHref>
            <Button variant="ghost" size="icon" className="relative hover:bg-primary/80">
              <GitCompareArrows className="h-5 w-5" />
              {comparisonList.length > 0 && (
                <Badge variant="secondary" className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs">
                  {comparisonList.length}
                </Badge>
              )}
              <span className="sr-only">Compare Products</span>
            </Button>
          </Link>
          <Link href="/cart" passHref>
            <Button variant="ghost" size="icon" className="relative hover:bg-primary/80">
              <ShoppingCart className="h-5 w-5" />
              {totalCartItems > 0 && (
                <Badge variant="secondary" className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs">
                  {totalCartItems}
                </Badge>
              )}
              <span className="sr-only">Shopping Cart</span>
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden">
           <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px] bg-background text-foreground p-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-primary">Menu</h2>
                 <SheetClose asChild>
                   <Button variant="ghost" size="icon">
                      <X className="h-6 w-6" />
                      <span className="sr-only">Close menu</span>
                   </Button>
                 </SheetClose>
              </div>
              <nav className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <SheetClose key={link.href} asChild>
                    <Link href={link.href} passHref>
                      <Button
                        variant={pathname === link.href ? 'secondary': 'ghost'}
                        className="justify-start w-full"
                      >
                         {link.label === 'Compare' && comparisonList.length > 0 && <GitCompareArrows className="mr-2 h-4 w-4" />}
                         {link.label === 'Cart' && totalCartItems > 0 && <ShoppingCart className="mr-2 h-4 w-4" />}
                         {link.label}
                         {link.label === 'Compare' && comparisonList.length > 0 && (
                            <Badge variant="outline" className="ml-auto">{comparisonList.length}</Badge>
                         )}
                         {link.label === 'Cart' && totalCartItems > 0 && (
                             <Badge variant="outline" className="ml-auto">{totalCartItems}</Badge>
                         )}
                      </Button>
                    </Link>
                  </SheetClose>
                 ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
