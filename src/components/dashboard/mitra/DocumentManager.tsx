
import { useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  FileText, 
  Folder, 
  Search, 
  UploadCloud, 
  FolderPlus, 
  Eye, 
  Download, 
  Send, 
  Trash2,
  FileEdit,
  MoreVertical
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

const DocumentManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("documents");
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  
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

  // Handle navigation
  const navigateToFolder = (folderName: string) => {
    setCurrentPath([...currentPath, folderName]);
  };

  const navigateUp = () => {
    if (currentPath.length > 0) {
      setCurrentPath(currentPath.slice(0, -1));
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Manajemen Dokumen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center text-sm text-gray-500">
            <Button 
              variant="ghost" 
              size="sm" 
              className="font-medium hover:bg-gray-100" 
              onClick={() => setCurrentPath([])}
            >
              Root
            </Button>
            
            {currentPath.map((folder, index) => (
              <div key={index} className="flex items-center">
                <span className="mx-1">/</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="font-medium hover:bg-gray-100"
                  onClick={() => setCurrentPath(currentPath.slice(0, index + 1))}
                >
                  {folder}
                </Button>
              </div>
            ))}
          </div>

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
          
          <Separator />
          
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
                    {currentPath.length > 0 && (
                      <TableRow>
                        <TableCell colSpan={5}>
                          <Button 
                            variant="ghost"
                            size="sm"
                            className="flex items-center text-gray-500"
                            onClick={navigateUp}
                          >
                            <Folder size={16} className="mr-2" />
                            ..
                          </Button>
                        </TableCell>
                      </TableRow>
                    )}
                    
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
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                  <MoreVertical size={16} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem className="flex items-center">
                                  <Eye size={16} className="mr-2" />
                                  <span>Lihat</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center">
                                  <Download size={16} className="mr-2" />
                                  <span>Unduh</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center">
                                  <FileEdit size={16} className="mr-2" />
                                  <span>Edit</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center text-red-600">
                                  <Trash2 size={16} className="mr-2" />
                                  <span>Hapus</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
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
                    {currentPath.length > 0 && (
                      <TableRow>
                        <TableCell colSpan={4}>
                          <Button 
                            variant="ghost"
                            size="sm"
                            className="flex items-center text-gray-500"
                            onClick={navigateUp}
                          >
                            <Folder size={16} className="mr-2" />
                            ..
                          </Button>
                        </TableCell>
                      </TableRow>
                    )}
                    
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
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                  <MoreVertical size={16} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem 
                                  className="flex items-center"
                                  onClick={() => navigateToFolder(folder.name)}
                                >
                                  <Eye size={16} className="mr-2" />
                                  <span>Buka</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center">
                                  <FileEdit size={16} className="mr-2" />
                                  <span>Rename</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center text-red-600">
                                  <Trash2 size={16} className="mr-2" />
                                  <span>Hapus</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
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

export default DocumentManager;
