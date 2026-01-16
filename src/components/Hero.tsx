import { ArrowRight, Play } from 'lucide-react';
import heroImage from '@/assets/hero-background.jpg';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 animated-gradient" />
      
      {/* Hero Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="AI Photo Booth Rental NYC - Brand Activation Event Experience" 
          className="w-full h-full object-cover opacity-50"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/95" />
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

        {/* Main Headline - SEO Optimized */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-tight mb-6 fade-in-up" style={{ animationDelay: '0.1s' }}>
          #1 AI Photo Booth
          <br />
          <span className="gradient-text">Rental in NYC</span>
          <br />
          for Brand Activations
        </h1>

        {/* Subtitle - ROI Focused */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 fade-in-up" style={{ animationDelay: '0.2s' }}>
          Transform corporate events & trade shows with AI-powered photo experiences. 
          Real-time lead capture, CRM integration, and instant social sharing—trusted by Fortune 500 brands at Javits Center, Pier 60 & top NYC venues.
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

        {/* Stats - ROI Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-10 border-t border-border/30 fade-in-up" style={{ animationDelay: '0.4s' }}>
          {[
            { value: '500+', label: 'NYC Events' },
            { value: '95%', label: 'Email Capture Rate' },
            { value: '77%', label: 'Brand Recall Lift' },
            { value: '<3s', label: 'AI Processing' },
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
