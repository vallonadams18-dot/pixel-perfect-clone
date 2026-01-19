-- Add retry tracking columns to scheduled_posts
ALTER TABLE public.scheduled_posts 
ADD COLUMN IF NOT EXISTS retry_count integer NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS next_retry_at timestamp with time zone;