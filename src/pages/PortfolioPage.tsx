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
    keywords: 'AI photo booth portfolio, event photo gallery, corporate event photos, brand activation examples, trade show booth gallery',
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-32">
        <div className="container-custom">
          <Breadcrumbs items={[{ label: 'Portfolio' }]} />
        </div>
        <Portfolio />
      </div>
      <Footer />
    </div>
  );
};

export default PortfolioPage;