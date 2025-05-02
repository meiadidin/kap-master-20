
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Folder,
  FileText,
  ChevronRight,
  Plus,
  Upload,
  Edit,
  Trash2,
  ArrowLeft
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Types for our file system
interface FileItem {
  id: string;
  name: string;
  type: "file";
  size: number;
  lastModified: Date;
  path: string;
}

interface FolderItem {
  id: string;
  name: string;
  type: "folder";
  path: string;
  items: (FileItem | FolderItem)[];
}

type FileSystemItem = FileItem | FolderItem;

// Dummy clients data for lookup
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

// Dummy file system data
const dummyFileSystem: Record<number, FolderItem> = {
  1: {
    id: "root",
    name: "Root",
    type: "folder",
    path: "/",
    items: [
      {
        id: "folder-1",
        name: "Laporan Keuangan",
        type: "folder",
        path: "/Laporan Keuangan",
        items: [
          {
            id: "file-1",
            name: "Laporan Q1 2023.pdf",
            type: "file",
            size: 2500000,
            lastModified: new Date(2023, 2, 15),
            path: "/Laporan Keuangan/Laporan Q1 2023.pdf"
          },
          {
            id: "file-2",
            name: "Laporan Q2 2023.pdf",
            type: "file",
            size: 2700000,
            lastModified: new Date(2023, 5, 15),
            path: "/Laporan Keuangan/Laporan Q2 2023.pdf"
          }
        ]
      },
      {
        id: "folder-2",
        name: "Dokumen Pajak",
        type: "folder",
        path: "/Dokumen Pajak",
        items: [
          {
            id: "file-3",
            name: "SPT Tahunan 2022.pdf",
            type: "file",
            size: 1800000,
            lastModified: new Date(2023, 3, 10),
            path: "/Dokumen Pajak/SPT Tahunan 2022.pdf"
          },
          {
            id: "folder-3",
            name: "Bukti Potong",
            type: "folder",
            path: "/Dokumen Pajak/Bukti Potong",
            items: [
              {
                id: "file-4",
                name: "Bukti Potong PPh 23.pdf",
                type: "file",
                size: 500000,
                lastModified: new Date(2023, 1, 20),
                path: "/Dokumen Pajak/Bukti Potong/Bukti Potong PPh 23.pdf"
              }
            ]
          }
        ]
      },
      {
        id: "file-5",
        name: "Profil Perusahaan.docx",
        type: "file",
        size: 1500000,
        lastModified: new Date(2022, 11, 5),
        path: "/Profil Perusahaan.docx"
      }
    ]
  },
  // Add similar structures for other clients
  2: {
    id: "root",
    name: "Root",
    type: "folder",
    path: "/",
    items: [
      {
        id: "folder-1",
        name: "Laporan Audit",
        type: "folder",
        path: "/Laporan Audit",
        items: [
          {
            id: "file-1",
            name: "Audit Internal 2023.pdf",
            type: "file",
            size: 3200000,
            lastModified: new Date(2023, 7, 10),
            path: "/Laporan Audit/Audit Internal 2023.pdf"
          }
        ]
      }
    ]
  }
};

// Helper function to find item by path
const findItemByPath = (root: FolderItem, path: string): FileSystemItem | null => {
  if (root.path === path) return root;
  
  for (const item of root.items) {
    if (item.path === path) return item;
    if (item.type === "folder") {
      const found = findItemByPath(item, path);
      if (found) return found;
    }
  }
  
  return null;
};

// Helper function to get parent folder path
const getParentPath = (path: string): string => {
  const parts = path.split('/').filter(Boolean);
  parts.pop();
  return parts.length > 0 ? `/${parts.join('/')}` : '/';
};

