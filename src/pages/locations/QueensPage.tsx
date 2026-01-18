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
  { name: 'Citi Field', type: 'Sports Stadium', events: 'Sports Events & Concerts' },
  { name: 'USTA Billie Jean King National Tennis Center', type: 'Sports Complex', events: 'US Open & Corporate Events' },
  { name: 'Queens Museum', type: 'Cultural Venue', events: 'Galas & Art Events' },
  { name: 'Flushing Town Hall', type: 'Historic Venue', events: 'Cultural Events & Performances' },
  { name: 'The Foundry', type: 'Event Space', events: 'Weddings & Corporate Events' },
  { name: 'Terrace on the Park', type: 'Iconic Venue', events: 'Galas & Celebrations' },
  { name: 'Museum of the Moving Image', type: 'Cultural Venue', events: 'Media Events & Premieres' },
  { name: 'LIC Landing', type: 'Waterfront Venue', events: 'Outdoor Events & Parties' },
];

const testimonials = [
  {
    quote: "Our Citi Field fan activation with PixelAI Pro generated incredible engagement. Fans transformed into their favorite Mets players and the social sharing was off the charts.",
    author: "Mike Rodriguez",
    role: "Fan Experience Director",
    company: "Major Sports Franchise",
    location: "Citi Field, Queens",
    metric: "8,000+ photos generated"
  },
  {
    quote: "The US Open corporate hospitality experience was elevated by the AI headshot booth. Our VIP guests loved the instant professional portraits.",
    author: "Jennifer Liu",
    role: "Events Director",
    company: "Fortune 500 Sponsor",
    location: "USTA National Tennis Center",
    metric: "100% VIP satisfaction"
  },
  {
    quote: "For our LIC tech startup launch, the AI photo booth perfectly matched our innovative brand. The transformations were mind-blowing.",
    author: "Alex Thompson",
    role: "Co-Founder",
    company: "LIC-Based Tech Startup",
    location: "Long Island City",
    metric: "1,200 leads captured"
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
  { value: '100+', label: 'Queens Events', icon: Calendar },
  { value: '250K+', label: 'Photos Generated', icon: Users },
  { value: '93%', label: 'Lead Capture Rate', icon: Trophy },
  { value: '20+', label: 'Queens Venues', icon: Building2 },
];

const neighborhoods = [
  'Long Island City', 'Astoria', 'Flushing', 'Jamaica', 'Forest Hills',
  'Jackson Heights', 'Sunnyside', 'Woodside', 'Bayside', 'Ridgewood'
];

const relatedBoroughs = [
  { name: 'Manhattan', link: '/locations/manhattan' },
  { name: 'Brooklyn', link: '/locations/brooklyn' },
  { name: 'Bronx', link: '/locations/bronx' },
  { name: 'Staten Island', link: '/locations/staten-island' },
];

const faqs = [
  {
    question: 'Do you work at Citi Field and sports venues in Queens?',
    answer: 'Yes! We\'re experienced partners for fan activations at Citi Field and the USTA National Tennis Center. We understand the unique logistics of stadium events and can handle high-volume crowds while maintaining fast turnaround times.'
  },
  {
    question: 'What is the pricing for AI photo booth rental in Queens?',
    answer: 'Queens AI photo booth packages typically start at $1,200 for smaller events and scale based on duration and experience type. Sports venue activations and large-scale events have custom pricing. Contact us for a detailed quote.'
  },
  {
    question: 'Can you set up outdoor events in Queens?',
    answer: 'Absolutely! We regularly work outdoor venues like LIC Landing, Gantry Plaza, and various rooftop spaces. Our equipment includes weather protection and we bring backup power as needed for outdoor activations.'
  },
  {
    question: 'Do you serve Long Island City and Astoria?',
    answer: 'Yes, LIC and Astoria are among our most-served Queens neighborhoods. We work with many of the creative spaces, restaurants, and event venues in these areas. Local pickup is available for these neighborhoods.'
  },
  {
    question: 'How far in advance should I book for Queens events?',
    answer: 'We recommend booking 2-4 weeks in advance for most Queens events. Sports events and peak season (summer, holidays) should be booked 4-6 weeks ahead. For last-minute availability, call us directly at (917) 724-6051.'
  },
  {
    question: 'What types of sports activations do you offer at Queens venues?',
    answer: 'For Queens sports venues, we offer AI Trading Cards (fans become their favorite players), PixelWear virtual jersey try-on, AI Headshots in team gear, and Persona Pop transformations. These are perfect for Citi Field, USTA, and other sports venues.'
  },
  {
    question: 'Can you handle US Open corporate hospitality events?',
    answer: 'Yes! We\'ve worked US Open corporate hospitality suites and sponsor activations. Our AI headshot booth is particularly popular with VIP guests who want professional portraits. We understand the premium experience expected at USTA events.'
  },
  {
    question: 'Do you offer printing at Queens events?',
    answer: 'Yes, we offer instant photo printing at Queens events. Guests receive high-quality 4x6 or 5x7 prints of their AI-transformed photos within seconds. Printing packages can be added to any Queens rental.'
  },
  {
    question: 'What Queens neighborhoods do you cover?',
    answer: 'We serve all Queens neighborhoods including Long Island City, Astoria, Flushing, Jamaica, Forest Hills, Jackson Heights, Sunnyside, Woodside, Bayside, Ridgewood, and more. No Queens venue is too far for our team.'
  },
  {
    question: 'Can you customize AI experiences for Queens cultural events?',
    answer: 'Absolutely! Queens is the most diverse borough, and we love creating culturally relevant AI experiences. We\'ve done custom transformations for Lunar New Year celebrations in Flushing, Caribbean festivals, and multicultural corporate events.'
  },
];

const QueensPage = () => {
  usePageMeta({
    title: 'AI Photo Booth Queens | Citi Field, LIC & Flushing | PixelAI Pro',
    description: 'Queens\' top AI photo booth rental for sports events, corporate parties & brand activations. Serving Citi Field, USTA, Long Island City & 20+ Queens venues. Get your free quote!',
    ogImage: '/og-image.jpg',
    canonicalPath: '/locations/queens',
    keywords: 'AI photo booth Queens, photo booth rental Citi Field, LIC photo booth, Flushing event photographer, sports event photo booth Queens, brand activation Astoria, corporate event Queens, US Open photo booth',
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "PixelAI Pro - AI Photo Booth Queens",
        "description": "Queens' premier AI photo booth company specializing in sports events, corporate parties, and brand activations throughout Long Island City, Flushing, and all Queens neighborhoods.",
        "url": "https://pixelaipro.lovable.app/locations/queens",
        "image": "https://pixelaipro.lovable.app/og-image.jpg",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Queens",
          "addressRegion": "NY",
          "postalCode": "11101",
          "addressCountry": "US"
        },
        "telephone": "+1-917-724-6051",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "40.7282",
          "longitude": "-73.7949"
        },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "Queens" },
          { "@type": "AdministrativeArea", "name": "Long Island City" },
          { "@type": "AdministrativeArea", "name": "Flushing" },
          { "@type": "AdministrativeArea", "name": "Astoria" }
        ],
        "priceRange": "$$$",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "bestRating": "5",
          "worstRating": "1",
          "reviewCount": "34"
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
                { label: 'Queens' }
              ]} />
              <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
                <MapPin size={16} className="text-primary" />
                <span className="text-sm text-muted-foreground">Serving All Queens Neighborhoods</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                AI Photo Booth
                <br />
                <span className="gradient-text">Rental in Queens</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Power up your Queens events with AI photo technology. From <strong className="text-foreground">Citi Field</strong> fan activations to <strong className="text-foreground">Long Island City</strong> corporate events—we bring cutting-edge experiences to the World's Borough.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                  Get Free Queens Quote <ArrowRight size={20} />
                </Link>
                <a href="tel:+19177246051" className="btn-secondary inline-flex items-center gap-2">
                  Call (917) 724-6051
                </a>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Check size={16} className="text-primary" /> Sports venue specialists
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
              beforeAlt="Original photo before AI transformation at Queens event"
              afterAlt="AI-transformed portrait at Queens venue"
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

      {/* Queens Venues Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Premier <span className="gradient-text">Queens Venues</span> We Serve
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From world-class sports stadiums to cultural institutions, we bring AI photo experiences to Queens' most exciting venues.
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
              AI Photo Booth <span className="gradient-text">Experiences</span> for Queens Events
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our suite of AI-powered experiences designed for Queens' diverse event scene.
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
              What <span className="gradient-text">Queens Clients</span> Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real results from real events across Queens.
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

      {/* Queens Neighborhoods */}
      <section className="section-padding bg-card/50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Serving All <span className="gradient-text">Queens Neighborhoods</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From Long Island City to Flushing, we deliver premium AI photo booth experiences across the World's Borough.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {neighborhoods.map((hood) => (
              <span key={hood} className="glass px-4 py-2 rounded-full text-sm text-foreground">
                {hood}
              </span>
            ))}
          </div>

          <div className="border-t border-border pt-8">
            <p className="text-center text-sm text-muted-foreground mb-4">Also serving other NYC boroughs:</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/locations/nyc" className="text-primary hover:underline text-sm font-medium">
                NYC Overview
              </Link>
              {relatedBoroughs.map((borough) => (
                <Link key={borough.name} to={borough.link} className="text-primary hover:underline text-sm font-medium">
                  {borough.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={faqs} title="Queens AI Photo Booth" />

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="glass rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 rounded-full blur-[100px]" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready to Elevate Your Queens Event?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join 100+ successful Queens events. Get a custom quote for your venue, 
                see a live demo, and discover how AI photo experiences can transform your activation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                  Get Free Queens Quote <ArrowRight size={20} />
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

export default QueensPage;