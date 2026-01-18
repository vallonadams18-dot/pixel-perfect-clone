import Header from '@/components/Header';
import Services from '@/components/Services';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import usePageMeta from '@/hooks/usePageMeta';

const ServicesPage = () => {
  usePageMeta({
    title: 'AI Photo Booth Services NYC | Corporate Event Activations | PixelAI Pro',
    description: 'Explore PixelAI Pro\'s AI photo booth services: AI Headshots, Trading Cards, Virtual Try-On, Character Transformations & more. Custom brand activations for NYC corporate events & trade shows.',
    ogImage: '/og-image.jpg',
    canonicalPath: '/services',
    keywords: 'AI photo booth services, photo booth rental NYC, corporate event activation NYC, trade show lead capture, brand activation services, experiential marketing solutions, AI headshots, virtual try-on booth, trading cards photo booth, glam photo booth NYC, 360 photo booth rental, corporate photo booth, event photo booth near me',
    schema: [
      {
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
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What AI photo booth services do you offer?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We offer 8 distinct AI-powered experiences: AI Headshots, PixelWear Virtual Try-On, Persona Pop Character Transformations, AI Trading Cards, Co-Star Celebrity Photos, AI Sketch-a-Guest, AI Video Booths, and AXON AI Autonomous Robot. Each can be customized for your brand."
            }
          },
          {
            "@type": "Question",
            "name": "Can I combine multiple AI photo booth services at one event?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely! Many clients choose multi-experience activations to maximize engagement. For example, combining AI Headshots for professionals with Persona Pop for entertainment creates varied touchpoints throughout your event."
            }
          },
          {
            "@type": "Question",
            "name": "How do I choose the right AI photo booth service for my event?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Consider your audience and goals: AI Headshots for professional conferences, Trading Cards for sports/gaming events, PixelWear for retail/fashion, and Persona Pop for entertainment. Our team provides free consultations to recommend the perfect fit."
            }
          }
        ]
      }
    ]
  });
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-32">
        <div className="container-custom">
          <Breadcrumbs items={[{ label: 'Services' }]} />
        </div>
        <Services />
      </div>
      <Footer />
    </div>
  );
};

export default ServicesPage;
