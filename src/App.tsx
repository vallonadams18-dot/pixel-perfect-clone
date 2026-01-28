import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import AnalyticsProvider from "./components/AnalyticsProvider";
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
import NYCFiveBoroughsPage from "./pages/locations/NYCFiveBoroughsPage";
import BrooklynPage from "./pages/locations/BrooklynPage";
import ManhattanPage from "./pages/locations/ManhattanPage";
import QueensPage from "./pages/locations/QueensPage";
import BronxPage from "./pages/locations/BronxPage";
import StatenIslandPage from "./pages/locations/StatenIslandPage";
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
import AustinPage from "./pages/locations/AustinPage";
import BostonPage from "./pages/locations/BostonPage";
import WashingtonDCPage from "./pages/locations/WashingtonDCPage";
import DallasPage from "./pages/locations/DallasPage";
import SeattlePage from "./pages/locations/SeattlePage";
import DenverPage from "./pages/locations/DenverPage";
import PhoenixPage from "./pages/locations/PhoenixPage";
import HoustonPage from "./pages/locations/HoustonPage";
import SanDiegoPage from "./pages/locations/SanDiegoPage";
import NashvillePage from "./pages/locations/NashvillePage";
// Blog Pages
import BlogPage from "./pages/BlogPage";
import CustomAIFiltersPage from "./pages/blog/CustomAIFiltersPage";
import InteractiveGuestEngagementPage from "./pages/blog/InteractiveGuestEngagementPage";
import AIPhotoBoothVsTraditionalPage from "./pages/blog/AIPhotoBoothVsTraditionalPage";
import TradeShowBoothIdeasPage from "./pages/blog/TradeShowBoothIdeasPage";
import CorporateHeadshotTrendsPage from "./pages/blog/CorporateHeadshotTrendsPage";
import PhotoBoothRentalGuidePage from "./pages/blog/PhotoBoothRentalGuidePage";
import CorporatePhotoBoothRentalPage from "./pages/blog/CorporatePhotoBoothRentalPage";
import PhotoBoothRentalNYCPage from "./pages/blog/PhotoBoothRentalNYCPage";
import AIPhotoBoothCorporateEventsPage from "./pages/blog/AIPhotoBoothCorporateEventsPage";
// Proposals Page
import ProposalsPage from "./pages/ProposalsPage";
import CaseStudiesPage from "./pages/CaseStudiesPage";
// Link in Bio Page
import LinkInBioPage from "./pages/LinkInBioPage";
// Private Content Hub
import ContentHubPage from "./pages/ContentHubPage";
import MediaUploadPage from "./pages/MediaUploadPage";
import PixelAISocialPage from "./pages/PixelAISocialPage";
import InstagramSchedulerPage from "./pages/InstagramSchedulerPage";
import AnalyticsDashboardPage from "./pages/AnalyticsDashboardPage";
import UserManagementPage from "./pages/UserManagementPage";
import LeadsDashboardPage from "./pages/LeadsDashboardPage";
import ReviewTemplatesPage from "./pages/ReviewTemplatesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnalyticsProvider>
          <ScrollToTop />
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
<Route path="/locations/nyc-five-boroughs" element={<NYCFiveBoroughsPage />} />
<Route path="/ai-photo-booth-nyc-five-boroughs" element={<NYCFiveBoroughsPage />} />
<Route path="/locations/brooklyn" element={<BrooklynPage />} />
          <Route path="/ai-photo-booth-brooklyn" element={<BrooklynPage />} />
          <Route path="/locations/manhattan" element={<ManhattanPage />} />
          <Route path="/ai-photo-booth-manhattan" element={<ManhattanPage />} />
          <Route path="/locations/queens" element={<QueensPage />} />
          <Route path="/ai-photo-booth-queens" element={<QueensPage />} />
          <Route path="/locations/bronx" element={<BronxPage />} />
          <Route path="/ai-photo-booth-bronx" element={<BronxPage />} />
          <Route path="/locations/staten-island" element={<StatenIslandPage />} />
          <Route path="/ai-photo-booth-staten-island" element={<StatenIslandPage />} />
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
          <Route path="/locations/austin" element={<AustinPage />} />
          <Route path="/ai-photo-booth-rental-austin" element={<AustinPage />} />
          <Route path="/locations/boston" element={<BostonPage />} />
          <Route path="/ai-photo-booth-rental-boston" element={<BostonPage />} />
          <Route path="/locations/washington-dc" element={<WashingtonDCPage />} />
          <Route path="/ai-photo-booth-rental-washington-dc" element={<WashingtonDCPage />} />
          <Route path="/locations/dallas" element={<DallasPage />} />
          <Route path="/ai-photo-booth-rental-dallas" element={<DallasPage />} />
          <Route path="/locations/seattle" element={<SeattlePage />} />
          <Route path="/ai-photo-booth-rental-seattle" element={<SeattlePage />} />
          <Route path="/locations/denver" element={<DenverPage />} />
          <Route path="/ai-photo-booth-rental-denver" element={<DenverPage />} />
          <Route path="/locations/phoenix" element={<PhoenixPage />} />
          <Route path="/ai-photo-booth-rental-phoenix" element={<PhoenixPage />} />
          <Route path="/locations/houston" element={<HoustonPage />} />
          <Route path="/ai-photo-booth-rental-houston" element={<HoustonPage />} />
          <Route path="/locations/san-diego" element={<SanDiegoPage />} />
          <Route path="/ai-photo-booth-rental-san-diego" element={<SanDiegoPage />} />
          <Route path="/locations/nashville" element={<NashvillePage />} />
          <Route path="/ai-photo-booth-rental-nashville" element={<NashvillePage />} />
          {/* Blog Pages */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/custom-ai-filters-for-events" element={<CustomAIFiltersPage />} />
          <Route path="/blog/interactive-guest-engagement-ideas" element={<InteractiveGuestEngagementPage />} />
          <Route path="/blog/ai-photo-booth-vs-traditional-photo-booth" element={<AIPhotoBoothVsTraditionalPage />} />
          <Route path="/blog/trade-show-booth-ideas-that-drive-leads" element={<TradeShowBoothIdeasPage />} />
          <Route path="/blog/corporate-headshot-trends" element={<CorporateHeadshotTrendsPage />} />
          <Route path="/blog/photo-booth-rental-guide" element={<PhotoBoothRentalGuidePage />} />
          <Route path="/blog/corporate-photo-booth-rental" element={<CorporatePhotoBoothRentalPage />} />
          <Route path="/blog/photo-booth-rental-nyc" element={<PhotoBoothRentalNYCPage />} />
          <Route path="/blog/ai-photo-booth-rental-corporate-events" element={<AIPhotoBoothCorporateEventsPage />} />
          {/* Proposals Page */}
          <Route path="/proposals" element={<ProposalsPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          {/* Link in Bio */}
          <Route path="/links" element={<LinkInBioPage />} />
          {/* Private Content Hub */}
          <Route path="/content-hub-x7k9" element={<ContentHubPage />} />
          {/* Private Media Upload Portal */}
          <Route path="/upload-m3d1a-p0rtal" element={<MediaUploadPage />} />
          {/* PixelAI Social - Admin Dashboard */}
          <Route path="/pixelai-social" element={<PixelAISocialPage />} />
          {/* Instagram Scheduler */}
          <Route path="/instagram-scheduler" element={<InstagramSchedulerPage />} />
          {/* Analytics Dashboard */}
          <Route path="/analytics-d4shb0ard" element={<AnalyticsDashboardPage />} />
          {/* User Management */}
          <Route path="/user-m4nagement" element={<UserManagementPage />} />
          {/* Leads Dashboard */}
          <Route path="/leads-d4shb0ard" element={<LeadsDashboardPage />} />
          {/* Review Templates */}
          <Route path="/review-templates-x9r2" element={<ReviewTemplatesPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </AnalyticsProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
