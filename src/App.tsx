
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import ClientDocuments from "./pages/ClientDocuments";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Careers from "./pages/Careers";
import ServiceOrderPage from "./pages/ServiceOrderPage";

// Service Detail Pages
import AuditKeuangan from "./pages/services/AuditKeuangan";
import ReviewKeuangan from "./pages/services/ReviewKeuangan";
import AuditKepatuhan from "./pages/services/AuditKepatuhan";
import PerencanaanPajak from "./pages/services/PerencanaanPajak";
import KepatuhanPajak from "./pages/services/KepatuhanPajak";
import KonsultasiPerpajakan from "./pages/services/KonsultasiPerpajakan";
import PenyusunanLaporan from "./pages/services/PenyusunanLaporan";
import PembukuanAkuntansi from "./pages/services/PembukuanAkuntansi";
import KonsultasiSistem from "./pages/services/KonsultasiSistem";
import DueDiligence from "./pages/services/DueDiligence";
import Restrukturisasi from "./pages/services/Restrukturisasi";
import ManajemenRisiko from "./pages/services/ManajemenRisiko";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route 
            path="/dashboard/*" 
            element={<Dashboard />} 
          />
          <Route 
            path="/clients/:clientId" 
            element={<ClientDocuments />} 
          />
          <Route 
            path="/login" 
            element={<Login />} 
          />
          <Route 
            path="/lupa-password" 
            element={<ForgotPassword />} 
          />
          <Route 
            path="/pesan-layanan" 
            element={
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                  <ServiceOrderPage />
                </main>
                <Footer />
              </div>
            } 
          />
          <Route 
            path="*" 
            element={
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/tentang-kami" element={<AboutUs />} />
                    <Route path="/layanan" element={<Services />} />
                    <Route path="/tim-kami" element={<Team />} />
                    <Route path="/kontak" element={<Contact />} />
                    <Route path="/karir" element={<Careers />} />
                    
                    {/* Service Detail Routes */}
                    <Route path="/layanan/audit-keuangan" element={<AuditKeuangan />} />
                    <Route path="/layanan/review-keuangan" element={<ReviewKeuangan />} />
                    <Route path="/layanan/audit-kepatuhan" element={<AuditKepatuhan />} />
                    <Route path="/layanan/perencanaan-pajak" element={<PerencanaanPajak />} />
                    <Route path="/layanan/kepatuhan-pajak" element={<KepatuhanPajak />} />
                    <Route path="/layanan/konsultasi-perpajakan" element={<KonsultasiPerpajakan />} />
                    <Route path="/layanan/penyusunan-laporan" element={<PenyusunanLaporan />} />
                    <Route path="/layanan/pembukuan-akuntansi" element={<PembukuanAkuntansi />} />
                    <Route path="/layanan/konsultasi-sistem" element={<KonsultasiSistem />} />
                    <Route path="/layanan/due-diligence" element={<DueDiligence />} />
                    <Route path="/layanan/restrukturisasi" element={<Restrukturisasi />} />
                    <Route path="/layanan/manajemen-risiko" element={<ManajemenRisiko />} />
                    
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            } 
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
