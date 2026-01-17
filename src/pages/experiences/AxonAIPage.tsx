import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RelatedServices from '@/components/RelatedServices';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Link } from 'react-router-dom';
import { Bot, Check, ArrowRight, Navigation, Eye, Cpu } from 'lucide-react';
import usePageMeta from '@/hooks/usePageMeta';
import axonRobotImage from '@/assets/axon-ai-robot.png';

const features = [
  {
    icon: Navigation,
    title: 'LIDAR-Powered Navigation',
    description: 'Advanced spatial mapping allows AXON to navigate complex event environments autonomously and safely.'
  },
  {
    icon: Eye,
    title: 'Intelligent Guest Detection',
    description: 'Computer vision identifies willing participants and captures candid moments throughout your event.'
  },
  {
    icon: Bot,
    title: 'Autonomous Operation',
    description: 'Set it and forget it—AXON roams your event capturing hundreds of portraits with zero staff intervention.'
  },
  {
    icon: Cpu,
    title: 'Real-Time AI Processing',
    description: 'On-board neural processors deliver instant portrait enhancement and branded overlays.'
  },
];

const benefits = [
  'Captures 10x more guests than stationary photo booths',
  'Creates authentic, candid moments',
  'Perfect for large venues and multi-room events',
  'Continuous 8-hour operation on single charge',
  'Crowd-favorite conversation starter',
  'Real-time analytics dashboard',
];

const AxonAIPage = () => {
  usePageMeta({
    title: 'AXON AI Robot Photo Booth NYC | Autonomous Event Photography | PixelAI Pro',
    description: 'AXON AI autonomous robot photo booth navigates your NYC event with LIDAR technology, capturing studio-quality portraits automatically. Perfect for trade shows, conferences, and large venues. Book your robot photographer today.',
    ogImage: '/og-axon-ai.jpg',
    canonicalPath: '/experiences/axon-ai',
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="section-padding relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[150px]" />
          
          <div className="container-custom relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <Breadcrumbs items={[
                  { label: 'AI Photo Booth Services', href: '/services' },
                  { label: 'AXON AI Robot' }
                ]} />
                <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6">
                  <Bot size={40} className="text-white" />
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  AXON <span className="gradient-text">AI</span>
                </h1>
                <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
                  Autonomous Robot Photography
                </p>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  The world's most advanced autonomous photo booth. AXON navigates your event using LIDAR 
                  technology, identifying and engaging guests to capture studio-quality portraits on the move. 
                  A true crowd-pleaser that maximizes engagement across your entire venue.
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
              
              <figure className="relative aspect-square rounded-3xl overflow-hidden glass glow">
                <img 
                  src={axonRobotImage}
                  alt="AXON AI autonomous robot photo booth with LIDAR navigation for NYC events - futuristic AI-powered event photography robot"
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
                <figcaption className="sr-only">AXON AI robot photo booth featuring advanced LIDAR navigation technology for autonomous event photography</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="section-padding bg-card/50">
          <div className="container-custom">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              How <span className="gradient-text">AXON AI</span> Works
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Autonomous event photography powered by advanced robotics and computer vision.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Deploy', desc: 'AXON maps your venue and begins autonomous navigation.' },
                { step: '02', title: 'Engage', desc: 'AI detects guests and initiates friendly photo interactions.' },
                { step: '03', title: 'Capture', desc: 'Studio-quality portraits delivered instantly via text or email.' },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="text-6xl font-display font-bold gradient-text mb-4">{item.step}</div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              Key <span className="gradient-text">Features</span>
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Cutting-edge robotics meets AI photography for unparalleled event experiences.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature) => (
                <div key={feature.title} className="glass rounded-xl p-8 flex items-start gap-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                    <feature.icon size={28} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="section-padding bg-card/50">
          <div className="container-custom">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Why Brands Choose <span className="gradient-text">AXON AI</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit) => (
                <div key={benefit} className="glass rounded-xl p-6 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Check size={16} className="text-primary" />
                  </div>
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Perfect For <span className="gradient-text">Large Events</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {['Trade Shows & Expos', 'Corporate Conferences', 'Music Festivals', 'Sports Stadiums'].map((useCase) => (
                <div key={useCase} className="glass rounded-xl p-6 text-center">
                  <h3 className="font-bold text-foreground">{useCase}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="glass rounded-3xl p-12 text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Unleash the Future of Event Photography
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                AXON AI captures more guests, creates more engagement, and delivers unforgettable 
                robotic interactions. See it in action at your next event.
              </p>
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                Schedule Your Demo <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>

        {/* Related Services */}
        <RelatedServices currentSlug="axon-ai" />
      </div>
      <Footer />
    </div>
  );
};

export default AxonAIPage;