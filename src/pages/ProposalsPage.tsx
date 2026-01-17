import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import usePageMeta from '@/hooks/usePageMeta';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Building2, Trophy, ShoppingBag, Presentation, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { generatePitchDeck } from '@/lib/generatePitchDeck';

const proposals = [
  {
    id: 'corporate',
    title: 'Corporate & Tech Events',
    subtitle: 'Professional AI Experiences for Enterprise',
    icon: Building2,
    color: 'from-blue-500 to-cyan-500',
    description: 'Elevate your corporate conferences, product launches, and employee appreciation events with AI-powered headshots and brand activations.',
    benefits: [
      'Professional AI headshots for all attendees',
      'Custom branded photo experiences',
      'Lead capture & CRM integration',
      'Real-time social media sharing',
      'Executive VIP photo sessions'
    ],
    results: [
      { metric: '500+', label: 'Photos Generated' },
      { metric: '85%', label: 'Lead Capture Rate' },
      { metric: '3x', label: 'Social Engagement' }
    ],
    caseStudy: 'Microsoft Developer Conference',
    idealFor: ['Tech conferences', 'Product launches', 'Team building events', 'Annual meetings']
  },
  {
    id: 'sports',
    title: 'Sports & Entertainment',
    subtitle: 'Fan Engagement That Scores Big',
    icon: Trophy,
    color: 'from-orange-500 to-red-500',
    description: 'Transform fans into sports legends with AI trading cards, team jersey try-ons, and celebrity co-star experiences.',
    benefits: [
      'Custom AI trading cards with stats',
      'Team jersey virtual try-on',
      'Celebrity athlete co-star photos',
      'Instant print & digital delivery',
      'Sponsor logo integration'
    ],
    results: [
      { metric: '10K+', label: 'Cards Created' },
      { metric: '94%', label: 'Fan Satisfaction' },
      { metric: '$50K+', label: 'Sponsor Value' }
    ],
    caseStudy: 'NFL Pro Bowl Experience',
    idealFor: ['Game day activations', 'Fan festivals', 'Sports conventions', 'Championship events']
  },
  {
    id: 'retail',
    title: 'Retail & Fashion Brands',
    subtitle: 'Virtual Try-On Revolution',
    icon: ShoppingBag,
    color: 'from-purple-500 to-pink-500',
    description: 'Let customers virtually try your products before they buy with AI-powered wardrobe transformations and branded experiences.',
    benefits: [
      'PixelWear virtual product try-on',
      'Branded transformation filters',
      'Direct purchase integration',
      'Customer data collection',
      'Influencer-ready content creation'
    ],
    results: [
      { metric: '40%', label: 'Conversion Lift' },
      { metric: '5K+', label: 'Try-Ons Daily' },
      { metric: '200%', label: 'UGC Increase' }
    ],
    caseStudy: 'Nike Flagship Store Launch',
    idealFor: ['Store openings', 'Pop-up shops', 'Fashion shows', 'Brand activations']
  },
  {
    id: 'tradeshow',
    title: 'Trade Show Exhibitors',
    subtitle: 'Stop Traffic, Capture Leads',
    icon: Presentation,
    color: 'from-green-500 to-emerald-500',
    description: 'Transform your booth into the must-visit destination with AI experiences that draw crowds and capture qualified leads.',
    benefits: [
      'Booth traffic generation',
      'Qualified lead capture system',
      'Branded AI experiences',
      'Competitor differentiation',
      'Post-show follow-up assets'
    ],
    results: [
      { metric: '300%', label: 'Booth Traffic' },
      { metric: '1,200+', label: 'Leads Captured' },
      { metric: '#1', label: 'Booth of Show' }
    ],
    caseStudy: 'CES 2024 Activation',
    idealFor: ['CES & tech shows', 'Industry conferences', 'B2B exhibitions', 'Product demos']
  }
];

const ProposalsPage = () => {
  usePageMeta({
    title: 'AI Photo Booth Proposals & Case Studies | PixelAI Pro',
    description: 'Download pitch decks and explore case studies for AI photo booth activations. Corporate, sports, retail, and trade show solutions with proven ROI.',
    ogImage: '/og-image.jpg',
    canonicalPath: '/proposals',
    keywords: 'AI photo booth proposal, experiential marketing case study, brand activation pitch deck, corporate event ROI, trade show booth ideas',
    schema: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "AI Photo Booth Proposals & Case Studies",
      "description": "Industry-specific proposals and case studies for AI photo booth activations"
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <Breadcrumbs items={[{ label: 'Proposals & Case Studies' }]} />
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Proposals & <span className="text-gradient">Case Studies</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore industry-specific solutions and see how leading brands have transformed their events with PixelAI Pro's AI-powered experiences.
            </p>
          </div>

          {/* Proposals Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {proposals.map((proposal) => (
              <Card key={proposal.id} className="overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 group">
                <CardHeader className={`bg-gradient-to-r ${proposal.color} text-white`}>
                  <div className="flex items-center gap-3 mb-2">
                    <proposal.icon className="w-8 h-8" />
                    <div>
                      <CardTitle className="text-2xl">{proposal.title}</CardTitle>
                      <CardDescription className="text-white/80">{proposal.subtitle}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-6">{proposal.description}</p>
                  
                  {/* Benefits */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Key Benefits:</h4>
                    <ul className="space-y-2">
                      {proposal.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Results */}
                  <div className="bg-muted/50 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold mb-3 text-sm">Proven Results:</h4>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      {proposal.results.map((result, idx) => (
                        <div key={idx}>
                          <div className="text-xl font-bold text-primary">{result.metric}</div>
                          <div className="text-xs text-muted-foreground">{result.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Case Study Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Featured Case Study: </span>
                      <span className="font-medium">{proposal.caseStudy}</span>
                    </div>
                  </div>

                  {/* Ideal For Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {proposal.idealFor.map((use, idx) => (
                      <span key={idx} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {use}
                      </span>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex gap-3">
                    <Button className="flex-1 gap-2" asChild>
                      <Link to="/contact">
                        Request Proposal <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="gap-2"
                      onClick={() => generatePitchDeck(proposal)}
                    >
                      <Download className="w-4 h-4" /> Pitch Deck
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Next Event?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get a custom proposal tailored to your brand, audience, and event goals. Our team will create a comprehensive plan with ROI projections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/contact">Get Custom Proposal</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/portfolio">View Full Portfolio</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProposalsPage;
