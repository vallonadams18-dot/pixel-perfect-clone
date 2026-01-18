import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, User, MapPin, Star, CheckCircle, Building2 } from 'lucide-react';
import usePageMeta from '@/hooks/usePageMeta';

const PhotoBoothRentalNYCPage = () => {
  usePageMeta({
    title: 'Photo Booth Rental NYC: Best Options for 2026 Events | PixelAI Pro',
    description: 'Find the best photo booth rental in NYC. Compare traditional, 360, and AI photo booths. Serving Manhattan, Brooklyn, Queens & all NYC boroughs. Prices from $500. Book your NYC photo booth today!',
    ogImage: '/og-image.jpg',
    canonicalPath: '/blog/photo-booth-rental-nyc',
    keywords: 'photo booth rental NYC, photo booth rental New York, NYC photo booth, photo booth rental Manhattan, photo booth rental Brooklyn, photo booth near me NYC, best photo booth rental NYC, photo booth rental prices NYC, event photo booth NYC',
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Photo Booth Rental NYC: Best Options for 2026 Events",
        "description": "Find the best photo booth rental in NYC. Compare traditional, 360, and AI photo booths.",
        "image": "https://pixelaipro.lovable.app/og-image.jpg",
        "datePublished": "2026-01-16",
        "dateModified": "2026-01-16",
        "author": {
          "@type": "Organization",
          "name": "PixelAI Pro"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How much does photo booth rental cost in NYC?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Photo booth rental in NYC typically costs $500-$3,500+ depending on the type. Traditional booths start at $500-$1,000, 360 booths range from $800-$2,000, and AI-powered photo booths for corporate events range from $1,500-$5,000+."
            }
          },
          {
            "@type": "Question",
            "name": "What NYC venues do photo booth companies serve?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most NYC photo booth companies serve all five boroughs including Manhattan, Brooklyn, Queens, the Bronx, and Staten Island. Popular venues include Javits Center, Pier 60, The Plaza Hotel, Industry City, and hundreds of other venues throughout New York City."
            }
          },
          {
            "@type": "Question",
            "name": "How far in advance should I book a photo booth in NYC?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For weekend events in NYC, book 2-4 weeks in advance. For peak season (May-October) or major holidays, book 1-2 months ahead. Trade shows at Javits Center should be booked 2-3 months in advance."
            }
          }
        ]
      }
    ]
  });

  const nycVenues = [
    { name: 'Javits Center', borough: 'Manhattan', type: 'Trade Shows & Conventions' },
    { name: 'Pier 60 at Chelsea Piers', borough: 'Manhattan', type: 'Galas & Events' },
    { name: 'The Plaza Hotel', borough: 'Manhattan', type: 'Luxury Events' },
    { name: 'Industry City', borough: 'Brooklyn', type: 'Corporate & Creative' },
    { name: 'Brooklyn Navy Yard', borough: 'Brooklyn', type: 'Product Launches' },
    { name: 'Citi Field', borough: 'Queens', type: 'Sports Events' },
    { name: 'Yankee Stadium', borough: 'Bronx', type: 'Sports Events' },
    { name: 'Snug Harbor', borough: 'Staten Island', type: 'Outdoor Events' },
  ];

  const boroughs = [
    { name: 'Manhattan', areas: 'Midtown, SoHo, Wall Street, Chelsea, Upper East/West Side', link: '/locations/manhattan' },
    { name: 'Brooklyn', areas: 'Williamsburg, DUMBO, Park Slope, Industry City', link: '/locations/brooklyn' },
    { name: 'Queens', areas: 'Long Island City, Flushing, Astoria, USTA', link: '/locations/queens' },
    { name: 'Bronx', areas: 'Yankee Stadium, Botanical Garden, Fordham', link: '/locations/bronx' },
    { name: 'Staten Island', areas: 'St. George, Snug Harbor, Great Kills', link: '/locations/staten-island' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <article className="pt-32 pb-20">
        {/* Hero Section */}
        <header className="relative pb-12 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
          
          <div className="container-custom relative z-10">
            <Breadcrumbs items={[
              { label: 'Blog', href: '/blog' },
              { label: 'Photo Booth Rental NYC' }
            ]} />
            
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
                <MapPin size={16} className="text-primary" />
                <span className="text-sm text-muted-foreground">New York City</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Photo Booth Rental NYC: <span className="gradient-text">Best Options for 2026</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                The ultimate guide to finding the perfect photo booth rental in New York City. From traditional booths to cutting-edge AI experiences, we cover pricing, vendors, and tips for events across all five boroughs.
              </p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <User size={16} className="text-primary" />
                  PixelAI Pro Team
                </span>
                <time dateTime="2026-01-16" className="flex items-center gap-2">
                  <Calendar size={16} className="text-primary" />
                  January 16, 2026
                </time>
                <span className="flex items-center gap-2">
                  <Clock size={16} className="text-primary" />
                  11 min read
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="section-padding">
          <div className="container-custom">
            <div className="max-w-4xl">
              
              {/* Introduction */}
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Looking for <strong className="text-foreground">photo booth rental in NYC</strong>? New York City hosts over 50,000 events annually, and photo booths have become essential for creating memorable experiences. Whether you're planning a corporate gala at The Plaza, a trade show at Javits Center, or a Brooklyn wedding, this guide helps you find the perfect NYC photo booth rental.
              </p>

              {/* NYC Pricing */}
              <section className="my-16">
                <h2 className="font-display text-3xl font-bold text-foreground mb-8">
                  Photo Booth Rental Prices in NYC
                </h2>
                
                <p className="text-muted-foreground mb-6">
                  NYC photo booth rental pricing reflects the city's premium market. Here's what to expect:
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full glass rounded-xl overflow-hidden">
                    <thead className="bg-primary/20">
                      <tr>
                        <th className="text-left p-4 font-bold text-foreground">Booth Type</th>
                        <th className="text-left p-4 font-bold text-foreground">NYC Price (3-4 hrs)</th>
                        <th className="text-left p-4 font-bold text-foreground">Best For</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                      <tr>
                        <td className="p-4 text-foreground">Traditional Enclosed</td>
                        <td className="p-4 text-muted-foreground">$600 - $1,200</td>
                        <td className="p-4 text-muted-foreground">Casual parties, small events</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-foreground">Open-Air Booth</td>
                        <td className="p-4 text-muted-foreground">$700 - $1,500</td>
                        <td className="p-4 text-muted-foreground">Weddings, larger groups</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-foreground">360 Photo Booth</td>
                        <td className="p-4 text-muted-foreground">$1,000 - $2,500</td>
                        <td className="p-4 text-muted-foreground">Social media events, clubs</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-foreground">Mirror Booth</td>
                        <td className="p-4 text-muted-foreground">$800 - $1,800</td>
                        <td className="p-4 text-muted-foreground">Glam events, weddings</td>
                      </tr>
                      <tr className="bg-primary/10">
                        <td className="p-4 text-foreground font-semibold">AI Photo Booth</td>
                        <td className="p-4 text-foreground font-semibold">$1,500 - $4,000+</td>
                        <td className="p-4 text-foreground">Corporate, trade shows, brand activations</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="glass rounded-xl p-6 mt-6">
                  <h3 className="font-bold text-foreground mb-4">NYC-Specific Pricing Factors:</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-primary mt-1 shrink-0" />
                      <span><strong className="text-foreground">Manhattan premium:</strong> Add 15-25% for Manhattan venues vs. outer boroughs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-primary mt-1 shrink-0" />
                      <span><strong className="text-foreground">Parking/logistics:</strong> Some vendors charge $100-$300 for Manhattan parking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-primary mt-1 shrink-0" />
                      <span><strong className="text-foreground">Peak season:</strong> May-October and December weddings command higher rates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-primary mt-1 shrink-0" />
                      <span><strong className="text-foreground">Friday/Saturday:</strong> Weekend evening slots are most expensive</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Popular Venues */}
              <section className="my-16">
                <h2 className="font-display text-3xl font-bold text-foreground mb-8">
                  Popular NYC Venues for Photo Booths
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  {nycVenues.map((venue, index) => (
                    <div key={index} className="glass rounded-xl p-4 flex items-start gap-3">
                      <Building2 size={20} className="text-primary shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-foreground">{venue.name}</h3>
                        <p className="text-sm text-primary">{venue.borough}</p>
                        <p className="text-sm text-muted-foreground">{venue.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* By Borough */}
              <section className="my-16">
                <h2 className="font-display text-3xl font-bold text-foreground mb-8">
                  Photo Booth Rental by NYC Borough
                </h2>

                <div className="space-y-4">
                  {boroughs.map((borough, index) => (
                    <Link key={index} to={borough.link} className="glass rounded-xl p-6 flex items-center justify-between gap-4 hover:border-primary/50 transition-all group block">
                      <div>
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{borough.name}</h3>
                        <p className="text-muted-foreground">{borough.areas}</p>
                      </div>
                      <ArrowRight className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                    </Link>
                  ))}
                </div>
              </section>

              {/* Tips for NYC */}
              <section className="my-16">
                <h2 className="font-display text-3xl font-bold text-foreground mb-8">
                  Tips for Booking Photo Booth Rental in NYC
                </h2>

                <div className="space-y-6">
                  <div className="glass rounded-xl p-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">1. Book Early for Peak Season</h3>
                    <p className="text-muted-foreground">
                      NYC's wedding season (May-October) and holiday party season (November-December) fill up fast. For Saturday events, book 6-8 weeks in advance. For Javits trade shows, book 2-3 months ahead.
                    </p>
                  </div>

                  <div className="glass rounded-xl p-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">2. Confirm Venue Logistics</h3>
                    <p className="text-muted-foreground">
                      NYC venues often have strict load-in requirements, elevator reservations, and COI (Certificate of Insurance) needs. Ask your photo booth vendor about their Manhattan experience and whether they handle venue logistics.
                    </p>
                  </div>

                  <div className="glass rounded-xl p-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">3. Consider Your Guest Count</h3>
                    <p className="text-muted-foreground">
                      For NYC events with 200+ guests, consider high-throughput options like AI photo booths (60-second processing) or book multiple traditional stations. One booth typically handles 100-150 guests in a 3-hour event.
                    </p>
                  </div>

                  <div className="glass rounded-xl p-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">4. Ask About NYC-Specific Experience</h3>
                    <p className="text-muted-foreground">
                      Not all photo booth companies understand NYC logistics. Ask about their experience with Manhattan freight elevators, Brooklyn warehouse venues, and Queens stadium events. Local expertise saves headaches.
                    </p>
                  </div>
                </div>
              </section>

              {/* Why AI */}
              <section className="my-16">
                <h2 className="font-display text-3xl font-bold text-foreground mb-8">
                  Why NYC Corporate Events Choose AI Photo Booths
                </h2>

                <div className="glass rounded-xl p-6 border-primary/50">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="text-primary" size={20} />
                    <h3 className="text-xl font-bold text-foreground">The AI Advantage for NYC Events</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    NYC's competitive event landscape demands standout experiences. AI photo booths deliver what traditional booths can't:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-primary" />
                      Real-time AI transformations (superhero, professional headshots, branded characters)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-primary" />
                      95%+ lead capture rate for trade shows and corporate events
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-primary" />
                      Direct CRM integration (Salesforce, HubSpot)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-primary" />
                      Viral social sharing that amplifies your brand
                    </li>
                  </ul>
                  <p className="mt-4 text-primary font-semibold">
                    Perfect for: Javits trade shows, Fortune 500 galas, brand activations, product launches
                  </p>
                </div>
              </section>

              {/* CTA Section */}
              <section className="mt-16">
                <div className="glass rounded-2xl p-8 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-primary/20 rounded-full blur-[80px]" />
                  <div className="relative z-10">
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                      Need Photo Booth Rental in NYC?
                    </h2>
                    <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                      PixelAI Pro serves all five NYC boroughs with AI-powered photo experiences. From Javits Center trade shows to Brooklyn warehouse parties, we've got you covered.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                        Get NYC Quote <ArrowRight size={20} />
                      </Link>
                      <Link to="/locations/nyc" className="btn-secondary inline-flex items-center gap-2">
                        View NYC Services
                      </Link>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default PhotoBoothRentalNYCPage;
