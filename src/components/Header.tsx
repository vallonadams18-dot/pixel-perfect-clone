import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, MapPin } from 'lucide-react';
import logoImage from '@/assets/pixelai-pro-logo.png';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Proposals', href: '/proposals' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

const locationLinks = [
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
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLocationsOpen, setIsLocationsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3"
    >
      {/* Header background */}
      <div className={`absolute inset-0 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-lg shadow-black/10' 
          : 'bg-background/80 backdrop-blur-sm'
      }`} />

      <div className="container-custom relative z-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img 
              src={logoImage} 
              alt="PixelAI Pro" 
              className="h-10 w-auto"
              loading="eager"
              decoding="async"
            />
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm transition-colors duration-200 whitespace-nowrap ${
                  location.pathname === link.href
                    ? 'text-primary font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Locations Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsLocationsOpen(true)}
              onMouseLeave={() => setIsLocationsOpen(false)}
            >
              <button
                className={`text-sm transition-colors duration-200 flex items-center gap-1 whitespace-nowrap ${
                  location.pathname.includes('/locations')
                    ? 'text-primary font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Locations
                <ChevronDown size={14} className={`transition-transform ${isLocationsOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isLocationsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                  <div className="bg-card border border-border rounded-xl shadow-xl p-4 min-w-[280px] grid grid-cols-2 gap-2">
                    {locationLinks.map((loc) => (
                      <Link
                        key={loc.name}
                        to={loc.href}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                      >
                        <MapPin size={12} className="text-primary shrink-0" />
                        {loc.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Side - CTA Button & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* CTA Button */}
            <div className="hidden lg:block">
              <Link to="/contact" className="btn-primary text-sm">
                Book a Demo
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-foreground p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass mt-4 mx-4 rounded-2xl p-6 relative z-10 max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`transition-colors ${
                  location.pathname === link.href
                    ? 'text-primary font-semibold'
                    : 'text-foreground hover:text-primary'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Mobile Locations */}
            <div className="border-t border-border/30 pt-4 mt-2">
              <span className="text-sm font-semibold text-muted-foreground mb-3 block">Locations</span>
              <div className="grid grid-cols-2 gap-2">
                {locationLinks.map((loc) => (
                  <Link
                    key={loc.name}
                    to={loc.href}
                    className="flex items-center gap-2 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <MapPin size={12} className="text-primary" />
                    {loc.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <Link
              to="/contact"
              className="btn-primary text-center mt-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book a Demo
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;