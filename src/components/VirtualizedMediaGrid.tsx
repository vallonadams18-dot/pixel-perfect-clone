import { useRef, useEffect, memo, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Instagram, Download, Loader2, ImageOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

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
  thumbnail_path?: string | null;
  url?: string;
  thumbnailUrl?: string;
  isLoading?: boolean;
  error?: boolean;
}

interface VirtualizedMediaGridProps {
  items: MediaItem[];
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onSendToInstagram: (item: MediaItem) => void;
  onDownload: (url: string, fileName: string) => void;
  sendingId: string | null;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Memoized media card for performance
const MediaCard = memo(({ 
  item, 
  onSendToInstagram, 
  onDownload, 
  isSending 
}: { 
  item: MediaItem;
  onSendToInstagram: (item: MediaItem) => void;
  onDownload: (url: string, fileName: string) => void;
  isSending: boolean;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Reset states when URL changes
  useEffect(() => {
    if (item.url) {
      setImageLoaded(false);
      setImageError(false);
    }
  }, [item.url]);

  // Loading skeleton state
  if (item.isLoading) {
    return (
      <div className="glass rounded-2xl overflow-hidden">
        <Skeleton className="aspect-square w-full" />
        <div className="p-4 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    );
  }

  // Error state - no URL or failed to generate
  if (item.error || (!item.url && !item.thumbnailUrl)) {
    return (
      <div className="glass rounded-2xl overflow-hidden">
        <div className="aspect-square w-full bg-muted/30 flex flex-col items-center justify-center gap-2">
          <ImageOff className="w-10 h-10 text-muted-foreground/50" />
          <p className="text-xs text-muted-foreground">Failed to load</p>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-sm mb-1 truncate">{item.file_name}</h3>
          <p className="text-xs text-muted-foreground">
            {formatDate(item.created_at)}
          </p>
        </div>
      </div>
    );
  }

  // Use thumbnail for display if available, fall back to full URL
  const displayUrl = item.thumbnailUrl || item.url;

  return (
    <div className="glass rounded-2xl overflow-hidden group">
      <div className="relative aspect-square overflow-hidden bg-muted/20">
        {/* Skeleton while image loads */}
        {!imageLoaded && !imageError && (
          <Skeleton className="absolute inset-0 w-full h-full" />
        )}
        
        {/* Error fallback */}
        {imageError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/30">
            <ImageOff className="w-10 h-10 text-muted-foreground/50" />
            <p className="text-xs text-muted-foreground mt-2">Failed to load image</p>
          </div>
        )}
        
        <img 
          src={displayUrl} 
          alt={item.file_name}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
            imageLoaded && !imageError ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        {item.event_name && imageLoaded && !imageError && (
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
              {item.event_name}
            </Badge>
          </div>
        )}
        
        {imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
            <Button
              size="sm"
              onClick={() => onSendToInstagram(item)}
              disabled={isSending}
              className="w-40"
            >
              {isSending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Instagram className="w-4 h-4 mr-2" />
              )}
              Send to Instagram
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDownload(item.url!, item.file_name)}
              className="w-40 bg-white/10"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-sm mb-1 truncate">{item.file_name}</h3>
        <p className="text-xs text-muted-foreground mb-2">
          {formatDate(item.created_at)}
        </p>
        
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                {tag}
              </span>
            ))}
            {item.tags.length > 3 && (
              <span className="text-xs text-muted-foreground">+{item.tags.length - 3}</span>
            )}
          </div>
        )}
        
        {item.description && (
          <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
});

MediaCard.displayName = 'MediaCard';

export function VirtualizedMediaGrid({
  items,
  loading,
  loadingMore,
  hasMore,
  onLoadMore,
  onSendToInstagram,
  onDownload,
  sendingId
}: VirtualizedMediaGridProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  
  // Responsive columns
  const getColumns = () => {
    if (typeof window === 'undefined') return 4;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    if (window.innerWidth < 1280) return 3;
    return 4;
  };
  
  const [columns, setColumns] = useState(getColumns);
  
  useEffect(() => {
    const handleResize = () => setColumns(getColumns());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const rowCount = Math.ceil(items.length / columns);

  const rowVirtualizer = useVirtualizer({
    count: rowCount + (hasMore ? 1 : 0), // +1 for loading row
    getScrollElement: () => parentRef.current,
    estimateSize: () => 420, // Approximate height of a row (including padding)
    overscan: 3, // Increased overscan for smoother scrolling
  });

  // Trigger load more when scrolling near bottom
  useEffect(() => {
    const virtualItems = rowVirtualizer.getVirtualItems();
    const [lastItem] = [...virtualItems].reverse();
    if (!lastItem) return;
    
    if (lastItem.index >= rowCount - 1 && hasMore && !loadingMore) {
      onLoadMore();
    }
  }, [rowVirtualizer.getVirtualItems(), hasMore, loadingMore, rowCount, onLoadMore]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="glass rounded-2xl overflow-hidden">
            <Skeleton className="aspect-square w-full" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return null; // Let parent handle empty state
  }

  return (
    <div 
      ref={parentRef}
      className="h-[800px] overflow-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent"
      style={{ contain: 'strict' }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const startIndex = virtualRow.index * columns;
          const rowItems = items.slice(startIndex, startIndex + columns);
          
          // Loading row at the end
          if (virtualRow.index === rowCount && hasMore) {
            return (
              <div
                key="loading"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                className="flex items-center justify-center"
              >
                {loadingMore && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Loading more...</span>
                  </div>
                )}
              </div>
            );
          }

          // Skip empty rows
          if (rowItems.length === 0) return null;

          return (
            <div
              key={virtualRow.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div 
                className="grid gap-6 px-1"
                style={{ 
                  gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` 
                }}
              >
                {rowItems.map((item) => (
                  <MediaCard
                    key={item.id}
                    item={item}
                    onSendToInstagram={onSendToInstagram}
                    onDownload={onDownload}
                    isSending={sendingId === item.id}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
