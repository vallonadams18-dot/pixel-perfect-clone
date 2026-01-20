-- Create table to track demo usage per email
CREATE TABLE public.demo_usage (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  experience_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_address TEXT
);

-- Create index for fast lookups
CREATE INDEX idx_demo_usage_email ON public.demo_usage(email);
CREATE INDEX idx_demo_usage_email_experience ON public.demo_usage(email, experience_type);

-- Enable RLS (public insert, no select for privacy)
ALTER TABLE public.demo_usage ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (the edge function uses service role for reads)
CREATE POLICY "Allow anonymous demo usage inserts"
ON public.demo_usage
FOR INSERT
TO anon
WITH CHECK (true);

-- No select policy for anon - only service role can read usage counts