import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ImageWithSkeleton from '@/components/ImageWithSkeleton';
import { GalleryGrid } from '@/components/GalleryGrid';

// Import portfolio images - SEO optimized file names (user uploaded)
import pirateCosplayImage from '@/assets/ai-photo-booth-pirate-cosplay-transformation.jpg';
import footballPlayerBlueImage from '@/assets/ai-sports-portrait-football-player-stadium.jpg';
import nflPlayerGreenImage from '@/assets/ai-generated-nfl-player-professional-headshot.jpg';
import femaleAthleteImage from '@/assets/ai-photo-booth-female-athlete-football-portrait.jpg';
import footballHeadshotImage from '@/assets/ai-football-headshot-professional-portrait.jpg';
import customPortraitImage from '@/assets/ai-photo-booth-custom-portrait-transformation.jpg';
import cowboyImage from '@/assets/ai-photo-booth-cowboy-western-portrait.jpg';
import neoFuturisticImage from '@/assets/ai-photo-booth-neo-futuristic-portrait.jpg';
import eventExperienceImage from '@/assets/ai-photo-booth-event-experience-portrait.jpg';
import graffitiImage from '@/assets/ai-photo-booth-graffiti-street-art-portrait.jpg';
import golferImage from '@/assets/ai-sports-portrait-golfer-professional.jpg';
import neoCyberpunkImage from '@/assets/ai-photo-booth-neo-cyberpunk-style.jpg';

const portfolioImages = [
  { id: 1, src: pirateCosplayImage, alt: 'AI Photo Booth Pirate Cosplay Group Transformation Event', category: 'Cosplay', aspect: 'portrait' },
  { id: 2, src: footballPlayerBlueImage, alt: 'AI Sports Portrait Football Player Stadium Photo Booth', category: 'Sports', aspect: 'portrait' },
  { id: 3, src: nflPlayerGreenImage, alt: 'AI Generated NFL Player Professional Headshot Photo Booth', category: 'Sports', aspect: 'portrait' },
  { id: 4, src: femaleAthleteImage, alt: 'AI Photo Booth Female Athlete Football Portrait Experience', category: 'Sports', aspect: 'portrait' },
  { id: 5, src: footballHeadshotImage, alt: 'AI Football Headshot Professional Sports Portrait NYC', category: 'Sports', aspect: 'portrait' },
  { id: 6, src: customPortraitImage, alt: 'AI Photo Booth Custom Portrait Transformation Experience', category: 'Custom', aspect: 'portrait' },
  { id: 7, src: cowboyImage, alt: 'AI Photo Booth Cowboy Western Theme Portrait NYC Event', category: 'Western', aspect: 'portrait' },
  { id: 8, src: neoFuturisticImage, alt: 'AI Photo Booth Neo Futuristic Sci-Fi Portrait Experience', category: 'Futuristic', aspect: 'portrait' },
  { id: 9, src: eventExperienceImage, alt: 'AI Photo Booth Brand Activation Event Experience NYC', category: 'Events', aspect: 'portrait' },
  { id: 10, src: graffitiImage, alt: 'AI Photo Booth Graffiti Street Art Portrait Transformation', category: 'Street Art', aspect: 'portrait' },
  { id: 11, src: golferImage, alt: 'AI Sports Portrait Golfer Professional Headshot Photo Booth', category: 'Sports', aspect: 'portrait' },
  { id: 12, src: neoCyberpunkImage, alt: 'AI Photo Booth Neo Cyberpunk Style Portrait NYC Event', category: 'Cyberpunk', aspect: 'portrait' },
];

const Portfolio = () => {
  const location = useLocation();
  const isPortfolioPage = location.pathname === '/portfolio';
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrev = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? portfolioImages.length - 1 : selectedIndex - 1);
    }
  }, [selectedIndex]);

  const handleNext = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === portfolioImages.length - 1 ? 0 : selectedIndex + 1);
    }
  }, [selectedIndex]);

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedIndex, handleClose, handlePrev, handleNext]);

  const selectedImage = selectedIndex !== null ? portfolioImages[selectedIndex] : null;

  const handleImageClick = (index: number, e: React.MouseEvent) => {
    if (isPortfolioPage) {
      e.preventDefault();
      setSelectedIndex(index);
    }
  };

  return (
    <section id="portfolio" className="section-padding relative">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-widest text-primary font-semibold mb-4 block">
            Our Work
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Portfolio <span className="gradient-text">Gallery</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Browse through our collection of AI-generated portraits and brand activations from events across NYC.
          </p>
        </div>

        {/* Masonry Grid */}
        <GalleryGrid columns={4} gap="md">
          {portfolioImages.map((image, index) => {
            const content = (
              <>
                {/* Portfolio Image with Skeleton */}
                <ImageWithSkeleton
                  src={image.src}
                  alt={image.alt}
                  aspectRatio="3/4"
                  priority={index < 4}
                  className="transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium mb-2">
                      {image.category}
                    </span>
                    <h3 className="font-display font-bold text-foreground">{image.alt}</h3>
                    <p className="text-muted-foreground text-sm">AI Photo Booth Experience</p>
                  </div>
                </div>
              </>
            );

            // On portfolio page: open lightbox; elsewhere: link to portfolio
            if (isPortfolioPage) {
              return (
                <div
                  key={image.id}
                  className="group relative overflow-hidden rounded-2xl cursor-pointer card-hover block"
                  onClick={(e) => handleImageClick(index, e)}
                >
                  {content}
                </div>
              );
            }

            return (
              <Link
                to="/portfolio"
                key={image.id}
                className="group relative overflow-hidden rounded-2xl cursor-pointer card-hover block"
              >
                {content}
              </Link>
            );
          })}
        </GalleryGrid>

        {/* View More Button - only show on homepage */}
        {!isPortfolioPage && (
          <div className="text-center mt-12">
            <Link to="/portfolio" className="btn-outline inline-flex">
              View Full Portfolio
            </Link>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Close Button */}
          <button 
            className="absolute top-4 right-4 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors z-10"
            onClick={handleClose}
            aria-label="Close lightbox"
          >
            <X className="text-foreground" size={24} />
          </button>

          {/* Navigation Buttons */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            aria-label="Previous image"
          >
            <ChevronLeft className="text-foreground" size={28} />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            aria-label="Next image"
          >
            <ChevronRight className="text-foreground" size={28} />
          </button>

          {/* Image Counter */}
          <div className="absolute top-4 left-4 glass rounded-full px-4 py-2 text-sm font-medium text-foreground">
            {selectedIndex !== null ? selectedIndex + 1 : 0} / {portfolioImages.length}
          </div>

          {/* Image Container */}
          <div 
            className="max-w-4xl w-full max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt}
              loading="eager"
              className="w-full h-auto max-h-[70vh] object-contain bg-card"
            />
            <div className="p-6 bg-card">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium mb-2">
                {selectedImage.category}
              </span>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">{selectedImage.alt}</h3>
              <p className="text-muted-foreground">AI-powered transformation created with our advanced neural network technology.</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;