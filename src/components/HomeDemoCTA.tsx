import { Sparkles, ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HomeDemoCTA = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Primary Gradient Background */}
      <div 
        className="absolute inset-0" 
        style={{ background: 'var(--gradient-primary)' }} 
      />
      {/* Overlay glow for depth */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{ background: 'var(--gradient-glow)' }}
      />
      
      {/* Animated glow orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-primary/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '500ms' }} />
      <div className="absolute top-1/2 right-10 w-48 h-48 bg-accent/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-primary-foreground text-sm font-medium mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            <span>Try Our AI Experiences Free</span>
          </div>
          
          {/* Heading */}
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            See the Magic in Action
          </h2>
          
          {/* Subheading */}
          <p className="text-primary-foreground/85 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Transform your photo with our AI technology. Get 2 free transformations — 
            no signup required. Experience what your event guests will love.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/experiences/persona-pop">
              <Button
                size="lg"
                className="bg-background text-foreground hover:bg-background/90 font-bold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all group glow min-w-[200px]"
              >
                <Play className="w-5 h-5 mr-2" />
                Try Demo Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Link to="/services">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-primary-foreground hover:bg-white/10 font-semibold px-8 py-6 text-lg rounded-xl min-w-[200px]"
              >
                View All Experiences
              </Button>
            </Link>
          </div>
          
          {/* Trust indicator */}
          <p className="text-primary-foreground/60 text-sm mt-6">
            ✓ No credit card required &nbsp;&bull;&nbsp; ✓ Instant results &nbsp;&bull;&nbsp; ✓ 500+ events powered
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeDemoCTA;
