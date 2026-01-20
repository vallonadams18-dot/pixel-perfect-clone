import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface MediaItem {
  id: string;
  file_name: string;
  file_path: string;
  file_type: string | null;
  event_name: string | null;
  description: string | null;
  tags: string[] | null;
  created_at: string;
  user_id: string | null;
  url?: string;
  thumbnailUrl?: string;
  isLoading?: boolean;
  error?: boolean;
}

interface UseVirtualizedMediaOptions {
  bucketName: string;
  pageSize?: number;
}

// Cache for signed URLs to avoid regenerating
const urlCache = new Map<string, { url: string; expires: number }>();
const CACHE_DURATION = 50 * 60 * 1000; // 50 minutes (signed URLs expire in 60)

export function useVirtualizedMedia({ bucketName, pageSize = 20 }: UseVirtualizedMediaOptions) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const offsetRef = useRef(0);
  const loadingRef = useRef(false);
  const mountedRef = useRef(true);

  // Get cached URL or generate new one with retry logic
  const getSignedUrl = useCallback(async (filePath: string, retries = 2): Promise<string | null> => {
    const cached = urlCache.get(filePath);
    const now = Date.now();
    
    if (cached && cached.expires > now) {
      return cached.url;
    }

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const { data, error: urlError } = await supabase.storage
          .from(bucketName)
          .createSignedUrl(filePath, 3600); // 1 hour expiry
        
        if (urlError) {
          console.warn(`URL generation attempt ${attempt + 1} failed for ${filePath}:`, urlError.message);
          if (attempt === retries) return null;
          await new Promise(r => setTimeout(r, 500 * (attempt + 1))); // Exponential backoff
          continue;
        }
        
        if (data?.signedUrl) {
          urlCache.set(filePath, { 
            url: data.signedUrl, 
            expires: now + CACHE_DURATION 
          });
          return data.signedUrl;
        }
      } catch (err) {
        console.error(`URL generation error for ${filePath}:`, err);
        if (attempt === retries) return null;
      }
    }
    return null;
  }, [bucketName]);

  // Batch load URLs for visible items with proper error handling
  const loadUrlsForItems = useCallback(async (itemsToLoad: MediaItem[]): Promise<MediaItem[]> => {
    const BATCH_SIZE = 5; // Smaller batches for reliability
    const results: MediaItem[] = [];
    
    for (let i = 0; i < itemsToLoad.length; i += BATCH_SIZE) {
      if (!mountedRef.current) break; // Stop if unmounted
      
      const batch = itemsToLoad.slice(i, i + BATCH_SIZE);
      const batchResults = await Promise.all(
        batch.map(async (item) => {
          const url = await getSignedUrl(item.file_path);
          return { 
            ...item, 
            url: url || undefined, 
            isLoading: false,
            error: !url
          };
        })
      );
      results.push(...batchResults);
      
      // Update state progressively for better UX
      if (mountedRef.current && i === 0) {
        setItems(prev => {
          const existingIds = new Set(prev.map(p => p.id));
          const newItems = batchResults.filter(r => !existingIds.has(r.id));
          if (newItems.length === 0) {
            // Update existing items with URLs
            return prev.map(p => {
              const updated = batchResults.find(r => r.id === p.id);
              return updated || p;
            });
          }
          return prev;
        });
      }
    }
    
    return results;
  }, [getSignedUrl]);

  // Initial load with count
  const fetchInitialData = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      // Get total count first
      const { count, error: countError } = await supabase
        .from('event_media')
        .select('*', { count: 'exact', head: true });

      if (countError) {
        console.error('Count error:', countError);
        setError('Failed to count media items');
        throw countError;
      }
      
      if (mountedRef.current) {
        setTotalCount(count || 0);
      }

      // Fetch first page
      const { data, error: fetchError } = await supabase
        .from('event_media')
        .select('*')
        .order('created_at', { ascending: false })
        .range(0, pageSize - 1);

      if (fetchError) {
        console.error('Fetch error:', fetchError);
        setError('Failed to fetch media items');
        throw fetchError;
      }

      if (!data || data.length === 0) {
        if (mountedRef.current) {
          setItems([]);
          setHasMore(false);
        }
        return;
      }

      // Set items with loading state first for immediate feedback
      const itemsWithPlaceholder: MediaItem[] = data.map(item => ({
        ...item,
        isLoading: true,
        error: false
      }));
      
      if (mountedRef.current) {
        setItems(itemsWithPlaceholder);
        setHasMore(data.length >= pageSize);
        offsetRef.current = data.length;
      }

      // Load actual URLs
      const itemsWithUrls = await loadUrlsForItems(data);
      
      if (mountedRef.current) {
        // Keep ALL items, even those with errors (they'll show a placeholder)
        setItems(itemsWithUrls);
      }
      
    } catch (err) {
      console.error('Error fetching media:', err);
      if (mountedRef.current) {
        setError(err instanceof Error ? err.message : 'Failed to load media');
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
      loadingRef.current = false;
    }
  }, [pageSize, loadUrlsForItems]);

  // Load more items
  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore || loadingMore) return;
    loadingRef.current = true;
    setLoadingMore(true);

    try {
      const { data, error: fetchError } = await supabase
        .from('event_media')
        .select('*')
        .order('created_at', { ascending: false })
        .range(offsetRef.current, offsetRef.current + pageSize - 1);

      if (fetchError) throw fetchError;

      if (data && data.length > 0) {
        // Add placeholders first for perceived speed
        const placeholders: MediaItem[] = data.map(item => ({ 
          ...item, 
          isLoading: true,
          error: false
        }));
        
        if (mountedRef.current) {
          setItems(prev => [...prev, ...placeholders]);
        }
        
        // Load URLs
        const itemsWithUrls = await loadUrlsForItems(data);
        
        if (mountedRef.current) {
          setItems(prev => {
            // Replace placeholders with actual items
            const prevWithoutPlaceholders = prev.filter(
              p => !data.some(d => d.id === p.id)
            );
            return [...prevWithoutPlaceholders, ...itemsWithUrls];
          });
          
          offsetRef.current += data.length;
          setHasMore(data.length >= pageSize);
        }
      } else {
        if (mountedRef.current) {
          setHasMore(false);
        }
      }
    } catch (err) {
      console.error('Error loading more:', err);
    } finally {
      if (mountedRef.current) {
        setLoadingMore(false);
      }
      loadingRef.current = false;
    }
  }, [hasMore, loadingMore, pageSize, loadUrlsForItems]);

  // Refresh all data
  const refresh = useCallback(async () => {
    offsetRef.current = 0;
    urlCache.clear();
    setItems([]);
    setHasMore(true);
    await fetchInitialData();
  }, [fetchInitialData]);

  // Cleanup on unmount
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  return {
    items,
    loading,
    loadingMore,
    hasMore,
    totalCount,
    error,
    loadMore,
    refresh
  };
}
