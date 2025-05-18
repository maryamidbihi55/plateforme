
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";

// Pages
import Index from "./pages/Index";
import Client from "./pages/Client";
import Societe from "./pages/Societe";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import NotFound from "./pages/NotFound";
import CommentCaMarche from "./pages/CommentCaMarche";
import DevenirPartenaire from "./pages/DevenirPartenaire";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Pages publiques */}
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/comment-ca-marche" element={<CommentCaMarche />} />
            <Route path="/devenir-partenaire" element={<DevenirPartenaire />} />
            
            {/* Espaces utilisateurs */}
            <Route path="/client/*" element={<Client />} />
            <Route path="/societe/*" element={<Societe />} />
            <Route path="/agent/*" element={<Navigate to="/client" />} />
            <Route path="/admin/*" element={<Navigate to="/client" />} />
            
            {/* Fallback 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
