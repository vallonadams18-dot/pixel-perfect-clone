import { useState } from 'react';
import { X } from 'lucide-react';

// Import portfolio images
import animeImage from '@/assets/portfolio-anime.jpg';
import superheroImage from '@/assets/portfolio-superhero.jpg';
import fantasyImage from '@/assets/portfolio-fantasy.jpg';
import retroImage from '@/assets/portfolio-retro.jpg';
import corporateImage from '@/assets/portfolio-corporate.jpg';
import cyberpunkImage from '@/assets/portfolio-cyberpunk.jpg';
import vintageImage from '@/assets/portfolio-vintage.jpg';

const portfolioImages = [
  { id: 1, src: animeImage, alt: 'Anime Style Transformation', category: 'Anime', aspect: 'portrait' },
  { id: 2, src: superheroImage, alt: 'Superhero Portrait', category: 'Superhero', aspect: 'portrait' },
  { id: 3, src: fantasyImage, alt: 'Fantasy Elf Warrior', category: 'Fantasy', aspect: 'portrait' },
  { id: 4, src: retroImage, alt: '80s Synthwave Retro', category: 'Retro', aspect: 'portrait' },
  { id: 5, src: corporateImage, alt: 'Professional Headshot', category: 'Corporate', aspect: 'portrait' },
  { id: 6, src: cyberpunkImage, alt: 'Cyberpunk Street Samurai', category: 'Cyberpunk', aspect: 'portrait' },
  { id: 7, src: vintageImage, alt: 'Vintage Hollywood Glamour', category: 'Vintage', aspect: 'portrait' },
];

const Portfolio = () => {
  const [selectedImage, setSelectedImage] = useState<typeof portfolioImages[0] | null>(null);

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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {portfolioImages.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-2xl cursor-pointer card-hover"
              onClick={() => setSelectedImage(image)}
            >
              {/* Portfolio Image */}
              <div className="aspect-[3/4] overflow-hidden">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

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
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <a href="#contact" className="btn-outline inline-flex">
            View Full Portfolio
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors z-10"
            onClick={() => setSelectedImage(null)}
          >
            <X className="text-foreground" />
          </button>
          <div 
            className="max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt}
              className="w-full h-auto"
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
