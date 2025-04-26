'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface ProductGalleryProps {
  mainImageUrl: string;
  galleryImages: string[];
  altText: string;
}

export default function ProductGallery({ mainImageUrl, galleryImages, altText }: ProductGalleryProps) {
  const allImages = [mainImageUrl, ...galleryImages];
  const [selectedImage, setSelectedImage] = useState(mainImageUrl);

  return (
    <div className="grid gap-4">
      {/* Main Image Display */}
      <Card className="overflow-hidden aspect-square md:aspect-[4/3]">
         <CardContent className="p-0">
           <Image
              src={selectedImage}
              alt={`Main view: ${altText}`}
              width={800}
              height={600}
              className="object-contain w-full h-full" // Use contain to show the whole image
              priority // Prioritize the main product image
            />
         </CardContent>
      </Card>

      {/* Thumbnail Gallery */}
      {allImages.length > 1 && (
         <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {allImages.map((imgUrl, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(imgUrl)}
                className={cn(
                  "aspect-square overflow-hidden rounded-md border transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                  selectedImage === imgUrl ? 'ring-2 ring-primary ring-offset-2' : 'border-border hover:border-primary'
                )}
                aria-label={`View image ${index + 1}`}
              >
                <Image
                    src={imgUrl}
                    alt={`Thumbnail ${index + 1}: ${altText}`}
                    width={100}
                    height={100}
                    className="object-cover w-full h-full"
                />
              </button>
            ))}
         </div>
      )}
    </div>
  );
}
