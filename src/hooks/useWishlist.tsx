
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface WishlistItem {
  id: string;
  product_id: string;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  loading: boolean;
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  refreshWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user, userProfile } = useAuth();

  const fetchWishlistItems = async () => {
    if (!user || !userProfile) {
      setWishlistItems([]);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('wishlist_items')
        .select('id, product_id')
        .eq('user_id', userProfile.id);

      if (error) {
        console.error('Error fetching wishlist items:', error);
        return;
      }

      setWishlistItems(data || []);
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (productId: string) => {
    if (!user || !userProfile) {
      toast.error('Please log in to add items to wishlist');
      return;
    }

    if (isInWishlist(productId)) {
      toast.info('Item is already in your wishlist');
      return;
    }

    try {
      const { error } = await supabase
        .from('wishlist_items')
        .insert({
          user_id: userProfile.id,
          product_id: productId
        });

      if (error) {
        console.error('Error adding to wishlist:', error);
        toast.error('Failed to add item to wishlist');
        return;
      }

      toast.success('Item added to wishlist');
      await fetchWishlistItems();
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast.error('Failed to add item to wishlist');
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (!user || !userProfile) return;

    try {
      const { error } = await supabase
        .from('wishlist_items')
        .delete()
        .eq('user_id', userProfile.id)
        .eq('product_id', productId);

      if (error) {
        console.error('Error removing from wishlist:', error);
        toast.error('Failed to remove item from wishlist');
        return;
      }

      toast.success('Item removed from wishlist');
      await fetchWishlistItems();
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast.error('Failed to remove item from wishlist');
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.product_id === productId);
  };

  const refreshWishlist = async () => {
    await fetchWishlistItems();
  };

  useEffect(() => {
    if (user && userProfile) {
      fetchWishlistItems();
    } else {
      setWishlistItems([]);
    }
  }, [user, userProfile]);

  const value = {
    wishlistItems,
    loading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    refreshWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
