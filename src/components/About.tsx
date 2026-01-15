import { Zap, Shield, Sparkles, Award } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'AI transformations in under 3 seconds with real-time neural processing.',
  },
  {
    icon: Shield,
    title: 'Enterprise Ready',
    description: 'GDPR compliant with secure data handling and custom privacy options.',
  },
  {
    icon: Sparkles,
    title: 'Custom Branding',
    description: 'Every experience tailored to your brand identity and campaign goals.',
  },
  {
    icon: Award,
    title: 'Award Winning',
    description: 'Recognized by leading marketing and technology industry awards.',
  },
];

const About = () => {
  return (
    <section id="about" className="section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div>
            <span className="text-sm uppercase tracking-widest text-primary font-semibold mb-4 block">
              About Us
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Pioneering the Future of <span className="gradient-text">Brand Activations</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              PixelAI Pro is New York City's premier AI photo booth company, merging cutting-edge 
              generative AI with experiential marketing to create unforgettable brand moments.
            </p>
            <p className="text-muted-foreground mb-8">
              Our proprietary neural networks power experiences for Fortune 500 companies, 
              luxury brands, and innovative startups. From fashion weeks to product launches, 
              we transform ordinary events into viral sensations.
            </p>

            {/* Feature Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <feature.icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-foreground mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            {/* Main Image Area */}
            <div className="relative aspect-square rounded-3xl overflow-hidden glass glow">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-card to-accent/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 animate-float">
                    <span className="text-5xl">🤖</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    AI-Powered
                  </h3>
                  <p className="text-muted-foreground">Neural Network Technology</p>
                </div>
              </div>
            </div>

            {/* Floating Stats Cards */}
            <div className="absolute -top-6 -right-6 glass rounded-2xl p-4 animate-float">
              <div className="font-display text-2xl font-bold gradient-text">500+</div>
              <div className="text-muted-foreground text-sm">Events</div>
            </div>

            <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 animate-float" style={{ animationDelay: '-2s' }}>
              <div className="font-display text-2xl font-bold gradient-text">2M+</div>
              <div className="text-muted-foreground text-sm">Photos Created</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
