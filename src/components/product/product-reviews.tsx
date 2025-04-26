import type { ProductReview } from '@/services/product-api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import StarRating from '@/components/ui/star-rating'; // Assuming StarRating component exists
import { formatDistanceToNow } from 'date-fns';

interface ProductReviewsProps {
  reviews: ProductReview[];
}

export default function ProductReviews({ reviews }: ProductReviewsProps) {
  if (!reviews || reviews.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No reviews yet for this product.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Reviews ({reviews.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="flex space-x-4">
            <Avatar>
              {/* Placeholder for avatar image - could fetch based on author name/ID */}
              <AvatarImage src={`https://api.dicebear.com/8.x/initials/svg?seed=${review.author}`} alt={review.author} />
              <AvatarFallback>{review.author.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <p className="font-semibold">{review.author}</p>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(review.date), { addSuffix: true })}
                </span>
              </div>
              <StarRating rating={review.rating} size={16} />
              <p className="mt-2 text-sm text-foreground">{review.comment}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
