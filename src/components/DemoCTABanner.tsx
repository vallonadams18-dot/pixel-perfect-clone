import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DemoCTABannerProps {
  experienceTitle: string;
  subtitle?: string;
}

const DemoCTABanner = ({ experienceTitle, subtitle }: DemoCTABannerProps) => {
  const scrollToDemo = () => {
    const demoSection = document.getElementById('try-demo');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      {/* Primary Gradient Background - matches site gradient */}
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
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-primary/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '500ms' }} />
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-primary-foreground text-sm font-medium mb-3">
              <Sparkles className="w-4 h-4" />
              Try It Free
            </div>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-2">
              Experience {experienceTitle} Now
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-xl">
              {subtitle || `Get 2 free transformations. No credit card required.`}
            </p>
          </div>
          
          <Button
            onClick={scrollToDemo}
            size="lg"
            className="bg-background text-foreground hover:bg-background/90 font-bold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all group glow"
          >
            Try Demo Free
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DemoCTABanner;