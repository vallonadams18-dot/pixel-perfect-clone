import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Star, Check, Building2, Calendar, Users, Trophy } from 'lucide-react';
import usePageMeta from '@/hooks/usePageMeta';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import FAQSection from '@/components/FAQSection';
import beforeImage from '@/assets/before-transformation-4k.jpg';
import afterImage from '@/assets/after-transformation.jpg';

const venues = [
  { name: 'Snug Harbor Cultural Center', type: 'Cultural Complex', events: 'Galas & Outdoor Events' },
  { name: 'The Vanderbilt at South Beach', type: 'Event Venue', events: 'Weddings & Corporate Events' },
  { name: 'Historic Richmond Town', type: 'Historic Site', events: 'Cultural Events & Festivals' },
  { name: 'Staten Island Museum', type: 'Museum', events: 'Galas & Private Events' },
  { name: 'The Stone House', type: 'Restaurant Venue', events: 'Private Events & Celebrations' },
  { name: 'The Staaten', type: 'Catering Hall', events: 'Weddings & Corporate Events' },
  { name: 'Nicotra\'s Ballroom', type: 'Event Center', events: 'Galas & Large Events' },
  { name: 'Conference House Park', type: 'Historic Park', events: 'Outdoor Events & Weddings' },
];

const testimonials = [
  {
    quote: "Our Snug Harbor gala was transformed by PixelAI Pro's AI photo booth. The botanical-themed transformations matched the venue perfectly and guests couldn't stop sharing on social media.",
    author: "Maria Costello",
    role: "Event Director",
    company: "Staten Island Arts Foundation",
    location: "Snug Harbor Cultural Center",
    metric: "450 photos generated"
  },
  {
    quote: "The AI headshot booth at our St. George business mixer was a hit. Every attendee left with a professional portrait—it made networking so much more memorable.",
    author: "Robert DiNapoli",
    role: "Chamber President",
    company: "Staten Island Chamber of Commerce",
    location: "St. George, Staten Island",
    metric: "100% attendee participation"
  },
  {
    quote: "For our Historic Richmond Town festival, the AI trading cards featuring historical figures were absolutely perfect. Families collected them all day.",
    author: "Jennifer Walsh",
    role: "Programs Manager",
    company: "Historic Richmond Town",
    location: "Historic Richmond Town",
    metric: "1,200 cards created"
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
  { value: '50+', label: 'Staten Island Events', icon: Calendar },
  { value: '75K+', label: 'Photos Generated', icon: Users },
  { value: '90%', label: 'Lead Capture Rate', icon: Trophy },
  { value: '12+', label: 'Staten Island Venues', icon: Building2 },
];

const neighborhoods = [
  'St. George', 'Tottenville', 'Great Kills', 'New Dorp', 'Stapleton',
  'Rosebank', 'Port Richmond', 'West Brighton', 'Eltingville', 'Annadale'
];

const faqs = [
  {
    question: 'Do you travel to Staten Island for events?',
    answer: 'Absolutely! We regularly serve Staten Island and include travel in our packages. Whether your event is at Snug Harbor, The Vanderbilt, or a private venue, we handle all logistics including ferry or bridge transport of our equipment.'
  },
  {
    question: 'What is the pricing for AI photo booth rental in Staten Island?',
    answer: 'Staten Island AI photo booth packages start at $1,200 for smaller events and include travel. Larger events and multi-day activations have custom pricing. We offer competitive rates for Staten Island venues. Contact us for a detailed quote.'
  },
  {
    question: 'Can you set up at outdoor Staten Island venues?',
    answer: 'Yes! We love Staten Island\'s beautiful outdoor venues including Snug Harbor, Conference House Park, and various waterfront locations. Our equipment includes weather protection and we bring backup power for outdoor events.'
  },
  {
    question: 'How far in advance should I book for Staten Island events?',
    answer: 'We recommend booking 2-3 weeks in advance for Staten Island events. Weekend events during peak season (summer, holidays) should be booked 4+ weeks ahead. For last-minute availability, call us directly at (917) 724-6051.'
  },
  {
    question: 'Do you serve the entire Staten Island area?',
    answer: 'Yes, we serve all Staten Island neighborhoods from St. George to Tottenville. We\'re familiar with venues throughout the borough and can provide seamless setup at any location.'
  },
];

const StatenIslandPage = () => {
  usePageMeta({
    title: 'AI Photo Booth Staten Island | Snug Harbor & St. George | PixelAI Pro',
    description: 'Staten Island\'s top AI photo booth rental for weddings, galas & corporate events. Serving Snug Harbor, The Vanderbilt, Historic Richmond Town & 12+ Staten Island venues. Get your free quote!',
    ogImage: '/og-image.jpg',
    canonicalPath: '/locations/staten-island',
    keywords: 'AI photo booth Staten Island, photo booth rental St. George, Snug Harbor photo booth, Staten Island wedding photo booth, corporate event Staten Island, brand activation Staten Island, photo booth Tottenville, event photographer Staten Island',
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "PixelAI Pro - AI Photo Booth Staten Island",
        "description": "Staten Island's premier AI photo booth company specializing in weddings, galas, and corporate events at Snug Harbor, The Vanderbilt, and throughout Staten Island.",
        "url": "https://pixelaipro.lovable.app/locations/staten-island",
        "image": "https://pixelaipro.lovable.app/og-image.jpg",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Staten Island",
          "addressRegion": "NY",
          "postalCode": "10301",
          "addressCountry": "US"
        },
        "telephone": "+1-917-724-6051",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "40.5795",
          "longitude": "-74.1502"
        },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "Staten Island" },
          { "@type": "AdministrativeArea", "name": "St. George" },
          { "@type": "AdministrativeArea", "name": "Tottenville" },
          { "@type": "AdministrativeArea", "name": "Great Kills" }
        ],
        "priceRange": "$$",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "bestRating": "5",
          "worstRating": "1",
          "reviewCount": "19"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
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
              <Breadcrumbs items={[
                { label: 'Locations', href: '/locations/nyc' },
                { label: 'Staten Island' }
              ]} />
              <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
                <MapPin size={16} className="text-primary" />
                <span className="text-sm text-muted-foreground">Serving All Staten Island Neighborhoods</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                AI Photo Booth
                <br />
                <span className="gradient-text">Rental in Staten Island</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Bring cutting-edge AI photo experiences to Staten Island's beautiful venues. From <strong className="text-foreground">Snug Harbor</strong> galas to <strong className="text-foreground">St. George</strong> corporate events—we deliver memorable moments on the forgotten borough.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                  Get Free Staten Island Quote <ArrowRight size={20} />
                </Link>
                <a href="tel:+19177246051" className="btn-secondary inline-flex items-center gap-2">
                  Call (917) 724-6051
                </a>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Check size={16} className="text-primary" /> Travel included
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
              beforeAlt="Original photo before AI transformation at Staten Island event"
              afterAlt="AI-transformed portrait at Staten Island venue"
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

      {/* Staten Island Venues Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Premier <span className="gradient-text">Staten Island Venues</span> We Serve
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From historic cultural centers to waterfront venues, we bring AI photo experiences to Staten Island's most beautiful locations.
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

      {/* Services */}
      <section className="section-padding bg-card/50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              AI Photo Booth <span className="gradient-text">Experiences</span> for Staten Island Events
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our suite of AI-powered experiences perfect for Staten Island's intimate venues and community events.
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
              What <span className="gradient-text">Staten Island Clients</span> Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real results from real events across Staten Island.
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

      {/* Staten Island Neighborhoods */}
      <section className="section-padding bg-card/50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Serving All <span className="gradient-text">Staten Island Neighborhoods</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From St. George to Tottenville, we deliver premium AI photo booth experiences across the island.
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

      {/* FAQ Section */}
      <FAQSection faqs={faqs} title="Staten Island AI Photo Booth" />

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="glass rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 rounded-full blur-[100px]" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready to Elevate Your Staten Island Event?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join 50+ successful Staten Island events. Get a custom quote for your venue, 
                see a live demo, and discover how AI photo experiences can transform your activation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                  Get Free Staten Island Quote <ArrowRight size={20} />
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

export default StatenIslandPage;