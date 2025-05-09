
import { Route, Routes } from "react-router-dom";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import ClientsList from "@/components/dashboard/ClientsList";
import DocumentsList from "@/components/dashboard/DocumentsList";
import UserProfile from "@/components/dashboard/UserProfile";
import UserSettings from "@/components/dashboard/UserSettings";
import UsersList from "@/components/dashboard/UsersManagement";
import PartnerPerformance from "@/components/dashboard/PartnerPerformance";
import ManagingPartnerKPI from "@/components/dashboard/ManagingPartnerKPI";
import FinancialMetrics from "@/components/dashboard/FinancialMetrics";
import TeamManagement from "@/components/dashboard/TeamManagement";
import AuditSchedule from "@/components/dashboard/AuditSchedule";
import Collaboration from "@/pages/Collaboration";
import { UserData } from "@/hooks/useDashboardAuth";

interface DashboardRoutesProps {
  currentUser: UserData;
}

const DashboardRoutes = ({ currentUser }: DashboardRoutesProps) => {
  return (
    <Routes>
      <Route path="/" element={<DashboardOverview currentUser={currentUser} />} />
      <Route path="/clients" element={<ClientsList currentUser={currentUser} />} />
      <Route path="/documents" element={<DocumentsList currentUser={currentUser} />} />
      <Route path="/profile" element={<UserProfile currentUser={currentUser} />} />
      <Route path="/settings" element={<UserSettings currentUser={currentUser} />} />
      <Route path="/collaboration" element={<Collaboration />} />
      
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
  );
};

export default DashboardRoutes;
