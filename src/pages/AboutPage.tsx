import Header from '@/components/Header';
import About from '@/components/About';
import Footer from '@/components/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-32">
        <About />
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
