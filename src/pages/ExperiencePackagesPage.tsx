import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, Camera, Sparkles, Shirt, Layers, Users, Video, Bot, Pencil } from 'lucide-react';
import { experiencePackages } from '@/lib/experiencePackages';
import { generateExperiencePDF } from '@/lib/generateExperiencePDF';
import usePageMeta from '@/hooks/usePageMeta';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  'headshots': Camera,
  'persona-pop': Sparkles,
  'pixelwear': Shirt,
  'ai-trading-cards': Layers,
  'co-star': Users,
  'ai-video-booths': Video,
  'axon-ai': Bot,
  'identity': Pencil,
};

const ExperiencePackagesPage = () => {
  usePageMeta({
    title: 'Experience Packages | Download PDF Brochures | PixelAI Pro',
    description: 'Download detailed PDF packages for all PixelAI Pro AI photo booth experiences. Perfect for sharing with clients via email or booking links.',
    canonicalPath: '/experience-packages',
  });

  const handleDownload = (experienceId: string) => {
    const experience = experiencePackages.find(exp => exp.id === experienceId);
    if (experience) {
      generateExperiencePDF(experience);
    }
  };

  const handleDownloadAll = () => {
    experiencePackages.forEach((experience) => {
      setTimeout(() => {
        generateExperiencePDF(experience);
      }, 500 * experiencePackages.indexOf(experience));
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container-custom">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Client Resources
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Experience <span className="gradient-text">Packages</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Download branded PDF packages for each experience. Perfect for sending to clients 
              via email or including in booking confirmations.
            </p>
            <Button 
              size="lg" 
              onClick={handleDownloadAll}
              className="bg-gradient-primary hover:opacity-90"
            >
              <Download className="mr-2" size={20} />
              Download All Packages
            </Button>
          </section>

          {/* Packages Grid */}
          <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {experiencePackages.map((experience) => {
              const IconComponent = iconMap[experience.id] || Sparkles;
              return (
                <Card 
                  key={experience.id} 
                  className="glass border-border/50 hover:border-primary/50 transition-all duration-300 group"
                >
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <IconComponent size={24} className="text-white" />
                    </div>
                    <CardTitle className="text-lg">{experience.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {experience.tagline}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">
                          {experience.features.length} Features
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {experience.benefits.length} Benefits
                        </Badge>
                      </div>
                      <Button 
                        variant="default" 
                        className="w-full"
                        onClick={() => handleDownload(experience.id)}
                      >
                        <Download className="mr-2" size={16} />
                        Download PDF
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </section>

          {/* Usage Tips */}
          <section className="mt-16 glass rounded-2xl p-8">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              How to Use These Packages
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">📧 Email Attachments</h3>
                <p className="text-sm text-muted-foreground">
                  Attach the relevant PDF to your client proposal emails for a professional touch.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">🔗 Booking Links</h3>
                <p className="text-sm text-muted-foreground">
                  Include download links in your booking confirmation pages or forms.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">📱 Sales Presentations</h3>
                <p className="text-sm text-muted-foreground">
                  Use during client meetings to showcase each experience's features and benefits.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExperiencePackagesPage;
