
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  FolderPlus,
  FileUp,
  FilePen,
  FileSearch,
  Send,
  FolderOpen,
  Folder,
  Pencil,
  ChevronRight,
  ChevronDown,
  Plus,
  Trash2,
  Clock,
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

interface Document {
  id: string;
  name: string;
  type: string;
  status: string;
  lastModified: string;
  size: string;
  progress: number;
}

interface Folder {
  id: string;
  name: string;
  documents: Document[];
  subfolders: Folder[];
  isOpen: boolean;
}

const initialFolders: Folder[] = [
  {
    id: "folder-1",
    name: "Dokumen Pajak",
    documents: [
      {
        id: "doc-1",
        name: "SPT Tahunan 2023.pdf",
        type: "PDF",
        status: "completed",
        lastModified: "2023-12-15",
        size: "2.4 MB",
        progress: 100
      },
      {
        id: "doc-2",
        name: "Laporan PPh 21.xlsx",
        type: "Excel",
        status: "review",
        lastModified: "2024-01-10",
        size: "1.2 MB",
        progress: 80
      }
    ],
    subfolders: [],
    isOpen: false
  },
  {
    id: "folder-2",
    name: "Dokumen Keuangan",
    documents: [
      {
        id: "doc-3",
        name: "Neraca 2023.xlsx",
        type: "Excel",
        status: "in-progress",
        lastModified: "2024-02-05",
        size: "3.5 MB",
        progress: 45
      }
    ],
    subfolders: [
      {
        id: "subfolder-1",
        name: "Laporan Bulanan",
        documents: [
          {
            id: "doc-4",
            name: "Laporan Januari.pdf",
            type: "PDF",
            status: "completed",
            lastModified: "2024-01-15",
            size: "1.8 MB",
            progress: 100
          }
        ],
        subfolders: [],
        isOpen: false
      }
    ],
    isOpen: false
  }
];

const statusColors: Record<string, string> = {
  "completed": "bg-green-100 text-green-800",
  "in-progress": "bg-blue-100 text-blue-800",
  "review": "bg-purple-100 text-purple-800",
  "draft": "bg-gray-100 text-gray-800",
  "rejected": "bg-red-100 text-red-800",
  "pending": "bg-amber-100 text-amber-800",
};

const statusLabels: Record<string, string> = {
  "completed": "Selesai",
  "in-progress": "Sedang Diproses",
  "review": "Dalam Review",
  "draft": "Draft",
  "rejected": "Ditolak",
  "pending": "Menunggu",
};

