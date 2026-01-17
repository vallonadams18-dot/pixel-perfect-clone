import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Home, ArrowRight, Sparkles, Camera, Users, Mail } from "lucide-react";
import usePageMeta from "@/hooks/usePageMeta";

const NotFound = () => {
  const location = useLocation();

  usePageMeta({
    title: "Page Not Found | PixelAI Pro",
    description: "The page you're looking for doesn't exist. Explore our AI photo booth experiences for events.",
    canonicalPath: "/404",
  });

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const quickLinks = [
    {
      icon: Home,
      label: "Home",
      href: "/",
      description: "Back to main page"
    },
    {
      icon: Sparkles,
      label: "Experiences",
      href: "/services",
      description: "Explore AI photo booths"
    },
    {
      icon: Camera,
      label: "Portfolio",
      href: "/portfolio",
      description: "See our work"
    },
    {
      icon: Mail,
      label: "Contact",
      href: "/contact",
      description: "Get in touch"
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px]" />
        
        <div className="container-custom relative z-10 py-20">
          <div className="max-w-2xl mx-auto text-center">
            {/* 404 Display */}
            <div className="mb-8">
              <span className="font-display text-[120px] md:text-[180px] font-bold gradient-text leading-none">
                404
              </span>
            </div>
            
            {/* Message */}
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Page Not Found
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved. Let's get you back on track.
            </p>
            
            {/* Primary CTA */}
            <Link 
              to="/" 
              className="btn-primary inline-flex items-center gap-2 mb-12"
            >
              <Home size={18} />
              Return Home
            </Link>
            
            {/* Quick Links */}
            <div className="border-t border-border/30 pt-10">
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-6">
                Quick Links
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="glass rounded-xl p-4 hover:border-primary/50 transition-all group text-left"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mb-3 group-hover:bg-primary/30 transition-colors">
                      <link.icon size={20} className="text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm mb-1">
                      {link.label}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {link.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Tried Path Display */}
            <p className="mt-10 text-xs text-muted-foreground/60">
              Attempted path: <code className="bg-muted/50 px-2 py-1 rounded">{location.pathname}</code>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;