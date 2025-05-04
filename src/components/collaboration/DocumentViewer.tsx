
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Download, Edit, Eye, Save, Share, Users } from 'lucide-react';

interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
  updated: string;
  user: string;
}

interface DocumentViewerProps {
  document: Document | null | undefined;
}

const DocumentViewer = ({ document }: DocumentViewerProps) => {
  const { toast } = useToast();
  const [isEditMode, setIsEditMode] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  
  // Example content for different document types
  const getDocumentContent = (type: string | undefined) => {
    if (!type) return '';
    
    switch (type.toLowerCase()) {
      case 'pdf':
        return `
          # Laporan Audit Keuangan Q2 2023

          ## 1. Pendahuluan
          
          Laporan ini menyajikan hasil audit keuangan PT Maju Bersama untuk periode Q2 2023. Audit dilakukan sesuai dengan standar audit yang berlaku di Indonesia.
          
          ## 2. Ruang Lingkup Audit
          
          Audit meliputi pemeriksaan atas laporan posisi keuangan, laporan laba rugi, laporan perubahan ekuitas, dan laporan arus kas untuk periode yang berakhir pada 30 Juni 2023.
          
          ## 3. Hasil Temuan
          
          Dalam pelaksanaan audit, kami menemukan beberapa hal yang perlu mendapat perhatian:
          
          1. Adanya keterlambatan pencatatan transaksi pada akhir periode
          2. Beberapa bukti transaksi yang tidak memadai
          3. Kelemahan pada kontrol internal pembelian
          
          ## 4. Rekomendasi
          
          Berdasarkan temuan tersebut, kami menyarankan:
          
          1. Implementasi sistem pencatatan real-time untuk menghindari keterlambatan
          2. Perbaikan prosedur dokumentasi untuk memastikan semua transaksi memiliki bukti yang memadai
          3. Peningkatan kontrol internal pada proses pembelian
        `;
      case 'excel':
        return `
          # Data Rekonsiliasi Pajak 2023

          | Bulan | Pendapatan | PPh | PPN | Total Pajak |
          |-------|------------|-----|-----|-------------|
          | Jan   | 1,250,000  | 125,000 | 137,500 | 262,500 |
          | Feb   | 1,420,000  | 142,000 | 156,200 | 298,200 |
          | Mar   | 1,350,000  | 135,000 | 148,500 | 283,500 |
          | Apr   | 1,650,000  | 165,000 | 181,500 | 346,500 |
          | Mei   | 1,730,000  | 173,000 | 190,300 | 363,300 |
          | Jun   | 1,850,000  | 185,000 | 203,500 | 388,500 |

          ## Catatan:
          - PPh dihitung sebesar 10% dari pendapatan
          - PPN dihitung sebesar 11% dari pendapatan
        `;
      case 'word':
        return `
          # Standard Operating Procedure: Audit Internal

          ## Tujuan
          Dokumen ini bertujuan untuk memberikan panduan langkah-demi-langkah mengenai prosedur audit internal yang harus diikuti oleh tim audit.

          ## Ruang Lingkup
          Prosedur ini berlaku untuk semua kegiatan audit internal yang dilakukan di dalam perusahaan.

          ## Tanggung Jawab
          - Kepala Audit Internal: Bertanggung jawab untuk menyetujui rencana audit dan laporan final.
          - Manajer Audit: Bertanggung jawab untuk merencanakan dan mengawasi pelaksanaan audit.
          - Auditor: Bertanggung jawab untuk melaksanakan audit sesuai dengan prosedur ini.

          ## Prosedur
          1. Perencanaan Audit
             a. Identifikasi area yang akan diaudit
             b. Tentukan tujuan dan ruang lingkup audit
             c. Alokasikan sumber daya yang diperlukan
             d. Buat jadwal audit

          2. Persiapan Audit
             a. Kumpulkan informasi pendahuluan
             b. Review kebijakan dan prosedur yang relevan
             c. Siapkan checklist audit
             d. Komunikasikan rencana audit kepada pihak terkait

          3. Pelaksanaan Audit
             a. Lakukan pertemuan pembuka
             b. Kumpulkan bukti audit
             c. Analisis data dan identifikasi temuan
             d. Dokumentasikan semua temuan

          4. Pelaporan Audit
             a. Siapkan draf laporan audit
             b. Diskusikan temuan dengan pihak yang diaudit
             c. Finalisasi laporan audit
             d. Presentasikan laporan kepada manajemen

          5. Tindak Lanjut
             a. Buat rencana tindak lanjut untuk mengatasi temuan
             b. Monitor implementasi tindak lanjut
             c. Laporkan status tindak lanjut kepada manajemen
        `;
      default:
        return 'Pratinjau dokumen tidak tersedia untuk jenis file ini. Silakan unduh untuk melihat isinya.';
    }
  };

  // Handle document opening
  React.useEffect(() => {
    if (document) {
      setEditContent(getDocumentContent(document.type));
      setIsEditMode(false);
    }
  }, [document]);

  if (!document) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Eye size={24} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-medium mb-1">Tidak ada dokumen yang dipilih</h3>
        <p className="text-gray-500 text-center max-w-md">
          Pilih dokumen dari daftar di sebelah kiri untuk melihat atau mengedit kontennya.
        </p>
      </div>
    );
  }

  const handleSaveDocument = () => {
    // In a real app, you would save the document here
    toast({
      title: "Dokumen disimpan",
      description: `${document.name} berhasil disimpan`
    });
    
    // Exit edit mode
    setIsEditMode(false);
  };

  const handleShareDocument = () => {
    // This would trigger the share dialog
    setIsShareDialogOpen(true);
  };

  const handleShareSubmit = () => {
    // In a real app, you would share the document here
    toast({
      title: "Dokumen dibagikan",
      description: "Dokumen telah dibagikan dengan anggota tim yang dipilih"
    });
    
    setIsShareDialogOpen(false);
  };

  // Function to render the document content based on type
  const renderDocumentContent = () => {
    // For non-editable preview
    if (!isEditMode) {
      return (
        <div className="prose max-w-none p-6 bg-gray-50 rounded-lg h-[500px] overflow-y-auto">
          {document.type === 'pdf' && (
            <div className="bg-red-50 p-4 rounded mb-4 flex items-center">
              <div className="bg-red-100 p-2 rounded mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">Dokumen PDF</p>
                <p className="text-xs">Pratinjau dokumen PDF sedang ditampilkan</p>
              </div>
            </div>
          )}
          
          {document.type === 'excel' && (
            <div className="bg-green-50 p-4 rounded mb-4 flex items-center">
              <div className="bg-green-100 p-2 rounded mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">Dokumen Excel</p>
                <p className="text-xs">Pratinjau dokumen Excel sedang ditampilkan</p>
              </div>
            </div>
          )}
          
          <div dangerouslySetInnerHTML={{ __html: editContent.replace(/\n/g, '<br>') }} />
        </div>
      );
    }
    
    // For editable view
    return (
      <div className="p-6">
        <Textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          className="w-full h-[500px] font-mono"
        />
      </div>
    );
  };

  return (
    <div className="h-full">
      <div className="border-b p-4 flex justify-between items-center">
        <div>
          <h3 className="font-semibold truncate max-w-md">{document.name}</h3>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <span className="mr-3">Terakhir diubah: {document.updated}</span>
            <span>Oleh: {document.user}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {isEditMode ? (
            <Button onClick={handleSaveDocument}>
              <Save size={18} className="mr-2" />
              Simpan
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={() => setIsEditMode(true)}>
                <Edit size={18} className="mr-2" />
                Edit
              </Button>
              <Button variant="outline" onClick={handleShareDocument}>
                <Share size={18} className="mr-2" />
                Bagikan
              </Button>
              <Button variant="outline">
                <Download size={18} className="mr-2" />
                Unduh
              </Button>
            </>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <Tabs defaultValue="preview">
          <TabsList className="mb-4">
            <TabsTrigger value="preview">Pratinjau</TabsTrigger>
            <TabsTrigger value="properties">Properti</TabsTrigger>
            <TabsTrigger value="history">Riwayat</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview">
            {renderDocumentContent()}
          </TabsContent>
          
          <TabsContent value="properties">
            <div className="bg-white p-6 rounded-lg border">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Informasi Dokumen</h4>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr>
                        <td className="py-1 text-gray-500">Nama</td>
                        <td className="py-1">{document.name}</td>
                      </tr>
                      <tr>
                        <td className="py-1 text-gray-500">Jenis</td>
                        <td className="py-1">{document.type.toUpperCase()}</td>
                      </tr>
                      <tr>
                        <td className="py-1 text-gray-500">Ukuran</td>
                        <td className="py-1">{document.size}</td>
                      </tr>
                      <tr>
                        <td className="py-1 text-gray-500">Terakhir Diubah</td>
                        <td className="py-1">{document.updated}</td>
                      </tr>
                      <tr>
                        <td className="py-1 text-gray-500">Diubah Oleh</td>
                        <td className="py-1">{document.user}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Hak Akses</h4>
                  <div className="space-y-2">
                    <div className="flex items-center p-2 bg-gray-50 rounded">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarFallback>AF</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm">Ahmad Faisal</p>
                        <p className="text-xs text-gray-500">Pemilik</p>
                      </div>
                    </div>
                    <div className="flex items-center p-2 bg-gray-50 rounded">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarFallback>DP</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm">Diana Putri</p>
                        <p className="text-xs text-gray-500">Dapat mengedit</p>
                      </div>
                    </div>
                    <div className="flex items-center p-2 bg-gray-50 rounded">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarFallback>BS</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm">Budi Santoso</p>
                        <p className="text-xs text-gray-500">Dapat melihat</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <div className="bg-white rounded-lg border">
              <ul className="divide-y">
                <li className="p-4">
                  <div className="flex items-start">
                    <Avatar className="h-8 w-8 mr-3">
                      <AvatarFallback>BS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm"><strong>Budi Santoso</strong> mengubah dokumen</p>
                      <p className="text-xs text-gray-500">Kemarin, 15:30</p>
                      <p className="text-xs text-gray-700 mt-1">Menambahkan informasi pajak terbaru</p>
                    </div>
                  </div>
                </li>
                <li className="p-4">
                  <div className="flex items-start">
                    <Avatar className="h-8 w-8 mr-3">
                      <AvatarFallback>DP</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm"><strong>Diana Putri</strong> mengubah dokumen</p>
                      <p className="text-xs text-gray-500">3 hari yang lalu, 09:15</p>
                      <p className="text-xs text-gray-700 mt-1">Memperbaiki format tabel</p>
                    </div>
                  </div>
                </li>
                <li className="p-4">
                  <div className="flex items-start">
                    <Avatar className="h-8 w-8 mr-3">
                      <AvatarFallback>AF</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm"><strong>Ahmad Faisal</strong> membuat dokumen</p>
                      <p className="text-xs text-gray-500">1 minggu yang lalu, 11:45</p>
                      <p className="text-xs text-gray-700 mt-1">Dokumen dibuat</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Share Dialog */}
      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bagikan Dokumen</DialogTitle>
            <DialogDescription>
              Pilih pengguna yang akan mendapatkan akses ke dokumen ini
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarFallback>AF</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Ahmad Faisal</p>
                    <p className="text-xs text-gray-500">Partner</p>
                  </div>
                </div>
                <div>
                  <select 
                    className="text-sm py-1 px-2 rounded border border-gray-300"
                    defaultValue="owner"
                  >
                    <option value="owner">Pemilik</option>
                    <option value="edit">Dapat mengedit</option>
                    <option value="view">Dapat melihat</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarFallback>BS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Budi Santoso</p>
                    <p className="text-xs text-gray-500">Senior Auditor</p>
                  </div>
                </div>
                <div>
                  <select 
                    className="text-sm py-1 px-2 rounded border border-gray-300"
                    defaultValue="edit"
                  >
                    <option value="owner">Pemilik</option>
                    <option value="edit">Dapat mengedit</option>
                    <option value="view">Dapat melihat</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarFallback>DP</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Diana Putri</p>
                    <p className="text-xs text-gray-500">Tax Consultant</p>
                  </div>
                </div>
                <div>
                  <select 
                    className="text-sm py-1 px-2 rounded border border-gray-300"
                    defaultValue="view"
                  >
                    <option value="owner">Pemilik</option>
                    <option value="edit">Dapat mengedit</option>
                    <option value="view">Dapat melihat</option>
                  </select>
                </div>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full mt-4"
            >
              <Users size={16} className="mr-2" />
              Tambah Anggota
            </Button>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsShareDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleShareSubmit}>
              Bagikan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Helper component for Document Viewer
const Avatar = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`bg-blue-100 text-blue-800 rounded-full flex items-center justify-center ${className}`}>
      {children}
    </div>
  );
};

const AvatarFallback = ({ children }: { children: React.ReactNode }) => {
  return <span className="text-sm font-medium">{children}</span>;
};

export default DocumentViewer;
