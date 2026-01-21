import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Star, Copy, Check } from "lucide-react";
import { useState } from "react";
import jsPDF from "jspdf";

const reviews = [
  {
    name: "Sarah M.",
    event: "Corporate Conference",
    review: "PixelAI Pro transformed our annual conference into an unforgettable experience! The AI photo booth was the highlight of our event - employees couldn't stop talking about their superhero transformations. The team was incredibly professional and the quality exceeded our expectations. Highly recommend for any corporate event!"
  },
  {
    name: "Michael T.",
    event: "Wedding Reception",
    review: "We hired PixelAI Pro for our wedding and it was the best decision we made! Guests loved seeing themselves transformed into vintage Hollywood stars. The prints were stunning and everyone took home amazing keepsakes. Worth every penny!"
  },
  {
    name: "Jennifer L.",
    event: "Product Launch",
    review: "Our brand activation was a massive success thanks to PixelAI Pro. The custom AI filters featuring our product were genius - guests shared their photos everywhere on social media. The engagement we got was incredible. A must for any marketing event!"
  },
  {
    name: "David R.",
    event: "Trade Show",
    review: "We've used traditional photo booths at trade shows for years, but PixelAI Pro is on another level. Our booth had the longest lines on the floor! The AI transformations drew people in and we collected more leads than ever before. Game changer!"
  },
  {
    name: "Amanda K.",
    event: "Birthday Party",
    review: "My daughter's sweet 16 was absolutely magical with PixelAI Pro! The anime-style transformations were a huge hit with the teens. The team was so patient and made sure every guest got perfect photos. Thank you for making her day special!"
  },
  {
    name: "Robert H.",
    event: "Company Holiday Party",
    review: "PixelAI Pro made our holiday party legendary! Employees are still talking about their fantasy character transformations months later. The team handled 200+ guests seamlessly. Professional, fun, and unforgettable. Already booked for next year!"
  },
  {
    name: "Lisa C.",
    event: "Charity Gala",
    review: "The AI photo experience added such an elegant touch to our charity gala. Guests were amazed by the renaissance portrait transformations. It became a talking point that kept people engaged all evening. Truly elevated our event!"
  },
  {
    name: "James W.",
    event: "Sports Event",
    review: "PixelAI Pro's trading card booth was PERFECT for our youth sports awards night. Every kid left with a professional-looking trading card featuring themselves. Parents were blown away! The team was fantastic with the children. 10/10!"
  },
  {
    name: "Nicole P.",
    event: "Bar Mitzvah",
    review: "The AI photo booth was the talk of my son's bar mitzvah! The superhero transformations were incredible - every kid felt like a star. The staff was wonderful with the guests and the photo quality was outstanding. Absolutely recommend!"
  },
  {
    name: "Christopher B.",
    event: "Tech Conference",
    review: "As an event planner, I've seen a lot of photo booths. PixelAI Pro is in a completely different league. The cyberpunk AI transformations matched our tech theme perfectly. Attendees were genuinely impressed. This is the future of event entertainment!"
  },
  {
    name: "Emily S.",
    event: "Bridal Shower",
    review: "We had PixelAI Pro at my bridal shower and it was SO much fun! The vintage glamour transformations made everyone feel like movie stars. The photos became the perfect keepsakes for guests. Exceeded all my expectations!"
  },
  {
    name: "Daniel G.",
    event: "Company Retreat",
    review: "PixelAI Pro helped break the ice at our company retreat brilliantly! Seeing coworkers as fantasy characters had everyone laughing and bonding. The team was flexible with our schedule and super easy to work with. Highly recommend for team building!"
  },
  {
    name: "Rachel F.",
    event: "Fashion Show",
    review: "The AI headshot booth was the perfect addition to our fashion week event. Guests loved getting professional-quality portraits instantly. The technology is impressive and the results are stunning. Will definitely use again!"
  },
  {
    name: "Kevin M.",
    event: "Sales Kickoff",
    review: "Our sales team is still talking about PixelAI Pro! The custom transformations with our company branding were incredible. It created amazing energy and gave everyone shareable content for LinkedIn. A unique way to launch the quarter!"
  },
  {
    name: "Stephanie A.",
    event: "Quinceañera",
    review: "PixelAI Pro made my daughter's quinceañera extra special! The princess and fantasy transformations were perfect for the theme. The team was so professional and kind. Every guest went home with beautiful memories. Thank you!"
  },
  {
    name: "Brian J.",
    event: "Grand Opening",
    review: "We used PixelAI Pro for our store grand opening and it drove incredible foot traffic! The custom branded AI experience got people sharing on social media immediately. Best marketing investment we've made. Already planning our next event with them!"
  },
  {
    name: "Melissa D.",
    event: "Reunion",
    review: "Our family reunion was so much fun with PixelAI Pro! Seeing grandparents and grandkids transformed into superheroes together was priceless. The team handled our large group perfectly. Created memories we'll treasure forever!"
  },
  {
    name: "Anthony L.",
    event: "Award Ceremony",
    review: "PixelAI Pro added a red carpet feel to our industry awards ceremony. The Hollywood-style transformations made every winner feel like a star. The prints were gallery-quality. Elevated our entire event experience!"
  },
  {
    name: "Christina R.",
    event: "Graduation Party",
    review: "My son's graduation party was a hit thanks to PixelAI Pro! The future-themed AI transformations were perfect for celebrating new beginnings. All his friends were amazed. The team made setup and breakdown so easy. Fantastic experience!"
  },
  {
    name: "William N.",
    event: "Networking Event",
    review: "PixelAI Pro was the perfect icebreaker at our networking mixer! The professional headshot option plus fun transformations gave attendees real value. People actually stayed longer to use the booth. Brilliant for engagement. Will book again!"
  }
];

const ReviewTemplatesPage = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (review: string, index: number) => {
    navigator.clipboard.writeText(review);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const maxWidth = pageWidth - margin * 2;
    let yPosition = 20;

    // Title
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("PixelAI Pro - Customer Review Templates", margin, yPosition);
    yPosition += 15;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("20 Ready-to-Use Reviews for Your Customers", margin, yPosition);
    yPosition += 20;

    reviews.forEach((item, index) => {
      // Check if we need a new page
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }

      // Review number and name
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(`${index + 1}. ${item.name} - ${item.event}`, margin, yPosition);
      yPosition += 8;

      // Review text
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const lines = doc.splitTextToSize(item.review, maxWidth);
      doc.text(lines, margin, yPosition);
      yPosition += lines.length * 5 + 15;
    });

    // Footer on last page
    doc.setFontSize(8);
    doc.text("© PixelAI Pro - www.pixelaipro.com", margin, 285);

    doc.save("PixelAI-Pro-Review-Templates.pdf");
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Customer Review Templates</h1>
            <p className="text-muted-foreground mt-2">20 unique reviews ready for your customers to post</p>
          </div>
          <Button onClick={generatePDF} size="lg" className="gap-2">
            <Download className="w-5 h-5" />
            Download PDF
          </Button>
        </div>

        <div className="grid gap-4">
          {reviews.map((item, index) => (
            <Card key={index} className="p-6">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-semibold text-primary">#{index + 1}</span>
                    <span className="font-bold text-foreground">{item.name}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{item.event}</span>
                  </div>
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-foreground/90 leading-relaxed">{item.review}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(item.review, index)}
                  className="shrink-0"
                >
                  {copiedIndex === index ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewTemplatesPage;
