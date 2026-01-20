import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RelatedServices from '@/components/RelatedServices';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQSection from '@/components/FAQSection';
import ImageWithSkeleton from '@/components/ImageWithSkeleton';
import { GalleryGrid } from '@/components/GalleryGrid';
import { Link } from 'react-router-dom';
import { Sparkles, Check, ArrowRight, Zap, Target, Image, Clock, Calendar } from 'lucide-react';
import usePageMeta from '@/hooks/usePageMeta';

const personaPopFaqs = [
  {
    question: "What character styles are available with Persona Pop?",
    answer: "Persona Pop offers unlimited styles including superheroes, anime, vintage fashion icons, futuristic cyborgs, classic paintings, fantasy characters, and fully custom brand personas designed specifically for your event theme."
  },
  {
    question: "How long does each AI transformation take?",
    answer: "Each transformation takes just seconds. Guests strike a pose, our AI seamlessly blends their likeness into the selected character, and they receive high-resolution digital images and optional premium prints within moments."
  }
];
import personaPopDemo from '@/assets/persona-pop-demo.jpg';

// Gallery images with SEO-optimized filenames
import corporateEventCaricature from '@/assets/persona-pop-corporate-event-caricature.jpg';
import conferenceCaricature from '@/assets/persona-pop-conference-caricature-portrait.jpg';
import pixarStyleCharacter from '@/assets/persona-pop-3d-pixar-style-character.jpg';
import celebrationCaricature from '@/assets/persona-pop-celebration-caricature-art.jpg';
import partyCaricature from '@/assets/persona-pop-party-caricature-portrait.jpg';
import teamEventCaricature from '@/assets/persona-pop-team-event-caricature.jpg';
import superheroFemale from '@/assets/persona-pop-superhero-transformation-female.jpg';
import superheroMale from '@/assets/persona-pop-superhero-transformation-male.jpg';
import animeStyle from '@/assets/persona-pop-anime-style-transformation.jpg';
import vintage1920s from '@/assets/persona-pop-vintage-1920s-portrait.jpg';
import fantasyElf from '@/assets/persona-pop-fantasy-elf-warrior.jpg';
import cyberpunkNeon from '@/assets/persona-pop-cyberpunk-neon-portrait.jpg';
import renaissancePainting from '@/assets/persona-pop-renaissance-painting-portrait.jpg';
import popArtComic from '@/assets/persona-pop-pop-art-comic-style.jpg';
import golferTransformation from '@/assets/persona-pop-golfer-transformation.jpg';
import piratesTransformation from '@/assets/persona-pop-pirates-transformation.jpg';

