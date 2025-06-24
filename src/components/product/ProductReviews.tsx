
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ProductReviewsProps {
  productId: number;
}

// Mock reviews data
const mockReviews = [
  {
    id: 1,
    author: "John D.",
    rating: 5,
    title: "Excellent sound quality!",
    content: "These headphones exceeded my expectations. The noise cancellation is fantastic and the battery life is incredible. Highly recommend!",
    date: "2024-01-15",
    verified: true,
    helpful: 12,
    unhelpful: 1
  },
  {
    id: 2,
    author: "Sarah M.",
    rating: 4,
    title: "Great headphones, minor comfort issue",
    content: "Sound quality is amazing and the build quality feels premium. Only issue is they can get a bit uncomfortable after 3-4 hours of continuous use.",
    date: "2024-01-10",
    verified: true,
    helpful: 8,
    unhelpful: 0
  },
  {
    id: 3,
    author: "Mike R.",
    rating: 5,
    title: "Perfect for travel",
    content: "The noise cancellation makes flights so much more enjoyable. Battery lasts for my entire overseas trips. Worth every penny!",
    date: "2024-01-05",
    verified: false,
    helpful: 15,
    unhelpful: 2
  }
];

const ratingDistribution = {
  5: 45,
  4: 23,
  3: 8,
  2: 3,
  1: 2
};

export const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    content: '',
    name: ''
  });

  const totalReviews = Object.values(ratingDistribution).reduce((sum, count) => sum + count, 0);
  const averageRating = Object.entries(ratingDistribution).reduce(
    (sum, [rating, count]) => sum + (parseInt(rating) * count), 0
  ) / totalReviews;

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          interactive ? 'cursor-pointer hover:text-yellow-400' : ''
        } ${
          i < rating 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300'
        }`}
        onClick={interactive ? () => onRatingChange?.(i + 1) : undefined}
      />
    ));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting review:', newReview);
    // In a real app, this would submit to an API
    setShowReviewForm(false);
    setNewReview({ rating: 5, title: '', content: '', name: '' });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
          <CardDescription>See what other customers are saying</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Overall Rating */}
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{averageRating.toFixed(1)}</div>
              <div className="flex justify-center mb-2">
                {renderStars(Math.round(averageRating))}
              </div>
              <div className="text-gray-600">{totalReviews} reviews</div>
            </div>

            {/* Rating Distribution */}
            <div className="md:col-span-2">
              <div className="space-y-2">
                {Object.entries(ratingDistribution).reverse().map(([rating, count]) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <span className="text-sm w-8">{rating}★</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: `${(count / totalReviews) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Reviews</h3>
            <Button onClick={() => setShowReviewForm(true)}>
              Write a Review
            </Button>
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Write Your Review</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <Label>Rating</Label>
                    <div className="flex mt-1">
                      {renderStars(newReview.rating, true, (rating) => 
                        setNewReview(prev => ({ ...prev, rating }))
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="reviewName">Name</Label>
                    <Input
                      id="reviewName"
                      value={newReview.name}
                      onChange={(e) => setNewReview(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="reviewTitle">Review Title</Label>
                    <Input
                      id="reviewTitle"
                      value={newReview.title}
                      onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="reviewContent">Your Review</Label>
                    <Textarea
                      id="reviewContent"
                      value={newReview.content}
                      onChange={(e) => setNewReview(prev => ({ ...prev, content: e.target.value }))}
                      rows={4}
                      required
                    />
                  </div>

                  <div className="flex space-x-2">
                    <Button type="submit">Submit Review</Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setShowReviewForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Reviews List */}
          <div className="space-y-4">
            {mockReviews.map((review) => (
              <div key={review.id}>
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium">{review.author}</span>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs">Verified Purchase</Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex">{renderStars(review.rating)}</div>
                        <span className="text-sm text-gray-600">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-1">{review.title}</h4>
                    <p className="text-gray-700">{review.content}</p>
                  </div>

                  <div className="flex items-center space-x-4 text-sm">
                    <button className="flex items-center space-x-1 text-gray-600 hover:text-green-600">
                      <ThumbsUp className="h-4 w-4" />
                      <span>Helpful ({review.helpful})</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-600 hover:text-red-600">
                      <ThumbsDown className="h-4 w-4" />
                      <span>Not Helpful ({review.unhelpful})</span>
                    </button>
                  </div>
                </div>
                <Separator className="mt-4" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
