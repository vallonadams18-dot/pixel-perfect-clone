import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Check required environment variables
    const rawAccessToken = Deno.env.get('INSTAGRAM_ACCESS_TOKEN');
    const instagramAccessToken = rawAccessToken
      ? rawAccessToken.replace(/^Bearer\s+/i, '').replace(/\s+/g, '').trim()
      : null;
    const businessAccountId = Deno.env.get('INSTAGRAM_BUSINESS_ACCOUNT_ID')?.trim();

    if (!instagramAccessToken || !businessAccountId) {
      console.error('Missing Instagram credentials');
      return new Response(
        JSON.stringify({ 
          connected: false, 
          message: 'Instagram credentials not configured' 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      console.error('Missing or invalid Authorization header');
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader } }
    });

    // Validate user
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError || !userData?.user) {
      console.error('User validation failed:', userError);
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Checking Instagram connection for user:', userData.user.id);

    // Test Instagram API connection by fetching account info
    const accountUrl = `https://graph.facebook.com/v19.0/${businessAccountId}?fields=id,username,name,profile_picture_url&access_token=${instagramAccessToken}`;
    
    console.log('Fetching Instagram account info...');
    const response = await fetch(accountUrl);
    const accountData = await response.json();

    if (!response.ok) {
      console.error('Instagram API error:', accountData);
      
      // Check for specific error types
      if (accountData.error?.code === 190) {
        return new Response(
          JSON.stringify({ 
            connected: false, 
            message: 'Instagram access token has expired. Please update your credentials.',
            error: accountData.error
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (accountData.error?.code === 10) {
        return new Response(
          JSON.stringify({ 
            connected: false, 
            message: 'Instagram permissions issue. Please reconnect your account.',
            error: accountData.error
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ 
          connected: false, 
          message: accountData.error?.message || 'Instagram API error',
          error: accountData.error
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Instagram connection successful:', accountData.username);

    return new Response(
      JSON.stringify({ 
        connected: true, 
        message: 'Connected successfully',
        accountName: accountData.username || accountData.name,
        accountId: accountData.id
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Connection check error:', error);
    return new Response(
      JSON.stringify({ 
        connected: false, 
        message: error.message || 'Failed to check connection' 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
