import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is an AI Photo Booth and how does it work?",
    answer: "An AI Photo Booth uses advanced generative AI and neural networks to transform photos in real-time. Unlike traditional photo booths, our technology can change styles, add custom backgrounds, and create branded content instantly. Perfect for corporate events, trade shows, and experiential marketing activations in NYC."
  },
  {
    question: "How fast is the AI photo processing time?",
    answer: "Our proprietary AI engine generates high-fidelity transformations in under 3 seconds. The complete guest experience—from photo capture to receiving the digital asset via QR code, SMS, or email—takes less than 60 seconds, keeping your event flow smooth."
  },
  {
    question: "Do you offer lead capture and CRM integration?",
    answer: "Yes! Our AI photo booth includes built-in lead capture with 95% average email opt-in rates. We integrate with all major CRMs including Salesforce, HubSpot, and Marketo. You'll receive real-time analytics dashboards tracking engagement, social shares, and ROI metrics."
  },
  {
    question: "Can you create custom AI styles for our brand?",
    answer: "Absolutely! We develop custom AI models tailored to your brand identity, campaign themes, and visual guidelines. From custom overlays and branded frames to fully unique AI transformation styles, each activation is designed to maximize your brand impact."
  },
  {
    question: "What NYC venues do you service?",
    answer: "We regularly operate at premier NYC venues including Javits Center, Pier 60, The Metropolitan Pavilion, Cipriani, Spring Studios, and top hotels across Manhattan. We also provide services throughout the tri-state area and nationwide for major events."
  },
  {
    question: "What's included in your AI photo booth rental?",
    answer: "Our packages include professional-grade camera equipment, 4K touchscreen displays, high-speed GPU processing, on-site technical staff, custom branding, instant social sharing, print station options, lead capture integration, and real-time analytics. We handle everything—just provide power and space."
  },
  {
    question: "How do guests share their AI photos?",
    answer: "Guests instantly access their content via QR code scan, SMS, or email. All photos are optimized for Instagram, TikTok, and LinkedIn sharing. We also offer optional on-site printing with custom branded templates and physical trading cards."
  },
  {
    question: "What events are best for AI Photo Booths?",
    answer: "Our AI experiences excel at corporate events, product launches, trade shows, conferences, fashion shows, sports activations, retail experiences, and experiential marketing campaigns. Any brand looking to drive engagement, capture leads, and create viral shareable content."
  },
  {
    question: "Do you provide analytics and ROI reporting?",
    answer: "Yes! You receive comprehensive analytics including total impressions, email capture rates, social shares, engagement metrics, and attributed conversions. Our clients typically see 77% increased brand recall and 95% email open rates from AI photo booth leads."
  },
  {
    question: "How do I book an AI photo booth for my NYC event?",
    answer: "Contact us for a personalized demo and custom quote. We'll discuss your event goals, venue requirements, and branding needs. Our team handles all logistics, setup, and on-site operation—making it seamless for your team."
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="section-padding bg-card/30">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Header */}
          <div className="lg:sticky lg:top-32">
            <span className="text-sm uppercase tracking-widest text-primary font-semibold mb-4 block">
              AI Photo Booth FAQ
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Everything you need to know about AI photo booth rentals in NYC. Learn about lead capture, custom branding, venue logistics, and ROI analytics.
            </p>
            <a href="#contact" className="btn-primary inline-flex">
              Contact Us
            </a>
          </div>

          {/* Right Column - Accordion */}
          <div>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="glass rounded-xl px-6 border-none"
                >
                  <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:text-primary hover:no-underline py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
