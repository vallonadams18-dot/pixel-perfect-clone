import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Star, Check, Building2, Calendar, Users, Trophy, Train } from 'lucide-react';
import usePageMeta from '@/hooks/usePageMeta';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import FAQSection from '@/components/FAQSection';
import beforeImage from '@/assets/before-transformation-4k.jpg';
import afterImage from '@/assets/after-transformation.jpg';

const boroughs = [
  {
    name: 'Manhattan',
    link: '/locations/manhattan',
    description: 'The heart of NYC with iconic venues like Javits Center, The Plaza, and Cipriani Wall Street.',
    neighborhoods: ['Midtown', 'SoHo', 'Financial District', 'Times Square'],
    events: '350+ events served'
  },
  {
    name: 'Brooklyn',
    link: '/locations/brooklyn',
    description: 'Creative hub featuring Industry City, Brooklyn Museum, and DUMBO waterfront venues.',
    neighborhoods: ['Williamsburg', 'DUMBO', 'Park Slope', 'Bushwick'],
    events: '150+ events served'
  },
  {
    name: 'Queens',
    link: '/locations/queens',
    description: 'Diverse venues from Flushing Meadows to Astoria, perfect for multicultural events.',
    neighborhoods: ['Astoria', 'Long Island City', 'Flushing', 'Jamaica'],
    events: '80+ events served'
  },
  {
    name: 'The Bronx',
    link: '/locations/bronx',
    description: 'Home to Yankee Stadium, The Bronx Zoo, and emerging event spaces.',
    neighborhoods: ['South Bronx', 'Fordham', 'Riverdale', 'Pelham Bay'],
    events: '40+ events served'
  },
  {
    name: 'Staten Island',
    link: '/locations/staten-island',
    description: 'Waterfront venues with Manhattan skyline views and suburban charm.',
    neighborhoods: ['St. George', 'Tottenville', 'Great Kills', 'New Dorp'],
    events: '25+ events served'
  },
];

