
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import AddAuditScheduleForm from "@/components/audit-schedule/AddAuditScheduleForm";
import AuditScheduleTable from "@/components/audit-schedule/AuditScheduleTable";

const AuditSchedule = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  
  // Check if current user has permission to add schedules
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
  const canAddSchedule = ['managingpartner', 'partner'].includes(currentUser.role || '');
  
  // Mock data for audit schedules
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      client: "PT Maju Bersama",
      auditType: "Audit Laporan Keuangan",
      startDate: "2023-06-15",
      endDate: "2023-07-15",
      status: "completed",
      priority: "high",
      team: ["Ahmad Faisal", "Siti Rahma"],
      notes: "Audit untuk laporan keuangan tahun 2022"
    },
    {
      id: 2,
      client: "CV Teknologi Nusantara",
      auditType: "Review Pajak",
      startDate: "2023-08-20",
      endDate: "2023-09-05",
      status: "ongoing",
      priority: "medium",
      team: ["Diana Putri", "Budi Santoso"],
      notes: "Review pajak untuk periode 2023"
    },
    {
      id: 3,
      client: "PT Sejahtera Abadi",
      auditType: "Due Diligence",
      startDate: "2023-10-10",
      endDate: "2023-11-10",
      status: "upcoming",
      priority: "high",
      team: ["Ahmad Faisal", "Anita Wijaya", "Rio Andika"],
      notes: "Due diligence untuk akuisisi anak perusahaan"
    }
  ]);
  
  const openAddForm = () => {
    if (!canAddSchedule) {
      toast({
        title: "Akses Ditolak",
        description: "Hanya Managing Partner dan Partner yang dapat menambahkan jadwal audit baru.",
        variant: "destructive"
      });
      return;
    }
    setIsAddFormOpen(true);
  };
  
  const closeAddForm = () => {
    setIsAddFormOpen(false);
  };
  
  const handleAddNewSchedule = (newSchedule: any) => {
    // In a real app, you would send this to an API
    // For now, we'll just add it to our local state
    setSchedules([...schedules, {
      id: schedules.length + 1,
      ...newSchedule
    }]);
    
    toast({
      title: "Jadwal Audit Ditambahkan",
      description: `Jadwal audit untuk ${newSchedule.client} telah berhasil ditambahkan.`
    });
    
    closeAddForm();
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-kap-navy">Jadwal Audit</h1>
        <Button 
          onClick={openAddForm}
          className="bg-kap-navy hover:bg-kap-blue text-white flex items-center gap-2"
        >
          <PlusCircle size={18} />
          Tambah Jadwal
        </Button>
      </div>
      
      {/* Audit Schedule Table */}
      <AuditScheduleTable schedules={schedules} />
      
      {/* Add Audit Schedule Form */}
      <AddAuditScheduleForm 
        isOpen={isAddFormOpen} 
        onClose={closeAddForm}
        onSubmit={handleAddNewSchedule}
      />
    </div>
  );
};

export default AuditSchedule;
