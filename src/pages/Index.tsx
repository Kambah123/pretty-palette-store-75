
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProductCategories from '@/components/ProductCategories';
import ShopByCategory from '@/components/ShopByCategory';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <ProductCategories />
      <ShopByCategory />
    </div>
  );
};

export default Index;
