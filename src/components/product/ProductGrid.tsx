
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: any[];
  isLoading: boolean;
  onClearFilters: () => void;
}

const ProductCardSkeleton = () => (
  <Card>
    <CardContent className="p-0">
      <Skeleton className="w-full h-48 rounded-t-lg" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-8 w-full" />
      </div>
    </CardContent>
  </Card>
);

export const ProductGrid = ({ products, isLoading, onClearFilters }: ProductGridProps) => (
  <div className="flex-1">
    {!isLoading && (
      <div className="mb-4 text-sm text-gray-600">
        Showing {products.length} products
      </div>
    )}
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {isLoading ? (
        Array.from({ length: 9 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))
      ) : (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
    
    {!isLoading && products.length === 0 && (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={onClearFilters}
        >
          Clear All Filters
        </Button>
      </div>
    )}
  </div>
);
