 import { useState } from 'react';
 import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
 import ExperienceDemo from '@/components/ExperienceDemo';
 import usePageMeta from '@/hooks/usePageMeta';
 import { Sparkles } from 'lucide-react';
 
 // Import service images for visual tabs
 import pixelwearImage from '@/assets/pixelwear-cowboys.jpg';
 import identityImage from '@/assets/sketch-guest-after-1.jpg';
 import costarImage from '@/assets/co-star-demo.jpg';
 import axonImage from '@/assets/axon-ai-robot.png';
 import personaPopImage from '@/assets/persona-pop-demo.jpg';
 import videoBoothImage from '@/assets/ai-photo-booth-neo-cyberpunk-style.jpg';
 import headshotsImage from '@/assets/headshot-1.jpg';
 import tradingCardsImage from '@/assets/ai-trading-cards-hero-collection.jpg';
 
 const services = [
   {
     id: 'headshots',
     title: 'AI Headshots',
     description: 'Professional corporate headshots with studio-quality lighting and polish.',
     image: headshotsImage,
   },
   {
     id: 'persona-pop',
     title: 'Persona Pop',
     description: 'Transform into any character style - from Pixar to Superhero.',
     image: personaPopImage,
   },
   {
     id: 'pixelwear',
     title: 'PixelWear',
     description: 'Virtual try-on for branded apparel and luxury fashion.',
     image: pixelwearImage,
   },
   {
     id: 'trading-cards',
     title: 'AI Trading Cards',
     description: 'Custom sports trading cards with professional stats and design.',
     image: tradingCardsImage,
   },
   {
     id: 'co-star',
     title: 'Co-Star',
     description: 'Appear alongside celebrities and athletes in stunning portraits.',
     image: costarImage,
   },
   {
     id: 'identity',
     title: 'AI Sketch',
     description: 'Hand-drawn artistic sketches from pencil to watercolor.',
     image: identityImage,
   },
   {
     id: 'video-booths',
     title: 'Video Booths',
     description: 'Dynamic video transformations with stunning visual effects.',
     image: videoBoothImage,
   },
   {
     id: 'axon-ai',
     title: 'AXON AI',
     description: 'Autonomous robot photography with AI-powered portraits.',
     image: axonImage,
   },
 ];
 
 const OffsiteDemoPage = () => {
   const [activeTab, setActiveTab] = useState('headshots');
 
   usePageMeta({
     title: 'Try Our AI Photo Booth Demos | PixelAI Pro',
     description: 'Experience all PixelAI Pro AI photo booth services. Try AI Headshots, Persona Pop, PixelWear, Trading Cards and more - no signup required.',
     ogImage: '/og-image.jpg',
     canonicalPath: '/demo',
     keywords: 'AI photo booth demo, try AI headshots, virtual try-on demo, trading cards demo, photo booth experience',
   });
 
   const activeService = services.find(s => s.id === activeTab) || services[0];
 
   return (
     <div className="min-h-screen bg-background">
       {/* Minimal Header */}
       <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
         <div className="container-custom py-4 flex items-center justify-between">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
               <Sparkles className="w-5 h-5 text-primary-foreground" />
             </div>
             <div>
               <h1 className="font-display text-lg font-bold text-foreground">PixelAI Pro</h1>
               <p className="text-xs text-muted-foreground">Interactive Demo</p>
             </div>
           </div>
           <a
             href="https://pixelaipro.lovable.app/contact"
             target="_blank"
             rel="noopener noreferrer"
             className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
           >
             Book a Demo
           </a>
         </div>
       </header>
 
       {/* Main Content */}
       <main className="pt-24 pb-12 px-4">
         <div className="container-custom max-w-6xl">
           {/* Hero Section */}
           <div className="text-center mb-8">
             <span className="text-sm uppercase tracking-widest text-primary font-semibold mb-2 block">
               Try It Now
             </span>
             <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
               Experience Our AI <span className="gradient-text">Photo Booth</span>
             </h2>
             <p className="text-muted-foreground max-w-xl mx-auto">
               Select a service below and upload your photo to see the magic in action.
             </p>
           </div>
 
           {/* Service Tabs */}
           <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
             <TabsList className="w-full flex flex-wrap justify-center gap-2 bg-transparent h-auto mb-8">
               {services.map((service) => (
                 <TabsTrigger
                   key={service.id}
                   value={service.id}
                   className="relative group px-3 py-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-xl border border-transparent data-[state=active]:border-primary/30 transition-all"
                 >
                   <div className="flex items-center gap-2">
                     <img
                       src={service.image}
                       alt={service.title}
                       className="w-8 h-8 rounded-lg object-cover"
                     />
                     <span className="text-sm font-medium hidden sm:inline">{service.title}</span>
                   </div>
                 </TabsTrigger>
               ))}
             </TabsList>
 
             {services.map((service) => (
               <TabsContent key={service.id} value={service.id} className="mt-0">
                 <ExperienceDemo
                   experience={service.id}
                   experienceTitle={service.title}
                   experienceDescription={service.description}
                 />
               </TabsContent>
             ))}
           </Tabs>
         </div>
       </main>
 
       {/* Minimal Footer */}
       <footer className="py-6 border-t border-border/50">
         <div className="container-custom text-center">
           <p className="text-sm text-muted-foreground">
             © {new Date().getFullYear()} PixelAI Pro. All rights reserved.
           </p>
           <p className="text-xs text-muted-foreground mt-1">
             <a href="https://pixelaipro.lovable.app" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
               Visit our website
             </a>
             {' • '}
             <a href="https://pixelaipro.lovable.app/contact" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
               Contact us
             </a>
           </p>
         </div>
       </footer>
     </div>
   );
 };
 
 export default OffsiteDemoPage;