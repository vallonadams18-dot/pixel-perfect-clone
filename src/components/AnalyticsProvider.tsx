import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { usePageViewTracking, useScrollDepthTracking } from '@/hooks/useAnalytics';

// Component to handle analytics tracking
const AnalyticsProvider = ({ children }: { children: React.ReactNode }) => {
  usePageViewTracking();
  useScrollDepthTracking();
  
  return <>{children}</>;
};

export default AnalyticsProvider;
