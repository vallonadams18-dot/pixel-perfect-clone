import Header from '@/components/Header';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import usePageMeta from '@/hooks/usePageMeta';

const ContactPage = () => {
  usePageMeta({
    title: 'Contact PixelAI Pro | Get AI Photo Booth Quote NYC',
    description: 'Contact PixelAI Pro for a free AI photo booth consultation and quote. Serving NYC, nationwide, and international events. Get started with your custom brand activation today.',
    ogImage: '/og-image.jpg',
    canonicalPath: '/contact',
    keywords: 'contact PixelAI Pro, AI photo booth quote, event photo booth inquiry, corporate event consultation, book photo booth NYC, free demo request',
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact PixelAI Pro",
        "description": "Get a free AI photo booth consultation and quote for your NYC corporate event, trade show, or brand activation.",
        "mainEntity": {
          "@type": "LocalBusiness",
          "@id": "https://pixelaipro.lovable.app/#business",
          "name": "PixelAI Pro",
          "telephone": "+1-917-724-6051",
          "email": "pixelaipronyc@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "New York",
            "addressRegion": "NY",
            "addressCountry": "US"
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
          }
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://pixelaipro.lovable.app"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Contact Us",
            "item": "https://pixelaipro.lovable.app/contact"
          }
        ]
      }
    ]
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32">
        <article>
          <div className="container-custom">
            <Breadcrumbs items={[{ label: 'Contact Us' }]} />
          </div>
          <Contact />
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
