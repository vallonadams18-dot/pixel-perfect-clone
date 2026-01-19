import Header from '@/components/Header';
import Hero from '@/components/Hero';
import BrandTicker from '@/components/BrandTicker';
import About from '@/components/About';
import Services from '@/components/Services';
import HowItWorks from '@/components/HowItWorks';
import Portfolio from '@/components/Portfolio';
import Testimonials, { generateReviewSchema } from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import usePageMeta from '@/hooks/usePageMeta';

const Index = () => {
  usePageMeta({
    title: 'AI Photo Booth Rental NYC | #1 Corporate Event Activation | PixelAI Pro',
    description: 'NYC\'s leading AI photo booth company. Custom brand activations for corporate events, trade shows & experiential marketing. 500+ events, 95% lead capture rate. Trusted by Fortune 500 brands. Book your demo!',
    ogImage: '/og-image.jpg',
    canonicalPath: '/',
    keywords: 'AI photo booth rental NYC, photo booth rental NYC, photo booth rental New York, corporate photo booth NYC, 360 photo booth NYC, trade show photo booth, experiential marketing NYC, brand activation photo booth, Javits Center photo booth, lead capture photo booth, corporate event photo booth, glam photo booth NYC, photo booth rental Brooklyn, photo booth rental Manhattan, corporate brand activation, event activation NYC',
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "PixelAI Pro",
        "description": "NYC's leading AI photo booth company for corporate events, trade shows, and experiential marketing.",
        "url": "https://pixelaipro.lovable.app",
        "image": "https://pixelaipro.lovable.app/og-image.jpg",
        "priceRange": "$$$",
        "telephone": "+1-917-724-6051",
        "email": "pixelaipronyc@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "New York",
          "addressRegion": "NY",
          "addressCountry": "US"
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
          }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "bestRating": "5",
          "worstRating": "1",
          "reviewCount": "247"
        }
      },
      generateReviewSchema(),
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is an AI Photo Booth and how does it work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "An AI Photo Booth uses advanced generative AI and neural networks to transform photos in real-time. Unlike traditional photo booths, our technology can change styles, add custom backgrounds, and create branded content instantly. Perfect for corporate events, trade shows, and experiential marketing activations in NYC."
            }
          },
          {
            "@type": "Question",
            "name": "How fast is the AI photo processing time?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our proprietary AI engine generates high-fidelity transformations in under 3 seconds. The complete guest experience—from photo capture to receiving the digital asset via QR code, SMS, or email—takes less than 60 seconds."
            }
          },
          {
            "@type": "Question",
            "name": "Do you offer lead capture and CRM integration?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Our AI photo booth includes built-in lead capture with 95% average email opt-in rates. We integrate with all major CRMs including Salesforce, HubSpot, and Marketo. You'll receive real-time analytics dashboards tracking engagement, social shares, and ROI metrics."
            }
          },
          {
            "@type": "Question",
            "name": "Can you create custom AI styles for our brand?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely! We develop custom AI models tailored to your brand identity, campaign themes, and visual guidelines. From custom overlays and branded frames to fully unique AI transformation styles, each activation is designed to maximize your brand impact."
            }
          },
          {
            "@type": "Question",
            "name": "What NYC venues do you service?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We regularly operate at premier NYC venues including Javits Center, Pier 60, The Metropolitan Pavilion, Cipriani, Spring Studios, and top hotels across Manhattan. We also provide services throughout the tri-state area and nationwide for major events."
            }
          }
        ]
      }
    ]
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <BrandTicker />
      <About />
      <Services />
      <HowItWorks />
      <Portfolio />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
