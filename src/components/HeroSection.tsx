
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, Users, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/lovable-uploads/3328c8a9-0f6b-41e3-ae55-c9344f828827.png)'
        }}
      ></div>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-white/80"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src="/lovable-uploads/0301ff21-6fb9-4809-bfbb-e5cc54cf2e20.png" 
              alt="SIA Collections Logo" 
              className="mx-auto h-20 w-auto mb-4"
            />
          </div>
          
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            Discover Your
            <span className="block bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Beauty & Style
            </span>
          </h1>
          
          {/* Sub-headline */}
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            From premium makeup and skincare to designer handbags and shoes. 
            Find everything you need to express your unique style.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/products">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover-lift"
              >
                Shop Now
              </Button>
            </Link>
            <Link to="/products">
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-pink-300 text-pink-600 hover:bg-pink-50 px-8 py-4 text-lg font-semibold rounded-full hover-lift transition-all duration-200"
              >
                View Collections
              </Button>
            </Link>
          </div>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-3">
                <Star className="h-6 w-6 text-white fill-current" />
              </div>
              <div className="text-2xl font-bold text-gray-900">4.9</div>
              <div className="text-sm text-gray-600">Customer Rating</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-3">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900">10K+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-3">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900">500+</div>
              <div className="text-sm text-gray-600">Products</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
