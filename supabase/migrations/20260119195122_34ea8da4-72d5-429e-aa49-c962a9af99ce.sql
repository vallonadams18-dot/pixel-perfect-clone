-- Fix restrictive policies by recreating them as PERMISSIVE
-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can delete own media" ON public.event_media;
DROP POLICY IF EXISTS "Users can insert own media" ON public.event_media;
DROP POLICY IF EXISTS "Users can update own media" ON public.event_media;
DROP POLICY IF EXISTS "Users can view own media" ON public.event_media;

-- Recreate as PERMISSIVE policies (default, allows OR logic)
CREATE POLICY "Users can view own media"
ON public.event_media
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own media"
ON public.event_media
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own media"
ON public.event_media
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own media"
ON public.event_media
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);