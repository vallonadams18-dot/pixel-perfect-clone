import Header from '@/components/Header';
import Portfolio from '@/components/Portfolio';
import Footer from '@/components/Footer';

const PortfolioPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-32">
        <Portfolio />
      </div>
      <Footer />
    </div>
  );
};

export default PortfolioPage;
