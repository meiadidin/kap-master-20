
import { useState, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { BarChart, Briefcase, Building, ChevronDown, Clipboard, FileText, Home, LogOut, Minus, Plus, Settings, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import ClientsList from "@/components/dashboard/ClientsList";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import ChatSidebar from "@/components/dashboard/ChatSidebar";

// Import komponen untuk Managing Partner dan Partner
import ManagingPartnerKPI from "@/components/dashboard/ManagingPartnerKPI";
import PartnerPerformance from "@/components/dashboard/PartnerPerformance";
import FinancialMetrics from "@/components/dashboard/FinancialMetrics";
import TeamManagement from "@/components/dashboard/TeamManagement";
import AuditSchedule from "@/components/dashboard/AuditSchedule";

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
    role: string;
  } | null>(null);
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const userData = sessionStorage.getItem("currentUser");
    
    if (!userData) {
      navigate("/login");
      return;
    }
    
    try {
      const parsedUser = JSON.parse(userData);
      setCurrentUser(parsedUser);
    } catch (error) {
      console.error("Failed to parse user data", error);
      navigate("/login");
    }
  }, [navigate]);
  
  const handleLogout = () => {
    sessionStorage.removeItem("currentUser");
    navigate("/login");
  };
  
  if (!currentUser) {
    return null; // Return null while checking authentication
  }

  // Menu items berdasarkan peran pengguna
  const getMenuItems = () => {
    const commonItems = [
      { icon: Home, label: "Dashboard", path: "/dashboard" },
      { icon: Users, label: "Daftar Klien", path: "/dashboard/clients" }
    ];
    
    // Khusus untuk Managing Partner
    if (currentUser.role === "managingpartner") {
      return [
        ...commonItems,
        { icon: BarChart, label: "Kinerja Partner", path: "/dashboard/partner-performance" },
        { icon: Building, label: "Metrik Finansial", path: "/dashboard/financial-metrics" },
        { icon: Briefcase, label: "Manajemen Tim", path: "/dashboard/team-management" },
        { icon: Clipboard, label: "Jadwal Audit", path: "/dashboard/audit-schedule" },
        { icon: Settings, label: "Pengaturan", path: "/dashboard/settings" },
      ];
    }
    
    // Khusus untuk Partner
    if (currentUser.role === "partner") {
      return [
        ...commonItems,
        { icon: BarChart, label: "KPI", path: "/dashboard/kpi" },
        { icon: Briefcase, label: "Manajemen Tim", path: "/dashboard/team-management" },
        { icon: Clipboard, label: "Jadwal Audit", path: "/dashboard/audit-schedule" },
        { icon: Settings, label: "Pengaturan", path: "/dashboard/settings" },
      ];
    }
    
    // Default menu untuk peran lain
    return [
      ...commonItems,
      { icon: FileText, label: "Dokumen", path: "/dashboard/documents" },
      { icon: Settings, label: "Pengaturan", path: "/dashboard/settings" },
    ];
  };
  
  const menuItems = getMenuItems();
  
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar Navigation */}
      <aside
        className={`bg-kap-navy text-white h-screen fixed left-0 top-0 z-40 transition-all duration-300 ${
          isMenuCollapsed ? "w-16" : "w-64"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-4 border-b border-blue-800 flex justify-between items-center">
            {!isMenuCollapsed && (
              <div className="flex flex-col">
                <span className="font-bold text-lg truncate">MGI Gideon Adi</span>
                <span className="text-xs text-gray-300">& Rekan SURABAYA</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-blue-800"
              onClick={() => setIsMenuCollapsed(!isMenuCollapsed)}
            >
              {isMenuCollapsed ? <Plus size={18} /> : <Minus size={18} />}
            </Button>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-blue-800">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarFallback className="bg-kap-blue text-white">
                  {currentUser.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {!isMenuCollapsed && (
                <div className="flex flex-col">
                  <span className="font-medium">{currentUser.name}</span>
                  <span className="text-xs text-gray-300 capitalize">{currentUser.role}</span>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-white hover:bg-blue-800 ${
                      isMenuCollapsed ? "px-2" : "px-4"
                    }`}
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon size={20} />
                    {!isMenuCollapsed && <span className="ml-3">{item.label}</span>}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-blue-800">
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-blue-800"
              onClick={handleLogout}
            >
              <LogOut size={20} />
              {!isMenuCollapsed && <span className="ml-3">Keluar</span>}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          isMenuCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        {/* Header */}
        <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">
            Dashboard
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center">
                <User className="mr-2" size={18} />
                <span>{currentUser.name}</span>
                <ChevronDown size={16} className="ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <User className="mr-2" size={16} />
                <span>Profil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2" size={16} />
                <span>Pengaturan</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="mr-2" size={16} />
                <span>Keluar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Content */}
        <div className="p-6">
          <Routes>
            <Route path="/" element={<DashboardOverview currentUser={currentUser} />} />
            <Route path="/clients" element={<ClientsList currentUser={currentUser} />} />
            
            {/* Rute khusus Managing Partner */}
            {currentUser.role === "managingpartner" && (
              <>
                <Route path="/partner-performance" element={<PartnerPerformance />} />
                <Route path="/financial-metrics" element={<FinancialMetrics />} />
                <Route path="/team-management" element={<TeamManagement />} />
                <Route path="/audit-schedule" element={<AuditSchedule />} />
              </>
            )}
            
            {/* Rute khusus Partner */}
            {currentUser.role === "partner" && (
              <>
                <Route path="/kpi" element={<ManagingPartnerKPI />} />
                <Route path="/team-management" element={<TeamManagement />} />
                <Route path="/audit-schedule" element={<AuditSchedule />} />
              </>
            )}
            
            {/* Rute default untuk semua pengguna */}
            <Route path="*" element={<DashboardOverview currentUser={currentUser} />} />
          </Routes>
        </div>
      </main>

      {/* Chat Sidebar */}
      <ChatSidebar />
    </div>
  );
};

export default Dashboard;
