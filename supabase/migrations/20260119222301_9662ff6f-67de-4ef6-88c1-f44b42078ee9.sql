-- Fix RESTRICTIVE RLS policies on scheduled_posts table
-- Drop all existing RESTRICTIVE policies
DROP POLICY IF EXISTS "Users can view their own scheduled posts" ON public.scheduled_posts;
DROP POLICY IF EXISTS "Users can create their own scheduled posts" ON public.scheduled_posts;
DROP POLICY IF EXISTS "Users can update their own scheduled posts" ON public.scheduled_posts;
DROP POLICY IF EXISTS "Users can delete their own scheduled posts" ON public.scheduled_posts;
DROP POLICY IF EXISTS "Admins can view all scheduled posts" ON public.scheduled_posts;

-- Recreate as PERMISSIVE policies (OR logic) with proper role targeting
CREATE POLICY "Users can view their own scheduled posts" 
ON public.scheduled_posts AS PERMISSIVE
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own scheduled posts" 
ON public.scheduled_posts AS PERMISSIVE
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own scheduled posts" 
ON public.scheduled_posts AS PERMISSIVE
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own scheduled posts" 
ON public.scheduled_posts AS PERMISSIVE
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all scheduled posts" 
ON public.scheduled_posts AS PERMISSIVE
FOR ALL 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));