const MitraDocumentManager = () => {
  const { toast } = useToast();
  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  const [activeTab, setActiveTab] = useState("documents");
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false);
  const [isRenameFolderDialogOpen, setIsRenameFolderDialogOpen] = useState(false);
  const [documentFormData, setDocumentFormData] = useState({
    name: "",
    type: "",
    file: null as File | null,
  });
  const [folderFormData, setFolderFormData] = useState({
    name: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const toggleFolder = (folderId: string) => {
    setFolders(prevFolders => {
      return prevFolders.map(folder => {
        if (folder.id === folderId) {
          return { ...folder, isOpen: !folder.isOpen };
        }
        // Check subfolders
        if (folder.subfolders.length > 0) {
          const updatedSubfolders = toggleSubfolders(folder.subfolders, folderId);
          return { ...folder, subfolders: updatedSubfolders };
        }
        return folder;
      });
    });
  };

  const toggleSubfolders = (subfolders: Folder[], folderId: string): Folder[] => {
    return subfolders.map(subfolder => {
      if (subfolder.id === folderId) {
        return { ...subfolder, isOpen: !subfolder.isOpen };
      }
      if (subfolder.subfolders.length > 0) {
        const updatedSubfolders = toggleSubfolders(subfolder.subfolders, folderId);
        return { ...subfolder, subfolders: updatedSubfolders };
      }
      return subfolder;
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocumentFormData(prev => ({
        ...prev,
        file: e.target.files![0],
        type: e.target.files![0].type.split('/')[1].toUpperCase()
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDocumentFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFolderInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFolderFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadDocument = () => {
    if (!documentFormData.name || !documentFormData.file) {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua field yang diperlukan",
        variant: "destructive"
      });
      return;
    }

    const newDocument: Document = {
      id: `doc-${Date.now()}`,
      name: documentFormData.name,
      type: documentFormData.type || "PDF",
      status: "draft",
      lastModified: new Date().toISOString().split('T')[0],
      size: `${(documentFormData.file.size / (1024 * 1024)).toFixed(1)} MB`,
      progress: 0
    };

    // Simulate upload progress
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += 10;
      if (progress <= 100) {
        setFolders(prevFolders => {
          return prevFolders.map(folder => {
            if (folder.id === selectedFolder?.id) {
              const updatedDocuments = [
                ...folder.documents,
                { ...newDocument, progress }
              ].filter((doc, index, self) => 
                index === self.findIndex(d => d.id === doc.id)
              );
              
              return { ...folder, documents: updatedDocuments };
            }
            return folder;
          });
        });
      } else {
        clearInterval(progressInterval);
        
        // Update the document status to "pending" after upload
        setFolders(prevFolders => {
          return prevFolders.map(folder => {
            if (folder.id === selectedFolder?.id) {
              const updatedDocuments = folder.documents.map(doc => 
                doc.id === newDocument.id ? { ...doc, status: "pending", progress: 100 } : doc
              );
              return { ...folder, documents: updatedDocuments };
            }
            return folder;
          });
        });
        
        toast({
          title: "Berhasil",
          description: "Dokumen berhasil diunggah"
        });
      }
    }, 300);

    // Add document to selected folder
    if (selectedFolder) {
      setFolders(prevFolders => {
        return prevFolders.map(folder => {
          if (folder.id === selectedFolder.id) {
            return { 
              ...folder, 
              documents: [...folder.documents, { ...newDocument, progress: 0 }] 
            };
          }
          return folder;
        });
      });
    }

    // Reset form and close dialog
    setDocumentFormData({
      name: "",
      type: "",
      file: null
    });
    setIsUploadDialogOpen(false);
  };

  const handleEditDocument = () => {
    if (!documentFormData.name || !selectedDocument) {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua field yang diperlukan",
        variant: "destructive"
      });
      return;
    }

    // Update document in folders
    setFolders(prevFolders => {
      return prevFolders.map(folder => {
        const updatedDocuments = folder.documents.map(doc => {
          if (doc.id === selectedDocument.id) {
            return {
              ...doc,
              name: documentFormData.name,
              lastModified: new Date().toISOString().split('T')[0],
              status: "in-progress"
            };
          }
          return doc;
        });
        return { ...folder, documents: updatedDocuments };
      });
    });

    // Reset form and close dialog
    setDocumentFormData({
      name: "",
      type: "",
      file: null
    });
    setIsEditDialogOpen(false);

    toast({
      title: "Berhasil",
      description: "Dokumen berhasil diperbarui"
    });
  };

  const handleCreateFolder = () => {
    if (!folderFormData.name) {
      toast({
        title: "Error",
        description: "Mohon masukkan nama folder",
        variant: "destructive"
      });
      return;
    }

    const newFolder: Folder = {
      id: `folder-${Date.now()}`,
      name: folderFormData.name,
      documents: [],
      subfolders: [],
      isOpen: false
    };

    setFolders([...folders, newFolder]);
    setFolderFormData({ name: "" });
    setIsNewFolderDialogOpen(false);

    toast({
      title: "Berhasil",
      description: "Folder baru berhasil dibuat"
    });
  };

  const handleRenameFolder = () => {
    if (!folderFormData.name || !selectedFolder) {
      toast({
        title: "Error",
        description: "Mohon masukkan nama folder",
        variant: "destructive"
      });
      return;
    }

    setFolders(prevFolders => {
      return prevFolders.map(folder => {
        if (folder.id === selectedFolder.id) {
          return { ...folder, name: folderFormData.name };
        }
        return folder;
      });
    });

    setFolderFormData({ name: "" });
    setIsRenameFolderDialogOpen(false);

    toast({
      title: "Berhasil",
      description: "Nama folder berhasil diperbarui"
    });
  };

  const handleSendDocument = (document: Document) => {
    // Update document status to "review"
    setFolders(prevFolders => {
      return prevFolders.map(folder => {
        const updatedDocuments = folder.documents.map(doc => {
          if (doc.id === document.id) {
            return { ...doc, status: "review" };
          }
          return doc;
        });
        return { ...folder, documents: updatedDocuments };
      });
    });

    toast({
      title: "Dokumen Terkirim",
      description: "Dokumen telah dikirim untuk direview"
    });
  };

  const renderFolderTree = (folderList: Folder[], level = 0) => {
    return folderList.map(folder => (
      <div key={folder.id} className="mb-1">
        <div 
          className={`flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer ${
            selectedFolder?.id === folder.id ? 'bg-gray-100' : ''
          }`}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          onClick={() => setSelectedFolder(folder)}
        >
          <Button variant="ghost" size="sm" className="p-0 mr-1" onClick={(e) => {
            e.stopPropagation();
            toggleFolder(folder.id);
          }}>
            {folder.isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </Button>
          {folder.isOpen ? <FolderOpen size={18} className="mr-2 text-kap-blue" /> : <Folder size={18} className="mr-2 text-kap-gold" />}
          <span className="flex-1 text-sm truncate">{folder.name}</span>
          <Button variant="ghost" size="icon" className="h-8 w-8 ml-auto" onClick={(e) => {
            e.stopPropagation();
            setSelectedFolder(folder);
            setFolderFormData({ name: folder.name });
            setIsRenameFolderDialogOpen(true);
          }}>
            <Pencil size={14} />
          </Button>
        </div>
        
        {folder.isOpen && (
          <>
            {folder.documents.length > 0 && (
              <div className="ml-8">
                {folder.documents.map(doc => (
                  <div 
                    key={doc.id} 
                    className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                    style={{ paddingLeft: `${level * 16 + 24}px` }}
                  >
                    <FileText size={16} className="mr-2 text-gray-500" />
                    <span className="text-sm truncate flex-1">{doc.name}</span>
                    <Badge variant="outline" className={statusColors[doc.status]}>
                      {statusLabels[doc.status]}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
            {folder.subfolders.length > 0 && renderFolderTree(folder.subfolders, level + 1)}
          </>
        )}
      </div>
    ));
  };
  
  const findDocumentsInFolders = (folderList: Folder[], searchTerm: string): Document[] => {
    let results: Document[] = [];
    
    folderList.forEach(folder => {
      // Search in current folder's documents
      const matchingDocs = folder.documents.filter(doc => 
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      results = [...results, ...matchingDocs];
      
      // Search in subfolders
      if (folder.subfolders.length > 0) {
        const subfoldersResults = findDocumentsInFolders(folder.subfolders, searchTerm);
        results = [...results, ...subfoldersResults];
      }
    });
    
    return results;
  };

  const allDocuments = searchTerm 
    ? findDocumentsInFolders(folders, searchTerm)
    : selectedFolder 
      ? selectedFolder.documents
      : folders.flatMap(folder => folder.documents);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manajemen Dokumen Mitra</CardTitle>
        <CardDescription>
          Kelola dokumen dan folder mitra KAP MGI GAR SURABAYA
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="documents">Dokumen</TabsTrigger>
            <TabsTrigger value="folders">Folder</TabsTrigger>
          </TabsList>
          
          <TabsContent value="documents" className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Input 
                  placeholder="Cari dokumen..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <FileSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  className="flex items-center"
                  onClick={() => {
                    if (!selectedFolder) {
                      toast({
                        title: "Pilih Folder",
                        description: "Silakan pilih folder terlebih dahulu",
                        variant: "destructive"
                      });
                      return;
                    }
                    setIsUploadDialogOpen(true);
                  }}
                >
                  <FileUp size={16} className="mr-2" />
                  Unggah Baru
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center"
                  onClick={() => {
                    if (!selectedDocument) {
                      toast({
                        title: "Pilih Dokumen",
                        description: "Silakan pilih dokumen terlebih dahulu",
                        variant: "destructive"
                      });
                      return;
                    }
                    setDocumentFormData({
                      name: selectedDocument.name,
                      type: selectedDocument.type,
                      file: null
                    });
                    setIsEditDialogOpen(true);
                  }}
                >
                  <FilePen size={16} className="mr-2" />
                  Edit
                </Button>
              </div>
            </div>
            
            <div className="border rounded-md">
              <div className="p-4">
                <h3 className="text-lg font-medium mb-4">
                  {selectedFolder ? `Folder: ${selectedFolder.name}` : 'Semua Dokumen'}
                </h3>
                
                {allDocuments.length > 0 ? (
                  <div className="space-y-3">
                    {allDocuments.map(doc => (
                      <div 
                        key={doc.id}
                        className={`p-3 border rounded-lg hover:bg-gray-50 cursor-pointer ${
                          selectedDocument?.id === doc.id ? 'bg-gray-50 border-kap-navy' : ''
                        }`}
                        onClick={() => setSelectedDocument(doc)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FileText size={20} className="mr-3 text-kap-blue" />
                            <div>
                              <p className="font-medium">{doc.name}</p>
                              <div className="flex items-center text-sm text-gray-500">
                                <span className="mr-3">{doc.type}</span>
                                <span className="mr-3">{doc.size}</span>
                                <Clock size={14} className="mr-1" />
                                <span>{doc.lastModified}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className={statusColors[doc.status]}>
                              {statusLabels[doc.status]}
                            </Badge>
                            
                            <div className="flex space-x-1">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setDocumentFormData({
                                    name: doc.name,
                                    type: doc.type,
                                    file: null
                                  });
                                  setIsEditDialogOpen(true);
                                  setSelectedDocument(doc);
                                }}
                              >
                                <FilePen size={16} />
                              </Button>
                              
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-kap-blue"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSendDocument(doc);
                                }}
                                disabled={doc.status === "review" || doc.status === "completed"}
                              >
                                <Send size={16} />
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Progress Bar for uploading documents */}
                        {doc.progress < 100 && doc.status === "draft" && (
                          <div className="mt-2">
                            <Progress value={doc.progress} className="h-2" />
                            <p className="text-xs text-gray-500 mt-1">Mengunggah... {doc.progress}%</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    {searchTerm ? "Tidak ada dokumen yang ditemukan" : "Tidak ada dokumen dalam folder ini"}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="folders" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Struktur Folder</h3>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  className="flex items-center"
                  onClick={() => setIsNewFolderDialogOpen(true)}
                >
                  <FolderPlus size={16} className="mr-2" />
                  Buat Folder Baru
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center"
                  onClick={() => {
                    if (!selectedFolder) {
                      toast({
                        title: "Pilih Folder",
                        description: "Silakan pilih folder terlebih dahulu",
                        variant: "destructive"
                      });
                      return;
                    }
                    setFolderFormData({ name: selectedFolder.name });
                    setIsRenameFolderDialogOpen(true);
                  }}
                >
                  <Pencil size={16} className="mr-2" />
                  Ubah Nama
                </Button>
              </div>
            </div>
            
            <div className="border rounded-md p-4">
              {folders.length > 0 ? (
                <div className="space-y-1">
                  {renderFolderTree(folders)}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Tidak ada folder yang tersedia
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      {/* Upload Document Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Unggah Dokumen Baru</DialogTitle>
            <DialogDescription>
              Unggah dokumen baru ke folder yang dipilih
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="file">File Dokumen</Label>
              <Input
                id="file"
                type="file"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">Nama Dokumen</Label>
              <Input
                id="name"
                name="name"
                value={documentFormData.name}
                onChange={handleInputChange}
                placeholder="Masukkan nama dokumen"
              />
            </div>
            
            {selectedFolder && (
              <div className="text-sm text-gray-500">
                Dokumen akan diunggah ke folder: <span className="font-medium">{selectedFolder.name}</span>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
              Batal
            </Button>
            <Button 
              type="submit" 
              onClick={handleUploadDocument}
              disabled={!documentFormData.file || !documentFormData.name}
            >
              Unggah
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Document Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Dokumen</DialogTitle>
            <DialogDescription>
              Ubah informasi dokumen yang dipilih
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="editName">Nama Dokumen</Label>
              <Input
                id="editName"
                name="name"
                value={documentFormData.name}
                onChange={handleInputChange}
                placeholder="Masukkan nama dokumen"
              />
            </div>
            
            {selectedDocument && (
              <div className="flex flex-col space-y-1 text-sm text-gray-500">
                <div>Tipe: <span className="font-medium">{selectedDocument.type}</span></div>
                <div>Ukuran: <span className="font-medium">{selectedDocument.size}</span></div>
                <div>Status: <span className="font-medium">{statusLabels[selectedDocument.status]}</span></div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Batal
            </Button>
            <Button 
              type="submit" 
              onClick={handleEditDocument}
              disabled={!documentFormData.name}
            >
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* New Folder Dialog */}
      <Dialog open={isNewFolderDialogOpen} onOpenChange={setIsNewFolderDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Buat Folder Baru</DialogTitle>
            <DialogDescription>
              Tambahkan folder baru untuk mengorganisir dokumen
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="folderName">Nama Folder</Label>
              <Input
                id="folderName"
                name="name"
                value={folderFormData.name}
                onChange={handleFolderInputChange}
                placeholder="Masukkan nama folder"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewFolderDialogOpen(false)}>
              Batal
            </Button>
            <Button 
              type="submit" 
              onClick={handleCreateFolder}
              disabled={!folderFormData.name}
            >
              Buat Folder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Rename Folder Dialog */}
      <Dialog open={isRenameFolderDialogOpen} onOpenChange={setIsRenameFolderDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ubah Nama Folder</DialogTitle>
            <DialogDescription>
              Ubah nama folder yang dipilih
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="renameFolderName">Nama Folder</Label>
              <Input
                id="renameFolderName"
                name="name"
                value={folderFormData.name}
                onChange={handleFolderInputChange}
                placeholder="Masukkan nama folder baru"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRenameFolderDialogOpen(false)}>
              Batal
            </Button>
            <Button 
              type="submit" 
              onClick={handleRenameFolder}
              disabled={!folderFormData.name}
            >
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default MitraDocumentManager;
