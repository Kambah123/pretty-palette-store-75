import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { useFeaturedProducts } from '@/hooks/useProducts';
import { getProductImage, handleImageError } from '@/utils/imageUtils';
import { Link } from 'react-router-dom';
const FeaturedProducts = () => {
  const {
    data: featuredProducts = [],
    isLoading
  } = useFeaturedProducts(6);
  const renderStars = (rating: number = 4.5) => {
    return Array.from({
      length: 5
    }, (_, index) => <Star key={index} className={`h-4 w-4 ${index < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : index < rating ? 'fill-yellow-200 text-yellow-400' : 'text-gray-300'}`} />);
  };
  if (isLoading) {
    return <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked collection of premium products with unbeatable prices and quality.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({
            length: 6
          }).map((_, index) => <Card key={index} className="animate-pulse">
                <CardContent className="p-0">
                  <div className="bg-gray-300 h-64 rounded-t-lg"></div>
                  <div className="p-6 space-y-3">
                    <div className="bg-gray-300 h-4 rounded w-3/4"></div>
                    <div className="bg-gray-300 h-6 rounded w-full"></div>
                    <div className="bg-gray-300 h-4 rounded w-1/2"></div>
                    <div className="bg-gray-300 h-8 rounded w-full"></div>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>;
  }
  return <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      
    </section>;
};
export default FeaturedProducts;