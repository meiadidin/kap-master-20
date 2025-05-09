
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BarChart, Briefcase, Building, Clipboard, FileText, 
  Home, LogOut, Minus, Plus, Settings, User, Users, MessageCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserData } from "@/hooks/useDashboardAuth";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DashboardSidebarProps {
  currentUser: UserData;
  onLogout: () => Promise<void>;
}

const DashboardSidebar = ({ currentUser, onLogout }: DashboardSidebarProps) => {
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  const navigate = useNavigate();
  
  // Menu items based on user role
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

    // For Managing Partner
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

    // For Partner
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

    // For Admin
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

    // Default menu for other roles
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
  
  return (
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
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className={`w-full justify-start text-white hover:bg-blue-800 ${isMenuCollapsed ? "px-2" : "px-4"}`} 
                        onClick={() => navigate(item.path)}
                      >
                        <item.icon size={20} />
                        {!isMenuCollapsed && <span className="ml-3">{item.label}</span>}
                      </Button>
                    </TooltipTrigger>
                    {isMenuCollapsed && (
                      <TooltipContent side="right">
                        {item.label}
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-blue-800">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-white hover:bg-blue-800" 
                  onClick={onLogout}
                >
                  <LogOut size={20} />
                  {!isMenuCollapsed && <span className="ml-3">Keluar</span>}
                </Button>
              </TooltipTrigger>
              {isMenuCollapsed && (
                <TooltipContent side="right">
                  Keluar
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
