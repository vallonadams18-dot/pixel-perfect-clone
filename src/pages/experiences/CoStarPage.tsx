import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RelatedServices from '@/components/RelatedServices';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Link } from 'react-router-dom';
import { Users, Check, ArrowRight, Star, Camera, Award } from 'lucide-react';
import usePageMeta from '@/hooks/usePageMeta';
import coStarDemoImage from '@/assets/co-star-demo.jpg';
import coStarGuest1 from '@/assets/co-star-guest-1.jpg';
import coStarGuest2 from '@/assets/co-star-guest-2.jpg';
import coStarGuest3 from '@/assets/co-star-guest-3.jpg';
import coStarGuest4 from '@/assets/co-star-guest-4.jpg';
import coStarGuest5 from '@/assets/co-star-guest-5.jpg';
import coStarGuest6 from '@/assets/co-star-guest-6.jpg';

const galleryImages = [
  { src: coStarGuest1, alt: 'Guest posing with pop superstar on red carpet', label: 'Red Carpet Premiere' },
  { src: coStarGuest2, alt: 'Guest posing with action movie star at premiere', label: 'Movie Premiere' },
  { src: coStarGuest3, alt: 'Guest posing with basketball legend at arena', label: 'Sports Legend' },
  { src: coStarGuest4, alt: 'Guest posing with R&B singer at music awards', label: 'Music Awards' },
  { src: coStarGuest5, alt: 'Guest on talk show set with famous host', label: 'Talk Show Experience' },
  { src: coStarGuest6, alt: 'Guest posing with NFL quarterback on field', label: 'Football Legend' },
];

const features = [
  {
    icon: Star,
    title: 'Celebrity Digital Doubles',
    description: 'Access our extensive library of licensed celebrity and athlete likenesses for authentic meet-and-greet experiences.'
  },
  {
    icon: Camera,
    title: 'Studio-Quality Compositing',
    description: 'Professional lighting matching and seamless integration that looks like an actual celebrity photo op.'
  },
  {
    icon: Award,
    title: 'Custom Talent Partnerships',
    description: 'Work with your brand ambassadors or secure licensed partnerships with our network of celebrity talent.'
  },
  {
    icon: Users,
    title: 'Group Photo Support',
    description: 'Capture entire groups with celebrities—perfect for corporate events and team-building activations.'
  },
];

const benefits = [
  'No scheduling conflicts or celebrity availability issues',
  'Fraction of the cost of live celebrity appearances',
  '24/7 availability for multi-day events',
  'Perfect for global campaign rollouts',
  'Consistent quality across all locations',
  'Instant sharing with branded frames',
];

const CoStarPage = () => {
  usePageMeta({
    title: 'Co-Star - AI Celebrity Photo Experience NYC | PixelAI Pro',
    description: 'Create memorable celebrity photo experiences with Co-Star AI technology. Place guests in professional portraits next to any celebrity or athlete. Perfect for NYC fan experiences, brand activations, and entertainment marketing.',
    ogImage: '/og-co-star.jpg',
    canonicalPath: '/experiences/co-star',
    keywords: 'AI celebrity photos, celebrity photo booth NYC, fan experience photo booth, athlete photo experience, entertainment marketing booth, VIP photo activation',
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Co-Star AI Celebrity Photo Experience",
        "serviceType": "AI Celebrity Photo Booth",
        "description": "Create memorable celebrity photo experiences with AI technology that places guests in professional portraits alongside celebrities and athletes.",
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
            "name": "How does Co-Star create celebrity photos?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Co-Star uses advanced AI compositing with licensed celebrity digital doubles. Professional lighting matching ensures seamless integration that looks like an actual celebrity photo op, creating studio-quality results for every guest."
            }
          },
          {
            "@type": "Question",
            "name": "Can we use our brand ambassadors with Co-Star?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! We can integrate your brand ambassadors, athletes, or talent partners. We also help secure licensed partnerships with our network of celebrity talent for authentic, legally-compliant activations."
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px]" />
          
          <div className="container-custom relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <Breadcrumbs items={[
                  { label: 'AI Photo Booth Services', href: '/services' },
                  { label: 'Co-Star Celebrity Photos' }
                ]} />
                <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6">
                  <Users size={40} className="text-white" />
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  Co-<span className="gradient-text">Star</span>
                </h1>
                <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
                  Digital Celebrity Meet-and-Greet
                </p>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Give every guest the VIP treatment with AI-powered celebrity photo experiences. Co-Star 
                  creates studio-quality portraits placing your attendees next to their favorite celebrities, 
                  athletes, or brand ambassadors—without the logistical challenges of live appearances.
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
              
              <figure className="relative aspect-[3/4] rounded-3xl overflow-hidden glass glow group">
                <img 
                  src={coStarDemoImage}
                  alt="Co-Star AI celebrity photo experience - guest posing with pop star on red carpet VIP event"
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
                {/* Text overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6">
                  <p className="text-white/90 text-sm font-medium uppercase tracking-wider mb-1">AI Photo Experience</p>
                  <h3 className="text-white font-display text-2xl md:text-3xl font-bold leading-tight">
                    Pose With Your<br />Favorite Celebrity
                  </h3>
                </div>
                <figcaption className="sr-only">Co-Star AI technology creates realistic celebrity photo opportunities at events</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              Real Guest <span className="gradient-text">Experiences</span>
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              See how our AI technology creates unforgettable celebrity moments for event guests.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {galleryImages.map((image, index) => (
                <figure key={index} className="relative aspect-[3/4] rounded-2xl overflow-hidden group">
                  <img 
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white font-semibold text-sm md:text-base">{image.label}</span>
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="section-padding bg-card/50">
          <div className="container-custom">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              How <span className="gradient-text">Co-Star</span> Works
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Professional celebrity photo experiences powered by advanced AI compositing technology.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Choose Celebrity', desc: 'Select from our talent library or use your brand ambassadors.' },
                { step: '02', title: 'Strike a Pose', desc: 'Guest poses in front of our green screen or themed backdrop.' },
                { step: '03', title: 'Instant Magic', desc: 'AI creates a seamless celebrity photo ready for sharing.' },
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
              Enterprise-grade celebrity photo technology for memorable fan experiences.
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
              Why Brands Choose <span className="gradient-text">Co-Star</span>
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
              {['Sports Fan Zones', 'Movie Premieres', 'Music Festivals', 'Brand Ambassador Events'].map((useCase) => (
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
                Create Star-Studded Experiences
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Give your guests unforgettable celebrity photo moments without the complexity of live talent. 
                Explore our celebrity library and custom partnership options.
              </p>
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                Schedule Your Demo <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>

        {/* Related Services */}
        <RelatedServices currentSlug="co-star" />
      </div>
      <Footer />
    </div>
  );
};

export default CoStarPage;