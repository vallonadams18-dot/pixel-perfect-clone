import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { CreditCard, Check, ArrowRight, BarChart3, Printer, QrCode } from 'lucide-react';

const features = [
  {
    icon: BarChart3,
    title: 'Data-Driven Stats',
    description: 'Generate unique stats based on guest interactions, quiz answers, or brand engagement metrics.'
  },
  {
    icon: CreditCard,
    title: 'Premium Card Design',
    description: 'Bespoke card templates featuring your brand identity, campaign themes, and collectible aesthetics.'
  },
  {
    icon: Printer,
    title: 'Instant Print & Digital',
    description: 'High-quality physical cards printed on-site plus digital versions for social sharing.'
  },
  {
    icon: QrCode,
    title: 'QR Code Integration',
    description: 'Each card links to exclusive content, AR experiences, or lead capture landing pages.'
  },
];

const benefits = [
  'Gamifies brand engagement with collectible mechanics',
  'Perfect for loyalty programs and fan clubs',
  'Supports series and rarity tier systems',
  'Drives repeat visits to collect all cards',
  'Built-in lead capture and data collection',
  'Premium keepsake guests actually keep',
];

const PersonaPopPage = () => {
  useEffect(() => {
    document.title = 'Persona Pop - AI Trading Card Photo Booth | Custom Collectible Cards';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Transform guests into collectible trading cards with Persona Pop. AI-generated portraits with custom stats, branded designs, and instant print/digital delivery. Perfect for sports teams, gaming events, and brand activations.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="section-padding relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px]" />
          
          <div className="container-custom relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <Link to="/services" className="inline-flex items-center gap-2 text-primary mb-6 hover:underline">
                  ← Back to Services
                </Link>
                <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6">
                  <CreditCard size={40} className="text-white" />
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  Persona <span className="gradient-text">Pop</span>
                </h1>
                <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
                  AI Trading Card Generator
                </p>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Turn your guests into collectible legends. Persona Pop captures portraits and instantly 
                  generates premium trading cards with personalized stats, bespoke designs, and your brand 
                  identity—creating keepsakes that drive engagement and repeat visits.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                    Book This Experience <ArrowRight size={20} />
                  </Link>
                  <Link to="/portfolio" className="btn-secondary inline-flex items-center gap-2">
                    View Examples
                  </Link>
                </div>
              </div>
              
              <div className="relative aspect-square rounded-3xl overflow-hidden glass glow">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-card to-accent/20 flex items-center justify-center">
                  <div className="text-center p-8">
                    <CreditCard size={80} className="mx-auto text-primary mb-6 animate-float" />
                    <h3 className="font-display text-2xl font-bold text-foreground">Trading Cards</h3>
                    <p className="text-muted-foreground mt-2">Personalized Collectibles</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="section-padding bg-card/50">
          <div className="container-custom">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              How <span className="gradient-text">Persona Pop</span> Works
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Create collectible trading cards that guests will treasure and share.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Capture', desc: 'Portrait photo and optional quiz for personalized stats.' },
                { step: '02', title: 'Generate', desc: 'AI creates unique trading card with your brand design.' },
                { step: '03', title: 'Collect', desc: 'Print on-site and share digitally for social engagement.' },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="text-6xl font-display font-bold gradient-text mb-4">{item.step}</div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              Key <span className="gradient-text">Features</span>
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Everything you need to create premium collectible experiences.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature) => (
                <div key={feature.title} className="glass rounded-xl p-8 flex items-start gap-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                    <feature.icon size={28} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="section-padding bg-card/50">
          <div className="container-custom">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Why Brands Choose <span className="gradient-text">Persona Pop</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit) => (
                <div key={benefit} className="glass rounded-xl p-6 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Check size={16} className="text-primary" />
                  </div>
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Popular <span className="gradient-text">Use Cases</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {['Sports Fan Experiences', 'Gaming & Esports', 'Loyalty Programs', 'Conference Networking'].map((useCase) => (
                <div key={useCase} className="glass rounded-xl p-6 text-center">
                  <h3 className="font-bold text-foreground">{useCase}</h3>
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
                Create Collectible Moments That Last
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Turn every guest into a collectible legend with personalized trading cards 
                that drive engagement, loyalty, and social sharing.
              </p>
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                Schedule Your Demo <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default PersonaPopPage;