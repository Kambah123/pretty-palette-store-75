
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const PromotionalBanners = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Summer Sale Banner */}
          <div className="relative bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white overflow-hidden group hover-lift cursor-pointer">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-16 translate-x-16"></div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Summer Sale</h3>
              <p className="text-lg mb-6 opacity-90">Up to 50% off on selected items</p>
              <Button 
                variant="secondary" 
                className="bg-white text-pink-600 hover:bg-gray-100 font-semibold group-hover:scale-105 transition-transform"
              >
                Shop Sale
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* New Arrivals Banner */}
          <div className="relative bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl p-8 text-white overflow-hidden group hover-lift cursor-pointer">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-y-16 -translate-x-16"></div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">New Arrivals</h3>
              <p className="text-lg mb-6 opacity-90">Latest trends in beauty & fashion</p>
              <Button 
                variant="secondary" 
                className="bg-white text-purple-600 hover:bg-gray-100 font-semibold group-hover:scale-105 transition-transform"
              >
                Explore New
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanners;
