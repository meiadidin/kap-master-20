
import { useDashboardAuth } from "@/hooks/useDashboardAuth";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardRoutes from "@/components/dashboard/DashboardRoutes";

const Dashboard = () => {
  const { currentUser, handleLogout } = useDashboardAuth();

  if (!currentUser) {
    return null; // Return null while checking authentication
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar Navigation */}
      <DashboardSidebar 
        currentUser={currentUser} 
        onLogout={handleLogout} 
      />

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Content */}
        <div className="p-6">
          <DashboardRoutes currentUser={currentUser} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
