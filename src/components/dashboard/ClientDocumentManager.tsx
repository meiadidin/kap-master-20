
import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import {
  FileText,
  FolderPlus,
  Search,
  Eye,
  Download,
  FolderOpen,
  UploadCloud,
  Plus,
  Trash2,
  MoreVertical,
  X,
  File
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

interface FileWithPreview extends File {
  id: string;
  preview?: string;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  error?: string;
}

const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'image/jpeg',
  'image/png'
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const ClientDocumentManager = ({ currentUser }: { currentUser: UserData }) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("documents");
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [newFolderDialogOpen, setNewFolderDialogOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{id: number, name: string, type: 'folder' | 'document'} | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<FileWithPreview[]>([]);
  
  // Sample data for client documents
  const [clientDocuments, setClientDocuments] = useState<Document[]>([
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
  ]);

  // Sample data for client folders
  const [clientFolders, setClientFolders] = useState<Folder[]>([
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
  ]);
  
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
  
  // File upload handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    const newFiles: FileWithPreview[] = Array.from(e.target.files).map(file => ({
      ...file,
      id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      progress: 0,
      status: 'uploading'
    }));
    
    // Validate files
    const validFiles = newFiles.filter(file => {
      // Check file type
      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        toast({
          title: "Format file tidak didukung",
          description: `File ${file.name} memiliki format yang tidak didukung`,
          variant: "destructive",
        });
        return false;
      }
      
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "Ukuran file terlalu besar",
          description: `File ${file.name} melebihi batas ukuran 10MB`,
          variant: "destructive",
        });
        return false;
      }
      
      return true;
    });
    
    if (validFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...validFiles]);
      
      // For each file, create a preview if it's an image
      validFiles.forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setUploadedFiles(files => 
              files.map(f => 
                f.id === file.id 
                  ? { ...f, preview: reader.result as string } 
                  : f
              )
            );
          };
          reader.readAsDataURL(file);
        }
        
        // Simulate upload progress
        simulateFileUpload(file.id);
      });
    }
  };
  
  const simulateFileUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 5;
      
      if (progress >= 100) {
        clearInterval(interval);
        progress = 100;
        
        setUploadedFiles(files => 
          files.map(file => 
            file.id === fileId 
              ? { ...file, progress: 100, status: 'success' } 
              : file
          )
        );
        
        // Add the file to documents after "upload" completes
        setUploadedFiles(files => {
          const uploadedFile = files.find(file => file.id === fileId);
          if (uploadedFile && uploadedFile.status === 'success') {
            const newDoc = {
              id: Date.now(),
              name: uploadedFile.name,
              type: uploadedFile.type.split('/')[1].toUpperCase(),
              uploadDate: new Date().toISOString(),
              status: "Aktif",
              size: `${(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB`
            };
            
            setClientDocuments(prev => [...prev, newDoc]);
          }
          return files;
        });
      } else {
        setUploadedFiles(files => 
          files.map(file => 
            file.id === fileId 
              ? { ...file, progress } 
              : file
          )
        );
      }
    }, 300);
  };
  
  const removeUploadedFile = (fileId: string) => {
    setUploadedFiles(files => files.filter(file => file.id !== fileId));
  };

  // Handle folder operations
  const handleCreateFolder = () => {
    if (!newFolderName.trim()) {
      toast({
        title: "Nama folder diperlukan",
        description: "Silakan masukkan nama folder",
        variant: "destructive",
      });
      return;
    }
    
    const newFolder: Folder = {
      id: Date.now(),
      name: newFolderName.trim(),
      documentsCount: 0,
      lastModified: new Date().toISOString()
    };
    
    setClientFolders(prev => [...prev, newFolder]);
    setNewFolderName("");
    setNewFolderDialogOpen(false);
    
    toast({
      title: "Folder berhasil dibuat",
      description: `Folder "${newFolderName}" telah dibuat`,
    });
  };
  
  const openDeleteDialog = (id: number, name: string, type: 'folder' | 'document') => {
    setItemToDelete({ id, name, type });
    setDeleteDialogOpen(true);
  };
  
  const handleDeleteItem = () => {
    if (!itemToDelete) return;
    
    if (itemToDelete.type === 'folder') {
      setClientFolders(folders => folders.filter(folder => folder.id !== itemToDelete.id));
      toast({
        title: "Folder dihapus",
        description: `Folder "${itemToDelete.name}" telah dihapus`
      });
    } else {
      setClientDocuments(docs => docs.filter(doc => doc.id !== itemToDelete.id));
      toast({
        title: "Dokumen dihapus",
        description: `Dokumen "${itemToDelete.name}" telah dihapus`
      });
    }
    
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };
  
  const handleFolderClick = (folderName: string) => {
    // In a real app, you would navigate to the folder contents
    // For this demo, we'll show a toast
    toast({
      title: "Folder dibuka",
      description: `Membuka folder: ${folderName}`,
    });
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
              <Button 
                className="flex items-center gap-2"
                onClick={() => setUploadDialogOpen(true)}
              >
                <UploadCloud size={18} />
                <span>Unggah File</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => setNewFolderDialogOpen(true)}
              >
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
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                  <MoreVertical size={16} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem className="flex items-center">
                                  <Eye size={16} className="mr-2" />
                                  <span>Lihat</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center">
                                  <Download size={16} className="mr-2" />
                                  <span>Unduh</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="flex items-center text-red-500"
                                  onClick={() => openDeleteDialog(doc.id, doc.name, 'document')}
                                >
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
                            <Button 
                              variant="ghost" 
                              className="flex items-center p-0 hover:bg-transparent text-left" 
                              onClick={() => handleFolderClick(folder.name)}
                            >
                              <FolderOpen size={16} className="mr-2 text-kap-navy" />
                              <span>{folder.name}</span>
                            </Button>
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
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem 
                                  className="flex items-center"
                                  onClick={() => handleFolderClick(folder.name)}
                                >
                                  <FolderOpen size={16} className="mr-2" />
                                  <span>Buka</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="flex items-center text-red-500"
                                  onClick={() => openDeleteDialog(folder.id, folder.name, 'folder')}
                                >
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
      
      {/* Upload File Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Unggah File</DialogTitle>
            <DialogDescription>
              Unggah dokumen untuk disimpan dalam sistem
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:bg-gray-50 transition">
              <label className="flex flex-col items-center gap-2 cursor-pointer">
                <UploadCloud className="h-10 w-10 text-gray-400" />
                <span className="text-sm font-medium text-gray-600">
                  Seret file ke sini atau klik untuk memilih
                </span>
                <span className="text-xs text-gray-500">
                  Mendukung PDF, Word, Excel, PowerPoint, JPG, PNG. Maks 10MB per file.
                </span>
                <input
                  type="file"
                  className="hidden"
                  multiple
                  onChange={handleFileChange}
                  accept={ACCEPTED_FILE_TYPES.join(',')}
                />
              </label>
            </div>
            
            {uploadedFiles.length > 0 && (
              <div className="space-y-4 mt-4">
                <h4 className="text-sm font-medium">Files</h4>
                <div className="space-y-2">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="border rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          {file.preview ? (
                            <img 
                              src={file.preview} 
                              alt={file.name}
                              className="h-10 w-10 object-cover rounded"
                            />
                          ) : (
                            <File className="h-10 w-10 text-gray-400" />
                          )}
                          <div>
                            <p className="text-sm font-medium truncate" title={file.name}>
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-gray-500"
                          onClick={() => removeUploadedFile(file.id)}
                        >
                          <X size={16} />
                        </Button>
                      </div>
                      
                      <div className="mt-2">
                        <Progress value={file.progress} className="h-2" />
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-500">
                            {file.status === 'uploading' 
                              ? `Mengunggah... ${file.progress}%` 
                              : file.status === 'success' 
                                ? 'Berhasil diunggah' 
                                : 'Gagal mengunggah'}
                          </span>
                          {file.status === 'success' && (
                            <span className="text-xs text-green-500">Selesai</span>
                          )}
                          {file.status === 'error' && (
                            <span className="text-xs text-red-500">{file.error}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setUploadDialogOpen(false);
                setUploadedFiles([]);
              }}
            >
              Tutup
            </Button>
            <Button
              type="submit"
              onClick={() => {
                // In a real app, you would finalize the upload here
                toast({
                  title: "Unggah berhasil",
                  description: `${uploadedFiles.filter(f => f.status === 'success').length} file berhasil diunggah`,
                });
                setUploadDialogOpen(false);
                setUploadedFiles([]);
              }}
            >
              Selesai
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Create Folder Dialog */}
      <Dialog open={newFolderDialogOpen} onOpenChange={setNewFolderDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Buat Folder Baru</DialogTitle>
            <DialogDescription>
              Masukkan nama untuk folder baru Anda
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <Input
              placeholder="Nama Folder"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setNewFolderDialogOpen(false)}
            >
              Batal
            </Button>
            <Button onClick={handleCreateFolder}>
              Buat
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus {itemToDelete?.type === 'folder' ? 'folder' : 'dokumen'} "{itemToDelete?.name}"?
              {itemToDelete?.type === 'folder' && ' Semua dokumen dalam folder ini juga akan dihapus.'}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Batal
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDeleteItem}
            >
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientDocumentManager;
