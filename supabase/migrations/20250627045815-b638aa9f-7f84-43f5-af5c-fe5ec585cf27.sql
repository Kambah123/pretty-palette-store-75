
-- Enable RLS on products table and create policies for public access and admin management
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active products (for customers browsing)
CREATE POLICY "Allow public read access to active products"
ON public.products
FOR SELECT
USING (status = 'active');

-- Allow authenticated users to read all products (for admin panel)
CREATE POLICY "Allow authenticated users to read all products"
ON public.products
FOR SELECT
TO authenticated
USING (true);

-- Allow authenticated users to insert products (for admin)
CREATE POLICY "Allow authenticated users to insert products"
ON public.products
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to update products (for admin)
CREATE POLICY "Allow authenticated users to update products"
ON public.products
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow authenticated users to delete products (for admin)
CREATE POLICY "Allow authenticated users to delete products"
ON public.products
FOR DELETE
TO authenticated
USING (true);
