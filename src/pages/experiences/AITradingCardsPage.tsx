import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Sparkles, Check, ArrowRight, Layers, Smartphone, Gem } from 'lucide-react';

// AI Trading Cards Gallery Images
import tradingCardSportsDisplay from '@/assets/ai-trading-cards-sports-collectibles-display.jpg';
import tradingCardPrinter from '@/assets/ai-trading-cards-printer-custom-design.jpg';
import tradingCardBaseball from '@/assets/ai-trading-cards-baseball-custom-portrait.jpg';
import tradingCardAthlete from '@/assets/ai-trading-cards-athlete-personalized-cards.jpg';
import tradingCardCollection from '@/assets/ai-trading-cards-collection-sports-showcase.jpg';
import tradingCardMultiSport from '@/assets/ai-trading-cards-multi-sport-collection.jpg';
import tradingCardHero from '@/assets/ai-trading-cards-hero-collection.jpg';

const galleryImages = [
  {
    src: tradingCardMultiSport,
    alt: 'AI trading cards collection featuring custom sports portraits with baseball, football, basketball and hockey player designs'
  },
  {
    src: tradingCardCollection,
    alt: 'Premium AI-generated trading cards display showcasing collectible athlete portraits with holographic effects'
  },
  {
    src: tradingCardSportsDisplay,
    alt: 'Person holding custom AI trading cards featuring personalized basketball and sports player portraits'
  },
  {
    src: tradingCardBaseball,
    alt: 'Custom AI trading cards with baseball player portrait and personalized athlete card designs'
  },
  {
    src: tradingCardAthlete,
    alt: 'AI-generated personalized trading cards featuring athletic portrait transformations and custom stats'
  },
  {
    src: tradingCardPrinter,
    alt: 'AI trading card printer producing custom collectible cards with professional sports player designs'
  },
];

const features = [
  {
    icon: Sparkles,
    title: 'Stylized AI Portraits',
    description: 'Neural networks transform guest photos into stunning illustrated trading card art with unique aesthetics.'
  },
  {
    icon: Layers,
    title: 'Rarity Tier System',
    description: 'Create collectible excitement with common, rare, legendary, and limited edition card tiers.'
  },
  {
    icon: Gem,
    title: 'Premium Print Quality',
    description: 'Museum-grade card stock with holographic effects, foil stamping, and premium finishes.'
  },
  {
    icon: Smartphone,
    title: 'NFC & AR Integration',
    description: 'Tap-to-unlock digital experiences with NFC chips and augmented reality card features.'
  },
];

const benefits = [
  'Collector-grade quality guests cherish',
  'Multiple art styles and aesthetics',
  'Gamification drives repeat engagement',
  'Perfect for sports and entertainment',
  'Digital twin for online collecting',
  'Custom stat and lore generation',
];

const AITradingCardsPage = () => {
  useEffect(() => {
    document.title = 'AI Trading Cards - Collectible Card Photo Booth | Premium Trading Cards';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Create premium AI-generated trading cards with stylized portraits, custom stats, and collectible rarity tiers. Perfect for sports teams, gaming events, and brand activations. NFC and AR integration available.');
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
                  <Sparkles size={40} className="text-white" />
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  AI Trading <span className="gradient-text">Cards</span>
                </h1>
                <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
                  Premium Collectible Experience
                </p>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Transform guests into high-fidelity collectible legends. AI Trading Cards combines 
                  neural portrait artistry with premium printing to create museum-grade collectibles 
                  featuring custom stats, rarity tiers, and optional NFC/AR integration for the ultimate 
                  collector experience.
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
              
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden glass glow">
                <img 
                  src={tradingCardHero} 
                  alt="AI trading cards collection featuring custom sports portraits with baseball, football, basketball and hockey player designs"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Rarity Tiers */}
        <section className="section-padding bg-card/50">
          <div className="container-custom">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              Collectible <span className="gradient-text">Rarity Tiers</span>
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Create collector excitement with tiered rarity systems that drive engagement.
            </p>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { tier: 'Common', color: 'from-gray-500/20 to-gray-600/20', desc: 'Standard edition cards' },
                { tier: 'Rare', color: 'from-blue-500/20 to-blue-600/20', desc: 'Enhanced foil effects' },
                { tier: 'Legendary', color: 'from-purple-500/20 to-purple-600/20', desc: 'Holographic finish' },
                { tier: 'Limited', color: 'from-yellow-500/20 to-yellow-600/20', desc: 'Numbered editions' },
              ].map((item) => (
                <div key={item.tier} className={`glass rounded-xl p-6 text-center bg-gradient-to-br ${item.color}`}>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">{item.tier}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              How <span className="gradient-text">AI Trading Cards</span> Work
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Premium collectibles created in minutes with neural portrait technology.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Capture', desc: 'Portrait photo and optional personality quiz for stats.' },
                { step: '02', title: 'Stylize', desc: 'AI transforms photo into stunning illustrated card art.' },
                { step: '03', title: 'Collect', desc: 'Premium printed card with optional NFC/AR features.' },
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
        <section className="section-padding bg-card/50">
          <div className="container-custom">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              Key <span className="gradient-text">Features</span>
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Premium collectible technology for unforgettable brand experiences.
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
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Why Brands Choose <span className="gradient-text">AI Trading Cards</span>
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

        {/* Gallery Section */}
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              Trading Card <span className="gradient-text">Gallery</span>
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Explore our collection of AI-generated trading cards featuring custom sports portraits and collectible designs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image, index) => (
                <div key={index} className="group relative overflow-hidden rounded-2xl glass">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    loading="lazy"
                    className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="section-padding bg-card/50">
          <div className="container-custom">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Popular <span className="gradient-text">Use Cases</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {['Sports Teams & Leagues', 'Gaming & Esports', 'Comic-Con & Conventions', 'Entertainment Marketing'].map((useCase) => (
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
                Create Legendary Collectible Experiences
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Transform your guests into collector-grade legends with AI Trading Cards. 
                Explore rarity systems, premium finishes, and NFC/AR integrations.
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

export default AITradingCardsPage;