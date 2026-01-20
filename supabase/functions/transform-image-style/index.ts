import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TransformRequest {
  imageUrl: string;
  style: string;
  customPrompt?: string;
  model?: 'gemini' | 'chatgpt';
}

const SERVICE_STYLES: Record<string, string> = {
  'pixelwear': 'Transform this person wearing professional branded athletic apparel or luxury fashion items. Add realistic clothing overlays like Nike, Adidas, or designer brands. Keep the face and background intact but make it look like they are wearing premium sportswear or fashion items.',
  'trading-cards': 'Transform this image into a professional sports trading card style. Add dramatic lighting, stadium backdrop, player stats overlay frame, glossy card finish effect, and make it look like an official collectible trading card with bold typography.',
  'headshots': 'Transform this into a professional corporate headshot. Clean studio lighting, neutral gradient background, professional color grading, subtle skin retouching, and executive portrait style.',
  'persona-pop': 'Transform this person into a fun Pixar/Disney 3D animated character style. Exaggerated features, colorful cartoon aesthetic, soft lighting, playful expression while maintaining likeness.',
  'co-star': 'Transform this image to place the person alongside a celebrity or in a movie scene. Add cinematic lighting, film grain, professional compositing that makes it look like they are co-starring in a blockbuster movie.',
  'video-booths': 'Transform this into a dynamic action shot with motion blur effects, neon lights, cyberpunk aesthetic, futuristic overlays, and dramatic visual effects that suggest movement and energy.',
  'axon-ai': 'Transform this to include an AI robot companion or futuristic tech elements. Add holographic displays, neural network visualizations, sleek robotic elements, and sci-fi technology aesthetic.',
  'sketch': 'Transform this into an artistic sketch or illustration style. Choose from pencil drawing, charcoal sketch, watercolor painting, or ink wash style with artistic flourishes and hand-drawn aesthetic.',
  'superhero': 'Transform this person into a superhero with dramatic cape, heroic pose lighting, comic book style effects, power auras, and dynamic action composition.',
  'vintage': 'Transform this into a vintage 1920s-1950s aesthetic with sepia tones, film grain, retro fashion styling, art deco elements, and classic Hollywood glamour.',
  'cyberpunk': 'Transform this into a cyberpunk neon aesthetic with vibrant pink and blue lighting, rain effects, holographic overlays, futuristic city backdrop, and high-tech fashion elements.',
  'anime': 'Transform this person into anime/manga art style with big expressive eyes, stylized features, dramatic hair, vibrant colors, and Japanese animation aesthetic.',
  'fantasy': 'Transform this into a fantasy realm with magical elements, mystical lighting, elvish or wizard styling, enchanted forest or castle backdrop, and ethereal glow effects.',
};

function decodeDataUrl(dataUrl: string): { contentType: string; bytes: Uint8Array } {
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) throw new Error('Invalid data URL');
  const contentType = match[1];
  const b64 = match[2];
  const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
  return { contentType, bytes };
}

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

