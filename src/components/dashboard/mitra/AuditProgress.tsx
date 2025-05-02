
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Audit progress data
const auditProgressData = [
  { 
    id: 1,
    client: "PT Maju Bersama",
    project: "Audit Laporan Keuangan 2023",
    status: "in_progress",
    progress: 65,
    startDate: "2024-02-15T00:00:00",
    endDate: "2024-05-30T00:00:00",
    team: ["Auditor A", "Auditor B", "Auditor C"]
  },
  { 
    id: 2,
    client: "CV Teknologi Nusantara",
    project: "Audit Internal",
    status: "in_progress",
    progress: 40,
    startDate: "2024-03-10T00:00:00",
    endDate: "2024-06-10T00:00:00",
    team: ["Auditor B", "Auditor D"]
  },
  { 
    id: 3,
    client: "PT Sejahtera Abadi",
    project: "Audit Pajak",
    status: "review",
    progress: 85,
    startDate: "2024-01-20T00:00:00",
    endDate: "2024-04-30T00:00:00",
    team: ["Auditor A", "Auditor E"]
  },
  { 
    id: 4,
    client: "PT Bintang Timur",
    project: "Audit Kepatuhan",
    status: "completed",
    progress: 100,
    startDate: "2024-01-05T00:00:00",
    endDate: "2024-03-15T00:00:00",
    team: ["Auditor C", "Auditor F"]
  }
];

const statusLabels: Record<string, string> = {
  completed: "Selesai",
  in_progress: "Dalam Proses",
  review: "Review",
  pending: "Pending"
};

const statusColors: Record<string, string> = {
  completed: "bg-green-100 text-green-800",
  in_progress: "bg-blue-100 text-blue-800",
  review: "bg-amber-100 text-amber-800",
  pending: "bg-purple-100 text-purple-800"
};

const AuditProgress = () => {
  // Format date
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd MMMM yyyy", { locale: id });
  };

  // Calculate days remaining for audit projects
  const calculateDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Progress Audit</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {auditProgressData.map((audit) => (
          <div key={audit.id} className="border rounded-lg p-4 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-medium">{audit.project}</h3>
                <p className="text-sm text-gray-500">{audit.client}</p>
              </div>
              <Badge variant="outline" className={statusColors[audit.status]}>
                {statusLabels[audit.status]}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{audit.progress}%</span>
              </div>
              <Progress value={audit.progress} className="h-2">
                <div 
                  className={`h-full rounded-full ${
                    audit.progress === 100 ? 'bg-green-500' : 
                    audit.progress > 75 ? 'bg-blue-500' : 
                    audit.progress > 50 ? 'bg-amber-500' : 'bg-red-500'
                  }`} 
                />
              </Progress>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Periode:</p>
                <p>{formatDate(audit.startDate)} - {formatDate(audit.endDate)}</p>
              </div>
              <div>
                <p className="text-gray-500">Sisa Waktu:</p>
                <p className={`font-medium ${
                  calculateDaysRemaining(audit.endDate) < 10 ? 'text-red-600' : 
                  calculateDaysRemaining(audit.endDate) < 20 ? 'text-amber-600' : 'text-green-600'
                }`}>
                  {calculateDaysRemaining(audit.endDate) > 0 
                    ? `${calculateDaysRemaining(audit.endDate)} hari` 
                    : audit.status === 'completed' 
                      ? 'Selesai' 
                      : 'Tenggat terlampaui'}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Tim:</p>
                <p>{audit.team.join(", ")}</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AuditProgress;
