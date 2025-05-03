
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface AuditSchedule {
  id: number;
  client: string;
  auditType: string;
  startDate: string;
  endDate: string;
  status: string;
  priority: string;
  team: string[];
  notes?: string;
}

interface AuditScheduleTableProps {
  schedules: AuditSchedule[];
}

const AuditScheduleTable = ({ schedules }: AuditScheduleTableProps) => {
  // Helper function to format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "d MMMM yyyy", { locale: id });
  };

  // Helper function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Akan Datang</Badge>;
      case "ongoing":
        return <Badge className="bg-green-500 hover:bg-green-600">Sedang Berjalan</Badge>;
      case "completed":
        return <Badge className="bg-gray-500 hover:bg-gray-600">Selesai</Badge>;
      case "delayed":
        return <Badge className="bg-amber-500 hover:bg-amber-600">Tertunda</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Helper function to get priority badge
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">Tinggi</Badge>;
      case "medium":
        return <Badge variant="default" className="bg-amber-500 hover:bg-amber-600">Sedang</Badge>;
      case "low":
        return <Badge variant="outline" className="text-green-500 border-green-500">Rendah</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  return (
    <div className="rounded-md border shadow">
      <div className="relative overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Klien</TableHead>
              <TableHead className="w-[150px]">Jenis Audit</TableHead>
              <TableHead className="w-[150px]">Tanggal Mulai</TableHead>
              <TableHead className="w-[150px]">Tanggal Selesai</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="w-[100px]">Prioritas</TableHead>
              <TableHead>Tim Audit</TableHead>
              <TableHead className="w-[200px]">Catatan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedules.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  Tidak ada jadwal audit ditemukan.
                </TableCell>
              </TableRow>
            ) : (
              schedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell className="font-medium">{schedule.client}</TableCell>
                  <TableCell>{schedule.auditType}</TableCell>
                  <TableCell>{formatDate(schedule.startDate)}</TableCell>
                  <TableCell>{formatDate(schedule.endDate)}</TableCell>
                  <TableCell>{getStatusBadge(schedule.status)}</TableCell>
                  <TableCell>{getPriorityBadge(schedule.priority)}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {schedule.team.map((member, index) => (
                        <Badge key={index} variant="outline" className="bg-blue-50">
                          {member}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate" title={schedule.notes}>
                    {schedule.notes || "-"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AuditScheduleTable;
