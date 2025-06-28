
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { getProductImage, handleImageError } from '@/utils/imageUtils';

interface ProductCardProps {
  product: any;
}

export const ProductCard = ({ product }: ProductCardProps) => (
  <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
    <CardContent className="p-0">
      <div className="relative">
        <img
          src={getProductImage(product.images, product.id)}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg"
          loading="lazy"
          onError={handleImageError}
        />
        <Badge className="absolute top-2 left-2 bg-pink-600">
          {product.category}
        </Badge>
        {product.stock_quantity === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-t-lg">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white shadow-md hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="p-4">
        <p className="text-sm text-gray-500 mb-1">{product.brand || 'SIA Collections'}</p>
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <div className="flex items-center space-x-1 mb-2">
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
          <span className="text-xs text-gray-500">
            4.5 (25)
          </span>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="font-semibold text-pink-600">৳{product.price}</span>
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
              View
            </Button>
          </Link>
        </div>
      </div>
    </CardContent>
  </Card>
);
