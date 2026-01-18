import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  faqs: FAQItem[];
  gradientWord?: string;
}

const FAQSection = ({ 
  title = "Frequently Asked Questions", 
  subtitle,
  faqs,
  gradientWord = "Questions"
}: FAQSectionProps) => {
  // Split title to apply gradient to specific word
  const titleParts = title.split(gradientWord);
  
  return (
    <section className="section-padding bg-card/50" aria-labelledby="faq-heading">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 id="faq-heading" className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {titleParts[0]}
            <span className="gradient-text">{gradientWord}</span>
            {titleParts[1] || ''}
          </h2>
          {subtitle && (
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`faq-${index}`}
                className="glass rounded-xl px-6 border-none"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-6 [&[data-state=open]]:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
