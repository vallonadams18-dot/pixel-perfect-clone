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

  console.log('Processing scheduled posts...');

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const accessToken = Deno.env.get('INSTAGRAM_ACCESS_TOKEN');
  const businessAccountId = Deno.env.get('INSTAGRAM_BUSINESS_ACCOUNT_ID');

  if (!accessToken || !businessAccountId) {
    console.error('Missing Instagram credentials');
    return new Response(
      JSON.stringify({ error: 'Instagram credentials not configured' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Use service role to bypass RLS for cron job
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    // Fetch pending posts that are due for publishing
    const now = new Date().toISOString();
    const { data: pendingPosts, error: fetchError } = await supabase
      .from('scheduled_posts')
      .select('*')
      .eq('status', 'pending')
      .lte('scheduled_for', now)
      .order('scheduled_for', { ascending: true })
      .limit(10); // Process up to 10 posts per run

    if (fetchError) {
      console.error('Error fetching pending posts:', fetchError);
      return new Response(
        JSON.stringify({ error: fetchError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!pendingPosts || pendingPosts.length === 0) {
      console.log('No pending posts to process');
      return new Response(
        JSON.stringify({ message: 'No pending posts', processed: 0 }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Found ${pendingPosts.length} posts to process`);

    const results = [];

    for (const post of pendingPosts) {
      console.log(`Processing post ${post.id}...`);
      
      try {
        // Step 1: Create media container
        const containerUrl = `https://graph.facebook.com/v19.0/${businessAccountId}/media`;
        const containerParams = new URLSearchParams({
          image_url: post.image_url,
          caption: post.caption,
          access_token: accessToken,
        });

        const containerResponse = await fetch(`${containerUrl}?${containerParams}`, {
          method: 'POST',
        });

        const containerData = await containerResponse.json();
        console.log(`Container response for ${post.id}:`, containerData);

        if (containerData.error) {
          throw new Error(containerData.error.message || 'Failed to create media container');
        }

        const containerId = containerData.id;

        // Step 2: Wait for container to be ready
        let containerStatus = 'IN_PROGRESS';
        let attempts = 0;
        const maxAttempts = 15;

        while (containerStatus === 'IN_PROGRESS' && attempts < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          const statusUrl = `https://graph.facebook.com/v19.0/${containerId}`;
          const statusParams = new URLSearchParams({
            fields: 'status_code',
            access_token: accessToken,
          });

          const statusResponse = await fetch(`${statusUrl}?${statusParams}`);
          const statusData = await statusResponse.json();
          containerStatus = statusData.status_code || 'FINISHED';
          attempts++;
        }

        if (containerStatus === 'ERROR') {
          throw new Error('Media container processing failed');
        }

        // Step 3: Publish the container
        const publishUrl = `https://graph.facebook.com/v19.0/${businessAccountId}/media_publish`;
        const publishParams = new URLSearchParams({
          creation_id: containerId,
          access_token: accessToken,
        });

        const publishResponse = await fetch(`${publishUrl}?${publishParams}`, {
          method: 'POST',
        });

        const publishData = await publishResponse.json();
        console.log(`Publish response for ${post.id}:`, publishData);

        if (publishData.error) {
          throw new Error(publishData.error.message || 'Failed to publish');
        }

        // Update post status to published
        await supabase
          .from('scheduled_posts')
          .update({ 
            status: 'published', 
            published_at: new Date().toISOString(),
            instagram_post_id: publishData.id 
          })
          .eq('id', post.id);

        results.push({ id: post.id, status: 'published', postId: publishData.id });
        console.log(`Post ${post.id} published successfully`);

      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error(`Error processing post ${post.id}:`, error);
        
        // Update post status to failed
        await supabase
          .from('scheduled_posts')
          .update({ 
            status: 'failed', 
            error_message: errorMessage 
          })
          .eq('id', post.id);

        results.push({ id: post.id, status: 'failed', error: errorMessage });
      }
    }

    console.log('Processing complete:', results);

    return new Response(
      JSON.stringify({ 
        message: 'Processing complete', 
        processed: results.length,
        results 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
