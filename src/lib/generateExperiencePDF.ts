import jsPDF from 'jspdf';
import { ExperiencePackage } from './experiencePackages';

// Brand colors
const COLORS = {
  primary: '#a855f7',
  accent: '#ec4899',
  background: '#090a0d',
  text: '#1a1a1a',
  muted: '#6b7280',
  white: '#ffffff',
};

export const generateExperiencePDF = (experience: ExperiencePackage): void => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let yPos = 0;

  // Helper function to add new page if needed
  const checkPageBreak = (requiredSpace: number) => {
    if (yPos + requiredSpace > pageHeight - 30) {
      doc.addPage();
      yPos = 25;
      addPageHeader();
    }
  };

  // Add page header with gradient simulation
  const addPageHeader = () => {
    // Purple accent bar
    doc.setFillColor(168, 85, 247);
    doc.rect(0, 0, pageWidth, 5, 'F');
    // Pink accent bar
    doc.setFillColor(236, 72, 153);
    doc.rect(0, 5, pageWidth, 2, 'F');
  };

  // ========== PAGE 1: COVER ==========
  addPageHeader();

  // Company logo area
  yPos = 35;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(168, 85, 247);
  doc.text('PixelAI Pro', margin, yPos);

  // Tagline
  yPos += 8;
  doc.setFontSize(10);
  doc.setTextColor(107, 114, 128);
  doc.setFont('helvetica', 'normal');
  doc.text('AI Photo Booth Experiences', margin, yPos);

  // Divider line
  yPos += 15;
  doc.setDrawColor(168, 85, 247);
  doc.setLineWidth(0.5);
  doc.line(margin, yPos, pageWidth - margin, yPos);

  // Experience Name
  yPos += 25;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(36);
  doc.setTextColor(26, 26, 26);
  const nameLines = doc.splitTextToSize(experience.name, contentWidth);
  doc.text(nameLines, margin, yPos);
  yPos += nameLines.length * 14;

  // Tagline
  doc.setFontSize(16);
  doc.setTextColor(168, 85, 247);
  doc.setFont('helvetica', 'italic');
  doc.text(experience.tagline, margin, yPos);

  // Description
  yPos += 20;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(75, 85, 99);
  const descLines = doc.splitTextToSize(experience.description, contentWidth);
  doc.text(descLines, margin, yPos);
  yPos += descLines.length * 6 + 10;

  // Decorative accent box
  yPos += 15;
  doc.setFillColor(250, 245, 255);
  doc.roundedRect(margin, yPos, contentWidth, 30, 5, 5, 'F');
  doc.setDrawColor(168, 85, 247);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, yPos, contentWidth, 30, 5, 5, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(168, 85, 247);
  doc.text('EXPERIENCE PACKAGE', margin + 10, yPos + 12);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(107, 114, 128);
  doc.text('Everything you need to know about this AI photo experience', margin + 10, yPos + 22);

  // ========== PAGE 2: HOW IT WORKS ==========
  doc.addPage();
  addPageHeader();
  yPos = 25;

  // Section Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(26, 26, 26);
  doc.text('How It Works', margin, yPos);

  yPos += 20;

  // Steps
  experience.howItWorks.forEach((step, index) => {
    checkPageBreak(45);

    // Step number circle
    doc.setFillColor(168, 85, 247);
    doc.circle(margin + 8, yPos + 6, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.text(step.step, margin + 5, yPos + 9);

    // Step title
    doc.setTextColor(26, 26, 26);
    doc.setFontSize(14);
    doc.text(step.title, margin + 22, yPos + 5);

    // Step description
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(107, 114, 128);
    const stepDescLines = doc.splitTextToSize(step.description, contentWidth - 25);
    doc.text(stepDescLines, margin + 22, yPos + 13);

    yPos += 30 + (stepDescLines.length > 1 ? (stepDescLines.length - 1) * 5 : 0);
  });

  // ========== PAGE 3: KEY FEATURES ==========
  doc.addPage();
  addPageHeader();
  yPos = 25;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(26, 26, 26);
  doc.text('Key Features', margin, yPos);

  yPos += 20;

  experience.features.forEach((feature, index) => {
    checkPageBreak(50);

    // Feature box
    doc.setFillColor(249, 250, 251);
    const featureTitleLines = doc.splitTextToSize(feature.title, contentWidth - 10);
    const featureDescLines = doc.splitTextToSize(feature.description, contentWidth - 10);
    const boxHeight = 25 + (featureTitleLines.length - 1) * 6 + featureDescLines.length * 5;

    doc.roundedRect(margin, yPos, contentWidth, boxHeight, 3, 3, 'F');

    // Purple accent bar on left
    doc.setFillColor(168, 85, 247);
    doc.rect(margin, yPos, 3, boxHeight, 'F');

    // Feature title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(26, 26, 26);
    doc.text(featureTitleLines, margin + 10, yPos + 10);

    // Feature description
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(107, 114, 128);
    doc.text(featureDescLines, margin + 10, yPos + 18 + (featureTitleLines.length - 1) * 5);

    yPos += boxHeight + 8;
  });

  // ========== PAGE 4: BENEFITS ==========
  doc.addPage();
  addPageHeader();
  yPos = 25;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(26, 26, 26);
  doc.text('Key Benefits', margin, yPos);

  yPos += 20;

  experience.benefits.forEach((benefit, index) => {
    checkPageBreak(15);

    // Checkmark circle
    doc.setFillColor(236, 72, 153);
    doc.circle(margin + 4, yPos + 2, 4, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text('✓', margin + 2, yPos + 4);

    // Benefit text
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(55, 65, 81);
    const benefitLines = doc.splitTextToSize(benefit, contentWidth - 20);
    doc.text(benefitLines, margin + 15, yPos + 4);

    yPos += 12 + (benefitLines.length > 1 ? (benefitLines.length - 1) * 5 : 0);
  });

  // Use Cases Section
  yPos += 15;
  checkPageBreak(60);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(26, 26, 26);
  doc.text('Perfect For', margin, yPos);

  yPos += 15;

  // Use case badges
  let xPos = margin;
  experience.useCases.forEach((useCase, index) => {
    const textWidth = doc.getTextWidth(useCase) + 16;

    if (xPos + textWidth > pageWidth - margin) {
      xPos = margin;
      yPos += 15;
    }

    doc.setFillColor(250, 245, 255);
    doc.roundedRect(xPos, yPos - 6, textWidth, 12, 3, 3, 'F');
    doc.setDrawColor(168, 85, 247);
    doc.setLineWidth(0.2);
    doc.roundedRect(xPos, yPos - 6, textWidth, 12, 3, 3, 'S');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(168, 85, 247);
    doc.text(useCase, xPos + 8, yPos + 1);

    xPos += textWidth + 8;
  });

  // ========== FINAL PAGE: CONTACT CTA ==========
  doc.addPage();
  addPageHeader();
  yPos = 35;

  // CTA Box
  doc.setFillColor(168, 85, 247);
  doc.roundedRect(margin, yPos, contentWidth, 80, 5, 5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text('Ready to Get Started?', margin + 15, yPos + 25);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  const ctaText = doc.splitTextToSize(
    `Let's bring ${experience.name} to your next event. Schedule a personalized demo to see this experience in action.`,
    contentWidth - 30
  );
  doc.text(ctaText, margin + 15, yPos + 40);

  // Contact Info
  yPos += 100;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(26, 26, 26);
  doc.text('Contact Us', margin, yPos);

  yPos += 12;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(107, 114, 128);
  doc.text('Website: pixelaipro.lovable.app', margin, yPos);
  yPos += 8;
  doc.text('Book a Demo: pixelaipro.lovable.app/contact', margin, yPos);

  yPos += 25;

  // Footer
  doc.setFillColor(249, 250, 251);
  doc.rect(0, pageHeight - 20, pageWidth, 20, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(156, 163, 175);
  doc.text('© 2025 PixelAI Pro. All rights reserved.', margin, pageHeight - 8);
  doc.text('AI-Powered Photo Booth Experiences', pageWidth - margin - 55, pageHeight - 8);

  // Save the PDF
  doc.save(`PixelAI-Pro-${experience.name.replace(/\s+/g, '-')}-Package.pdf`);
};
