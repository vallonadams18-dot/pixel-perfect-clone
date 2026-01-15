import { useState } from 'react';
import { X } from 'lucide-react';

const portfolioImages = [
  { id: 1, alt: 'AI Football Player Female', aspect: 'portrait' },
  { id: 2, alt: 'AI Footballer Portrait', aspect: 'portrait' },
  { id: 3, alt: 'Neo AI Photobooth Football', aspect: 'portrait' },
  { id: 4, alt: 'Group Photo AI', aspect: 'landscape' },
  { id: 5, alt: 'AI Portrait Transformation', aspect: 'portrait' },
  { id: 6, alt: 'Corporate Event AI', aspect: 'landscape' },
];

const Portfolio = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {portfolioImages.map((image, index) => (
            <div
              key={image.id}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer card-hover ${
                image.aspect === 'landscape' ? 'md:col-span-2' : ''
              }`}
              onClick={() => setSelectedImage(image.id)}
            >
              {/* Placeholder Image */}
              <div 
                className={`w-full bg-gradient-to-br from-primary/20 via-card to-accent/20 ${
                  image.aspect === 'landscape' ? 'aspect-video' : 'aspect-[3/4]'
                }`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-primary flex items-center justify-center mb-3">
                      <span className="text-2xl">🎨</span>
                    </div>
                    <span className="text-muted-foreground text-sm">{image.alt}</span>
                  </div>
                </div>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  <h3 className="font-display font-bold text-foreground mb-1">{image.alt}</h3>
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
          className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="text-foreground" />
          </button>
          <div className="max-w-4xl w-full aspect-video bg-card rounded-2xl flex items-center justify-center">
            <span className="text-muted-foreground">Image {selectedImage}</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
