import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Star, Check, Building2, Calendar, Users, Trophy } from 'lucide-react';
import usePageMeta from '@/hooks/usePageMeta';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import beforeImage from '@/assets/before-transformation-4k.jpg';
import afterImage from '@/assets/after-transformation.jpg';

const venues = [
  { name: 'AT&T Stadium', type: 'Stadium', events: 'NFL Games & Major Events' },
  { name: 'Kay Bailey Hutchison Convention Center', type: 'Convention Center', events: 'Trade Shows & Conferences' },
  { name: 'American Airlines Center', type: 'Arena', events: 'Concerts & Sports Events' },
  { name: 'Gaylord Texan Resort', type: 'Resort', events: 'Corporate Conferences & Galas' },
  { name: 'The Omni Dallas Hotel', type: 'Hotel', events: 'Corporate Events & Meetings' },
  { name: 'Reunion Tower', type: 'Landmark', events: 'Private Events & Celebrations' },
  { name: 'Toyota Music Factory', type: 'Entertainment', events: 'Brand Activations & Concerts' },
  { name: 'Dallas Market Hall', type: 'Exhibition', events: 'Trade Shows & Expos' },
];

const testimonials = [
  {
    quote: "PixelAI Pro made our Dallas Cowboys partnership activation unforgettable. The AI trading cards were a game-changer for fan engagement at AT&T Stadium.",
    author: "Marcus Johnson",
    role: "VP of Sponsorship",
    company: "Fortune 500 Brand",
    location: "AT&T Stadium, Dallas",
    metric: "12,000 leads captured"
  },
  {
    quote: "Our tech summit at Kay Bailey convention center was transformed by the AI headshot experience. Attendees loved leaving with professional portraits.",
    author: "Jennifer Martinez",
    role: "Event Director",
    company: "Enterprise Tech Company",
    location: "Kay Bailey Hutchison Convention Center",
    metric: "98% satisfaction rate"
  },
  {
    quote: "The Persona Pop experience at our corporate gala had executives transformed into Texas legends. Everyone was talking about it for weeks.",
    author: "Robert Lee",
    role: "Chief Marketing Officer",
    company: "Dallas-Based Corporation",
    location: "Gaylord Texan Resort",
    metric: "4.1M social impressions"
  },
];

const services = [
  {
    title: 'AI Headshots',
    description: 'LinkedIn-ready professional portraits in under 60 seconds',
    link: '/experiences/headshots',
    ideal: 'Conferences, networking events, trade shows'
  },
  {
    title: 'PixelWear Virtual Try-On',
    description: 'Guests try on branded apparel without physical inventory',
    link: '/experiences/pixelwear',
    ideal: 'Sports events, retail activations, product launches'
  },
  {
    title: 'AI Trading Cards',
    description: 'Custom collectible cards with rarity tiers and AR features',
    link: '/experiences/ai-trading-cards',
    ideal: 'Sports teams, gaming events, conventions'
  },
  {
    title: 'Persona Pop',
    description: 'Transform guests into superheroes, anime, or brand characters',
    link: '/experiences/persona-pop',
    ideal: 'Galas, holiday parties, brand experiences'
  },
];

const stats = [
  { value: '280+', label: 'DFW Events', icon: Calendar },
  { value: '1.8M+', label: 'Photos Generated', icon: Users },
  { value: '95%', label: 'Lead Capture Rate', icon: Trophy },
  { value: '50+', label: 'DFW Venues', icon: Building2 },
];

const neighborhoods = [
  'Downtown Dallas', 'Uptown', 'Deep Ellum', 'Bishop Arts', 'Fort Worth',
  'Arlington', 'Plano', 'Frisco', 'Irving', 'Richardson'
];

