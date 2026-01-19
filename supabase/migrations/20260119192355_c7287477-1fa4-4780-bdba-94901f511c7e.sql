-- Add user_id column to event_media for ownership tracking
ALTER TABLE public.event_media ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Drop existing overly permissive RLS policies
DROP POLICY IF EXISTS "Authenticated users can view event media" ON public.event_media;
DROP POLICY IF EXISTS "Authenticated users can delete event media" ON public.event_media;
DROP POLICY IF EXISTS "Authenticated users can insert event media" ON public.event_media;

-- Create new RLS policies that restrict access to owner only
CREATE POLICY "Users can view own media"
ON public.event_media FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own media"
ON public.event_media FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own media"
ON public.event_media FOR DELETE
USING (auth.uid() = user_id);

CREATE POLICY "Users can update own media"
ON public.event_media FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Add file validation restrictions to storage bucket
UPDATE storage.buckets 
SET 
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/quicktime'],
  file_size_limit = 52428800
WHERE id = 'event-media';

-- Update storage policies to be user-specific (using folder structure)
DROP POLICY IF EXISTS "Authenticated users can upload files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can view files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete files" ON storage.objects;

-- Users can only upload to their own folder
CREATE POLICY "Users can upload to own folder"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'event-media' 
  AND auth.role() = 'authenticated'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Users can only view their own files
CREATE POLICY "Users can view own files"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'event-media' 
  AND auth.role() = 'authenticated'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Users can only delete their own files
CREATE POLICY "Users can delete own files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'event-media' 
  AND auth.role() = 'authenticated'
  AND (storage.foldername(name))[1] = auth.uid()::text
);