import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RelatedServices from '@/components/RelatedServices';
import Breadcrumbs from '@/components/Breadcrumbs';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import { Link } from 'react-router-dom';
import { Shirt, Check, ArrowRight, Zap, Share2, Palette } from 'lucide-react';
import usePageMeta from '@/hooks/usePageMeta';
import pixelwearDemo from '@/assets/pixelwear-demo.jpg';
import pixelwearBefore from '@/assets/pixelwear-before.jpg';
import pixelwearGucci from '@/assets/pixelwear-gucci.jpg';
import pixelwearGucciBefore from '@/assets/pixelwear-gucci-before.jpg';
import pixelwearNike from '@/assets/pixelwear-nike.jpg';
import pixelwearNikeBefore from '@/assets/pixelwear-nike-before.jpg';
import pixelwearLV from '@/assets/pixelwear-lv.jpg';
import pixelwearLVBefore from '@/assets/pixelwear-lv-before.jpg';
import pixelwearVersace from '@/assets/pixelwear-versace.jpg';
import pixelwearVersaceBefore from '@/assets/pixelwear-versace-before.jpg';
import pixelwearSupreme from '@/assets/pixelwear-supreme.jpg';
import pixelwearSupremeBefore from '@/assets/pixelwear-supreme-before.jpg';
import pixelwearPuma from '@/assets/pixelwear-puma.jpg';
import pixelwearPumaBefore from '@/assets/pixelwear-puma-before.jpg';

const brandGallery = [
  { before: pixelwearNikeBefore, after: pixelwearNike, brand: 'Nike' },
  { before: pixelwearGucciBefore, after: pixelwearGucci, brand: 'Gucci' },
  { before: pixelwearLVBefore, after: pixelwearLV, brand: 'Louis Vuitton' },
  { before: pixelwearVersaceBefore, after: pixelwearVersace, brand: 'Versace' },
  { before: pixelwearSupremeBefore, after: pixelwearSupreme, brand: 'Supreme' },
  { before: pixelwearPumaBefore, after: pixelwearPuma, brand: 'Puma' },
];

const features = [
  {
    icon: Zap,
    title: 'Instant Virtual Try-On',
    description: 'AI-powered technology renders realistic apparel on guests in under 3 seconds with photorealistic accuracy.'
  },
  {
    icon: Shirt,
    title: 'Unlimited Apparel Options',
    description: 'Showcase your entire merchandise catalog without physical inventory—jerseys, t-shirts, hoodies, and more.'
  },
  {
    icon: Palette,
    title: 'Custom Branding Overlays',
    description: 'Add logos, event themes, and sponsor branding seamlessly integrated into every virtual try-on image.'
  },
  {
    icon: Share2,
    title: 'Social-Ready Content',
    description: 'Optimized image formats for Instagram, TikTok, and LinkedIn with built-in sharing capabilities.'
  },
];

const benefits = [
  'Zero logistics—no sizes, inventory, or shipping required',
  'Increase merchandise engagement by 400%',
  'Perfect for product launches and retail activations',
  'Works with existing brand assets and photography',
  'Real-time analytics on try-on engagement',
  'Seamless integration with e-commerce platforms',
];

const PixelWearPage = () => {
  usePageMeta({
    title: 'PixelWear - AI Virtual Try-On Photo Booth NYC | PixelAI Pro',
    description: 'Transform event engagement with PixelWear AI virtual try-on technology. Guests instantly see themselves in your branded apparel—no inventory needed. Perfect for NYC retail activations, product launches, and brand experiences.',
    ogImage: '/og-pixelwear.jpg',
    canonicalPath: '/experiences/pixelwear',
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
                  { label: 'PixelWear Virtual Try-On' }
                ]} />
                <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6">
                  <Shirt size={40} className="text-white" />
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  Pixel<span className="gradient-text">Wear</span>
                </h1>
                <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
                  AI Virtual Try-On Experience
                </p>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  The future of retail engagement. PixelWear uses advanced AI to let guests instantly "try on" 
                  your branded apparel—creating shareable moments without the logistics of physical inventory. 
                  Perfect for product launches, sports events, and retail activations.
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
                beforeImage={pixelwearBefore}
                afterImage={pixelwearDemo}
                beforeLabel="Original"
                afterLabel="Dior"
                beforeAlt="Original photo before PixelWear AI virtual try-on"
                afterAlt="AI transformed photo with Dior branded apparel via PixelWear"
              />
              
            </div>
          </div>
        </section>

        {/* Brand Gallery Section */}
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              Multi-Brand <span className="gradient-text">Gallery</span>
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              See how PixelWear transforms guests into brand ambassadors for the world's most iconic fashion and sportswear brands.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {brandGallery.map((item) => (
                <div key={item.brand} className="relative">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                    <BeforeAfterSlider
                      beforeImage={item.before}
                      afterImage={item.after}
                      beforeLabel="Original"
                      afterLabel={item.brand}
                      beforeAlt={`Original photo before ${item.brand} virtual try-on`}
                      afterAlt={`AI transformed with ${item.brand} branded apparel`}
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <span className="inline-block bg-primary/90 text-white text-sm font-semibold px-4 py-2 rounded-full">
                      {item.brand}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="section-padding bg-card/50">
          <div className="container-custom">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              How <span className="gradient-text">PixelWear</span> Works
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Three simple steps to transform your brand activation with AI-powered virtual try-on technology.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Capture', desc: 'Guest stands in front of our AI photo booth for a quick portrait capture.' },
                { step: '02', title: 'Select', desc: 'Choose from your branded apparel catalog displayed on the interactive screen.' },
                { step: '03', title: 'Share', desc: 'AI renders the virtual try-on in seconds—ready to share on social media.' },
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
              Enterprise-grade virtual try-on technology designed for high-traffic brand activations and events.
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
              Why Brands Choose <span className="gradient-text">PixelWear</span>
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
              Perfect For <span className="gradient-text">Every Industry</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {['Sports Teams & Leagues', 'Retail & Fashion Brands', 'Corporate Events', 'Music & Entertainment'].map((useCase) => (
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
                Ready to Revolutionize Your Brand Activation?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join leading brands using PixelWear to create unforgettable virtual try-on experiences. 
                Get a custom demo tailored to your merchandise and event goals.
              </p>
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                Schedule Your Demo <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>

        {/* Related Services */}
        <RelatedServices currentSlug="pixelwear" />
      </div>
      <Footer />
    </div>
  );
};

export default PixelWearPage;