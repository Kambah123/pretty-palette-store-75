
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductImageGallery } from "@/components/product/ProductImageGallery";
import { ProductRatingSystem } from "@/components/product/ProductRatingSystem";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { ShoppingCart, Heart, Share2, Star, ArrowLeft } from "lucide-react";
import { Link } from 'react-router-dom';
import { useProduct } from '@/hooks/useProducts';

// Mock reviews data
const mockReviews = [
  {
    id: 1,
    author: "John D.",
    rating: 5,
    title: "Excellent sound quality!",
    content: "These headphones exceeded my expectations. The noise cancellation is fantastic and the battery life is incredible. Highly recommend!",
    date: "2024-01-15",
    verified: true,
    helpful: 12,
    unhelpful: 1,
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop"]
  },
  {
    id: 2,
    author: "Sarah M.",
    rating: 4,
    title: "Great headphones, minor comfort issue",
    content: "Sound quality is amazing and the build quality feels premium. Only issue is they can get a bit uncomfortable after 3-4 hours of continuous use.",
    date: "2024-01-10",
    verified: true,
    helpful: 8,
    unhelpful: 0
  },
  {
    id: 3,
    author: "Mike R.",
    rating: 5,
    title: "Perfect for travel",
    content: "The noise cancellation makes flights so much more enjoyable. Battery lasts for my entire overseas trips. Worth every penny!",
    date: "2024-01-05",
    verified: false,
    helpful: 15,
    unhelpful: 2
  }
];

const mockRatingDistribution = {
  5: 620,
  4: 287,
  3: 189,
  2: 98,
  1: 53
};

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useProduct(id || '');
  const [quantity, setQuantity] = useState<number>(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = () => {
    console.log(`Adding ${quantity} items to cart`);
    // In a real app, this would add to cart state/API
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    console.log('Wishlist toggled');
  };

  const renderStars = (rating: number = 4.5) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? 'fill-yellow-400 text-yellow-400' 
            : i < rating 
            ? 'fill-yellow-400/50 text-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-gray-50 py-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link to="/" className="hover:text-pink-600">Home</Link>
              <span>/</span>
              <Link to="/products" className="hover:text-pink-600">Products</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">Loading...</span>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            <div className="animate-pulse">
              <div className="bg-gray-300 h-96 rounded-lg mb-4"></div>
              <div className="flex space-x-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-gray-300 w-20 h-20 rounded-md"></div>
                ))}
              </div>
            </div>
            <div className="animate-pulse space-y-6">
              <div className="bg-gray-300 h-8 rounded w-3/4"></div>
              <div className="bg-gray-300 h-12 rounded w-full"></div>
              <div className="bg-gray-300 h-4 rounded w-1/2"></div>
              <div className="bg-gray-300 h-20 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link to="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isInStock = product.stock_quantity && product.stock_quantity > 0;
  const maxQuantity: number = Number(product.stock_quantity) || 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-pink-600">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-pink-600">Products</Link>
            <span>/</span>
            <span>{product.category}</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link to="/products" className="inline-flex items-center text-pink-600 hover:text-pink-700 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Product Images */}
          <div>
            <ProductImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">{product.category}</Badge>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-4">by {product.brand || 'SIA Collections'}</p>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex">{renderStars(4.5)}</div>
                <span className="text-sm text-gray-600">
                  4.5 (25 reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-2xl lg:text-3xl font-bold text-gray-900">
                  ৳{product.price}
                </span>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {isInStock ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-green-600 font-medium">In Stock</span>
                    <span className="text-gray-500">({product.stock_quantity} available)</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-700 leading-relaxed mb-6">
                {product.description || 'Premium quality product from SIA Collections.'}
              </p>

              {/* Quantity and Actions */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="font-medium">Quantity:</label>
                  <div className="flex items-center border rounded-md">
                    <button 
                      className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x min-w-[60px] text-center">{quantity}</span>
                    <button 
                      className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50"
                      onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
                      disabled={quantity >= maxQuantity}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <Button 
                    className="flex-1" 
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={!isInStock}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={handleWishlist}
                  >
                    <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button variant="outline" size="lg">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description || 'Premium quality product from SIA Collections with excellent craftsmanship and attention to detail.'}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="specifications">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Product Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Brand:</span>
                    <span className="text-gray-600">{product.brand || 'SIA Collections'}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Category:</span>
                    <span className="text-gray-600">{product.category}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Stock:</span>
                    <span className="text-gray-600">{product.stock_quantity} units</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Status:</span>
                    <span className="text-gray-600">{product.status}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="shipping">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Shipping & Returns</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Shipping Options</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Standard Shipping (5-7 business days): Free</li>
                      <li>• Express Shipping (2-3 business days): ৳99</li>
                      <li>• Same Day Delivery (Dhaka only): ৳199</li>
                    </ul>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-2">Return Policy</h4>
                    <p className="text-gray-600">
                      7-day return policy. Items must be in original condition with all packaging.
                      Return shipping is free for defective items.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Enhanced Reviews Section */}
        <ProductRatingSystem 
          productId={product.id}
          averageRating={4.5}
          totalReviews={25}
          reviews={mockReviews}
          ratingDistribution={mockRatingDistribution}
        />

        {/* Related Products */}
        <div className="mt-12">
          <RelatedProducts currentProductId={product.id} category={product.category} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
