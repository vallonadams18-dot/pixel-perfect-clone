import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const jsonHeaders = { ...corsHeaders, 'Content-Type': 'application/json' };
const ok = (payload: unknown) => new Response(JSON.stringify(payload), { status: 200, headers: jsonHeaders });

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

function extractGeneratedImageUrl(data: any): string | null {
  // Gateway format (Gemini image models)
  const direct = data?.choices?.[0]?.message?.images?.[0]?.image_url?.url;
  if (typeof direct === 'string' && direct.length > 0) return direct;

  // Some providers return message.content as an array of parts
  const content = data?.choices?.[0]?.message?.content;
  if (Array.isArray(content)) {
    const part = content.find((p: any) => p?.type === 'image_url' && p?.image_url?.url);
    if (part?.image_url?.url) return part.image_url.url;
  }

  // Some providers (notably OpenAI via the gateway) may return a data URL inside a plain string,
  // e.g. "[data:image/png;base64,...]". Extract it defensively.
  if (typeof content === 'string') {
    // Sometimes base64 is wrapped with brackets/markdown and may include newlines.
    const compact = content.replace(/\s+/g, '');
    const match = compact.match(/data:image\/[a-zA-Z0-9+.-]+;base64,[A-Za-z0-9+/=]+/);
    if (match?.[0]) return match[0];
  }

  // Older/alternate response shapes
  if (Array.isArray(data?.images) && data.images?.[0]?.url) return data.images[0].url;

  if (Array.isArray(data?.data)) {
    const first = data.data[0];
    if (first?.url) return first.url;
    if (first?.b64_json) return `data:image/jpeg;base64,${first.b64_json}`;
  }

  return null;
}

function friendlyAiError(status: number, rawBodyText: string): string {
  if (status === 429) return 'Rate limit exceeded. Please try again in a moment.';
  if (status === 402) return 'AI credits exhausted. Please add funds to continue.';

  // Common provider message from Gemini
  if (rawBodyText?.toLowerCase?.().includes('unable to process input image')) {
    return 'We could not read this photo. Please try a clear JPG/PNG photo (good lighting; avoid screenshots).';
  }

  return 'AI transformation failed. Please try again.';
}

Deno.serve(async (req) => {
  console.log('Transform image request received');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY not configured');
      // IMPORTANT: always return 200 so the client does not throw a non-2xx invoke error
      return ok({ success: false, error: 'AI service not configured' });
    }

    // Validate auth header (function is user-scoped)
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return ok({ success: false, error: 'Missing authorization header' });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') ?? Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing backend env vars', { hasUrl: !!supabaseUrl, hasKey: !!supabaseKey });
      return ok({ success: false, error: 'Backend not configured' });
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      console.error('Auth error:', authError?.message);
      return ok({ success: false, error: 'Unauthorized' });
    }

    let body: TransformRequest;
    try {
      body = (await req.json()) as TransformRequest;
    } catch (e) {
      console.error('Invalid JSON body', e);
      return ok({ success: false, error: 'Invalid request body' });
    }

    const { imageUrl, style, customPrompt, model = 'gemini' } = body;

    if (!style) return ok({ success: false, error: 'Style is required' });
    if (!imageUrl) return ok({ success: false, error: 'Image URL is required' });

    // Reject blob: URLs - the frontend should convert to a data: URL
    if (imageUrl.startsWith('blob:')) {
      return ok({ success: false, error: 'Blob URLs cannot be processed. Please re-select the image.' });
    }

    // Validate URL format
    if (!imageUrl.startsWith('data:') && !imageUrl.startsWith('https://')) {
      return ok({ success: false, error: 'Image URL must use HTTPS or be a data URL' });
    }

    const isCustomStyle = style === 'custom';

    if (isCustomStyle && !customPrompt) {
      return ok({ success: false, error: 'Custom prompt is required when using custom style' });
    }

    if (customPrompt && customPrompt.length > 1000) {
      return ok({ success: false, error: 'Custom prompt too long (max 1000 characters)' });
    }

    console.log(`Transforming image for user ${user.id} with style: ${style}${isCustomStyle ? ' (custom)' : ''}, model: ${model}`);

    // Style prompt
    let stylePrompt: string;
    if (isCustomStyle && customPrompt) {
      stylePrompt = customPrompt;
    } else if (SERVICE_STYLES[style.toLowerCase()]) {
      stylePrompt = SERVICE_STYLES[style.toLowerCase()];
    } else if (customPrompt) {
      stylePrompt = customPrompt;
    } else {
      stylePrompt = `Transform this image into ${style} style.`;
    }

    const fullPrompt = `${stylePrompt} Maintain the person's likeness and identity. Create a high-quality, professional result suitable for social media posting. Output MUST include exactly one generated image. Do not ask questions.`;

    const modelId = model === 'chatgpt'
      ? 'openai/gpt-5'
      : 'google/gemini-2.5-flash-image';

    console.log('Calling AI gateway for image transformation...', { modelId });

    // NOTE: Do NOT upload inputs to storage here; pass data: URLs directly to the model to avoid storage bucket/config issues.
    // Some gateway models reject the `modalities` parameter (notably OpenAI models), so we only send it for Google image models.
    const aiBody: Record<string, unknown> = {
      model: modelId,
      messages: [
        { role: 'system', content: 'You are an image generation + editing model. Always return an image output.' },
        {
          role: 'user',
          content: [
            { type: 'text', text: fullPrompt },
            { type: 'image_url', image_url: { url: imageUrl } },
          ],
        },
      ],
    };

    if (modelId.startsWith('google/')) {
      aiBody.modalities = ['image', 'text'];
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(aiBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      return ok({
        success: false,
        error: friendlyAiError(response.status, errorText),
        providerStatus: response.status,
      });
    }

    const data = await response.json();
    console.log('AI response received');

    const generatedImage = extractGeneratedImageUrl(data);

    if (!generatedImage) {
      console.error('No image in response:', JSON.stringify(data));
      return ok({ success: false, error: 'No image was generated. Try a different photo or style.' });
    }

    // Return the generated image URL as-is (can be https: or data:)
    return ok({
      success: true,
      imageUrl: generatedImage,
      style,
      message: `Image transformed to ${style} style`,
    });
  } catch (error) {
    console.error('Transform error:', error);
    return ok({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
  }
});
