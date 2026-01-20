-- Create leads table for marketing follow-up
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  source TEXT NOT NULL, -- e.g., 'persona-pop', 'headshots', 'co-star', etc.
  experience_type TEXT, -- same as source but kept for compatibility
  first_seen_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_interaction_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  total_demos_used INTEGER NOT NULL DEFAULT 1,
  converted BOOLEAN NOT NULL DEFAULT false,
  notes TEXT,
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(email)
);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Only admins can view leads
CREATE POLICY "Admins can view all leads"
ON public.leads
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can update leads
CREATE POLICY "Admins can update leads"
ON public.leads
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete leads
CREATE POLICY "Admins can delete leads"
ON public.leads
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow anonymous inserts from demo (service role will handle this)
CREATE POLICY "Allow demo lead inserts"
ON public.leads
FOR INSERT
WITH CHECK (true);

-- Create trigger for updated_at
CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();