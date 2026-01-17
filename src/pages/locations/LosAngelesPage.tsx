import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Star, Check, Building2, Calendar, Users, Trophy } from 'lucide-react';
import usePageMeta from '@/hooks/usePageMeta';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import beforeImage from '@/assets/before-transformation.jpg';
import afterImage from '@/assets/after-transformation.jpg';

const venues = [
  { name: 'Los Angeles Convention Center', type: 'Convention Center', events: 'Trade Shows & Expos' },
  { name: 'The Novo', type: 'Event Venue', events: 'Corporate Events & Product Launches' },
  { name: 'SoFi Stadium', type: 'Sports Venue', events: 'Sports Events & Concerts' },
  { name: 'The Beverly Hilton', type: 'Luxury Hotel', events: 'Award Shows & Galas' },
  { name: 'Hollywood Palladium', type: 'Historic Venue', events: 'Brand Activations & Premieres' },
  { name: 'Petersen Automotive Museum', type: 'Museum', events: 'Corporate Events & Launches' },
  { name: 'The Wiltern', type: 'Theater', events: 'Entertainment Events' },
  { name: 'Dodger Stadium', type: 'Sports Venue', events: 'Sports Events & Fan Activations' },
];

const testimonials = [
  {
    quote: "PixelAI Pro brought our E3 booth to life. The AI transformation experience had attendees lining up for hours, and we captured more leads than any previous year.",
    author: "Marcus Johnson",
    role: "VP of Marketing",
    company: "Major Gaming Publisher",
    location: "LA Convention Center",
    metric: "4,500 leads captured"
  },
  {
    quote: "For our film premiere, the AI photo booth created unforgettable moments. Every guest left with a movie-quality portrait that they shared instantly on social media.",
    author: "Amanda Rodriguez",
    role: "Events Director",
    company: "Major Film Studio",
    location: "Hollywood Palladium",
    metric: "98% social share rate"
  },
  {
    quote: "The AI headshot booth at our tech conference was a massive hit. Professionals loved getting LinkedIn-ready photos while networking.",
    author: "David Kim",
    role: "Conference Organizer",
    company: "Tech Summit LA",
    location: "The Novo at LA Live",
    metric: "2.5M impressions"
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
    ideal: 'Film premieres, galas, brand experiences'
  },
];

const stats = [
  { value: '400+', label: 'LA Events', icon: Calendar },
  { value: '1.8M+', label: 'Photos Generated', icon: Users },
  { value: '94%', label: 'Lead Capture Rate', icon: Trophy },
  { value: '60+', label: 'LA Venues', icon: Building2 },
];

const neighborhoods = [
  'Hollywood', 'Beverly Hills', 'Santa Monica', 'Downtown LA', 'Westwood',
  'Pasadena', 'Burbank', 'Century City', 'Culver City', 'Long Beach'
];

const LosAngelesPage = () => {
  usePageMeta({
    title: 'AI Photo Booth Rental Los Angeles | LA Event Activation | PixelAI Pro',
    description: 'LA\'s #1 AI photo booth rental for corporate events, film premieres & trade shows. Serving LA Convention Center, SoFi Stadium & 60+ venues. Real-time AI transformations. Get a free quote!',
    ogImage: '/og-image.jpg',
    canonicalPath: '/locations/los-angeles',
    keywords: 'AI photo booth rental Los Angeles, LA photo booth, Los Angeles Convention Center photo booth, corporate event photo booth LA, trade show booth Los Angeles, brand activation LA, experiential marketing Los Angeles, 360 photo booth LA',
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "PixelAI Pro - AI Photo Booth Rental Los Angeles",
        "description": "LA's premier AI photo booth company specializing in corporate events, film premieres, and experiential marketing activations throughout Los Angeles.",
        "url": "https://pixelaipro.lovable.app/locations/los-angeles",
        "image": "https://pixelaipro.lovable.app/og-image.jpg",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Los Angeles",
          "addressRegion": "CA",
          "postalCode": "90001",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "34.0522",
          "longitude": "-118.2437"
        },
        "areaServed": [
          { "@type": "City", "name": "Los Angeles" },
          { "@type": "AdministrativeArea", "name": "Hollywood" },
          { "@type": "AdministrativeArea", "name": "Beverly Hills" },
          { "@type": "AdministrativeArea", "name": "Santa Monica" }
        ],
        "priceRange": "$$$",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "bestRating": "5",
          "worstRating": "1",
          "reviewCount": "98"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "AI Photo Booth Rental Los Angeles",
        "serviceType": "Event Photo Booth Rental",
        "description": "Professional AI-powered photo booth rental for corporate events, film premieres, and brand activations in Los Angeles. Real-time AI transformations, lead capture, and instant social sharing.",
        "areaServed": {
          "@type": "City",
          "name": "Los Angeles"
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
                <span className="text-sm text-muted-foreground">Serving All Los Angeles Venues</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                #1 AI Photo Booth
                <br />
                <span className="gradient-text">Rental in Los Angeles</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Transform your Los Angeles corporate events and entertainment activations with AI-powered photo experiences. 
                Real-time transformations, 94% lead capture rate, and seamless CRM integration—trusted by 
                entertainment giants at <strong className="text-foreground">LA Convention Center</strong>, <strong className="text-foreground">SoFi Stadium</strong>, and 60+ premier LA venues.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                  Get Free LA Quote <ArrowRight size={20} />
                </Link>
                <Link to="/portfolio" className="btn-secondary inline-flex items-center gap-2">
                  View LA Portfolio
                </Link>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Check size={16} className="text-primary" /> Same-day LA availability
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
              beforeAlt="Original photo before AI transformation at LA event"
              afterAlt="AI-transformed portrait at Los Angeles corporate event"
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
              Premier <span className="gradient-text">Los Angeles Venues</span> We Serve
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From iconic stadiums to luxury hotels, we bring AI photo experiences to 
              Los Angeles's most prestigious venues.
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
              AI Photo Booth <span className="gradient-text">Experiences</span> for LA Events
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our suite of AI-powered experiences designed for high-impact entertainment events 
              and brand activations in Los Angeles.
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
              What <span className="gradient-text">LA Clients</span> Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real results from real events across Los Angeles.
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
              Serving All <span className="gradient-text">LA Neighborhoods</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From Hollywood to Long Beach, we deliver premium AI photo booth experiences across all of Los Angeles.
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
                Ready to Elevate Your LA Event?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join 400+ successful Los Angeles events. Get a custom quote for your venue, 
                see a live demo, and discover how AI photo experiences can transform your activation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                  Get Free LA Quote <ArrowRight size={20} />
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

export default LosAngelesPage;