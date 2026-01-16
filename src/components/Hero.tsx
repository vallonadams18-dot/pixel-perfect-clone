import { ArrowRight, Play } from 'lucide-react';
import heroImage from '@/assets/hero-transformation.jpg';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 animated-gradient" />
      
      {/* Hero Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="AI Photo Booth Transformation" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-[120px] animate-float" style={{ animationDelay: '-3s' }} />
      
      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="container-custom relative z-10 text-center pt-24">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 fade-in-up">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-sm text-muted-foreground">The Future of Event Activations</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-tight mb-6 fade-in-up" style={{ animationDelay: '0.1s' }}>
          AI Photo Booth for
          <br />
          <span className="gradient-text">High-Performance</span>
          <br />
          Brands in NYC
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 fade-in-up" style={{ animationDelay: '0.2s' }}>
          Transform your brand activations with cutting-edge neural technology. 
          Our AI-powered photo experiences create viral moments that amplify your brand's digital presence.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-in-up" style={{ animationDelay: '0.3s' }}>
          <a href="#contact" className="btn-primary flex items-center gap-2 group">
            Get Started
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#portfolio" className="btn-outline flex items-center gap-2">
            <Play size={18} />
            View Our Work
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-10 border-t border-border/30 fade-in-up" style={{ animationDelay: '0.4s' }}>
          {[
            { value: '500+', label: 'Events Completed' },
            { value: '2M+', label: 'Photos Generated' },
            { value: '99%', label: 'Client Satisfaction' },
            { value: '<3s', label: 'Generation Time' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 fade-in" style={{ animationDelay: '0.5s' }}>
        <span className="text-xs text-muted-foreground">Scroll to explore</span>
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1 h-2 bg-muted-foreground rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
