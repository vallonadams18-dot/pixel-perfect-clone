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
  { name: 'Las Vegas Convention Center', type: 'Convention Center', events: 'CES, Trade Shows & Expos' },
  { name: 'T-Mobile Arena', type: 'Arena', events: 'Sports & Entertainment Events' },
  { name: 'MGM Grand Garden Arena', type: 'Arena', events: 'Concerts & Boxing Events' },
  { name: 'The Venetian Expo', type: 'Expo Center', events: 'Conferences & Conventions' },
  { name: 'Allegiant Stadium', type: 'Stadium', events: 'NFL Games & Major Events' },
  { name: 'Wynn Las Vegas', type: 'Luxury Resort', events: 'Corporate Events & Galas' },
  { name: 'Caesars Forum', type: 'Conference Center', events: 'Business Conferences' },
  { name: 'Mandalay Bay Convention Center', type: 'Convention Center', events: 'Trade Shows & Conventions' },
];

const testimonials = [
  {
    quote: "Our CES booth was the talk of the show thanks to PixelAI Pro. The AI transformation experience created massive buzz and we captured more qualified leads than ever before.",
    author: "Jennifer Lee",
    role: "VP of Marketing",
    company: "Fortune 500 Tech Company",
    location: "Las Vegas Convention Center",
    metric: "12,000 leads captured"
  },
  {
    quote: "The AI photo booth at our Vegas product launch was incredible. Every attendee became a brand ambassador, sharing their transformed photos across social media.",
    author: "Ryan Collins",
    role: "Brand Director",
    company: "Global Consumer Electronics",
    location: "The Venetian Expo",
    metric: "5.8M social impressions"
  },
  {
    quote: "For our annual conference at Caesars Forum, the AI headshot booth was a game-changer. Professionals loved the instant LinkedIn-ready portraits.",
    author: "Michelle Park",
    role: "Events Director",
    company: "Major Financial Institution",
    location: "Caesars Forum",
    metric: "99% satisfaction rate"
  },
];

const services = [
  {
    title: 'AI Headshots',
    description: 'LinkedIn-ready professional portraits in under 60 seconds',
    link: '/experiences/headshots',
    ideal: 'CES, conferences, trade shows'
  },
  {
    title: 'PixelWear Virtual Try-On',
    description: 'Guests try on branded apparel without physical inventory',
    link: '/experiences/pixelwear',
    ideal: 'Product launches, retail activations, brand experiences'
  },
  {
    title: 'AI Trading Cards',
    description: 'Custom collectible cards with rarity tiers and NFC',
    link: '/experiences/ai-trading-cards',
    ideal: 'Sports events, gaming conventions, fan activations'
  },
  {
    title: 'Persona Pop',
    description: 'Transform guests into superheroes, anime, or brand characters',
    link: '/experiences/persona-pop',
    ideal: 'Vegas galas, themed parties, brand experiences'
  },
];

const stats = [
  { value: '600+', label: 'Vegas Events', icon: Calendar },
  { value: '3M+', label: 'Photos Generated', icon: Users },
  { value: '96%', label: 'Lead Capture Rate', icon: Trophy },
  { value: '80+', label: 'Vegas Venues', icon: Building2 },
];

const neighborhoods = [
  'The Strip', 'Downtown Las Vegas', 'Summerlin', 'Henderson', 'Paradise',
  'Convention District', 'Arts District', 'North Las Vegas', 'Green Valley', 'Enterprise'
];

const LasVegasPage = () => {
  usePageMeta({
    title: 'AI Photo Booth Rental Las Vegas | CES Trade Show Activation | PixelAI Pro',
    description: 'Las Vegas\'s #1 AI photo booth rental for CES, trade shows & corporate events. Serving Las Vegas Convention Center, Venetian Expo & 80+ venues. Real-time AI transformations. Get a free quote!',
    ogImage: '/og-image.jpg',
    canonicalPath: '/locations/las-vegas',
    keywords: 'AI photo booth rental Las Vegas, Vegas photo booth, CES photo booth, Las Vegas Convention Center photo booth, trade show booth Vegas, brand activation Las Vegas, experiential marketing Las Vegas, 360 photo booth Las Vegas',
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "PixelAI Pro - AI Photo Booth Rental Las Vegas",
        "description": "Las Vegas's premier AI photo booth company specializing in CES activations, trade shows, and experiential marketing throughout the Las Vegas Valley.",
        "url": "https://pixelaipro.lovable.app/locations/las-vegas",
        "image": "https://pixelaipro.lovable.app/og-image.jpg",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Las Vegas",
          "addressRegion": "NV",
          "postalCode": "89109",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "36.1699",
          "longitude": "-115.1398"
        },
        "areaServed": [
          { "@type": "City", "name": "Las Vegas" },
          { "@type": "AdministrativeArea", "name": "The Strip" },
          { "@type": "AdministrativeArea", "name": "Henderson" },
          { "@type": "AdministrativeArea", "name": "Summerlin" }
        ],
        "priceRange": "$$$",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "bestRating": "5",
          "worstRating": "1",
          "reviewCount": "156"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "AI Photo Booth Rental Las Vegas",
        "serviceType": "Event Photo Booth Rental",
        "description": "Professional AI-powered photo booth rental for CES, trade shows, and corporate events in Las Vegas. Real-time AI transformations, lead capture, and instant social sharing.",
        "areaServed": {
          "@type": "City",
          "name": "Las Vegas"
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
                <span className="text-sm text-muted-foreground">Serving All Las Vegas Venues</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                #1 AI Photo Booth
                <br />
                <span className="gradient-text">Rental in Las Vegas</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Transform your Las Vegas trade shows and corporate events with AI-powered photo experiences. 
                Real-time transformations, 96% lead capture rate, and seamless CRM integration—the go-to choice for 
                <strong className="text-foreground"> CES exhibitors</strong>, <strong className="text-foreground">Las Vegas Convention Center</strong>, and 80+ premier Vegas venues.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                  Get Free Vegas Quote <ArrowRight size={20} />
                </Link>
                <Link to="/portfolio" className="btn-secondary inline-flex items-center gap-2">
                  View Vegas Portfolio
                </Link>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Check size={16} className="text-primary" /> CES & NAB specialists
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
              beforeAlt="Original photo before AI transformation at Las Vegas event"
              afterAlt="AI-transformed portrait at Las Vegas trade show"
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
              Premier <span className="gradient-text">Las Vegas Venues</span> We Serve
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From massive convention centers to luxury casino resorts, we bring AI photo experiences to 
              Las Vegas's most iconic venues.
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
              AI Photo Booth <span className="gradient-text">Experiences</span> for Vegas Events
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our suite of AI-powered experiences designed for high-impact trade shows 
              and brand activations in Las Vegas.
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
              What <span className="gradient-text">Vegas Clients</span> Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real results from real events across Las Vegas.
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
              Serving All <span className="gradient-text">Las Vegas Valley</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From The Strip to Henderson, we deliver premium AI photo booth experiences across the entire Las Vegas Valley.
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
                Ready to Dominate Your Vegas Trade Show?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join 600+ successful Las Vegas events. Get a custom quote for your venue, 
                see a live demo, and discover how AI photo experiences can transform your trade show booth.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                  Get Free Vegas Quote <ArrowRight size={20} />
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

export default LasVegasPage;