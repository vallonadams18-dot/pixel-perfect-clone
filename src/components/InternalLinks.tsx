import { Link } from 'react-router-dom';

interface InternalLinksProps {
  category: 'experiences' | 'locations' | 'blog' | 'mixed';
  excludeSlug?: string;
  maxItems?: number;
  title?: string;
}

const experienceLinks = [
  { slug: '/experiences/ai-trading-cards', name: 'AI Trading Cards', description: 'Custom sports trading cards' },
  { slug: '/experiences/headshots', name: 'AI Headshots', description: 'Professional corporate headshots' },
  { slug: '/experiences/ai-video-booths', name: 'AI Video Booths', description: 'Dynamic video transformations' },
  { slug: '/experiences/pixelwear', name: 'PixelWear', description: 'Virtual try-on experience' },
  { slug: '/experiences/identity', name: 'AI Sketch-a-Guest', description: 'Digital portrait sketches' },
  { slug: '/experiences/co-star', name: 'Co-Star Photos', description: 'Celebrity photo experiences' },
  { slug: '/experiences/persona-pop', name: 'Persona Pop', description: 'Personalized trading cards' },
  { slug: '/experiences/axon-ai', name: 'AXON AI Robot', description: 'Roaming AI photography' },
];

const locationLinks = [
  { slug: '/locations/nyc', name: 'NYC Photo Booth Rental', description: 'Manhattan, Brooklyn & more' },
  { slug: '/locations/los-angeles', name: 'Los Angeles Photo Booth', description: 'LA event activations' },
  { slug: '/locations/chicago', name: 'Chicago Photo Booth', description: 'Windy City events' },
  { slug: '/locations/miami', name: 'Miami Photo Booth', description: 'South Florida activations' },
  { slug: '/locations/las-vegas', name: 'Las Vegas Photo Booth', description: 'Vegas trade shows' },
  { slug: '/locations/atlanta', name: 'Atlanta Photo Booth', description: 'Southern event experiences' },
  { slug: '/locations/boston', name: 'Boston Photo Booth', description: 'New England events' },
  { slug: '/locations/washington-dc', name: 'Washington DC Photo Booth', description: 'DC area activations' },
];

const blogLinks = [
  { slug: '/blog/ai-photo-booth-rental-corporate-events', name: 'AI Photo Booth for Corporate Events', description: 'Complete 2026 guide' },
  { slug: '/blog/photo-booth-rental-guide', name: 'Photo Booth Rental Guide', description: 'Complete guide' },
  { slug: '/blog/corporate-photo-booth-rental', name: 'Corporate Photo Booth', description: 'Business event planning' },
  { slug: '/blog/photo-booth-rental-nyc', name: 'NYC Photo Booth Rental', description: 'NYC specific tips' },
  { slug: '/blog/ai-photo-booth-vs-traditional-photo-booth', name: 'AI vs Traditional Booths', description: 'Technology comparison' },
  { slug: '/blog/corporate-headshot-trends', name: 'Headshot Trends', description: 'Latest professional trends' },
  { slug: '/blog/trade-show-booth-ideas-that-drive-leads', name: 'Trade Show Ideas', description: 'Booth engagement tips' },
];

const InternalLinks = ({ category, excludeSlug, maxItems = 6, title }: InternalLinksProps) => {
  let links: typeof experienceLinks = [];
  
  switch (category) {
    case 'experiences':
      links = experienceLinks;
      break;
    case 'locations':
      links = locationLinks;
      break;
    case 'blog':
      links = blogLinks;
      break;
    case 'mixed':
      links = [
        ...experienceLinks.slice(0, 2),
        ...locationLinks.slice(0, 2),
        ...blogLinks.slice(0, 2),
      ];
      break;
  }
  
  const filteredLinks = links
    .filter(link => link.slug !== excludeSlug)
    .slice(0, maxItems);

  const sectionTitle = title || {
    experiences: 'Explore AI Photo Booth Experiences',
    locations: 'Photo Booth Rental Locations',
    blog: 'Related Articles',
    mixed: 'Discover More',
  }[category];

  return (
    <div className="py-8 border-t border-border/30">
      <h3 className="font-display text-lg font-bold text-foreground mb-4">
        {sectionTitle}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {filteredLinks.map((link) => (
          <Link
            key={link.slug}
            to={link.slug}
            className="group p-3 rounded-lg bg-card/50 hover:bg-primary/10 transition-colors"
          >
            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors block">
              {link.name}
            </span>
            <span className="text-xs text-muted-foreground">
              {link.description}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default InternalLinks;
