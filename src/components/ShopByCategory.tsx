
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface CategoryData {
  name: string;
  tagline: string;
  count: number;
  color: string;
  slug: string;
}

const ShopByCategory = () => {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);

  const categoryConfig = [
    { name: 'Sale', tagline: 'Up to 50% off', color: 'bg-red-100 text-red-800 border-red-200', slug: 'sale' },
    { name: 'Makeup', tagline: 'Beauty essentials', color: 'bg-pink-100 text-pink-800 border-pink-200', slug: 'makeup' },
    { name: 'Skincare', tagline: 'Glow & care', color: 'bg-purple-100 text-purple-800 border-purple-200', slug: 'skincare' },
    { name: 'Home', tagline: 'Home decor', color: 'bg-blue-100 text-blue-800 border-blue-200', slug: 'home' },
    { name: 'Shoes', tagline: 'Step in style', color: 'bg-green-100 text-green-800 border-green-200', slug: 'shoes' },
    { name: 'Handbags', tagline: 'Luxury collections', color: 'bg-indigo-100 text-indigo-800 border-indigo-200', slug: 'handbags' },
    { name: 'Accessories', tagline: 'Perfect finishing', color: 'bg-yellow-100 text-yellow-800 border-yellow-200', slug: 'accessories' },
    { name: 'Clothing', tagline: 'Fashion forward', color: 'bg-teal-100 text-teal-800 border-teal-200', slug: 'clothing' },
    { name: 'Kids', tagline: 'Little ones', color: 'bg-orange-100 text-orange-800 border-orange-200', slug: 'kids' },
    { name: 'Men', tagline: 'Gentleman\'s choice', color: 'bg-gray-100 text-gray-800 border-gray-200', slug: 'men' },
    { name: 'Minis', tagline: 'Travel size', color: 'bg-rose-100 text-rose-800 border-rose-200', slug: 'minis' },
    { name: 'Designer', tagline: 'Premium brands', color: 'bg-violet-100 text-violet-800 border-violet-200', slug: 'designer' }
  ];

  useEffect(() => {
    fetchCategoryCounts();
  }, []);

  const fetchCategoryCounts = async () => {
    try {
      // Get all products to count by category
      const { data: products, error } = await supabase
        .from('products')
        .select('category')
        .eq('status', 'active');

      if (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
        return;
      }

      // Count products by category
      const categoryCounts: { [key: string]: number } = {};
      products?.forEach(product => {
        const category = product.category.toLowerCase();
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      });

      // Map category config with real counts
      const categoriesWithCounts = categoryConfig.map(config => ({
        ...config,
        count: categoryCounts[config.slug] || 0
      })).filter(category => category.count > 0 || category.name === 'Sale'); // Always show Sale category

      setCategories(categoriesWithCounts);
    } catch (error) {
      console.error('Error fetching category counts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
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
          <div className="flex justify-center">
            <div className="text-gray-500">Loading categories...</div>
          </div>
        </div>
      </section>
    );
  }

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

        {categories.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No products available at the moment.</p>
            <p className="text-sm text-gray-400 mt-2">Please check back later or contact us for more information.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShopByCategory;
