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
// Location Pages
import NYCPage from "./pages/locations/NYCPage";
import LosAngelesPage from "./pages/locations/LosAngelesPage";
import NewJerseyPage from "./pages/locations/NewJerseyPage";
import AtlantaPage from "./pages/locations/AtlantaPage";
import LasVegasPage from "./pages/locations/LasVegasPage";
import CaliforniaPage from "./pages/locations/CaliforniaPage";
import SanFranciscoPage from "./pages/locations/SanFranciscoPage";
import PennsylvaniaPage from "./pages/locations/PennsylvaniaPage";
import OrlandoPage from "./pages/locations/OrlandoPage";
import ChicagoPage from "./pages/locations/ChicagoPage";
import MiamiPage from "./pages/locations/MiamiPage";
// Blog Pages
import BlogPage from "./pages/BlogPage";
import CustomAIFiltersPage from "./pages/blog/CustomAIFiltersPage";
import InteractiveGuestEngagementPage from "./pages/blog/InteractiveGuestEngagementPage";
import AIPhotoBoothVsTraditionalPage from "./pages/blog/AIPhotoBoothVsTraditionalPage";
import TradeShowBoothIdeasPage from "./pages/blog/TradeShowBoothIdeasPage";
import CorporateHeadshotTrendsPage from "./pages/blog/CorporateHeadshotTrendsPage";

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
          {/* Location Pages */}
          <Route path="/locations/nyc" element={<NYCPage />} />
          <Route path="/ai-photo-booth-rental-nyc" element={<NYCPage />} />
          <Route path="/locations/los-angeles" element={<LosAngelesPage />} />
          <Route path="/ai-photo-booth-rental-los-angeles" element={<LosAngelesPage />} />
          <Route path="/locations/new-jersey" element={<NewJerseyPage />} />
          <Route path="/ai-photo-booth-rental-new-jersey" element={<NewJerseyPage />} />
          <Route path="/locations/atlanta" element={<AtlantaPage />} />
          <Route path="/ai-photo-booth-rental-atlanta" element={<AtlantaPage />} />
          <Route path="/locations/las-vegas" element={<LasVegasPage />} />
          <Route path="/ai-photo-booth-rental-las-vegas" element={<LasVegasPage />} />
          <Route path="/locations/california" element={<CaliforniaPage />} />
          <Route path="/ai-photo-booth-rental-california" element={<CaliforniaPage />} />
          <Route path="/locations/san-francisco" element={<SanFranciscoPage />} />
          <Route path="/ai-photo-booth-rental-san-francisco" element={<SanFranciscoPage />} />
          <Route path="/locations/pennsylvania" element={<PennsylvaniaPage />} />
          <Route path="/ai-photo-booth-rental-pennsylvania" element={<PennsylvaniaPage />} />
          <Route path="/locations/orlando" element={<OrlandoPage />} />
          <Route path="/ai-photo-booth-rental-orlando" element={<OrlandoPage />} />
          <Route path="/locations/chicago" element={<ChicagoPage />} />
          <Route path="/ai-photo-booth-rental-chicago" element={<ChicagoPage />} />
          <Route path="/locations/miami" element={<MiamiPage />} />
          <Route path="/ai-photo-booth-rental-miami" element={<MiamiPage />} />
          {/* Blog Pages */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/custom-ai-filters-for-events" element={<CustomAIFiltersPage />} />
          <Route path="/blog/interactive-guest-engagement-ideas" element={<InteractiveGuestEngagementPage />} />
          <Route path="/blog/ai-photo-booth-vs-traditional-photo-booth" element={<AIPhotoBoothVsTraditionalPage />} />
          <Route path="/blog/trade-show-booth-ideas-that-drive-leads" element={<TradeShowBoothIdeasPage />} />
          <Route path="/blog/corporate-headshot-trends" element={<CorporateHeadshotTrendsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
