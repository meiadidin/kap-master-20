
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import ClientsList from "@/components/dashboard/ClientsList";
import DocumentsList from "@/components/dashboard/DocumentsList";
import UsersList from "@/components/dashboard/UsersList";
import UserProfile from "@/components/dashboard/UserProfile";
import Settings from "@/components/dashboard/Settings";
import ChatSidebar from "@/components/dashboard/ChatSidebar";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

type UserData = {
  name: string;
  email: string;
  role: string;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Check if user is logged in
    const userStr = sessionStorage.getItem("currentUser");
    if (!userStr) {
      toast({
        title: "Akses Ditolak",
        description: "Silakan login terlebih dahulu",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    try {
      const user = JSON.parse(userStr);
      setCurrentUser(user);
    } catch (error) {
      sessionStorage.removeItem("currentUser");
      navigate("/login");
    }
    
    // If on mobile, close the sidebar by default
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [navigate, toast, isMobile]);

  const handleLogout = () => {
    sessionStorage.removeItem("currentUser");
    toast({
      title: "Logout Berhasil",
      description: "Anda telah berhasil keluar dari sistem",
    });
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  if (!currentUser) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar 
        currentUser={currentUser}
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        onLogout={handleLogout}
      />
      
      <main className={`flex-1 overflow-y-auto p-2 sm:p-4 md:p-6 ${isMobile ? "pt-14" : "mr-[3.5rem]"}`}>
        <div className="container mx-auto max-w-7xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h1 className="text-xl sm:text-2xl font-bold text-kap-navy">Dashboard</h1>
              <TabsList className="hidden md:flex">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                {(currentUser.role === "admin" || currentUser.role === "manager") && (
                  <>
                    <TabsTrigger value="clients">Klien</TabsTrigger>
                    <TabsTrigger value="documents">Dokumen</TabsTrigger>
                    <TabsTrigger value="users">Pengguna</TabsTrigger>
                  </>
                )}
                {currentUser.role === "auditor" && (
                  <>
                    <TabsTrigger value="clients">Klien</TabsTrigger>
                    <TabsTrigger value="documents">Dokumen</TabsTrigger>
                  </>
                )}
                {currentUser.role === "client" && (
                  <TabsTrigger value="documents">Dokumen</TabsTrigger>
                )}
                <TabsTrigger value="profile">Profil</TabsTrigger>
                <TabsTrigger value="settings">Pengaturan</TabsTrigger>
              </TabsList>
              
              {/* Mobile tabs dropdown */}
              <div className="md:hidden w-full">
                <select 
                  className="w-full bg-white border border-gray-300 rounded-md py-2 px-3"
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value)}
                >
                  <option value="overview">Overview</option>
                  {(currentUser.role === "admin" || currentUser.role === "manager") && (
                    <>
                      <option value="clients">Klien</option>
                      <option value="documents">Dokumen</option>
                      <option value="users">Pengguna</option>
                    </>
                  )}
                  {currentUser.role === "auditor" && (
                    <>
                      <option value="clients">Klien</option>
                      <option value="documents">Dokumen</option>
                    </>
                  )}
                  {currentUser.role === "client" && (
                    <option value="documents">Dokumen</option>
                  )}
                  <option value="profile">Profil</option>
                  <option value="settings">Pengaturan</option>
                </select>
              </div>
            </div>

            <TabsContent value="overview" className="space-y-4">
              <DashboardOverview currentUser={currentUser} />
            </TabsContent>
            
            <TabsContent value="clients" className="space-y-4">
              <ClientsList currentUser={currentUser} />
            </TabsContent>
            
            <TabsContent value="documents" className="space-y-4">
              <DocumentsList currentUser={currentUser} />
            </TabsContent>

            {currentUser.role === "admin" && (
              <TabsContent value="users" className="space-y-4">
                <UsersList />
              </TabsContent>
            )}
            
            <TabsContent value="profile" className="space-y-4">
              <UserProfile currentUser={currentUser} />
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4">
              <Settings currentUser={currentUser} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <ChatSidebar currentUserId={0} />
    </div>
  );
};

export default Dashboard;
