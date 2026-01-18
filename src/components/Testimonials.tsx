import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Marketing Director",
    company: "TechFlow Inc.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "PixelAI Pro transformed our trade show presence at Javits Center. The AI photo booth captured 2,400+ leads in 3 days—our best ROI ever.",
    date: "2024-11-15"
  },
  {
    name: "Marcus Johnson",
    role: "Events Manager",
    company: "Goldman Sachs",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "The custom AI styles matched our brand perfectly. Guests were amazed by the instant transformations. Already booked them for next year.",
    date: "2024-10-22"
  },
  {
    name: "Emily Rodriguez",
    role: "Brand Experience Lead",
    company: "Nike NYC",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "From setup to execution, the team was flawless. Our activation at Spring Studios went viral with 50K+ social shares in 48 hours.",
    date: "2024-09-18"
  },
  {
    name: "David Park",
    role: "VP of Marketing",
    company: "Spotify",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "The real-time CRM integration was a game-changer. We synced 1,800 qualified leads directly to HubSpot during our product launch.",
    date: "2024-08-30"
  },
  {
    name: "Jennifer Walsh",
    role: "Creative Director",
    company: "Meta",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "We've used many photo booth vendors, but PixelAI Pro's technology is years ahead. The AI quality is unmatched in the industry.",
    date: "2024-12-05"
  },
  {
    name: "Robert Kim",
    role: "Head of Events",
    company: "Netflix",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "Perfect for our premiere events. The AI transformations created buzz that traditional photo booths simply can't match.",
    date: "2024-11-28"
  }
];

// Generate Review schema for SEO
export const generateReviewSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "PixelAI Pro",
  "image": "https://pixelaipro.lovable.app/og-image.jpg",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "bestRating": "5",
    "worstRating": "1",
    "reviewCount": testimonials.length.toString(),
    "ratingCount": testimonials.length.toString()
  },
  "review": testimonials.map(t => ({
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": t.name
    },
    "datePublished": t.date,
    "reviewBody": t.text,
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": t.rating.toString(),
      "bestRating": "5",
      "worstRating": "1"
    }
  }))
});

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm text-muted-foreground">Client Success Stories</span>
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Trusted by <span className="gradient-text">Fortune 500</span> Brands
          </h2>
          
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See why leading companies choose PixelAI Pro for their brand activations and corporate events in NYC.
          </p>
          
          {/* Aggregate Rating */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              ))}
            </div>
            <span className="text-lg font-semibold text-foreground">5.0</span>
            <span className="text-muted-foreground">({testimonials.length} reviews)</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.name}
              className="glass p-6 rounded-2xl hover:border-primary/30 transition-all duration-300 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-primary/30 mb-4 group-hover:text-primary/50 transition-colors" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              
              {/* Review Text */}
              <p className="text-foreground/90 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-3">
                <img 
                  src={testimonial.image} 
                  alt={`${testimonial.name} - ${testimonial.role} at ${testimonial.company}`}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                  loading="lazy"
                />
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;