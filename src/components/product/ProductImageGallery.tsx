import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { getProductImages, handleImageError } from '@/utils/imageUtils';
interface ProductImageGalleryProps {
  images: string[] | null | undefined;
  productName: string;
  productId?: string | number;
}
export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  productName,
  productId
}) => {
  const productImages = getProductImages(images, productId);
  const [currentImage, setCurrentImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const nextImage = () => {
    setCurrentImage(prev => (prev + 1) % productImages.length);
  };
  const prevImage = () => {
    setCurrentImage(prev => (prev - 1 + productImages.length) % productImages.length);
  };
  const handleImageLoadError = (index: number) => {
    console.log(`Image failed to load at index ${index}:`, productImages[index]);
    setImageErrors(prev => new Set(prev).add(index));
  };
  const getImageSrc = (index: number) => {
    if (imageErrors.has(index)) {
      return 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop';
    }
    return productImages[index];
  };
  return <div className="space-y-4">
      {/* Main Image */}
      <div className="relative group">
        <img src={getImageSrc(currentImage)} alt={`${productName} - Image ${currentImage + 1}`} className="w-full h-96 object-cover rounded-lg cursor-zoom-in" onClick={() => setIsZoomed(true)} onError={() => handleImageLoadError(currentImage)} onLoad={() => console.log(`Image loaded successfully: ${productImages[currentImage]}`)} />
        
        {/* Product Info Overlay for Placeholder */}
        
        
        {/* Zoom Icon */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="secondary" size="sm" onClick={() => setIsZoomed(true)}>
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation Arrows */}
        {productImages.length > 1 && <>
            <Button variant="secondary" size="sm" className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={prevImage}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="sm" className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={nextImage}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>}
      </div>

      {/* Thumbnail Images */}
      {productImages.length > 1 && <div className="flex space-x-2 overflow-x-auto pb-2">
          {productImages.map((image, index) => <img key={index} src={getImageSrc(index)} alt={`${productName} - Thumbnail ${index + 1}`} className={`w-20 h-20 object-cover rounded-md cursor-pointer flex-shrink-0 border-2 ${index === currentImage ? 'border-blue-500' : 'border-gray-200'}`} onClick={() => setCurrentImage(index)} onError={() => handleImageLoadError(index)} />)}
        </div>}

      {/* Zoom Modal */}
      <Dialog open={isZoomed} onOpenChange={setIsZoomed}>
        <DialogContent className="max-w-4xl max-h-screen p-0">
          <div className="relative">
            <img src={getImageSrc(currentImage)} alt={`${productName} - Zoomed`} className="w-full h-auto max-h-screen object-contain" onError={() => handleImageLoadError(currentImage)} />
            
            {productImages.length > 1 && <>
                <Button variant="secondary" size="sm" className="absolute left-4 top-1/2 transform -translate-y-1/2" onClick={prevImage}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="sm" className="absolute right-4 top-1/2 transform -translate-y-1/2" onClick={nextImage}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>}
          </div>
        </DialogContent>
      </Dialog>
    </div>;
};