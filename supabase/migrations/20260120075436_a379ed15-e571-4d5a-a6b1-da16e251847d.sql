-- Add thumbnail_path column to event_media table for 200px thumbnail versions
ALTER TABLE public.event_media 
ADD COLUMN IF NOT EXISTS thumbnail_path TEXT;