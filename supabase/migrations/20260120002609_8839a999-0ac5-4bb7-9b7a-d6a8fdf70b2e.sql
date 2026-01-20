-- Create table for Instagram credentials (admin-only access)
CREATE TABLE public.instagram_credentials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  access_token text NOT NULL,
  business_account_id text NOT NULL,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.instagram_credentials ENABLE ROW LEVEL SECURITY;

-- Only admins can view credentials
CREATE POLICY "Admins can view credentials"
ON public.instagram_credentials
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- Only admins can insert credentials
CREATE POLICY "Admins can insert credentials"
ON public.instagram_credentials
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Only admins can update credentials
CREATE POLICY "Admins can update credentials"
ON public.instagram_credentials
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Only admins can delete credentials
CREATE POLICY "Admins can delete credentials"
ON public.instagram_credentials
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- Add trigger for updated_at
CREATE TRIGGER update_instagram_credentials_updated_at
BEFORE UPDATE ON public.instagram_credentials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();