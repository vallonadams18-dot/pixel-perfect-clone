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
  { name: 'Austin Convention Center', type: 'Convention Center', events: 'SXSW, Tech Conferences & Expos' },
  { name: 'Circuit of the Americas', type: 'Racing Venue', events: 'F1, MotoGP & Major Concerts' },
  { name: 'Moody Center', type: 'Arena', events: 'Concerts, Sports & Corporate Events' },
  { name: 'ACL Live at The Moody Theater', type: 'Music Venue', events: 'Brand Launches & VIP Events' },
  { name: 'The Driskill', type: 'Historic Hotel', events: 'Executive Galas & Conferences' },
  { name: 'Fairmont Austin', type: 'Luxury Hotel', events: 'Corporate Events & Product Launches' },
  { name: 'The LINE Austin', type: 'Boutique Hotel', events: 'Tech Meetups & Brand Activations' },
  { name: 'Palmer Events Center', type: 'Event Center', events: 'Trade Shows & Consumer Expos' },
];

const testimonials = [
  {
    quote: "At SXSW, our AI photo booth was the talk of the conference. Lines wrapped around our booth all day, and we captured 3x more leads than any previous year.",
    author: "Jennifer Martinez",
    role: "VP of Marketing",
    company: "Enterprise SaaS Company",
    location: "Austin Convention Center",
    metric: "8,200 leads captured",
    rating: 5,
    date: "2024-03-15"
  },
  {
    quote: "The AI trading cards at our F1 activation were a massive hit. Fans loved becoming part of the racing experience, and sponsor visibility was incredible.",
    author: "Michael Chen",
    role: "Partnerships Manager",
    company: "Major Automotive Brand",
    location: "Circuit of the Americas",
    metric: "4.8M social impressions",
    rating: 5,
    date: "2024-10-22"
  },
  {
    quote: "For our product launch at the Fairmont, the AI headshot experience added a premium touch. Every attendee left with a stunning professional portrait.",
    author: "Sarah Thompson",
    role: "Events Director",
    company: "Tech Unicorn Startup",
    location: "Fairmont Austin",
    metric: "100% guest satisfaction",
    rating: 5,
    date: "2024-09-18"
  },
];

// Generate Review schema for Austin location page
const generateAustinReviewSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "PixelAI Pro - AI Photo Booth Rental Austin",
  "image": "https://pixelaipro.lovable.app/og-image.jpg",
  "url": "https://pixelaipro.lovable.app/locations/austin",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "bestRating": "5",
    "worstRating": "1",
    "reviewCount": "67",
    "ratingCount": "67"
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
    ideal: 'SXSW, tech conferences, networking events'
  },
  {
    title: 'PixelWear Virtual Try-On',
    description: 'Guests try on branded apparel without physical inventory',
    link: '/experiences/pixelwear',
    ideal: 'F1 events, music festivals, retail activations'
  },
  {
    title: 'AI Trading Cards',
    description: 'Custom collectible cards with rarity tiers and AR features',
    link: '/experiences/ai-trading-cards',
    ideal: 'Sports events, gaming conventions, brand experiences'
  },
  {
    title: 'Persona Pop',
    description: 'Transform guests into superheroes, anime, or brand characters',
    link: '/experiences/persona-pop',
    ideal: 'Music festivals, product launches, corporate parties'
  },
];

const stats = [
  { value: '180+', label: 'Austin Events', icon: Calendar },
  { value: '850K+', label: 'Photos Generated', icon: Users },
  { value: '92%', label: 'Lead Capture Rate', icon: Trophy },
  { value: '40+', label: 'Austin Venues', icon: Building2 },
];

const neighborhoods = [
  'Downtown Austin', 'South Congress', 'East Austin', 'Rainey Street', 'The Domain',
  'South Lamar', '6th Street', 'Zilker', 'Mueller', 'Round Rock'
];

const faqs = [
  {
    question: 'Do you provide AI photo booth rental for SXSW events?',
    answer: 'Absolutely! We\'re experienced SXSW vendors and understand the unique demands of the festival. We provide AI photo booth rentals for official SXSW events, brand activations, private parties, and satellite venues throughout Austin during the festival.'
  },
  {
    question: 'What is the pricing for AI photo booth rental in Austin?',
    answer: 'Our Austin AI photo booth packages start at $1,500 for smaller events and scale based on duration, experience type, and customization needs. For SXSW and major events, we recommend booking 3-6 months in advance for best availability and pricing.'
  },
  {
    question: 'Can you set up at outdoor Austin venues like Zilker Park?',
    answer: 'Yes! Our equipment is designed for both indoor and outdoor Austin venues. We bring tents, lighting, and climate-controlled setups for outdoor events at Zilker, COTA, and other open-air locations.'
  },
  {
    question: 'How far in advance should I book for Austin tech conferences?',
    answer: 'For major Austin events like SXSW, Austin City Limits, or large tech conferences, we recommend booking 2-4 months in advance. Popular dates book quickly, especially during peak conference season (March-April and October).'
  },
  {
    question: 'Do you offer same-day delivery options in Austin?',
    answer: 'Yes, we offer instant digital delivery via text, email, and QR code. Guests can share their AI-transformed photos on social media within seconds of their experience.'
  },
  {
    question: 'Can the AI experience be customized for tech brands?',
    answer: 'Absolutely! We specialize in custom AI experiences for tech companies. We can create branded transformations, integrate with your app or platform, and design experiences that showcase your product or service.'
  },
  {
    question: 'What makes PixelAI Pro different from traditional Austin photo booths?',
    answer: 'Unlike traditional photo booths, our AI technology creates stunning transformations in real-time. Guests don\'t just take photos—they become superheroes, try on virtual merchandise, or get professional headshots. This drives 3-5x higher engagement and social sharing.'
  },
  {
    question: 'Do you provide staffing for Austin events?',
    answer: 'Yes, all our Austin packages include professional brand ambassadors who manage the experience, engage guests, and ensure smooth operation. Our staff is trained specifically for tech-savvy Austin audiences.'
  },
  {
    question: 'Can you integrate with our CRM or marketing platform?',
    answer: 'Yes! We offer direct integrations with HubSpot, Salesforce, Marketo, and other major platforms. Lead data is captured in real-time and synced automatically—perfect for Austin tech companies focused on ROI.'
  },
  {
    question: 'What happens if there are technical issues during the event?',
    answer: 'Our Austin team provides on-site technical support throughout your event. We bring backup equipment and have local technicians available. In over 180 Austin events, we maintain a 99.9% uptime rate.'
  },
];

