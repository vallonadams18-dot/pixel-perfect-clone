import { Link } from "react-router-dom";
import { Instagram, Mail, MapPin, Sparkles, Camera, Users, Video, Palette, CreditCard, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import usePageMeta from "@/hooks/usePageMeta";

// Import experience images
import pixelwearDemo from "@/assets/pixelwear-demo.jpg";
import personaPopDemo from "@/assets/persona-pop-demo.jpg";
import coStarDemo from "@/assets/co-star-demo.jpg";
import headshotAfter from "@/assets/headshot-after.jpg";
import tradingCardsHero from "@/assets/ai-trading-cards-hero-collection.jpg";
import axonRobot from "@/assets/axon-ai-robot.png";

// Import logo
import logo from "@/assets/pixelai-pro-logo.png";

const LinkInBioPage = () => {
  usePageMeta({
    title: "PixelAI Pro | Links",
    description: "AI Photo Booth Experiences for Premium Events. Book your next corporate activation, brand experience, or special event.",
    canonicalPath: "/links",
    ogImage: "/og-image.jpg",
  });

  const experiences = [
    {
      title: "PixelWear",
      description: "Virtual try-on experience",
      image: pixelwearDemo,
      link: "/experiences/pixelwear",
      icon: Palette,
    },
    {
      title: "Persona Pop",
      description: "AI style transformations",
      image: personaPopDemo,
      link: "/experiences/persona-pop",
      icon: Sparkles,
    },
    {
      title: "Co-Star",
      description: "Celebrity photo experiences",
      image: coStarDemo,
      link: "/experiences/co-star",
      icon: Users,
    },
    {
      title: "AI Headshots",
      description: "Professional portraits",
      image: headshotAfter,
      link: "/experiences/headshots",
      icon: Camera,
    },
    {
      title: "AI Trading Cards",
      description: "Custom collectible cards",
      image: tradingCardsHero,
      link: "/experiences/ai-trading-cards",
      icon: CreditCard,
    },
    {
      title: "Axon AI",
      description: "Interactive AI robot",
      image: axonRobot,
      link: "/experiences/axon-ai",
      icon: Video,
    },
  ];

  const quickLinks = [
    { label: "View Portfolio", link: "/portfolio", icon: Camera },
    { label: "Book Your Event", link: "/contact", icon: Mail },
    { label: "See Case Studies", link: "/case-studies", icon: Sparkles },
    { label: "Service Areas", link: "/locations/nyc", icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      {/* Header */}
      <div className="pt-12 pb-6 px-4 text-center">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-primary/20 shadow-lg shadow-primary/10">
          <img
            src={logo}
            alt="PixelAI Pro"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-1">PixelAI Pro</h1>
        <p className="text-muted-foreground text-sm mb-3">
          AI Photo Booth Experiences
        </p>
        <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
          <MapPin className="w-3 h-3" />
          <span>NYC & Nationwide</span>
        </div>
        
        {/* Social Icons */}
        <div className="flex justify-center gap-4 mt-4">
          <a
            href="https://www.instagram.com/pixelaipronyc"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <Link
            to="/contact"
            className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Mail className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Quick Links */}
      <div className="px-4 pb-6 max-w-md mx-auto space-y-3">
        {quickLinks.map((item) => (
          <Link key={item.label} to={item.link}>
            <Button
              variant="outline"
              className="w-full h-14 justify-between text-base font-medium border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all group"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-primary" />
                <span>{item.label}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Button>
          </Link>
        ))}
      </div>

      {/* Featured Experiences */}
      <div className="px-4 pb-8 max-w-md mx-auto">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 text-center">
          Featured Experiences
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {experiences.map((exp) => (
            <Link
              key={exp.title}
              to={exp.link}
              className="group relative overflow-hidden rounded-xl aspect-square"
            >
              <img
                src={exp.image}
                alt={exp.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <exp.icon className="w-3.5 h-3.5 text-primary" />
                  <span className="text-white text-sm font-semibold">{exp.title}</span>
                </div>
                <p className="text-white/70 text-xs">{exp.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 pb-8 max-w-md mx-auto">
        <Link to="/contact">
          <Button className="w-full h-14 text-base font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25">
            <Sparkles className="w-5 h-5 mr-2" />
            Book Your Event
          </Button>
        </Link>
      </div>

      {/* Footer */}
      <div className="px-4 pb-12 text-center">
        <p className="text-xs text-muted-foreground">
          Trusted by Netflix, Google, WNBA & more
        </p>
        <Link to="/" className="text-xs text-primary hover:underline mt-2 inline-block">
          Visit Full Website →
        </Link>
      </div>
    </div>
  );
};

export default LinkInBioPage;
