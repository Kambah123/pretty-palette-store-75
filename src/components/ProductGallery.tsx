
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Eye } from 'lucide-react';

const ProductGallery = () => {
  // Generate array of product data with names and prices
  const productImages = [];
  for (let i = 1; i <= 115; i++) {
    const imageNumber = i.toString().padStart(4, '0');
    const isSkincareProduct = i >= 46;
    const basePrice = isSkincareProduct ? 1500 : 1200;
    const randomPrice = basePrice + Math.floor(Math.random() * 2000);
    
    productImages.push({
      id: i,
      image: `/images/product_${imageNumber}.jpg`,
      name: isSkincareProduct ? `Skincare Product ${i}` : `Makeup Product ${i}`,
      category: isSkincareProduct ? 'Skincare' : 'Makeup',
      price: randomPrice
    });
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Product Gallery
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through our extensive collection of {productImages.length} premium products.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {productImages.map((product) => (
            <Card 
              key={`product-${product.id}`}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 hover-lift cursor-pointer group"
            >
              <CardContent className="p-0">
                <Link to={`/product/${product.id}`}>
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop';
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Eye className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                </Link>
                
                <div className="p-2">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-medium text-gray-900 text-xs mb-1 line-clamp-2 group-hover:text-pink-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-gray-500 mb-2">{product.category}</p>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-pink-600 text-sm">৳{product.price}</span>
                  </div>
                  <div className="flex space-x-1">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-pink-600 hover:bg-pink-700 text-xs h-7"
                      onClick={(e) => {
                        e.preventDefault();
                        console.log(`Adding ${product.name} to cart`);
                        // Add to cart functionality
                      }}
                    >
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      Add
                    </Button>
                    <Link to={`/product/${product.id}`}>
                      <Button size="sm" variant="outline" className="px-2 text-xs h-7">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/products">
            <Button size="lg" className="bg-pink-600 hover:bg-pink-700">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductGallery;
