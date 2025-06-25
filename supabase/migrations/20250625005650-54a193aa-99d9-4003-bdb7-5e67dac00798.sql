
-- First, let's find the user and update their role to admin
UPDATE public.users 
SET user_role = 'admin' 
WHERE email = 'muserskamber@gmail.com';

-- If the user doesn't exist in the users table yet, we'll need to insert them
-- This will only insert if they don't already exist
INSERT INTO public.users (email, user_role, first_name, last_name)
SELECT 'muserskamber@gmail.com', 'admin', 'Admin', 'User'
WHERE NOT EXISTS (
    SELECT 1 FROM public.users WHERE email = 'muserskamber@gmail.com'
);
