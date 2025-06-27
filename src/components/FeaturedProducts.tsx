
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { useFeaturedProducts } from '@/hooks/useProducts';
import { getProductImage, handleImageError } from '@/utils/imageUtils';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {
  const { data: featuredProducts = [], isLoading } = useFeaturedProducts(6);

  const renderStars = (rating: number = 4.5) => {
    return Array.from({ length: 5 }, (_, index) => (
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProducts.map((product, index) => (
            <Card 
              key={product.id}
              className="bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 hover-lift cursor-pointer group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={getProductImage(product.images)}
                    alt={product.name}
                    className="w-full h-64 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={handleImageError}
                  />
                  <Badge className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                    Featured
                  </Badge>
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Link to={`/product/${product.id}`}>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8 bg-white/90 hover:bg-white"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-2">
                    <p className="text-sm text-pink-600 font-medium">{product.brand || 'SIA Collections'}</p>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {renderStars(4.5)}
                    </div>
                    <span className="text-sm text-gray-600">
                      4.5 (25)
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">
                        ৳{product.price.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/products">
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-pink-300 text-pink-600 hover:bg-pink-50 px-8 py-4 text-lg font-semibold rounded-full hover-lift transition-all duration-200"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
