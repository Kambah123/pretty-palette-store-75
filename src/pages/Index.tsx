
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProductCategories from '@/components/ProductCategories';
import PromotionalBanners from '@/components/PromotionalBanners';
import FeaturedProducts from '@/components/FeaturedProducts';
import ShopByCategory from '@/components/ShopByCategory';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <ProductCategories />
      <PromotionalBanners />
      <FeaturedProducts />
      <ShopByCategory />
      <Footer />
    </div>
  );
};

export default Index;
