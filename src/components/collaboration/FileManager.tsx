
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Download, File, FileArchive, FileText, FilePlus, Upload } from 'lucide-react';

interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
  updated: string;
  user: string;
}

interface FileManagerProps {
  selectedDocument: number | null;
  documents: Document[];
  onDocumentSelect: (docId: number) => void;
}

const FileManager = ({ selectedDocument, documents, onDocumentSelect }: FileManagerProps) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  
  const filteredDocuments = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleUploadSubmit = () => {
    if (!uploadedFile) return;
    
    // Check file size (max 10MB)
    if (uploadedFile.size > 10 * 1024 * 1024) {
      toast({
        title: "File terlalu besar",
        description: "Ukuran maksimum file adalah 10MB",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, you would upload the file here
    toast({
      title: "File berhasil diunggah",
      description: `${uploadedFile.name} telah ditambahkan ke dokumen`
    });
    
    setUploadedFile(null);
    setIsUploadDialogOpen(false);
  };
  
  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText size={24} className="text-red-500" />;
      case 'excel':
      case 'xlsx':
      case 'xls':
        return <FileText size={24} className="text-green-500" />;
      case 'word':
      case 'docx':
      case 'doc':
        return <FileText size={24} className="text-blue-500" />;
      case 'zip':
      case 'rar':
        return <FileArchive size={24} className="text-purple-500" />;
      default:
        return <File size={24} className="text-gray-500" />;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-kap-navy">Dokumen</h3>
        <Button 
          size="sm" 
          onClick={() => setIsUploadDialogOpen(true)}
        >
          <Upload size={16} className="mr-2" />
          Unggah
        </Button>
      </div>
      
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Cari dokumen..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>
      
      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {filteredDocuments.length === 0 ? (
          <div className="text-center p-4 border border-dashed rounded-lg">
            <p className="text-gray-500">Tidak ada dokumen yang ditemukan</p>
          </div>
        ) : (
          filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                selectedDocument === doc.id ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50 border-gray-200"
              }`}
              onClick={() => onDocumentSelect(doc.id)}
            >
              <div className="flex items-center">
                <div className="mr-3">
                  {getFileIcon(doc.type)}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm truncate">{doc.name}</h4>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{doc.size}</span>
                    <span>{doc.updated}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Diubah oleh: {doc.user}
                  </div>
                </div>
                <Button
                  variant="ghost" 
                  size="icon" 
                  className="ml-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    toast({
                      title: "Dokumen diunduh",
                      description: `${doc.name} sedang diunduh`
                    });
                  }}
                >
                  <Download size={16} />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unggah Dokumen</DialogTitle>
            <DialogDescription>
              Pilih file yang ingin diunggah ke dokumen kolaborasi
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <label 
                htmlFor="document-upload" 
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <FilePlus className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-1">Klik untuk memilih dokumen atau seret file ke sini</p>
                <p className="text-xs text-gray-400">Format yang didukung: PDF, Word, Excel, ZIP. Maks. 10MB</p>
                <input 
                  id="document-upload" 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileUpload} 
                />
              </label>
            </div>
            
            {uploadedFile && (
              <div className="bg-blue-50 p-3 rounded flex items-center">
                <div className="bg-blue-100 p-2 rounded mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1 truncate">
                  <p className="font-medium text-sm">{uploadedFile.name}</p>
                  <p className="text-xs text-gray-500">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="ml-2"
                  onClick={() => setUploadedFile(null)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleUploadSubmit} disabled={!uploadedFile}>
              Unggah
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FileManager;
