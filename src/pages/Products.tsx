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

const Products = () => {
  const { category } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState([0, 10000]);
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
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
      featured: true,
      inStock: true,
      description: 'Complete professional makeup kit with premium brushes and high-quality cosmetics.'
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
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
      featured: false,
      inStock: true,
      description: 'Brightening vitamin C serum and moisturizer for radiant skin.'
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
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop',
      featured: true,
      inStock: true,
      description: 'Luxury leather handbag with elegant design and premium finish.'
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
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
      featured: false,
      inStock: false,
      description: 'Comfortable and stylish footwear collection for all occasions.'
    },
    {
      id: 5,
      name: 'Gold Jewelry Set',
      brand: 'SIA Accessories',
      category: 'Accessories',
      price: 8900,
      originalPrice: 11000,
      rating: 4.9,
      reviews: 92,
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop',
      featured: true,
      inStock: true,
      description: 'Elegant gold-plated jewelry set perfect for special occasions.'
    },
    {
      id: 6,
      name: 'Summer Dress Collection',
      brand: 'SIA Fashion',
      category: 'Clothing',
      price: 3800,
      originalPrice: 4500,
      rating: 4.5,
      reviews: 67,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop',
      featured: false,
      inStock: true,
      description: 'Stylish and comfortable summer dresses for every occasion.'
    }
  ];

  const brands = ['SIA Beauty', 'SIA Skincare', 'SIA Fashion', 'SIA Shoes', 'SIA Accessories'];
  const categories = ['Makeup', 'Skincare', 'Handbags', 'Shoes', 'Accessories', 'Clothing'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    
    return matchesSearch && matchesPrice && matchesBrand && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'popularity':
        return b.reviews - a.reviews;
      case 'name':
        return a.name.localeCompare(b.name);
      default: // newest
        return b.id - a.id;
    }
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
    </div>
  );

  const ProductCard = ({ product }: { product: typeof products[0] }) => (
    <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
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
            className="absolute top-2 right-2 bg-white shadow-md hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
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
          
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="font-semibold text-pink-600">৳{product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-gray-400 line-through ml-2">
                  ৳{product.originalPrice}
                </span>
              )}
            </div>
            {product.originalPrice > product.price && (
              <Badge variant="destructive" className="text-xs">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </Badge>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              className="flex-1 bg-pink-600 hover:bg-pink-700"
              disabled={!product.inStock}
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

  const ProductListItem = ({ product }: { product: typeof products[0] }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex space-x-4">
          <div className="relative flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-24 h-24 object-cover rounded"
            />
            {!product.inStock && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
                <span className="text-white text-xs font-semibold">Out of Stock</span>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-500">{product.brand}</p>
                <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
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
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>
              
              <div className="text-right ml-4">
                <div className="mb-2">
                  <span className="font-semibold text-pink-600 text-lg">৳{product.price}</span>
                  {product.originalPrice > product.price && (
                    <div>
                      <span className="text-sm text-gray-400 line-through">
                        ৳{product.originalPrice}
                      </span>
                      <Badge variant="destructive" className="text-xs ml-2">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    className="bg-pink-600 hover:bg-pink-700"
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add to Cart
                  </Button>
                  <Link to={`/product/${product.id}`}>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

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
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="popularity">Most Popular</SelectItem>
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
                Showing {sortedProducts.length} of {products.length} products
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              {sortedProducts.length === 0 && (
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
