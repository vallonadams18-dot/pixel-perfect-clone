-- Create table to store demo transformations for marketing
CREATE TABLE public.demo_gallery (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  experience_type TEXT NOT NULL,
  original_image_url TEXT NOT NULL,
  transformed_image_url TEXT NOT NULL,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.demo_gallery ENABLE ROW LEVEL SECURITY;

-- Only admins can view demo gallery (for marketing)
CREATE POLICY "Admins can view all demo gallery images"
  ON public.demo_gallery
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete (cleanup)
CREATE POLICY "Admins can delete demo gallery images"
  ON public.demo_gallery
  FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Add index for faster queries
CREATE INDEX idx_demo_gallery_experience ON public.demo_gallery(experience_type);
CREATE INDEX idx_demo_gallery_created_at ON public.demo_gallery(created_at DESC);