
// Generate local image URLs for products
const generateLocalImageUrls = (count: number = 115): string[] => {
  const urls = [];
  for (let i = 1; i <= count; i++) {
    const imageNumber = i.toString().padStart(4, '0');
    urls.push(`/images/product_${imageNumber}.jpg`);
  }
  return urls;
};

// Get images from window.imageUrls or generate fallback
const getImageUrls = (): string[] => {
  if (typeof window !== 'undefined' && window.imageUrls && window.imageUrls.length > 0) {
    return window.imageUrls;
  }
  // Fallback to generating local URLs
  return generateLocalImageUrls();
};

// Placeholder images for when products don't have images
const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1649972904349-6e44c42644a7', // woman with laptop
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b', // gray laptop
  'https://images.unsplash.com/photo-1518770660439-4636190af475', // circuit board
];

// Get images for a specific product based on its ID or index
export const getProductImages = (images: string[] | null | undefined, productId?: string | number): string[] => {
  // If product has specific images, use them
  if (images && images.length > 0) {
    const filteredImages = images.filter(img => img && img.trim() !== '');
    if (filteredImages.length > 0) {
      return filteredImages;
    }
  }
  
  // Use local images from GitHub repository
  const localImages = getImageUrls();
  
  if (productId) {
    const numericId = typeof productId === 'string' ? parseInt(productId) : productId;
    
    if (numericId && numericId <= localImages.length) {
      // Use the corresponding image for this product ID
      const productImage = localImages[numericId - 1];
      return [productImage];
    }
    
    // If ID is out of range, use a random selection
    const randomIndex = Math.floor(Math.random() * localImages.length);
    return [localImages[randomIndex]];
  }
  
  // Fallback to first local image or placeholder
  return localImages.length > 0 ? [localImages[0]] : [PLACEHOLDER_IMAGES[0]];
};

export const getProductImage = (images: string[] | null | undefined, productId?: string | number, index = 0): string => {
  const productImages = getProductImages(images, productId);
  return productImages[index] || productImages[0] || PLACEHOLDER_IMAGES[0];
};

export const getRandomPlaceholder = (): string => {
  const randomIndex = Math.floor(Math.random() * PLACEHOLDER_IMAGES.length);
  return PLACEHOLDER_IMAGES[randomIndex];
};

export const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const img = event.currentTarget;
  if (!img.src.includes('unsplash.com')) {
    // If local image fails, try placeholder
    img.src = getRandomPlaceholder();
  }
};
