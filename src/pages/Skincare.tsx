
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Skincare = () => {
  // Generate skincare products (IDs 46-115) with corresponding images
  const skincareProducts = [];
  for (let i = 46; i <= 115; i++) {
    const imageNumber = i.toString().padStart(4, '0');
    skincareProducts.push({
      id: i,
      name: `Premium Skincare Product ${i}`,
      description: `Nourishing skincare product formulated with natural ingredients to enhance your skin's natural beauty and health.`,
      price: 1500 + Math.floor(Math.random() * 3500),
      category: 'skincare',
      brand: 'Pretty Palette',
      images: [`/images/product_${imageNumber}.jpg`],
      stock_quantity: Math.floor(Math.random() * 50) + 10,
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
              Skincare Collection
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our premium skincare collection featuring {skincareProducts.length} nourishing products.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {skincareProducts.map((product) => (
              <Card 
                key={product.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 hover-lift cursor-pointer group"
              >
                <CardContent className="p-0">
                  <Link to={`/product/${product.id}`}>
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        loading="eager"
                        decoding="async"
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
                        onClick={(e) => {
                          e.preventDefault();
                          console.log(`Adding ${product.name} to cart`);
                        }}
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

export default Skincare;
