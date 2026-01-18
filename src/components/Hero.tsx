import { ArrowRight, Play } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import heroImage from '@/assets/hero-background.jpg';

// Animated counter hook
const useCountUp = (end: number, duration: number = 2000, start: boolean = false) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!start) return;
    
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration, start]);
  
  return count;
};

// Brand ticker data
const brands = [
  { name: 'Netflix', domain: 'netflix.com' },
  { name: 'Microsoft', domain: 'microsoft.com' },
  { name: 'Google', domain: 'google.com' },
  { name: 'Nike', domain: 'nike.com' },
  { name: 'Meta', domain: 'meta.com' },
  { name: 'Amazon', domain: 'amazon.com' },
  { name: 'Apple', domain: 'apple.com' },
  { name: 'Spotify', domain: 'spotify.com' },
];

const Hero = () => {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Animated counters
  const eventsCount = useCountUp(500, 2000, statsVisible);
  const captureRate = useCountUp(95, 2000, statsVisible);
  const brandRecall = useCountUp(77, 2000, statsVisible);
  const processingTime = useCountUp(3, 1500, statsVisible);

  // Intersection observer for stats animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);


  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 animated-gradient opacity-40" />
      
      {/* Hero Background Image - Improved contrast */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="AI Photo Booth Rental NYC - Brand Activation Event Experience" 
          className="w-full h-full object-cover opacity-60 blur-[1px] scale-105 brightness-125"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/80" />
      </div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/40 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/40 rounded-full blur-[120px] animate-float" style={{ animationDelay: '-3s' }} />
      
      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="container-custom relative z-10 pt-20 pb-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 fade-in-up">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm text-muted-foreground">The Future of Event Activations</span>
            </div>

            {/* Main Headline - SEO Optimized */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-6 fade-in-up" style={{ animationDelay: '0.1s' }}>
              #1 AI Photo Booth
              <br />
              <span className="gradient-text">Rental in NYC</span>
            </h1>

            {/* Subtitle - ROI Focused */}
            <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 fade-in-up" style={{ animationDelay: '0.2s' }}>
              Transform corporate events & trade shows with AI-powered photo experiences. 
              Trusted by Fortune 500 brands at Javits Center & top NYC venues.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 fade-in-up" style={{ animationDelay: '0.3s' }}>
              <a href="#contact" className="btn-primary flex items-center gap-2 group">
                Get Started
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#portfolio" className="btn-outline flex items-center gap-2">
                <Play size={18} />
                View Our Work
              </a>
            </div>

            {/* Trust Logos - Now Above the Fold */}
            <div className="mt-10 fade-in-up" style={{ animationDelay: '0.4s' }}>
              <p className="text-xs text-muted-foreground/70 uppercase tracking-wider mb-4">Trusted by industry leaders</p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
                {brands.slice(0, 5).map((brand) => (
                  <div key={brand.name} className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
                    <img
                      src={`https://logo.clearbit.com/${brand.domain}`}
                      alt={`${brand.name} logo`}
                      loading="lazy"
                      className="w-6 h-6 object-contain grayscale"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <span className="text-xs font-medium text-muted-foreground hidden sm:inline">{brand.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Stats - ROI Metrics with Animation */}
        <div 
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-16 pt-8 border-t border-border/30 fade-in-up" 
          style={{ animationDelay: '0.5s' }}
        >
          <div className="text-center group">
            <div className="font-display text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-2 transition-transform group-hover:scale-110">
              {eventsCount}+
            </div>
            <div className="text-sm text-muted-foreground">NYC Events</div>
          </div>
          <div className="text-center group">
            <div className="font-display text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-2 transition-transform group-hover:scale-110">
              {captureRate}%
            </div>
            <div className="text-sm text-muted-foreground">Email Capture Rate</div>
          </div>
          <div className="text-center group">
            <div className="font-display text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-2 transition-transform group-hover:scale-110">
              {brandRecall}%
            </div>
            <div className="text-sm text-muted-foreground">Brand Recall Lift</div>
          </div>
          <div className="text-center group">
            <div className="font-display text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-2 transition-transform group-hover:scale-110">
              &lt;{processingTime}s
            </div>
            <div className="text-sm text-muted-foreground">AI Processing</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 fade-in" style={{ animationDelay: '0.6s' }}>
        <span className="text-xs text-muted-foreground">Scroll to explore</span>
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1 h-2 bg-muted-foreground rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
