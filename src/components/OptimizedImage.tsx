import { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  width?: number;
  height?: number;
  priority?: boolean;
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

/**
 * OptimizedImage component with lazy loading and blur placeholder
 * For optimal performance on image-heavy pages
 */
const OptimizedImage = ({
  src,
  alt,
  className = '',
  loading = 'lazy',
  width,
  height,
  priority = false,
  onError,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  return (
    <img
      ref={imgRef}
      src={isInView ? src : undefined}
      data-src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : loading}
      decoding="async"
      onLoad={() => setIsLoaded(true)}
      onError={onError}
      className={`${className} transition-opacity duration-300 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
};

export default OptimizedImage;