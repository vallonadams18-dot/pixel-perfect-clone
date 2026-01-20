-- Drop the overly permissive insert policy
DROP POLICY IF EXISTS "Allow demo lead inserts" ON public.leads;

-- The leads table will only be written to via service role in edge functions
-- No client-side inserts allowed - this is intentional for security