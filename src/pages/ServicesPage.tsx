import Header from '@/components/Header';
import Services from '@/components/Services';
import Footer from '@/components/Footer';
import usePageMeta from '@/hooks/usePageMeta';

const ServicesPage = () => {
  usePageMeta({
    title: 'AI Photo Booth Services NYC | Corporate Event Activations | PixelAI Pro',
    description: 'Explore PixelAI Pro\'s AI photo booth services: AI Headshots, Trading Cards, Virtual Try-On, Character Transformations & more. Custom brand activations for NYC corporate events & trade shows.',
    ogImage: '/og-image.jpg',
    canonicalPath: '/services',
    keywords: 'AI photo booth services, corporate event activation NYC, trade show lead capture, brand activation services, experiential marketing solutions, AI headshots, virtual try-on booth, trading cards photo booth',
    schema: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "AI Photo Booth Services",
      "description": "Complete AI-powered photo booth experiences for corporate events and brand activations",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "PixelWear Virtual Try-On",
          "url": "https://pixelaipro.lovable.app/experiences/pixelwear"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "AI Headshots",
          "url": "https://pixelaipro.lovable.app/experiences/headshots"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Persona Pop Character Transformation",
          "url": "https://pixelaipro.lovable.app/experiences/persona-pop"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "AI Trading Cards",
          "url": "https://pixelaipro.lovable.app/experiences/ai-trading-cards"
        }
      ]
    }
  });
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-32">
        <Services />
      </div>
      <Footer />
    </div>
  );
};

export default ServicesPage;
