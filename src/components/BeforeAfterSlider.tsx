import { useState, useRef, useEffect } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeAlt?: string;
  afterAlt?: string;
  autoplay?: boolean;
  autoplayDuration?: number;
}

const BeforeAfterSlider = ({ 
  beforeImage, 
  afterImage, 
  beforeLabel = "Before", 
  afterLabel = "After",
  beforeAlt = "Original photo before AI transformation NYC photo booth",
  afterAlt = "AI transformed portrait after photo booth experience NYC",
  autoplay = true,
  autoplayDuration = 3000
}: BeforeAfterSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(85);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  // Intersection Observer for autoplay
  useEffect(() => {
    if (!autoplay || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated && !isUserInteracting) {
            setIsAnimating(true);
            setHasAnimated(true);
            
            // Animate from 85% (showing mostly before) to 15% (showing mostly after)
            const startTime = performance.now();
            const startPosition = 85;
            const endPosition = 15;
            
            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / autoplayDuration, 1);
              
              // Easing function for smooth animation
              const easeInOutCubic = (t: number) => 
                t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
              
              const easedProgress = easeInOutCubic(progress);
              const newPosition = startPosition + (endPosition - startPosition) * easedProgress;
              
              setSliderPosition(newPosition);
              
              if (progress < 1) {
                animationRef.current = requestAnimationFrame(animate);
              } else {
                setIsAnimating(false);
              }
            };
            
            animationRef.current = requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [autoplay, autoplayDuration, hasAnimated, isUserInteracting]);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    
    // Stop autoplay animation on user interaction
    if (isAnimating && animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      setIsAnimating(false);
    }
    setIsUserInteracting(true);
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    handleMove(e.touches[0].clientX);
  };

  const handleTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    setIsUserInteracting(true);
    if (isAnimating && animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      setIsAnimating(false);
    }
  };

  // Attach touch events with passive: false to allow preventDefault
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isAnimating]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden cursor-ew-resize select-none group touch-none"
      onMouseMove={handleMouseMove}
    >
      {/* After Image (Background) */}
      <img 
        src={afterImage} 
        alt={afterAlt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Before Image (Clipped) */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img 
          src={beforeImage} 
          alt={beforeAlt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      
      {/* Slider Line */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        {/* Slider Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-primary rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-sm font-medium">
        {beforeLabel}
      </div>
      <div className="absolute top-4 right-4 bg-primary/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-sm font-medium">
        {afterLabel}
      </div>
      
      {/* Instruction */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        ← Drag to compare →
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
