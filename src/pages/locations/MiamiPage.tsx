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
  { name: 'Miami Beach Convention Center', type: 'Convention Center', events: 'Art Basel, Trade Shows' },
  { name: 'Hard Rock Stadium', type: 'Stadium', events: 'Dolphins Games, Super Bowl Events' },
  { name: 'Kaseya Center', type: 'Arena', events: 'Heat Games & Concerts' },
  { name: 'Faena Forum', type: 'Luxury Venue', events: 'High-End Galas & Brand Events' },
  { name: 'The Fillmore Miami Beach', type: 'Historic Venue', events: 'Brand Activations & Events' },
  { name: 'Pérez Art Museum Miami', type: 'Museum', events: 'Art Events & Fundraisers' },
  { name: 'W South Beach', type: 'Luxury Hotel', events: 'Corporate Events & Galas' },
  { name: 'Wynwood Walls', type: 'Arts District', events: 'Brand Activations & Pop-ups' },
];

const testimonials = [
  {
    quote: "Our Art Basel activation was transformed by PixelAI Pro. The AI art transformations matched the creative energy of the event perfectly and created incredible buzz.",
    author: "Sofia Rodriguez",
    role: "VP of Brand Experiences",
    company: "Luxury Fashion Brand",
    location: "Miami Beach Convention Center",
    metric: "7,500 leads captured"
  },
  {
    quote: "The AI trading cards at our Dolphins game activation were a massive hit. Fans loved the experience and our sponsor saw unprecedented engagement.",
    author: "Marcus Johnson",
    role: "Partnership Director",
    company: "Major Sports Sponsor",
    location: "Hard Rock Stadium",
    metric: "6.1M social impressions"
  },
  {
    quote: "For our Wynwood product launch, the Persona Pop experience was perfect. Guests transformed into amazing art-inspired characters that matched our brand.",
    author: "Isabella Martinez",
    role: "Events Director",
    company: "Tech Startup",
    location: "Wynwood Walls",
    metric: "98% satisfaction rate"
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
    ideal: 'Dolphins/Heat games, fashion events, product launches'
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
    ideal: 'Art Basel, galas, brand experiences'
  },
];

const stats = [
  { value: '350+', label: 'Miami Events', icon: Calendar },
  { value: '1.6M+', label: 'Photos Generated', icon: Users },
  { value: '94%', label: 'Lead Capture Rate', icon: Trophy },
  { value: '45+', label: 'Miami Venues', icon: Building2 },
];

const neighborhoods = [
  'South Beach', 'Miami Beach', 'Wynwood', 'Brickell', 'Downtown Miami',
  'Design District', 'Coral Gables', 'Coconut Grove', 'Aventura', 'Key Biscayne'
];

const MiamiPage = () => {
  usePageMeta({
    title: 'AI Photo Booth Rental Miami | Art Basel & South Beach Events | PixelAI Pro',
    description: 'Miami\'s #1 AI photo booth rental for Art Basel, corporate events & luxury activations. Serving Miami Beach Convention Center, Hard Rock Stadium & 45+ venues. Real-time AI transformations. Get a free quote!',
    ogImage: '/og-image.jpg',
    canonicalPath: '/locations/miami',
    keywords: 'AI photo booth rental Miami, Miami photo booth, Art Basel photo booth, Miami Beach Convention Center photo booth, corporate event photo booth Miami, trade show booth Miami, brand activation Miami, experiential marketing Miami, 360 photo booth Miami',
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "PixelAI Pro - AI Photo Booth Rental Miami",
        "description": "Miami's premier AI photo booth company specializing in Art Basel activations, luxury events, and experiential marketing throughout South Florida.",
        "url": "https://pixelaipro.lovable.app/locations/miami",
        "image": "https://pixelaipro.lovable.app/og-image.jpg",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Miami",
          "addressRegion": "FL",
          "postalCode": "33139",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "25.7617",
          "longitude": "-80.1918"
        },
        "areaServed": [
          { "@type": "City", "name": "Miami" },
          { "@type": "AdministrativeArea", "name": "Miami Beach" },
          { "@type": "AdministrativeArea", "name": "South Beach" },
          { "@type": "AdministrativeArea", "name": "Brickell" }
        ],
        "priceRange": "$$$",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "bestRating": "5",
          "worstRating": "1",
          "reviewCount": "87"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "AI Photo Booth Rental Miami",
        "serviceType": "Event Photo Booth Rental",
        "description": "Professional AI-powered photo booth rental for Art Basel, luxury events, and brand activations in Miami. Real-time AI transformations, lead capture, and instant social sharing.",
        "areaServed": {
          "@type": "City",
          "name": "Miami"
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
                <span className="text-sm text-muted-foreground">Serving All Miami Venues</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                #1 AI Photo Booth
                <br />
                <span className="gradient-text">Rental in Miami</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Transform your Miami events and luxury activations with AI-powered photo experiences. 
                Real-time transformations, 94% lead capture rate, and seamless CRM integration—the go-to choice for 
                <strong className="text-foreground"> Art Basel</strong>, <strong className="text-foreground">Miami Beach Convention Center</strong>, and 45+ premier Miami venues.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                  Get Free Miami Quote <ArrowRight size={20} />
                </Link>
                <Link to="/portfolio" className="btn-secondary inline-flex items-center gap-2">
                  View Miami Portfolio
                </Link>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Check size={16} className="text-primary" /> Art Basel specialists
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
              beforeAlt="Original photo before AI transformation at Miami event"
              afterAlt="AI-transformed portrait at Miami luxury event"
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
              Premier <span className="gradient-text">Miami Venues</span> We Serve
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From Art Basel to luxury resorts, we bring AI photo experiences to 
              Miami's most prestigious venues.
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
              AI Photo Booth <span className="gradient-text">Experiences</span> for Miami Events
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our suite of AI-powered experiences designed for high-impact luxury events 
              and brand activations in Miami.
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
              What <span className="gradient-text">Miami Clients</span> Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real results from real events across Miami.
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
              Serving All <span className="gradient-text">South Florida</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From South Beach to Brickell, we deliver premium AI photo booth experiences across Greater Miami.
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
                Ready to Elevate Your Miami Event?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join 350+ successful Miami events. Get a custom quote for your venue, 
                see a live demo, and discover how AI photo experiences can transform your luxury activation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                  Get Free Miami Quote <ArrowRight size={20} />
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

export default MiamiPage;