import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import usePageMeta from '@/hooks/usePageMeta';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Quote, TrendingUp, Users, Camera, Share2, Award, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

import tradingCardsHero from '@/assets/ai-trading-cards-hero-collection.jpg';
import headshotAfter from '@/assets/headshot-after.jpg';
import pixelwearDemo from '@/assets/pixelwear-demo.jpg';
import personaPopDemo from '@/assets/persona-pop-demo.jpg';

const caseStudies = [
  {
    id: 'nfl-pro-bowl',
    title: 'NFL Pro Bowl Fan Experience',
    client: 'NFL & Major Sports Network',
    industry: 'Sports & Entertainment',
    location: 'Las Vegas, NV',
    duration: '3-Day Event',
    image: tradingCardsHero,
    challenge: 'The NFL wanted to create an immersive fan experience that would generate massive social engagement and provide memorable takeaways for over 50,000 attendees at the Pro Bowl festivities.',
    solution: 'We deployed our AI Trading Cards experience with custom NFL player templates, allowing fans to create personalized trading cards featuring themselves alongside their favorite players with real-time stats integration.',
    results: [
      { metric: '12,847', label: 'Trading Cards Created', icon: Camera },
      { metric: '94%', label: 'Fan Satisfaction Rate', icon: Users },
      { metric: '2.3M', label: 'Social Impressions', icon: Share2 },
      { metric: '#1', label: 'Most Popular Activation', icon: Award }
    ],
    testimonial: {
      quote: "PixelAI Pro delivered beyond our expectations. The AI trading cards became the most talked-about activation of the entire Pro Bowl weekend. Fans were sharing their cards everywhere, and the lines never stopped.",
      author: "Sarah Mitchell",
      role: "VP of Fan Engagement, NFL Events"
    },
    highlights: [
      'Custom integration with NFL player database',
      'Real-time stats pulled from official records',
      'Instant print and digital delivery',
      'QR code for easy social sharing',
      'Sponsor logo integration on every card'
    ]
  },
  {
    id: 'microsoft-ignite',
    title: 'Microsoft Ignite Developer Conference',
    client: 'Microsoft Corporation',
    industry: 'Technology',
    location: 'Seattle, WA',
    duration: '4-Day Conference',
    image: headshotAfter,
    challenge: 'Microsoft needed a way to refresh attendee LinkedIn profiles and create memorable branded content for their largest developer conference, while capturing leads for Azure services.',
    solution: 'We set up multiple AI Headshot stations throughout the venue, offering professional-quality headshots with custom Microsoft-branded backgrounds and instant LinkedIn optimization.',
    results: [
      { metric: '8,500+', label: 'Headshots Generated', icon: Camera },
      { metric: '6,200', label: 'Qualified Leads', icon: Users },
      { metric: '73%', label: 'LinkedIn Update Rate', icon: TrendingUp },
      { metric: '45 sec', label: 'Average Session Time', icon: Award }
    ],
    testimonial: {
      quote: "The AI headshot experience was a game-changer for our conference. Developers loved getting professional photos, and we captured thousands of qualified leads. The ROI was incredible.",
      author: "James Chen",
      role: "Director of Developer Relations, Microsoft"
    },
    highlights: [
      'Multiple booth setup across venue',
      'Azure-branded background options',
      'Direct LinkedIn integration',
      'Lead capture with opt-in for Azure trials',
      'Real-time analytics dashboard'
    ]
  },
  {
    id: 'nike-flagship',
    title: 'Nike Flagship Store Grand Opening',
    client: 'Nike, Inc.',
    industry: 'Retail & Fashion',
    location: 'New York City, NY',
    duration: '2-Week Activation',
    image: pixelwearDemo,
    challenge: 'Nike wanted to create buzz for their new NYC flagship store opening with an innovative experience that would drive foot traffic and showcase their latest collection.',
    solution: 'We deployed PixelWear Virtual Try-On, allowing customers to instantly visualize themselves wearing Nike\'s new collection, complete with shareable content and direct purchase integration.',
    results: [
      { metric: '25,000+', label: 'Virtual Try-Ons', icon: Camera },
      { metric: '42%', label: 'Conversion to Purchase', icon: TrendingUp },
      { metric: '4.2M', label: 'Social Reach', icon: Share2 },
      { metric: '$850K', label: 'Attributed Revenue', icon: Award }
    ],
    testimonial: {
      quote: "The virtual try-on experience transformed our store opening into a viral moment. Customers couldn't wait to try on our new collection digitally and share their looks. Sales exceeded projections by 40%.",
      author: "Amanda Rodriguez",
      role: "Head of Experiential Marketing, Nike NYC"
    },
    highlights: [
      'Full Nike catalog integration',
      'Direct e-commerce purchase flow',
      'Influencer content creation station',
      'Custom branded photo frames',
      'Real-time inventory sync'
    ]
  },
  {
    id: 'ces-booth',
    title: 'CES 2024 Tech Showcase',
    client: 'Fortune 500 Tech Company',
    industry: 'Trade Shows',
    location: 'Las Vegas, NV',
    duration: '4-Day Trade Show',
    image: personaPopDemo,
    challenge: 'Our client needed to stand out among 4,000+ exhibitors at CES and generate quality B2B leads while creating memorable experiences for booth visitors.',
    solution: 'We created a Persona Pop character transformation experience where visitors could become futuristic tech avatars, complete with the client\'s product integration and lead capture.',
    results: [
      { metric: '3,200', label: 'Booth Visitors', icon: Users },
      { metric: '2,847', label: 'Qualified Leads', icon: TrendingUp },
      { metric: '89%', label: 'Lead-to-Contact Rate', icon: Camera },
      { metric: 'Top 10', label: 'Best Booth Award', icon: Award }
    ],
    testimonial: {
      quote: "We've been exhibiting at CES for 15 years, and this was our most successful booth ever. The AI photo experience drew crowds constantly, and our sales team had more quality conversations than ever before.",
      author: "Michael Thompson",
      role: "VP of Marketing, [Fortune 500 Tech Company]"
    },
    highlights: [
      'Custom futuristic avatar styles',
      'Integrated lead qualification form',
      'CRM sync with Salesforce',
      'Appointment booking integration',
      'Post-show email automation'
    ]
  }
];

