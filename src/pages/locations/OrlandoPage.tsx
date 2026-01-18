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
  { name: 'Orange County Convention Center', type: 'Convention Center', events: 'IAAPA, Trade Shows & Expos' },
  { name: 'Walt Disney World', type: 'Theme Park Resort', events: 'Corporate Events & Activations' },
  { name: 'Universal Orlando Resort', type: 'Theme Park Resort', events: 'Brand Experiences & Events' },
  { name: 'Amway Center', type: 'Arena', events: 'Magic Games & Concerts' },
  { name: 'Rosen Shingle Creek', type: 'Luxury Resort', events: 'Conferences & Galas' },
  { name: 'Gaylord Palms Resort', type: 'Resort', events: 'Corporate Events & Conventions' },
  { name: 'Camping World Stadium', type: 'Stadium', events: 'Sports & Major Events' },
  { name: 'Dr. Phillips Center', type: 'Performing Arts', events: 'Galas & Award Shows' },
];

const testimonials = [
  {
    quote: "PixelAI Pro was the highlight of our IAAPA booth. The AI transformation experience had attendees amazed, and we captured more leads than any previous trade show.",
    author: "Jennifer Adams",
    role: "VP of Marketing",
    company: "Major Theme Park Supplier",
    location: "Orange County Convention Center",
    metric: "9,200 leads captured"
  },
  {
    quote: "Our corporate event at Disney's Grand Floridian was magical with the AI headshot experience. Every executive left with a stunning portrait.",
    author: "Robert Chen",
    role: "Events Director",
    company: "Fortune 500 Company",
    location: "Walt Disney World",
    metric: "100% guest satisfaction"
  },
  {
    quote: "The Persona Pop experience at our product launch was incredible. Guests transformed into characters that matched our brand perfectly.",
    author: "Amanda Martinez",
    role: "Brand Manager",
    company: "Entertainment Company",
    location: "Universal Orlando",
    metric: "4.5M social impressions"
  },
];

const services = [
  {
    title: 'AI Headshots',
    description: 'LinkedIn-ready professional portraits in under 60 seconds',
    link: '/experiences/headshots',
    ideal: 'Conferences, trade shows, corporate events'
  },
  {
    title: 'PixelWear Virtual Try-On',
    description: 'Guests try on branded apparel without physical inventory',
    link: '/experiences/pixelwear',
    ideal: 'Theme park activations, product launches'
  },
  {
    title: 'AI Trading Cards',
    description: 'Custom collectible cards with rarity tiers and AR features',
    link: '/experiences/ai-trading-cards',
    ideal: 'Magic games, gaming conventions, fan events'
  },
  {
    title: 'Persona Pop',
    description: 'Transform guests into superheroes, anime, or brand characters',
    link: '/experiences/persona-pop',
    ideal: 'Theme park events, galas, brand experiences'
  },
];

const stats = [
  { value: '380+', label: 'Orlando Events', icon: Calendar },
  { value: '1.8M+', label: 'Photos Generated', icon: Users },
  { value: '95%', label: 'Lead Capture Rate', icon: Trophy },
  { value: '50+', label: 'Orlando Venues', icon: Building2 },
];

const neighborhoods = [
  'International Drive', 'Lake Buena Vista', 'Downtown Orlando', 'Convention District',
  'Dr. Phillips', 'Winter Park', 'Kissimmee', 'Celebration', 'Lake Nona', 'Baldwin Park'
];

const OrlandoPage = () => {
  usePageMeta({
    title: 'AI Photo Booth Rental Orlando | Disney & Convention Events | PixelAI Pro',
    description: 'Orlando\'s #1 AI photo booth rental for conventions & theme park events. Serving Orange County Convention Center, Disney, Universal & 50+ venues. Real-time AI transformations. Get a free quote!',
    ogImage: '/og-image.jpg',
    canonicalPath: '/locations/orlando',
    keywords: 'AI photo booth rental Orlando, photo booth rental Orlando, Orlando photo booth, Orange County Convention Center photo booth, Disney event photo booth, Universal Orlando photo booth, trade show booth Orlando, brand activation Orlando, experiential marketing Orlando, 360 photo booth Orlando, glam photo booth Orlando, corporate brand activation Orlando, event activation Orlando',
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "PixelAI Pro - AI Photo Booth Rental Orlando",
        "description": "Orlando's premier AI photo booth company specializing in convention center events, theme park activations, and experiential marketing throughout Central Florida.",
        "url": "https://pixelaipro.lovable.app/locations/orlando",
        "image": "https://pixelaipro.lovable.app/og-image.jpg",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Orlando",
          "addressRegion": "FL",
          "postalCode": "32819",
          "addressCountry": "US"
        },
        "telephone": "+1-917-724-6051",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "28.5383",
          "longitude": "-81.3792"
        },
        "areaServed": [
          { "@type": "City", "name": "Orlando" },
          { "@type": "AdministrativeArea", "name": "Lake Buena Vista" },
          { "@type": "AdministrativeArea", "name": "Kissimmee" },
          { "@type": "AdministrativeArea", "name": "International Drive" }
        ],
        "priceRange": "$$$",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "bestRating": "5",
          "worstRating": "1",
          "reviewCount": "94"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "AI Photo Booth Rental Orlando",
        "serviceType": "Event Photo Booth Rental",
        "description": "Professional AI-powered photo booth rental for conventions, theme park events, and brand activations in Orlando. Real-time AI transformations, lead capture, and instant social sharing.",
        "areaServed": {
          "@type": "City",
          "name": "Orlando"
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
                <span className="text-sm text-muted-foreground">Serving All Orlando Venues</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                #1 AI Photo Booth
                <br />
                <span className="gradient-text">Rental in Orlando</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Transform your Orlando conventions and theme park events with AI-powered photo experiences. 
                Real-time transformations, 95% lead capture rate, and seamless CRM integration—trusted by 
                major brands at <strong className="text-foreground">Orange County Convention Center</strong>, <strong className="text-foreground">Walt Disney World</strong>, and 50+ premier Orlando venues.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                  Get Free Orlando Quote <ArrowRight size={20} />
                </Link>
                <a href="tel:+19177246051" className="btn-secondary inline-flex items-center gap-2">
                  Call (917) 724-6051
                </a>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Check size={16} className="text-primary" /> Theme park specialists
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
              beforeAlt="Original photo before AI transformation at Orlando event"
              afterAlt="AI-transformed portrait at Orlando corporate event"
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
              Premier <span className="gradient-text">Orlando Venues</span> We Serve
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From world-famous theme parks to massive convention centers, we bring AI photo experiences to 
              Orlando's most iconic venues.
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
              AI Photo Booth <span className="gradient-text">Experiences</span> for Orlando Events
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our suite of AI-powered experiences designed for high-impact conventions 
              and theme park activations in Orlando.
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
              What <span className="gradient-text">Orlando Clients</span> Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real results from real events across Orlando.
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
              Serving All <span className="gradient-text">Central Florida</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From International Drive to Lake Buena Vista, we deliver premium AI photo booth experiences across Greater Orlando.
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
                Ready to Elevate Your Orlando Event?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join 380+ successful Orlando events. Get a custom quote for your venue, 
                see a live demo, and discover how AI photo experiences can transform your convention or theme park activation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                  Get Free Orlando Quote <ArrowRight size={20} />
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

export default OrlandoPage;