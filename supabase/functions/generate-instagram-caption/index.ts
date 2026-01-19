import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// PixelAI Pro services for context
const PIXELAI_SERVICES = `
PixelAI Pro offers premium AI-powered photo experiences for events:

1. **AI Photo Booths** - Instant AI transformations at events. Guests step in, our AI creates stunning artistic portraits in seconds.

2. **PixelWear** - Virtual try-on technology. Guests can virtually wear branded merchandise, sports jerseys, or luxury fashion items.

3. **AI Headshots** - Professional corporate headshots generated in seconds. Perfect for conferences and corporate events.

4. **Persona Pop** - Fun caricature and cartoon-style transformations. Pixar-style, anime, superhero, and more.

5. **Co-Star** - Put guests in photos with celebrities, athletes, or custom backgrounds.

6. **AI Trading Cards** - Personalized collectible cards featuring guests as athletes, superheroes, or custom themes.

7. **AI Video Booths** - Short AI-generated video clips with special effects and transformations.

8. **Axon AI** - Interactive AI robot that creates personalized art and engages with guests.

9. **Sketch** - AI-powered artistic sketches in various styles like charcoal, watercolor, and ink wash.

We serve corporate events, brand activations, trade shows, sports events, and private parties in NYC and nationwide.
`;

interface GenerateCaptionRequest {
  imageDescription?: string;
  eventName?: string;
  service?: string;
  tone?: 'professional' | 'playful' | 'engaging' | 'luxurious';
  includeHashtags?: boolean;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('Missing LOVABLE_API_KEY');
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    
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

    console.log('Authenticated user:', userData.user.id);

    const { 
      imageDescription, 
      eventName, 
      service,
      tone = 'engaging',
      includeHashtags = true 
    }: GenerateCaptionRequest = await req.json();

    console.log('Generating caption:', { imageDescription, eventName, service, tone });

    const toneInstructions = {
      professional: 'Use a professional, polished tone suitable for corporate clients.',
      playful: 'Use a fun, energetic tone with emojis and excitement.',
      engaging: 'Use an engaging, conversational tone that encourages interaction.',
      luxurious: 'Use an elegant, sophisticated tone emphasizing premium quality.'
    };

    const prompt = `You are a social media expert for PixelAI Pro, a premium AI photo booth company.

${PIXELAI_SERVICES}

Generate an Instagram caption for a post with these details:
${imageDescription ? `- Image shows: ${imageDescription}` : '- General promotional post'}
${eventName ? `- Event: ${eventName}` : ''}
${service ? `- Service featured: ${service}` : ''}

Requirements:
- ${toneInstructions[tone]}
- Keep caption between 100-200 characters for the main text
- Make it attention-grabbing with a hook
- Include a call-to-action (book, inquire, visit website, etc.)
- Mention NYC/nationwide availability when relevant
${includeHashtags ? '- Include 10-15 relevant hashtags at the end' : '- Do NOT include hashtags'}

Format your response EXACTLY as:
CAPTION:
[Your caption here]

${includeHashtags ? 'HASHTAGS:\n[Your hashtags here]' : ''}`;

    console.log('Calling Lovable AI...');
    
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          { role: 'user', content: prompt }
        ],
        max_tokens: 500,
        temperature: 0.8,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI API error:', aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add credits.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: 'Failed to generate caption' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiData = await aiResponse.json();
    const generatedText = aiData.choices?.[0]?.message?.content || '';

    console.log('AI response received, length:', generatedText.length);

    // Parse caption and hashtags
    let caption = '';
    let hashtags = '';

    const captionMatch = generatedText.match(/CAPTION:\s*([\s\S]*?)(?=HASHTAGS:|$)/i);
    if (captionMatch) {
      caption = captionMatch[1].trim();
    }

    if (includeHashtags) {
      const hashtagMatch = generatedText.match(/HASHTAGS:\s*([\s\S]*?)$/i);
      if (hashtagMatch) {
        hashtags = hashtagMatch[1].trim();
      }
    }

    // Fallback if parsing fails
    if (!caption) {
      caption = generatedText.replace(/CAPTION:|HASHTAGS:/gi, '').trim();
    }

    console.log('Generated caption:', caption.substring(0, 50) + '...');

    return new Response(
      JSON.stringify({ 
        success: true, 
        caption, 
        hashtags,
        fullText: `${caption}${hashtags ? `\n\n${hashtags}` : ''}`
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error generating caption:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to generate caption' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
