import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RelatedServices from '@/components/RelatedServices';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Link } from 'react-router-dom';
import { Pencil, Check, ArrowRight, Palette, Clock, Sparkles } from 'lucide-react';
import usePageMeta from '@/hooks/usePageMeta';

const features = [
  {
    icon: Pencil,
    title: 'AI-Powered Hand-Drawn Style',
    description: 'Advanced algorithms create authentic hand-drawn sketches that capture the artistry of traditional portraiture with modern speed.'
  },
  {
    icon: Palette,
    title: 'Custom Brand Integration',
    description: 'Seamlessly incorporate logos, brand colors, and thematic elements directly into the artistic style of each sketch.'
  },
  {
    icon: Clock,
    title: 'Real-Time Generation',
    description: 'Watch as your portrait transforms into a beautiful sketch in seconds—guests see the artistic process unfold before their eyes.'
  },
  {
    icon: Sparkles,
    title: 'Multiple Art Styles',
    description: 'Choose from pencil, charcoal, ink, watercolor effects, or create a custom style that matches your event aesthetic.'
  },
];

const benefits = [
  'Sophisticated keepsake guests treasure and display',
  'Classic artistic appeal with cutting-edge technology',
  'Fully customizable brand elements in every sketch',
  'Multiple artistic styles to match any event theme',
  'Instant digital delivery plus optional print station',
  'Perfect for upscale corporate and social events',
];

const IdentityPage = () => {
  usePageMeta({
    title: 'AI Sketch-a-Guest - AI Portrait Sketch Booth NYC | PixelAI Pro',
    description: 'Create sophisticated AI-generated hand-drawn sketches of guests in real-time. A unique, artistic keepsake that elegantly incorporates brand elements. Perfect for upscale NYC corporate events and galas.',
    ogImage: '/og-identity.jpg',
    canonicalPath: '/experiences/identity',
    keywords: 'AI sketch portrait booth, digital caricature artist NYC, AI hand-drawn portrait, corporate event entertainment, artistic photo booth experience',
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "AI Sketch-a-Guest",
        "serviceType": "AI Portrait Sketch Booth",
        "description": "AI-powered portrait sketching that creates authentic hand-drawn style artwork of guests in real-time, with seamless brand integration.",
        "provider": {
          "@type": "LocalBusiness",
          "@id": "https://pixelaipro.lovable.app/#business"
        },
        "areaServed": {
          "@type": "City",
          "name": "New York City"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does AI Sketch-a-Guest work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "AI Sketch-a-Guest uses advanced AI algorithms to analyze a guest's photo and generate an authentic hand-drawn style sketch in real-time. The technology captures artistic nuances like shading, line weight, and texture while allowing seamless brand integration."
            }
          },
          {
            "@type": "Question",
            "name": "Can we customize the sketch style for our brand?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely! We offer multiple artistic styles including pencil, charcoal, ink, and watercolor effects. Brand elements like logos, colors, and thematic designs can be elegantly incorporated into each sketch's artistic style."
            }
          }
        ]
      }
    ]
  });

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
                <Breadcrumbs items={[
                  { label: 'AI Photo Booth Services', href: '/services' },
                  { label: 'AI Sketch-a-Guest' }
                ]} />
                <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6">
                  <Pencil size={40} className="text-white" />
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  <span className="gradient-text">AI Sketch-a-Guest</span>
                </h1>
                <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
                  Technology Meets Classic Artistry
                </p>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Combining cutting-edge AI with timeless artistic style, Sketch-a-Guest creates beautiful 
                  hand-drawn portraits of your guests in real-time. A sophisticated, unique keepsake 
                  that elegantly incorporates your brand elements into every piece of art.
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
                    <Pencil size={80} className="mx-auto text-primary mb-6 animate-float" />
                    <h3 className="font-display text-2xl font-bold text-foreground">AI Portrait Sketching</h3>
                    <p className="text-muted-foreground mt-2">Real-Time Artistic Transformation</p>
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
              How <span className="gradient-text">Sketch-a-Guest</span> Works
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Watch technology and artistry merge as AI creates beautiful hand-drawn portraits in seconds.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Capture', desc: 'Guest poses for a quick photo at your branded station.' },
                { step: '02', title: 'Transform', desc: 'AI analyzes features and generates an authentic hand-drawn sketch with artistic flourishes.' },
                { step: '03', title: 'Deliver', desc: 'Digital delivery plus optional high-quality print as a sophisticated keepsake.' },
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
              A perfect blend of classic portraiture and modern AI technology for unforgettable guest experiences.
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
              Why Clients Choose <span className="gradient-text">Sketch-a-Guest</span>
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
              {['Corporate Galas & Awards', 'Luxury Brand Activations', 'Wedding & Social Events', 'Art Gallery Openings'].map((useCase) => (
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
                Give Your Guests a Timeless Keepsake
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Elevate your event with sophisticated AI-powered portrait sketches that combine 
                classic artistry with modern technology. Let's create something beautiful together.
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
