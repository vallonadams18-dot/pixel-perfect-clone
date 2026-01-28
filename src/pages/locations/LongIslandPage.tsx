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
  { name: 'The Cradle of Aviation Museum', type: 'Museum & Event Space', events: 'Corporate Events & Galas' },
  { name: 'Oheka Castle', type: 'Historic Estate', events: 'Luxury Weddings & Galas' },
  { name: 'The Mansion at Glen Cove', type: 'Luxury Venue', events: 'Weddings & Corporate Events' },
  { name: 'Crest Hollow Country Club', type: 'Country Club', events: 'Weddings & Private Events' },
  { name: 'NYCB Theatre at Westbury', type: 'Performance Venue', events: 'Concerts & Brand Activations' },
  { name: 'The Vanderbilt', type: 'Historic Mansion', events: 'Weddings & Celebrations' },
  { name: 'Carlyle on the Green', type: 'Golf Course Venue', events: 'Corporate Events & Weddings' },
  { name: 'The Fox Hollow', type: 'Catering Estate', events: 'Weddings & Corporate Events' },
];

const testimonials = [
  {
    quote: "Our Oheka Castle wedding was made even more magical with PixelAI Pro's AI photo booth. The transformations matched the castle's elegance perfectly, and guests are still talking about their portraits.",
    author: "Sarah & Michael Chen",
    role: "Wedding Couple",
    company: "Private Event",
    location: "Oheka Castle, Huntington",
    metric: "850 photos generated"
  },
  {
    quote: "The corporate gala at Cradle of Aviation was a huge success. The AI headshot booth generated more engagement than any activation we've done on Long Island.",
    author: "Thomas Burke",
    role: "VP of Events",
    company: "Long Island Tech Company",
    location: "Cradle of Aviation Museum",
    metric: "2,100 leads captured"
  },
  {
    quote: "For our Hamptons summer party, the Persona Pop transformations were absolutely perfect. Guests loved becoming beach-themed characters.",
    author: "Rebecca Morrison",
    role: "Event Planner",
    company: "Hamptons Events Co.",
    location: "Southampton, NY",
    metric: "500+ social shares"
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
  { value: '200+', label: 'Long Island Events', icon: Calendar },
  { value: '500K+', label: 'Photos Generated', icon: Users },
  { value: '95%', label: 'Lead Capture Rate', icon: Trophy },
  { value: '50+', label: 'LI Venues Served', icon: Building2 },
];

const regions = [
  'Nassau County', 'Suffolk County', 'Hamptons', 'North Shore', 'South Shore',
  'Garden City', 'Huntington', 'Great Neck', 'Jericho', 'Melville'
];

const relatedLocations = [
  { name: 'Manhattan', link: '/locations/manhattan' },
  { name: 'Brooklyn', link: '/locations/brooklyn' },
  { name: 'Queens', link: '/locations/queens' },
  { name: 'New Jersey', link: '/locations/new-jersey' },
];

const faqs = [
  {
    question: 'Do you service all of Long Island including the Hamptons?',
    answer: 'Yes! We serve all of Long Island from Great Neck to Montauk. This includes Nassau County, Suffolk County, the North Shore, South Shore, and the Hamptons. Travel is included in our Long Island packages—no extra fees for distance.'
  },
  {
    question: 'What is the pricing for AI photo booth rental on Long Island?',
    answer: 'Long Island AI photo booth packages typically start at $1,500 for smaller events and scale based on duration, experience type, and customization. Hamptons summer events and luxury weddings have premium pricing. Contact us for a custom quote.'
  },
  {
    question: 'Can you work at Long Island country clubs and estates?',
    answer: 'Absolutely! We regularly work at Long Island\'s premier venues including Oheka Castle, The Mansion at Glen Cove, Crest Hollow Country Club, and many others. We\'re familiar with the logistics and expectations of luxury Long Island venues.'
  },
  {
    question: 'Do you offer wedding packages for Long Island venues?',
    answer: 'Yes! Long Island weddings are one of our specialties. We offer romantic AI transformations, custom wedding overlays, and premium experiences perfect for elegant venues like Oheka Castle, The Vanderbilt, and Fox Hollow.'
  },
  {
    question: 'How far in advance should I book for Long Island events?',
    answer: 'We recommend booking 4-6 weeks in advance for Long Island events. Hamptons summer season (June-August) and wedding season should be booked 8+ weeks ahead. For last-minute availability, call us directly at (917) 724-6051.'
  },
  {
    question: 'Do you serve corporate events on Long Island?',
    answer: 'Yes! We work with many Long Island corporations for trade shows, product launches, team building events, and client appreciation galas. The Cradle of Aviation Museum and Melville corporate centers are popular venues for our AI activations.'
  },
  {
    question: 'Can you set up outdoor events in the Hamptons?',
    answer: 'Absolutely! Hamptons outdoor events are a specialty. Our equipment includes weather protection and we bring backup power for beach clubs, estate gardens, and waterfront venues throughout the Hamptons.'
  },
  {
    question: 'What makes Long Island events different from NYC events?',
    answer: 'Long Island events often have more space for elaborate setups and longer event durations. We can bring multiple stations, larger backdrops, and premium printing packages. The relaxed atmosphere allows for more guest interaction.'
  },
  {
    question: 'Do you work with Long Island event planners?',
    answer: 'Yes! We partner with many Long Island wedding planners and corporate event coordinators. We offer preferred vendor rates, seamless coordination, and white-label options for agencies managing Long Island events.'
  },
  {
    question: 'What AI experiences are most popular for Long Island weddings?',
    answer: 'For Long Island weddings, AI Headshots (elegant couple portraits), Persona Pop (fairytale transformations), and Co-Star (celebrity composites) are most popular. We can customize any experience to match your wedding theme and venue aesthetic.'
  },
];

const LongIslandPage = () => {
  usePageMeta({
    title: 'AI Photo Booth Long Island | Hamptons, Nassau & Suffolk | PixelAI Pro',
    description: 'Long Island\'s premier AI photo booth rental for weddings, corporate events & Hamptons parties. Serving Oheka Castle, North Shore, South Shore & 50+ venues. Get your free quote!',
    ogImage: '/og-image.jpg',
    canonicalPath: '/locations/long-island',
    keywords: 'AI photo booth Long Island, photo booth rental Long Island, photo booth rental Hamptons, Nassau County photo booth, Suffolk County photo booth, corporate event Long Island, wedding photo booth Long Island, Oheka Castle photo booth, North Shore event photographer, glam photo booth Long Island, 360 photo booth Long Island, corporate brand activation Long Island, event activation Long Island',
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "PixelAI Pro - AI Photo Booth Long Island",
        "description": "Long Island's premier AI photo booth company specializing in weddings, corporate events, and Hamptons parties throughout Nassau County, Suffolk County, and the East End.",
        "url": "https://pixelaipro.lovable.app/locations/long-island",
        "image": "https://pixelaipro.lovable.app/og-image.jpg",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Long Island",
          "addressRegion": "NY",
          "postalCode": "11501",
          "addressCountry": "US"
        },
        "telephone": "+1-917-724-6051",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "40.7891",
          "longitude": "-73.1350"
        },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "Long Island" },
          { "@type": "AdministrativeArea", "name": "Nassau County" },
          { "@type": "AdministrativeArea", "name": "Suffolk County" },
          { "@type": "AdministrativeArea", "name": "Hamptons" }
        ],
        "priceRange": "$$$",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "bestRating": "5",
          "worstRating": "1",
          "reviewCount": "56"
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
                { label: 'Long Island' }
              ]} />
              <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
                <MapPin size={16} className="text-primary" />
                <span className="text-sm text-muted-foreground">Serving Nassau, Suffolk & The Hamptons</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                AI Photo Booth
                <br />
                <span className="gradient-text">Rental on Long Island</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Bring world-class AI photo experiences to Long Island's most beautiful venues. From <strong className="text-foreground">Oheka Castle</strong> weddings to <strong className="text-foreground">Hamptons</strong> summer parties—we deliver unforgettable moments across Nassau and Suffolk counties.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                  Get Free Long Island Quote <ArrowRight size={20} />
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
                  <Check size={16} className="text-primary" /> 50+ LI venues served
                </span>
              </div>
            </div>
            
            <BeforeAfterSlider
              beforeImage={beforeImage}
              afterImage={afterImage}
              beforeLabel="Original"
              afterLabel="AI Enhanced"
              beforeAlt="Original photo before AI transformation at Long Island event"
              afterAlt="AI-transformed portrait at Long Island venue"
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

      {/* Long Island Venues Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Premier <span className="gradient-text">Long Island Venues</span> We Serve
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From Gold Coast mansions to Hamptons estates, we bring AI photo experiences to Long Island's most prestigious venues.
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
              AI Photo Booth <span className="gradient-text">Experiences</span> for Long Island Events
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our suite of AI-powered experiences designed for Long Island's elegant venues and discerning clients.
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
              What <span className="gradient-text">Long Island Clients</span> Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real results from real events across Long Island.
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

      {/* Long Island Regions */}
      <section className="section-padding bg-card/50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Serving <span className="gradient-text">All Long Island Regions</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From the North Shore to the Hamptons, we cover every corner of Long Island.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {regions.map((region) => (
              <span 
                key={region}
                className="glass px-4 py-2 rounded-full text-sm text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
              >
                {region}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection 
        title="Long Island AI Photo Booth FAQ"
        subtitle="Common questions about AI photo booth rental on Long Island"
        faqs={faqs}
        gradientWord="FAQ"
      />

      {/* Related Locations */}
      <section className="section-padding bg-card/50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore <span className="gradient-text">Nearby Areas</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We also serve these neighboring regions with the same premium AI photo experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedLocations.map((location) => (
              <Link
                key={location.name}
                to={location.link}
                className="glass rounded-xl p-6 text-center hover:border-primary/50 transition-all group"
              >
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                  {location.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-2">AI Photo Booth Rental</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="glass rounded-2xl p-12 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to <span className="gradient-text">Elevate</span> Your Long Island Event?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Join 200+ Long Island events that have transformed their guest experience with PixelAI Pro's AI photo technology.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                Get Your Free Quote <ArrowRight size={20} />
              </Link>
              <a href="tel:+19177246051" className="btn-secondary inline-flex items-center gap-2">
                Call (917) 724-6051
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LongIslandPage;