const stats = [
  { value: '650+', label: 'NYC Events', icon: Calendar },
  { value: '2.5M+', label: 'Photos Generated', icon: Users },
  { value: '96%', label: 'Lead Capture Rate', icon: Trophy },
  { value: '100+', label: 'NYC Venues', icon: Building2 },
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

const testimonials = [
  {
    quote: "PixelAI Pro handled our multi-venue NYC event across Manhattan and Brooklyn seamlessly. The consistency of experience across boroughs was impressive, and our guests loved the AI transformations.",
    author: "Jennifer Walsh",
    role: "VP of Events",
    company: "Fortune 100 Tech Company",
    location: "Multi-Borough NYC Event",
    metric: "8,500 photos across 3 venues"
  },
  {
    quote: "From our Bronx community event to our Manhattan gala, PixelAI Pro delivered the same premium experience. They understand NYC logistics like no other.",
    author: "Marcus Johnson",
    role: "Events Director",
    company: "NYC Non-Profit Foundation",
    location: "Bronx & Manhattan",
    metric: "100% satisfaction rate"
  },
  {
    quote: "We needed photo booths at all five boroughs for our citywide campaign. PixelAI Pro coordinated flawlessly and captured 15,000+ leads in one weekend.",
    author: "David Chen",
    role: "Marketing Director",
    company: "Major NYC Brand",
    location: "All Five Boroughs",
    metric: "15,000+ leads captured"
  },
];

const faqs = [
  {
    question: 'Do you serve all five boroughs of NYC?',
    answer: 'Yes! We provide AI photo booth services throughout all five boroughs: Manhattan, Brooklyn, Queens, The Bronx, and Staten Island. Our NYC-based team can set up at any venue across the city, from Javits Center in Manhattan to venues on Staten Island.'
  },
  {
    question: 'Can you handle multi-venue events across different NYC boroughs?',
    answer: 'Absolutely! We specialize in coordinating multi-venue NYC events. Whether you need booths at three Manhattan locations or spread across all five boroughs, we have the inventory and staff to deliver consistent, high-quality experiences at each location simultaneously.'
  },
  {
    question: 'What is the pricing for AI photo booth rental in NYC?',
    answer: 'NYC pricing varies by borough and event scope. Manhattan events typically range from $2,500-$8,000+, while outer borough events start at $1,500. Multi-borough discounts are available. Contact us for a custom quote tailored to your specific venues and requirements.'
  },
  {
    question: 'How do you handle NYC parking and load-in logistics?',
    answer: 'Our team is experienced with NYC logistics including loading dock coordination, freight elevators, parking permits, and tight setup windows. We handle all venue-specific requirements and always arrive early to ensure seamless setup regardless of borough.'
  },
  {
    question: 'Which NYC venues do you work with most frequently?',
    answer: 'We regularly service venues across all boroughs including Javits Center, Cipriani Wall Street, The Plaza (Manhattan), Industry City, Brooklyn Museum (Brooklyn), Flushing Meadows, Citi Field (Queens), Yankee Stadium (Bronx), and various Staten Island waterfront venues.'
  },
  {
    question: 'Do you offer same-day setup anywhere in NYC?',
    answer: 'Yes, we offer same-day setup throughout NYC when available. Our Manhattan-based inventory allows rapid deployment to any borough. For last-minute requests, call (917) 724-6051 directly. Travel time varies by borough—same-day Staten Island requests may have limited availability.'
  },
  {
    question: 'What types of NYC events do you serve?',
    answer: 'We serve all NYC event types: corporate conferences, trade shows, product launches, galas, fundraisers, bar/bat mitzvahs, brand activations, sports events, fashion shows, and private celebrations. Our AI experiences adapt to any theme or brand across all five boroughs.'
  },
  {
    question: 'How many guests can you handle at NYC events?',
    answer: 'We\'ve managed events with 10,000+ guests at venues like Javits Center. For high-volume NYC events, we deploy multiple stations and additional staff to maintain fast throughput while keeping wait times under 2 minutes per guest.'
  },
  {
    question: 'Do you provide on-site staff for NYC events?',
    answer: 'Every NYC booking includes trained brand ambassadors who manage the experience and assist guests. For multi-borough events, we assign dedicated teams to each location to ensure consistent quality across all venues.'
  },
  {
    question: 'Can you provide branded experiences for NYC brand activations?',
    answer: 'Yes! We create fully branded AI experiences including custom transformation styles, branded UI/overlays, custom sharing pages, and CRM integration. NYC brands love our customization for product launches, pop-ups, and experiential marketing campaigns.'
  },
];

const majorVenues = [
  { name: 'Javits Center', borough: 'Manhattan' },
  { name: 'Barclays Center', borough: 'Brooklyn' },
  { name: 'Citi Field', borough: 'Queens' },
  { name: 'Yankee Stadium', borough: 'Bronx' },
  { name: 'The Plaza Hotel', borough: 'Manhattan' },
  { name: 'Brooklyn Museum', borough: 'Brooklyn' },
  { name: 'USTA Billie Jean King Center', borough: 'Queens' },
  { name: 'Snug Harbor', borough: 'Staten Island' },
];

const NYCFiveBoroughsPage = () => {
  usePageMeta({
    title: 'AI Photo Booth NYC Five Boroughs | Manhattan, Brooklyn, Queens, Bronx & Staten Island | PixelAI Pro',
    description: 'NYC\'s premier AI photo booth rental serving all five boroughs. From Manhattan to Staten Island, we bring cutting-edge AI experiences to 100+ venues. Fortune 500 trusted. Get your free quote!',
    ogImage: '/og-image.jpg',
    canonicalPath: '/locations/nyc-five-boroughs',
    keywords: 'AI photo booth NYC, photo booth rental NYC, NYC five boroughs photo booth, Manhattan photo booth, Brooklyn photo booth, Queens photo booth, Bronx photo booth, Staten Island photo booth, corporate event NYC, brand activation New York, NYC event photographer, multi-venue photo booth NYC, citywide photo booth rental',
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "PixelAI Pro - AI Photo Booth NYC Five Boroughs",
        "description": "NYC's premier AI photo booth company serving all five boroughs: Manhattan, Brooklyn, Queens, The Bronx, and Staten Island. Specializing in corporate events, brand activations, and multi-venue experiences.",
        "url": "https://pixelaipro.lovable.app/locations/nyc-five-boroughs",
        "image": "https://pixelaipro.lovable.app/og-image.jpg",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "New York",
          "addressRegion": "NY",
          "postalCode": "10001",
          "addressCountry": "US"
        },
        "telephone": "+1-917-724-6051",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "40.7128",
          "longitude": "-74.0060"
        },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "Manhattan" },
          { "@type": "AdministrativeArea", "name": "Brooklyn" },
          { "@type": "AdministrativeArea", "name": "Queens" },
          { "@type": "AdministrativeArea", "name": "The Bronx" },
          { "@type": "AdministrativeArea", "name": "Staten Island" }
        ],
        "priceRange": "$$$",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "bestRating": "5",
          "worstRating": "1",
          "reviewCount": "187"
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
                { label: 'NYC Five Boroughs' }
              ]} />
              <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
                <Train size={16} className="text-primary" />
                <span className="text-sm text-muted-foreground">Serving All 5 NYC Boroughs</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                AI Photo Booth
                <br />
                <span className="gradient-text">NYC Five Boroughs</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                From <strong className="text-foreground">Manhattan</strong> skyscrapers to <strong className="text-foreground">Brooklyn</strong> creative spaces, <strong className="text-foreground">Queens</strong> diversity, <strong className="text-foreground">Bronx</strong> energy, and <strong className="text-foreground">Staten Island</strong> waterfront—we bring world-class AI experiences to every corner of NYC.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                  Get Free NYC Quote <ArrowRight size={20} />
                </Link>
                <a href="tel:+19177246051" className="btn-secondary inline-flex items-center gap-2">
                  Call (917) 724-6051
                </a>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Check size={16} className="text-primary" /> All 5 boroughs covered
                </span>
                <span className="flex items-center gap-2">
                  <Check size={16} className="text-primary" /> Multi-venue coordination
                </span>
              </div>
            </div>
            
            <BeforeAfterSlider
              beforeImage={beforeImage}
              afterImage={afterImage}
              beforeLabel="Original"
              afterLabel="AI Enhanced"
              beforeAlt="Original photo before AI transformation at NYC event"
              afterAlt="AI-transformed portrait at NYC venue"
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

      {/* Five Boroughs Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              AI Photo Booth Services in <span className="gradient-text">All Five Boroughs</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each NYC borough has its unique character, venues, and events. We tailor our AI experiences to match the vibe of every neighborhood.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {boroughs.map((borough) => (
              <Link
                key={borough.name}
                to={borough.link}
                className="glass rounded-xl p-8 hover:border-primary/50 transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <MapPin size={24} className="text-primary" />
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {borough.name}
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">{borough.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {borough.neighborhoods.map((hood) => (
                    <span key={hood} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {hood}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-primary font-medium">{borough.events}</span>
                  <ArrowRight size={16} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Major Venues */}
      <section className="section-padding bg-card/50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Iconic <span className="gradient-text">NYC Venues</span> We Serve
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From world-famous stadiums to boutique event spaces, we deliver premium AI experiences across NYC's most prestigious addresses.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {majorVenues.map((venue) => (
              <div key={venue.name} className="glass rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
                <h3 className="font-bold text-foreground mb-2">{venue.name}</h3>
                <p className="text-sm text-primary">{venue.borough}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              AI Photo Booth <span className="gradient-text">Experiences</span> for NYC Events
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our suite of AI-powered experiences designed for NYC's most demanding events across all five boroughs.
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
      <section className="section-padding bg-card/50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              What <span className="gradient-text">NYC Clients</span> Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real results from real events across all five boroughs.
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
                  <p className="text-sm text-primary">{testimonial.company}</p>
                  <p className="text-xs text-muted-foreground mt-2 font-medium">{testimonial.metric}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="glass rounded-2xl p-12 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Book Your <span className="gradient-text">NYC Event</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Whether you're planning a Manhattan gala, Brooklyn product launch, Queens community event, Bronx celebration, or Staten Island gathering—we've got you covered.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                Get Free Quote <ArrowRight size={20} />
              </Link>
              <a href="tel:+19177246051" className="btn-secondary inline-flex items-center gap-2">
                Call (917) 724-6051
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={faqs} title="NYC Five Boroughs" />

      {/* Internal Links */}
      <section className="section-padding bg-card/50">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              Explore Each Borough
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {boroughs.map((borough) => (
              <Link
                key={borough.name}
                to={borough.link}
                className="glass px-6 py-3 rounded-full hover:border-primary/50 transition-colors text-foreground hover:text-primary"
              >
                {borough.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NYCFiveBoroughsPage;
