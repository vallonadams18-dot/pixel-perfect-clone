import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const MAX_TRIES_PER_EMAIL = 2;

interface DemoTransformRequest {
  imageBase64?: string;
  experience: string;
  customPrompt?: string;
  email?: string;
  checkUsage?: boolean;
}

const EXPERIENCE_STYLES: Record<string, string> = {
  'pixelwear': 'Transform this person wearing professional branded athletic apparel or luxury fashion items. Add realistic clothing overlays like Nike, Adidas, or designer brands. Keep the face and background intact but make it look like they are wearing premium sportswear or fashion items.',
  'trading-cards': 'Transform this image into a professional sports trading card style. Add dramatic lighting, stadium backdrop, player stats overlay frame, glossy card finish effect, and make it look like an official collectible trading card with bold typography.',
  'headshots': 'Transform this into a professional corporate headshot. Clean studio lighting, neutral gradient background, professional color grading, subtle skin retouching, and executive portrait style.',
  'persona-pop': 'Transform this person into a fun Pixar/Disney 3D animated character style. Exaggerated features, colorful cartoon aesthetic, soft lighting, playful expression while maintaining likeness.',
  'co-star': 'Transform this image to place the person co-starring in a blockbuster movie scene with an A‑list actor (generic, non-identifiable). Add cinematic lighting, film grain, professional compositing, and a movie-poster vibe.',
  'video-booths': 'Transform this into a dynamic action shot with motion blur effects, neon lights, cyberpunk aesthetic, futuristic overlays, and dramatic visual effects that suggest movement and energy.',
  'axon-ai': 'Transform this to include an AI robot companion or futuristic tech elements. Add holographic displays, neural network visualizations, sleek robotic elements, and sci-fi technology aesthetic.',
  'identity': 'Create a stylized artistic portrait that captures the essence and identity of this person. Use creative lighting, artistic filters, and portrait techniques that highlight their unique features and personality.',
};

function extractGeneratedImageUrl(data: any): string | null {
  const direct = data?.choices?.[0]?.message?.images?.[0]?.image_url?.url;
  if (typeof direct === 'string' && direct.length > 0) return direct;

  const content = data?.choices?.[0]?.message?.content;
  if (Array.isArray(content)) {
    const part = content.find((p: any) => p?.type === 'image_url' && p?.image_url?.url);
    if (part?.image_url?.url) return part.image_url.url;
  }

  if (Array.isArray(data?.images) && data.images?.[0]?.url) return data.images[0].url;

  if (Array.isArray(data?.data)) {
    const first = data.data[0];
    if (first?.url) return first.url;
    if (first?.b64_json) return `data:image/jpeg;base64,${first.b64_json}`;
  }

  return null;
}

function decodeDataUrl(dataUrl: string): { contentType: string; bytes: Uint8Array } {
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) throw new Error('Invalid data URL');
  const contentType = match[1];
  const b64 = match[2];
  const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
  return { contentType, bytes };
}

async function waitForPublicImage(url: string): Promise<void> {
  for (let i = 0; i < 6; i++) {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      if (res.ok) return;
    } catch {
      // ignore
    }
    await new Promise((r) => setTimeout(r, 250));
  }
}

async function getUsageCount(supabase: any, email: string, experience: string): Promise<number> {
  const { count, error } = await supabase
    .from('demo_usage')
    .select('*', { count: 'exact', head: true })
    .eq('email', email.toLowerCase().trim())
    .eq('experience_type', experience.toLowerCase());
  
  if (error) {
    console.error('Usage count error:', error);
    return 0;
  }
  
  return count || 0;
}

async function recordUsage(supabase: any, email: string, experience: string): Promise<void> {
  const { error } = await supabase
    .from('demo_usage')
    .insert({
      email: email.toLowerCase().trim(),
      experience_type: experience.toLowerCase(),
    });
  
  if (error) {
    console.error('Record usage error:', error);
  }
}

