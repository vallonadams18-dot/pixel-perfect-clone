import Header from '@/components/Header';
import About from '@/components/About';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import usePageMeta from '@/hooks/usePageMeta';

const AboutPage = () => {
  usePageMeta({
    title: 'About PixelAI Pro | AI Photo Booth Company NYC',
    description: 'Learn about PixelAI Pro, NYC\'s premier AI photo booth company. Our mission, technology, and team behind 500+ successful corporate events and brand activations.',
    ogImage: '/og-image.jpg',
    canonicalPath: '/about',
    keywords: 'about PixelAI Pro, AI photo booth company, NYC event technology, experiential marketing company, photo booth rental team, corporate event technology NYC',
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "About PixelAI Pro",
        "description": "Learn about PixelAI Pro, NYC's premier AI photo booth company specializing in experiential marketing activations.",
        "mainEntity": {
          "@type": "Organization",
          "@id": "https://pixelaipro.lovable.app/#organization",
          "name": "PixelAI Pro",
          "description": "NYC's premier AI photo booth company specializing in experiential marketing activations for corporate events, trade shows, and brand experiences.",
          "url": "https://pixelaipro.lovable.app",
          "foundingDate": "2020",
          "numberOfEmployees": {
            "@type": "QuantitativeValue",
            "minValue": 10,
            "maxValue": 50
          },
          "areaServed": [
            { "@type": "City", "name": "New York City" },
            { "@type": "State", "name": "New York" },
            { "@type": "State", "name": "New Jersey" },
            { "@type": "Country", "name": "United States" }
          ],
          "knowsAbout": [
            "AI Photography",
            "Experiential Marketing",
            "Brand Activations",
            "Corporate Events",
            "Trade Show Exhibitions"
          ]
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
            "name": "About Us",
            "item": "https://pixelaipro.lovable.app/about"
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
            <Breadcrumbs items={[{ label: 'About Us' }]} />
          </div>
          <About />
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
