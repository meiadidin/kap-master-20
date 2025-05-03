
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Filter, Search, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import AddAuditScheduleForm from "./AddAuditScheduleForm";

// Data jadwal audit
const auditScheduleData = [
  {
    id: 1,
    clientName: "PT Maju Bersama",
    auditType: "Audit Laporan Keuangan",
    startDate: new Date("2024-06-10"),
    endDate: new Date("2024-06-25"),
    assignedTo: ["Ahmad Faisal", "Budi Santoso"],
    status: "upcoming",
    priority: "high"
  },
  {
    id: 2,
    clientName: "CV Teknologi Nusantara",
    auditType: "Review Pajak",
    startDate: new Date("2024-06-15"),
    endDate: new Date("2024-06-20"),
    assignedTo: ["Siti Rahma", "Diana Putri"],
    status: "upcoming",
    priority: "medium"
  },
  {
    id: 3,
    clientName: "PT Sejahtera Abadi",
    auditType: "Due Diligence",
    startDate: new Date("2024-06-05"),
    endDate: new Date("2024-06-15"),
    assignedTo: ["Rio Andika", "Ahmad Faisal"],
    status: "ongoing",
    priority: "high"
  },
  {
    id: 4,
    clientName: "PT Bintang Timur",
    auditType: "Audit Internal",
    startDate: new Date("2024-05-20"),
    endDate: new Date("2024-06-05"),
    assignedTo: ["Budi Santoso", "Anita Wijaya"],
    status: "ongoing",
    priority: "medium"
  },
  {
    id: 5,
    clientName: "PT Global Indonesia",
    auditType: "Audit Laporan Keuangan",
    startDate: new Date("2024-05-10"),
    endDate: new Date("2024-05-25"),
    assignedTo: ["Ahmad Faisal", "Siti Rahma"],
    status: "completed",
    priority: "high"
  },
  {
    id: 6,
    clientName: "CV Mandiri Jaya",
    auditType: "Review Pajak",
    startDate: new Date("2024-05-15"),
    endDate: new Date("2024-05-20"),
    assignedTo: ["Diana Putri"],
    status: "completed",
    priority: "low"
  }
];

// Status dan warna badge
const statusColors: Record<string, string> = {
  upcoming: "bg-blue-100 text-blue-800",
  ongoing: "bg-green-100 text-green-800",
  completed: "bg-gray-100 text-gray-800",
  delayed: "bg-red-100 text-red-800"
};

const statusLabels: Record<string, string> = {
  upcoming: "Akan Datang",
  ongoing: "Sedang Berjalan",
  completed: "Selesai",
  delayed: "Tertunda"
};

const priorityColors: Record<string, string> = {
  high: "bg-red-100 text-red-800",
  medium: "bg-amber-100 text-amber-800",
  low: "bg-blue-100 text-blue-800"
};

const priorityLabels: Record<string, string> = {
  high: "Tinggi",
  medium: "Sedang",
  low: "Rendah"
};

