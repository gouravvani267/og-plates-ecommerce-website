import { useState, useEffect } from 'react';
import { Star, Verified } from 'lucide-react';
import { fakeAPI } from '@/lib/api';

const ReviewsSection = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const response = await fakeAPI.getReviews();
        if (response.success && response.data) {
          setReviews(response.data);
        }
      } catch (error) {
        console.error('Failed to load reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3 mx-auto"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-muted rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Customer Reviews</h2>
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-6 h-6 ${
                  star <= Math.floor(parseFloat(averageRating))
                    ? 'fill-primary text-primary'
                    : 'text-muted-foreground'
                }`}
              />
            ))}
          </div>
          <span className="text-2xl font-bold text-primary">{averageRating}</span>
          <span className="text-muted-foreground">({reviews.length} reviews)</span>
        </div>
        <p className="text-muted-foreground">
          Join thousands of satisfied customers who love their custom plates
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {reviews.map((review) => (
          <div key={review.id} className="glass rounded-xl p-6 shadow-card">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-foreground">{review.name}</h4>
                  {review.verified && (
                    <Verified className="w-4 h-4 text-accent" />
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating
                          ? 'fill-primary text-primary'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <span className="text-xs text-muted-foreground">
                {new Date(review.date).toLocaleDateString('en-IN')}
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;