import { Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const footerLinks = {
  services: [
    { name: 'AI Photo Booth Rental', href: '/services' },
    { name: 'AI Trading Cards', href: '/experiences/ai-trading-cards' },
    { name: 'AI Headshots', href: '/experiences/headshots' },
    { name: 'AI Video Booths', href: '/experiences/ai-video-booths' },
    { name: 'PixelWear Virtual Try-On', href: '/experiences/pixelwear' },
    { name: 'Persona Pop Cards', href: '/experiences/persona-pop' },
  ],
  company: [
    { name: 'About PixelAI Pro', href: '/about' },
    { name: 'AI Photo Booth Portfolio', href: '/portfolio' },
    { name: 'Contact Us', href: '/contact' },
  ],
  locations: [
    { name: 'New York City', href: '/locations/nyc' },
    { name: 'Los Angeles', href: '/locations/los-angeles' },
    { name: 'Las Vegas', href: '/locations/las-vegas' },
    { name: 'Chicago', href: '/locations/chicago' },
    { name: 'Miami', href: '/locations/miami' },
    { name: 'San Francisco', href: '/locations/san-francisco' },
    { name: 'Atlanta', href: '/locations/atlanta' },
    { name: 'Orlando', href: '/locations/orlando' },
    { name: 'New Jersey', href: '/locations/new-jersey' },
    { name: 'Pennsylvania', href: '/locations/pennsylvania' },
    { name: 'California', href: '/locations/california' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

const Footer = () => {
  return (
    <footer className="border-t border-border/30 bg-card/30">
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="font-display font-bold text-xl text-white">P</span>
              </div>
              <span className="font-display font-bold text-xl text-foreground">
                Pixel<span className="gradient-text">AI</span> Pro
              </span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-sm">
              NYC's #1 <Link to="/services" className="text-primary hover:underline">AI photo booth rental</Link> company. 
              We specialize in <Link to="/experiences/ai-trading-cards" className="text-primary hover:underline">AI trading cards</Link>, 
              <Link to="/experiences/headshots" className="text-primary hover:underline"> corporate headshots</Link>, and 
              <Link to="/experiences/ai-video-booths" className="text-primary hover:underline"> AI video booths</Link> for 
              experiential marketing activations.
            </p>
            <p className="text-muted-foreground mb-6 text-sm">
              Serving Manhattan, Brooklyn, and the tri-state area. <Link to="/contact" className="text-primary hover:underline">Book your NYC event today</Link>.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={18} className="text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>

          {/* AI Photo Booth Services */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">AI Photo Booth Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Locations */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Service Areas</h4>
            <ul className="space-y-2">
              {footerLinks.locations.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SEO-rich Bottom Bar */}
        <div className="border-t border-border/30 mt-12 pt-8">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6 text-sm">
            <Link to="/experiences/ai-trading-cards" className="text-muted-foreground hover:text-primary">AI Trading Cards NYC</Link>
            <Link to="/experiences/headshots" className="text-muted-foreground hover:text-primary">AI Headshots NYC</Link>
            <Link to="/experiences/ai-video-booths" className="text-muted-foreground hover:text-primary">AI Video Booth Rental</Link>
            <Link to="/services" className="text-muted-foreground hover:text-primary">Photo Booth Rental NYC</Link>
            <Link to="/portfolio" className="text-muted-foreground hover:text-primary">Event Photo Booth Examples</Link>
            <Link to="/contact" className="text-muted-foreground hover:text-primary">Book AI Photo Booth</Link>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} PixelAI Pro - AI Photo Booth Rental NYC. All rights reserved.
            </p>
            <p className="text-muted-foreground text-sm">
              Crafted with <span className="text-accent">♥</span> in New York City
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
