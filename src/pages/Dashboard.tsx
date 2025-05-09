import { useState, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { BarChart, Briefcase, Building, Clipboard, FileText, Home, LogOut, Minus, Plus, Settings, User, Users, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ClientsList from "@/components/dashboard/ClientsList";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import Collaboration from "@/pages/Collaboration";

// Import komponen untuk Managing Partner dan Partner
import ManagingPartnerKPI from "@/components/dashboard/ManagingPartnerKPI";
import PartnerPerformance from "@/components/dashboard/PartnerPerformance";
import FinancialMetrics from "@/components/dashboard/FinancialMetrics";
import TeamManagement from "@/components/dashboard/TeamManagement";
import AuditSchedule from "@/components/dashboard/AuditSchedule";
import DocumentsList from "@/components/dashboard/DocumentsList";
import UsersList from "@/components/dashboard/UsersManagement";
import UserProfile from "@/components/dashboard/UserProfile";
import UserSettings from "@/components/dashboard/UserSettings";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
    role: string;
  } | null>(null);
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in
    if (!user) {
      navigate("/login");
      return;
    }
    
    // Set currentUser from Supabase user data
    setCurrentUser({
      name: user.user_metadata?.name || user.email?.split('@')[0] || "User",
      email: user.email || "",
      role: user.user_metadata?.role || "client"
    });
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  if (!currentUser) {
    return null; // Return null while checking authentication
  }

  // Menu items berdasarkan peran pengguna
  const getMenuItems = () => {
    const commonItems = [{
      icon: Home,
      label: "Dashboard",
      path: "/dashboard"
    }, {
      icon: Users,
      label: "Daftar Klien",
      path: "/dashboard/clients"
    }];

    // Khusus untuk Managing Partner
    if (currentUser.role === "managingpartner") {
      return [...commonItems, {
        icon: BarChart,
        label: "Kinerja Partner",
        path: "/dashboard/partner-performance"
      }, {
        icon: Building,
        label: "Metrik Finansial",
        path: "/dashboard/financial-metrics"
      }, {
        icon: Briefcase,
        label: "Manajemen Tim",
        path: "/dashboard/team-management"
      }, {
        icon: Clipboard,
        label: "Jadwal Audit",
        path: "/dashboard/audit-schedule"
      }, {
        icon: FileText,
        label: "Dokumen",
        path: "/dashboard/documents"
      }, {
        icon: MessageCircle,
        label: "Kolaborasi",
        path: "/dashboard/collaboration"
      }, {
        icon: User,
        label: "Profil",
        path: "/dashboard/profile"
      }, {
        icon: Settings,
        label: "Pengaturan",
        path: "/dashboard/settings"
      }];
    }

    // Khusus untuk Partner
    if (currentUser.role === "partner") {
      return [...commonItems, {
        icon: BarChart,
        label: "KPI",
        path: "/dashboard/kpi"
      }, {
        icon: Briefcase,
        label: "Manajemen Tim",
        path: "/dashboard/team-management"
      }, {
        icon: Clipboard,
        label: "Jadwal Audit",
        path: "/dashboard/audit-schedule"
      }, {
        icon: FileText,
        label: "Dokumen",
        path: "/dashboard/documents"
      }, {
        icon: MessageCircle,
        label: "Kolaborasi",
        path: "/dashboard/collaboration"
      }, {
        icon: User,
        label: "Profil",
        path: "/dashboard/profile"
      }, {
        icon: Settings,
        label: "Pengaturan",
        path: "/dashboard/settings"
      }];
    }

    // Khusus untuk Admin
    if (currentUser.role === "admin") {
      return [...commonItems, {
        icon: FileText,
        label: "Dokumen",
        path: "/dashboard/documents"
      }, {
        icon: MessageCircle,
        label: "Kolaborasi",
        path: "/dashboard/collaboration"
      }, {
        icon: Users,
        label: "Pengguna",
        path: "/dashboard/users"
      }, {
        icon: User,
        label: "Profil",
        path: "/dashboard/profile"
      }, {
        icon: Settings,
        label: "Pengaturan",
        path: "/dashboard/settings"
      }];
    }

    // Default menu untuk peran lain (manager, auditor, client, mitra)
    return [...commonItems, {
      icon: FileText,
      label: "Dokumen",
      path: "/dashboard/documents"
    }, {
      icon: MessageCircle,
      label: "Kolaborasi",
      path: "/dashboard/collaboration"
    }, {
      icon: User,
      label: "Profil",
      path: "/dashboard/profile"
    }, {
      icon: Settings,
      label: "Pengaturan",
      path: "/dashboard/settings"
    }];
  };
  const menuItems = getMenuItems();
  return <div className="min-h-screen flex bg-gray-50 rounded-none">
      {/* Sidebar Navigation */}
      <aside className={`bg-kap-navy text-white h-screen fixed left-0 top-0 z-40 transition-all duration-300 ${isMenuCollapsed ? "w-16" : "w-64"}`}>
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
                    className={`w-full justify-start text-white hover:bg-blue-800 ${isMenuCollapsed ? "px-2" : "px-4"}`} 
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
      <main className={`flex-1 transition-all duration-300 ${isMenuCollapsed ? "ml-16" : "ml-64"}`}>
        {/* Content */}
        <div className="p-6">
          <Routes>
            <Route path="/" element={<DashboardOverview currentUser={currentUser} />} />
            <Route path="/clients" element={<ClientsList currentUser={currentUser} />} />
            <Route path="/documents" element={<DocumentsList currentUser={currentUser} />} />
            <Route path="/profile" element={<UserProfile currentUser={currentUser} />} />
            <Route path="/settings" element={<UserSettings currentUser={currentUser} />} />
            <Route path="/collaboration" element={<Collaboration />} /> {/* Route for Collaboration page */}
            
            {/* Admin-specific routes */}
            {currentUser.role === "admin" && <Route path="/users" element={<UsersList currentUser={currentUser} />} />}
            
            {/* Managing Partner routes */}
            {currentUser.role === "managingpartner" && (
              <>
                <Route path="/partner-performance" element={<PartnerPerformance />} />
                <Route path="/financial-metrics" element={<FinancialMetrics />} />
                <Route path="/team-management" element={<TeamManagement />} />
                <Route path="/audit-schedule" element={<AuditSchedule />} />
              </>
            )}
            
            {/* Partner routes */}
            {currentUser.role === "partner" && (
              <>
                <Route path="/kpi" element={<ManagingPartnerKPI />} />
                <Route path="/team-management" element={<TeamManagement />} />
                <Route path="/audit-schedule" element={<AuditSchedule />} />
              </>
            )}
            
            {/* Default route */}
            <Route path="*" element={<DashboardOverview currentUser={currentUser} />} />
          </Routes>
        </div>
      </main>
    </div>;
};

export default Dashboard;
