import { cn } from '@/lib/utils';

// Import preview images for each style
import highlightPixelwear from '@/assets/highlights/highlight-pixelwear.jpg';
import highlightPersonaPop from '@/assets/highlights/highlight-persona-pop.jpg';
import highlightCoStar from '@/assets/highlights/highlight-co-star.jpg';
import highlightVideoBooths from '@/assets/highlights/highlight-video-booths.jpg';
import highlightAxonAI from '@/assets/highlights/highlight-axon-ai.jpg';
import highlightSketch from '@/assets/highlights/highlight-sketch.jpg';
import portfolioSuperhero from '@/assets/portfolio-superhero.jpg';
import portfolioVintage from '@/assets/portfolio-vintage.jpg';
import portfolioCyberpunk from '@/assets/portfolio-cyberpunk.jpg';
import portfolioAnime from '@/assets/portfolio-anime.jpg';
import portfolioFantasy from '@/assets/portfolio-fantasy.jpg';
// Single-person images for headshots and trading cards
import headshot1 from '@/assets/headshot-1.jpg';
import tradingCardPortrait from '@/assets/ai-trading-cards-baseball-custom-portrait.jpg';

export interface StyleOption {
  id: string;
  name: string;
  thumbnail: string;
  category: 'event' | 'creative' | 'custom';
}

export const styleOptions: StyleOption[] = [
  // Event Services
  { id: 'pixelwear', name: 'PixelWear', thumbnail: highlightPixelwear, category: 'event' },
  { id: 'trading-cards', name: 'Trading Cards', thumbnail: tradingCardPortrait, category: 'event' },
  { id: 'headshots', name: 'Headshots', thumbnail: headshot1, category: 'event' },
  { id: 'persona-pop', name: 'Persona Pop', thumbnail: highlightPersonaPop, category: 'event' },
  { id: 'co-star', name: 'Co-Star', thumbnail: highlightCoStar, category: 'event' },
  { id: 'video-booths', name: 'Video Booths', thumbnail: highlightVideoBooths, category: 'event' },
  { id: 'axon-ai', name: 'Axon AI', thumbnail: highlightAxonAI, category: 'event' },
  { id: 'sketch', name: 'Sketch', thumbnail: highlightSketch, category: 'event' },
  // Creative Styles
  { id: 'superhero', name: 'Superhero', thumbnail: portfolioSuperhero, category: 'creative' },
  { id: 'vintage', name: 'Vintage', thumbnail: portfolioVintage, category: 'creative' },
  { id: 'cyberpunk', name: 'Cyberpunk', thumbnail: portfolioCyberpunk, category: 'creative' },
  { id: 'anime', name: 'Anime', thumbnail: portfolioAnime, category: 'creative' },
  { id: 'fantasy', name: 'Fantasy', thumbnail: portfolioFantasy, category: 'creative' },
];

interface StylePreviewThumbnailsProps {
  selectedStyle: string;
  onSelectStyle: (styleId: string) => void;
  compact?: boolean;
}

const StylePreviewThumbnails = ({ selectedStyle, onSelectStyle, compact = false }: StylePreviewThumbnailsProps) => {
  const eventStyles = styleOptions.filter(s => s.category === 'event');
  const creativeStyles = styleOptions.filter(s => s.category === 'creative');

  if (compact) {
    return (
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {styleOptions.map((style) => (
          <button
            key={style.id}
            onClick={() => onSelectStyle(style.id)}
            className={cn(
              "shrink-0 relative rounded-lg overflow-hidden transition-all border-2",
              selectedStyle === style.id
                ? "border-primary ring-2 ring-primary/30 scale-105"
                : "border-transparent hover:border-muted-foreground/30"
            )}
          >
            <img
              src={style.thumbnail}
              alt={style.name}
              className="w-12 h-12 object-cover"
            />
            {selectedStyle === style.id && (
              <div className="absolute inset-0 bg-primary/20" />
            )}
          </button>
        ))}
        <button
          onClick={() => onSelectStyle('custom')}
          className={cn(
            "shrink-0 w-12 h-12 rounded-lg border-2 flex items-center justify-center text-lg transition-all bg-muted",
            selectedStyle === 'custom'
              ? "border-primary ring-2 ring-primary/30"
              : "border-dashed border-muted-foreground/30 hover:border-muted-foreground/50"
          )}
        >
          ✨
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Event Services */}
      <div>
        <p className="text-xs font-medium text-muted-foreground mb-2">Event Services</p>
        <div className="grid grid-cols-4 gap-2">
          {eventStyles.map((style) => (
            <button
              key={style.id}
              onClick={() => onSelectStyle(style.id)}
              className={cn(
                "relative rounded-lg overflow-hidden transition-all border-2 group",
                selectedStyle === style.id
                  ? "border-primary ring-2 ring-primary/30"
                  : "border-transparent hover:border-muted-foreground/30"
              )}
            >
              <img
                src={style.thumbnail}
                alt={style.name}
                className="w-full aspect-square object-cover"
              />
              <div className={cn(
                "absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/80 to-transparent p-1",
                selectedStyle === style.id ? "from-primary/80" : ""
              )}>
                <span className="text-white text-[10px] font-medium text-center leading-tight">
                  {style.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Creative Styles */}
      <div>
        <p className="text-xs font-medium text-muted-foreground mb-2">Creative Styles</p>
        <div className="grid grid-cols-5 gap-2">
          {creativeStyles.map((style) => (
            <button
              key={style.id}
              onClick={() => onSelectStyle(style.id)}
              className={cn(
                "relative rounded-lg overflow-hidden transition-all border-2 group",
                selectedStyle === style.id
                  ? "border-primary ring-2 ring-primary/30"
                  : "border-transparent hover:border-muted-foreground/30"
              )}
            >
              <img
                src={style.thumbnail}
                alt={style.name}
                className="w-full aspect-square object-cover"
              />
              <div className={cn(
                "absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/80 to-transparent p-1",
                selectedStyle === style.id ? "from-primary/80" : ""
              )}>
                <span className="text-white text-[10px] font-medium text-center leading-tight">
                  {style.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Style */}
      <button
        onClick={() => onSelectStyle('custom')}
        className={cn(
          "w-full py-3 rounded-lg border-2 flex items-center justify-center gap-2 transition-all",
          selectedStyle === 'custom'
            ? "border-primary bg-primary/10 text-primary"
            : "border-dashed border-muted-foreground/30 hover:border-primary/50 hover:bg-muted/50"
        )}
      >
        <span className="text-lg">✨</span>
        <span className="text-sm font-medium">Custom Style - Describe Your Own</span>
      </button>
    </div>
  );
};

export default StylePreviewThumbnails;
