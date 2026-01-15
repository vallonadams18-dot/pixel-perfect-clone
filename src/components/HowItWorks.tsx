import { Scan, Cpu, MonitorPlay, Share2 } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Scan,
    title: 'The High-Fidelity Capture',
    description: 'Step into the frame. Our professional-grade sensors capture your likeness and body-mesh data in seconds, creating the high-resolution digital foundation required for your AI transformation.',
  },
  {
    number: '02',
    icon: Cpu,
    title: 'Neural Transformation',
    description: 'Watch as our proprietary generative engine takes over. Utilizing advanced neural networks, we instantly render your digital identity into a bespoke work of art, applying complex style transfers in real-time.',
  },
  {
    number: '03',
    icon: MonitorPlay,
    title: 'The Digital Reveal',
    description: 'Review your personalized asset on our 4K interactive display. Whether it\'s a high-fashion editorial look or a stylized avatar, witness a flawless output that perfectly aligns with the event\'s visual identity.',
  },
  {
    number: '04',
    icon: Share2,
    title: 'Instant Social Amplification',
    description: 'Seamlessly transfer your branded content to your mobile device via QR code or SMS. Your digital masterpiece is formatted for immediate upload to Instagram, TikTok, or LinkedIn.',
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section-padding bg-card/30">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-sm uppercase tracking-widest text-primary font-semibold mb-4 block">
            The Process
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From capture to share in under 60 seconds. Experience the future of brand activations.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative group"
              >
                {/* Card */}
                <div className="glass rounded-2xl p-8 h-full card-hover text-center lg:text-left">
                  {/* Number Badge */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-primary mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10">
                    <step.icon size={28} className="text-white" />
                  </div>

                  {/* Step Number */}
                  <div className="font-display text-6xl font-bold text-primary/10 absolute top-4 right-4">
                    {step.number}
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl font-bold text-foreground mb-4">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-20">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-white text-xs">→</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
