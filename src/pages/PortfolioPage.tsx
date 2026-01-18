import Header from '@/components/Header';
import Portfolio from '@/components/Portfolio';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import usePageMeta from '@/hooks/usePageMeta';

const PortfolioPage = () => {
  usePageMeta({
    title: 'AI Photo Booth Portfolio | Event Gallery | PixelAI Pro',
    description: 'Browse our portfolio of AI photo booth transformations from corporate events, trade shows, and brand activations across NYC. See real results from Fortune 500 clients.',
    ogImage: '/og-image.jpg',
    canonicalPath: '/portfolio',
    keywords: 'AI photo booth portfolio, event photo gallery, corporate event photos, brand activation examples, trade show booth gallery, NYC event photography',
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "PixelAI Pro Portfolio",
        "description": "Browse AI photo booth transformations from corporate events, trade shows, and brand activations across NYC.",
        "mainEntity": {
          "@type": "ImageGallery",
          "name": "AI Photo Booth Event Gallery",
          "description": "Portfolio of AI-powered photo booth transformations including trading cards, headshots, style transfers, and brand activations.",
          "numberOfItems": 50,
          "about": {
            "@type": "Service",
            "name": "AI Photo Booth Rental",
            "provider": {
              "@type": "LocalBusiness",
              "@id": "https://pixelaipro.lovable.app/#business"
            }
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
            "name": "Portfolio",
            "item": "https://pixelaipro.lovable.app/portfolio"
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
            <Breadcrumbs items={[{ label: 'Portfolio' }]} />
          </div>
          <Portfolio />
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioPage;
