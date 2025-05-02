
import { useState } from "react";
import DocumentStats from "./DocumentStats";
import AuditProgress from "./AuditProgress";
import AuditCharts from "./AuditCharts";

type UserData = {
  name: string;
  email: string;
  role: string;
};

// Sample data for mitra documents status counting
const mitraDocuments = [
  {
    id: 1,
    name: "Laporan Keuangan PT Maju Bersama",
    type: "financial",
    client: "PT Maju Bersama",
    lastModified: "2024-04-15T08:30:00",
    status: "completed"
  },
  {
    id: 2,
    name: "Audit Internal CV Teknologi",
    type: "audit",
    client: "CV Teknologi Nusantara",
    lastModified: "2024-04-10T14:20:00",
    status: "in_progress"
  },
  {
    id: 3,
    name: "Laporan Pajak PT Sejahtera",
    type: "tax",
    client: "PT Sejahtera Abadi",
    lastModified: "2024-04-05T11:45:00",
    status: "review"
  },
  {
    id: 4,
    name: "Registrasi Klien Baru",
    type: "registration",
    client: "PT Bintang Timur",
    lastModified: "2024-03-30T09:15:00",
    status: "completed"
  },
  {
    id: 5,
    name: "Proyeksi Keuangan 2024",
    type: "financial",
    client: "PT Global Indonesia",
    lastModified: "2024-03-22T13:50:00",
    status: "in_progress"
  }
];

const MitraOverview = () => {
  // Calculate statistics
  const totalDocuments = mitraDocuments.length;
  const completedDocuments = mitraDocuments.filter(doc => doc.status === "completed").length;
  const inProgressDocuments = mitraDocuments.filter(doc => doc.status === "in_progress").length;
  const reviewDocuments = mitraDocuments.filter(doc => doc.status === "review").length;
  
  return (
    <div className="space-y-6">
      {/* Header - Audit Status Overview */}
      <DocumentStats 
        totalDocuments={totalDocuments}
        completedDocuments={completedDocuments}
        inProgressDocuments={inProgressDocuments}
        reviewDocuments={reviewDocuments}
      />

      {/* Audit Progress Dashboard */}
      <AuditProgress />

      {/* Charts Section */}
      <AuditCharts />
    </div>
  );
};

export default MitraOverview;
