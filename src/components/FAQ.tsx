import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is an AI Photo Booth?",
    answer: "An AI Photo Booth uses advanced neural networks and generative AI to transform ordinary photos into extraordinary artistic creations. Unlike traditional photo booths, our technology can change your appearance, style, and even place you in entirely different scenarios in real-time."
  },
  {
    question: "How long does each AI transformation take?",
    answer: "Our proprietary neural engine generates high-fidelity transformations in under 3 seconds. The entire experience—from capture to receiving your final digital asset—takes less than 60 seconds."
  },
  {
    question: "Can you customize the AI styles for our brand?",
    answer: "Absolutely! We work closely with your team to develop custom AI models that align perfectly with your brand identity, campaign themes, and visual guidelines. Each activation is uniquely tailored to maximize brand impact."
  },
  {
    question: "What events are best suited for AI Photo Booths?",
    answer: "Our AI experiences are perfect for product launches, corporate events, trade shows, fashion shows, sports events, brand activations, and experiential marketing campaigns. Any event looking to create viral, shareable content is ideal."
  },
  {
    question: "How do guests receive their AI-generated content?",
    answer: "Guests can instantly access their personalized content via QR code scan, SMS, or email. All content is optimized for social media sharing on platforms like Instagram, TikTok, and LinkedIn."
  },
  {
    question: "What technical requirements are needed for setup?",
    answer: "We handle all technical requirements. Our team arrives with professional-grade equipment including high-resolution cameras, 4K displays, powerful GPU processors, and backup systems. We only require a standard power outlet and adequate space."
  },
  {
    question: "Do you operate outside of NYC?",
    answer: "Yes! While we're based in NYC, we provide AI photo booth services nationwide and internationally. Contact us for availability and travel logistics for your event location."
  },
  {
    question: "How can I book a demo or consultation?",
    answer: "Simply fill out our contact form or email us directly. We'll schedule a personalized demo to showcase our AI capabilities and discuss how we can elevate your next event."
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
              FAQ
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Everything you need to know about our AI photo booth experiences. Can't find the answer you're looking for? Reach out to our team.
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
