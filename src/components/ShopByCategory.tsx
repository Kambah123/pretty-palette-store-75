
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface CategoryData {
  name: string;
  tagline: string;
  count: number;
  color: string;
  slug: string;
  image: string;
}

const ShopByCategory = () => {
  const categories: CategoryData[] = [
    { 
      name: 'Sale', 
      tagline: 'Up to 50% off', 
      color: 'bg-red-100 text-red-800 border-red-200', 
      slug: 'sale',
      count: 25,
      image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=300&h=200&fit=crop&auto=format'
    },
    { 
      name: 'Makeup', 
      tagline: 'Beauty essentials', 
      color: 'bg-pink-100 text-pink-800 border-pink-200', 
      slug: 'makeup',
      count: 45,
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=200&fit=crop&auto=format'
    },
    { 
      name: 'Skincare', 
      tagline: 'Glow & care', 
      color: 'bg-purple-100 text-purple-800 border-purple-200', 
      slug: 'skincare',
      count: 32,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=200&fit=crop&auto=format'
    },
    { 
      name: 'Home', 
      tagline: 'Home decor', 
      color: 'bg-blue-100 text-blue-800 border-blue-200', 
      slug: 'home',
      count: 18,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop&auto=format'
    },
    { 
      name: 'Shoes', 
      tagline: 'Step in style', 
      color: 'bg-green-100 text-green-800 border-green-200', 
      slug: 'shoes',
      count: 28,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=200&fit=crop&auto=format'
    },
    { 
      name: 'Handbags', 
      tagline: 'Luxury collections', 
      color: 'bg-indigo-100 text-indigo-800 border-indigo-200', 
      slug: 'handbags',
      count: 22,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=200&fit=crop&auto=format'
    },
    { 
      name: 'Accessories', 
      tagline: 'Perfect finishing', 
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
      slug: 'accessories',
      count: 35,
      image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=300&h=200&fit=crop&auto=format'
    },
    { 
      name: 'Clothing', 
      tagline: 'Fashion forward', 
      color: 'bg-teal-100 text-teal-800 border-teal-200', 
      slug: 'clothing',
      count: 42,
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop&auto=format'
    },
    { 
      name: 'Kids', 
      tagline: 'Little ones', 
      color: 'bg-orange-100 text-orange-800 border-orange-200', 
      slug: 'kids',
      count: 16,
      image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=300&h=200&fit=crop&auto=format'
    },
    { 
      name: 'Men', 
      tagline: 'Gentleman\'s choice', 
      color: 'bg-gray-100 text-gray-800 border-gray-200', 
      slug: 'men',
      count: 24,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&auto=format'
    },
    { 
      name: 'Minis', 
      tagline: 'Travel size', 
      color: 'bg-rose-100 text-rose-800 border-rose-200', 
      slug: 'minis',
      count: 12,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=200&fit=crop&auto=format'
    },
    { 
      name: 'Designer', 
      tagline: 'Premium brands', 
      color: 'bg-violet-100 text-violet-800 border-violet-200', 
      slug: 'designer',
      count: 15,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop&auto=format'
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
            <Link
              key={category.name}
              to={category.name === 'Sale' ? '/products?sale=true' : `/products?category=${category.slug}`}
              className="block"
            >
              <Card 
                className="bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover-lift cursor-pointer group animate-fade-in overflow-hidden"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-200"></div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">
                      {category.name}
                    </h3>
                    <Badge 
                      variant="secondary" 
                      className={`${category.color} font-medium`}
                    >
                      {category.count} {category.count === 1 ? 'item' : 'items'}
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;
