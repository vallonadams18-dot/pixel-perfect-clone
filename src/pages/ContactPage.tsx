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
    keywords: 'contact PixelAI Pro, AI photo booth quote, event photo booth inquiry, corporate event consultation, book photo booth NYC',
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-32">
        <div className="container-custom">
          <Breadcrumbs items={[{ label: 'Contact Us' }]} />
        </div>
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;