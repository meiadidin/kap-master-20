
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Folder, Search, UploadCloud, FolderPlus, Eye, Download, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

// Sample data for mitra documents
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

// Sample data for mitra folders
const mitraFolders = [
  {
    id: 1,
    name: "Laporan Keuangan",
    documentsCount: 12,
    lastModified: "2024-04-16T10:30:00"
  },
  {
    id: 2,
    name: "Dokumen Pajak",
    documentsCount: 8,
    lastModified: "2024-04-12T14:15:00"
  },
  {
    id: 3,
    name: "Audit",
    documentsCount: 15,
    lastModified: "2024-04-08T09:45:00"
  }
];

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

// Chart data for audit types
const auditTypeData = [
  { name: "Laporan Keuangan", value: 10 },
  { name: "Pajak", value: 7 },
  { name: "Internal", value: 5 },
  { name: "Kepatuhan", value: 3 }
];

// Chart data for monthly audits
const monthlyAuditsData = [
  { name: "Jan", completed: 3, ongoing: 1 },
  { name: "Feb", completed: 2, ongoing: 2 },
  { name: "Mar", completed: 4, ongoing: 3 },
  { name: "Apr", completed: 1, ongoing: 4 },
  { name: "Mei", completed: 0, ongoing: 5 },
  { name: "Jun", completed: 0, ongoing: 3 },
];

// Chart colors
const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#6366f1"];

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

type UserData = {
  name: string;
  email: string;
  role: string;
};

const MitraDocumentManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("documents");
  
  // Filter documents based on search term
  const filteredDocuments = mitraDocuments.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    doc.client.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Filter folders based on search term
  const filteredFolders = mitraFolders.filter(folder => 
    folder.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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

  // Calculate statistics
  const totalDocuments = mitraDocuments.length;
  const completedDocuments = mitraDocuments.filter(doc => doc.status === "completed").length;
  const inProgressDocuments = mitraDocuments.filter(doc => doc.status === "in_progress").length;
  const reviewDocuments = mitraDocuments.filter(doc => doc.status === "review").length;
  
  return (
    <div className="space-y-6">
      {/* Header - Audit Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6 flex items-center">
            <div className="bg-blue-500 p-3 rounded-full mr-4">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-blue-700 font-medium">Total Dokumen</p>
              <h3 className="text-2xl font-bold text-blue-900">{totalDocuments}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6 flex items-center">
            <div className="bg-green-500 p-3 rounded-full mr-4">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-green-700 font-medium">Dokumen Selesai</p>
              <h3 className="text-2xl font-bold text-green-900">{completedDocuments}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardContent className="p-6 flex items-center">
            <div className="bg-amber-500 p-3 rounded-full mr-4">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-amber-700 font-medium">Dalam Proses</p>
              <h3 className="text-2xl font-bold text-amber-900">{inProgressDocuments}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6 flex items-center">
            <div className="bg-purple-500 p-3 rounded-full mr-4">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-purple-700 font-medium">Dokumen Review</p>
              <h3 className="text-2xl font-bold text-purple-900">{reviewDocuments}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Audit Progress Dashboard */}
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribusi Jenis Audit</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={auditTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {auditTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Audit Bulanan 2024</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyAuditsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" name="Selesai" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="ongoing" name="Dalam Proses" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Document Management Section */}
      <Card>
        <CardHeader>
          <CardTitle>Dokumen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Cari dokumen atau folder..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button className="flex items-center gap-2">
                <UploadCloud size={18} />
                <span>Unggah File</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <FolderPlus size={18} />
                <span>Buat Folder</span>
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="documents" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="documents" className="flex items-center">
                <FileText size={16} className="mr-2" />
                Dokumen
              </TabsTrigger>
              <TabsTrigger value="folders" className="flex items-center">
                <Folder size={16} className="mr-2" />
                Folder
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="documents" className="mt-4">
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama Dokumen</TableHead>
                      <TableHead>Klien</TableHead>
                      <TableHead>Terakhir Diubah</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDocuments.length > 0 ? (
                      filteredDocuments.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell>
                            <div className="flex items-center">
                              <FileText size={16} className="mr-2 text-kap-blue" />
                              <span>{doc.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{doc.client}</TableCell>
                          <TableCell>{formatDate(doc.lastModified)}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={statusColors[doc.status]}>
                              {statusLabels[doc.status]}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <Eye size={16} />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <Download size={16} />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <Send size={16} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                          Tidak ada dokumen yang ditemukan
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="folders" className="mt-4">
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama Folder</TableHead>
                      <TableHead>Jumlah Dokumen</TableHead>
                      <TableHead>Terakhir Diubah</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFolders.length > 0 ? (
                      filteredFolders.map((folder) => (
                        <TableRow key={folder.id}>
                          <TableCell>
                            <div className="flex items-center">
                              <Folder size={16} className="mr-2 text-kap-navy" />
                              <span>{folder.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{folder.documentsCount} dokumen</TableCell>
                          <TableCell>{formatDate(folder.lastModified)}</TableCell>
                          <TableCell className="text-right">
                            <Button size="sm" variant="outline">Buka</Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                          Tidak ada folder yang ditemukan
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default MitraDocumentManager;
