
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ShopByCategory = () => {
  const categories = [
    {
      name: 'Sale',
      tagline: 'Up to 50% off',
      items: '200+ items',
      color: 'bg-red-100 text-red-800 border-red-200'
    },
    {
      name: 'Makeup',
      tagline: 'Beauty essentials',
      items: '150+ items',
      color: 'bg-pink-100 text-pink-800 border-pink-200'
    },
    {
      name: 'Skincare',
      tagline: 'Glow & care',
      items: '120+ items',
      color: 'bg-purple-100 text-purple-800 border-purple-200'
    },
    {
      name: 'Home',
      tagline: 'Home decor',
      items: '80+ items',
      color: 'bg-blue-100 text-blue-800 border-blue-200'
    },
    {
      name: 'Shoes',
      tagline: 'Step in style',
      items: '90+ items',
      color: 'bg-green-100 text-green-800 border-green-200'
    },
    {
      name: 'Handbags',
      tagline: 'Luxury collections',
      items: '70+ items',
      color: 'bg-indigo-100 text-indigo-800 border-indigo-200'
    },
    {
      name: 'Accessories',
      tagline: 'Perfect finishing',
      items: '110+ items',
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    },
    {
      name: 'Clothing',
      tagline: 'Fashion forward',
      items: '180+ items',
      color: 'bg-teal-100 text-teal-800 border-teal-200'
    },
    {
      name: 'Kids',
      tagline: 'Little ones',
      items: '60+ items',
      color: 'bg-orange-100 text-orange-800 border-orange-200'
    },
    {
      name: 'Men',
      tagline: 'Gentleman\'s choice',
      items: '85+ items',
      color: 'bg-gray-100 text-gray-800 border-gray-200'
    },
    {
      name: 'Minis',
      tagline: 'Travel size',
      items: '45+ items',
      color: 'bg-rose-100 text-rose-800 border-rose-200'
    },
    {
      name: 'Designer',
      tagline: 'Premium brands',
      items: '35+ items',
      color: 'bg-violet-100 text-violet-800 border-violet-200'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through our carefully curated categories to find exactly what you're looking for.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card 
              key={category.name} 
              className="bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover-lift cursor-pointer group animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">
                    {category.name}
                  </h3>
                  <Badge 
                    variant="secondary" 
                    className={`${category.color} font-medium`}
                  >
                    {category.items}
                  </Badge>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">
                  {category.tagline}
                </p>
                
                <div className="border-t pt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="text-sm text-pink-600 font-medium cursor-pointer hover:text-pink-700">
                    Browse {category.name} →
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;