const clientLogos = [
  'Microsoft', 'Nike', 'NFL', 'Google', 'Samsung', 'Adobe', 'Salesforce', 'Meta'
];

const CaseStudiesPage = () => {
  usePageMeta({
    title: 'AI Photo Booth Case Studies & Success Stories | PixelAI Pro',
    description: 'Explore detailed case studies of AI photo booth activations for NFL, Microsoft, Nike, and Fortune 500 companies. See real results and ROI from experiential marketing campaigns.',
    ogImage: '/og-image.jpg',
    canonicalPath: '/case-studies',
    keywords: 'AI photo booth case study, experiential marketing results, brand activation ROI, event marketing success stories, trade show booth case study',
    schema: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "AI Photo Booth Case Studies",
      "description": "Success stories and detailed case studies of AI photo booth activations"
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <Breadcrumbs items={[{ label: 'Case Studies' }]} />
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Success Stories</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Real Results from <span className="text-gradient">Real Events</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover how leading brands have transformed their events with PixelAI Pro's AI-powered experiences. These case studies showcase measurable ROI and unforgettable moments.
            </p>
          </div>

          {/* Client Logos */}
          <div className="mb-20">
            <p className="text-center text-sm text-muted-foreground mb-6">Trusted by Industry Leaders</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {clientLogos.map((logo) => (
                <span key={logo} className="text-lg font-semibold text-muted-foreground">
                  {logo}
                </span>
              ))}
            </div>
          </div>

          {/* Case Studies */}
          <div className="space-y-24">
            {caseStudies.map((study, index) => (
              <article key={study.id} className="scroll-mt-32" id={study.id}>
                <div className={`grid lg:grid-cols-2 gap-12 items-start ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Image */}
                  <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                      <img 
                        src={study.image} 
                        alt={`${study.title} case study`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <Badge className="mb-2">{study.industry}</Badge>
                        <h3 className="text-white text-2xl font-bold">{study.title}</h3>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="flex flex-wrap gap-3 mb-4 text-sm text-muted-foreground">
                      <span>{study.client}</span>
                      <span>•</span>
                      <span>{study.location}</span>
                      <span>•</span>
                      <span>{study.duration}</span>
                    </div>

                    <h2 className="text-3xl font-bold mb-6">{study.title}</h2>

                    {/* Challenge */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-primary mb-2">The Challenge</h4>
                      <p className="text-muted-foreground">{study.challenge}</p>
                    </div>

                    {/* Solution */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-primary mb-2">Our Solution</h4>
                      <p className="text-muted-foreground">{study.solution}</p>
                    </div>

                    {/* Highlights */}
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Key Features Delivered</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {study.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                  {study.results.map((result, idx) => (
                    <Card key={idx} className="text-center p-6 bg-muted/30">
                      <CardContent className="p-0">
                        <result.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                        <div className="text-3xl font-bold text-primary mb-1">{result.metric}</div>
                        <div className="text-sm text-muted-foreground">{result.label}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Testimonial */}
                <Card className="mt-8 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-primary/20">
                  <CardContent className="p-8">
                    <Quote className="w-10 h-10 text-primary/30 mb-4" />
                    <blockquote className="text-lg italic mb-6">
                      "{study.testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-primary font-bold text-lg">
                          {study.testimonial.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold">{study.testimonial.author}</div>
                        <div className="text-sm text-muted-foreground">{study.testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {index < caseStudies.length - 1 && (
                  <div className="border-b border-border/30 mt-16" />
                )}
              </article>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-24 text-center bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Create Your Success Story?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join the ranks of industry leaders who have transformed their events with PixelAI Pro. Let's discuss how we can deliver exceptional results for your brand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/contact">
                  Start Your Project <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/proposals">View Proposals</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CaseStudiesPage;
