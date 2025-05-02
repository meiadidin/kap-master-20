
import { useState } from "react";
import MitraOverview from "./mitra/MitraOverview";
import DocumentManager from "./mitra/DocumentManager";
import ClientsList from "./ClientsList";
import { LayoutDashboard, FileText, User, Settings, Users } from "lucide-react";

type UserData = {
  name: string;
  email: string;
  role: string;
};

const MitraDocumentManager = () => {
  const [activeSection, setActiveSection] = useState("overview");
  
  // Mitra user information
  const mitraUser = {
    name: "PT Maju Bersama",
    email: "mitra@example.com",
    role: "mitra"
  };
  
  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <MitraOverview />;
      case "documents":
        return <DocumentManager />;
      case "clients":
        return <ClientsList currentUser={mitraUser} />;
      default:
        return <MitraOverview />;
    }
  };

  const navItems = [
    {
      id: "overview",
      label: "Overview",
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
      id: "clients",
      label: "Klien",
      icon: <Users className="h-5 w-5" />
    },
    {
      id: "documents",
      label: "Dokumen",
      icon: <FileText className="h-5 w-5" />
    },
    {
      id: "profile",
      label: "Profil",
      icon: <User className="h-5 w-5" />
    },
    {
      id: "settings",
      label: "Pengaturan",
      icon: <Settings className="h-5 w-5" />
    }
  ];

  return (
    <div className="flex h-full">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-white border-r min-h-[calc(100vh-4rem)]">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-kap-navy text-white flex items-center justify-center">
              <span>P</span>
            </div>
            <div>
              <p className="font-medium text-sm">PT Maju Bersama</p>
              <p className="text-xs text-gray-500">mitra</p>
            </div>
          </div>
        </div>
        <nav className="p-2">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left ${
                    activeSection === item.id 
                      ? "bg-blue-50 text-blue-700" 
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveSection(item.id)}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto bg-gray-50">
        {renderContent()}
      </div>
    </div>
  );
};

export default MitraDocumentManager;
