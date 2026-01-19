import { useEffect } from 'react';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface PageMetaOptions {
  title: string;
  description: string;
  ogImage?: string;
  ogType?: string;
  canonicalPath?: string;
  schema?: object | object[];
  keywords?: string;
  breadcrumbs?: BreadcrumbItem[];
}

const BASE_URL = 'https://pixelaipro.lovable.app';

/**
 * Generate BreadcrumbList JSON-LD schema
 */
const generateBreadcrumbSchema = (breadcrumbs: BreadcrumbItem[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`
    }))
  };
};

export const usePageMeta = ({
  title,
  description,
  ogImage,
  ogType = 'website',
  canonicalPath,
  schema,
  keywords,
  breadcrumbs,
}: PageMetaOptions) => {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Google Search Console verification meta tag
    // Replace YOUR_VERIFICATION_CODE with your actual code from Google Search Console
    let googleVerification = document.querySelector('meta[name="google-site-verification"]') as HTMLMetaElement;
    if (!googleVerification) {
      googleVerification = document.createElement('meta');
      googleVerification.name = 'google-site-verification';
      document.head.appendChild(googleVerification);
    }
    // TODO: Replace with your actual Google Search Console verification code
    googleVerification.content = 'YOUR_VERIFICATION_CODE';

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

    // Set keywords if provided
    if (keywords) {
      setMeta('meta[name="keywords"]', 'content', keywords);
    }

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

    // Combine schemas (including breadcrumbs)
    const allSchemas: object[] = [];
    
    if (breadcrumbs && breadcrumbs.length > 0) {
      allSchemas.push(generateBreadcrumbSchema(breadcrumbs));
    }
    
    if (schema) {
      if (Array.isArray(schema)) {
        allSchemas.push(...schema);
      } else {
        allSchemas.push(schema);
      }
    }

    // Inject JSON-LD schema
    if (allSchemas.length > 0) {
      const schemaId = 'page-schema-ld';
      
      // Remove existing page-specific schema
      const existingSchema = document.getElementById(schemaId);
      if (existingSchema) {
        existingSchema.remove();
      }

      // Create new schema script
      const scriptEl = document.createElement('script');
      scriptEl.id = schemaId;
      scriptEl.type = 'application/ld+json';
      scriptEl.textContent = JSON.stringify(allSchemas.length === 1 ? allSchemas[0] : allSchemas);
      document.head.appendChild(scriptEl);

      // Cleanup on unmount
      return () => {
        const schemaToRemove = document.getElementById(schemaId);
        if (schemaToRemove) {
          schemaToRemove.remove();
        }
      };
    }
  }, [title, description, ogImage, ogType, canonicalPath, schema, keywords, breadcrumbs]);
};

export default usePageMeta;
