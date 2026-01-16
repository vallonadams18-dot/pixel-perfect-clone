import { Shirt, User, Users, Bot, CreditCard, Video, Camera, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: Shirt,
    title: 'PixelWear',
    slug: 'pixelwear',
    description: 'The Digital Wardrobe. Guests "try on" your branded apparel instantly. No sizes, no logistics, pure engagement.',
  },
  {
    icon: User,
    title: 'Identity',
    slug: 'identity',
    description: 'Roleplay AI. Seamlessly swap guest faces onto brand mascots or campaign heroes with 99% accuracy.',
  },
  {
    icon: Users,
    title: 'Co-Star',
    slug: 'co-star',
    description: 'Digital Meet-and-Greet. Place your guests in a professional portrait next to any celebrity or athlete.',
  },
  {
    icon: Bot,
    title: 'AXON AI',
    slug: 'axon-ai',
    description: 'AXON AI navigates your event using LIDAR, identifying guests to capture high-fidelity, studio-quality portraits.',
  },
  {
    icon: CreditCard,
    title: 'Persona Pop',
    slug: 'persona-pop',
    description: 'Guests capture a portrait; our engine renders a bespoke, data-driven trading card featuring your brand\'s custom stats.',
  },
  {
    icon: Video,
    title: 'AI Video Booths',
    slug: 'ai-video-booths',
    description: 'Neural networks transform footage into stylized masterpieces, turning guests into protagonists of branded motion stories.',
  },
  {
    icon: Camera,
    title: 'Headshots',
    slug: 'headshots',
    description: 'Neural engine captures your likeness, instantly rendering professional headshots optimized for executive branding.',
  },
  {
    icon: Sparkles,
    title: 'AI Trading Cards',
    slug: 'ai-trading-cards',
    description: 'Transform guests into high-fidelity, branded collectibles featuring custom stats and stylized aesthetics.',
  },
];

const Services = () => {
  return (
    <section id="services" className="section-padding relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px]" />
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-widest text-primary font-semibold mb-4 block">
            AI Photo Booth Services NYC
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Experiential Marketing <span className="gradient-text">Activations</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Custom AI photo booth rentals for corporate events, trade shows, product launches & brand activations in New York City.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Link
              to={`/experiences/${service.slug}`}
              key={service.title}
              className="group relative glass rounded-2xl p-6 card-hover gradient-border block"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <service.icon size={28} className="text-white" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:gradient-text transition-all">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>

              {/* Hover Arrow */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
