import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface InstagramPublishRequest {
  imageUrl: string;
  caption: string;
  scheduledId?: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authentication first
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      console.error('Missing or invalid Authorization header');
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    // Use service role to read credentials (admin-only table)
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    
    // User client for auth validation
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    // Validate user with getUser()
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError || !userData?.user) {
      console.error('User validation failed:', userError);
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const userId = userData.user.id;
    console.log('Authenticated user:', userId);

    // Get Instagram credentials from database first, fall back to env vars
    let accessToken: string | null = null;
    let businessAccountId: string | null = null;

    const { data: credentials, error: credError } = await supabaseAdmin
      .from('instagram_credentials')
      .select('access_token, business_account_id')
      .limit(1)
      .single();

    if (credentials && !credError) {
      console.log('Using credentials from database');
      accessToken = credentials.access_token;
      businessAccountId = credentials.business_account_id;
    } else {
      console.log('Falling back to environment variables');
      const rawAccessToken = Deno.env.get('INSTAGRAM_ACCESS_TOKEN');
      accessToken = rawAccessToken
        ? rawAccessToken.replace(/^Bearer\s+/i, '').replace(/[\s\r\n]+/g, '').trim()
        : null;
      businessAccountId = Deno.env.get('INSTAGRAM_BUSINESS_ACCOUNT_ID')?.trim() || null;
    }

    if (!accessToken || !businessAccountId) {
      console.error('Missing Instagram credentials');
      return new Response(
        JSON.stringify({ error: 'Instagram credentials not configured. Please add your access token in Settings.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Credentials loaded:', {
      tokenLength: accessToken.length,
      accountIdLength: businessAccountId.length,
    });

    const { imageUrl, caption, scheduledId }: InstagramPublishRequest = await req.json();
    console.log('Publishing to Instagram:', { imageUrl, captionLength: caption?.length, scheduledId });

    if (!imageUrl || !caption) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: imageUrl and caption' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Pre-validate that Instagram can access the image URL
    console.log('Validating image accessibility...');
    try {
      const imageCheck = await fetch(imageUrl, { method: 'HEAD' });
      if (!imageCheck.ok) {
        console.error('Image not accessible:', imageCheck.status);
        return new Response(
          JSON.stringify({ 
            error: `Instagram cannot access this image (HTTP ${imageCheck.status}). Please ensure the image is publicly accessible.` 
          }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const contentType = imageCheck.headers.get('content-type');
      if (contentType && !contentType.startsWith('image/')) {
        console.error('URL does not point to an image:', contentType);
        return new Response(
          JSON.stringify({ 
            error: `URL does not point to an image (${contentType}). Please use a valid image URL.` 
          }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      console.log('Image accessible, content-type:', contentType);
    } catch (checkError: any) {
      console.error('Image check failed:', checkError.message);
      return new Response(
        JSON.stringify({ 
          error: `Cannot verify image URL: ${checkError.message}. Please re-select the image.` 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Step 1: Create media container
    console.log('Step 1: Creating media container...');
    const containerUrl = `https://graph.facebook.com/v19.0/${businessAccountId}/media`;
    const containerParams = new URLSearchParams({
      image_url: imageUrl,
      caption: caption,
      access_token: accessToken,
    });

    const containerResponse = await fetch(`${containerUrl}?${containerParams}`, {
      method: 'POST',
    });

    const containerData = await containerResponse.json();
    console.log('Container response:', containerData);

    if (containerData.error) {
      console.error('Container creation error:', containerData.error);
      const msg = containerData.error.message || 'Failed to create media container';
      const isTokenError = containerData.error.code === 190 || /oauth access token/i.test(msg);

      return new Response(
        JSON.stringify({
          error: isTokenError
            ? 'Instagram token is invalid/expired. Please update the Instagram access token in Settings and try again.'
            : msg,
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const containerId = containerData.id;
    console.log('Container created:', containerId);

    // Step 2: Wait for container to be ready (Instagram processes the image)
    console.log('Step 2: Waiting for container to be ready...');
    let containerStatus = 'IN_PROGRESS';
    let attempts = 0;
    const maxAttempts = 30;

    while (containerStatus === 'IN_PROGRESS' && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const statusUrl = `https://graph.facebook.com/v19.0/${containerId}`;
      const statusParams = new URLSearchParams({
        fields: 'status_code',
        access_token: accessToken,
      });

      const statusResponse = await fetch(`${statusUrl}?${statusParams}`);
      const statusData = await statusResponse.json();
      console.log('Status check:', statusData);
      
      containerStatus = statusData.status_code || 'FINISHED';
      attempts++;
    }

    if (containerStatus === 'ERROR') {
      return new Response(
        JSON.stringify({ error: 'Failed to process image' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Step 3: Publish the container
    console.log('Step 3: Publishing container...');
    const publishUrl = `https://graph.facebook.com/v19.0/${businessAccountId}/media_publish`;
    const publishParams = new URLSearchParams({
      creation_id: containerId,
      access_token: accessToken,
    });

    const publishResponse = await fetch(`${publishUrl}?${publishParams}`, {
      method: 'POST',
    });

    const publishData = await publishResponse.json();
    console.log('Publish response:', publishData);

    if (publishData.error) {
      console.error('Publish error:', publishData.error);
      return new Response(
        JSON.stringify({ error: publishData.error.message || 'Failed to publish' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update scheduled post status if scheduledId provided
    if (scheduledId) {
      const { error: updateError } = await supabase
        .from('scheduled_posts')
        .update({ 
          status: 'published', 
          published_at: new Date().toISOString(),
          instagram_post_id: publishData.id 
        })
        .eq('id', scheduledId);
      
      if (updateError) {
        console.error('Error updating scheduled post:', updateError);
      }
    }

    console.log('Successfully published to Instagram:', publishData.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        postId: publishData.id,
        message: 'Successfully published to Instagram!' 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    console.error('Error publishing to Instagram:', errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
