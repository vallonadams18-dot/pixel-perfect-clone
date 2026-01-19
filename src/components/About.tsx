import { Zap, Shield, Sparkles, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import BeforeAfterSlider from './BeforeAfterSlider';
import beforeImage from '@/assets/before-transformation-4k.jpg';
import afterImage from '@/assets/after-transformation.jpg';

const features = [
  {
    icon: Zap,
    title: 'Real-Time Lead Capture',
    description: 'Collect emails & data instantly with 95% opt-in rates and CRM integration.',
  },
  {
    icon: Shield,
    title: 'Enterprise Analytics',
    description: 'Track engagement, social shares, and ROI with real-time dashboards.',
  },
  {
    icon: Sparkles,
    title: 'Custom Brand Integration',
    description: 'White-label AI experiences tailored to your campaign and visual identity.',
  },
  {
    icon: Award,
    title: 'Fortune 500 Trusted',
    description: 'Powering activations for Nike, Meta, Coca-Cola, and top NYC agencies.',
  },
];

const About = () => {
  return (
    <section id="about" className="section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div>
            <span className="text-sm uppercase tracking-widest text-primary font-semibold mb-4 block">
              About Us
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              NYC's Leading <span className="gradient-text">AI Photo Booth</span> Company
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              PixelAI Pro is New York City's #1 <Link to="/services" className="text-primary hover:underline">AI photo booth rental</Link> for corporate events, 
              trade shows, and experiential marketing activations. We power brand experiences 
              at Javits Center, Pier 60, and premium NYC venues with our <Link to="/experiences/ai-trading-cards" className="text-primary hover:underline">AI trading cards</Link>, 
              <Link to="/experiences/headshots" className="text-primary hover:underline"> professional headshots</Link>, and <Link to="/experiences/ai-video-booths" className="text-primary hover:underline">AI video booths</Link>.
            </p>
            <p className="text-muted-foreground mb-8">
              Our proprietary AI delivers measurable ROI: 95% email capture rates, 77% increased 
              brand recall, and instant social amplification. From product launches to fashion 
              weeks, we transform events into viral marketing moments. Explore our <Link to="/portfolio" className="text-primary hover:underline">AI photo booth portfolio</Link> or <Link to="/contact" className="text-primary hover:underline">book a demo</Link>.
            </p>

            {/* Feature Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <feature.icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-foreground mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative overflow-hidden">
            {/* Before/After Slider */}
            <div className="glow mx-4 md:mx-0">
              <BeforeAfterSlider
                beforeImage={beforeImage}
                afterImage={afterImage}
                beforeLabel="Original"
                afterLabel="AI Transformed"
                beforeAlt="Original photo before AI photo booth transformation at NYC corporate event"
                afterAlt="AI-transformed portrait from PixelAI Pro photo booth showing real-time brand activation"
              />
            </div>

            {/* Floating Stats Cards - Hidden on mobile to prevent overflow */}
            <div className="hidden md:block absolute -top-6 -right-6 glass rounded-2xl p-4 animate-float">
              <div className="font-display text-2xl font-bold gradient-text">500+</div>
              <div className="text-muted-foreground text-sm">Events</div>
            </div>

            <div className="hidden md:block absolute -bottom-6 -left-6 glass rounded-2xl p-4 animate-float" style={{ animationDelay: '-2s' }}>
              <div className="font-display text-2xl font-bold gradient-text">2M+</div>
              <div className="text-muted-foreground text-sm">Photos Created</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
