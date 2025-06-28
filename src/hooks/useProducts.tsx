
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { mockProducts, MockProduct } from "@/data/mockProducts";

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
      try {
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
      } catch (error) {
        console.log('Using mock data due to database connection issue');
        // Fallback to mock data
        let filteredProducts = [...mockProducts];
        
        if (filters?.category) {
          filteredProducts = filteredProducts.filter(p => p.category === filters.category);
        }
        
        if (filters?.searchTerm) {
          const searchLower = filters.searchTerm.toLowerCase();
          filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(searchLower) ||
            p.description.toLowerCase().includes(searchLower) ||
            p.brand.toLowerCase().includes(searchLower)
          );
        }
        
        if (filters?.categories && filters.categories.length > 0) {
          filteredProducts = filteredProducts.filter(p => filters.categories!.includes(p.category));
        }
        
        if (filters?.brands && filters.brands.length > 0) {
          filteredProducts = filteredProducts.filter(p => filters.brands!.includes(p.brand));
        }
        
        if (filters?.priceRange) {
          filteredProducts = filteredProducts.filter(p => 
            p.price >= filters.priceRange![0] && p.price <= filters.priceRange![1]
          );
        }
        
        // Apply sorting
        switch (filters?.sortBy) {
          case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
          case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
          case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        }
        
        return filteredProducts;
      }
    }
  });
};

export const useFeaturedProducts = (limit = 6) => {
  return useQuery({
    queryKey: ['featured-products', limit],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('status', 'active')
          .order('created_at', { ascending: false })
          .limit(limit);
        
        if (error) throw error;
        return data || [];
      } catch (error) {
        console.log('Using mock data for featured products');
        return mockProducts.slice(0, limit);
      }
    }
  });
};

export const useRelatedProducts = (category: string, currentProductId: string, limit = 4) => {
  return useQuery({
    queryKey: ['related-products', category, currentProductId, limit],
    queryFn: async () => {
      try {
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
      } catch (error) {
        console.log('Using mock data for related products');
        return mockProducts
          .filter(p => p.category === category && p.id.toString() !== currentProductId)
          .slice(0, limit);
      }
    },
    enabled: !!category && !!currentProductId
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        return data;
      } catch (error) {
        console.log('Using mock data for single product');
        return mockProducts.find(p => p.id.toString() === id) || null;
      }
    },
    enabled: !!id
  });
};
