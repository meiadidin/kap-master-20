
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  FileText,
  FolderPlus,
  Search,
  Eye,
  Download,
  FolderOpen,
  UploadCloud,
  Plus,
} from "lucide-react";

interface UserData {
  name: string;
  email: string;
  role: string;
}

interface Document {
  id: number;
  name: string;
  type: string;
  uploadDate: string;
  status: string;
  size: string;
}

interface Folder {
  id: number;
  name: string;
  documentsCount: number;
  lastModified: string;
}

const ClientDocumentManager = ({ currentUser }: { currentUser: UserData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("documents");
  
  // Sample data for client documents
  const clientDocuments: Document[] = [
    {
      id: 1,
      name: "Laporan Keuangan 2023",
      type: "Laporan Keuangan",
      uploadDate: "2023-12-15T08:30:00",
      status: "Selesai",
      size: "2.4 MB"
    },
    {
      id: 2,
      name: "Proyeksi Keuangan 2024",
      type: "Laporan Keuangan",
      uploadDate: "2024-01-15T13:40:00",
      status: "Aktif",
      size: "1.5 MB"
    },
    {
      id: 3,
      name: "Bukti Transaksi Q1 2023",
      type: "Transaksi",
      uploadDate: "2023-04-10T10:15:00",
      status: "Selesai",
      size: "3.2 MB"
    },
    {
      id: 4,
      name: "Bukti Pajak PPh 21",
      type: "Pajak",
      uploadDate: "2024-02-20T09:20:00",
      status: "Review",
      size: "1.8 MB"
    }
  ];

  // Sample data for client folders
  const clientFolders: Folder[] = [
    {
      id: 1,
      name: "Laporan Keuangan",
      documentsCount: 5,
      lastModified: "2024-03-10T14:30:00"
    },
    {
      id: 2,
      name: "Dokumen Pajak",
      documentsCount: 3,
      lastModified: "2024-02-15T10:20:00"
    },
    {
      id: 3,
      name: "Bukti Transaksi",
      documentsCount: 8,
      lastModified: "2024-01-05T08:45:00"
    }
  ];
  
  // Filter documents based on search term
  const filteredDocuments = clientDocuments.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    doc.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Filter folders based on search term
  const filteredFolders = clientFolders.filter(folder => 
    folder.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Format date
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd MMMM yyyy, HH:mm", { locale: id });
  };

  // Function to get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Selesai":
        return "bg-green-100 text-green-800";
      case "Aktif":
        return "bg-blue-100 text-blue-800";
      case "Review":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Dokumen</CardTitle>
          <p className="text-sm text-gray-500">
            Dokumen yang terkait dengan akun {currentUser.name}
          </p>
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
                <FolderOpen size={16} className="mr-2" />
                Folder
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="documents" className="mt-4">
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama Dokumen</TableHead>
                      <TableHead>Tipe</TableHead>
                      <TableHead>Tanggal Unggah</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ukuran</TableHead>
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
                          <TableCell>{doc.type}</TableCell>
                          <TableCell>{formatDate(doc.uploadDate)}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusBadgeColor(doc.status)}>
                              {doc.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{doc.size}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <Eye size={16} />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <Download size={16} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-gray-500">
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
                              <FolderOpen size={16} className="mr-2 text-kap-navy" />
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

export default ClientDocumentManager;
