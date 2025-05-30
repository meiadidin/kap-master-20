
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Users, FileText, User, Settings, MessageCircle, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

type SidebarProps = {
  collapsed?: boolean;
};

const Sidebar = ({ collapsed = false }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [userProfile, setUserProfile] = useState<{name: string; role: string} | null>(null);
  
  useEffect(() => {
    if (user) {
      // Check for user metadata first
      const userData = {
        name: user.user_metadata?.name || "User",
        role: user.user_metadata?.role || "client"
      };
      setUserProfile(userData);
    }
  }, [user]);

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  // Redirect to login if no user is found
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Define menu items array with conditional rendering based on role
  const menuItems = [
    {
      icon: <Home size={20} />,
      label: "Dashboard",
      path: "/dashboard",
      showFor: ['admin', 'manager', 'auditor', 'partner', 'managingpartner', 'client', 'mitra'],
    },
    {
      icon: <Users size={20} />,
      label: "Daftar Klien",
      path: "/dashboard/clients",
      // Remove 'client' from the showFor array to hide this menu item for clients
      showFor: ['admin', 'manager', 'auditor', 'partner', 'managingpartner', 'mitra'],
    },
    {
      icon: <FileText size={20} />,
      label: "Dokumen",
      path: "/dashboard/documents",
      showFor: ['admin', 'manager', 'auditor', 'partner', 'managingpartner', 'client', 'mitra'],
    },
    {
      icon: <MessageCircle size={20} />,
      label: "Kolaborasi",
      path: "/dashboard/collaboration",
      showFor: ['admin', 'manager', 'auditor', 'partner', 'managingpartner', 'client', 'mitra'],
    },
    {
      icon: <User size={20} />,
      label: "Profil",
      path: "/dashboard/profile",
      showFor: ['admin', 'manager', 'auditor', 'partner', 'managingpartner', 'client', 'mitra'],
    },
    {
      icon: <Settings size={20} />,
      label: "Pengaturan",
      path: "/dashboard/settings",
      showFor: ['admin', 'manager', 'auditor', 'partner', 'managingpartner', 'client', 'mitra'],
    },
  ];

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter(item => 
    userProfile && item.showFor.includes(userProfile.role)
  );

  return (
    <div className={`bg-kap-navy text-white h-screen ${collapsed ? "w-16" : "w-64"} transition-all duration-300 flex flex-col`}>
      <div className="p-4 border-b border-blue-900">
        <div className="flex items-center justify-center">
          {!collapsed ? (
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold">MGI Gideon Adi</span>
              <span className="text-xs opacity-75">& Rekan Surabaya</span>
            </div>
          ) : (
            <span className="text-xl font-bold">MGI</span>
          )}
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-2">
          {filteredMenuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center p-3 rounded-md transition-colors ${
                  isActive(item.path)
                    ? "bg-blue-700"
                    : "hover:bg-blue-800"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
          <li>
            <Button
              variant="ghost"
              className="w-full flex items-center p-3 rounded-md transition-colors text-white hover:bg-blue-800 justify-start"
              onClick={handleSignOut}
            >
              <span className="mr-3"><LogOut size={20} /></span>
              {!collapsed && <span>Logout</span>}
            </Button>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t border-blue-900">
        {!collapsed && userProfile && (
          <div className="text-xs text-center">
            <p className="font-medium">{userProfile.name}</p>
            <p className="opacity-75 capitalize">{userProfile.role}</p>
            <div className="mt-1 opacity-75">
              &copy; {new Date().getFullYear()} KAP GAR
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
