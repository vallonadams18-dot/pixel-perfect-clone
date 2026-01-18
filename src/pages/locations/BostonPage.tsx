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
  { name: 'Boston Convention & Exhibition Center', type: 'Convention Center', events: 'HubSpot INBOUND, Trade Shows & Expos' },
  { name: 'TD Garden', type: 'Arena', events: 'Celtics/Bruins Games & Concerts' },
  { name: 'Fenway Park', type: 'Stadium', events: 'Red Sox Games & Fan Activations' },
  { name: 'Hynes Convention Center', type: 'Convention Center', events: 'Tech Conferences & Industry Events' },
  { name: 'Museum of Fine Arts', type: 'Museum', events: 'Galas & Fundraisers' },
  { name: 'Boston Harbor Hotel', type: 'Luxury Hotel', events: 'Corporate Events & Executive Retreats' },
  { name: 'The Westin Copley Place', type: 'Hotel', events: 'Conferences & Business Events' },
  { name: 'House of Blues Boston', type: 'Entertainment Venue', events: 'Product Launches & Brand Events' },
];

const testimonials = [
  {
    quote: "Our booth at INBOUND was the standout attraction. The AI experience created buzz across the conference floor, and we captured more qualified leads than our previous three years combined.",
    author: "Emily Richardson",
    role: "Director of Events",
    company: "Marketing Technology Company",
    location: "Boston Convention Center",
    metric: "9,400 leads captured",
    rating: 5,
    date: "2024-09-20"
  },
  {
    quote: "The AI trading cards at our Celtics partnership activation were incredible. Fans became part of the team, and our sponsor engagement metrics exceeded all expectations.",
    author: "David O'Brien",
    role: "VP Partnerships",
    company: "Major Financial Services Firm",
    location: "TD Garden",
    metric: "6.1M social reach",
    rating: 5,
    date: "2024-11-15"
  },
  {
    quote: "For our biotech conference at Hynes, the AI headshot experience was perfect. Scientists and executives loved the instant professional portraits.",
    author: "Dr. Sarah Kim",
    role: "Conference Director",
    company: "Biotech Industry Association",
    location: "Hynes Convention Center",
    metric: "98% satisfaction rate",
    rating: 5,
    date: "2024-10-08"
  },
];

// Generate Review schema for Boston location page
const generateBostonReviewSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "PixelAI Pro - AI Photo Booth Rental Boston",
  "image": "https://pixelaipro.lovable.app/og-image.jpg",
  "url": "https://pixelaipro.lovable.app/locations/boston",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "bestRating": "5",
    "worstRating": "1",
    "reviewCount": "89",
    "ratingCount": "89"
  },
  "review": testimonials.map(t => ({
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": t.author
    },
    "datePublished": t.date,
    "reviewBody": t.quote,
    "name": `${t.author} - ${t.location}`,
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": t.rating.toString(),
      "bestRating": "5",
      "worstRating": "1"
    }
  }))
});

const services = [
  {
    title: 'AI Headshots',
    description: 'LinkedIn-ready professional portraits in under 60 seconds',
    link: '/experiences/headshots',
    ideal: 'INBOUND, biotech conferences, networking events'
  },
  {
    title: 'PixelWear Virtual Try-On',
    description: 'Guests try on branded apparel without physical inventory',
    link: '/experiences/pixelwear',
    ideal: 'Celtics/Red Sox games, retail activations, product launches'
  },
  {
    title: 'AI Trading Cards',
    description: 'Custom collectible cards with rarity tiers and AR features',
    link: '/experiences/ai-trading-cards',
    ideal: 'Sports teams, gaming events, tech conventions'
  },
  {
    title: 'Persona Pop',
    description: 'Transform guests into superheroes, anime, or brand characters',
    link: '/experiences/persona-pop',
    ideal: 'Galas, holiday parties, brand experiences'
  },
];

