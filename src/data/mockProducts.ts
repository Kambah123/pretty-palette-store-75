
export interface MockProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  images: string[];
  stock_quantity: number;
  status: string;
  created_at: string;
}

export const generateMockProducts = (): MockProduct[] => {
  const products: MockProduct[] = [];
  
  // Makeup products (1-45)
  for (let i = 1; i <= 45; i++) {
    const imageNumber = i.toString().padStart(4, '0');
    products.push({
      id: i,
      name: `Premium Makeup Product ${i}`,
      description: `High-quality makeup product with premium ingredients and long-lasting formula. Perfect for daily use or special occasions.`,
      price: 1200 + Math.floor(Math.random() * 2800),
      category: 'makeup',
      brand: 'Pretty Palette',
      images: [`/images/product_${imageNumber}.jpg`],
      stock_quantity: Math.floor(Math.random() * 50) + 10,
      status: 'active',
      created_at: new Date().toISOString()
    });
  }
  
  // Skincare products (46-115)
  for (let i = 46; i <= 115; i++) {
    const imageNumber = i.toString().padStart(4, '0');
    products.push({
      id: i,
      name: `Premium Skincare Product ${i}`,
      description: `Nourishing skincare product formulated with natural ingredients to enhance your skin's natural beauty and health.`,
      price: 1500 + Math.floor(Math.random() * 3500),
      category: 'skincare',
      brand: 'Pretty Palette',
      images: [`/images/product_${imageNumber}.jpg`],
      stock_quantity: Math.floor(Math.random() * 50) + 10,
      status: 'active',
      created_at: new Date().toISOString()
    });
  }
  
  return products;
};

export const mockProducts = generateMockProducts();
