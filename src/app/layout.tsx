import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/header';
import { CartProvider } from '@/context/cart-context';
import { ComparisonProvider } from '@/context/comparison-context';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Tech Emporium',
  description: 'Your destination for the latest electronics',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true} // Add this line to suppress hydration warnings
      >
        <CartProvider>
          <ComparisonProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow container mx-auto px-4 py-8">
                {children}
              </main>
              <footer className="bg-primary text-primary-foreground py-4 mt-12">
                  <div className="container mx-auto text-center text-sm">
                    © {new Date().getFullYear()} Tech Emporium. All rights reserved.
                  </div>
              </footer>
            </div>
            <Toaster />
          </ComparisonProvider>
        </CartProvider>
      </body>
    </html>
  );
}
