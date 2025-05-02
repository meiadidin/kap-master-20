
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Mail, Phone, Calendar, User, Briefcase, Search, ChevronDown, Plus, Filter } from "lucide-react";

// Data tim
const teamData = [
  {
    id: 1,
    name: "Ahmad Faisal",
    position: "Senior Auditor",
    department: "Audit",
    email: "ahmad.faisal@kapgar.com",
    phone: "081234567890",
    workload: 85,
    experience: "5 tahun",
    expertise: ["Audit Keuangan", "Audit Internal"],
    avatar: "AF"
  },
  {
    id: 2,
    name: "Siti Rahma",
    position: "Manager Pajak",
    department: "Pajak",
    email: "siti.rahma@kapgar.com",
    phone: "081234567891",
    workload: 75,
    experience: "7 tahun",
    expertise: ["PPh Badan", "PPN", "Tax Planning"],
    avatar: "SR"
  },
  {
    id: 3,
    name: "Budi Santoso",
    position: "Junior Auditor",
    department: "Audit",
    email: "budi.santoso@kapgar.com",
    phone: "081234567892",
    workload: 90,
    experience: "2 tahun",
    expertise: ["Audit Keuangan"],
    avatar: "BS"
  },
  {
    id: 4,
    name: "Diana Putri",
    position: "Senior Tax Consultant",
    department: "Pajak",
    email: "diana.putri@kapgar.com",
    phone: "081234567893",
    workload: 60,
    experience: "6 tahun",
    expertise: ["PPh Badan", "Perencanaan Pajak", "Transfer Pricing"],
    avatar: "DP"
  },
  {
    id: 5,
    name: "Rio Andika",
    position: "Senior Consultant",
    department: "Konsultasi",
    email: "rio.andika@kapgar.com",
    phone: "081234567894",
    workload: 80,
    experience: "5 tahun",
    expertise: ["Manajemen Risiko", "Due Diligence"],
    avatar: "RA"
  },
  {
    id: 6,
    name: "Anita Wijaya",
    position: "Accounting Staff",
    department: "Akuntansi",
    email: "anita.wijaya@kapgar.com",
    phone: "081234567895",
    workload: 70,
    experience: "3 tahun",
    expertise: ["Laporan Keuangan", "Rekonsiliasi"],
    avatar: "AW"
  }
];

// Filter departemen
const departments = ["Semua", "Audit", "Pajak", "Konsultasi", "Akuntansi"];

// Menentukan warna badge berdasarkan workload
const getWorkloadColor = (workload: number) => {
  if (workload >= 90) return "bg-red-100 text-red-800";
  if (workload >= 70) return "bg-amber-100 text-amber-800";
  return "bg-green-100 text-green-800";
};

const TeamManagement = () => {
  const [filter, setFilter] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState<typeof teamData[0] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Filter tim berdasarkan departemen dan query pencarian
  const filteredTeam = teamData.filter(member => 
    (filter === "Semua" || member.department === filter) &&
    (member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     member.position.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Manajemen Tim</h1>
        
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Cari anggota tim..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <div className="flex items-center gap-2">
                <Filter size={16} />
                <SelectValue placeholder="Filter Departemen" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Departemen</SelectLabel>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            <span>Tambah Anggota</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTeam.map((member) => (
          <Card key={member.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-kap-navy text-white">
                    {member.avatar}
                  </AvatarFallback>
                </Avatar>
                <Badge className={getWorkloadColor(member.workload)}>
                  Beban Kerja: {member.workload}%
                </Badge>
              </div>
              <CardTitle className="text-lg mt-3">{member.name}</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <Briefcase size={14} />
                <span>{member.position}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Mail size={16} className="text-gray-500 mt-0.5" />
                  <span className="text-sm">{member.email}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Phone size={16} className="text-gray-500 mt-0.5" />
                  <span className="text-sm">{member.phone}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar size={16} className="text-gray-500 mt-0.5" />
                  <span className="text-sm">Pengalaman: {member.experience}</span>
                </div>
              </div>
              
              <div className="mt-3">
                <p className="text-sm font-medium mb-2">Keahlian:</p>
                <div className="flex flex-wrap gap-1">
                  {member.expertise.map((skill, index) => (
                    <Badge key={index} variant="outline" className="bg-gray-50">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-gray-50 flex justify-between">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setSelectedMember(member);
                  setDialogOpen(true);
                }}
              >
                Lihat Detail
              </Button>
              <Button variant="ghost" size="sm">Atur Tugas</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredTeam.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-gray-500">Tidak ada anggota tim yang sesuai dengan filter</p>
        </Card>
      )}
      
      {/* Dialog Detail Anggota Tim */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          {selectedMember && (
            <>
              <DialogHeader>
                <DialogTitle>Detail Anggota Tim</DialogTitle>
                <DialogDescription>
                  Informasi lengkap mengenai anggota tim
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-kap-navy text-white text-xl">
                      {selectedMember.avatar}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h3 className="text-lg font-semibold">{selectedMember.name}</h3>
                    <p className="text-gray-500 flex items-center gap-1">
                      <Briefcase size={14} />
                      <span>{selectedMember.position}</span>
                    </p>
                    <Badge className="mt-1">{selectedMember.department}</Badge>
                  </div>
                </div>
                
                <div className="space-y-3 border-t border-b py-3">
                  <div className="flex items-start gap-3">
                    <User size={18} className="text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Pengalaman</p>
                      <p className="text-sm text-gray-500">{selectedMember.experience}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Mail size={18} className="text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-gray-500">{selectedMember.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone size={18} className="text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Telepon</p>
                      <p className="text-sm text-gray-500">{selectedMember.phone}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Keahlian:</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedMember.expertise.map((skill, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-50">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium">Beban Kerja:</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          selectedMember.workload >= 90 ? 'bg-red-600' : 
                          selectedMember.workload >= 70 ? 'bg-amber-500' : 'bg-green-600'
                        }`}
                        style={{ width: `${selectedMember.workload}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{selectedMember.workload}%</span>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Tutup
                </Button>
                <Button>
                  Edit Profil
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamManagement;
