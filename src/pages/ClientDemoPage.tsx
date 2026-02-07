import { useState, useRef } from 'react';
import ExperienceDemo from '@/components/ExperienceDemo';
import usePageMeta from '@/hooks/usePageMeta';
import { ChevronLeft, ChevronRight, Share2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

// Import service images
import pixelwearImage from '@/assets/pixelwear-cowboys.jpg';
import identityImage from '@/assets/sketch-guest-after-1.jpg';
import costarImage from '@/assets/co-star-demo.jpg';
import axonImage from '@/assets/axon-ai-robot.png';
import personaPopImage from '@/assets/persona-pop-demo.jpg';
import videoBoothImage from '@/assets/ai-photo-booth-neo-cyberpunk-style.jpg';
import headshotsImage from '@/assets/headshot-1.jpg';
import tradingCardsImage from '@/assets/ai-trading-cards-hero-collection.jpg';

const experiences = [
  {
    id: 'headshots',
    title: 'AI Headshots',
    subtitle: 'Professional Portraits',
    description: 'Studio-quality corporate headshots in seconds',
    image: headshotsImage,
    color: 'from-blue-500/20 to-blue-600/20',
  },
  {
    id: 'persona-pop',
    title: 'Persona Pop',
    subtitle: 'Character Transforms',
    description: 'Become any character from Pixar to Superhero',
    image: personaPopImage,
    color: 'from-purple-500/20 to-pink-500/20',
  },
  {
    id: 'pixelwear',
    title: 'PixelWear',
    subtitle: 'Virtual Fashion',
    description: 'Try on branded apparel and luxury fashion',
    image: pixelwearImage,
    color: 'from-amber-500/20 to-orange-500/20',
  },
  {
    id: 'trading-cards',
    title: 'Trading Cards',
    subtitle: 'Sports Collectibles',
    description: 'Custom sports cards with your stats',
    image: tradingCardsImage,
    color: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    id: 'co-star',
    title: 'Co-Star',
    subtitle: 'Celebrity Photos',
    description: 'Appear alongside celebrities and athletes',
    image: costarImage,
    color: 'from-red-500/20 to-rose-500/20',
  },
  {
    id: 'identity',
    title: 'AI Sketch',
    subtitle: 'Artistic Portraits',
    description: 'Hand-drawn sketches in various styles',
    image: identityImage,
    color: 'from-slate-500/20 to-zinc-500/20',
  },
  {
    id: 'video-booths',
    title: 'Video Booths',
    subtitle: 'Motion Effects',
    description: 'Dynamic video transformations',
    image: videoBoothImage,
    color: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    id: 'axon-ai',
    title: 'AXON AI',
    subtitle: 'Robot Photography',
    description: 'Autonomous AI-powered portraits',
    image: axonImage,
    color: 'from-violet-500/20 to-indigo-500/20',
  },
];

const ClientDemoPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showDemo, setShowDemo] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  usePageMeta({
    title: 'Try Our AI Photo Experiences | PixelAI Pro Demo',
    description: 'Interactive demo of all PixelAI Pro AI photo booth experiences. Try AI Headshots, Persona Pop, PixelWear, and more on your phone or tablet.',
    ogImage: '/og-image.jpg',
    canonicalPath: '/try',
    keywords: 'AI photo booth demo, interactive demo, try AI photos, photo booth experience',
  });

  const activeExperience = experiences[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? experiences.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === experiences.length - 1 ? 0 : prev + 1));
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Try PixelAI Pro AI Photo Booth',
          text: 'Check out these amazing AI photo experiences!',
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleTouchStart = useRef<number>(0);
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = handleTouchStart.current - touchEnd;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  if (showDemo) {
    return (
      <div className="min-h-screen bg-background">
        {/* Demo Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border/50">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setShowDemo(false)}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back</span>
            </button>
            <div className="text-center">
              <h1 className="text-sm font-bold text-foreground">{activeExperience.title}</h1>
              <p className="text-xs text-muted-foreground">{activeExperience.subtitle}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              className="text-muted-foreground hover:text-foreground"
            >
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Demo Content */}
        <main className="pt-16 pb-8 px-4">
          <div className="max-w-2xl mx-auto">
            <ExperienceDemo
              experience={activeExperience.id}
              experienceTitle={activeExperience.title}
              experienceDescription={activeExperience.description}
            />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Minimal Top Bar */}
      <header className="flex items-center justify-between px-4 py-4 safe-area-inset-top">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xs">P</span>
          </div>
          <span className="font-display text-sm font-bold text-foreground">PixelAI Pro</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleShare}
          className="text-muted-foreground hover:text-foreground"
        >
          <Share2 className="w-5 h-5" />
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-8">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-1">
            Try Our Experiences
          </h1>
          <p className="text-sm text-muted-foreground">Swipe to explore • Tap to try</p>
        </div>

        {/* Carousel */}
        <div 
          className="relative w-full max-w-sm"
          onTouchStart={(e) => { handleTouchStart.current = e.touches[0].clientX; }}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation Arrows - Desktop */}
          <button
            onClick={handlePrev}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-10 h-10 rounded-full bg-muted/80 hover:bg-muted items-center justify-center text-foreground transition-colors z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-10 h-10 rounded-full bg-muted/80 hover:bg-muted items-center justify-center text-foreground transition-colors z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Card */}
          <div
            className={cn(
              "relative rounded-3xl overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-[1.02]",
              "bg-gradient-to-br",
              activeExperience.color
            )}
            onClick={() => setShowDemo(true)}
          >
            {/* Image */}
            <div className="aspect-[3/4] relative">
              <img
                src={activeExperience.image}
                alt={activeExperience.title}
                className="w-full h-full object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-xs uppercase tracking-widest text-white/70 mb-1">
                  {activeExperience.subtitle}
                </p>
                <h2 className="font-display text-2xl font-bold mb-2">
                  {activeExperience.title}
                </h2>
                <p className="text-sm text-white/80 mb-4">
                  {activeExperience.description}
                </p>
                <div className="flex items-center justify-center gap-2 py-3 px-6 bg-white/20 backdrop-blur-sm rounded-full w-fit">
                  <span className="text-sm font-medium">Tap to Try</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {experiences.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === activeIndex
                  ? "w-6 bg-primary"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
            />
          ))}
        </div>

        {/* Quick Access Thumbnails */}
        <div 
          ref={scrollRef}
          className="flex gap-3 mt-8 overflow-x-auto pb-2 px-4 -mx-4 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {experiences.map((exp, index) => (
            <button
              key={exp.id}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "flex-shrink-0 rounded-xl overflow-hidden transition-all duration-300",
                index === activeIndex
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                  : "opacity-60 hover:opacity-100"
              )}
            >
              <img
                src={exp.image}
                alt={exp.title}
                className="w-14 h-14 object-cover"
              />
            </button>
          ))}
        </div>
      </main>

      {/* Bottom CTA */}
      <footer className="px-4 pb-6 safe-area-inset-bottom">
        <a
          href="https://pixelaipro.lovable.app/contact"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full max-w-sm mx-auto py-3 text-center bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Book This for Your Event
        </a>
      </footer>
    </div>
  );
};

export default ClientDemoPage;
