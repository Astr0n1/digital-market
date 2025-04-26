import ProductListing from '@/components/product/product-listing';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-12">
       <section className="text-center bg-gradient-to-r from-secondary via-background to-accent p-10 rounded-lg shadow-md">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Welcome to Tech Emporium!</h1>
          <p className="text-lg text-foreground/80 mb-6">Your one-stop shop for the latest and greatest in electronics.</p>
          <Link href="/products" passHref>
              <Button size="lg">Shop Now</Button>
          </Link>
       </section>

       <section>
           <h2 className="text-3xl font-semibold mb-6 text-center text-primary">Featured Products</h2>
           {/* Pass featured=true or similar prop if ProductListing supports it */}
           {/* Or fetch specific featured products */}
           <ProductListing/>
       </section>

        <section className="grid md:grid-cols-2 gap-8 items-center">
            <div>
                 <h3 className="text-2xl font-semibold mb-3 text-primary">Why Choose Us?</h3>
                 <ul className="list-disc list-inside space-y-2 text-foreground/90">
                    <li>Wide selection of top brands</li>
                    <li>Competitive prices</li>
                    <li>Fast and reliable shipping</li>
                    <li>Expert customer support</li>
                    <li>Easy returns and exchanges</li>
                 </ul>
            </div>
             <div className="bg-card p-6 rounded-lg shadow">
                 <h3 className="text-2xl font-semibold mb-3 text-primary">Stay Updated</h3>
                 <p className="text-muted-foreground mb-4">Subscribe to our newsletter for the latest deals and product drops.</p>
                 {/* Add newsletter signup form here if needed */}
                 <Button variant="outline">Subscribe (Coming Soon)</Button>
             </div>
        </section>
    </div>
  );
}
