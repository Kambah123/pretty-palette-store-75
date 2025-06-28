
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Makeup = () => {
  // Generate makeup product images (product_0001.jpg to product_0045.jpg)
  const makeupProducts = [];
  for (let i = 1; i <= 45; i++) {
    const imageNumber = i.toString().padStart(4, '0');
    makeupProducts.push({
      id: i,
      image: `/images/product_${imageNumber}.jpg`,
      name: `Makeup Product ${i}`, // Placeholder name - can be updated manually later
      price: Math.floor(Math.random() * 3000) + 500, // Random price for demo
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="py-8">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-pink-600 hover:text-pink-700 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Makeup Collection
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our premium makeup collection featuring {makeupProducts.length} beautiful products.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {makeupProducts.map((product) => (
              <Card 
                key={product.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 hover-lift cursor-pointer group"
              >
                <CardContent className="p-0">
                  <Link to={`/product/${product.id}`}>
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop';
                        }}
                      />
                    </div>
                  </Link>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-pink-600">৳{product.price}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-pink-600 hover:bg-pink-700 text-xs"
                      >
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        Add to Cart
                      </Button>
                      <Link to={`/product/${product.id}`}>
                        <Button size="sm" variant="outline" className="px-3 text-xs">
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Makeup;
