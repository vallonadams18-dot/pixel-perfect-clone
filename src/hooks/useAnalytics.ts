import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, analytics } from '@/lib/analytics';

// Hook to track page views on route changes
export const usePageViewTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view when route changes
    trackPageView(location.pathname, document.title);
  }, [location.pathname]);
};

// Hook to track scroll depth
export const useScrollDepthTracking = () => {
  useEffect(() => {
    const scrollThresholds = [25, 50, 75, 90];
    const triggeredThresholds = new Set<number>();

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = Math.round((window.scrollY / scrollHeight) * 100);

      scrollThresholds.forEach((threshold) => {
        if (scrollPercentage >= threshold && !triggeredThresholds.has(threshold)) {
          triggeredThresholds.add(threshold);
          analytics.scrollDepth(threshold);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};

// Re-export analytics for convenience
export { analytics, trackPageView, trackEvent } from '@/lib/analytics';
