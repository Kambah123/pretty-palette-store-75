
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useProducts = (filters?: {
  category?: string;
  searchTerm?: string;
  sortBy?: string;
  priceRange?: [number, number];
  brands?: string[];
  categories?: string[];
}) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select('*')
        .eq('status', 'active');

      // Apply filters
      if (filters?.category) {
        query = query.eq('category', filters.category);
      }

      if (filters?.searchTerm) {
        query = query.or(`name.ilike.%${filters.searchTerm}%,description.ilike.%${filters.searchTerm}%,brand.ilike.%${filters.searchTerm}%`);
      }

      if (filters?.categories && filters.categories.length > 0) {
        query = query.in('category', filters.categories);
      }

      if (filters?.brands && filters.brands.length > 0) {
        query = query.in('brand', filters.brands);
      }

      if (filters?.priceRange) {
        query = query.gte('price', filters.priceRange[0]).lte('price', filters.priceRange[1]);
      }

      // Apply sorting
      switch (filters?.sortBy) {
        case 'price-low':
          query = query.order('price', { ascending: true });
          break;
        case 'price-high':
          query = query.order('price', { ascending: false });
          break;
        case 'name':
          query = query.order('name', { ascending: true });
          break;
        default:
          query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return data || [];
    }
  });
};

export const useFeaturedProducts = (limit = 6) => {
  return useQuery({
    queryKey: ['featured-products', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      return data || [];
    }
  });
};

export const useRelatedProducts = (category: string, currentProductId: string, limit = 4) => {
  return useQuery({
    queryKey: ['related-products', category, currentProductId, limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .eq('status', 'active')
        .neq('id', currentProductId)
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!category && !!currentProductId
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id
  });
};
