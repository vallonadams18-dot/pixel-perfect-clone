import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Video, Check, ArrowRight, Film, Palette, Share2 } from 'lucide-react';

const features = [
  {
    icon: Film,
    title: 'Neural Network Transformation',
    description: 'Real-time video processing transforms ordinary footage into stunning stylized masterpieces.'
  },
  {
    icon: Palette,
    title: 'Multiple Artistic Styles',
    description: 'Choose from anime, oil painting, cyberpunk, watercolor, and custom brand-specific aesthetics.'
  },
  {
    icon: Video,
    title: 'Motion Story Creation',
    description: 'AI generates narrative-driven video content where guests become the protagonist of your brand story.'
  },
  {
    icon: Share2,
    title: 'Social-Optimized Output',
    description: 'Videos formatted for TikTok, Instagram Reels, and YouTube Shorts with branded intros/outros.'
  },
];

const benefits = [
  'Creates viral-worthy video content',
  'Multiple style options per session',
  'Processing time under 30 seconds',
  'Supports green screen environments',
  'Custom branded templates',
  'Analytics on video shares and views',
];

const AIVideoBoothsPage = () => {
  useEffect(() => {
    document.title = 'AI Video Booths - Neural Video Transformation | Stylized Video Content';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Transform event video into stunning stylized content with AI Video Booths. Neural networks create anime, cyberpunk, and custom artistic styles in real-time. Perfect for brand activations, trade shows, and experiential marketing.');
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
                  <Video size={40} className="text-white" />
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  AI Video <span className="gradient-text">Booths</span>
                </h1>
                <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
                  Neural Video Transformation
                </p>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Video content that stops the scroll. AI Video Booths use neural networks to transform 
                  ordinary footage into stylized masterpieces—from anime and cyberpunk to custom brand 
                  aesthetics. Turn every guest into the protagonist of a viral-worthy motion story.
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
                    <Video size={80} className="mx-auto text-primary mb-6 animate-float" />
                    <h3 className="font-display text-2xl font-bold text-foreground">Video Transformation</h3>
                    <p className="text-muted-foreground mt-2">Neural Network Powered</p>
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
              How <span className="gradient-text">AI Video Booths</span> Work
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Real-time video transformation powered by state-of-the-art neural networks.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Record', desc: 'Guest records a short video clip in our immersive booth.' },
                { step: '02', title: 'Style', desc: 'Choose from anime, cyberpunk, oil painting, or custom styles.' },
                { step: '03', title: 'Transform', desc: 'AI renders stylized video ready for social sharing.' },
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
              Cutting-edge video AI technology for unforgettable content creation.
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

        {/* Style Gallery */}
        <section className="section-padding bg-card/50">
          <div className="container-custom">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Available <span className="gradient-text">Styles</span>
            </h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
              {['Anime', 'Cyberpunk', 'Oil Painting', 'Watercolor', 'Comic Book', 'Custom'].map((style) => (
                <div key={style} className="glass rounded-xl p-4 text-center">
                  <h3 className="font-bold text-foreground text-sm">{style}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Why Brands Choose <span className="gradient-text">AI Video Booths</span>
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

        {/* CTA Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="glass rounded-3xl p-12 text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Create Scroll-Stopping Video Content
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Transform your event into a content creation powerhouse with AI-powered video 
                that guests will share across every social platform.
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

export default AIVideoBoothsPage;