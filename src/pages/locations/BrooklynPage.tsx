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
  { name: 'Brooklyn Steel', type: 'Event Venue', events: 'Concerts & Brand Activations' },
  { name: 'Industry City', type: 'Creative Complex', events: 'Tech Events & Product Launches' },
  { name: 'Brooklyn Expo Center', type: 'Convention Center', events: 'Trade Shows & Expos' },
  { name: 'The Brooklyn Museum', type: 'Cultural Venue', events: 'Galas & Fundraisers' },
  { name: 'Brooklyn Navy Yard', type: 'Historic Venue', events: 'Corporate Events & Weddings' },
  { name: 'DUMBO House', type: 'Private Club', events: 'Executive Events & Networking' },
  { name: 'The Green Building', type: 'Industrial Space', events: 'Fashion Shows & Art Events' },
  { name: 'Wythe Hotel', type: 'Boutique Hotel', events: 'Launch Parties & Influencer Events' },
];

const testimonials = [
  {
    quote: "Our Industry City product launch was elevated to another level with PixelAI Pro's booth. The AI transformations perfectly matched our brand aesthetic, and we captured 1,800 qualified leads.",
    author: "David Park",
    role: "Marketing Director",
    company: "Brooklyn-Based Tech Startup",
    location: "Industry City, Brooklyn",
    metric: "1,800 leads captured"
  },
  {
    quote: "The Brooklyn Museum gala was unforgettable. Guests were transformed into Renaissance portraits that matched the exhibit theme. Social sharing went through the roof.",
    author: "Amanda Ross",
    role: "Events Manager",
    company: "Brooklyn Museum Foundation",
    location: "Brooklyn Museum",
    metric: "500K social impressions"
  },
  {
    quote: "For our DUMBO tech meetup series, the AI headshot booth has become the signature experience. Members leave with LinkedIn-ready photos every time.",
    author: "Chris Martinez",
    role: "Community Director",
    company: "DUMBO Tech Hub",
    location: "DUMBO House, Brooklyn",
    metric: "98% participation rate"
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
  { value: '150+', label: 'Brooklyn Events', icon: Calendar },
  { value: '400K+', label: 'Photos Generated', icon: Users },
  { value: '94%', label: 'Lead Capture Rate', icon: Trophy },
  { value: '25+', label: 'Brooklyn Venues', icon: Building2 },
];

const neighborhoods = [
  'Williamsburg', 'DUMBO', 'Bushwick', 'Park Slope', 'Brooklyn Heights',
  'Greenpoint', 'Red Hook', 'Crown Heights', 'Bed-Stuy', 'Prospect Heights'
];

const relatedBoroughs = [
  { name: 'Manhattan', link: '/locations/manhattan' },
  { name: 'Queens', link: '/locations/queens' },
  { name: 'Bronx', link: '/locations/bronx' },
  { name: 'Staten Island', link: '/locations/staten-island' },
];

const faqs = [
  {
    question: 'Do you serve all Brooklyn neighborhoods?',
    answer: 'Yes! We provide AI photo booth rental throughout all of Brooklyn including Williamsburg, DUMBO, Bushwick, Park Slope, Brooklyn Heights, Greenpoint, Red Hook, Crown Heights, Bed-Stuy, and Prospect Heights. Our team is based locally and can set up at any venue in the borough.'
  },
  {
    question: 'What is the pricing for AI photo booth rental in Brooklyn?',
    answer: 'Our Brooklyn AI photo booth packages start at $1,500 for smaller events and scale based on duration, experience type, and customization needs. We offer competitive pricing for Brooklyn venues and include setup, operation, and teardown. Contact us for a custom quote.'
  },
  {
    question: 'Can you set up at industrial Brooklyn venues like Industry City?',
    answer: 'Absolutely! We regularly work at Brooklyn\'s unique industrial and creative spaces including Industry City, Brooklyn Navy Yard, and The Green Building. Our equipment is self-contained and we bring our own power and lighting as needed.'
  },
  {
    question: 'How long does setup take at Brooklyn event spaces?',
    answer: 'Setup typically takes 60-90 minutes depending on the experience. We account for Brooklyn logistics including loading docks, elevators, and parking. We always arrive early to ensure everything is ready before your guests arrive.'
  },
  {
    question: 'Do you offer same-day booking for Brooklyn events?',
    answer: 'When available, yes! We maintain Brooklyn-based inventory for last-minute requests. For same-day availability, call us directly at (917) 724-6051. Weekend events should be booked at least 1-2 weeks in advance.'
  },
  {
    question: 'What types of events do you serve in Brooklyn?',
    answer: 'We serve all types of Brooklyn events including corporate parties, product launches, weddings, bar/bat mitzvahs, brand activations, tech meetups, art gallery openings, fashion shows, and private celebrations. Our AI experiences adapt to any event theme or brand.'
  },
  {
    question: 'How many photos can guests take at a Brooklyn event?',
    answer: 'There\'s no limit! Guests can take as many AI-transformed photos as they want during your event. Our systems process photos in under 60 seconds, so even high-volume events flow smoothly. We\'ve handled 500+ guests at single Brooklyn events.'
  },
  {
    question: 'Do you provide on-site staff for Brooklyn events?',
    answer: 'Yes, every Brooklyn booking includes a trained brand ambassador who manages the experience, assists guests, and ensures smooth operation throughout your event. Additional staff can be added for larger events.'
  },
  {
    question: 'Can you customize the AI experience for Brooklyn brand activations?',
    answer: 'Absolutely! We offer full customization including branded overlays, custom AI transformation styles, branded sharing pages, and integration with your marketing systems. Many Brooklyn brands use our custom experiences for product launches and pop-ups.'
  },
  {
    question: 'What\'s included in a Brooklyn AI photo booth rental?',
    answer: 'Every Brooklyn rental includes: the AI photo booth hardware, trained on-site staff, unlimited photos, instant digital delivery, social sharing capabilities, setup and teardown, and a post-event analytics report. Premium packages add printing, custom branding, and lead capture integration.'
  },
];

const BrooklynPage = () => {
  usePageMeta({
    title: 'AI Photo Booth Brooklyn | Williamsburg, DUMBO & Park Slope | PixelAI Pro',
    description: 'Brooklyn\'s top AI photo booth rental for corporate events, weddings & brand activations. Serving Williamsburg, DUMBO, Industry City & 25+ Brooklyn venues. Get your free quote today!',
    ogImage: '/og-image.jpg',
    canonicalPath: '/locations/brooklyn',
    keywords: 'AI photo booth Brooklyn, photo booth rental Brooklyn, photo booth rental Williamsburg, DUMBO photo booth, Brooklyn event photographer, Industry City photo booth, brand activation Brooklyn, corporate event Brooklyn, photo booth Park Slope, glam photo booth Brooklyn, 360 photo booth Brooklyn, corporate brand activation Brooklyn, event activation Brooklyn',
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "PixelAI Pro - AI Photo Booth Brooklyn",
        "description": "Brooklyn's premier AI photo booth company specializing in corporate events, weddings, and brand activations throughout Williamsburg, DUMBO, and all Brooklyn neighborhoods.",
        "url": "https://pixelaipro.lovable.app/locations/brooklyn",
        "image": "https://pixelaipro.lovable.app/og-image.jpg",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Brooklyn",
          "addressRegion": "NY",
          "postalCode": "11201",
          "addressCountry": "US"
        },
        "telephone": "+1-917-724-6051",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "40.6782",
          "longitude": "-73.9442"
        },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "Brooklyn" },
          { "@type": "AdministrativeArea", "name": "Williamsburg" },
          { "@type": "AdministrativeArea", "name": "DUMBO" },
          { "@type": "AdministrativeArea", "name": "Park Slope" }
        ],
        "priceRange": "$$$",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "bestRating": "5",
          "worstRating": "1",
          "reviewCount": "47"
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
                { label: 'Brooklyn' }
              ]} />
              <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
                <MapPin size={16} className="text-primary" />
                <span className="text-sm text-muted-foreground">Serving All Brooklyn Neighborhoods</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                AI Photo Booth
                <br />
                <span className="gradient-text">Rental in Brooklyn</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Elevate your Brooklyn events with cutting-edge AI photo experiences. From <strong className="text-foreground">Williamsburg</strong> lofts to <strong className="text-foreground">DUMBO</strong> rooftops and <strong className="text-foreground">Industry City</strong> spaces—we bring the future of photography to Brooklyn's most creative venues.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                  Get Free Brooklyn Quote <ArrowRight size={20} />
                </Link>
                <a href="tel:+19177246051" className="btn-secondary inline-flex items-center gap-2">
                  Call (917) 724-6051
                </a>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Check size={16} className="text-primary" /> Brooklyn-based team
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
              beforeAlt="Original photo before AI transformation at Brooklyn event"
              afterAlt="AI-transformed portrait at Brooklyn venue"
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

      {/* Brooklyn Venues Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Premier <span className="gradient-text">Brooklyn Venues</span> We Serve
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From industrial lofts to waterfront spaces, we bring AI photo experiences to Brooklyn's most iconic venues.
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
              AI Photo Booth <span className="gradient-text">Experiences</span> for Brooklyn Events
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our suite of AI-powered experiences designed for Brooklyn's creative community and corporate scene.
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
              What <span className="gradient-text">Brooklyn Clients</span> Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real results from real events across Brooklyn.
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

      {/* Brooklyn Neighborhoods */}
      <section className="section-padding bg-card/50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Serving All <span className="gradient-text">Brooklyn Neighborhoods</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From trendy Williamsburg to historic Brooklyn Heights, we deliver premium AI photo booth experiences across the borough.
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
      <FAQSection faqs={faqs} title="Brooklyn AI Photo Booth" />

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="glass rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 rounded-full blur-[100px]" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready to Elevate Your Brooklyn Event?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join 150+ successful Brooklyn events. Get a custom quote for your venue, 
                see a live demo, and discover how AI photo experiences can transform your activation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                  Get Free Brooklyn Quote <ArrowRight size={20} />
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

export default BrooklynPage;