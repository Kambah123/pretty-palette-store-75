
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Filter, Search, Star, Heart, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const products = [
    {
      id: 1,
      name: 'Professional Makeup Kit Set',
      brand: 'SIA Beauty',
      category: 'Makeup',
      price: 4500,
      originalPrice: 5500,
      rating: 4.8,
      reviews: 124,
      image: '/placeholder.svg',
      featured: true,
      inStock: true
    },
    {
      id: 2,
      name: 'Vitamin C Skin Care Set',
      brand: 'SIA Skincare',
      category: 'Skincare',
      price: 3200,
      originalPrice: 4000,
      rating: 4.9,
      reviews: 89,
      image: '/placeholder.svg',
      featured: false,
      inStock: true
    },
    {
      id: 3,
      name: 'Designer Handbag Collection',
      brand: 'SIA Fashion',
      category: 'Handbags',
      price: 7500,
      originalPrice: 9000,
      rating: 4.7,
      reviews: 56,
      image: '/placeholder.svg',
      featured: true,
      inStock: true
    },
    {
      id: 4,
      name: 'Premium Footwear Set',
      brand: 'SIA Shoes',
      category: 'Shoes',
      price: 5200,
      originalPrice: 6500,
      rating: 4.6,
      reviews: 73,
      image: '/placeholder.svg',
      featured: false,
      inStock: false
    }
  ];

  const brands = ['SIA Beauty', 'SIA Skincare', 'SIA Fashion', 'SIA Shoes'];
  const categories = ['Makeup', 'Skincare', 'Handbags', 'Shoes', 'Accessories'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    
    return matchesSearch && matchesPrice && matchesBrand && matchesCategory;
  });

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
            />
            <Input
              type="number"
              placeholder="Max"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 10000])}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Brands</h3>
        <div className="space-y-2">
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
              <Label htmlFor={brand} className="text-sm">{brand}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCategories([...selectedCategories, category]);
                  } else {
                    setSelectedCategories(selectedCategories.filter(c => c !== category));
                  }
                }}
              />
              <Label htmlFor={category} className="text-sm">{category}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center text-pink-600 hover:text-pink-700 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">All Products</h1>
          
          {/* Search and Sort */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="popularity">Most Popular</SelectItem>
                </SelectContent>
              </Select>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <div className="hidden md:block w-64 shrink-0">
            <Card>
              <CardContent className="p-6">
                <h2 className="font-semibold mb-4">Filters</h2>
                <FilterContent />
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-4 text-sm text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      {product.featured && (
                        <Badge className="absolute top-2 left-2 bg-pink-600">
                          Featured
                        </Badge>
                      )}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-t-lg">
                          <span className="text-white font-semibold">Out of Stock</span>
                        </div>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-white shadow-md hover:bg-gray-100"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="p-4">
                      <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center space-x-1 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(product.rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-semibold text-pink-600">৳{product.price}</span>
                          {product.originalPrice > product.price && (
                            <span className="text-sm text-gray-400 line-through ml-2">
                              ৳{product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 mt-3">
                        <Button 
                          size="sm" 
                          className="flex-1 bg-pink-600 hover:bg-pink-700"
                          disabled={!product.inStock}
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Add to Cart
                        </Button>
                        <Button size="sm" variant="outline">
                          Quick View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
