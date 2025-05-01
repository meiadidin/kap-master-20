
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Search,
  FileUp,
  FileText,
  Download,
  Eye,
  Trash2,
  Calendar,
  User,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { id } from "date-fns/locale";

type UserData = {
  name: string;
  email: string;
  role: string;
};

interface Document {
  id: number;
  name: string;
  client: string;
  clientId: number;
  type: string;
  uploadDate: string;
  uploadedBy: string;
  status: string;
  description: string;
  size: string;
}

// Dummy clients for select dropdown
const dummyClients = [
  { id: 1, name: "PT Maju Bersama" },
  { id: 2, name: "CV Teknologi Nusantara" },
  { id: 3, name: "PT Sejahtera Abadi" },
  { id: 4, name: "PT Bintang Timur" },
  { id: 5, name: "PT Global Indonesia" },
  { id: 6, name: "CV Mandiri Jaya" },
  { id: 7, name: "PT Sinar Mas" },
  { id: 8, name: "PT Karya Utama" },
  { id: 9, name: "CV Abadi Makmur" },
  { id: 10, name: "PT Sukses Sentosa" }
];

// Dummy documents data
const dummyDocuments = [
  {
    id: 1,
    name: "Laporan Keuangan 2023",
    client: "PT Maju Bersama",
    clientId: 1,
    type: "financial",
    uploadDate: "2023-12-15T08:30:00",
    uploadedBy: "Admin",
    status: "completed",
    description: "Laporan keuangan tahunan untuk tahun 2023",
    size: "2.4 MB"
  },
  {
    id: 2,
    name: "Invoice Audit Q1",
    client: "PT Sejahtera Abadi",
    clientId: 3,
    type: "invoice",
    uploadDate: "2024-01-10T10:15:00",
    uploadedBy: "Manager",
    status: "pending",
    description: "Invoice untuk layanan audit kuartal pertama",
    size: "850 KB"
  },
  {
    id: 3,
    name: "Laporan Pajak Tahunan",
    client: "CV Teknologi Nusantara",
    clientId: 2,
    type: "tax",
    uploadDate: "2023-11-25T14:45:00",
    uploadedBy: "Auditor",
    status: "completed",
    description: "Laporan pajak tahunan untuk tahun pajak 2023",
    size: "3.1 MB"
  },
  {
    id: 4,
    name: "Dokumen Registrasi",
    client: "PT Bintang Timur",
    clientId: 4,
    type: "registration",
    uploadDate: "2024-02-05T09:20:00",
    uploadedBy: "Admin",
    status: "active",
    description: "Dokumen registrasi klien baru",
    size: "1.7 MB"
  },
  {
    id: 5,
    name: "Audit Internal Q4",
    client: "PT Global Indonesia",
    clientId: 5,
    type: "audit",
    uploadDate: "2023-12-28T11:30:00",
    uploadedBy: "Auditor",
    status: "review",
    description: "Laporan audit internal kuartal keempat 2023",
    size: "4.2 MB"
  },
  {
    id: 6,
    name: "Proyeksi Keuangan 2024",
    client: "PT Maju Bersama",
    clientId: 1,
    type: "financial",
    uploadDate: "2024-01-15T13:40:00",
    uploadedBy: "Manager",
    status: "active",
    description: "Proyeksi keuangan untuk tahun 2024",
    size: "1.5 MB"
  },
  {
    id: 7,
    name: "SPT Masa Januari",
    client: "CV Teknologi Nusantara",
    clientId: 2,
    type: "tax",
    uploadDate: "2024-02-10T15:25:00",
    uploadedBy: "Auditor",
    status: "pending",
    description: "SPT Masa PPN Januari 2024",
    size: "980 KB"
  },
  {
    id: 8,
    name: "Surat Penawaran Audit",
    client: "PT Karya Utama",
    clientId: 8,
    type: "proposal",
    uploadDate: "2024-01-28T09:15:00",
    uploadedBy: "Admin",
    status: "completed",
    description: "Surat penawaran jasa audit tahunan",
    size: "720 KB"
  },
  {
    id: 9,
    name: "Surat Perjanjian Kerja",
    client: "CV Abadi Makmur",
    clientId: 9,
    type: "contract",
    uploadDate: "2024-02-18T10:45:00",
    uploadedBy: "Manager",
    status: "active",
    description: "Kontrak kerjasama audit tahunan",
    size: "1.2 MB"
  },
  {
    id: 10,
    name: "Hasil Audit 2023",
    client: "PT Sukses Sentosa",
    clientId: 10,
    type: "audit",
    uploadDate: "2023-12-20T16:30:00",
    uploadedBy: "Auditor",
    status: "completed",
    description: "Laporan hasil audit tahun 2023",
    size: "5.7 MB"
  },
  {
    id: 11,
    name: "Bukti Potong PPh 23",
    client: "PT Sejahtera Abadi",
    clientId: 3,
    type: "tax",
    uploadDate: "2024-02-15T11:00:00",
    uploadedBy: "Admin",
    status: "active",
    description: "Bukti potong PPh pasal 23",
    size: "650 KB"
  },
  {
    id: 12,
    name: "Draft Laporan Audit",
    client: "PT Global Indonesia",
    clientId: 5,
    type: "audit",
    uploadDate: "2024-01-22T14:20:00",
    uploadedBy: "Auditor",
    status: "review",
    description: "Draft awal laporan audit 2023",
    size: "3.8 MB"
  },
  {
    id: 13,
    name: "Koreksi Fiskal 2023",
    client: "PT Bintang Timur",
    clientId: 4,
    type: "tax",
    uploadDate: "2024-01-30T09:40:00",
    uploadedBy: "Manager",
    status: "completed",
    description: "Laporan koreksi fiskal 2023",
    size: "2.1 MB"
  },
  {
    id: 14,
    name: "Memo Audit Persediaan",
    client: "CV Mandiri Jaya",
    clientId: 6,
    type: "audit",
    uploadDate: "2024-02-08T13:15:00",
    uploadedBy: "Auditor",
    status: "active",
    description: "Memo audit untuk persediaan",
    size: "1.3 MB"
  },
  {
    id: 15,
    name: "Surat Konfirmasi Piutang",
    client: "PT Sinar Mas",
    clientId: 7,
    type: "audit",
    uploadDate: "2024-02-12T10:30:00",
    uploadedBy: "Admin",
    status: "pending",
    description: "Surat konfirmasi piutang untuk audit",
    size: "950 KB"
  }
];

