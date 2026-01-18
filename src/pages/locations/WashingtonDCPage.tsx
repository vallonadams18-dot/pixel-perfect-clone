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
  { name: 'Walter E. Washington Convention Center', type: 'Convention Center', events: 'CES Government, Trade Shows & Expos' },
  { name: 'Capital One Arena', type: 'Arena', events: 'Wizards/Capitals Games & Concerts' },
  { name: 'Nationals Park', type: 'Stadium', events: 'Nationals Games & Fan Activations' },
  { name: 'Gaylord National Resort', type: 'Resort & Convention Center', events: 'Association Conferences & Galas' },
  { name: 'The Smithsonian', type: 'Museum', events: 'Galas, Fundraisers & VIP Events' },
  { name: 'The Mayflower Hotel', type: 'Historic Hotel', events: 'Political Events & Executive Gatherings' },
  { name: 'MGM National Harbor', type: 'Resort', events: 'Corporate Events & Entertainment' },
  { name: 'Ronald Reagan Building', type: 'Federal Venue', events: 'Government Events & Conferences' },
];

const testimonials = [
  {
    quote: "Our booth at the association conference was the highlight of the event. The AI experience engaged members like never before, and we captured invaluable data for our sponsors.",
    author: "Patricia Morrison",
    role: "VP of Events",
    company: "National Trade Association",
    location: "Walter E. Washington Convention Center",
    metric: "7,800 member engagements",
    rating: 5,
    date: "2024-10-15"
  },
  {
    quote: "The AI trading cards at our Capitals game activation were a massive hit with fans. Season ticket holder engagement increased 40% compared to previous activations.",
    author: "Robert Anderson",
    role: "Director of Fan Engagement",
    company: "Major DC Sports Team",
    location: "Capital One Arena",
    metric: "5.5M social impressions",
    rating: 5,
    date: "2024-11-22"
  },
  {
    quote: "For our Smithsonian gala, the AI portrait experience added a sophisticated touch that our donors loved. Every guest left with a stunning keepsake.",
    author: "Dr. Catherine Wells",
    role: "Development Director",
    company: "Smithsonian Institution",
    location: "National Museum of American History",
    metric: "100% donor satisfaction",
    rating: 5,
    date: "2024-12-05"
  },
];

// Generate Review schema for DC location page
const generateDCReviewSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "PixelAI Pro - AI Photo Booth Rental Washington DC",
  "image": "https://pixelaipro.lovable.app/og-image.jpg",
  "url": "https://pixelaipro.lovable.app/locations/washington-dc",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "bestRating": "5",
    "worstRating": "1",
    "reviewCount": "112",
    "ratingCount": "112"
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
    ideal: 'Association conferences, lobbying events, networking'
  },
  {
    title: 'PixelWear Virtual Try-On',
    description: 'Guests try on branded apparel without physical inventory',
    link: '/experiences/pixelwear',
    ideal: 'Nationals/Capitals games, retail activations, product launches'
  },
  {
    title: 'AI Trading Cards',
    description: 'Custom collectible cards with rarity tiers and AR features',
    link: '/experiences/ai-trading-cards',
    ideal: 'Sports teams, government events, association conferences'
  },
  {
    title: 'Persona Pop',
    description: 'Transform guests into superheroes, anime, or brand characters',
    link: '/experiences/persona-pop',
    ideal: 'Galas, inaugural events, brand experiences'
  },
];

const stats = [
  { value: '280+', label: 'DC Events', icon: Calendar },
  { value: '1.4M+', label: 'Photos Generated', icon: Users },
  { value: '94%', label: 'Lead Capture Rate', icon: Trophy },
  { value: '55+', label: 'DC Venues', icon: Building2 },
];

const neighborhoods = [
  'Downtown DC', 'Capitol Hill', 'Georgetown', 'Dupont Circle', 'Navy Yard',
  'National Mall', 'Tysons Corner', 'Bethesda', 'Arlington', 'Alexandria'
];

const faqs = [
  {
    question: 'Do you provide AI photo booth rental for association conferences?',
    answer: 'Absolutely! We specialize in association and government events in DC. We understand the unique needs of membership organizations, policy conferences, and professional associations. Our experiences drive member engagement and sponsor visibility.'
  },
  {
    question: 'What is the pricing for AI photo booth rental in Washington DC?',
    answer: 'Our DC AI photo booth packages start at $1,500 for smaller events and scale based on duration, experience type, and customization needs. For large association conferences and government events, we offer multi-day packages with volume discounts.'
  },
  {
    question: 'Can you set up at federal buildings and secure venues?',
    answer: 'Yes! We have experience working at secure government venues and understand the protocols involved. Our equipment can be pre-cleared, and we work with venue security teams to ensure compliance with all requirements.'
  },
  {
    question: 'How far in advance should I book for DC conferences?',
    answer: 'For major DC events like association annual meetings, government conferences, or inaugural events, we recommend booking 3-6 months in advance. The convention center calendar fills quickly, especially during peak conference season.'
  },
  {
    question: 'Do you serve the Virginia and Maryland suburbs?',
    answer: 'Yes! We serve the entire DC metro area including Northern Virginia (Tysons, Arlington, Alexandria) and Maryland (Bethesda, National Harbor, Silver Spring). We\'re familiar with venues throughout the region.'
  },
  {
    question: 'Can the AI experience be customized for government and policy events?',
    answer: 'Absolutely! We create appropriate, professional experiences for government audiences. We can incorporate agency branding, policy themes, and messaging that resonates with DC\'s unique professional culture.'
  },
  {
    question: 'What makes PixelAI Pro different from traditional DC photo booths?',
    answer: 'Unlike traditional photo booths, our AI technology creates stunning transformations in real-time. Guests don\'t just take photos—they become part of immersive experiences. This drives 3-5x higher engagement, perfect for DC\'s competitive event landscape.'
  },
  {
    question: 'Do you provide staffing for DC events?',
    answer: 'Yes, all our DC packages include professional brand ambassadors who manage the experience, engage guests, and ensure smooth operation. Our DC staff is experienced with VIPs, executives, and high-security environments.'
  },
  {
    question: 'Can you integrate with association management systems?',
    answer: 'Yes! We offer integrations with major AMS platforms, Salesforce, HubSpot, and other systems. Lead data and member engagement metrics can be captured in real-time and synced with your databases.'
  },
  {
    question: 'What happens if there are technical issues during the event?',
    answer: 'Our DC team provides on-site technical support throughout your event. We bring backup equipment and have local technicians on standby. In over 280 DC events, we maintain a 99.9% uptime rate.'
  },
];

