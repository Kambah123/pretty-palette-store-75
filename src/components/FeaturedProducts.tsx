
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Eye } from 'lucide-react';

const FeaturedProducts = () => {
  const featuredProducts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
      brand: 'SIA Beauty',
      name: 'Professional Makeup Kit Set',
      rating: 4.8,
      reviews: 124,
      originalPrice: 4500,
      discountPrice: 3200,
      isFeatured: true
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',
      brand: 'SIA Skincare',
      name: 'Vitamin C Skin Care Set',
      rating: 4.9,
      reviews: 89,
      originalPrice: 3500,
      discountPrice: 2800,
      isFeatured: false
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop',
      brand: 'SIA Fashion',
      name: 'Designer Leather Handbag',
      rating: 4.7,
      reviews: 56,
      originalPrice: 8500,
      discountPrice: 6200,
      isFeatured: true
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
      brand: 'SIA Style',
      name: 'Premium Running Shoes',
      rating: 4.6,
      reviews: 203,
      originalPrice: 5500,
      discountPrice: 4200,
      isFeatured: false
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop',
      brand: 'SIA Beauty',
      name: 'Luxury Lipstick Collection',
      rating: 4.9,
      reviews: 167,
      originalPrice: 2800,
      discountPrice: 2100,
      isFeatured: true
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop',
      brand: 'SIA Fashion',
      name: 'Elegant Evening Dress',
      rating: 4.8,
      reviews: 92,
      originalPrice: 7200,
      discountPrice: 5400,
      isFeatured: false
    }
  ];

  const renderStars = (rating: number) => {
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
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.isFeatured && (
                    <Badge className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                      Featured
                    </Badge>
                  )}
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8 bg-white/90 hover:bg-white"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-2">
                    <p className="text-sm text-pink-600 font-medium">{product.brand}</p>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">
                        ৳{product.discountPrice.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ৳{product.originalPrice.toLocaleString()}
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
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-pink-300 text-pink-600 hover:bg-pink-50 px-8 py-4 text-lg font-semibold rounded-full hover-lift transition-all duration-200"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
