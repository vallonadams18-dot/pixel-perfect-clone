import Header from '@/components/Header';
import Hero from '@/components/Hero';
import BrandTicker from '@/components/BrandTicker';
import About from '@/components/About';
import Services from '@/components/Services';
import HowItWorks from '@/components/HowItWorks';
import Portfolio from '@/components/Portfolio';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import usePageMeta from '@/hooks/usePageMeta';

const Index = () => {
  usePageMeta({
    title: 'AI Photo Booth Rental NYC | #1 Corporate Event Activation | PixelAI Pro',
    description: 'NYC\'s leading AI photo booth company. Custom brand activations for corporate events, trade shows & experiential marketing. 500+ events, 95% lead capture rate. Trusted by Fortune 500 brands. Book your demo!',
    ogImage: '/og-image.jpg',
    canonicalPath: '/',
    keywords: 'AI photo booth rental NYC, corporate event photo booth, trade show photo booth, experiential marketing NYC, brand activation photo booth, Javits Center photo booth, lead capture photo booth, 360 photo booth NYC',
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <BrandTicker />
      <About />
      <Services />
      <HowItWorks />
      <Portfolio />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
