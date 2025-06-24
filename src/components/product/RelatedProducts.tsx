
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";

interface RelatedProductsProps {
  currentProductId: number;
  category: string;
}

// Mock related products data
const mockRelatedProducts = [
  {
    id: 2,
    name: "Wireless Earbuds Pro",
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.3,
    reviewCount: 892,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=300&fit=crop",
    category: "Electronics"
  },
  {
    id: 3,
    name: "Noise Cancelling Headphones",
    price: 199.99,
    rating: 4.6,
    reviewCount: 456,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop",
    category: "Electronics"
  },
  {
    id: 4,
    name: "Premium Audio Cable",
    price: 29.99,
    rating: 4.2,
    reviewCount: 234,
    image: "https://images.unsplash.com/photo-1558618666-fbd51c91cd00?w=400&h=300&fit=crop",
    category: "Electronics"
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.4,
    reviewCount: 678,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
    category: "Electronics"
  }
];

export const RelatedProducts: React.FC<RelatedProductsProps> = ({ currentProductId, category }) => {
  const relatedProducts = mockRelatedProducts.filter(product => 
    product.id !== currentProductId && product.category === category
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating) 
            ? 'fill-yellow-400 text-yellow-400' 
            : i < rating 
            ? 'fill-yellow-400/50 text-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Related Products</CardTitle>
          <CardDescription>You might also like these products</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg mb-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.originalPrice && (
                    <Badge 
                      variant="destructive" 
                      className="absolute top-2 left-2"
                    >
                      Sale
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium text-sm group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center space-x-1">
                    <div className="flex">{renderStars(product.rating)}</div>
                    <span className="text-xs text-gray-500">
                      ({product.reviewCount})
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-gray-900">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => console.log(`Adding product ${product.id} to cart`)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
