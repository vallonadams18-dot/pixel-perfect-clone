-- Create storage policies for authenticated users to manage their event media

-- Policy to allow authenticated users to upload files to event-media bucket
CREATE POLICY "Authenticated users can upload files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'event-media' AND auth.role() = 'authenticated');

-- Policy to allow authenticated users to view files in event-media bucket
CREATE POLICY "Authenticated users can view files"
ON storage.objects FOR SELECT
USING (bucket_id = 'event-media' AND auth.role() = 'authenticated');

-- Policy to allow authenticated users to delete their files from event-media bucket
CREATE POLICY "Authenticated users can delete files"
ON storage.objects FOR DELETE
USING (bucket_id = 'event-media' AND auth.role() = 'authenticated');