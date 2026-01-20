import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RelatedServices from '@/components/RelatedServices';
import Breadcrumbs from '@/components/Breadcrumbs';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import FAQSection from '@/components/FAQSection';
import ExperienceDemo from '@/components/ExperienceDemo';
import { Link } from 'react-router-dom';
import { Pencil, Check, ArrowRight, Palette, Clock, Sparkles } from 'lucide-react';
import usePageMeta from '@/hooks/usePageMeta';

const identityFaqs = [
  {
    question: "How does AI Sketch-a-Guest work?",
    answer: "AI Sketch-a-Guest uses advanced AI algorithms to analyze a guest's photo and generate an authentic hand-drawn style sketch in real-time. The technology captures artistic nuances like shading, line weight, and texture while allowing seamless brand integration."
  },
  {
    question: "What art styles are available for AI portrait sketches?",
    answer: "We offer multiple artistic styles including classic pencil sketches, dramatic charcoal portraits, elegant ink wash, and vibrant watercolor effects. Custom styles can also be created to match your event aesthetic or brand identity."
  },
  {
    question: "Can we customize the sketch style for our brand?",
    answer: "Absolutely! We offer multiple artistic styles including pencil, charcoal, ink, and watercolor effects. Brand elements like logos, colors, and thematic designs can be elegantly incorporated into each sketch's artistic style."
  },
  {
    question: "How long does each AI portrait sketch take?",
    answer: "Each AI portrait sketch is generated in just seconds. Guests watch the artistic transformation unfold in real-time, creating an engaging and memorable experience."
  }
];

// Before/After sketch images - Pencil Style
import sketchBefore1 from '@/assets/sketch-guest-before-1.jpg';
import sketchAfter1 from '@/assets/sketch-guest-after-1.jpg';
import sketchBefore2 from '@/assets/sketch-guest-before-2.jpg';
import sketchAfter2 from '@/assets/sketch-guest-after-2.jpg';
import sketchBefore3 from '@/assets/sketch-guest-before-3.jpg';
import sketchAfter3 from '@/assets/sketch-guest-after-3.jpg';
import sketchBefore4 from '@/assets/sketch-guest-before-4.jpg';
import sketchAfter4 from '@/assets/sketch-guest-after-4.jpg';
import sketchBefore5 from '@/assets/sketch-guest-before-5.jpg';
import sketchAfter5 from '@/assets/sketch-guest-after-5.jpg';
import sketchBefore6 from '@/assets/sketch-guest-before-6.jpg';
import sketchAfter6 from '@/assets/sketch-guest-after-6.jpg';

// Art Style Variations
import sketchCharcoal1 from '@/assets/sketch-guest-charcoal-1.jpg';
import sketchInkwash2 from '@/assets/sketch-guest-inkwash-2.jpg';
import sketchWatercolor3 from '@/assets/sketch-guest-watercolor-3.jpg';
import sketchCharcoal4 from '@/assets/sketch-guest-charcoal-4.jpg';
import sketchInkwash5 from '@/assets/sketch-guest-inkwash-5.jpg';
import sketchWatercolor6 from '@/assets/sketch-guest-watercolor-6.jpg';

