import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { User, Check, ArrowRight } from 'lucide-react';

const features = [
  '99% face-swap accuracy',
  'Brand mascot integration',
  'Campaign hero transformations',
  'Instant processing and rendering',
  'High-resolution output',
  'Custom character libraries',
];

const IdentityPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="section-padding relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[150px]" />
          
          <div className="container-custom relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <Link to="/services" className="inline-flex items-center gap-2 text-primary mb-6 hover:underline">
                  ← Back to Services
                </Link>
                <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6">
                  <User size={40} className="text-white" />
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  <span className="gradient-text">Identity</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Roleplay AI. Seamlessly swap guest faces onto brand mascots or campaign heroes with 99% accuracy.
                </p>
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                  Book This Experience <ArrowRight size={20} />
                </Link>
              </div>
              
              <div className="relative aspect-square rounded-3xl overflow-hidden glass glow">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-card to-primary/20 flex items-center justify-center">
                  <div className="text-center p-8">
                    <User size={80} className="mx-auto text-primary mb-6 animate-float" />
                    <h3 className="font-display text-2xl font-bold text-foreground">Face Swap AI</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Key <span className="gradient-text">Features</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <div key={feature} className="glass rounded-xl p-6 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Check size={16} className="text-primary" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="glass rounded-3xl p-12 text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready to Transform Your Event?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let's discuss how Identity can bring your brand characters to life with AI face-swap technology.
              </p>
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                Get Started <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default IdentityPage;
