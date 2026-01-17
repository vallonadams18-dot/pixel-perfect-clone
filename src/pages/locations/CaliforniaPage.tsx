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
  { name: 'Moscone Center', type: 'Convention Center', events: 'Dreamforce, Tech Conferences' },
  { name: 'Anaheim Convention Center', type: 'Convention Center', events: 'D23, NAMM, Trade Shows' },
  { name: 'San Diego Convention Center', type: 'Convention Center', events: 'Comic-Con, Conferences' },
  { name: 'Los Angeles Convention Center', type: 'Convention Center', events: 'E3, Trade Shows' },
  { name: 'Disneyland Resort', type: 'Theme Park', events: 'Corporate Events & Activations' },
  { name: 'Pebble Beach Resorts', type: 'Luxury Resort', events: 'Executive Retreats & Galas' },
  { name: 'Oracle Park', type: 'Stadium', events: 'Sports Events & Fan Activations' },
  { name: 'Hollywood Bowl', type: 'Amphitheater', events: 'Entertainment Events' },
];

const testimonials = [
  {
    quote: "PixelAI Pro was the star of our Dreamforce booth. The AI headshot experience had a line around the block, and we captured unprecedented leads for our sales team.",
    author: "Sarah Mitchell",
    role: "VP of Events",
    company: "Enterprise SaaS Company",
    location: "Moscone Center, SF",
    metric: "15,000 leads captured"
  },
  {
    quote: "For Comic-Con, we needed something extraordinary. The Persona Pop transformations were perfect—attendees became their favorite characters instantly.",
    author: "Alex Turner",
    role: "Brand Experience Director",
    company: "Major Entertainment Studio",
    location: "San Diego Convention Center",
    metric: "8.5M social impressions"
  },
  {
    quote: "Our executive retreat at Pebble Beach was elevated by the AI headshot experience. Every C-suite attendee left with a stunning portrait.",
    author: "Patricia Wong",
    role: "Executive Events",
    company: "Fortune 100 Company",
    location: "Pebble Beach, CA",
    metric: "100% executive satisfaction"
  },
];

const services = [
  {
    title: 'AI Headshots',
    description: 'LinkedIn-ready professional portraits in under 60 seconds',
    link: '/experiences/headshots',
    ideal: 'Dreamforce, tech conferences, executive events'
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
    ideal: 'Comic-Con, sports teams, gaming conventions'
  },
  {
    title: 'Persona Pop',
    description: 'Transform guests into superheroes, anime, or brand characters',
    link: '/experiences/persona-pop',
    ideal: 'Entertainment events, themed parties, brand experiences'
  },
];

const stats = [
  { value: '1,200+', label: 'CA Events', icon: Calendar },
  { value: '5M+', label: 'Photos Generated', icon: Users },
  { value: '95%', label: 'Lead Capture Rate', icon: Trophy },
  { value: '150+', label: 'CA Venues', icon: Building2 },
];

const neighborhoods = [
  'San Francisco', 'Los Angeles', 'San Diego', 'Anaheim', 'San Jose',
  'Sacramento', 'Oakland', 'Irvine', 'Palo Alto', 'Santa Monica'
];

const CaliforniaPage = () => {
  usePageMeta({
    title: 'AI Photo Booth Rental California | Statewide Event Activation | PixelAI Pro',
    description: 'California\'s #1 AI photo booth rental for corporate events & conventions. Serving Moscone Center, Anaheim Convention Center & 150+ venues statewide. Real-time AI transformations. Get a free quote!',
    ogImage: '/og-image.jpg',
    canonicalPath: '/locations/california',
    keywords: 'AI photo booth rental California, CA photo booth, Moscone Center photo booth, corporate event photo booth California, trade show booth CA, brand activation California, experiential marketing California, 360 photo booth California',
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "PixelAI Pro - AI Photo Booth Rental California",
        "description": "California's premier AI photo booth company specializing in tech conferences, entertainment events, and experiential marketing activations statewide.",
        "url": "https://pixelaipro.lovable.app/locations/california",
        "image": "https://pixelaipro.lovable.app/og-image.jpg",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "San Francisco",
          "addressRegion": "CA",
          "postalCode": "94102",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "36.7783",
          "longitude": "-119.4179"
        },
        "areaServed": [
          { "@type": "State", "name": "California" },
          { "@type": "City", "name": "San Francisco" },
          { "@type": "City", "name": "Los Angeles" },
          { "@type": "City", "name": "San Diego" }
        ],
        "priceRange": "$$$",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "bestRating": "5",
          "worstRating": "1",
          "reviewCount": "234"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "AI Photo Booth Rental California",
        "serviceType": "Event Photo Booth Rental",
        "description": "Professional AI-powered photo booth rental for tech conferences, entertainment events, and brand activations throughout California. Real-time AI transformations, lead capture, and instant social sharing.",
        "areaServed": {
          "@type": "State",
          "name": "California"
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
                <span className="text-sm text-muted-foreground">Serving All California Venues</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                #1 AI Photo Booth
                <br />
                <span className="gradient-text">Rental in California</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Transform your California corporate events and conventions with AI-powered photo experiences. 
                Real-time transformations, 95% lead capture rate, and seamless CRM integration—trusted by 
                tech giants at <strong className="text-foreground">Moscone Center</strong>, <strong className="text-foreground">Anaheim Convention Center</strong>, and 150+ venues statewide.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                  Get Free California Quote <ArrowRight size={20} />
                </Link>
                <Link to="/portfolio" className="btn-secondary inline-flex items-center gap-2">
                  View California Portfolio
                </Link>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Check size={16} className="text-primary" /> Statewide coverage
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
              beforeAlt="Original photo before AI transformation at California event"
              afterAlt="AI-transformed portrait at California corporate event"
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
              Premier <span className="gradient-text">California Venues</span> We Serve
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From tech hubs to entertainment capitals, we bring AI photo experiences to 
              California's most iconic venues.
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
              AI Photo Booth <span className="gradient-text">Experiences</span> for California Events
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our suite of AI-powered experiences designed for high-impact tech conferences 
              and brand activations in California.
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
              What <span className="gradient-text">California Clients</span> Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real results from real events across California.
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
              Serving All <span className="gradient-text">California</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From San Francisco to San Diego, we deliver premium AI photo booth experiences across the Golden State.
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
                Ready to Elevate Your California Event?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join 1,200+ successful California events. Get a custom quote for your venue, 
                see a live demo, and discover how AI photo experiences can transform your activation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                  Get Free California Quote <ArrowRight size={20} />
                </Link>
                <a href="tel:+1234567890" className="btn-secondary inline-flex items-center gap-2">
                  Call for Same-Day Booking
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

export default CaliforniaPage;