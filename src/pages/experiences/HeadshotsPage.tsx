import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RelatedServices from '@/components/RelatedServices';
import Breadcrumbs from '@/components/Breadcrumbs';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import { Link } from 'react-router-dom';
import { Camera, Check, ArrowRight, Briefcase, Users, Sparkles, X } from 'lucide-react';
import usePageMeta from '@/hooks/usePageMeta';

// Headshot gallery images
import headshot1 from '@/assets/headshot-1.jpg';
import headshot2 from '@/assets/headshot-2.jpg';
import headshot3 from '@/assets/headshot-3.jpg';
import headshot4 from '@/assets/headshot-4.jpg';
import headshot5 from '@/assets/headshot-5.jpg';
import headshot6 from '@/assets/headshot-6.jpg';
import headshot7 from '@/assets/headshot-7.jpg';
import headshot8 from '@/assets/headshot-8.jpg';

// Before/After images
import headshotBefore from '@/assets/headshot-before.jpg';
import headshotAfter from '@/assets/headshot-after.jpg';

const headshotGallery = [
  { id: 1, src: headshot1, alt: 'AI professional headshot - executive male portrait with navy suit' },
  { id: 2, src: headshot2, alt: 'AI professional headshot - business professional with glasses' },
  { id: 3, src: headshot3, alt: 'AI professional headshot - corporate executive portrait' },
  { id: 4, src: headshot4, alt: 'AI professional headshot - business professional portrait' },
  { id: 5, src: headshot5, alt: 'AI professional headshot - female executive portrait' },
  { id: 6, src: headshot6, alt: 'AI professional headshot - corporate professional portrait' },
  { id: 7, src: headshot7, alt: 'AI professional headshot - senior executive portrait' },
  { id: 8, src: headshot8, alt: 'AI professional headshot - professional female portrait' },
];

const features = [
  {
    icon: Sparkles,
    title: 'Neural Portrait Enhancement',
    description: 'AI optimizes lighting, skin tones, and composition for executive-grade professional headshots.'
  },
  {
    icon: Camera,
    title: 'Professional Lighting Simulation',
    description: 'Software replicates studio lighting setups—even in challenging event environments.'
  },
  {
    icon: Briefcase,
    title: 'LinkedIn-Optimized Output',
    description: 'Perfect dimensions and professional aesthetics optimized for LinkedIn and corporate profiles.'
  },
  {
    icon: Users,
    title: 'Batch Team Processing',
    description: 'Efficiently capture entire teams with consistent branding and quality across all headshots.'
  },
];

const benefits = [
  'Professional results without studio setup',
  'Instant delivery via email or text',
  'Multiple background options',
  'Consistent quality for team shots',
  'Perfect for conference networking',
  'Integrates with HR and marketing systems',
];

const HeadshotsPage = () => {
  const [selectedImage, setSelectedImage] = useState<typeof headshotGallery[0] | null>(null);
  usePageMeta({
    title: 'AI Headshots NYC - Professional Portrait Photo Booth | PixelAI Pro',
    description: 'Capture LinkedIn-ready professional headshots with AI technology. Neural enhancement delivers executive-grade portraits instantly at NYC events. Perfect for corporate conferences, networking events, and team building activations.',
    ogImage: '/og-headshots.jpg',
    canonicalPath: '/experiences/headshots',
  });

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
                <Breadcrumbs items={[
                  { label: 'AI Photo Booth Services', href: '/services' },
                  { label: 'AI Headshots NYC' }
                ]} />
                <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6">
                  <Camera size={40} className="text-white" />
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  AI <span className="gradient-text">Headshots</span>
                </h1>
                <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
                  Professional Portrait Technology
                </p>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Studio-quality professional headshots, delivered instantly. Our neural engine captures 
                  and enhances portraits to executive-grade standards—perfect for LinkedIn profiles, 
                  company directories, and professional branding. No studio, no waiting, no retouching delays.
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
              
              <BeforeAfterSlider
                beforeImage={headshotBefore}
                afterImage={headshotAfter}
                beforeLabel="Original"
                afterLabel="AI Enhanced"
                beforeAlt="Original photo before AI headshot transformation"
                afterAlt="AI-enhanced professional corporate headshot with clean background"
              />
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="section-padding bg-card/50">
          <div className="container-custom">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              Our <span className="gradient-text">AI Headshots</span> Gallery
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Real examples of our AI-enhanced professional headshots, delivering studio-quality results in seconds.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {headshotGallery.map((image) => (
                <div 
                  key={image.id} 
                  className="aspect-[3/4] rounded-xl overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              How <span className="gradient-text">AI Headshots</span> Work
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Professional headshots in seconds, powered by neural portrait enhancement.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Pose', desc: 'Quick guidance for the perfect professional pose and expression.' },
                { step: '02', title: 'Capture', desc: 'High-resolution camera with AI-optimized settings for your environment.' },
                { step: '03', title: 'Enhance', desc: 'Neural processing delivers polished, LinkedIn-ready headshots instantly.' },
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
              Enterprise-grade professional photography technology for corporate events.
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
              Why Companies Choose <span className="gradient-text">AI Headshots</span>
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
              Perfect For <span className="gradient-text">Corporate Events</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {['Industry Conferences', 'Company Retreats', 'Networking Events', 'Trade Shows'].map((useCase) => (
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
                Elevate Your Professional Image
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Give every attendee a premium takeaway with LinkedIn-ready professional headshots. 
                Perfect for conferences, networking events, and corporate activations.
              </p>
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                Schedule Your Demo <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>

        {/* Related Services */}
        <RelatedServices currentSlug="headshots" />
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={24} />
          </button>
          <div 
            className="max-w-2xl max-h-[85vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-full object-contain rounded-lg"
              loading="eager"
            />
            <p className="text-center text-white/80 mt-4 text-sm">{selectedImage.alt}</p>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default HeadshotsPage;