const stats = [
  { value: '220+', label: 'Boston Events', icon: Calendar },
  { value: '1.1M+', label: 'Photos Generated', icon: Users },
  { value: '93%', label: 'Lead Capture Rate', icon: Trophy },
  { value: '50+', label: 'Boston Venues', icon: Building2 },
];

const neighborhoods = [
  'Back Bay', 'Seaport District', 'Financial District', 'Cambridge', 'Fenway',
  'South Boston', 'Beacon Hill', 'North End', 'Brookline', 'Newton'
];

const faqs = [
  {
    question: 'Do you provide AI photo booth rental for HubSpot INBOUND?',
    answer: 'Yes! We\'re experienced INBOUND vendors and understand the unique demands of the conference. We provide AI photo booth rentals for official INBOUND events, sponsor booths, and satellite activations throughout Boston during the conference.'
  },
  {
    question: 'What is the pricing for AI photo booth rental in Boston?',
    answer: 'Our Boston AI photo booth packages start at $1,500 for smaller events and scale based on duration, experience type, and customization needs. For INBOUND and major conferences, we recommend booking 2-4 months in advance for best availability.'
  },
  {
    question: 'Can you set up at Boston\'s historic venues?',
    answer: 'Absolutely! We regularly work at Boston\'s historic and unique venues including the Museum of Fine Arts, Boston Public Library, and waterfront properties. Our equipment is self-contained and we respect venue requirements.'
  },
  {
    question: 'How far in advance should I book for Boston conferences?',
    answer: 'For major Boston events like INBOUND, biotech conferences, or large corporate gatherings, we recommend booking 2-4 months in advance. Popular dates book quickly, especially during fall conference season.'
  },
  {
    question: 'Do you serve the Cambridge and biotech corridor?',
    answer: 'Yes! We serve the entire Greater Boston area including Cambridge, Kendall Square, and the biotech corridor. We\'re familiar with venues at MIT, Harvard, and major biotech campuses.'
  },
  {
    question: 'Can the AI experience be customized for healthcare and biotech brands?',
    answer: 'Absolutely! We specialize in custom AI experiences for healthcare and biotech companies. We can create HIPAA-aware activations, scientific-themed transformations, and experiences that showcase medical innovations.'
  },
  {
    question: 'What makes PixelAI Pro different from traditional Boston photo booths?',
    answer: 'Unlike traditional photo booths, our AI technology creates stunning transformations in real-time. Guests don\'t just take photos—they become superheroes, try on virtual merchandise, or get professional headshots. This drives 3-5x higher engagement.'
  },
  {
    question: 'Do you provide staffing for Boston events?',
    answer: 'Yes, all our Boston packages include professional brand ambassadors who manage the experience, engage guests, and ensure smooth operation. Our staff is trained specifically for Boston\'s diverse professional audiences.'
  },
  {
    question: 'Can you integrate with our marketing automation platform?',
    answer: 'Yes! We offer direct integrations with HubSpot (especially popular for INBOUND), Salesforce, Marketo, and other major platforms. Lead data is captured in real-time and synced automatically.'
  },
  {
    question: 'What happens if there are technical issues during the event?',
    answer: 'Our Boston team provides on-site technical support throughout your event. We bring backup equipment and have local technicians available. In over 220 Boston events, we maintain a 99.9% uptime rate.'
  },
];

