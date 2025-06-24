
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    brand: string;
    images: string[];
  };
}

interface CartContextType {
  cartItems: CartItem[];
  cartItemCount: number;
  loading: boolean;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user, userProfile } = useAuth();

  const fetchCartItems = async () => {
    if (!user || !userProfile) {
      setCartItems([]);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          id,
          product_id,
          quantity,
          products!inner (
            id,
            name,
            price,
            brand,
            images
          )
        `)
        .eq('user_id', userProfile.id);

      if (error) {
        console.error('Error fetching cart items:', error);
        toast.error('Failed to load cart items');
        return;
      }

      const formattedItems = data?.map(item => ({
        id: item.id,
        product_id: item.product_id,
        quantity: item.quantity,
        product: {
          id: item.products.id,
          name: item.products.name,
          price: item.products.price,
          brand: item.products.brand,
          images: item.products.images || []
        }
      })) || [];

      setCartItems(formattedItems);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      toast.error('Failed to load cart items');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity: number = 1) => {
    if (!user || !userProfile) {
      toast.error('Please log in to add items to cart');
      return;
    }

    try {
      // Check if item already exists in cart
      const existingItem = cartItems.find(item => item.product_id === productId);
      
      if (existingItem) {
        // Update quantity
        await updateQuantity(productId, existingItem.quantity + quantity);
        return;
      }

      // Add new item to cart
      const { error } = await supabase
        .from('cart_items')
        .insert({
          user_id: userProfile.id,
          product_id: productId,
          quantity
        });

      if (error) {
        console.error('Error adding to cart:', error);
        toast.error('Failed to add item to cart');
        return;
      }

      toast.success('Item added to cart');
      await fetchCartItems();
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!user || !userProfile) return;

    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('user_id', userProfile.id)
        .eq('product_id', productId);

      if (error) {
        console.error('Error updating cart item:', error);
        toast.error('Failed to update item quantity');
        return;
      }

      await fetchCartItems();
    } catch (error) {
      console.error('Error updating cart item:', error);
      toast.error('Failed to update item quantity');
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!user || !userProfile) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userProfile.id)
        .eq('product_id', productId);

      if (error) {
        console.error('Error removing from cart:', error);
        toast.error('Failed to remove item from cart');
        return;
      }

      toast.success('Item removed from cart');
      await fetchCartItems();
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove item from cart');
    }
  };

  const clearCart = async () => {
    if (!user || !userProfile) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userProfile.id);

      if (error) {
        console.error('Error clearing cart:', error);
        toast.error('Failed to clear cart');
        return;
      }

      setCartItems([]);
      toast.success('Cart cleared');
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    }
  };

  const refreshCart = async () => {
    await fetchCartItems();
  };

  useEffect(() => {
    if (user && userProfile) {
      fetchCartItems();
    } else {
      setCartItems([]);
    }
  }, [user, userProfile]);

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const value = {
    cartItems,
    cartItemCount,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    refreshCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