const documentTypes = [
  { value: "financial", label: "Laporan Keuangan" },
  { value: "tax", label: "Dokumen Pajak" },
  { value: "audit", label: "Laporan Audit" },
  { value: "invoice", label: "Invoice" },
  { value: "registration", label: "Dokumen Registrasi" },
  { value: "contract", label: "Kontrak/Perjanjian" },
  { value: "proposal", label: "Proposal" },
  { value: "other", label: "Lainnya" }
];

const statusColors: Record<string, string> = {
  completed: "bg-green-100 text-green-800",
  active: "bg-blue-100 text-blue-800",
  pending: "bg-amber-100 text-amber-800",
  review: "bg-purple-100 text-purple-800"
};

const statusLabels: Record<string, string> = {
  completed: "Selesai",
  active: "Aktif",
  pending: "Pending",
  review: "Review"
};

const DocumentsList = ({ currentUser }: { currentUser: UserData }) => {
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Document[]>(dummyDocuments);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClient, setFilterClient] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [viewDocumentDialogOpen, setViewDocumentDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  // For client filtering - get only documents for this client if user is a client
  const clientView = currentUser.role === "client";
  const clientDocuments = clientView
    ? documents.filter(doc => doc.client === currentUser.name)
    : documents;
  
  const [formData, setFormData] = useState({
    name: "",
    clientId: "",
    type: "",
    description: "",
    file: null as File | null,
    status: "active"
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        file: e.target.files![0]
      }));
    }
  };
  
  const handleUploadDocument = () => {
    // Validation
    if (!formData.name || !formData.clientId || !formData.type || !formData.file) {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua field yang diperlukan",
        variant: "destructive"
      });
      return;
    }
    
    // Get client name from ID
    const client = dummyClients.find(c => c.id === Number(formData.clientId));
    if (!client) return;
    
    const newDocument = {
      id: documents.length > 0 ? Math.max(...documents.map(d => d.id)) + 1 : 1,
      name: formData.name,
      client: client.name,
      clientId: Number(formData.clientId),
      type: formData.type,
      uploadDate: new Date().toISOString(),
      uploadedBy: currentUser.name,
      status: formData.status,
      description: formData.description,
      size: `${(formData.file.size / (1024 * 1024)).toFixed(1)} MB`
    };
    
    setDocuments([...documents, newDocument]);
    setUploadDialogOpen(false);
    
    toast({
      title: "Berhasil",
      description: "Dokumen berhasil diunggah"
    });
  };
  
  const handleViewDocument = (document: Document) => {
    setSelectedDocument(document);
    setViewDocumentDialogOpen(true);
  };
  
  const openDeleteConfirmation = (document: Document) => {
    setSelectedDocument(document);
    setDeleteDialogOpen(true);
  };
  
  const handleDeleteDocument = () => {
    if (selectedDocument) {
      const updatedDocuments = documents.filter(doc => doc.id !== selectedDocument.id);
      setDocuments(updatedDocuments);
      setDeleteDialogOpen(false);
      
      toast({
        title: "Berhasil",
        description: "Dokumen telah dihapus"
      });
    }
  };
  
  // Filter documents
  const filteredDocuments = clientDocuments.filter(doc => {
    const typeMatch = filterType === "all" || doc.type === filterType;
    const statusMatch = filterStatus === "all" || doc.status === filterStatus;
    const clientMatch = filterClient === "all" || doc.clientId === Number(filterClient);
    
    const searchMatch = 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return typeMatch && statusMatch && clientMatch && searchMatch;
  });
  
  // Format date
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd MMMM yyyy, HH:mm", { locale: id });
  };
  
  // Check if user has upload permission
  const hasUploadPermission = ["admin", "manager", "auditor"].includes(currentUser.role);
  const hasDeletePermission = ["admin", "manager"].includes(currentUser.role);
  
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Dokumen</CardTitle>
            <CardDescription>
              {clientView
                ? "Dokumen yang terkait dengan akun Anda"
                : "Kelola dokumen klien KAP MGI GAR SURABAYA"}
            </CardDescription>
          </div>
          
          {hasUploadPermission && (
            <Button className="mt-4 md:mt-0" onClick={() => setUploadDialogOpen(true)}>
              <FileUp size={18} className="mr-2" />
              Unggah Dokumen
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Cari dokumen..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {!clientView && (
            <Select value={filterClient} onValueChange={setFilterClient}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter Klien" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Klien</SelectItem>
                {dummyClients.map((client) => (
                  <SelectItem key={client.id} value={client.id.toString()}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter Tipe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Tipe</SelectItem>
              {documentTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="active">Aktif</SelectItem>
              <SelectItem value="completed">Selesai</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="review">Review</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="rounded-md border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Dokumen</TableHead>
                  {!clientView && <TableHead>Klien</TableHead>}
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
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <FileText className="mr-2 text-kap-blue" size={18} />
                          {doc.name}
                        </div>
                      </TableCell>
                      {!clientView && <TableCell>{doc.client}</TableCell>}
                      <TableCell>
                        {documentTypes.find(type => type.value === doc.type)?.label || doc.type}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center text-sm">
                            <Calendar size={14} className="mr-1" />
                            {formatDate(doc.uploadDate).split(",")[0]}
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock size={12} className="mr-1" />
                            {formatDate(doc.uploadDate).split(",")[1]}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusColors[doc.status]}>
                          {statusLabels[doc.status]}
                        </Badge>
                      </TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewDocument(doc)}
                          >
                            <Eye size={16} />
                            <span className="sr-only">View</span>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Download size={16} />
                            <span className="sr-only">Download</span>
                          </Button>
                          {hasDeletePermission && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-600"
                              onClick={() => openDeleteConfirmation(doc)}
                            >
                              <Trash2 size={16} />
                              <span className="sr-only">Delete</span>
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={clientView ? 6 : 7} className="text-center py-6 text-gray-500">
                      Tidak ada dokumen yang ditemukan
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
      
      {/* Upload Document Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Unggah Dokumen Baru</DialogTitle>
            <DialogDescription>
              Unggah dokumen baru untuk klien KAP MGI GAR SURABAYA
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Dokumen</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Masukkan nama dokumen"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="clientId">Klien</Label>
                <Select
                  value={formData.clientId}
                  onValueChange={(value) => handleSelectChange("clientId", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih klien" />
                  </SelectTrigger>
                  <SelectContent>
                    {dummyClients.map((client) => (
                      <SelectItem key={client.id} value={client.id.toString()}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Tipe Dokumen</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleSelectChange("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih tipe dokumen" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Aktif</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                    <SelectItem value="completed">Selesai</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Masukkan deskripsi dokumen"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="file">File</Label>
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleUploadDocument}>
              Unggah Dokumen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* View Document Dialog */}
      <Dialog open={viewDocumentDialogOpen} onOpenChange={setViewDocumentDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Detail Dokumen</DialogTitle>
          </DialogHeader>
          
          {selectedDocument && (
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <FileText className="mr-2 text-kap-blue" size={20} />
                  {selectedDocument.name}
                </h3>
                <Badge variant="outline" className="mt-2 mb-4">
                  {documentTypes.find(type => type.value === selectedDocument.type)?.label || selectedDocument.type}
                </Badge>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Klien</p>
                    <p className="font-medium">{selectedDocument.client}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Ukuran File</p>
                    <p className="font-medium">{selectedDocument.size}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Tanggal Unggah</p>
                    <p className="font-medium">{formatDate(selectedDocument.uploadDate)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Diunggah Oleh</p>
                    <p className="font-medium">{selectedDocument.uploadedBy}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Status</p>
                    <p>
                      <Badge variant="outline" className={statusColors[selectedDocument.status]}>
                        {statusLabels[selectedDocument.status]}
                      </Badge>
                    </p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-gray-500">Deskripsi</p>
                  <p className="mt-1">{selectedDocument.description}</p>
                </div>
              </div>
              
              <div className="text-center p-8 bg-gray-50 border border-dashed rounded-lg">
                <p className="text-gray-500">Pratinjau dokumen tidak tersedia</p>
                <p className="text-sm text-gray-400 mt-1">Silakan unduh dokumen untuk melihatnya</p>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setViewDocumentDialogOpen(false)}>
                  Tutup
                </Button>
                <Button>
                  <Download size={16} className="mr-2" />
                  Unduh Dokumen
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Confirm Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus dokumen "{selectedDocument?.name}"? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleDeleteDocument}>
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default DocumentsList;
