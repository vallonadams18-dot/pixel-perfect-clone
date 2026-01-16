import { Link } from 'react-router-dom';
import { Sparkles, Camera, Video, CreditCard, Shirt, User, Users, Bot } from 'lucide-react';

const allServices = [
  {
    slug: 'ai-trading-cards',
    title: 'AI Trading Cards',
    description: 'Custom AI-generated trading cards for sports events and brand activations.',
    icon: CreditCard,
  },
  {
    slug: 'headshots',
    title: 'AI Headshots NYC',
    description: 'Professional AI-enhanced headshots for conferences and corporate events.',
    icon: Camera,
  },
  {
    slug: 'ai-video-booths',
    title: 'AI Video Booths',
    description: 'AI-powered video transformation for dynamic brand activations.',
    icon: Video,
  },
  {
    slug: 'pixelwear',
    title: 'PixelWear Virtual Try-On',
    description: 'Digital wardrobe experience for branded apparel activations.',
    icon: Shirt,
  },
  {
    slug: 'identity',
    title: 'Identity Face Swap',
    description: 'Seamlessly swap faces onto brand mascots or campaign heroes.',
    icon: User,
  },
  {
    slug: 'co-star',
    title: 'Co-Star Celebrity Photos',
    description: 'Digital meet-and-greet with celebrities and athletes.',
    icon: Users,
  },
  {
    slug: 'persona-pop',
    title: 'Persona Pop Cards',
    description: 'Data-driven trading cards with custom stats and branding.',
    icon: Sparkles,
  },
  {
    slug: 'axon-ai',
    title: 'AXON AI Robot',
    description: 'Autonomous AI robot for roaming event photography.',
    icon: Bot,
  },
];

interface RelatedServicesProps {
  currentSlug: string;
  maxItems?: number;
}

const RelatedServices = ({ currentSlug, maxItems = 4 }: RelatedServicesProps) => {
  const relatedServices = allServices
    .filter(service => service.slug !== currentSlug)
    .slice(0, maxItems);

  return (
    <section className="section-padding bg-card/30">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="text-sm uppercase tracking-widest text-primary font-semibold mb-4 block">
            Explore More
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Related <span className="gradient-text">AI Photo Booth</span> Experiences
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Discover more AI-powered activations for your NYC corporate events, trade shows, and brand experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedServices.map((service) => (
            <Link
              key={service.slug}
              to={`/experiences/${service.slug}`}
              className="group glass rounded-2xl p-6 card-hover block"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <service.icon size={24} className="text-white" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {service.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/services" className="btn-secondary">
            View All AI Photo Booth Services →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RelatedServices;