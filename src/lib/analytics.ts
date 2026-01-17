// Google Analytics 4 Event Tracking Utility
// Replace G-XXXXXXXXXX in index.html with your actual GA4 Measurement ID

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

// Track page views (called automatically by GA4, but useful for SPA navigation)
export const trackPageView = (path: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-XXXXXXXXXX', {
      page_path: path,
      page_title: title,
    });
  }
};

// Track custom events
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, string | number | boolean>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

// Pre-defined event helpers for common actions
export const analytics = {
  // Lead generation events
  contactFormSubmit: (formLocation: string) => {
    trackEvent('generate_lead', {
      event_category: 'engagement',
      event_label: formLocation,
    });
  },

  // CTA clicks
  ctaClick: (ctaName: string, location: string) => {
    trackEvent('cta_click', {
      event_category: 'engagement',
      cta_name: ctaName,
      location: location,
    });
  },

  // PDF downloads
  pdfDownload: (documentName: string) => {
    trackEvent('file_download', {
      event_category: 'engagement',
      file_name: documentName,
      file_extension: 'pdf',
    });
  },

  // Service page views
  serviceView: (serviceName: string) => {
    trackEvent('view_item', {
      event_category: 'services',
      item_name: serviceName,
    });
  },

  // Portfolio/case study views
  caseStudyView: (studyName: string) => {
    trackEvent('view_item', {
      event_category: 'case_studies',
      item_name: studyName,
    });
  },

  // Social shares
  socialShare: (platform: string, contentType: string) => {
    trackEvent('share', {
      method: platform,
      content_type: contentType,
    });
  },

  // Scroll depth tracking
  scrollDepth: (percentage: number) => {
    trackEvent('scroll', {
      percent_scrolled: percentage,
    });
  },
};

export default analytics;
