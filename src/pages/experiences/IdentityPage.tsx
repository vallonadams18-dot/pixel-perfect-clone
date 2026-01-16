import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RelatedServices from '@/components/RelatedServices';
import { Link } from 'react-router-dom';
import { User, Check, ArrowRight, Wand2, Shield, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Wand2,
    title: '99% Face-Swap Accuracy',
    description: 'Industry-leading neural networks ensure seamless, realistic face integration with brand characters and mascots.'
  },
  {
    icon: User,
    title: 'Brand Mascot Integration',
    description: 'Transform guests into your iconic brand characters—from sports mascots to campaign heroes.'
  },
  {
    icon: Shield,
    title: 'Enterprise-Grade Processing',
    description: 'Secure, on-device processing with instant rendering—no cloud uploads required for privacy-conscious brands.'
  },
  {
    icon: Sparkles,
    title: 'Custom Character Libraries',
    description: 'Build unlimited character templates for seasonal campaigns, product launches, and themed activations.'
  },
];

const benefits = [
  'Transform guests into superheroes, athletes, or brand ambassadors',
  'Perfect for movie premieres and entertainment marketing',
  'Sports team activations with player transformations',
  'High-resolution output for print and digital',
  'Instant processing under 5 seconds',
  'Supports group photos and multiple faces',
];

const IdentityPage = () => {
  useEffect(() => {
    document.title = 'Identity - AI Face Swap Photo Booth | Brand Character Transformation';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Create unforgettable brand experiences with Identity AI face-swap technology. Transform guests into brand mascots, superheroes, or campaign characters with 99% accuracy. Perfect for entertainment marketing and brand activations.');
    }
  }, []);

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
                <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
                  AI Face-Swap & Character Transformation
                </p>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Let your audience become the hero of your brand story. Identity uses cutting-edge face-swap 
                  AI to seamlessly transform guests into brand mascots, movie characters, sports legends, 
                  or custom campaign heroes—creating viral-worthy content that drives engagement.
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
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-card to-primary/20 flex items-center justify-center">
                  <div className="text-center p-8">
                    <User size={80} className="mx-auto text-primary mb-6 animate-float" />
                    <h3 className="font-display text-2xl font-bold text-foreground">Face-Swap AI</h3>
                    <p className="text-muted-foreground mt-2">99% Accuracy Technology</p>
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
              How <span className="gradient-text">Identity</span> Works
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Seamless face transformation powered by advanced neural networks and real-time processing.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Capture', desc: 'High-resolution camera captures guest facial features and expressions.' },
                { step: '02', title: 'Transform', desc: 'AI maps facial landmarks onto your chosen character with pixel-perfect precision.' },
                { step: '03', title: 'Deliver', desc: 'Instant delivery via email, text, or social share with branded templates.' },
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
              Enterprise-grade face transformation technology trusted by global entertainment and sports brands.
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
              Why Brands Choose <span className="gradient-text">Identity</span>
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
              {['Movie Premieres & Promos', 'Sports Fan Experiences', 'Comic-Con & Gaming Events', 'Brand Mascot Activations'].map((useCase) => (
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
                Transform Your Guests Into Brand Heroes
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Create unforgettable character transformation experiences that drive social sharing and brand engagement. 
                Let's discuss your custom character library.
              </p>
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                Schedule Your Demo <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>

        {/* Related Services */}
        <RelatedServices currentSlug="identity" />
      </div>
      <Footer />
    </div>
  );
};

export default IdentityPage;