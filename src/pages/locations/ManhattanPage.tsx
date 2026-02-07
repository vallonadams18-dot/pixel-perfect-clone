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
  { name: 'Javits Center', type: 'Convention Center', events: 'Trade Shows & Conferences' },
  { name: 'The Plaza Hotel', type: 'Iconic Hotel', events: 'Luxury Events & Galas' },
  { name: 'Cipriani Wall Street', type: 'Luxury Venue', events: 'Executive Events & Award Shows' },
  { name: 'The Metropolitan Museum', type: 'Cultural Venue', events: 'Galas & Fundraisers' },
  { name: 'Spring Studios', type: 'Creative Space', events: 'Fashion Shows & Media Events' },
  { name: 'The Glasshouse', type: 'Modern Venue', events: 'Tech Launches & Corporate Events' },
  { name: 'Gotham Hall', type: 'Historic Venue', events: 'Corporate Galas & Weddings' },
  { name: 'The Rainbow Room', type: 'Iconic Venue', events: 'Executive Events & Celebrations' },
];

const testimonials = [
  {
    quote: "Our Wall Street client appreciation dinner at Cipriani was elevated by PixelAI Pro's AI headshot experience. Every executive left with a polished portrait, and the activation became the talking point of the evening.",
    author: "Robert Chen",
    role: "Partner",
    company: "Global Investment Bank",
    location: "Cipriani Wall Street",
    metric: "100% executive participation"
  },
  {
    quote: "The Javits Center trade show booth powered by PixelAI Pro generated more leads than any activation we've ever run. The AI transformations stopped people in their tracks.",
    author: "Lisa Thompson",
    role: "VP of Events",
    company: "Fortune 100 Technology Company",
    location: "Javits Center",
    metric: "4,500 leads in 3 days"
  },
  {
    quote: "For our Midtown product launch, the AI photo booth created shareable moments that dominated social media. Our hashtag trended in NYC for 24 hours.",
    author: "Marcus Williams",
    role: "Brand Director",
    company: "Luxury Fashion House",
    location: "Spring Studios",
    metric: "3.2M social reach"
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
  { value: '350+', label: 'Manhattan Events', icon: Calendar },
  { value: '1.5M+', label: 'Photos Generated', icon: Users },
  { value: '96%', label: 'Lead Capture Rate', icon: Trophy },
  { value: '40+', label: 'Manhattan Venues', icon: Building2 },
];

const neighborhoods = [
  'Midtown', 'Times Square', 'Hudson Yards', 'Financial District', 'SoHo',
  'Tribeca', 'Chelsea', 'Upper East Side', 'Upper West Side', 'Flatiron'
];

const relatedBoroughs = [
  { name: 'Brooklyn', link: '/locations/brooklyn' },
  { name: 'Queens', link: '/locations/queens' },
  { name: 'Bronx', link: '/locations/bronx' },
  { name: 'Staten Island', link: '/locations/staten-island' },
];

const faqs = [
  {
    question: 'What Manhattan venues do you work with most often?',
    answer: 'We regularly service Manhattan\'s premier venues including Javits Center, Cipriani Wall Street, The Plaza Hotel, Spring Studios, The Glasshouse, and Gotham Hall. We\'re familiar with the logistics of each venue and can provide seamless setup anywhere in Manhattan.'
  },
  {
    question: 'How do you handle Manhattan parking and load-in?',
    answer: 'We handle all Manhattan logistics including parking permits, loading dock coordination, and freight elevator scheduling. Our team is experienced with the unique challenges of Manhattan venues and always arrives early to ensure smooth setup.'
  },
  {
    question: 'What is the typical cost for a Manhattan corporate event?',
    answer: 'Manhattan corporate event packages typically range from $2,500 to $8,000+ depending on the experience, duration, and customization level. Premium venues like The Plaza or Cipriani may include additional setup considerations. Contact us for a detailed quote.'
  },
  {
    question: 'Can you provide same-day setup in Manhattan?',
    answer: 'Yes, we offer same-day setup for Manhattan events when available. Our Manhattan-based inventory allows for rapid deployment. For last-minute requests, call (917) 724-6051 directly to check availability.'
  },
  {
    question: 'Do you work with Manhattan event planners and agencies?',
    answer: 'Absolutely! We partner with many of Manhattan\'s top event planners and experiential agencies. We offer agency rates, white-label options, and can integrate seamlessly with your broader event production.'
  },
  {
    question: 'What AI photo experiences are most popular for Manhattan corporate events?',
    answer: 'For Manhattan corporate events, AI Headshots are our most requested experience—executives love leaving with LinkedIn-ready portraits. PixelWear virtual try-on is popular for retail and fashion brands, while Persona Pop transformations are hits at galas and holiday parties.'
  },
  {
    question: 'How does lead capture work at Manhattan trade shows?',
    answer: 'Our AI photo booths integrate with major CRM systems (Salesforce, HubSpot, Marketo) for real-time lead capture. Guests provide contact info to receive their photos, giving you qualified leads with 95%+ capture rates at Javits Center and other Manhattan trade show venues.'
  },
  {
    question: 'Can you handle high-volume Manhattan events with 1,000+ guests?',
    answer: 'Yes! We\'ve successfully managed events with 5,000+ guests at venues like Javits Center. For high-volume events, we deploy multiple stations and additional staff to maintain fast throughput while keeping wait times under 2 minutes.'
  },
  {
    question: 'Do you offer branded experiences for Manhattan product launches?',
    answer: 'Absolutely. We create fully branded AI experiences including custom transformation styles, branded UI/overlays, custom sharing pages with your domain, and integration with your marketing stack. Perfect for Manhattan product launches and brand activations.'
  },
  {
    question: 'What areas of Manhattan do you serve?',
    answer: 'We serve all Manhattan neighborhoods including Midtown, Times Square, Hudson Yards, Financial District, SoHo, Tribeca, Chelsea, Upper East Side, Upper West Side, Flatiron, and more. No venue is too far—we cover the entire island.'
  },
];

const ManhattanPage = () => {
  usePageMeta({
    title: 'AI Photo Booth Manhattan NY | Corporate Events & Galas | PixelAI Pro',
    description: 'Manhattan\'s premier AI photo booth rental for corporate events & galas. Serving Javits Center, Cipriani, The Plaza & 40+ Manhattan venues. Fortune 500 trusted. Get your free quote!',
    ogImage: '/og-image.jpg',
    canonicalPath: '/locations/manhattan',
    keywords: 'AI photo booth Manhattan, photo booth rental Manhattan, photo booth rental Midtown, Times Square photo booth, Wall Street event photographer, corporate event Manhattan, brand activation SoHo, trade show Javits Center, photo booth Financial District, glam photo booth Manhattan, 360 photo booth Manhattan, corporate brand activation Manhattan, event activation Manhattan',
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "PixelAI Pro - AI Photo Booth Manhattan",
        "description": "Manhattan's premier AI photo booth company specializing in corporate events, galas, and Fortune 500 activations throughout Midtown, Financial District, and all Manhattan neighborhoods.",
        "url": "https://pixelaipro.lovable.app/locations/manhattan",
        "image": "https://pixelaipro.lovable.app/og-image.jpg",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Manhattan",
          "addressRegion": "NY",
          "postalCode": "10001",
          "addressCountry": "US"
        },
        "telephone": "+1-917-724-6051",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "40.7831",
          "longitude": "-73.9712"
        },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "Manhattan" },
          { "@type": "AdministrativeArea", "name": "Midtown" },
          { "@type": "AdministrativeArea", "name": "Financial District" },
          { "@type": "AdministrativeArea", "name": "SoHo" }
        ],
        "priceRange": "$$$$",
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
                { label: 'Manhattan' }
              ]} />
              <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
                <MapPin size={16} className="text-primary" />
                <span className="text-sm text-muted-foreground">Serving All Manhattan Neighborhoods</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                AI Photo Booth
                <br />
                <span className="gradient-text">Rental in Manhattan</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Bring world-class AI photo experiences to Manhattan's most prestigious venues. From <strong className="text-foreground">Javits Center</strong> trade shows to <strong className="text-foreground">Wall Street</strong> galas—trusted by Fortune 500 brands for high-stakes corporate events.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                  Get Free Manhattan Quote <ArrowRight size={20} />
                </Link>
                <a href="tel:+19177246051" className="btn-secondary inline-flex items-center gap-2">
                  Call (917) 724-6051
                </a>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Check size={16} className="text-primary" /> Fortune 500 trusted
                </span>
                <span className="flex items-center gap-2">
                  <Check size={16} className="text-primary" /> 40+ Manhattan venues
                </span>
              </div>
            </div>
            
            <BeforeAfterSlider
              beforeImage={beforeImage}
              afterImage={afterImage}
              beforeLabel="Original"
              afterLabel="AI Enhanced"
              beforeAlt="Original photo before AI transformation at Manhattan corporate event"
              afterAlt="AI-transformed portrait at Manhattan venue"
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

      {/* Manhattan Venues Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Premier <span className="gradient-text">Manhattan Venues</span> We Serve
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From iconic hotels to world-class convention centers, we deliver AI photo experiences at Manhattan's most prestigious addresses.
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
              AI Photo Booth <span className="gradient-text">Experiences</span> for Manhattan Events
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our suite of AI-powered experiences designed for Manhattan's most demanding corporate clients.
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
              What <span className="gradient-text">Manhattan Clients</span> Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real results from real events across Manhattan.
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

      {/* Manhattan Neighborhoods */}
      <section className="section-padding bg-card/50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Serving All <span className="gradient-text">Manhattan Neighborhoods</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From Times Square to the Financial District, we deliver premium AI photo booth experiences across the island.
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
      <FAQSection faqs={faqs} title="Manhattan AI Photo Booth" />

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="glass rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 rounded-full blur-[100px]" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready to Elevate Your Manhattan Event?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join 350+ successful Manhattan events. Get a custom quote for your venue, 
                see a live demo, and discover how AI photo experiences can transform your activation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                  Get Free Manhattan Quote <ArrowRight size={20} />
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

export default ManhattanPage;