async function upsertLead(
  supabase: any, 
  email: string, 
  experience: string,
  userAgent?: string,
  referrer?: string
): Promise<void> {
  const normalizedEmail = email.toLowerCase().trim();
  
  // Check if lead already exists
  const { data: existing } = await supabase
    .from('leads')
    .select('id, total_demos_used')
    .eq('email', normalizedEmail)
    .maybeSingle();
  
  if (existing) {
    // Update existing lead
    const { error } = await supabase
      .from('leads')
      .update({
        last_interaction_at: new Date().toISOString(),
        total_demos_used: (existing.total_demos_used || 0) + 1,
      })
      .eq('id', existing.id);
    
    if (error) {
      console.error('Lead update error:', error);
    } else {
      console.log('Lead updated:', normalizedEmail);
    }
  } else {
    // Insert new lead
    const { error } = await supabase
      .from('leads')
      .insert({
        email: normalizedEmail,
        source: experience.toLowerCase(),
        experience_type: experience.toLowerCase(),
        user_agent: userAgent || null,
        referrer: referrer || null,
        total_demos_used: 1,
      });
    
    if (error) {
      console.error('Lead insert error:', error);
    } else {
      console.log('New lead created:', normalizedEmail, 'source:', experience);
    }
  }
}

Deno.serve(async (req) => {
  console.log('Demo transform request received');
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Extract headers for lead tracking
  const userAgent = req.headers.get('user-agent') || undefined;
  const referrer = req.headers.get('referer') || req.headers.get('referrer') || undefined;

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body = await req.json() as DemoTransformRequest;
    const { imageBase64, experience, customPrompt, email, checkUsage } = body;

    // Handle usage check request
    if (checkUsage && email && experience) {
      const usageCount = await getUsageCount(supabase, email, experience);
      const remainingTries = Math.max(0, MAX_TRIES_PER_EMAIL - usageCount);
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          usageCount, 
          remainingTries,
          maxTries: MAX_TRIES_PER_EMAIL 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate required fields for transformation
    if (!imageBase64) {
      return new Response(
        JSON.stringify({ error: 'Image is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!experience) {
      return new Response(
        JSON.stringify({ error: 'Experience type is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check usage limit
    const usageCount = await getUsageCount(supabase, email, experience);
    if (usageCount >= MAX_TRIES_PER_EMAIL) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          limitReached: true, 
          error: 'You have used all your free tries for this experience.',
          remainingTries: 0 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate base64 size (limit to ~10MB)
    if (imageBase64.length > 15000000) {
      return new Response(
        JSON.stringify({ error: 'Image too large. Please use a smaller image.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processing demo for experience: ${experience}, email: ${email}`);

    // Get the style prompt
    const stylePrompt = EXPERIENCE_STYLES[experience.toLowerCase()] ||
      `Transform this image into ${experience} style.`;

    const fullPrompt = customPrompt
      ? `${customPrompt}. Maintain the person's likeness and identity.`
      : `${stylePrompt} Maintain the person's likeness and identity. Create a high-quality, professional result suitable for social media posting.`;

    const outputInstruction =
      'Output MUST include exactly one generated image. Do not ask questions. Do not return explanations.';

    const promptForModel = `${fullPrompt}\n\n${outputInstruction}`;

    // Upload input image to storage for AI access
    let inputImageUrl = imageBase64;
    if (imageBase64.startsWith('data:')) {
      try {
        const { contentType, bytes } = decodeDataUrl(imageBase64);
        const timestamp = Date.now();
        const randomId = crypto.randomUUID().slice(0, 8);
        const ext = contentType.includes('png') ? 'png' : 'jpg';
        const inputPath = `inputs/demo-input-${experience}-${timestamp}-${randomId}.${ext}`;

        const { error: inputUploadError } = await supabase.storage
          .from('demo-images')
          .upload(inputPath, bytes, {
            contentType,
            upsert: false,
          });

        if (!inputUploadError) {
          const { data: publicUrlData } = supabase.storage
            .from('demo-images')
            .getPublicUrl(inputPath);
          inputImageUrl = publicUrlData.publicUrl;
          await waitForPublicImage(inputImageUrl);
          console.log('Input uploaded for AI access');
        } else {
          console.error('Input upload error (using data URL directly):', inputUploadError);
        }
      } catch (e) {
        console.error('Failed to decode/upload input image:', e);
      }
    }

    console.log('Calling AI gateway for demo transformation...', {
      experience,
      model: 'google/gemini-2.5-flash-image',
    });

    // Call Lovable AI for image editing
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-image',
        messages: [
          { role: 'system', content: 'You are an image generation + editing model. Always return an image output.' },
          {
            role: 'user',
            content: [
              { type: 'text', text: promptForModel },
              {
                type: 'image_url',
                image_url: { url: inputImageUrl },
              },
            ],
          },
        ],
        modalities: ['image', 'text'],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ success: false, error: 'High demand! Please try again in a moment.' }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ success: false, error: 'Demo temporarily unavailable. Please try again later.' }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      let providerMessage: string | null = null;
      try {
        const parsed = JSON.parse(errorText);
        const raw = parsed?.error?.metadata?.raw;
        if (typeof raw === 'string') {
          const rawParsed = JSON.parse(raw);
          providerMessage = rawParsed?.error?.message ?? null;
        }
      } catch {
        // ignore
      }

      if (providerMessage && /unable to process input image/i.test(providerMessage)) {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'We could not read this photo. Please try a JPG/PNG selfie with good lighting (avoid screenshots).',
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ success: false, error: 'Transformation failed. Please try a different photo.' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log('AI response received');

    let generatedImage = extractGeneratedImageUrl(data);

    if (!generatedImage) {
      const assistantText = data?.choices?.[0]?.message?.content;
      console.error('No image in response:', JSON.stringify(data));

      // One-shot retry with a stronger image model
      console.log('Retrying with google/gemini-3-pro-image-preview...');
      const retryResp = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-3-pro-image-preview',
          messages: [
            { role: 'system', content: 'You are an image model. You must output an image, not text.' },
            {
              role: 'user',
              content: [
                { type: 'text', text: promptForModel },
                { type: 'image_url', image_url: { url: inputImageUrl } },
              ],
            },
          ],
          modalities: ['image', 'text'],
        }),
      });

      if (retryResp.ok) {
        const retryData = await retryResp.json();
        generatedImage = extractGeneratedImageUrl(retryData);
      }

      if (!generatedImage) {
        return new Response(
          JSON.stringify({
            success: false,
            error:
              typeof assistantText === 'string' && assistantText.length > 0
                ? assistantText
                : 'The AI did not return an image for this photo. Please try a different photo.',
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Record usage and upsert lead BEFORE returning success
    await recordUsage(supabase, email, experience);
    await upsertLead(supabase, email, experience, userAgent, referrer);
    const newUsageCount = usageCount + 1;
    const remainingTries = Math.max(0, MAX_TRIES_PER_EMAIL - newUsageCount);

    // If the model returns a data URL, persist it to storage
    let imageUrl = generatedImage;

    if (generatedImage.startsWith('data:')) {
      const timestamp = Date.now();
      const randomId = crypto.randomUUID().slice(0, 8);
      const fileName = `demo-${experience}-${timestamp}-${randomId}.jpg`;

      try {
        const { bytes } = decodeDataUrl(generatedImage);

        const { error: uploadError } = await supabase.storage
          .from('demo-images')
          .upload(fileName, bytes, {
            contentType: 'image/jpeg',
            upsert: false,
          });

        if (!uploadError) {
          const { data: publicUrlData } = supabase.storage
            .from('demo-images')
            .getPublicUrl(fileName);
          imageUrl = publicUrlData.publicUrl;
          console.log('Demo image uploaded successfully');
        } else {
          console.error('Output upload error (returning data URL):', uploadError);
        }
      } catch (e) {
        console.error('Failed to decode/upload output image (returning data URL):', e);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        imageUrl,
        experience,
        message: `Your ${experience} transformation is ready!`,
        remainingTries,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Demo transform error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Something went wrong. Please try again.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});