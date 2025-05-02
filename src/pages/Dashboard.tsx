
import { useState, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import ClientsList from "@/components/dashboard/ClientsList";
import DocumentsList from "@/components/dashboard/DocumentsList";
import ChatSidebar from "@/components/dashboard/ChatSidebar";
import MitraDashboard from "@/components/dashboard/MitraDashboard";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    role: ""
  });

  useEffect(() => {
    // Check if user is logged in
    const storedUser = sessionStorage.getItem('currentUser');
    if (!storedUser) {
      toast({
        title: "Akses Ditolak",
        description: "Silakan login terlebih dahulu untuk mengakses dashboard.",
        variant: "destructive"
      });
      navigate("/login");
      return;
    }

    // Set current user
    setCurrentUser(JSON.parse(storedUser));
  }, [navigate, toast]);

  const handleLogout = () => {
    // Clear user data
    sessionStorage.removeItem('currentUser');
    
    toast({
      title: "Logout Berhasil",
      description: "Anda telah keluar dari sistem."
    });
    
    // Redirect to login page
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderActiveTab = () => {
    const renderContent = () => {
      switch (activeTab) {
        case "overview":
          return <DashboardOverview currentUser={currentUser} />;
        case "clients":
          return <ClientsList currentUser={currentUser} />;
        case "documents":
          return <DocumentsList currentUser={currentUser} />;
        case "mitra":
          return <MitraDashboard currentUser={currentUser} />;
        default:
          return <div>Coming soon...</div>;
      }
    };

    return (
      <div className="p-6 flex-1">
        {renderContent()}
      </div>
    );
  };

  // Special case for mitra users to show their dashboard
  useEffect(() => {
    if (currentUser.role === "mitra") {
      setActiveTab("mitra");
    }
  }, [currentUser.role]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        onLogout={handleLogout}
      />
      
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : ''}`}>
        <div className="container mx-auto py-6">
          <Routes>
            <Route path="*" element={renderActiveTab()} />
          </Routes>
        </div>
      </main>
      
      {/* Chat sidebar */}
      <ChatSidebar />
    </div>
  );
};

export default Dashboard;
