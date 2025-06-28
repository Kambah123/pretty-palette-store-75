import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star, ThumbsUp, ThumbsDown, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
interface Review {
  id: number;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  helpful: number;
  unhelpful: number;
  images?: string[];
}
interface ProductRatingSystemProps {
  productId: number;
  averageRating: number;
  totalReviews: number;
  reviews: Review[];
  ratingDistribution: Record<number, number>;
}
export const ProductRatingSystem: React.FC<ProductRatingSystemProps> = ({
  productId,
  averageRating,
  totalReviews,
  reviews,
  ratingDistribution
}) => {
  const [sortBy, setSortBy] = useState('newest');
  const [filterByRating, setFilterByRating] = useState('all');
  const [visibleReviews, setVisibleReviews] = useState(5);
  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClass = {
      sm: 'h-3 w-3',
      md: 'h-4 w-4',
      lg: 'h-5 w-5'
    }[size];
    return Array.from({
      length: 5
    }, (_, i) => <Star key={i} className={`${sizeClass} ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : i < rating ? 'fill-yellow-400/50 text-yellow-400' : 'text-gray-300'}`} />);
  };
  const getFilteredReviews = () => {
    let filtered = reviews;
    if (filterByRating !== 'all') {
      filtered = filtered.filter(review => review.rating === parseInt(filterByRating));
    }
    switch (sortBy) {
      case 'oldest':
        return filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      case 'rating-high':
        return filtered.sort((a, b) => b.rating - a.rating);
      case 'rating-low':
        return filtered.sort((a, b) => a.rating - b.rating);
      case 'helpful':
        return filtered.sort((a, b) => b.helpful - a.helpful);
      default:
        // newest
        return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  };
  const filteredReviews = getFilteredReviews();
  const displayedReviews = filteredReviews.slice(0, visibleReviews);
  const getRatingPercentage = (rating: number) => {
    return totalReviews > 0 ? ratingDistribution[rating] / totalReviews * 100 : 0;
  };
  return <div className="space-y-6">
      {/* Overall Rating Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews & Ratings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Average Rating */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                <span className="text-4xl font-bold">{averageRating.toFixed(1)}</span>
                <div className="flex">{renderStars(averageRating, 'lg')}</div>
              </div>
              <p className="text-gray-600">Based on {totalReviews} reviews</p>
              
              {/* Rating Breakdown */}
              <div className="mt-4 space-y-2">
                {[5, 4, 3, 2, 1].map(rating => <div key={rating} className="flex items-center space-x-3">
                    <span className="text-sm w-2">{rating}</span>
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <Progress value={getRatingPercentage(rating)} className="flex-1 h-2" />
                    <span className="text-sm text-gray-600 w-10">
                      {ratingDistribution[rating] || 0}
                    </span>
                  </div>)}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {Math.round(((ratingDistribution[5] || 0) + (ratingDistribution[4] || 0)) / totalReviews * 100)}%
                  </div>
                  <div className="text-sm text-gray-600">Positive Reviews</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.round((ratingDistribution[5] || 0) / totalReviews * 100)}%
                  </div>
                  <div className="text-sm text-gray-600">5-Star Reviews</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Sorting */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span className="text-sm font-medium">Filter by:</span>
          </div>
          <Select value={filterByRating} onValueChange={setFilterByRating}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="5">5 Stars</SelectItem>
              <SelectItem value="4">4 Stars</SelectItem>
              <SelectItem value="3">3 Stars</SelectItem>
              <SelectItem value="2">2 Stars</SelectItem>
              <SelectItem value="1">1 Star</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="rating-high">Highest Rated</SelectItem>
            <SelectItem value="rating-low">Lowest Rated</SelectItem>
            <SelectItem value="helpful">Most Helpful</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {displayedReviews.map(review => <Card key={review.id}>
            
          </Card>)}
      </div>

      {/* Load More Button */}
      {filteredReviews.length > visibleReviews && <div className="text-center">
          <Button variant="outline" onClick={() => setVisibleReviews(prev => prev + 5)}>
            Load More Reviews ({filteredReviews.length - visibleReviews} remaining)
          </Button>
        </div>}
    </div>;
};