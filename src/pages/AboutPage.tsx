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
    keywords: 'about PixelAI Pro, AI photo booth company, NYC event technology, experiential marketing company, photo booth rental team',
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-32">
        <div className="container-custom">
          <Breadcrumbs items={[{ label: 'About Us' }]} />
        </div>
        <About />
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;