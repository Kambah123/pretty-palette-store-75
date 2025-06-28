
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Palette, Sparkles, ShoppingBag, Footprints } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCategories = () => {
  const categories = [
    {
      title: 'Makeup Kits',
      price: 'From ৳2000',
      icon: Palette,
      gradient: 'from-pink-400 to-pink-600',
      bgColor: 'bg-pink-50',
      iconColor: 'text-pink-600',
      image: '/images/category-makeup.jpg',
      isHotSale: true,
      linkTo: '/makeup'
    },
    {
      title: 'Skincare',
      price: 'From ৳1500',
      icon: Sparkles,
      gradient: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      image: '/images/category-skincare.jpg',
      isHotSale: false,
      linkTo: '/skincare'
    },
    {
      title: 'Designer Bags',
      price: 'From ৳5000',
      icon: ShoppingBag,
      gradient: 'from-pink-500 to-purple-500',
      bgColor: 'bg-gradient-to-br from-pink-50 to-purple-50',
      iconColor: 'text-pink-600',
      image: '/images/category-handbags.jpg',
      isHotSale: false,
      linkTo: '/products?category=handbags'
    },
    {
      title: 'Shoes',
      price: 'From ৳3000',
      icon: Footprints,
      gradient: 'from-purple-500 to-pink-500',
      bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50',
      iconColor: 'text-purple-600',
      image: '/images/category-shoes.png',
      isHotSale: false,
      linkTo: '/products?category=shoes'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular product categories with premium quality and unbeatable prices.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.title}
              to={category.linkTo}
            >
              <Card 
                className={`${category.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift cursor-pointer group animate-fade-in relative overflow-hidden`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {category.isHotSale && (
                  <Link 
                    to="/products?sale=true"
                    className="absolute top-3 right-3 z-10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Badge className="bg-red-500 hover:bg-red-600 text-white transition-colors cursor-pointer">
                      Hot Sale
                    </Badge>
                  </Link>
                )}
                
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-32 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-200"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${category.gradient} mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                    {category.title}
                  </h3>
                  
                  <p className={`text-lg font-medium ${category.iconColor}`}>
                    {category.price}
                  </p>
                  
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="text-sm text-gray-600 hover:text-pink-600 font-medium cursor-pointer">
                      Shop Now →
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

export default ProductCategories;
