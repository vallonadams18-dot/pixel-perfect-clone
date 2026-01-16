import { useEffect } from 'react';

interface PageMetaOptions {
  title: string;
  description: string;
  ogImage?: string;
  ogType?: string;
  canonicalPath?: string;
}

const BASE_URL = 'https://pixelaipro.lovable.app';

export const usePageMeta = ({
  title,
  description,
  ogImage,
  ogType = 'website',
  canonicalPath,
}: PageMetaOptions) => {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Helper to set or create meta tag
    const setMeta = (selector: string, attribute: string, content: string) => {
      let meta = document.querySelector(selector) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        if (selector.includes('property=')) {
          meta.setAttribute('property', selector.match(/property="([^"]+)"/)?.[1] || '');
        } else if (selector.includes('name=')) {
          meta.setAttribute('name', selector.match(/name="([^"]+)"/)?.[1] || '');
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute(attribute, content);
    };

    // Set meta description
    setMeta('meta[name="description"]', 'content', description);

    // Set Open Graph tags
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:type"]', 'content', ogType);

    if (ogImage) {
      const fullImageUrl = ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`;
      setMeta('meta[property="og:image"]', 'content', fullImageUrl);
    }

    if (canonicalPath) {
      setMeta('meta[property="og:url"]', 'content', `${BASE_URL}${canonicalPath}`);
      
      // Set canonical link
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', `${BASE_URL}${canonicalPath}`);
    }

    // Set Twitter Card tags
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
    if (ogImage) {
      const fullImageUrl = ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`;
      setMeta('meta[name="twitter:image"]', 'content', fullImageUrl);
    }
  }, [title, description, ogImage, ogType, canonicalPath]);
};

export default usePageMeta;