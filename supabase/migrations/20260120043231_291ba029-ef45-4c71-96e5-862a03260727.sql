-- Create user gallery table for saved AI transformations
CREATE TABLE public.user_gallery (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  experience_type TEXT NOT NULL,
  original_image_url TEXT NOT NULL,
  transformed_image_url TEXT NOT NULL,
  style_used TEXT,
  custom_prompt TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add index for faster user queries
CREATE INDEX idx_user_gallery_user_id ON public.user_gallery(user_id);
CREATE INDEX idx_user_gallery_experience ON public.user_gallery(experience_type);

-- Enable RLS
ALTER TABLE public.user_gallery ENABLE ROW LEVEL SECURITY;

-- Users can view their own gallery items
CREATE POLICY "Users can view their own gallery" 
ON public.user_gallery 
FOR SELECT 
USING (auth.uid() = user_id);

-- Users can insert their own gallery items
CREATE POLICY "Users can save to their gallery" 
ON public.user_gallery 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can delete their own gallery items
CREATE POLICY "Users can delete from their gallery" 
ON public.user_gallery 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create storage bucket for demo images (public access for sharing)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('demo-images', 'demo-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for demo images
CREATE POLICY "Anyone can view demo images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'demo-images');

CREATE POLICY "Anyone can upload demo images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'demo-images');

CREATE POLICY "Anyone can update demo images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'demo-images');