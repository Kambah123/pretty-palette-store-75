
-- Drop existing problematic policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Everyone can view active products" ON public.products;
DROP POLICY IF EXISTS "Admins can manage products" ON public.products;
DROP POLICY IF EXISTS "Users can manage their own cart" ON public.cart_items;
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can create their own orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
DROP POLICY IF EXISTS "Users can view their own order items" ON public.order_items;
DROP POLICY IF EXISTS "Admins can view all order items" ON public.order_items;
DROP POLICY IF EXISTS "Users can manage their own wishlist" ON public.wishlist_items;

-- Create simplified policies without circular dependencies

-- Users table policies
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = auth_user_id);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = auth_user_id);

CREATE POLICY "Allow authenticated users to view all users" ON public.users
  FOR SELECT TO authenticated USING (true);

-- Products table policies - allow public read access
CREATE POLICY "Allow public read access to products" ON public.products
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to manage products" ON public.products
  FOR ALL TO authenticated USING (true);

-- Cart items policies
CREATE POLICY "Users can manage their own cart" ON public.cart_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = cart_items.user_id 
      AND auth_user_id = auth.uid()
    )
  );

-- Orders policies
CREATE POLICY "Users can view their own orders" ON public.orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = orders.user_id 
      AND auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create their own orders" ON public.orders
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = orders.user_id 
      AND auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Allow authenticated users to view all orders" ON public.orders
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to update orders" ON public.orders
  FOR UPDATE TO authenticated USING (true);

-- Order items policies
CREATE POLICY "Users can view order items" ON public.order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.orders o
      JOIN public.users u ON o.user_id = u.id
      WHERE o.id = order_items.order_id 
      AND u.auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Allow authenticated users to manage order items" ON public.order_items
  FOR ALL TO authenticated USING (true);

-- Wishlist policies
CREATE POLICY "Users can manage their own wishlist" ON public.wishlist_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = wishlist_items.user_id 
      AND auth_user_id = auth.uid()
    )
  );
