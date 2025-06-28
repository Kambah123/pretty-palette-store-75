
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, ShoppingCart } from 'lucide-react';

const FeaturedProducts = () => {
  // Featured products from your collection - selecting diverse items
  const featuredProducts = [
    {
      id: 1,
      image: '/images/product_0001.jpg',
      name: 'Premium Makeup Kit',
      category: 'Makeup',
      price: 2500,
      originalPrice: 3000,
      rating: 4.8,
      reviews: 127
    },
    {
      id: 15,
      image: '/images/product_0015.jpg',
      name: 'Luxury Lipstick Collection',
      category: 'Makeup',
      price: 1800,
      rating: 4.9,
      reviews: 89
    },
    {
      id: 46,
      image: '/images/product_0046.jpg',
      name: 'Hydrating Face Serum',
      category: 'Skincare',
      price: 2200,
      originalPrice: 2500,
      rating: 4.7,
      reviews: 156
    },
    {
      id: 30,
      image: '/images/product_0030.jpg',
      name: 'Professional Eyeshadow Palette',
      category: 'Makeup',
      price: 1900,
      rating: 4.6,
      reviews: 94
    },
    {
      id: 75,
      image: '/images/product_0075.jpg',
      name: 'Anti-Aging Moisturizer',
      category: 'Skincare',
      price: 2800,
      rating: 4.8,
      reviews: 203
    },
    {
      id: 22,
      image: '/images/product_0022.jpg',
      name: 'Matte Foundation Set',
      category: 'Makeup',
      price: 2100,
      originalPrice: 2400,
      rating: 4.5,
      reviews: 78
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium beauty products
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <Card 
              key={product.id}
              className="group hover:shadow-lg transition-all duration-300 hover-lift cursor-pointer"
            >
              <CardContent className="p-0">
                <Link to={`/product/${product.id}`}>
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-200"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop';
                      }}
                    />
                    <Badge className="absolute top-2 left-2 bg-pink-600">
                      {product.category}
                    </Badge>
                    {product.originalPrice && (
                      <Badge className="absolute top-2 right-2 bg-red-500">
                        Sale
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-10 right-2 bg-white shadow-md hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </Link>
                
                <div className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center space-x-1 mb-2">
                    <div className="flex">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-xs text-gray-500">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-pink-600">৳{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">৳{product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-pink-600 hover:bg-pink-700"
                      onClick={(e) => {
                        e.preventDefault();
                        console.log(`Adding ${product.name} to cart`);
                        // Add to cart functionality will be implemented
                      }}
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Add to Cart
                    </Button>
                    <Link to={`/product/${product.id}`}>
                      <Button size="sm" variant="outline" className="px-3">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link to="/products">
            <Button size="lg" variant="outline" className="hover:bg-pink-50 hover:border-pink-600">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
