import jsPDF from 'jspdf';

interface ProposalData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  results: { metric: string; label: string }[];
  caseStudy: string;
  idealFor: string[];
}

const colors = {
  corporate: { primary: [59, 130, 246], secondary: [6, 182, 212] },
  sports: { primary: [249, 115, 22], secondary: [239, 68, 68] },
  retail: { primary: [168, 85, 247], secondary: [236, 72, 153] },
  tradeshow: { primary: [34, 197, 94], secondary: [16, 185, 129] }
} as const;

export const generatePitchDeck = (proposal: ProposalData) => {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  
  const colorScheme = colors[proposal.id as keyof typeof colors] || colors.corporate;

  // Helper functions
  const addGradientHeader = (y: number, height: number) => {
    doc.setFillColor(colorScheme.primary[0], colorScheme.primary[1], colorScheme.primary[2]);
    doc.rect(0, y, pageWidth, height, 'F');
  };

  const addFooter = (pageNum: number) => {
    doc.setFontSize(9);
    doc.setTextColor(150);
    doc.text('PixelAI Pro | pixelaipro.lovable.app | hello@pixelaipro.com', margin, pageHeight - 10);
    doc.text(`Page ${pageNum}`, pageWidth - margin - 10, pageHeight - 10);
  };

  // ========== PAGE 1: Cover ==========
  addGradientHeader(0, pageHeight);
  
  // Logo/Company Name
  doc.setFontSize(32);
  doc.setTextColor(255);
  doc.setFont('helvetica', 'bold');
  doc.text('PixelAI Pro', pageWidth / 2, 50, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text('AI-Powered Experiential Marketing', pageWidth / 2, 62, { align: 'center' });
  
  // Proposal Title
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text(proposal.title, pageWidth / 2, 120, { align: 'center' });
  
  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.text(proposal.subtitle, pageWidth / 2, 135, { align: 'center' });
  
  // Pitch Deck Label
  doc.setFontSize(12);
  doc.text('PITCH DECK', pageWidth / 2, 160, { align: 'center' });
  
  // Date
  doc.setFontSize(10);
  const date = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  doc.text(date, pageWidth / 2, pageHeight - 30, { align: 'center' });
  
  // ========== PAGE 2: About PixelAI Pro ==========
  doc.addPage();
  
  addGradientHeader(0, 45);
  doc.setFontSize(24);
  doc.setTextColor(255);
  doc.setFont('helvetica', 'bold');
  doc.text('About PixelAI Pro', margin, 30);
  
  doc.setTextColor(50);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  
  let y = 60;
  const aboutText = [
    'PixelAI Pro is NYC\'s premier AI photo booth company, specializing in cutting-edge',
    'experiential marketing activations that transform events into unforgettable experiences.',
    '',
    'We combine advanced AI technology with creative design to deliver:',
  ];
  
  aboutText.forEach(line => {
    doc.text(line, margin, y);
    y += 7;
  });
  
  y += 5;
  const capabilities = [
    '• AI-powered headshots and portraits',
    '• Virtual try-on experiences',
    '• Custom trading cards and collectibles',
    '• Celebrity co-star photo experiences',
    '• Character transformations',
    '• Branded content creation',
    '• Real-time social media integration',
    '• Comprehensive lead capture systems'
  ];
  
  capabilities.forEach(cap => {
    doc.text(cap, margin + 10, y);
    y += 7;
  });
  
  y += 15;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Our Track Record', margin, y);
  
  y += 12;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  
  const stats = [
    { number: '500+', label: 'Events Completed' },
    { number: '1M+', label: 'Photos Generated' },
    { number: '98%', label: 'Client Satisfaction' },
    { number: '50+', label: 'Fortune 500 Clients' }
  ];
  
  const statWidth = contentWidth / 4;
  stats.forEach((stat, idx) => {
    const x = margin + (idx * statWidth) + (statWidth / 2);
    doc.setFontSize(18);
    doc.setTextColor(colorScheme.primary[0], colorScheme.primary[1], colorScheme.primary[2]);
    doc.setFont('helvetica', 'bold');
    doc.text(stat.number, x, y, { align: 'center' });
    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.setFont('helvetica', 'normal');
    doc.text(stat.label, x, y + 6, { align: 'center' });
  });
  
  addFooter(2);
  
  // ========== PAGE 3: The Opportunity ==========
  doc.addPage();
  
  addGradientHeader(0, 45);
  doc.setFontSize(24);
  doc.setTextColor(255);
  doc.setFont('helvetica', 'bold');
  doc.text('The Opportunity', margin, 30);
  
  doc.setTextColor(50);
  y = 60;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  const opportunityLines = doc.splitTextToSize(proposal.description, contentWidth);
  doc.text(opportunityLines, margin, y);
  y += opportunityLines.length * 7 + 15;
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Ideal For:', margin, y);
  y += 10;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  proposal.idealFor.forEach(item => {
    doc.setFillColor(colorScheme.primary[0], colorScheme.primary[1], colorScheme.primary[2]);
    doc.circle(margin + 3, y - 2, 2, 'F');
    doc.text(item, margin + 10, y);
    y += 8;
  });
  
  y += 15;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Why AI Photo Experiences?', margin, y);
  y += 10;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  const whyAI = [
    '• 73% of consumers prefer experiences over products',
    '• AI-generated content sees 4x higher engagement',
    '• Personalized experiences increase brand recall by 80%',
    '• Social sharing drives organic reach and brand awareness'
  ];
  
  whyAI.forEach(item => {
    doc.text(item, margin, y);
    y += 8;
  });
  
  addFooter(3);
  
  // ========== PAGE 4: Our Solution ==========
  doc.addPage();
  
  addGradientHeader(0, 45);
  doc.setFontSize(24);
  doc.setTextColor(255);
  doc.setFont('helvetica', 'bold');
  doc.text('Our Solution', margin, 30);
  
  doc.setTextColor(50);
  y = 60;
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Key Benefits', margin, y);
  y += 12;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  proposal.benefits.forEach((benefit, idx) => {
    doc.setFillColor(colorScheme.primary[0], colorScheme.primary[1], colorScheme.primary[2]);
    doc.circle(margin + 3, y - 2, 3, 'F');
    doc.setTextColor(255);
    doc.setFontSize(9);
    doc.text(String(idx + 1), margin + 1.5, y - 0.5);
    doc.setTextColor(50);
    doc.setFontSize(11);
    doc.text(benefit, margin + 12, y);
    y += 12;
  });
  
  y += 15;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('What\'s Included', margin, y);
  y += 10;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  const included = [
    '• Full hardware setup and teardown',
    '• Professional on-site technicians',
    '• Custom branded AI filters and templates',
    '• Real-time photo delivery (print + digital)',
    '• Social media integration and analytics',
    '• Lead capture with CRM export',
    '• Post-event performance report'
  ];
  
  included.forEach(item => {
    doc.text(item, margin, y);
    y += 8;
  });
  
  addFooter(4);
  
  // ========== PAGE 5: Proven Results ==========
  doc.addPage();
  
  addGradientHeader(0, 45);
  doc.setFontSize(24);
  doc.setTextColor(255);
  doc.setFont('helvetica', 'bold');
  doc.text('Proven Results', margin, 30);
  
  doc.setTextColor(50);
  y = 70;
  
  // Results boxes
  const boxWidth = (contentWidth - 20) / 3;
  proposal.results.forEach((result, idx) => {
    const x = margin + (idx * (boxWidth + 10));
    
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(x, y - 10, boxWidth, 40, 3, 3, 'F');
    
    doc.setFontSize(24);
    doc.setTextColor(colorScheme.primary[0], colorScheme.primary[1], colorScheme.primary[2]);
    doc.setFont('helvetica', 'bold');
    doc.text(result.metric, x + boxWidth / 2, y + 8, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.setFont('helvetica', 'normal');
    doc.text(result.label, x + boxWidth / 2, y + 20, { align: 'center' });
  });
  
  y += 60;
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(50);
  doc.text('Featured Case Study', margin, y);
  y += 10;
  
  doc.setFillColor(colorScheme.primary[0], colorScheme.primary[1], colorScheme.primary[2]);
  doc.roundedRect(margin, y, contentWidth, 50, 3, 3, 'F');
  
  doc.setTextColor(255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(proposal.caseStudy, margin + 15, y + 20);
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Delivered exceptional results with AI-powered photo experiences', margin + 15, y + 35);
  
  y += 70;
  
  doc.setTextColor(50);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Client Testimonial', margin, y);
  y += 10;
  
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(11);
  doc.setTextColor(80);
  const testimonial = '"PixelAI Pro transformed our event into something truly memorable. The AI photo experiences generated incredible buzz and our attendees couldn\'t stop sharing their photos. Highly recommend!"';
  const testimonialLines = doc.splitTextToSize(testimonial, contentWidth);
  doc.text(testimonialLines, margin, y);
  
  addFooter(5);
  
  // ========== PAGE 6: Investment & Next Steps ==========
  doc.addPage();
  
  addGradientHeader(0, 45);
  doc.setFontSize(24);
  doc.setTextColor(255);
  doc.setFont('helvetica', 'bold');
  doc.text('Investment & Next Steps', margin, 30);
  
  doc.setTextColor(50);
  y = 60;
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Flexible Packages', margin, y);
  y += 12;
  
  const packages = [
    { name: 'Starter', desc: 'Half-day activation, 1 experience, basic branding', price: 'From $3,500' },
    { name: 'Professional', desc: 'Full-day activation, 2 experiences, custom branding', price: 'From $7,500' },
    { name: 'Enterprise', desc: 'Multi-day, unlimited experiences, full customization', price: 'Custom Quote' }
  ];
  
  packages.forEach(pkg => {
    doc.setFillColor(250, 250, 250);
    doc.roundedRect(margin, y, contentWidth, 25, 3, 3, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(colorScheme.primary[0], colorScheme.primary[1], colorScheme.primary[2]);
    doc.text(pkg.name, margin + 10, y + 10);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(pkg.desc, margin + 10, y + 18);
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(50);
    doc.text(pkg.price, pageWidth - margin - 10, y + 14, { align: 'right' });
    
    y += 30;
  });
  
  y += 15;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(50);
  doc.text('Next Steps', margin, y);
  y += 12;
  
  const steps = [
    '1. Schedule a discovery call to discuss your event goals',
    '2. Receive a customized proposal with pricing',
    '3. Review and approve creative concepts',
    '4. We handle setup, execution, and reporting'
  ];
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  steps.forEach(step => {
    doc.text(step, margin, y);
    y += 10;
  });
  
  y += 20;
  
  // Contact Box
  doc.setFillColor(colorScheme.primary[0], colorScheme.primary[1], colorScheme.primary[2]);
  doc.roundedRect(margin, y, contentWidth, 45, 3, 3, 'F');
  
  doc.setTextColor(255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('Ready to Get Started?', margin + 15, y + 15);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text('Email: hello@pixelaipro.com', margin + 15, y + 28);
  doc.text('Website: pixelaipro.lovable.app', margin + 15, y + 38);
  
  addFooter(6);
  
  // Save the PDF
  doc.save(`PixelAI-Pro-${proposal.title.replace(/\s+/g, '-')}-Pitch-Deck.pdf`);
};
