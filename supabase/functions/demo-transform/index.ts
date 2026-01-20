import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface DemoTransformRequest {
  imageBase64: string;
  experience: string;
  customPrompt?: string;
}

const EXPERIENCE_STYLES: Record<string, string> = {
  'pixelwear': 'Transform this person wearing professional branded athletic apparel or luxury fashion items. Add realistic clothing overlays like Nike, Adidas, or designer brands. Keep the face and background intact but make it look like they are wearing premium sportswear or fashion items.',
  'trading-cards': 'Transform this image into a professional sports trading card style. Add dramatic lighting, stadium backdrop, player stats overlay frame, glossy card finish effect, and make it look like an official collectible trading card with bold typography.',
  'headshots': 'Transform this into a professional corporate headshot. Clean studio lighting, neutral gradient background, professional color grading, subtle skin retouching, and executive portrait style.',
  'persona-pop': 'Transform this person into a fun Pixar/Disney 3D animated character style. Exaggerated features, colorful cartoon aesthetic, soft lighting, playful expression while maintaining likeness.',
  'co-star': 'Transform this image to place the person alongside a celebrity or in a movie scene. Add cinematic lighting, film grain, professional compositing that makes it look like they are co-starring in a blockbuster movie.',
  'video-booths': 'Transform this into a dynamic action shot with motion blur effects, neon lights, cyberpunk aesthetic, futuristic overlays, and dramatic visual effects that suggest movement and energy.',
  'axon-ai': 'Transform this to include an AI robot companion or futuristic tech elements. Add holographic displays, neural network visualizations, sleek robotic elements, and sci-fi technology aesthetic.',
  'identity': 'Create a stylized artistic portrait that captures the essence and identity of this person. Use creative lighting, artistic filters, and portrait techniques that highlight their unique features and personality.',
};

function extractGeneratedImageUrl(data: any): string | null {
  // Common formats across OpenAI-compatible image models
  const direct = data?.choices?.[0]?.message?.images?.[0]?.image_url?.url;
  if (typeof direct === 'string' && direct.length > 0) return direct;

  const content = data?.choices?.[0]?.message?.content;
  if (Array.isArray(content)) {
    const part = content.find((p: any) => p?.type === 'image_url' && p?.image_url?.url);
    if (part?.image_url?.url) return part.image_url.url;
  }

  // Some providers return images at the top level
  if (Array.isArray(data?.images) && data.images?.[0]?.url) return data.images[0].url;

  // Older OpenAI-style image outputs
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

Deno.serve(async (req) => {
  console.log('Demo transform request received');
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

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

    const { imageBase64, experience, customPrompt } = await req.json() as DemoTransformRequest;
    
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

    // Validate base64 size (limit to ~10MB)
    if (imageBase64.length > 15000000) {
      return new Response(
        JSON.stringify({ error: 'Image too large. Please use a smaller image.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processing demo for experience: ${experience}`);

    // Get the style prompt
    const stylePrompt = EXPERIENCE_STYLES[experience.toLowerCase()] ||
      `Transform this image into ${experience} style.`;

    const fullPrompt = customPrompt
      ? `${customPrompt}. Maintain the person's likeness and identity.`
      : `${stylePrompt} Maintain the person's likeness and identity. Create a high-quality, professional result suitable for social media posting.`;

    // IMPORTANT: The image model needs a URL it can fetch. Data URLs can be flaky, so we upload
    // the input to the public demo-images bucket and pass the public URL to the AI.
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

    // Call Lovable AI for image editing using Nano Banana (image generation model)
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-image',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: fullPrompt },
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
          JSON.stringify({ error: 'High demand! Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Demo temporarily unavailable. Please try again later.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ error: 'Transformation failed. Please try a different photo.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log('AI response received');

    // Extract the generated image (supports multiple gateway response formats)
    const generatedImage = extractGeneratedImageUrl(data);

    if (!generatedImage) {
      console.error('No image in response:', JSON.stringify(data));
      return new Response(
        JSON.stringify({ error: 'Unable to transform this image. Try a clearer photo with good lighting.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // If the model returns a data URL, persist it to storage. If it returns an https URL, return it directly.
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