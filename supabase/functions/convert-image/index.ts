const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { imageUrl, quality = 80, maxWidth = 1200, format = 'webp' } = await req.json()

    if (!imageUrl) {
      return new Response(
        JSON.stringify({ error: 'Image URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Validate quality
    const validQuality = Math.min(100, Math.max(1, quality))
    
    // Validate maxWidth
    const validMaxWidth = Math.min(4096, Math.max(100, maxWidth))
    
    // Validate format
    const validFormats = ['webp', 'jpeg', 'png']
    const validFormat = validFormats.includes(format) ? format : 'webp'

    console.log(`Converting image: ${imageUrl.substring(0, 100)}... to ${validFormat} at quality ${validQuality}, max width ${validMaxWidth}`)

    // Fetch the original image
    const imageResponse = await fetch(imageUrl)
    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image: ${imageResponse.status}`)
    }

    const imageBuffer = await imageResponse.arrayBuffer()
    const base64Image = btoa(
      new Uint8Array(imageBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
    )

    // Detect content type from response or URL
    const contentType = imageResponse.headers.get('content-type') || 'image/jpeg'
    const mimeType = contentType.split(';')[0].trim()

    // Use Lovable AI to optimize the image
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY')
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured')
    }

    const optimizationPrompt = `Output this exact image with no modifications. Do not add any text, watermarks, or changes. Just output the same image in ${validFormat} format at ${validQuality}% quality${validMaxWidth < 2000 ? `, resized to max ${validMaxWidth}px width if larger` : ''}.`

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-image-preview',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: optimizationPrompt
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:${mimeType};base64,${base64Image}`
                }
              }
            ]
          }
        ],
        modalities: ['image', 'text']
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('AI API error:', errorText)
      throw new Error(`AI API error: ${response.status}`)
    }

    const data = await response.json()
    const optimizedImageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url

    if (!optimizedImageUrl) {
      console.error('No optimized image in response:', JSON.stringify(data).substring(0, 500))
      throw new Error('No optimized image returned from AI')
    }

    console.log('Image converted successfully')

    return new Response(
      JSON.stringify({ 
        success: true,
        optimizedImageUrl,
        originalSize: imageBuffer.byteLength,
        format: validFormat,
        quality: validQuality
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=86400' // Cache for 24 hours
        } 
      }
    )

  } catch (error) {
    console.error('Image conversion error:', error)
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Failed to convert image',
        success: false
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
