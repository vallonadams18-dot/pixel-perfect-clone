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

const Index = () => {
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
