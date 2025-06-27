
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { SearchWithSuggestions } from '@/components/search/SearchWithSuggestions';
import { Filter, Star, Heart, ShoppingCart, ArrowLeft, Grid, List } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useProducts } from '@/hooks/useProducts';
import { getProductImage, handleImageError } from '@/utils/imageUtils';

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

  const { data: products = [], isLoading } = useProducts({
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

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="space-y-2">
          <div className="flex space-x-2">
            <Input
              type="number"
              placeholder="Min"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
              className="text-sm"
            />
            <Input
              type="number"
              placeholder="Max"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 10000])}
              className="text-sm"
            />
          </div>
          <div className="text-xs text-gray-500">
            ৳{priceRange[0]} - ৳{priceRange[1]}
          </div>
        </div>
      </div>

      {brands.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3">Brands</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={brand}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedBrands([...selectedBrands, brand]);
                    } else {
                      setSelectedBrands(selectedBrands.filter(b => b !== brand));
                    }
                  }}
                />
                <Label htmlFor={brand} className="text-sm cursor-pointer">
                  {brand}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {categories.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3">Categories</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {categories.map((cat) => (
              <div key={cat} className="flex items-center space-x-2">
                <Checkbox
                  id={cat}
                  checked={selectedCategories.includes(cat)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedCategories([...selectedCategories, cat]);
                    } else {
                      setSelectedCategories(selectedCategories.filter(c => c !== cat));
                    }
                  }}
                />
                <Label htmlFor={cat} className="text-sm cursor-pointer">
                  {cat}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const ProductCard = ({ product }: { product: any }) => (
    <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={getProductImage(product.images)}
            alt={product.name}
            className="w-full h-48 object-cover rounded-t-lg"
            loading="lazy"
            onError={handleImageError}
          />
          <Badge className="absolute top-2 left-2 bg-pink-600">
            {product.category}
          </Badge>
          {product.stock_quantity === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-t-lg">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white shadow-md hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="p-4">
          <p className="text-sm text-gray-500 mb-1">{product.brand || 'SIA Collections'}</p>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {product.name}
          </h3>
          
          <div className="flex items-center space-x-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">
              4.5 (25)
            </span>
          </div>
          
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="font-semibold text-pink-600">৳{product.price}</span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              className="flex-1 bg-pink-600 hover:bg-pink-700"
              disabled={product.stock_quantity === 0}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add to Cart
            </Button>
            <Link to={`/product/${product.id}`}>
              <Button size="sm" variant="outline" className="px-3">
                View
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="py-4 sm:py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {Array.from({ length: 9 }).map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <CardContent className="p-0">
                    <div className="bg-gray-300 h-48 rounded-t-lg"></div>
                    <div className="p-4 space-y-3">
                      <div className="bg-gray-300 h-4 rounded w-3/4"></div>
                      <div className="bg-gray-300 h-6 rounded w-full"></div>
                      <div className="bg-gray-300 h-4 rounded w-1/2"></div>
                      <div className="bg-gray-300 h-8 rounded w-full"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
                        <FilterContent />
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
                  <FilterContent />
                </CardContent>
              </Card>
            </div>

            <div className="flex-1">
              <div className="mb-4 text-sm text-gray-600">
                Showing {products.length} products
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              {products.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedBrands([]);
                      setSelectedCategories([]);
                      setPriceRange([0, 10000]);
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Products;
