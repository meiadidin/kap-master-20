
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import ClientsList from "@/components/dashboard/ClientsList";
import DocumentsList from "@/components/dashboard/DocumentsList";
import UserProfile from "@/components/dashboard/UserProfile";
import UserSettings from "@/components/dashboard/UserSettings";
import UsersManagement from "@/components/dashboard/UsersManagement";
import MitraDocumentManager from "@/components/dashboard/MitraDocumentManager";
import ChatSidebar from "@/components/dashboard/ChatSidebar";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Get current user from storage
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; role: string }>({
    name: "",
    email: "",
    role: ""
  });
  
  useEffect(() => {
    // Cek apakah user sudah login dengan memeriksa sessionStorage
    const userString = sessionStorage.getItem('currentUser');
    
    if (!userString) {
      // Jika tidak ada user yang login, redirect ke halaman login
      toast({
        title: "Akses Ditolak",
        description: "Silakan login terlebih dahulu",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    try {
      const user = JSON.parse(userString);
      setCurrentUser(user);
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/login");
    }
  }, [navigate, toast]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const handleLogout = () => {
    // Hapus data user dari sessionStorage
    sessionStorage.removeItem('currentUser');
    
    toast({
      title: "Logout Berhasil",
      description: "Anda telah berhasil keluar dari sistem",
    });
    
    // Redirect ke halaman login
    navigate("/login");
  };

  // Render konten berdasarkan tab yang aktif
  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <DashboardOverview currentUser={currentUser} />;
      case "clients":
        return <ClientsList currentUser={currentUser} />;
      case "documents":
        return <DocumentsList currentUser={currentUser} />;
      case "users":
        return <UsersManagement />;
      case "profile":
        return <UserProfile currentUser={currentUser} />;
      case "settings":
        return <UserSettings currentUser={currentUser} />;
      case "mitra":
        return <MitraDocumentManager />;
      default:
        return <DashboardOverview currentUser={currentUser} />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <DashboardSidebar 
        currentUser={currentUser} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        onLogout={handleLogout}
      />
      
      <div 
        className={`transition-all duration-300 ${
          isSidebarOpen ? "ml-0 md:ml-64" : "ml-0 md:ml-14"
        } p-4 md:p-6 pt-16 md:pt-6`}
      >
        <div className="container max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </div>
      
      <ChatSidebar />
    </div>
  );
};

export default Dashboard;
