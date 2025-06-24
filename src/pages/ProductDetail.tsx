
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductImageGallery } from "@/components/product/ProductImageGallery";
import { ProductReviews } from "@/components/product/ProductReviews";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { ShoppingCart, Heart, Share2, Star } from "lucide-react";

// Mock product data
const mockProduct = {
  id: 1,
  name: "Premium Wireless Headphones",
  price: 299.99,
  originalPrice: 399.99,
  rating: 4.5,
  reviewCount: 1247,
  category: "Electronics",
  brand: "TechSound",
  inStock: true,
  stockCount: 15,
  images: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop"
  ],
  description: "Experience premium audio quality with our flagship wireless headphones. Featuring advanced noise cancellation, premium materials, and exceptional comfort for all-day listening.",
  features: [
    "Active Noise Cancellation",
    "40-hour battery life",
    "Premium leather ear cushions",
    "Bluetooth 5.2 connectivity",
    "Quick charge: 5 min = 3 hours playback",
    "Multi-device pairing",
    "Voice assistant integration"
  ],
  specifications: {
    "Driver Size": "40mm",
    "Frequency Response": "20Hz - 20kHz",
    "Impedance": "32 ohms",
    "Weight": "290g",
    "Connectivity": "Bluetooth 5.2, 3.5mm jack",
    "Battery Life": "40 hours (ANC off), 30 hours (ANC on)",
    "Charging Time": "2.5 hours",
    "Warranty": "2 years"
  }
};

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = () => {
    console.log(`Adding ${quantity} items to cart`);
    // In a real app, this would add to cart state/API
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    console.log('Wishlist toggled');
  };

  const renderStars = (rating: number) => {
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

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-gray-600">
            <span>Home</span> / <span>Electronics</span> / <span>Headphones</span> / 
            <span className="text-gray-900 font-medium"> {mockProduct.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div>
            <ProductImageGallery images={mockProduct.images} productName={mockProduct.name} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">{mockProduct.category}</Badge>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{mockProduct.name}</h1>
              <p className="text-gray-600 mb-4">by {mockProduct.brand}</p>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex">{renderStars(mockProduct.rating)}</div>
                <span className="text-sm text-gray-600">
                  {mockProduct.rating} ({mockProduct.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  ${mockProduct.price}
                </span>
                {mockProduct.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ${mockProduct.originalPrice}
                  </span>
                )}
                {mockProduct.originalPrice && (
                  <Badge variant="destructive">
                    Save ${(mockProduct.originalPrice - mockProduct.price).toFixed(2)}
                  </Badge>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {mockProduct.inStock ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-green-600 font-medium">In Stock</span>
                    <span className="text-gray-500">({mockProduct.stockCount} available)</span>
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
                {mockProduct.description}
              </p>

              {/* Quantity and Actions */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="font-medium">Quantity:</label>
                  <div className="flex items-center border rounded-md">
                    <button 
                      className="px-3 py-2 hover:bg-gray-100"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x">{quantity}</span>
                    <button 
                      className="px-3 py-2 hover:bg-gray-100"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button 
                    className="flex-1" 
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={!mockProduct.inStock}
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
        <Tabs defaultValue="features" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          </TabsList>
          
          <TabsContent value="features">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {mockProduct.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="specifications">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(mockProduct.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-2 border-b">
                      <span className="font-medium">{key}:</span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  ))}
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
                      <li>• Express Shipping (2-3 business days): $9.99</li>
                      <li>• Next Day Delivery: $19.99</li>
                    </ul>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-2">Return Policy</h4>
                    <p className="text-gray-600">
                      30-day return policy. Items must be in original condition with all packaging.
                      Return shipping is free for defective items.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Reviews Section */}
        <ProductReviews productId={mockProduct.id} />

        {/* Related Products */}
        <RelatedProducts currentProductId={mockProduct.id} category={mockProduct.category} />
      </div>
    </div>
  );
};

export default ProductDetail;