const AuditSchedule = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [view, setView] = useState<"list" | "calendar">("list");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{role: string} | null>(null);

  // Get current user from session storage
  useEffect(() => {
    const userData = sessionStorage.getItem("currentUser");
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

  // Check if user has permission to add audit schedules
  const canAddSchedule = () => {
    return currentUser && ["managingpartner", "partner"].includes(currentUser.role);
  };

  // Filter jadwal berdasarkan status dan pencarian
  const filteredSchedule = auditScheduleData.filter(audit => 
    (filterStatus === "all" || audit.status === filterStatus) &&
    (audit.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
     audit.auditType.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Untuk tampilan kalender, dapatkan semua tanggal audit yang perlu disorot
  const getHighlightedDays = () => {
    const dates: Date[] = [];
    auditScheduleData.forEach(audit => {
      const start = new Date(audit.startDate);
      const end = new Date(audit.endDate);

      // Tambahkan semua tanggal antara start dan end
      const currentDate = new Date(start);
      while (currentDate <= end) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
    return dates;
  };

  // Format tanggal
  const formatDate = (date: Date) => {
    return format(date, "d MMMM yyyy", { locale: id });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Jadwal Audit</h1>
        
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Cari jadwal audit..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full md:w-[180px]">
              <div className="flex items-center gap-2">
                <Filter size={16} />
                <SelectValue placeholder="Filter Status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="upcoming">Akan Datang</SelectItem>
                <SelectItem value="ongoing">Sedang Berjalan</SelectItem>
                <SelectItem value="completed">Selesai</SelectItem>
                <SelectItem value="delayed">Tertunda</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <CalendarIcon size={16} />
                <span>{date ? formatDate(date) : "Pilih Tanggal"}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                modifiers={{
                  highlighted: getHighlightedDays()
                }}
                modifiersStyles={{
                  highlighted: { backgroundColor: "#e0f2fe" }
                }}
              />
            </PopoverContent>
          </Popover>
          
          <div className="flex items-center border rounded-md overflow-hidden">
            <Button
              variant={view === "list" ? "default" : "ghost"}
              className="rounded-none"
              onClick={() => setView("list")}
            >
              List
            </Button>
            <Button
              variant={view === "calendar" ? "default" : "ghost"}
              className="rounded-none"
              onClick={() => setView("calendar")}
            >
              Calendar
            </Button>
          </div>
          
          {canAddSchedule() && (
            <Button 
              className="flex items-center gap-2"
              onClick={() => setIsFormOpen(true)}
            >
              <Plus size={16} />
              <span>Tambah Jadwal</span>
            </Button>
          )}
        </div>
      </div>
      
      {view === "list" ? (
        <Card>
          <CardContent className="p-0">
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Klien</TableHead>
                    <TableHead>Jenis Audit</TableHead>
                    <TableHead>Tanggal Mulai</TableHead>
                    <TableHead>Tanggal Selesai</TableHead>
                    <TableHead>Tim</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Prioritas</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSchedule.length > 0 ? (
                    filteredSchedule.map((audit) => (
                      <TableRow key={audit.id}>
                        <TableCell className="font-medium">{audit.clientName}</TableCell>
                        <TableCell>{audit.auditType}</TableCell>
                        <TableCell>{formatDate(audit.startDate)}</TableCell>
                        <TableCell>{formatDate(audit.endDate)}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {audit.assignedTo.map((person, index) => (
                              <Badge key={index} variant="outline" className="bg-gray-50">
                                {person}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={statusColors[audit.status]}>
                            {statusLabels[audit.status]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={priorityColors[audit.priority]}>
                            {priorityLabels[audit.priority]}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Lihat Detail
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                        Tidak ada jadwal audit yang sesuai dengan filter
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon">
                  <ChevronLeft size={16} />
                </Button>
                <h2 className="text-lg font-medium">Juni 2024</h2>
                <Button variant="outline" size="icon">
                  <ChevronRight size={16} />
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Hari Ini</Button>
                <Select defaultValue="month">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Tampilan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">Bulan</SelectItem>
                    <SelectItem value="week">Minggu</SelectItem>
                    <SelectItem value="day">Hari</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="calendar-view h-[500px] border rounded-md p-2 overflow-auto">
              <div className="grid grid-cols-7 gap-1">
                {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((day, i) => (
                  <div key={i} className="text-center font-medium p-2 bg-gray-50">
                    {day}
                  </div>
                ))}
                {Array(35).fill(null).map((_, i) => {
                  // Contoh sederhananya saja, dalam kenyataannya perlu logika tanggal yang tepat
                  const isToday = i === 15;
                  const hasEvent = [8, 9, 10, 15, 16, 20, 21, 22].includes(i);
                  
                  return (
                    <div 
                      key={i} 
                      className={`border rounded-md min-h-[100px] p-2 ${isToday ? "bg-blue-50 border-blue-300" : ""}`}
                    >
                      <div className="text-right text-sm font-medium mb-1">
                        {(i % 31) + 1}
                      </div>
                      {hasEvent && (
                        <div className="text-xs bg-blue-100 text-blue-800 p-1 rounded mb-1 truncate">
                          Audit PT Maju Bersama
                        </div>
                      )}
                      {hasEvent && i % 3 === 0 && (
                        <div className="text-xs bg-amber-100 text-amber-800 p-1 rounded truncate">
                          Review Pajak CV Teknologi
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add Schedule Form Modal */}
      <AddAuditScheduleForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
      />
    </div>
  );
};

export default AuditSchedule;
