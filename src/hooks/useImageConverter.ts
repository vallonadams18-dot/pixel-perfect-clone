import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ConvertOptions {
  quality?: number;
  maxWidth?: number;
  format?: 'webp' | 'jpeg' | 'png';
}

interface ConversionResult {
  optimizedImageUrl: string;
  originalSize: number;
  format: string;
  quality: number;
}

// Cache for converted images to avoid re-converting
const conversionCache = new Map<string, string>();

export function useImageConverter() {
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const convertImage = useCallback(async (
    imageUrl: string,
    options: ConvertOptions = {}
  ): Promise<string | null> => {
    const { quality = 80, maxWidth = 1200, format = 'webp' } = options;
    
    // Create cache key
    const cacheKey = `${imageUrl}-${quality}-${maxWidth}-${format}`;
    
    // Check cache first
    if (conversionCache.has(cacheKey)) {
      return conversionCache.get(cacheKey)!;
    }

    setIsConverting(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('convert-image', {
        body: { imageUrl, quality, maxWidth, format }
      });

      if (fnError) {
        throw new Error(fnError.message);
      }

      if (!data?.success || !data?.optimizedImageUrl) {
        throw new Error(data?.error || 'Conversion failed');
      }

      const result = data as ConversionResult;
      
      // Cache the result
      conversionCache.set(cacheKey, result.optimizedImageUrl);
      
      console.log(`Image converted: ${result.originalSize} bytes → ${result.format} @ ${result.quality}%`);
      
      return result.optimizedImageUrl;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to convert image';
      setError(message);
      console.error('Image conversion error:', message);
      return null;
    } finally {
      setIsConverting(false);
    }
  }, []);

  const convertMultiple = useCallback(async (
    imageUrls: string[],
    options: ConvertOptions = {},
    onProgress?: (completed: number, total: number) => void
  ): Promise<Map<string, string>> => {
    const results = new Map<string, string>();
    
    for (let i = 0; i < imageUrls.length; i++) {
      const url = imageUrls[i];
      const optimized = await convertImage(url, options);
      if (optimized) {
        results.set(url, optimized);
      }
      onProgress?.(i + 1, imageUrls.length);
    }
    
    return results;
  }, [convertImage]);

  const clearCache = useCallback(() => {
    conversionCache.clear();
  }, []);

  return {
    convertImage,
    convertMultiple,
    clearCache,
    isConverting,
    error
  };
}
