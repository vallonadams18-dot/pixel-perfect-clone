import { Link } from 'react-router-dom';

// Import real photos from gallery
import pixelwearImage from '@/assets/pixelwear-cowboys.jpg';
import identityImage from '@/assets/ai-photo-booth-custom-portrait-transformation.jpg';
import costarImage from '@/assets/co-star-demo.jpg';
import axonImage from '@/assets/axon-ai-robot.png';
import personaPopImage from '@/assets/persona-pop-demo.jpg';
import videoBoothImage from '@/assets/ai-photo-booth-neo-cyberpunk-style.jpg';
import headshotsImage from '@/assets/headshot-1.jpg';
import tradingCardsImage from '@/assets/ai-trading-cards-hero-collection.jpg';

const services = [
  {
    image: pixelwearImage,
    title: 'PixelWear',
    slug: 'pixelwear',
    description: 'The Digital Wardrobe. Guests "try on" your branded apparel instantly. No sizes, no logistics, pure engagement.',
    objectPosition: 'top',
  },
  {
    image: identityImage,
    title: 'Identity',
    slug: 'identity',
    description: 'Roleplay AI. Seamlessly swap guest faces onto brand mascots or campaign heroes with 99% accuracy.',
    objectPosition: 'top',
  },
  {
    image: costarImage,
    title: 'Co-Star',
    slug: 'co-star',
    description: 'Digital Meet-and-Greet. Place your guests in a professional portrait next to any celebrity or athlete.',
    objectPosition: 'top',
  },
  {
    image: axonImage,
    title: 'AXON AI',
    slug: 'axon-ai',
    description: 'AXON AI navigates your event using LIDAR, identifying guests to capture high-fidelity, studio-quality portraits.',
    objectPosition: 'center',
  },
  {
    image: personaPopImage,
    title: 'Persona Pop',
    slug: 'persona-pop',
    description: 'Guests capture a portrait; our engine renders a bespoke, data-driven trading card featuring your brand\'s custom stats.',
    objectPosition: 'top',
  },
  {
    image: videoBoothImage,
    title: 'AI Video Booths',
    slug: 'ai-video-booths',
    description: 'Neural networks transform footage into stylized masterpieces, turning guests into protagonists of branded motion stories.',
    objectPosition: 'top',
  },
  {
    image: headshotsImage,
    title: 'Headshots',
    slug: 'headshots',
    description: 'Neural engine captures your likeness, instantly rendering professional headshots optimized for executive branding.',
    objectPosition: 'center 20%',
  },
  {
    image: tradingCardsImage,
    title: 'AI Trading Cards',
    slug: 'ai-trading-cards',
    description: 'Transform guests into high-fidelity, branded collectibles featuring custom stats and stylized aesthetics.',
    objectPosition: 'top',
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
              className="group relative glass rounded-2xl overflow-hidden card-hover gradient-border block"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Service Image */}
              <div className="relative h-52 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={`${service.title} - AI Photo Booth Service NYC`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ objectPosition: service.objectPosition }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:gradient-text transition-all">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>

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