const BostonPage = () => {
  usePageMeta({
    title: 'AI Photo Booth Rental Boston | INBOUND & Corporate Events | PixelAI Pro',
    description: 'Boston\'s #1 AI photo booth rental for HubSpot INBOUND, biotech conferences & corporate events. Serving BCEC, TD Garden, Fenway Park & 50+ venues. Real-time AI transformations. Get a free quote!',
    ogImage: '/og-image.jpg',
    canonicalPath: '/locations/boston',
    keywords: 'AI photo booth rental Boston, Boston photo booth, INBOUND photo booth, biotech conference photo booth Boston, brand activation Boston, experiential marketing Boston, corporate event photo booth Boston, Fenway photo booth',
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "PixelAI Pro - AI Photo Booth Rental Boston",
        "description": "Boston's premier AI photo booth company specializing in HubSpot INBOUND, biotech conferences, and experiential marketing throughout Greater Boston.",
        "url": "https://pixelaipro.lovable.app/locations/boston",
        "image": "https://pixelaipro.lovable.app/og-image.jpg",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Boston",
          "addressRegion": "MA",
          "postalCode": "02116",
          "addressCountry": "US"
        },
        "telephone": "+1-917-724-6051",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "42.3601",
          "longitude": "-71.0589"
        },
        "areaServed": [
          { "@type": "City", "name": "Boston" },
          { "@type": "City", "name": "Cambridge" },
          { "@type": "AdministrativeArea", "name": "Back Bay" },
          { "@type": "AdministrativeArea", "name": "Seaport District" }
        ],
        "priceRange": "$$$",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "bestRating": "5",
          "worstRating": "1",
          "reviewCount": "89"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "AI Photo Booth Rental Boston",
        "serviceType": "Event Photo Booth Rental",
        "description": "Professional AI-powered photo booth rental for HubSpot INBOUND, biotech conferences, and brand activations in Boston. Real-time AI transformations, lead capture, and instant social sharing.",
        "areaServed": {
          "@type": "City",
          "name": "Boston"
        },
        "provider": {
          "@type": "LocalBusiness",
          "name": "PixelAI Pro"
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
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://pixelaipro.lovable.app/" },
          { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://pixelaipro.lovable.app/locations/boston" },
          { "@type": "ListItem", "position": 3, "name": "Boston", "item": "https://pixelaipro.lovable.app/locations/boston" }
        ]
      },
      generateBostonReviewSchema()
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
                { label: 'Locations', href: '/locations/boston' },
                { label: 'Boston' }
              ]} />
              <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
                <MapPin size={16} className="text-primary" />
                <span className="text-sm text-muted-foreground">Serving All Boston Venues</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                #1 AI Photo Booth
                <br />
                <span className="gradient-text">Rental in Boston</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Transform your Boston conferences and corporate events with AI-powered photo experiences. 
                Real-time transformations, 93% lead capture rate, and seamless CRM integration—the go-to choice for 
                <strong className="text-foreground"> BCEC</strong>, <strong className="text-foreground">TD Garden</strong>, and 50+ premier Boston venues.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                  Get Free Boston Quote <ArrowRight size={20} />
                </Link>
                <a href="tel:+19177246051" className="btn-secondary inline-flex items-center gap-2">
                  Call (917) 724-6051
                </a>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Check size={16} className="text-primary" /> INBOUND specialists
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
              beforeAlt="Original photo before AI transformation at Boston event"
              afterAlt="AI-transformed portrait at Boston conference"
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
              Premier <span className="gradient-text">Boston Venues</span> We Serve
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From the Boston Convention Center to historic Fenway Park, we bring AI photo experiences to 
              Boston's most prestigious venues.
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
              AI Photo Booth <span className="gradient-text">Experiences</span> for Boston Events
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our suite of AI-powered experiences designed for high-impact conferences 
              and brand activations in Boston.
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
              What <span className="gradient-text">Boston Clients</span> Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real results from real events across Boston and Greater Massachusetts.
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
              Serving All <span className="gradient-text">Greater Boston</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From Back Bay to Cambridge, we deliver premium AI photo booth experiences across the Greater Boston area.
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
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Boston AI Photo Booth <span className="gradient-text">FAQs</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Common questions about our AI photo booth services in Boston.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="glass rounded-xl p-6">
                <h3 className="font-bold text-foreground mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
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
                Ready to Elevate Your Boston Event?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join 220+ successful Boston events. Get a custom quote for your venue, 
                see a live demo, and discover how AI photo experiences can transform your conference or brand activation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                  Get Free Boston Quote <ArrowRight size={20} />
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

export default BostonPage;
