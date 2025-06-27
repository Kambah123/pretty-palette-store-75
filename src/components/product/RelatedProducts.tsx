
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart } from "lucide-react";
import { Link } from 'react-router-dom';
import { useRelatedProducts } from '@/hooks/useProducts';
import { getProductImage, handleImageError } from '@/utils/imageUtils';

interface RelatedProductsProps {
  currentProductId: string;
  category: string;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({ currentProductId, category }) => {
  const { data: relatedProducts = [], isLoading } = useRelatedProducts(category, currentProductId, 4);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Related Products</CardTitle>
          <CardDescription>You might also like these products</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-300 h-40 rounded-lg mb-3"></div>
                <div className="bg-gray-300 h-4 rounded mb-2"></div>
                <div className="bg-gray-300 h-6 rounded mb-2"></div>
                <div className="bg-gray-300 h-8 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Related Products</CardTitle>
        <CardDescription>You might also like these products from {category}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {relatedProducts.map((product) => (
            <div key={product.id} className="group">
              <Link to={`/product/${product.id}`}>
                <div className="relative mb-3">
                  <img
                    src={getProductImage(product.images)}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
                    onError={handleImageError}
                  />
                  {product.stock_quantity === 0 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                      <span className="text-white text-sm font-semibold">Out of Stock</span>
                    </div>
                  )}
                </div>
              </Link>
              
              <div className="space-y-2">
                <p className="text-xs text-gray-500">{product.brand || 'SIA Collections'}</p>
                <Link to={`/product/${product.id}`}>
                  <h4 className="font-medium text-sm line-clamp-2 hover:text-blue-600 transition-colors">
                    {product.name}
                  </h4>
                </Link>
                
                <div className="flex items-center space-x-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">4.5</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-blue-600">৳{product.price}</span>
                </div>
                
                <Button 
                  size="sm" 
                  className="w-full"
                  disabled={product.stock_quantity === 0}
                >
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