const galleryImages = [{
  src: golferTransformation,
  alt: 'AI photo booth golfer transformation with professional sports attire on golf course'
}, {
  src: piratesTransformation,
  alt: 'AI photo booth pirate adventure transformation with two guests on ship deck'
}, {
  src: vintage1920s,
  alt: 'Vintage 1920s art deco style AI portrait transformation with gatsby era glamour'
}, {
  src: fantasyElf,
  alt: 'Fantasy elf warrior AI transformation with magical glowing eyes and Celtic armor'
}, {
  src: conferenceCaricature,
  alt: 'AI-generated caricature portrait for Knowledge conference NYC event attendee'
}, {
  src: cyberpunkNeon,
  alt: 'Cyberpunk neon AI photo booth portrait with futuristic visor and city lights'
}, {
  src: pixarStyleCharacter,
  alt: 'Persona Pop 3D Pixar-style AI character transformation with colorful city background'
}, {
  src: renaissancePainting,
  alt: 'Renaissance oil painting style AI portrait with baroque dress and dramatic lighting'
}, {
  src: celebrationCaricature,
  alt: 'AI photo booth celebration caricature art with confetti and elegant style'
}, {
  src: popArtComic,
  alt: 'Pop art comic book style AI transformation with bold halftone dots and speech bubble'
}, {
  src: partyCaricature,
  alt: 'Party caricature portrait from AI photo booth with music notes and stars'
}, {
  src: teamEventCaricature,
  alt: 'Team event AI caricature transformation for corporate conference with matching shirts'
}, {
  src: superheroFemale,
  alt: 'Persona Pop superhero transformation for female guest at NYC AI photo booth'
}, {
  src: superheroMale,
  alt: 'AI photo booth superhero character transformation with cape and dynamic pose'
}];
const features = [{
  icon: Sparkles,
  title: 'Unforgettable Guest Engagement',
  description: 'Provide an interactive, personalized experience that guests will talk about long after the event ends. It\'s an instant conversation starter and a powerful way to make them feel special.'
}, {
  icon: Target,
  title: 'Tailored Branding Opportunities',
  description: 'From corporate mascots to themed event characters, we custom-design personas that perfectly align with your brand, message, or event theme. Reinforce your identity in a fun, shareable way.'
}, {
  icon: Image,
  title: 'High-Quality Digital & Print Assets',
  description: 'Guests receive stunning, high-resolution digital images perfect for immediate social media sharing. Premium print-outs available as unique keepsakes they\'ll treasure.'
}, {
  icon: Clock,
  title: 'Effortless & Instant',
  description: 'Our intuitive PixelAI Pro booth makes the process seamless. Guests strike a pose, and within seconds, their personalized persona is ready to view, share, or print.'
}, {
  icon: Calendar,
  title: 'Versatile for Any Occasion',
  description: 'Ideal for corporate galas, product launches, brand activations, holiday parties, weddings, and more. Persona Pop adapts to create magic at any event.'
}];
const transformationExamples = ['Action Heroes', 'Vintage Fashion Icons', 'Futuristic Cyborgs', 'Classic Paintings', 'Fantasy Characters', 'Pop Art Legends'];
const benefits = ['Complete identity swap while maintaining guest likeness', 'Instant social media-ready content generation', 'Custom-designed themes for brand alignment', 'High-resolution digital and premium print delivery', 'Proven engagement at venues like TAO Downtown', 'Seamless integration with any event format'];
const useCases = [{
  title: 'Corporate Galas',
  desc: 'Transform executives into themed characters that match your company culture.'
}, {
  title: 'Product Launches',
  desc: 'Create buzz with personas that embody your new product\'s identity.'
}, {
  title: 'Brand Activations',
  desc: 'Turn attendees into brand ambassadors with custom character designs.'
}, {
  title: 'Holiday Parties',
  desc: 'Festive transformations that capture the spirit of the season.'
}, {
  title: 'Weddings & Celebrations',
  desc: 'Unique keepsakes guests will cherish forever.'
}, {
  title: 'Trade Shows & Conferences',
  desc: 'Stand out from the crowd with memorable booth experiences.'
}];
const PersonaPopPage = () => {
  usePageMeta({
    title: 'AI Character Transformation Photo Booth NYC | Persona Pop | PixelAI Pro',
    description: 'Transform guests into superheroes, anime characters, vintage icons & custom brand personas with AI. High-res prints & instant social sharing. Perfect for galas, product launches & NYC brand activations. Book demo!',
    ogImage: '/og-persona-pop.jpg',
    canonicalPath: '/experiences/persona-pop',
    keywords: 'AI character transformation, persona photo booth NYC, superhero transformation booth, anime AI photo booth, custom character activation, corporate event entertainment, interactive guest engagement',
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Persona Pop AI Character Transformation",
        "serviceType": "AI Character Transformation Photo Booth",
        "description": "Transform event guests into captivating characters—superheroes, vintage icons, anime styles, or custom brand personas—using advanced AI that maintains their unique likeness.",
        "provider": {
          "@type": "LocalBusiness",
          "@id": "https://pixelaipro.lovable.app/#business"
        },
        "areaServed": {
          "@type": "City",
          "name": "New York City"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What character styles are available with Persona Pop?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Persona Pop offers unlimited styles including superheroes, anime, vintage fashion icons, futuristic cyborgs, classic paintings, fantasy characters, and fully custom brand personas designed specifically for your event theme."
            }
          },
          {
            "@type": "Question",
            "name": "How long does each AI transformation take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Each transformation takes just seconds. Guests strike a pose, our AI seamlessly blends their likeness into the selected character, and they receive high-resolution digital images and optional premium prints within moments."
            }
          }
        ]
      }
    ]
  });
  return <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="section-padding relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px]" />
          
          <div className="container-custom relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <Breadcrumbs items={[{
                label: 'AI Photo Booth Services',
                href: '/services'
              }, {
                label: 'Persona Pop'
              }]} />
                <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6">
                  <Sparkles size={40} className="text-white" />
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  Persona <span className="gradient-text">Pop</span>
                </h1>
                <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
                  Step Into A New Reality
                </p>
                <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                  Elevate your event experience from memorable to <strong className="text-foreground">legendary</strong> with 
                  Persona Pop – the cutting-edge AI feature that transforms your guests into captivating characters in real-time.
                </p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Imagine your attendees not just taking a photo, but becoming an <em>action hero</em>, a <em>vintage fashion icon</em>, 
                  a <em>futuristic cyborg</em>, or even the star of a <em>classic painting</em>. The possibilities are limitless.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                    Book This Experience <ArrowRight size={20} />
                  </Link>
                  <Link to="/portfolio" className="btn-secondary inline-flex items-center gap-2">
                    View Examples
                  </Link>
                </div>
              </div>
              
              <figure className="relative aspect-[3/4] rounded-3xl overflow-hidden glass glow group">
                <img src={personaPopDemo} alt="Persona Pop AI character transformation - guest transformed into stylized portrait" className="w-full h-full object-cover" loading="eager" decoding="async" fetchPriority="high" />
                {/* Text overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6">
                  <p className="text-white/90 text-sm font-medium uppercase tracking-wider mb-1">AI Character Transformation</p>
                  <h3 className="text-white font-display text-2xl md:text-3xl font-bold leading-tight">
                    Become Anyone.<br />Stay Yourself.
                  </h3>
                </div>
                <figcaption className="sr-only">AI-powered character transformation maintaining guest likeness</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              Transformation <span className="gradient-text">Gallery</span>
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              See the magic of Persona Pop in action—from caricatures to superheroes, every transformation is unique.
            </p>
            <GalleryGrid columns={4} gap="md">
              {galleryImages.map((image, index) => (
                <figure key={index} className="relative rounded-xl overflow-hidden glass group cursor-pointer">
                  <ImageWithSkeleton
                    src={image.src}
                    alt={image.alt}
                    aspectRatio="square"
                    priority={index < 4}
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <figcaption className="sr-only">{image.alt}</figcaption>
                </figure>
              ))}
            </GalleryGrid>
          </div>
        </section>

        {/* What is Persona Pop */}
        <section className="section-padding bg-card/50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                What is <span className="gradient-text">Persona Pop</span>?
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Persona Pop uses <strong className="text-foreground">advanced artificial intelligence</strong> to seamlessly 
                blend your guests' faces into a vast array of high-quality, pre-designed characters and themes. 
                It's more than just a filter; it's a <strong className="text-foreground">complete identity swap</strong> that 
                maintains their unique likeness while immersing them in an entirely new world.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {transformationExamples.map(example => <span key={example} className="glass px-4 py-2 rounded-full text-sm font-medium text-foreground">
                    {example}
                  </span>)}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Seamless transformation in seconds—no complex setup required.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[{
              step: '01',
              title: 'Strike a Pose',
              desc: 'Guests step up to our intuitive PixelAI Pro booth and capture their portrait.'
            }, {
              step: '02',
              title: 'AI Transforms',
              desc: 'Advanced AI seamlessly blends their likeness into the selected character theme.'
            }, {
              step: '03',
              title: 'Share & Print',
              desc: 'Within seconds, receive high-resolution digital images and premium prints.'
            }].map(item => <div key={item.step} className="text-center">
                  <div className="text-6xl font-display font-bold gradient-text mb-4">{item.step}</div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>)}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section-padding bg-card/50">
          <div className="container-custom">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              Why Choose <span className="gradient-text">Persona Pop</span>?
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Transform ordinary moments into extraordinary memories your guests will share.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map(feature => <div key={feature.title} className="glass rounded-xl p-8">
                  <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                    <feature.icon size={28} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>)}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  The <span className="gradient-text">PixelAI Pro</span> Difference
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Trusted by premier venues and brands, our AI technology delivers 
                  results that exceed expectations every time.
                </p>
                <div className="space-y-4">
                  {benefits.map(benefit => <div key={benefit} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={14} className="text-primary" />
                      </div>
                      <span className="text-foreground">{benefit}</span>
                    </div>)}
                </div>
              </div>
              <div className="glass rounded-3xl p-8 lg:p-12">
                <Zap size={48} className="text-primary mb-6" />
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                  Instant Engagement
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Just like the cherished photos from our TAO Downtown activations, 
                  Persona Pop creates moments guests treasure and share. The experience 
                  becomes a talking point that extends your event's reach far beyond the venue.
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    Seconds to transform
                  </span>
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    Instant sharing
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="section-padding bg-card/50">
          <div className="container-custom">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              Perfect For <span className="gradient-text">Any Occasion</span>
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Persona Pop adapts to create magic at any event—from intimate gatherings to large-scale activations.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {useCases.map(useCase => <div key={useCase.title} className="glass rounded-xl p-6">
                  <h3 className="font-bold text-foreground mb-2">{useCase.title}</h3>
                  <p className="text-sm text-muted-foreground">{useCase.desc}</p>
                </div>)}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection 
          title="Frequently Asked Questions"
          subtitle="Learn more about Persona Pop character transformations."
          faqs={personaPopFaqs}
          gradientWord="Questions"
        />

        {/* CTA Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="glass rounded-3xl p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 rounded-full blur-[100px]" />
              <div className="relative z-10">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Ready to Transform Your Event?
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Give your guests an experience they'll never forget. From action heroes to 
                  vintage icons, Persona Pop turns every attendee into a work of art.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                    Schedule Your Demo <ArrowRight size={20} />
                  </Link>
                  <Link to="/portfolio" className="btn-secondary inline-flex items-center gap-2">
                    See More Examples
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Services */}
        <RelatedServices currentSlug="persona-pop" />
      </div>
      <Footer />
    </div>;
};
export default PersonaPopPage;