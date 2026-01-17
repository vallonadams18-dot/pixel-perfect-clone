import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';
import usePageMeta from '@/hooks/usePageMeta';

const blogPosts = [
  {
    slug: 'custom-ai-filters-for-events',
    title: 'Custom AI Filters for Events: The Complete Guide to Branded Photo Experiences',
    excerpt: 'Learn how custom AI filters can transform your corporate events, trade shows, and brand activations. Discover the technology behind personalized photo transformations and why Fortune 500 brands are investing in AI-powered experiences.',
    image: '/og-persona-pop.jpg',
    category: 'AI Technology',
    author: 'PixelAI Pro Team',
    date: '2026-01-15',
    readTime: '8 min read',
  },
  {
    slug: 'interactive-guest-engagement-ideas',
    title: 'Interactive Guest Engagement Ideas: 15 Proven Strategies for Memorable Events',
    excerpt: 'Discover innovative ways to engage guests at corporate events, conferences, and brand activations. From AI photo booths to gamified experiences, learn what actually drives participation and ROI.',
    image: '/og-ai-video-booths.jpg',
    category: 'Event Marketing',
    author: 'PixelAI Pro Team',
    date: '2026-01-12',
    readTime: '10 min read',
  },
  {
    slug: 'ai-photo-booth-vs-traditional-photo-booth',
    title: 'AI Photo Booth vs Traditional Photo Booth: Which is Right for Your Event?',
    excerpt: 'Compare AI-powered photo booths with traditional options. Understand the differences in engagement, lead capture, social sharing, and ROI to make the best choice for your next event.',
    image: '/og-headshots.jpg',
    category: 'Comparison',
    author: 'PixelAI Pro Team',
    date: '2026-01-10',
    readTime: '6 min read',
  },
  {
    slug: 'trade-show-booth-ideas-that-drive-leads',
    title: 'Trade Show Booth Ideas That Actually Drive Leads in 2026',
    excerpt: 'Stop blending in at trade shows. Discover the experiential marketing strategies that top exhibitors use to capture qualified leads and create memorable brand experiences.',
    image: '/og-ai-trading-cards.jpg',
    category: 'Trade Shows',
    author: 'PixelAI Pro Team',
    date: '2026-01-08',
    readTime: '7 min read',
  },
  {
    slug: 'corporate-headshot-trends',
    title: 'Corporate Headshot Trends: How AI is Revolutionizing Professional Photography',
    excerpt: 'AI-generated headshots are changing how companies approach professional photography. Learn about the latest trends, best practices, and how to implement AI headshots at your next conference.',
    image: '/og-headshots.jpg',
    category: 'AI Technology',
    author: 'PixelAI Pro Team',
    date: '2026-01-05',
    readTime: '5 min read',
  },
  {
    slug: 'event-marketing-roi-measurement',
    title: 'How to Measure Event Marketing ROI: A Data-Driven Approach',
    excerpt: 'Learn how to track and measure the true ROI of your event marketing investments. From lead capture rates to social media impressions, discover the metrics that matter most.',
    image: '/og-image.jpg',
    category: 'Event Marketing',
    author: 'PixelAI Pro Team',
    date: '2026-01-02',
    readTime: '9 min read',
  },
];

const categories = ['All', 'AI Technology', 'Event Marketing', 'Trade Shows', 'Comparison'];

const BlogPage = () => {
  usePageMeta({
    title: 'AI Photo Booth Blog | Event Marketing Tips & Insights | PixelAI Pro',
    description: 'Expert insights on AI photo booths, event marketing, trade show strategies, and experiential marketing. Learn how to maximize engagement and ROI at your next corporate event.',
    ogImage: '/og-image.jpg',
    canonicalPath: '/blog',
    keywords: 'AI photo booth blog, event marketing tips, trade show ideas, experiential marketing, corporate event technology, photo booth trends, guest engagement strategies',
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
        
        <div className="container-custom relative z-10 text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            AI Photo Booth <span className="gradient-text">Insights</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expert tips on event marketing, AI technology, and experiential activations 
            to help you create unforgettable brand experiences.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-border/30">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === 'All'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card hover:bg-primary/20 text-muted-foreground hover:text-foreground'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="glass rounded-2xl overflow-hidden group hover:border-primary/50 transition-all"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    {post.category}
                  </span>
                  <h2 className="font-display text-xl font-bold text-foreground mt-2 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-card/50">
        <div className="container-custom">
          <div className="glass rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 rounded-full blur-[100px]" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready to Transform Your Next Event?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Book a free demo and see how AI photo experiences can elevate your brand activations.
              </p>
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                Get Free Quote <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;