const WashingtonDCPage = () => {
  usePageMeta({
    title: 'AI Photo Booth Rental Washington DC | Association & Government Events | PixelAI Pro',
    description: 'Washington DC\'s #1 AI photo booth rental for association conferences, government events & galas. Serving Walter E. Washington Convention Center, Smithsonian, National Harbor & 55+ venues. Get a free quote!',
    ogImage: '/og-image.jpg',
    canonicalPath: '/locations/washington-dc',
    keywords: 'AI photo booth rental Washington DC, DC photo booth, association conference photo booth, government event photo booth DC, brand activation DC, experiential marketing DC, corporate event photo booth DC, gala photo booth DC',
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "PixelAI Pro - AI Photo Booth Rental Washington DC",
        "description": "Washington DC's premier AI photo booth company specializing in association conferences, government events, and experiential marketing throughout the DC metro area.",
        "url": "https://pixelaipro.lovable.app/locations/washington-dc",
        "image": "https://pixelaipro.lovable.app/og-image.jpg",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Washington",
          "addressRegion": "DC",
          "postalCode": "20001",
          "addressCountry": "US"
        },
        "telephone": "+1-917-724-6051",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "38.9072",
          "longitude": "-77.0369"
        },
        "areaServed": [
          { "@type": "City", "name": "Washington" },
          { "@type": "City", "name": "Arlington" },
          { "@type": "City", "name": "Alexandria" },
          { "@type": "City", "name": "Bethesda" }
        ],
        "priceRange": "$$$",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "bestRating": "5",
          "worstRating": "1",
          "reviewCount": "112"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "AI Photo Booth Rental Washington DC",
        "serviceType": "Event Photo Booth Rental",
        "description": "Professional AI-powered photo booth rental for association conferences, government events, and brand activations in Washington DC. Real-time AI transformations, lead capture, and instant social sharing.",
        "areaServed": {
          "@type": "City",
          "name": "Washington"
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
          { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://pixelaipro.lovable.app/locations/washington-dc" },
          { "@type": "ListItem", "position": 3, "name": "Washington DC", "item": "https://pixelaipro.lovable.app/locations/washington-dc" }
        ]
      },
      generateDCReviewSchema()
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
                { label: 'Locations', href: '/locations/washington-dc' },
                { label: 'Washington DC' }
              ]} />
              <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
                <MapPin size={16} className="text-primary" />
                <span className="text-sm text-muted-foreground">Serving All DC Metro Venues</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                #1 AI Photo Booth
                <br />
                <span className="gradient-text">Rental in Washington DC</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Transform your DC conferences and association events with AI-powered photo experiences. 
                Real-time transformations, 94% lead capture rate, and seamless integration—the go-to choice for 
                <strong className="text-foreground"> Walter E. Washington Convention Center</strong>, <strong className="text-foreground">The Smithsonian</strong>, and 55+ premier DC venues.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                  Get Free DC Quote <ArrowRight size={20} />
                </Link>
                <a href="tel:+19177246051" className="btn-secondary inline-flex items-center gap-2">
                  Call (917) 724-6051
                </a>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Check size={16} className="text-primary" /> Association specialists
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
              beforeAlt="Original photo before AI transformation at Washington DC event"
              afterAlt="AI-transformed portrait at DC association conference"
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
              Premier <span className="gradient-text">DC Venues</span> We Serve
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From the Walter E. Washington Convention Center to the iconic Smithsonian, we bring AI photo experiences to 
              Washington DC's most prestigious venues.
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
              AI Photo Booth <span className="gradient-text">Experiences</span> for DC Events
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our suite of AI-powered experiences designed for high-impact association conferences 
              and brand activations in Washington DC.
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
              What <span className="gradient-text">DC Clients</span> Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real results from real events across Washington DC and the metro area.
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
              Serving All <span className="gradient-text">DC Metro</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From Capitol Hill to National Harbor, we deliver premium AI photo booth experiences across the DC metropolitan area.
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
              Washington DC AI Photo Booth <span className="gradient-text">FAQs</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Common questions about our AI photo booth services in Washington DC.
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
                Ready to Elevate Your DC Event?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join 280+ successful DC events. Get a custom quote for your venue, 
                see a live demo, and discover how AI photo experiences can transform your conference or association event.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                  Get Free DC Quote <ArrowRight size={20} />
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

export default WashingtonDCPage;
