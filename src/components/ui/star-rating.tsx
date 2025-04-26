import { Star, StarHalf } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number; // Should be between 0 and 5
  size?: number;
  className?: string;
  totalStars?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  size = 20,
  className,
  totalStars = 5,
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn('flex items-center text-yellow-400', className)} aria-label={`Rating: ${rating} out of ${totalStars} stars`}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} fill="currentColor" size={size} className="stroke-yellow-400"/>
      ))}
      {hasHalfStar && (
        <StarHalf key="half" fill="currentColor" size={size} className="stroke-yellow-400" />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} size={size} className="stroke-yellow-400 text-muted-foreground/30" fill="currentColor" />
      ))}
    </div>
  );
};

export default StarRating;
