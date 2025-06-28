
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { SearchWithSuggestions } from '@/components/search/SearchWithSuggestions';
import { Filter, ArrowLeft, Grid, List } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useProducts } from '@/hooks/useProducts';
import { ProductFilters } from '@/components/product/ProductFilters';
import { ProductGrid } from '@/components/product/ProductGrid';

const Products = () => {
  const { category } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Set initial category filter if coming from URL
  useEffect(() => {
    if (category) {
      const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
      setSelectedCategories([formattedCategory]);
    }
  }, [category]);

  const { data: products = [], isLoading, error } = useProducts({
    category: category,
    searchTerm: searchTerm,
    sortBy: sortBy,
    priceRange: priceRange,
    brands: selectedBrands,
    categories: selectedCategories
  });

  // Get unique brands and categories from products
  const brands = Array.from(new Set(products.map(p => p.brand).filter(Boolean)));
  const categories = Array.from(new Set(products.map(p => p.category)));

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedBrands([]);
    setSelectedCategories([]);
    setPriceRange([0, 10000]);
  };

  if (error) {
    console.error('Products loading error:', error);
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="py-8">
          <div className="container mx-auto px-4">
            <div className="text-center py-12">
              <p className="text-red-500 text-lg">Error loading products. Please try again.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="py-4 sm:py-8">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-pink-600 hover:text-pink-700 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>

          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products` : 'All Products'}
            </h1>
            
            <div className="flex flex-col gap-4">
              <SearchWithSuggestions 
                onSearch={setSearchTerm}
                className="max-w-md"
              />
              
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="name">Name A-Z</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="sm:hidden">
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80">
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <ProductFilters
                          priceRange={priceRange}
                          setPriceRange={setPriceRange}
                          selectedBrands={selectedBrands}
                          setSelectedBrands={setSelectedBrands}
                          selectedCategories={selectedCategories}
                          setSelectedCategories={setSelectedCategories}
                          brands={brands}
                          categories={categories}
                        />
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-6 sm:gap-8">
            <div className="hidden sm:block w-64 shrink-0">
              <Card className="sticky top-4">
                <CardContent className="p-6">
                  <h2 className="font-semibold mb-4">Filters</h2>
                  <ProductFilters
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    selectedBrands={selectedBrands}
                    setSelectedBrands={setSelectedBrands}
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                    brands={brands}
                    categories={categories}
                  />
                </CardContent>
              </Card>
            </div>

            <ProductGrid
              products={products}
              isLoading={isLoading}
              onClearFilters={handleClearFilters}
            />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Products;
