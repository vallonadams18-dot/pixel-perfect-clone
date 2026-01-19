-- Create storage bucket for event media uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('event-media', 'event-media', false);

-- Allow authenticated users to upload files
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'event-media' AND auth.role() = 'authenticated');

-- Allow authenticated users to view their uploads
CREATE POLICY "Allow authenticated reads"
ON storage.objects FOR SELECT
USING (bucket_id = 'event-media' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete their uploads
CREATE POLICY "Allow authenticated deletes"
ON storage.objects FOR DELETE
USING (bucket_id = 'event-media' AND auth.role() = 'authenticated');

-- Create a table to track uploaded media with metadata
CREATE TABLE public.event_media (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT,
  event_name TEXT,
  description TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.event_media ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to manage event media
CREATE POLICY "Authenticated users can view event media"
ON public.event_media FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert event media"
ON public.event_media FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete event media"
ON public.event_media FOR DELETE
USING (auth.role() = 'authenticated');