const DallasPage = () => {
  usePageMeta({
    title: 'AI Photo Booth Rental Dallas | Texas Event Activation | PixelAI Pro',
    description: 'Dallas\' #1 AI photo booth rental for corporate events & sports activations. Serving AT&T Stadium, Kay Bailey Convention Center & 50+ venues. Real-time AI transformations. Get a free quote!',
    ogImage: '/og-image.jpg',
    canonicalPath: '/locations/dallas',
    keywords: 'AI photo booth rental Dallas, photo booth rental Dallas, Dallas photo booth, AT&T Stadium photo booth, corporate event photo booth Dallas, trade show booth Texas, brand activation Dallas, experiential marketing Dallas, 360 photo booth Dallas, photo booth rental Fort Worth, corporate brand activation Dallas, event activation DFW',
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "PixelAI Pro - AI Photo Booth Rental Dallas",
        "description": "Dallas's premier AI photo booth company specializing in corporate events, sports activations, and experiential marketing throughout Texas.",
        "url": "https://pixelaipro.lovable.app/locations/dallas",
        "image": "https://pixelaipro.lovable.app/og-image.jpg",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Dallas",
          "addressRegion": "TX",
          "postalCode": "75201",
          "addressCountry": "US"
        },
        "telephone": "+1-917-724-6051",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "32.7767",
          "longitude": "-96.7970"
        },
        "areaServed": [
          { "@type": "City", "name": "Dallas" },
          { "@type": "City", "name": "Fort Worth" },
          { "@type": "City", "name": "Arlington" },
          { "@type": "City", "name": "Plano" }
        ],
        "priceRange": "$$$",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "bestRating": "5",
          "worstRating": "1",
          "reviewCount": "76"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "AI Photo Booth Rental Dallas",
        "serviceType": "Event Photo Booth Rental",
        "description": "Professional AI-powered photo booth rental for corporate events, sports activations, and brand experiences in Dallas-Fort Worth. Real-time AI transformations, lead capture, and instant social sharing.",
        "areaServed": {
          "@type": "City",
          "name": "Dallas"
        },
        "provider": {
          "@type": "LocalBusiness",
          "name": "PixelAI Pro"
        }
      }
    ]
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px]" />
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
                <MapPin size={16} className="text-primary" />
                <span className="text-sm text-muted-foreground">Serving All DFW Metroplex</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                #1 AI Photo Booth
                <br />
                <span className="gradient-text">Rental in Dallas</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Transform your Dallas-Fort Worth corporate events and sports activations with AI-powered photo experiences. 
                Real-time transformations, 95% lead capture rate, and seamless CRM integration—trusted by 
                Fortune 500 brands at <strong className="text-foreground">AT&T Stadium</strong>, <strong className="text-foreground">Kay Bailey Convention Center</strong>, and 50+ premier DFW venues.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                  Get Free Dallas Quote <ArrowRight size={20} />
                </Link>
                <a href="tel:+19177246051" className="btn-secondary inline-flex items-center gap-2">
                  Call (917) 724-6051
                </a>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Check size={16} className="text-primary" /> Same-day DFW availability
                </span>
                <span className="flex items-center gap-2">
                  <Check size={16} className="text-primary" /> Free venue consultation
                </span>
              </div>
            </div>
            
            <BeforeAfterSlider
              beforeImage={beforeImage}
              afterImage={afterImage}
              beforeLabel="Original"
              afterLabel="AI Enhanced"
              beforeAlt="Original photo before AI transformation at Dallas event"
              afterAlt="AI-transformed portrait at Dallas corporate event"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/50">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <stat.icon size={24} className="text-primary" />
                </div>
                <div className="font-display text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venues Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Premier <span className="gradient-text">Dallas Venues</span> We Serve
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From iconic stadiums to world-class convention centers, we bring AI photo experiences to 
              Dallas-Fort Worth's most prestigious venues.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {venues.map((venue) => (
              <div key={venue.name} className="glass rounded-xl p-6 hover:border-primary/50 transition-colors">
                <div className="flex items-start gap-3 mb-3">
                  <MapPin size={20} className="text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground">{venue.name}</h3>
                    <p className="text-sm text-primary">{venue.type}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{venue.events}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-card/50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              AI Photo Booth <span className="gradient-text">Experiences</span> for Dallas Events
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our suite of AI-powered experiences designed for high-impact corporate events 
              and brand activations in Dallas-Fort Worth.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <Link
                key={service.title}
                to={service.link}
                className="glass rounded-xl p-8 hover:border-primary/50 transition-all group"
              >
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <p className="text-sm text-primary">
                  <strong>Ideal for:</strong> {service.ideal}
                </p>
                <div className="mt-4 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              What <span className="gradient-text">Dallas Clients</span> Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real results from real events across Dallas-Fort Worth.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glass rounded-xl p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-primary text-primary" />
                  ))}
                </div>
                <blockquote className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-2 text-sm text-primary mb-4">
                  <MapPin size={14} />
                  {testimonial.location}
                </div>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                </div>
                <div className="mt-4 inline-block bg-primary/20 text-primary text-sm font-semibold px-3 py-1 rounded-full">
                  {testimonial.metric}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="section-padding bg-card/50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Serving All <span className="gradient-text">DFW Metroplex</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From Downtown Dallas to Fort Worth, we deliver premium AI photo booth experiences across the entire metroplex.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {neighborhoods.map((hood) => (
              <span key={hood} className="glass px-4 py-2 rounded-full text-sm text-foreground">
                {hood}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="glass rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 rounded-full blur-[100px]" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready to Elevate Your Dallas Event?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join 280+ successful DFW events. Get a custom quote for your venue, 
                see a live demo, and discover how AI photo experiences can transform your activation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                  Get Free Dallas Quote <ArrowRight size={20} />
                </Link>
                <a href="tel:+19177246051" className="btn-secondary inline-flex items-center gap-2">
                  Call (917) 724-6051
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DallasPage;