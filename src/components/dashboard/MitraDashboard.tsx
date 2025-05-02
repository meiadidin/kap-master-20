
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Folder, Search, BarChart3, PieChart, FileClock } from "lucide-react";
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
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

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
  },
  {
    id: 4,
    name: "Klien Baru",
    documentsCount: 5,
    lastModified: "2024-04-02T11:20:00"
  },
  {
    id: 5,
    name: "Arsip",
    documentsCount: 30,
    lastModified: "2024-03-25T13:10:00"
  }
];

// Chart data
const documentTypeData = [
  { name: "Laporan Keuangan", value: 12 },
  { name: "Audit", value: 8 },
  { name: "Pajak", value: 15 },
  { name: "Lainnya", value: 5 }
];

const documentsMonthlyData = [
  { name: "Jan", documents: 5 },
  { name: "Feb", documents: 8 },
  { name: "Mar", documents: 12 },
  { name: "Apr", documents: 15 },
  { name: "Mei", documents: 10 },
  { name: "Jun", documents: 18 },
];

const activityData = [
  { name: "Senin", views: 15, edits: 5, downloads: 3 },
  { name: "Selasa", views: 20, edits: 8, downloads: 6 },
  { name: "Rabu", views: 25, edits: 12, downloads: 8 },
  { name: "Kamis", views: 18, edits: 6, downloads: 4 },
  { name: "Jumat", views: 22, edits: 9, downloads: 7 },
];

const statusColors: Record<string, string> = {
  completed: "bg-green-100 text-green-800",
  in_progress: "bg-blue-100 text-blue-800",
  review: "bg-amber-100 text-amber-800",
  pending: "bg-purple-100 text-purple-800"
};

const statusLabels: Record<string, string> = {
  completed: "Selesai",
  in_progress: "Dalam Proses",
  review: "Review",
  pending: "Pending"
};

// Pie chart colors
const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#6366f1"];

type UserData = {
  name: string;
  email: string;
  role: string;
};

const MitraDashboard = ({ currentUser }: { currentUser: UserData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  
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
    return format(new Date(dateString), "dd MMMM yyyy, HH:mm", { locale: id });
  };

  // Calculate statistics
  const totalDocuments = mitraDocuments.length;
  const completedDocuments = mitraDocuments.filter(doc => doc.status === "completed").length;
  const inProgressDocuments = mitraDocuments.filter(doc => doc.status === "in_progress").length;
  const reviewDocuments = mitraDocuments.filter(doc => doc.status === "review").length;
  
  return (
    <div className="space-y-6">
      {/* Header with Statistics */}
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
              <FileClock className="h-6 w-6 text-white" />
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
              <PieChart className="h-6 w-6 text-white" />
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
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-purple-700 font-medium">Dokumen Review</p>
              <h3 className="text-2xl font-bold text-purple-900">{reviewDocuments}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribusi Jenis Dokumen</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ChartContainer className="h-80" config={{
              pie: { label: "Jenis Dokumen", color: "#3b82f6" }
            }}>
              <RechartsPieChart>
                <Pie
                  data={documentTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {documentTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
              </RechartsPieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dokumen Bulanan</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-80" config={{
              documents: { label: "Jumlah Dokumen", color: "#3b82f6" }
            }}>
              <BarChart data={documentsMonthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="documents" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Aktivitas Mingguan</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer className="h-64" config={{
            views: { label: "Dilihat", color: "#3b82f6" },
            edits: { label: "Diedit", color: "#10b981" },
            downloads: { label: "Diunduh", color: "#f59e0b" }
          }}>
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="edits" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="downloads" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      {/* Status Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Status Dokumen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Selesai</span>
              <span className="text-sm font-medium">{completedDocuments}/{totalDocuments}</span>
            </div>
            <Progress value={completedDocuments / totalDocuments * 100} className="h-2 bg-blue-100">
              <div className="h-full bg-green-500 rounded-full" />
            </Progress>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Dalam Proses</span>
              <span className="text-sm font-medium">{inProgressDocuments}/{totalDocuments}</span>
            </div>
            <Progress value={inProgressDocuments / totalDocuments * 100} className="h-2 bg-blue-100">
              <div className="h-full bg-blue-500 rounded-full" />
            </Progress>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Review</span>
              <span className="text-sm font-medium">{reviewDocuments}/{totalDocuments}</span>
            </div>
            <Progress value={reviewDocuments / totalDocuments * 100} className="h-2 bg-blue-100">
              <div className="h-full bg-amber-500 rounded-full" />
            </Progress>
          </div>
        </CardContent>
      </Card>

      {/* Document Management Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Manajemen Dokumen Mitra</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Cari dokumen atau folder..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
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
                            <Button size="sm" variant="outline">Lihat</Button>
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

export default MitraDashboard;