Deno.serve(async (req) => {
  console.log('Transform image request received');
  
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

    // Validate auth
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader } }
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      console.error('Auth error:', authError?.message);
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { imageUrl, style, customPrompt, model = 'gemini' } = await req.json() as TransformRequest;
    
    if (!imageUrl) {
      return new Response(
        JSON.stringify({ error: 'Image URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Reject blob: URLs - frontend should convert them to data: URLs first
    if (imageUrl.startsWith('blob:')) {
      return new Response(
        JSON.stringify({ error: 'Blob URLs cannot be processed. Please re-select the image.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate HTTPS or data: URL
    if (!imageUrl.startsWith('data:') && !imageUrl.startsWith('https://')) {
      return new Response(
        JSON.stringify({ error: 'Image URL must use HTTPS or be a data URL' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Handle custom style
    const isCustomStyle = style === 'custom';
    
    if (!style) {
      return new Response(
        JSON.stringify({ error: 'Style is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (isCustomStyle && !customPrompt) {
      return new Response(
        JSON.stringify({ error: 'Custom prompt is required when using custom style' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate custom prompt length
    if (customPrompt && customPrompt.length > 1000) {
      return new Response(
        JSON.stringify({ error: 'Custom prompt too long (max 1000 characters)' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Transforming image for user ${user.id} with style: ${style}${isCustomStyle ? ' (custom)' : ''}, model: ${model}`);

    // If the input is a data URL, upload it first so the AI can fetch it
    let inputImageUrl = imageUrl;
    if (imageUrl.startsWith('data:')) {
      try {
        const { contentType, bytes } = decodeDataUrl(imageUrl);
        const timestamp = Date.now();
        const ext = contentType.includes('png') ? 'png' : 'jpg';
        const inputPath = `${user.id}/transform-input-${timestamp}.${ext}`;

        const { error: inputUploadError } = await supabase.storage
          .from('instagram-images')
          .upload(inputPath, bytes, { contentType, upsert: true });

        if (!inputUploadError) {
          const { data: publicUrlData } = supabase.storage
            .from('instagram-images')
            .getPublicUrl(inputPath);
          inputImageUrl = publicUrlData.publicUrl;
          console.log('Input uploaded for AI access');
        } else {
          console.error('Input upload error:', inputUploadError);
        }
      } catch (e) {
        console.error('Failed to decode/upload input image:', e);
      }
    }

    // Get the style prompt - prioritize custom prompt for custom style
    let stylePrompt: string;
    if (isCustomStyle && customPrompt) {
      stylePrompt = customPrompt;
    } else if (SERVICE_STYLES[style.toLowerCase()]) {
      stylePrompt = SERVICE_STYLES[style.toLowerCase()];
    } else if (customPrompt) {
      // Use custom prompt as enhancement for predefined style
      stylePrompt = customPrompt;
    } else {
      stylePrompt = `Transform this image into ${style} style.`;
    }
    
    const fullPrompt = `${stylePrompt} Maintain the person's likeness and identity. Create a high-quality, professional result suitable for social media posting. Output MUST include exactly one generated image. Do not ask questions.`;

    console.log('Calling AI gateway for image transformation...');

    // Determine the model to use
    const modelId = model === 'chatgpt' 
      ? 'openai/gpt-5' 
      : 'google/gemini-2.5-flash-image';

    // Call Lovable AI for image editing
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: modelId,
        messages: [
          { role: 'system', content: 'You are an image generation + editing model. Always return an image output.' },
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
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add funds to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: 'AI transformation failed' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log('AI response received');

    // Extract the generated image using helper
    const generatedImage = extractGeneratedImageUrl(data);
    
    if (!generatedImage) {
      console.error('No image in response:', JSON.stringify(data));
      return new Response(
        JSON.stringify({ success: false, error: 'No image was generated. Try a different photo or style.' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // If it's a data URL, upload to storage; if HTTPS already, use as-is
    let imageUrlResult = generatedImage;
    if (generatedImage.startsWith('data:')) {
      const timestamp = Date.now();
      const fileName = `transformed-${style}-${timestamp}.jpg`;
      const filePath = `${user.id}/${fileName}`;

      try {
        const { bytes } = decodeDataUrl(generatedImage);

        const { error: uploadError } = await supabase.storage
          .from('instagram-images')
          .upload(filePath, bytes, { contentType: 'image/jpeg', upsert: true });

        if (!uploadError) {
          const { data: publicUrlData } = supabase.storage
            .from('instagram-images')
            .getPublicUrl(filePath);
          imageUrlResult = publicUrlData.publicUrl;
          console.log('Transformed image uploaded successfully');
        } else {
          console.error('Upload error:', uploadError);
        }
      } catch (e) {
        console.error('Failed to decode/upload output image:', e);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        imageUrl: imageUrlResult,
        style: style,
        message: `Image transformed to ${style} style`
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Transform error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
