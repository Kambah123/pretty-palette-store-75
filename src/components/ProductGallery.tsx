
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const ProductGallery = () => {
  // Generate array of product image URLs from your GitHub uploads
  const productImages = [];
  for (let i = 1; i <= 115; i++) {
    const imageNumber = i.toString().padStart(4, '0');
    productImages.push(`/images/product_${imageNumber}.jpg`);
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
          {productImages.map((image, index) => (
            <Card 
              key={`product-${index + 1}`}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 hover-lift cursor-pointer group"
            >
              <CardContent className="p-0">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback if image doesn't exist
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGallery;