const AustinPage = () => {
  usePageMeta({
    title: 'AI Photo Booth Rental Austin | SXSW & Tech Events | PixelAI Pro',
    description: 'Austin\'s #1 AI photo booth rental for SXSW, tech conferences & corporate events. Serving Austin Convention Center, COTA, The Domain & 40+ venues. Real-time AI transformations. Get a free quote!',
    ogImage: '/og-image.jpg',
    canonicalPath: '/locations/austin',
    keywords: 'AI photo booth rental Austin, photo booth rental Austin, Austin photo booth, SXSW photo booth, tech conference photo booth Austin, brand activation Austin, experiential marketing Austin, corporate event photo booth Austin, F1 Austin photo booth, 360 photo booth Austin, glam photo booth Austin, corporate brand activation Austin, event activation Austin',
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "PixelAI Pro - AI Photo Booth Rental Austin",
        "description": "Austin's premier AI photo booth company specializing in SXSW, tech conferences, and experiential marketing throughout Central Texas.",
        "url": "https://pixelaipro.lovable.app/locations/austin",
        "image": "https://pixelaipro.lovable.app/og-image.jpg",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Austin",
          "addressRegion": "TX",
          "postalCode": "78701",
          "addressCountry": "US"
        },
        "telephone": "+1-917-724-6051",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "30.2672",
          "longitude": "-97.7431"
        },
        "areaServed": [
          { "@type": "City", "name": "Austin" },
          { "@type": "AdministrativeArea", "name": "Downtown Austin" },
          { "@type": "AdministrativeArea", "name": "Round Rock" },
          { "@type": "AdministrativeArea", "name": "Cedar Park" }
        ],
        "priceRange": "$$$",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "bestRating": "5",
          "worstRating": "1",
          "reviewCount": "67"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "AI Photo Booth Rental Austin",
        "serviceType": "Event Photo Booth Rental",
        "description": "Professional AI-powered photo booth rental for SXSW, tech conferences, and brand activations in Austin. Real-time AI transformations, lead capture, and instant social sharing.",
        "areaServed": {
          "@type": "City",
          "name": "Austin"
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
          { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://pixelaipro.lovable.app/locations/austin" },
          { "@type": "ListItem", "position": 3, "name": "Austin", "item": "https://pixelaipro.lovable.app/locations/austin" }
        ]
      },
      generateAustinReviewSchema()
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
                { label: 'Locations', href: '/locations/austin' },
                { label: 'Austin' }
              ]} />
              <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
                <MapPin size={16} className="text-primary" />
                <span className="text-sm text-muted-foreground">Serving All Austin Venues</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                #1 AI Photo Booth
                <br />
                <span className="gradient-text">Rental in Austin</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Transform your Austin tech conferences and SXSW activations with AI-powered photo experiences. 
                Real-time transformations, 92% lead capture rate, and seamless CRM integration—the go-to choice for 
                <strong className="text-foreground"> Austin Convention Center</strong>, <strong className="text-foreground">COTA</strong>, and 40+ premier Austin venues.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                  Get Free Austin Quote <ArrowRight size={20} />
                </Link>
                <a href="tel:+19177246051" className="btn-secondary inline-flex items-center gap-2">
                  Call (917) 724-6051
                </a>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Check size={16} className="text-primary" /> SXSW specialists
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
              beforeAlt="Original photo before AI transformation at Austin event"
              afterAlt="AI-transformed portrait at Austin tech conference"
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
              Premier <span className="gradient-text">Austin Venues</span> We Serve
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From SXSW at the Austin Convention Center to F1 at Circuit of the Americas, we bring AI photo experiences to 
              Austin's most exciting venues.
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
              AI Photo Booth <span className="gradient-text">Experiences</span> for Austin Events
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our suite of AI-powered experiences designed for high-impact tech conferences 
              and brand activations in Austin.
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
              What <span className="gradient-text">Austin Clients</span> Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real results from real events across Austin and Central Texas.
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
              Serving All <span className="gradient-text">Central Texas</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From Downtown Austin to Round Rock, we deliver premium AI photo booth experiences across the Austin metro area.
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
              Austin AI Photo Booth <span className="gradient-text">FAQs</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Common questions about our AI photo booth services in Austin.
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
                Ready to Elevate Your Austin Event?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join 180+ successful Austin events. Get a custom quote for your venue, 
                see a live demo, and discover how AI photo experiences can transform your tech conference or brand activation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                  Get Free Austin Quote <ArrowRight size={20} />
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

export default AustinPage;
