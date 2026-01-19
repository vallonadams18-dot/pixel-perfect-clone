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
  /** WebP source URL - if provided, will use picture element with WebP */
  webpSrc?: string;
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
  webpSrc,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const pictureRef = useRef<HTMLPictureElement>(null);

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

    const targetRef = webpSrc ? pictureRef.current : imgRef.current;
    if (targetRef) {
      observer.observe(targetRef);
    }

    return () => observer.disconnect();
  }, [priority, webpSrc]);

  const imageClasses = `${className} transition-opacity duration-300 ${
    isLoaded ? 'opacity-100' : 'opacity-0'
  }`;

  // If WebP source is provided, use picture element for better browser support
  if (webpSrc) {
    return (
      <picture ref={pictureRef}>
        {isInView && (
          <>
            <source srcSet={webpSrc} type="image/webp" />
            <source srcSet={src} type="image/jpeg" />
          </>
        )}
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
          className={imageClasses}
        />
      </picture>
    );
  }

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
      className={imageClasses}
    />
  );
};

export default OptimizedImage;