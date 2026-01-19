-- Create storage bucket for Instagram images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('instagram-images', 'instagram-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload their own images
CREATE POLICY "Users can upload instagram images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'instagram-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow authenticated users to view their own images
CREATE POLICY "Users can view own instagram images"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'instagram-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow public access to instagram images (needed for Instagram API to fetch them)
CREATE POLICY "Public can view instagram images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'instagram-images');

-- Allow users to delete their own images
CREATE POLICY "Users can delete own instagram images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'instagram-images' AND auth.uid()::text = (storage.foldername(name))[1]);