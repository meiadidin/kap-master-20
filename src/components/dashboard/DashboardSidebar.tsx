
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  Users,
  FileText,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Menu
} from "lucide-react";

type UserData = {
  name: string;
  email: string;
  role: string;
};

type SidebarProps = {
  currentUser: UserData;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
  onLogout: () => void;
};

const DashboardSidebar = ({ 
  currentUser, 
  activeTab, 
  setActiveTab, 
  isOpen, 
  toggleSidebar,
  onLogout 
}: SidebarProps) => {
  
  const getNavItems = () => {
    const items = [
      {
        label: "Overview",
        value: "overview",
        icon: <LayoutDashboard size={20} />,
        roles: ["admin", "manager", "auditor", "client"]
      }
    ];
    
    if (currentUser.role === "admin" || currentUser.role === "manager") {
      items.push(
        {
          label: "Klien",
          value: "clients",
          icon: <Users size={20} />,
          roles: ["admin", "manager", "auditor"]
        },
        {
          label: "Dokumen",
          value: "documents",
          icon: <FileText size={20} />,
          roles: ["admin", "manager", "auditor", "client"]
        },
        {
          label: "Pengguna",
          value: "users",
          icon: <User size={20} />,
          roles: ["admin"]
        }
      );
    } else if (currentUser.role === "auditor") {
      items.push(
        {
          label: "Klien",
          value: "clients",
          icon: <Users size={20} />,
          roles: ["admin", "manager", "auditor"]
        },
        {
          label: "Dokumen",
          value: "documents",
          icon: <FileText size={20} />,
          roles: ["admin", "manager", "auditor", "client"]
        }
      );
    } else if (currentUser.role === "client") {
      items.push({
        label: "Dokumen",
        value: "documents",
        icon: <FileText size={20} />,
        roles: ["admin", "manager", "auditor", "client"]
      });
    }
    
    // Common items for all users
    items.push(
      {
        label: "Profil",
        value: "profile",
        icon: <User size={20} />,
        roles: ["admin", "manager", "auditor", "client"]
      },
      {
        label: "Pengaturan",
        value: "settings",
        icon: <Settings size={20} />,
        roles: ["admin", "manager", "auditor", "client"]
      }
    );
    
    return items.filter(item => item.roles.includes(currentUser.role));
  };
  
  return (
    <>
      {/* Mobile Sidebar Toggle */}
      <div className="fixed top-4 left-4 z-40 md:hidden">
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-white" 
          onClick={toggleSidebar}
        >
          <Menu size={20} />
        </Button>
      </div>
    
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 md:transform-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 bg-kap-navy text-white">
            <div className="flex justify-between items-center">
              <Link to="/" className="flex items-center">
                <span className="font-poppins font-bold text-lg">KAP MGI GAR</span>
                <span className="text-kap-gold font-poppins font-bold text-lg ml-1">SURABAYA</span>
              </Link>
              <button onClick={toggleSidebar} className="md:hidden">
                <ChevronLeft size={20} />
              </button>
            </div>
          </div>
          
          {/* User Info */}
          <div className="p-4 bg-gray-50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-kap-navy text-white flex items-center justify-center">
                {currentUser.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <p className="font-medium text-sm truncate">{currentUser.name}</p>
                <p className="text-xs text-gray-500 truncate">{currentUser.role}</p>
              </div>
            </div>
          </div>
          
          <Separator />
          
          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {getNavItems().map((item) => (
                <li key={item.value}>
                  <button
                    onClick={() => setActiveTab(item.value)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors ${
                      activeTab === item.value ? 'bg-kap-light text-kap-navy font-medium' : 'text-gray-700'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          
          <Separator />
          
          {/* Logout */}
          <div className="p-4">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={onLogout}
            >
              <LogOut size={16} />
              <span>Logout</span>
            </Button>
          </div>
          
          {/* Collapse Button (Desktop) */}
          <div className="hidden md:block p-4 border-t">
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto"
              onClick={toggleSidebar}
            >
              {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
