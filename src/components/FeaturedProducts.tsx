
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
    }, (_, index) => (
      <Star 
        key={index} 
        className={`h-4 w-4 ${
          index < Math.floor(rating) 
            ? 'fill-yellow-400 text-yellow-400' 
            : index < rating 
            ? 'fill-yellow-200 text-yellow-400' 
            : 'text-gray-300'
        }`} 
      />
    ));
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
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
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="animate-pulse">
                <CardContent className="p-0">
                  <div className="bg-gray-300 h-64 rounded-t-lg"></div>
                  <div className="p-6 space-y-3">
                    <div className="bg-gray-300 h-4 rounded w-3/4"></div>
                    <div className="bg-gray-300 h-6 rounded w-full"></div>
                    <div className="bg-gray-300 h-4 rounded w-1/2"></div>
                    <div className="bg-gray-300 h-8 rounded w-full"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
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
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover-lift">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={getProductImage(product.images, product.id)}
                    alt={product.name}
                    className="w-full h-64 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={handleImageError}
                  />
                  <Badge className="absolute top-3 left-3 bg-pink-600 hover:bg-pink-700">
                    {product.category}
                  </Badge>
                  {product.stock_quantity === 0 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-t-lg">
                      <span className="text-white font-semibold">Out of Stock</span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-1">{product.brand || 'SIA Collections'}</p>
                  <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2 group-hover:text-pink-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center space-x-1 mb-3">
                    <div className="flex">
                      {renderStars(4.5)}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">
                      4.5 (25 reviews)
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-pink-600">৳{product.price}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-pink-600 hover:bg-pink-700"
                      disabled={product.stock_quantity === 0}
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Add to Cart
                    </Button>
                    <Link to={`/product/${product.id}`}>
                      <Button size="sm" variant="outline" className="px-3">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {featuredProducts.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No featured products available at the moment.</p>
            <p className="text-sm text-gray-400 mt-2">Please check back later!</p>
          </div>
        )}
        
        <div className="text-center mt-12">
          <Link to="/products">
            <Button size="lg" variant="outline" className="border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
