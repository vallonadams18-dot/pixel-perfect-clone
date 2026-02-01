// Experience Package Data for PDF generation

export interface PricingTier {
  name: string;
  price: string;
  duration: string;
  includes: string[];
}

export interface ExperiencePackage {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: Array<{ title: string; description: string }>;
  benefits: string[];
  useCases: string[];
  howItWorks: Array<{ step: string; title: string; description: string }>;
  ogImage: string;
  pricing: {
    startingAt: string;
    tiers: PricingTier[];
    addOns: Array<{ name: string; price: string }>;
    note: string;
  };
}

export const experiencePackages: ExperiencePackage[] = [
  {
    id: 'headshots',
    name: 'AI Headshots',
    tagline: 'Professional Portrait Technology',
    description: 'Studio-quality professional headshots, delivered instantly. Our neural engine captures and enhances portraits to executive-grade standards—perfect for LinkedIn profiles, company directories, and professional branding. No studio, no waiting, no retouching delays.',
    features: [
      { title: 'Neural Portrait Enhancement', description: 'AI optimizes lighting, skin tones, and composition for executive-grade professional headshots.' },
      { title: 'Professional Lighting Simulation', description: 'Software replicates studio lighting setups—even in challenging event environments.' },
      { title: 'LinkedIn-Optimized Output', description: 'Perfect dimensions and professional aesthetics optimized for LinkedIn and corporate profiles.' },
      { title: 'Batch Team Processing', description: 'Efficiently capture entire teams with consistent branding and quality across all headshots.' },
    ],
    benefits: [
      'Professional results without studio setup',
      'Instant delivery via email or text',
      'Multiple background options',
      'Consistent quality for team shots',
      'Perfect for conference networking',
      'Integrates with HR and marketing systems',
    ],
    useCases: ['Industry Conferences', 'Company Retreats', 'Networking Events', 'Trade Shows'],
    howItWorks: [
      { step: '01', title: 'Pose', description: 'Quick guidance for the perfect professional pose and expression.' },
      { step: '02', title: 'Capture', description: 'High-resolution camera with AI-optimized settings for your environment.' },
      { step: '03', title: 'Enhance', description: 'Neural processing delivers polished, LinkedIn-ready headshots instantly.' },
    ],
    ogImage: '/og-headshots.jpg',
    pricing: {
      startingAt: '$1,500',
      tiers: [
        { name: 'Essential', price: '$1,500', duration: '2 hours', includes: ['1 AI photo station', 'Unlimited digital headshots', 'Instant email delivery', '3 background options', 'Basic branding overlay'] },
        { name: 'Professional', price: '$2,500', duration: '4 hours', includes: ['1 AI photo station', 'Unlimited digital headshots', 'Instant email/SMS delivery', '6 background options', 'Full branding package', 'On-site attendant', 'Real-time analytics'] },
        { name: 'Enterprise', price: '$4,000', duration: 'Full day (8 hrs)', includes: ['2 AI photo stations', 'Unlimited digital headshots', 'Priority processing', 'Custom backgrounds', 'Premium branding', 'Dedicated staff', 'Post-event reporting'] },
      ],
      addOns: [
        { name: 'Additional Hour', price: '$400' },
        { name: 'Second Photo Station', price: '$800' },
        { name: 'Premium Print Station (4x6)', price: '$500' },
        { name: 'Custom Background Design', price: '$300' },
      ],
      note: 'Pricing includes setup, breakdown, and travel within NYC metro area. Additional travel fees may apply.',
    },
  },
  {
    id: 'persona-pop',
    name: 'Persona Pop',
    tagline: 'Step Into A New Reality',
    description: 'Elevate your event experience from memorable to legendary with Persona Pop—the cutting-edge AI feature that transforms your guests into captivating characters in real-time. Imagine your attendees becoming action heroes, vintage fashion icons, futuristic cyborgs, or even the star of a classic painting.',
    features: [
      { title: 'Unforgettable Guest Engagement', description: "Provide an interactive, personalized experience that guests will talk about long after the event ends." },
      { title: 'Tailored Branding Opportunities', description: 'From corporate mascots to themed event characters, we custom-design personas that perfectly align with your brand.' },
      { title: 'High-Quality Digital & Print Assets', description: "Guests receive stunning, high-resolution digital images perfect for immediate social media sharing." },
      { title: 'Effortless & Instant', description: 'Guests strike a pose, and within seconds, their personalized persona is ready to view, share, or print.' },
    ],
    benefits: [
      'Complete identity swap while maintaining guest likeness',
      'Instant social media-ready content generation',
      'Custom-designed themes for brand alignment',
      'High-resolution digital and premium print delivery',
      'Proven engagement at venues like TAO Downtown',
      'Seamless integration with any event format',
    ],
    useCases: ['Corporate Galas', 'Product Launches', 'Brand Activations', 'Holiday Parties', 'Weddings', 'Trade Shows'],
    howItWorks: [
      { step: '01', title: 'Strike a Pose', description: 'Guests step up to our intuitive PixelAI Pro booth and capture their portrait.' },
      { step: '02', title: 'AI Transforms', description: 'Advanced AI seamlessly blends their likeness into the selected character theme.' },
      { step: '03', title: 'Share & Print', description: 'Within seconds, receive high-resolution digital images and premium prints.' },
    ],
    ogImage: '/og-persona-pop.jpg',
    pricing: {
      startingAt: '$2,000',
      tiers: [
        { name: 'Standard', price: '$2,000', duration: '2 hours', includes: ['1 AI transformation station', '5 character styles', 'Unlimited digital downloads', 'Instant sharing', 'Basic branding'] },
        { name: 'Premium', price: '$3,500', duration: '4 hours', includes: ['1 AI transformation station', '10+ character styles', 'Unlimited digital + prints', 'Custom style development', 'Full branding package', 'On-site attendant'] },
        { name: 'Ultimate', price: '$5,500', duration: 'Full day (8 hrs)', includes: ['2 AI transformation stations', '20+ character styles', 'Unlimited everything', 'Custom brand personas', 'Premium print station', 'Dedicated staff', 'Post-event content'] },
      ],
      addOns: [
        { name: 'Additional Hour', price: '$450' },
        { name: 'Custom Character Style', price: '$500/style' },
        { name: 'Premium Print Station', price: '$600' },
        { name: 'Green Screen Setup', price: '$400' },
      ],
      note: 'Custom character designs require 2-week lead time. Rush fees apply for shorter timelines.',
    },
  },
  {
    id: 'pixelwear',
    name: 'PixelWear',
    tagline: 'AI Virtual Try-On Experience',
    description: 'The future of retail engagement. PixelWear uses advanced AI to let guests instantly "try on" your branded apparel—creating shareable moments without the logistics of physical inventory. Perfect for product launches, sports events, and retail activations.',
    features: [
      { title: 'Instant Virtual Try-On', description: 'AI-powered technology renders realistic apparel on guests in under 3 seconds with photorealistic accuracy.' },
      { title: 'Unlimited Apparel Options', description: 'Showcase your entire merchandise catalog without physical inventory—jerseys, t-shirts, hoodies, and more.' },
      { title: 'Custom Branding Overlays', description: 'Add logos, event themes, and sponsor branding seamlessly integrated into every virtual try-on image.' },
      { title: 'Social-Ready Content', description: 'Optimized image formats for Instagram, TikTok, and LinkedIn with built-in sharing capabilities.' },
    ],
    benefits: [
      'Zero logistics—no sizes, inventory, or shipping required',
      'Increase merchandise engagement by 400%',
      'Perfect for product launches and retail activations',
      'Works with existing brand assets and photography',
      'Real-time analytics on try-on engagement',
      'Seamless integration with e-commerce platforms',
    ],
    useCases: ['Sports Teams & Leagues', 'Retail & Fashion Brands', 'Corporate Events', 'Music & Entertainment'],
    howItWorks: [
      { step: '01', title: 'Capture', description: 'Guest stands in front of our AI photo booth for a quick portrait capture.' },
      { step: '02', title: 'Select', description: 'Choose from your branded apparel catalog displayed on the interactive screen.' },
      { step: '03', title: 'Share', description: 'AI renders the virtual try-on in seconds—ready to share on social media.' },
    ],
    ogImage: '/og-pixelwear.jpg',
    pricing: {
      startingAt: '$2,500',
      tiers: [
        { name: 'Starter', price: '$2,500', duration: '2 hours', includes: ['1 virtual try-on station', 'Up to 10 apparel items', 'Unlimited digital shares', 'Basic analytics', 'Standard branding'] },
        { name: 'Pro', price: '$4,000', duration: '4 hours', includes: ['1 virtual try-on station', 'Up to 25 apparel items', 'Unlimited shares + prints', 'Full analytics dashboard', 'Custom branding', 'E-commerce integration'] },
        { name: 'Enterprise', price: '$6,500', duration: 'Full day (8 hrs)', includes: ['2 virtual try-on stations', 'Unlimited apparel items', 'Full analytics + reporting', 'Premium branding', 'QR code purchase links', 'Dedicated support'] },
      ],
      addOns: [
        { name: 'Additional Hour', price: '$500' },
        { name: 'Apparel Digitization (per item)', price: '$50' },
        { name: 'E-commerce Integration', price: '$750' },
        { name: 'Print Station', price: '$500' },
      ],
      note: 'Apparel assets must be provided 1 week prior. Digitization services available for additional fee.',
    },
  },
  {
    id: 'ai-trading-cards',
    name: 'AI Trading Cards',
    tagline: 'Premium Collectible Experience',
    description: 'Transform guests into high-fidelity collectible legends. AI Trading Cards combines neural portrait artistry with premium printing to create museum-grade collectibles featuring custom stats, rarity tiers, and optional AR integration for the ultimate collector experience.',
    features: [
      { title: 'Stylized AI Portraits', description: 'Neural networks transform guest photos into stunning illustrated trading card art with unique aesthetics.' },
      { title: 'Rarity Tier System', description: 'Create collectible excitement with common, rare, legendary, and limited edition card tiers.' },
      { title: 'Premium Print Quality', description: 'Museum-grade card stock with holographic effects, foil stamping, and premium finishes.' },
      { title: 'AR Integration', description: 'Unlock augmented reality card features for an immersive digital experience.' },
    ],
    benefits: [
      'Collector-grade quality guests cherish',
      'Multiple art styles and aesthetics',
      'Gamification drives repeat engagement',
      'Perfect for sports and entertainment',
      'Digital twin for online collecting',
      'Custom stat and lore generation',
    ],
    useCases: ['Sports Events', 'Gaming Conventions', 'Entertainment Marketing', 'Brand Activations'],
    howItWorks: [
      { step: '01', title: 'Capture', description: 'Portrait photo and optional personality quiz for stats.' },
      { step: '02', title: 'Stylize', description: 'AI transforms photo into stunning illustrated card art.' },
      { step: '03', title: 'Collect', description: 'Premium printed card with optional AR features.' },
    ],
    ogImage: '/og-ai-trading-cards.jpg',
    pricing: {
      startingAt: '$2,500',
      tiers: [
        { name: 'Standard', price: '$2,500', duration: '2 hours', includes: ['1 trading card station', '2 card designs', 'Standard card printing', 'Digital delivery', 'Basic stats generation'] },
        { name: 'Collector', price: '$4,500', duration: '4 hours', includes: ['1 trading card station', '4 card designs', 'Premium foil printing', 'Rarity tier system', 'Custom stats', 'Protective sleeves'] },
        { name: 'Championship', price: '$7,000', duration: 'Full day (8 hrs)', includes: ['2 trading card stations', 'Unlimited designs', 'Holographic premium print', 'Full rarity system', 'AR integration', 'Display cases', 'Digital NFT option'] },
      ],
      addOns: [
        { name: 'Additional Hour', price: '$500' },
        { name: 'Custom Card Template', price: '$800' },
        { name: 'Holographic Finish Upgrade', price: '$300' },
        { name: 'AR Feature Integration', price: '$1,000' },
        { name: 'Display Case (per 100)', price: '$250' },
      ],
      note: 'Card design templates require 2-week lead time. Rush design available for additional fee.',
    },
  },
  {
    id: 'co-star',
    name: 'Co-Star',
    tagline: 'Digital Celebrity Meet-and-Greet',
    description: 'Give every guest the VIP treatment with AI-powered celebrity photo experiences. Co-Star creates studio-quality portraits placing your attendees next to their favorite celebrities, athletes, or brand ambassadors—without the logistical challenges of live appearances.',
    features: [
      { title: 'Celebrity Digital Doubles', description: 'Access our extensive library of licensed celebrity and athlete likenesses for authentic meet-and-greet experiences.' },
      { title: 'Studio-Quality Compositing', description: 'Professional lighting matching and seamless integration that looks like an actual celebrity photo op.' },
      { title: 'Custom Talent Partnerships', description: 'Work with your brand ambassadors or secure licensed partnerships with our network of celebrity talent.' },
      { title: 'Group Photo Support', description: 'Capture entire groups with celebrities—perfect for corporate events and team-building activations.' },
    ],
    benefits: [
      'No scheduling conflicts or celebrity availability issues',
      'Fraction of the cost of live celebrity appearances',
      '24/7 availability for multi-day events',
      'Perfect for global campaign rollouts',
      'Consistent quality across all locations',
      'Instant sharing with branded frames',
    ],
    useCases: ['Sports Fan Zones', 'Movie Premieres', 'Music Festivals', 'Brand Ambassador Events'],
    howItWorks: [
      { step: '01', title: 'Choose Celebrity', description: 'Select from our talent library or use your brand ambassadors.' },
      { step: '02', title: 'Strike a Pose', description: 'Guest poses in front of our green screen or themed backdrop.' },
      { step: '03', title: 'Instant Magic', description: 'AI creates a seamless celebrity photo ready for sharing.' },
    ],
    ogImage: '/og-co-star.jpg',
    pricing: {
      startingAt: '$3,000',
      tiers: [
        { name: 'Fan Zone', price: '$3,000', duration: '2 hours', includes: ['1 Co-Star station', '2 celebrity options', 'Unlimited digital photos', 'Instant sharing', 'Standard backdrop'] },
        { name: 'VIP Experience', price: '$5,000', duration: '4 hours', includes: ['1 Co-Star station', '5 celebrity options', 'Unlimited photos + prints', 'Custom branded frames', 'Green screen setup', 'On-site support'] },
        { name: 'Red Carpet', price: '$8,000', duration: 'Full day (8 hrs)', includes: ['2 Co-Star stations', '10+ celebrity options', 'Premium everything', 'Custom scene design', 'Red carpet setup', 'Professional lighting', 'Dedicated staff'] },
      ],
      addOns: [
        { name: 'Additional Hour', price: '$600' },
        { name: 'Additional Celebrity License', price: '$500/celebrity' },
        { name: 'Custom Scene Design', price: '$1,000' },
        { name: 'Red Carpet + Step & Repeat', price: '$800' },
        { name: 'Print Station', price: '$500' },
      ],
      note: 'Celebrity licensing fees may vary. Custom brand ambassador integration available upon request.',
    },
  },
  {
    id: 'ai-video-booths',
    name: 'AI Video Booths',
    tagline: 'Neural Video Transformation',
    description: 'Video content that stops the scroll. AI Video Booths use neural networks to transform ordinary footage into stylized masterpieces—from anime and cyberpunk to custom brand aesthetics. Turn every guest into the protagonist of a viral-worthy motion story.',
    features: [
      { title: 'Neural Network Transformation', description: 'Real-time video processing transforms ordinary footage into stunning stylized masterpieces.' },
      { title: 'Multiple Artistic Styles', description: 'Choose from anime, oil painting, cyberpunk, watercolor, and custom brand-specific aesthetics.' },
      { title: 'Motion Story Creation', description: 'AI generates narrative-driven video content where guests become the protagonist of your brand story.' },
      { title: 'Social-Optimized Output', description: 'Videos formatted for TikTok, Instagram Reels, and YouTube Shorts with branded intros/outros.' },
    ],
    benefits: [
      'Creates viral-worthy video content',
      'Multiple style options per session',
      'Processing time under 30 seconds',
      'Supports green screen environments',
      'Custom branded templates',
      'Analytics on video shares and views',
    ],
    useCases: ['Brand Activations', 'Trade Shows', 'Product Launches', 'Experiential Marketing'],
    howItWorks: [
      { step: '01', title: 'Record', description: 'Guest records a short video clip in our immersive booth.' },
      { step: '02', title: 'Style', description: 'Choose from anime, cyberpunk, oil painting, or custom styles.' },
      { step: '03', title: 'Transform', description: 'AI renders stylized video ready for social sharing.' },
    ],
    ogImage: '/og-ai-video-booths.jpg',
    pricing: {
      startingAt: '$3,500',
      tiers: [
        { name: 'Creator', price: '$3,500', duration: '2 hours', includes: ['1 video booth', '3 video styles', 'Up to 15-second clips', 'Instant digital delivery', 'Basic branding'] },
        { name: 'Viral', price: '$5,500', duration: '4 hours', includes: ['1 video booth', '6 video styles', 'Up to 30-second clips', 'Social platform optimization', 'Full branding package', 'Analytics dashboard'] },
        { name: 'Blockbuster', price: '$8,500', duration: 'Full day (8 hrs)', includes: ['2 video booths', 'Unlimited styles', 'Up to 60-second clips', 'Custom intro/outro', 'Green screen', 'Dedicated editor', 'Post-event highlights'] },
      ],
      addOns: [
        { name: 'Additional Hour', price: '$700' },
        { name: 'Custom Style Development', price: '$1,500' },
        { name: 'Extended Video Length', price: '$500' },
        { name: 'Live Social Feed Display', price: '$400' },
        { name: 'Post-Event Highlight Reel', price: '$800' },
      ],
      note: 'Video processing requires high-bandwidth internet. Venue must have adequate power supply.',
    },
  },
  {
    id: 'axon-ai',
    name: 'AXON AI',
    tagline: 'Autonomous Robot Photography',
    description: "The world's most advanced autonomous photo booth. AXON navigates your event using LIDAR technology, identifying and engaging guests to capture studio-quality portraits on the move. A true crowd-pleaser that maximizes engagement across your entire venue.",
    features: [
      { title: 'LIDAR-Powered Navigation', description: 'Advanced spatial mapping allows AXON to navigate complex event environments autonomously and safely.' },
      { title: 'Intelligent Guest Detection', description: 'Computer vision identifies willing participants and captures candid moments throughout your event.' },
      { title: 'Autonomous Operation', description: 'Set it and forget it—AXON roams your event capturing hundreds of portraits with zero staff intervention.' },
      { title: 'Real-Time AI Processing', description: 'On-board neural processors deliver instant portrait enhancement and branded overlays.' },
    ],
    benefits: [
      'Captures 10x more guests than stationary photo booths',
      'Creates authentic, candid moments',
      'Perfect for large venues and multi-room events',
      'Continuous 8-hour operation on single charge',
      'Crowd-favorite conversation starter',
      'Real-time analytics dashboard',
    ],
    useCases: ['Trade Shows & Expos', 'Corporate Conferences', 'Music Festivals', 'Sports Stadiums'],
    howItWorks: [
      { step: '01', title: 'Deploy', description: 'AXON maps your venue and begins autonomous navigation.' },
      { step: '02', title: 'Engage', description: 'AI detects guests and initiates friendly photo interactions.' },
      { step: '03', title: 'Capture', description: 'Studio-quality portraits delivered instantly via text or email.' },
    ],
    ogImage: '/og-axon-ai.jpg',
    pricing: {
      startingAt: '$5,000',
      tiers: [
        { name: 'Explorer', price: '$5,000', duration: '4 hours', includes: ['1 AXON robot', 'Unlimited captures', 'Instant digital delivery', 'Basic branding overlay', 'Real-time dashboard'] },
        { name: 'Voyager', price: '$7,500', duration: '6 hours', includes: ['1 AXON robot', 'Unlimited captures', 'AI portrait enhancement', 'Full branding package', 'Multi-zone navigation', 'Analytics reporting'] },
        { name: 'Enterprise', price: '$12,000', duration: 'Full day (8+ hrs)', includes: ['2 AXON robots', 'Unlimited captures', 'Premium AI processing', 'Custom voice/personality', 'Full venue coverage', 'Dedicated technician', 'Post-event reporting'] },
      ],
      addOns: [
        { name: 'Additional Hour', price: '$800' },
        { name: 'Second AXON Robot', price: '$3,000' },
        { name: 'Custom Voice Personality', price: '$1,000' },
        { name: 'Print Station Integration', price: '$600' },
        { name: 'Extended Battery Pack', price: '$300' },
      ],
      note: 'AXON requires venue walk-through 48 hours prior. Minimum 10x10 ft clear pathways required.',
    },
  },
  {
    id: 'identity',
    name: 'AI Sketch-a-Guest',
    tagline: 'Real-Time AI Portrait Sketches',
    description: 'Combining cutting-edge AI with timeless artistic style, Sketch-a-Guest creates beautiful hand-drawn portraits of your guests in real-time. Choose from pencil, charcoal, ink wash, or watercolor styles—a sophisticated keepsake that elegantly incorporates your brand.',
    features: [
      { title: 'AI-Powered Hand-Drawn Style', description: 'Advanced algorithms create authentic hand-drawn sketches that capture the artistry of traditional portraiture with modern speed.' },
      { title: 'Custom Brand Integration', description: 'Seamlessly incorporate logos, brand colors, and thematic elements directly into the artistic style of each sketch.' },
      { title: 'Real-Time Generation', description: 'Watch as your portrait transforms into a beautiful sketch in seconds—guests see the artistic process unfold before their eyes.' },
      { title: 'Multiple Art Styles', description: 'Choose from pencil, charcoal, ink, watercolor effects, or create a custom style that matches your event aesthetic.' },
    ],
    benefits: [
      'Sophisticated keepsake guests treasure and display',
      'Classic artistic appeal with cutting-edge technology',
      'Fully customizable brand elements in every sketch',
      'Multiple artistic styles to match any event theme',
      'Instant digital delivery plus optional print station',
      'Perfect for upscale corporate and social events',
    ],
    useCases: ['Corporate Galas', 'Weddings & Celebrations', 'Art Gallery Openings', 'Luxury Brand Activations'],
    howItWorks: [
      { step: '01', title: 'Capture', description: 'Guest poses for a quick photo at your branded station.' },
      { step: '02', title: 'Transform', description: 'AI analyzes features and generates an authentic hand-drawn sketch with artistic flourishes.' },
      { step: '03', title: 'Deliver', description: 'Digital delivery plus optional high-quality print as a sophisticated keepsake.' },
    ],
    ogImage: '/og-identity.jpg',
    pricing: {
      startingAt: '$2,000',
      tiers: [
        { name: 'Classic', price: '$2,000', duration: '2 hours', includes: ['1 sketch station', '2 art styles', 'Unlimited digital sketches', 'Instant email delivery', 'Basic branding'] },
        { name: 'Gallery', price: '$3,500', duration: '4 hours', includes: ['1 sketch station', '4 art styles', 'Unlimited digital + prints', 'Premium paper printing', 'Full branding', 'On-site attendant'] },
        { name: 'Masterpiece', price: '$5,500', duration: 'Full day (8 hrs)', includes: ['2 sketch stations', 'All art styles', 'Unlimited everything', 'Museum-quality prints', 'Custom frame options', 'Dedicated artist', 'Live display screen'] },
      ],
      addOns: [
        { name: 'Additional Hour', price: '$450' },
        { name: 'Custom Art Style', price: '$600' },
        { name: 'Premium Frame Package', price: '$15/frame' },
        { name: 'Gallery Display Screen', price: '$400' },
        { name: 'Post-Event Digital Gallery', price: '$300' },
      ],
      note: 'Print quality options include standard, fine art, and museum-grade. Frame packages sold separately.',
    },
  },
];

export const getExperienceById = (id: string): ExperiencePackage | undefined => {
  return experiencePackages.find(exp => exp.id === id);
};
