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
  const offsetRef = useRef(0);
  const loadingRef = useRef(false);

  // Get cached URL or generate new one
  const getSignedUrl = useCallback(async (filePath: string): Promise<string> => {
    const cached = urlCache.get(filePath);
    const now = Date.now();
    
    if (cached && cached.expires > now) {
      return cached.url;
    }

    const { data } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(filePath, 3600);
    
    if (data?.signedUrl) {
      urlCache.set(filePath, { 
        url: data.signedUrl, 
        expires: now + CACHE_DURATION 
      });
      return data.signedUrl;
    }
    return '';
  }, [bucketName]);

  // Batch load URLs for visible items
  const loadUrlsForItems = useCallback(async (itemsToLoad: MediaItem[]): Promise<MediaItem[]> => {
    const BATCH_SIZE = 10;
    const results: MediaItem[] = [];
    
    for (let i = 0; i < itemsToLoad.length; i += BATCH_SIZE) {
      const batch = itemsToLoad.slice(i, i + BATCH_SIZE);
      const batchResults = await Promise.all(
        batch.map(async (item) => {
          const url = await getSignedUrl(item.file_path);
          return { ...item, url, isLoading: false };
        })
      );
      results.push(...batchResults);
    }
    
    return results;
  }, [getSignedUrl]);

  // Initial load with count
  const fetchInitialData = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);

    try {
      // Get total count first
      const { count, error: countError } = await supabase
        .from('event_media')
        .select('*', { count: 'exact', head: true });

      if (countError) throw countError;
      setTotalCount(count || 0);

      // Fetch first page
      const { data, error } = await supabase
        .from('event_media')
        .select('*')
        .order('created_at', { ascending: false })
        .range(0, pageSize - 1);

      if (error) throw error;

      // Load URLs for initial batch
      const itemsWithPlaceholder = (data || []).map(item => ({
        ...item,
        isLoading: true
      }));
      
      setItems(itemsWithPlaceholder);
      setHasMore((data?.length || 0) >= pageSize);
      offsetRef.current = data?.length || 0;

      // Load actual URLs
      const itemsWithUrls = await loadUrlsForItems(data || []);
      setItems(itemsWithUrls.filter(item => item.url));
      
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [pageSize, loadUrlsForItems]);

  // Load more items
  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore || loadingMore) return;
    loadingRef.current = true;
    setLoadingMore(true);

    try {
      const { data, error } = await supabase
        .from('event_media')
        .select('*')
        .order('created_at', { ascending: false })
        .range(offsetRef.current, offsetRef.current + pageSize - 1);

      if (error) throw error;

      if (data && data.length > 0) {
        // Add placeholders first for perceived speed
        const placeholders = data.map(item => ({ ...item, isLoading: true }));
        setItems(prev => [...prev, ...placeholders]);
        
        // Load URLs
        const itemsWithUrls = await loadUrlsForItems(data);
        
        setItems(prev => {
          const existingIds = new Set(prev.slice(0, offsetRef.current).map(i => i.id));
          const newItems = itemsWithUrls.filter(i => i.url);
          return [...prev.filter(i => existingIds.has(i.id)), ...newItems];
        });
        
        offsetRef.current += data.length;
        setHasMore(data.length >= pageSize);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading more:', error);
    } finally {
      setLoadingMore(false);
      loadingRef.current = false;
    }
  }, [hasMore, loadingMore, pageSize, loadUrlsForItems]);

  // Refresh all data
  const refresh = useCallback(async () => {
    offsetRef.current = 0;
    urlCache.clear();
    await fetchInitialData();
  }, [fetchInitialData]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  return {
    items,
    loading,
    loadingMore,
    hasMore,
    totalCount,
    loadMore,
    refresh
  };
}