const ClientDocuments = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const [client, setClient] = useState<{ id: number; name: string } | null>(null);
  const [fileSystem, setFileSystem] = useState<FolderItem | null>(null);
  const [currentPath, setCurrentPath] = useState("/");
  const [currentItems, setCurrentItems] = useState<FileSystemItem[]>([]);
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);
  
  // Dialog states
  const [newFolderDialogOpen, setNewFolderDialogOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadFileName, setUploadFileName] = useState("");
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [renameItemId, setRenameItemId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [deleteItemName, setDeleteItemName] = useState("");
  const [deleteItemType, setDeleteItemType] = useState<"file" | "folder" | null>(null);
  
  // Load client data and file system
  useEffect(() => {
    if (!clientId) return;
    
    const id = parseInt(clientId);
    const foundClient = dummyClients.find(c => c.id === id);
    
    if (foundClient) {
      setClient(foundClient);
      // Load file system for this client
      const clientFileSystem = dummyFileSystem[id] || {
        id: "root",
        name: "Root",
        type: "folder" as const,
        path: "/",
        items: []
      };
      setFileSystem(clientFileSystem);
    } else {
      toast({
        title: "Error",
        description: "Klien tidak ditemukan",
        variant: "destructive"
      });
      navigate("/dashboard");
    }
  }, [clientId, navigate, toast]);
  
  // Update current items and breadcrumbs when path or file system changes
  useEffect(() => {
    if (!fileSystem) return;
    
    const updateCurrentView = () => {
      if (currentPath === "/") {
        setCurrentItems(fileSystem.items);
        setBreadcrumbs([]);
        return;
      }
      
      const item = findItemByPath(fileSystem, currentPath);
      
      if (item && item.type === "folder") {
        setCurrentItems(item.items);
        
        // Update breadcrumbs
        const pathParts = currentPath.split('/').filter(Boolean);
        setBreadcrumbs(pathParts);
      } else {
        // If path not found, go back to root
        setCurrentPath("/");
        setCurrentItems(fileSystem.items);
        setBreadcrumbs([]);
      }
    };
    
    updateCurrentView();
  }, [currentPath, fileSystem]);
  
  const handleNavigateToFolder = (path: string) => {
    setCurrentPath(path);
  };
  
  const handleNavigateUp = () => {
    const parentPath = getParentPath(currentPath);
    setCurrentPath(parentPath);
  };
  
  const handleBreadcrumbClick = (index: number) => {
    if (index === -1) {
      // Root
      setCurrentPath("/");
    } else {
      const path = '/' + breadcrumbs.slice(0, index + 1).join('/');
      setCurrentPath(path);
    }
  };
  
  // Create new folder
  const handleCreateFolder = () => {
    if (!newFolderName.trim() || !fileSystem) return;
    
    const newFolder: FolderItem = {
      id: `folder-${Date.now()}`,
      name: newFolderName.trim(),
      type: "folder",
      path: `${currentPath === '/' ? '' : currentPath}/${newFolderName.trim()}`,
      items: []
    };
    
    // Update file system
    const updatedFileSystem = { ...fileSystem };
    
    if (currentPath === "/") {
      updatedFileSystem.items = [...updatedFileSystem.items, newFolder];
    } else {
      const currentFolder = findItemByPath(updatedFileSystem, currentPath);
      if (currentFolder && currentFolder.type === "folder") {
        currentFolder.items = [...currentFolder.items, newFolder];
      }
    }
    
    setFileSystem(updatedFileSystem);
    setNewFolderDialogOpen(false);
    setNewFolderName("");
    
    toast({
      title: "Berhasil",
      description: `Folder '${newFolder.name}' telah dibuat`
    });
  };
  
  // Upload file
  const handleUploadFile = () => {
    if (!uploadFileName.trim() || !fileSystem) return;
    
    const newFile: FileItem = {
      id: `file-${Date.now()}`,
      name: uploadFileName.trim(),
      type: "file",
      size: Math.floor(Math.random() * 5000000) + 500000, // Random size between 500KB and 5MB
      lastModified: new Date(),
      path: `${currentPath === '/' ? '' : currentPath}/${uploadFileName.trim()}`
    };
    
    // Update file system
    const updatedFileSystem = { ...fileSystem };
    
    if (currentPath === "/") {
      updatedFileSystem.items = [...updatedFileSystem.items, newFile];
    } else {
      const currentFolder = findItemByPath(updatedFileSystem, currentPath);
      if (currentFolder && currentFolder.type === "folder") {
        currentFolder.items = [...currentFolder.items, newFile];
      }
    }
    
    setFileSystem(updatedFileSystem);
    setUploadDialogOpen(false);
    setUploadFileName("");
    
    toast({
      title: "Berhasil",
      description: `File '${newFile.name}' telah diunggah`
    });
  };
  
  // Open rename dialog
  const openRenameDialog = (item: FileSystemItem) => {
    setRenameItemId(item.id);
    setRenameValue(item.name);
    setRenameDialogOpen(true);
  };
  
  // Rename item
  const handleRenameItem = () => {
    if (!renameValue.trim() || !fileSystem || !renameItemId) return;
    
    const updatedFileSystem = { ...fileSystem };
    let itemToRename: FileSystemItem | null = null;
    let parentItems: FileSystemItem[] = [];
    
    if (currentPath === "/") {
      itemToRename = updatedFileSystem.items.find(item => item.id === renameItemId) || null;
      parentItems = updatedFileSystem.items;
    } else {
      const parentFolder = findItemByPath(updatedFileSystem, currentPath);
      if (parentFolder && parentFolder.type === "folder") {
        itemToRename = parentFolder.items.find(item => item.id === renameItemId) || null;
        parentItems = parentFolder.items;
      }
    }
    
    if (itemToRename) {
      const oldName = itemToRename.name;
      itemToRename.name = renameValue.trim();
      
      // Update path for this item and all its children if it's a folder
      const updatePaths = (item: FileSystemItem, oldPath: string, newPath: string) => {
        item.path = item.path.replace(oldPath, newPath);
        
        if (item.type === "folder") {
          item.items.forEach(child => {
            updatePaths(child, oldPath, newPath);
          });
        }
      };
      
      if (itemToRename.type === "folder") {
        const oldPathSegment = `/${oldName}`;
        const newPathSegment = `/${itemToRename.name}`;
        updatePaths(itemToRename, oldPathSegment, newPathSegment);
      }
      
      setFileSystem(updatedFileSystem);
      toast({
        title: "Berhasil",
        description: `Nama telah diubah dari '${oldName}' menjadi '${itemToRename.name}'`
      });
    }
    
    setRenameDialogOpen(false);
    setRenameItemId(null);
    setRenameValue("");
  };
  
  // Open delete dialog
  const openDeleteDialog = (item: FileSystemItem) => {
    setDeleteItemId(item.id);
    setDeleteItemName(item.name);
    setDeleteItemType(item.type);
    setDeleteDialogOpen(true);
  };
  
  // Delete item
  const handleDeleteItem = () => {
    if (!fileSystem || !deleteItemId) return;
    
    const updatedFileSystem = { ...fileSystem };
    
    if (currentPath === "/") {
      updatedFileSystem.items = updatedFileSystem.items.filter(item => item.id !== deleteItemId);
    } else {
      const parentFolder = findItemByPath(updatedFileSystem, currentPath);
      if (parentFolder && parentFolder.type === "folder") {
        parentFolder.items = parentFolder.items.filter(item => item.id !== deleteItemId);
      }
    }
    
    setFileSystem(updatedFileSystem);
    setDeleteDialogOpen(false);
    setDeleteItemId(null);
    setDeleteItemName("");
    setDeleteItemType(null);
    
    toast({
      title: "Berhasil",
      description: `${deleteItemType === 'folder' ? 'Folder' : 'File'} '${deleteItemName}' telah dihapus`
    });
  };
  
  // Format file size for display
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };
  
  // Format date for display
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };
  
  if (!client || !fileSystem) {
    return <div className="p-4 text-center">Loading...</div>;
  }
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <Button 
            variant="outline" 
            size="sm" 
            className="mb-2"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="mr-2" size={16} />
            Kembali ke Dashboard
          </Button>
          <h1 className="text-2xl font-bold text-kap-navy">Dokumen Klien: {client.name}</h1>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
          <Button
            onClick={() => {
              setNewFolderName("");
              setNewFolderDialogOpen(true);
            }}
            className="flex items-center"
          >
            <Plus size={18} className="mr-2" />
            Folder Baru
          </Button>
          <Button
            onClick={() => {
              setUploadFileName("");
              setUploadDialogOpen(true);
            }}
            className="flex items-center"
            variant="outline"
          >
            <Upload size={18} className="mr-2" />
            Unggah File
          </Button>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>File Manager</CardTitle>
              <CardDescription>Kelola dokumen klien {client.name}</CardDescription>
            </div>
            
            {currentPath !== "/" && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-2 md:mt-0"
                onClick={handleNavigateUp}
              >
                <ArrowLeft className="mr-2" size={16} />
                Kembali
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {/* Breadcrumbs */}
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink onClick={() => handleBreadcrumbClick(-1)}>
                  Root
                </BreadcrumbLink>
              </BreadcrumbItem>
              
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {index === breadcrumbs.length - 1 ? (
                      <BreadcrumbPage>{crumb}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink onClick={() => handleBreadcrumbClick(index)}>
                        {crumb}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
          
          {currentItems.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Nama</TableHead>
                    <TableHead className="hidden md:table-cell">Jenis</TableHead>
                    <TableHead className="hidden md:table-cell">Ukuran</TableHead>
                    <TableHead className="hidden md:table-cell">Diubah</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.type === "folder" ? (
                          <button
                            className="flex items-center text-left w-full"
                            onClick={() => handleNavigateToFolder(item.path)}
                          >
                            <Folder className="mr-2 text-blue-500" size={20} />
                            <span>{item.name}</span>
                          </button>
                        ) : (
                          <div className="flex items-center">
                            <FileText className="mr-2 text-gray-500" size={20} />
                            <span>{item.name}</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {item.type === "folder" ? "Folder" : "File"}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {item.type === "folder" ? "-" : formatFileSize(item.size)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {item.type === "folder" ? "-" : formatDate(item.lastModified)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openRenameDialog(item)}
                          >
                            <Edit size={16} />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600"
                            onClick={() => openDeleteDialog(item)}
                          >
                            <Trash2 size={16} />
                            <span className="sr-only">Hapus</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Folder ini kosong</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* New Folder Dialog */}
      <Dialog open={newFolderDialogOpen} onOpenChange={setNewFolderDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Buat Folder Baru</DialogTitle>
            <DialogDescription>
              Masukkan nama untuk folder baru Anda.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
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
            <Button onClick={handleCreateFolder}>Buat Folder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Upload File Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Unggah File Baru</DialogTitle>
            <DialogDescription>
              Masukkan nama file yang akan diunggah.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              placeholder="Nama File"
              value={uploadFileName}
              onChange={(e) => setUploadFileName(e.target.value)}
            />
            <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto text-gray-400" size={24} />
              <p className="mt-2 text-sm text-gray-500">
                Klik untuk memilih file atau seret file ke sini
              </p>
              <p className="text-xs text-gray-400 mt-1">
                (Simulasi - tidak ada file yang benar-benar diunggah)
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleUploadFile}>Unggah</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Rename Dialog */}
      <Dialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ganti Nama</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              placeholder="Nama Baru"
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenameDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleRenameItem}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus {deleteItemType === 'folder' ? 'folder' : 'file'} "{deleteItemName}"?
              {deleteItemType === 'folder' && ' Semua isi folder juga akan dihapus.'}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleDeleteItem}>
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientDocuments;
