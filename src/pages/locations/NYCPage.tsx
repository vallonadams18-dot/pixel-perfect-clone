import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Star, Check, Building2, Calendar, Users, Trophy } from 'lucide-react';
import usePageMeta from '@/hooks/usePageMeta';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import beforeImage from '@/assets/before-transformation-4k.jpg';
import afterImage from '@/assets/after-transformation.jpg';

const venues = [
  { name: 'Javits Center', type: 'Convention Center', events: 'Trade Shows & Conferences' },
  { name: 'Pier 60 at Chelsea Piers', type: 'Event Venue', events: 'Corporate Galas & Product Launches' },
  { name: 'The Metropolitan Pavilion', type: 'Exhibition Space', events: 'Fashion Shows & Brand Activations' },
  { name: 'Cipriani Wall Street', type: 'Luxury Venue', events: 'Executive Events & Award Shows' },
  { name: 'Spring Studios', type: 'Creative Space', events: 'Media Events & Brand Experiences' },
  { name: 'The Glasshouse', type: 'Modern Venue', events: 'Tech Launches & Corporate Events' },
  { name: 'TAO Downtown', type: 'Nightlife Venue', events: 'Launch Parties & VIP Activations' },
  { name: 'The Plaza Hotel', type: 'Iconic Hotel', events: 'Luxury Events & Galas' },
];

const testimonials = [
  {
    quote: "PixelAI Pro transformed our Javits Center trade show booth into the most visited activation on the floor. We captured 3,200 leads in just 3 days—a 400% increase over our previous year.",
    author: "Sarah Chen",
    role: "VP of Marketing",
    company: "Fortune 500 Tech Company",
    location: "Javits Center, NYC",
    metric: "3,200 leads captured"
  },
  {
    quote: "The AI headshot booth at our annual conference was a game-changer. Every executive left with a LinkedIn-ready portrait, and the engagement was off the charts.",
    author: "Michael Torres",
    role: "Events Director",
    company: "Global Financial Services Firm",
    location: "Pier 60, Chelsea Piers",
    metric: "97% guest participation"
  },
  {
    quote: "We've worked with photo booths before, but the AI transformation technology from PixelAI Pro created genuine viral moments. Our brand activation trended on social media for days.",
    author: "Jennifer Walsh",
    role: "Brand Experience Manager",
    company: "Major Fashion Brand",
    location: "Spring Studios, Manhattan",
    metric: "2.1M social impressions"
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
    description: 'Custom collectible cards with rarity tiers and NFC',
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
  { value: '500+', label: 'NYC Events', icon: Calendar },
  { value: '2M+', label: 'Photos Generated', icon: Users },
  { value: '95%', label: 'Lead Capture Rate', icon: Trophy },
  { value: '50+', label: 'NYC Venues', icon: Building2 },
];

const neighborhoods = [
  'Manhattan', 'Brooklyn', 'Times Square', 'Hudson Yards', 'Financial District',
  'Midtown', 'SoHo', 'Tribeca', 'Chelsea', 'Upper East Side'
];

const NYCPage = () => {
  usePageMeta({
    title: 'AI Photo Booth Rental NYC | New York Event Activation | PixelAI Pro',
    description: 'NYC\'s #1 AI photo booth rental for corporate events & trade shows. Serving Javits Center, Pier 60, Cipriani & 50+ venues. 500+ events, 95% lead capture rate. Real-time AI transformations. Get a free quote!',
    ogImage: '/og-image.jpg',
    canonicalPath: '/locations/nyc',
    keywords: 'AI photo booth rental NYC, New York photo booth, Javits Center photo booth, corporate event photo booth NYC, trade show booth Manhattan, brand activation NYC, experiential marketing New York, 360 photo booth NYC',
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "PixelAI Pro - AI Photo Booth Rental NYC",
        "description": "NYC's premier AI photo booth company specializing in corporate events, trade shows, and experiential marketing activations throughout New York City.",
        "url": "https://pixelaipro.lovable.app/locations/nyc",
        "image": "https://pixelaipro.lovable.app/og-image.jpg",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "New York",
          "addressRegion": "NY",
          "postalCode": "10001",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "40.7128",
          "longitude": "-74.0060"
        },
        "areaServed": [
          { "@type": "City", "name": "New York City" },
          { "@type": "AdministrativeArea", "name": "Manhattan" },
          { "@type": "AdministrativeArea", "name": "Brooklyn" },
          { "@type": "AdministrativeArea", "name": "Queens" }
        ],
        "priceRange": "$$$",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "bestRating": "5",
          "worstRating": "1",
          "reviewCount": "127"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "AI Photo Booth Rental NYC",
        "serviceType": "Event Photo Booth Rental",
        "description": "Professional AI-powered photo booth rental for corporate events, trade shows, and brand activations in New York City. Real-time AI transformations, lead capture, and instant social sharing.",
        "areaServed": {
          "@type": "City",
          "name": "New York City"
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
                <span className="text-sm text-muted-foreground">Serving All NYC Venues</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                #1 AI Photo Booth
                <br />
                <span className="gradient-text">Rental in NYC</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Transform your New York corporate events and trade shows with AI-powered photo experiences. 
                Real-time transformations, 95% lead capture rate, and seamless CRM integration—trusted by 
                Fortune 500 brands at <strong className="text-foreground">Javits Center</strong>, <strong className="text-foreground">Pier 60</strong>, and 50+ premier NYC venues.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                  Get Free NYC Quote <ArrowRight size={20} />
                </Link>
                <Link to="/portfolio" className="btn-secondary inline-flex items-center gap-2">
                  View NYC Portfolio
                </Link>
              </div>
              
              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Check size={16} className="text-primary" /> Same-day NYC availability
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
              beforeAlt="Original photo before AI transformation at NYC event"
              afterAlt="AI-transformed portrait at New York corporate event"
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

      {/* NYC Venues Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Premier <span className="gradient-text">NYC Venues</span> We Serve
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From iconic convention centers to luxury event spaces, we bring AI photo experiences to 
              New York's most prestigious venues.
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

      {/* Services for NYC */}
      <section className="section-padding bg-card/50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              AI Photo Booth <span className="gradient-text">Experiences</span> for NYC Events
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our suite of AI-powered experiences designed for high-impact corporate events 
              and brand activations in New York.
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
              What <span className="gradient-text">NYC Clients</span> Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real results from real events across New York City.
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

      {/* NYC Neighborhoods */}
      <section className="section-padding bg-card/50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Serving All <span className="gradient-text">NYC Neighborhoods</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From Manhattan to Brooklyn, we deliver premium AI photo booth experiences across all five boroughs.
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
                Ready to Elevate Your NYC Event?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join 500+ successful NYC events. Get a custom quote for your venue, 
                see a live demo, and discover how AI photo experiences can transform your activation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                  Get Free NYC Quote <ArrowRight size={20} />
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

export default NYCPage;
