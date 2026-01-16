import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import PortfolioPage from "./pages/PortfolioPage";
import ContactPage from "./pages/ContactPage";
import PixelWearPage from "./pages/experiences/PixelWearPage";
import IdentityPage from "./pages/experiences/IdentityPage";
import CoStarPage from "./pages/experiences/CoStarPage";
import AxonAIPage from "./pages/experiences/AxonAIPage";
import PersonaPopPage from "./pages/experiences/PersonaPopPage";
import AIVideoBoothsPage from "./pages/experiences/AIVideoBoothsPage";
import HeadshotsPage from "./pages/experiences/HeadshotsPage";
import AITradingCardsPage from "./pages/experiences/AITradingCardsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/experiences/pixelwear" element={<PixelWearPage />} />
          <Route path="/experiences/identity" element={<IdentityPage />} />
          <Route path="/experiences/co-star" element={<CoStarPage />} />
          <Route path="/experiences/axon-ai" element={<AxonAIPage />} />
          <Route path="/experiences/persona-pop" element={<PersonaPopPage />} />
          <Route path="/experiences/ai-video-booths" element={<AIVideoBoothsPage />} />
          <Route path="/experiences/headshots" element={<HeadshotsPage />} />
          <Route path="/experiences/ai-trading-cards" element={<AITradingCardsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
