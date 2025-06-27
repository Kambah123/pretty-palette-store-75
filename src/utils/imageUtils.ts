
// Placeholder images for when products don't have images
const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1649972904349-6e44c42644a7', // woman with laptop
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b', // gray laptop
  'https://images.unsplash.com/photo-1518770660439-4636190af475', // circuit board
];

export const getProductImages = (images: string[] | null | undefined): string[] => {
  if (!images || images.length === 0) {
    return [PLACEHOLDER_IMAGES[0]];
  }
  
  return images.filter(img => img && img.trim() !== '');
};

export const getProductImage = (images: string[] | null | undefined, index = 0): string => {
  const productImages = getProductImages(images);
  return productImages[index] || productImages[0] || PLACEHOLDER_IMAGES[0];
};

export const getRandomPlaceholder = (): string => {
  const randomIndex = Math.floor(Math.random() * PLACEHOLDER_IMAGES.length);
  return PLACEHOLDER_IMAGES[randomIndex];
};

export const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const img = event.currentTarget;
  img.src = getRandomPlaceholder();
};