const galleryItems = [
  { before: sketchBefore1, after: sketchAfter1, alt: 'AI pencil sketch portrait transformation at corporate event NYC', style: 'Pencil' },
  { before: sketchBefore2, after: sketchInkwash2, alt: 'AI ink wash portrait art for wedding entertainment', style: 'Ink Wash' },
  { before: sketchBefore3, after: sketchWatercolor3, alt: 'AI watercolor portrait sketch for gala events', style: 'Watercolor' },
  { before: sketchBefore4, after: sketchCharcoal4, alt: 'AI charcoal art portrait for professional headshots', style: 'Charcoal' },
  { before: sketchBefore5, after: sketchInkwash5, alt: 'AI ink wash style portrait for art gallery opening', style: 'Ink Wash' },
  { before: sketchBefore6, after: sketchWatercolor6, alt: 'AI watercolor art portrait for social events', style: 'Watercolor' },
];
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
    title: 'AI Sketch-a-Guest | AI Portrait Sketch Booth NYC',
    description: 'Real-time AI portrait sketches for corporate galas & events. Choose pencil, charcoal, ink wash or watercolor styles. Instant digital delivery + prints. Book NYC demo today.',
    ogImage: '/og-identity.jpg',
    canonicalPath: '/experiences/identity',
    keywords: 'AI sketch portrait booth NYC, digital caricature artist, AI hand-drawn portrait, corporate event entertainment New York, artistic photo booth, pencil sketch booth, charcoal portrait booth, watercolor portrait event, luxury brand activation entertainment',
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "AI Sketch-a-Guest",
        "serviceType": "AI Portrait Sketch Booth",
        "description": "AI-powered portrait sketching that creates authentic hand-drawn style artwork of guests in real-time, with seamless brand integration. Available in pencil, charcoal, ink wash, and watercolor styles.",
        "provider": {
          "@type": "LocalBusiness",
          "@id": "https://pixelaipro.lovable.app/#business",
          "name": "PixelAI Pro",
          "telephone": "+1-212-555-0123",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "New York",
            "addressRegion": "NY",
            "addressCountry": "US"
          }
        },
        "areaServed": [
          { "@type": "City", "name": "New York City" },
          { "@type": "City", "name": "Los Angeles" },
          { "@type": "City", "name": "Miami" },
          { "@type": "City", "name": "Chicago" }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "AI Sketch Styles",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Pencil Sketch Portrait" }},
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Charcoal Portrait" }},
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ink Wash Portrait" }},
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Watercolor Portrait" }}
          ]
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
            "name": "What art styles are available for AI portrait sketches?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We offer multiple artistic styles including classic pencil sketches, dramatic charcoal portraits, elegant ink wash, and vibrant watercolor effects. Custom styles can also be created to match your event aesthetic or brand identity."
            }
          },
          {
            "@type": "Question",
            "name": "Can we customize the sketch style for our brand?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely! We offer multiple artistic styles including pencil, charcoal, ink, and watercolor effects. Brand elements like logos, colors, and thematic designs can be elegantly incorporated into each sketch's artistic style."
            }
          },
          {
            "@type": "Question",
            "name": "How long does each AI portrait sketch take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Each AI portrait sketch is generated in just seconds. Guests watch the artistic transformation unfold in real-time, creating an engaging and memorable experience."
            }
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        "name": "AI Sketch-a-Guest Transformation Gallery",
        "description": "Before and after examples of AI portrait sketch transformations in various artistic styles",
        "numberOfItems": 9
      }
    ]
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <article>
          <header className="section-padding relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[150px]" aria-hidden="true" />
            
            <div className="container-custom relative z-10">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <Breadcrumbs items={[
                    { label: 'AI Photo Booth Services', href: '/services' },
                    { label: 'AI Sketch-a-Guest' }
                  ]} />
                  <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6" aria-hidden="true">
                    <Pencil size={40} className="text-white" />
                  </div>
                  <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                    <span className="gradient-text">AI Sketch-a-Guest</span>
                  </h1>
                  <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
                    Real-Time AI Portrait Sketches for Corporate Events NYC
                  </p>
                  <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                    Combining cutting-edge AI with timeless artistic style, Sketch-a-Guest creates beautiful 
                    hand-drawn portraits of your guests in real-time. Choose from pencil, charcoal, ink wash, 
                    or watercolor styles—a sophisticated keepsake that elegantly incorporates your brand.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link to="/contact" className="btn-primary inline-flex items-center gap-2" aria-label="Book AI Sketch-a-Guest experience for your event">
                      Book This Experience <ArrowRight size={20} aria-hidden="true" />
                    </Link>
                    <Link to="/portfolio" className="btn-secondary inline-flex items-center gap-2" aria-label="View AI sketch portrait examples">
                      View Examples
                    </Link>
                  </div>
                </div>
                
                <figure className="relative aspect-[3/4] rounded-3xl overflow-hidden glass glow">
                  <BeforeAfterSlider 
                    beforeImage={sketchBefore1} 
                    afterImage={sketchAfter1} 
                    beforeAlt="Original guest photo before AI sketch transformation"
                    afterAlt="AI-generated pencil sketch portrait after transformation"
                  />
                  <figcaption className="sr-only">Before and after comparison of AI portrait sketch transformation</figcaption>
                </figure>
              </div>
            </div>
          </header>

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

        {/* Gallery Section */}
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              Transformation <span className="gradient-text">Gallery</span>
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Explore our variety of art styles—from classic pencil sketches to vibrant watercolors.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryItems.map((item, index) => (
                <div key={index} className="rounded-2xl overflow-hidden glass relative group">
                  <BeforeAfterSlider 
                    beforeImage={item.before} 
                    afterImage={item.after} 
                    beforeAlt={`Before - ${item.alt}`}
                    afterAlt={`After - ${item.alt}`}
                  />
                  <div className="absolute top-3 right-3 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {item.style}
                  </div>
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

        {/* Interactive Demo Section */}
        <section className="section-padding bg-card/50" id="try-demo">
          <div className="container-custom max-w-4xl">
            <ExperienceDemo
              experience="identity"
              experienceTitle="AI Sketch-a-Guest"
              experienceDescription="Get a beautiful AI-generated sketch portrait in seconds!"
            />
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection 
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about AI Sketch-a-Guest portrait experiences."
          faqs={identityFaqs}
          gradientWord="Questions"
        />

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

        </article>

        {/* Related Services */}
        <RelatedServices currentSlug="identity" />
      </main>
      <Footer />
    </div>
  );
};

export default IdentityPage;
