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
  { name: 'Yankee Stadium', type: 'Sports Stadium', events: 'Sports Events & Concerts' },
  { name: 'New York Botanical Garden', type: 'Cultural Venue', events: 'Galas & Outdoor Events' },
  { name: 'Bronx Zoo', type: 'Cultural Attraction', events: 'Corporate Events & Fundraisers' },
  { name: 'The Bronx Museum of the Arts', type: 'Art Museum', events: 'Gallery Events & Galas' },
  { name: 'Wave Hill', type: 'Public Garden', events: 'Weddings & Private Events' },
  { name: 'Pelham Bay Park', type: 'Public Park', events: 'Outdoor Events & Festivals' },
  { name: 'Fordham University', type: 'University', events: 'Academic Events & Conferences' },
  { name: 'Marina del Rey', type: 'Waterfront Venue', events: 'Celebrations & Corporate Events' },
];

const testimonials = [
  {
    quote: "Our Yankee Stadium fan activation with PixelAI Pro was a home run. Fans were transformed into Yankees legends, and the engagement drove massive social buzz.",
    author: "Derek Martinez",
    role: "Fan Experience Manager",
    company: "Major League Franchise",
    location: "Yankee Stadium, Bronx",
    metric: "12,000+ photos generated"
  },
  {
    quote: "The New York Botanical Garden gala was elevated by the AI photo experience. Guests loved being transformed into botanical-themed portraits that matched the venue perfectly.",
    author: "Patricia Wong",
    role: "Development Director",
    company: "Botanical Garden Foundation",
    location: "NY Botanical Garden",
    metric: "92% guest participation"
  },
  {
    quote: "For our Bronx Zoo corporate sponsor event, the AI trading cards featuring endangered species were a huge hit. Guests collected cards all night.",
    author: "James Rodriguez",
    role: "Corporate Partnerships",
    company: "Wildlife Conservation Society",
    location: "Bronx Zoo",
    metric: "500 cards collected"
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
  { value: '75+', label: 'Bronx Events', icon: Calendar },
  { value: '200K+', label: 'Photos Generated', icon: Users },
  { value: '91%', label: 'Lead Capture Rate', icon: Trophy },
  { value: '15+', label: 'Bronx Venues', icon: Building2 },
];

const neighborhoods = [
  'South Bronx', 'Fordham', 'Riverdale', 'Pelham Bay', 'Throgs Neck',
  'Morris Park', 'Hunts Point', 'Mott Haven', 'Kingsbridge', 'Belmont'
];

const relatedBoroughs = [
  { name: 'Manhattan', link: '/locations/manhattan' },
  { name: 'Brooklyn', link: '/locations/brooklyn' },
  { name: 'Queens', link: '/locations/queens' },
  { name: 'Staten Island', link: '/locations/staten-island' },
];

const faqs = [
  {
    question: 'Do you work at Yankee Stadium for sports events?',
    answer: 'Yes! We\'re experienced with Yankee Stadium activations and understand the unique logistics of high-volume sports events. We can handle game-day crowds and provide fast turnaround times to maximize fan engagement.'
  },
  {
    question: 'What is the pricing for AI photo booth rental in the Bronx?',
    answer: 'Bronx AI photo booth packages start at $1,000 for smaller events and scale based on duration and experience type. Yankee Stadium and large venue activations have custom pricing. Contact us for a detailed quote.'
  },
  {
    question: 'Can you set up at outdoor Bronx venues?',
    answer: 'Absolutely! We regularly work at outdoor venues including the New York Botanical Garden, Wave Hill, and Pelham Bay Park. Our equipment includes weather protection and we bring backup power for outdoor events.'
  },
  {
    question: 'Do you serve all Bronx neighborhoods?',
    answer: 'Yes, we serve all Bronx neighborhoods including South Bronx, Fordham, Riverdale, Pelham Bay, and Mott Haven. Our team is familiar with Bronx venues and can provide seamless setup anywhere in the borough.'
  },
  {
    question: 'How do you handle setup at cultural venues like the Bronx Zoo?',
    answer: 'We have experience with the unique requirements of cultural venues. We coordinate with venue staff for access, use self-contained equipment, and can adapt to indoor/outdoor settings. We always prioritize guest experience and venue guidelines.'
  },
  {
    question: 'What AI experiences work best for Yankee Stadium fan activations?',
    answer: 'For Yankee Stadium, AI Trading Cards are our most popular—fans love becoming their own baseball card. PixelWear virtual jersey try-on and AI transformations into Yankees legends are also huge hits. We can customize any experience with Yankees branding.'
  },
  {
    question: 'Do you offer packages for Bronx nonprofit fundraisers?',
    answer: 'Yes! We offer special rates for Bronx nonprofit organizations and cultural institutions. We\'ve worked with the Bronx Zoo, NY Botanical Garden, and various community organizations. Contact us about nonprofit pricing.'
  },
  {
    question: 'Can you handle Fordham University events?',
    answer: 'Absolutely! We work with Fordham University for student events, alumni gatherings, and academic conferences. Our AI headshot booth is particularly popular for career fairs and networking events.'
  },
  {
    question: 'What\'s the turnaround time for photos at Bronx events?',
    answer: 'Our AI transformations are ready in under 60 seconds. Guests receive their photos instantly via text, email, or AirDrop. For printed photos, we deliver 4x6 or 5x7 prints within 30 seconds of the transformation completing.'
  },
  {
    question: 'Do you provide bilingual staff for Bronx events?',
    answer: 'Yes! Given the Bronx\'s diverse community, we can provide Spanish-speaking brand ambassadors and bilingual signage. Let us know your language needs when booking.'
  },
];

const BronxPage = () => {
  usePageMeta({
    title: 'AI Photo Booth Bronx | Yankee Stadium & Botanical Garden | PixelAI Pro',
    description: 'Bronx\'s top AI photo booth rental for sports events, galas & brand activations. Serving Yankee Stadium, NY Botanical Garden, Bronx Zoo & 15+ Bronx venues. Get your free quote!',
    ogImage: '/og-image.jpg',
    canonicalPath: '/locations/bronx',
    keywords: 'AI photo booth Bronx, photo booth rental Bronx, photo booth rental Yankee Stadium, Bronx Zoo photo booth, NY Botanical Garden event, sports event photo booth Bronx, brand activation Bronx, corporate event Bronx, Fordham photo booth, glam photo booth Bronx, 360 photo booth Bronx, event activation Bronx',
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "PixelAI Pro - AI Photo Booth Bronx",
        "description": "Bronx's premier AI photo booth company specializing in sports events, galas, and brand activations at Yankee Stadium, NY Botanical Garden, and throughout the Bronx.",
        "url": "https://pixelaipro.lovable.app/locations/bronx",
        "image": "https://pixelaipro.lovable.app/og-image.jpg",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Bronx",
          "addressRegion": "NY",
          "postalCode": "10451",
          "addressCountry": "US"
        },
        "telephone": "+1-917-724-6051",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "40.8448",
          "longitude": "-73.8648"
        },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "Bronx" },
          { "@type": "AdministrativeArea", "name": "Fordham" },
          { "@type": "AdministrativeArea", "name": "Riverdale" },
          { "@type": "AdministrativeArea", "name": "South Bronx" }
        ],
        "priceRange": "$$",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "bestRating": "5",
          "worstRating": "1",
          "reviewCount": "28"
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
                { label: 'Bronx' }
              ]} />
              <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
                <MapPin size={16} className="text-primary" />
                <span className="text-sm text-muted-foreground">Serving All Bronx Neighborhoods</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                AI Photo Booth
                <br />
                <span className="gradient-text">Rental in The Bronx</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Bring AI photo magic to the Bronx. From <strong className="text-foreground">Yankee Stadium</strong> fan activations to <strong className="text-foreground">NY Botanical Garden</strong> galas—we deliver unforgettable experiences in the birthplace of hip-hop.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                  Get Free Bronx Quote <ArrowRight size={20} />
                </Link>
                <a href="tel:+19177246051" className="btn-secondary inline-flex items-center gap-2">
                  Call (917) 724-6051
                </a>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Check size={16} className="text-primary" /> Yankee Stadium experts
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
              beforeAlt="Original photo before AI transformation at Bronx event"
              afterAlt="AI-transformed portrait at Bronx venue"
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

      {/* Bronx Venues Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Premier <span className="gradient-text">Bronx Venues</span> We Serve
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From legendary sports venues to world-class gardens, we bring AI photo experiences to the Bronx's most iconic locations.
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
              AI Photo Booth <span className="gradient-text">Experiences</span> for Bronx Events
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our suite of AI-powered experiences designed for the Bronx's diverse event landscape.
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
              What <span className="gradient-text">Bronx Clients</span> Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real results from real events across the Bronx.
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

      {/* Bronx Neighborhoods */}
      <section className="section-padding bg-card/50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Serving All <span className="gradient-text">Bronx Neighborhoods</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From the South Bronx to Riverdale, we deliver premium AI photo booth experiences across the borough.
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
      <FAQSection faqs={faqs} title="Bronx AI Photo Booth" />

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="glass rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 rounded-full blur-[100px]" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready to Elevate Your Bronx Event?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join 75+ successful Bronx events. Get a custom quote for your venue, 
                see a live demo, and discover how AI photo experiences can transform your activation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                  Get Free Bronx Quote <ArrowRight size={20} />
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

export default BronxPage;