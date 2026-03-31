import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import ShelfMonitor from "./pages/ShelfMonitor";
import Inventory from "./pages/Inventory";
import SmartReplenish from "./pages/SmartReplenish";
import Environment from "./pages/Environment";
import DataAnalysis from "./pages/DataAnalysis";
import AlertCenter from "./pages/AlertCenter";
import SystemSettings from "./pages/SystemSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/shelf-monitor" element={<ShelfMonitor />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/replenish" element={<SmartReplenish />} />
            <Route path="/environment" element={<Environment />} />
            <Route path="/analysis" element={<DataAnalysis />} />
            <Route path="/alerts" element={<AlertCenter />} />
            <Route path="/settings" element={<SystemSettings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
