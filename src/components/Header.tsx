import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import heroImage from '@/assets/hero-background.jpg';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Contact', href: '/contact' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-hidden ${
        isScrolled ? 'py-4' : 'py-6'
      }`}
    >
      {/* Header background image - always visible */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={heroImage}
          alt=""
          aria-hidden="true"
          className={`w-full h-full object-cover scale-110 transition-all duration-300 ${
            isScrolled ? 'opacity-60 blur-[1px]' : 'opacity-70 blur-[0.5px]'
          }`}
          loading="eager"
        />
        {/* Stronger glass overlay when scrolled for readability */}
        <div className={`absolute inset-0 transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/80 backdrop-blur-md' 
            : 'bg-gradient-to-b from-background/40 via-background/70 to-background/95'
        }`} />
      </div>

      <div className="container-custom relative z-10 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
            <span className="font-display font-bold text-xl text-white">P</span>
          </div>
          <span className="font-display font-bold text-xl text-foreground">
            Pixel<span className="gradient-text">AI</span> Pro
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`text-sm transition-colors duration-200 ${
                location.pathname === link.href
                  ? 'text-primary font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Link to="/contact" className="btn-primary text-sm">
            Book a Demo
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass mt-4 mx-4 rounded-2xl p-6 relative z-10">
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
