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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, Trash2, Edit, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";

// Dummy clients data
const dummyClients = [
  {
    id: 1,
    name: "PT Maju Bersama",
    industry: "Manufaktur",
    contact: "John Doe",
    email: "johndoe@ptmaju.com",
    phone: "021-5550199",
    status: "active",
    address: "Jl. Industri Raya No. 45, Jakarta Utara"
  },
  {
    id: 2,
    name: "CV Teknologi Nusantara",
    industry: "Teknologi",
    contact: "Jane Smith",
    email: "jane@teknusantara.com",
    phone: "021-5552288",
    status: "pending",
    address: "Jl. Gatot Subroto Km. 2, Jakarta Selatan"
  },
  {
    id: 3,
    name: "PT Sejahtera Abadi",
    industry: "Keuangan",
    contact: "Robert Lee",
    email: "robert@sejahteraabadi.co.id",
    phone: "021-5553377",
    status: "active",
    address: "Jl. Sudirman No. 25, Jakarta Pusat"
  },
  {
    id: 4,
    name: "PT Bintang Timur",
    industry: "Konstruksi",
    contact: "Maria Garcia",
    email: "maria@bintangtimur.com",
    phone: "021-5554466",
    status: "completed",
    address: "Jl. Pemuda No. 12, Jakarta Timur"
  },
  {
    id: 5,
    name: "PT Global Indonesia",
    industry: "Ekspor-Impor",
    contact: "David Wong",
    email: "david@globalindonesia.com",
    phone: "021-5555544",
    status: "active",
    address: "Jl. Hayam Wuruk No. 8, Jakarta Barat"
  },
  {
    id: 6,
    name: "CV Mandiri Jaya",
    industry: "Retail",
    contact: "Susan Lee",
    email: "susan@mandirijaya.co.id",
    phone: "021-5556633",
    status: "pending",
    address: "Jl. Pahlawan No. 55, Tangerang"
  },
  {
    id: 7,
    name: "PT Sinar Mas",
    industry: "Agrikultur",
    contact: "Michael Tan",
    email: "michael@sinarmas.com",
    phone: "021-5557722",
    status: "active",
    address: "Jl. Raya Bogor Km. 5, Bogor"
  },
  {
    id: 8,
    name: "PT Karya Utama",
    industry: "Logistik",
    contact: "Linda Wijaya",
    email: "linda@karyautama.com",
    phone: "021-5558811",
    status: "inactive",
    address: "Jl. Raya Bekasi No. 34, Bekasi"
  },
  {
    id: 9,
    name: "CV Abadi Makmur",
    industry: "Furniture",
    contact: "Thomas Jackson",
    email: "thomas@abadimakmur.co.id",
    phone: "021-5559900",
    status: "active",
    address: "Jl. Mangga Dua No. 15, Jakarta Utara"
  },
  {
    id: 10,
    name: "PT Sukses Sentosa",
    industry: "Farmasi",
    contact: "Angela Chen",
    email: "angela@suksessentosa.com",
    phone: "021-5550011",
    status: "completed",
    address: "Jl. Thamrin No. 7, Jakarta Pusat"
  }
];

const industries = [
  "Manufaktur",
  "Teknologi",
  "Keuangan",
  "Konstruksi",
  "Ekspor-Impor",
  "Retail",
  "Agrikultur",
  "Logistik",
  "Furniture",
  "Farmasi",
  "Lainnya"
];

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-800",
  pending: "bg-amber-100 text-amber-800",
  completed: "bg-blue-100 text-blue-800",
  inactive: "bg-gray-100 text-gray-800"
};

const statusLabels: Record<string, string> = {
  active: "Aktif",
  pending: "Pending",
  completed: "Selesai",
  inactive: "Tidak Aktif"
};

type UserData = {
  name: string;
  email: string;
  role: string;
};

interface Client {
  id: number;
  name: string;
  industry: string;
  contact: string;
  email: string;
  phone: string;
  status: string;
  address: string;
}

const ClientsList = ({ currentUser }: { currentUser: UserData }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>(dummyClients);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentClient, setCurrentClient] = useState<Client | null>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    contact: "",
    email: "",
    phone: "",
    status: "active",
    address: ""
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const openAddClientDialog = () => {
    setIsEditing(false);
    setFormData({
      name: "",
      industry: "",
      contact: "",
      email: "",
      phone: "",
      status: "active",
      address: ""
    });
    setDialogOpen(true);
  };
  
  const openEditClientDialog = (client: Client) => {
    setIsEditing(true);
    setCurrentClient(client);
    setFormData({
      name: client.name,
      industry: client.industry,
      contact: client.contact,
      email: client.email,
      phone: client.phone,
      status: client.status,
      address: client.address
    });
    setDialogOpen(true);
  };
  
  const openDeleteConfirmation = (client: Client) => {
    setCurrentClient(client);
    setConfirmDeleteOpen(true);
  };
  
  const handleAddClient = () => {
    // Validation
    if (!formData.name || !formData.industry || !formData.contact || !formData.email) {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua field yang diperlukan",
        variant: "destructive"
      });
      return;
    }
    
    // For adding new client
    if (!isEditing) {
      const newClient = {
        id: clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1,
        ...formData
      };
      
      setClients([...clients, newClient]);
      toast({
        title: "Berhasil",
        description: "Klien baru telah ditambahkan"
      });
    } 
    // For editing existing client
    else if (currentClient) {
      const updatedClients = clients.map(client => 
        client.id === currentClient.id ? { ...client, ...formData } : client
      );
      setClients(updatedClients);
      toast({
        title: "Berhasil",
        description: "Data klien telah diperbarui"
      });
    }
    
    setDialogOpen(false);
  };
  
  const handleDeleteClient = () => {
    if (currentClient) {
      const updatedClients = clients.filter(client => client.id !== currentClient.id);
      setClients(updatedClients);
      toast({
        title: "Berhasil",
        description: "Klien telah dihapus"
      });
      setConfirmDeleteOpen(false);
    }
  };
  
  // Handle client click to navigate to documents page
  const handleClientClick = (clientId: number) => {
    navigate(`/clients/${clientId}`);
  };
  
  // Filter and search clients
  const filteredClients = clients.filter(client => {
    // Apply status filter
    const statusMatch = filterStatus === "all" || client.status === filterStatus;
    
    // Apply search term
    const searchMatch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.industry.toLowerCase().includes(searchTerm.toLowerCase());
    
    return statusMatch && searchMatch;
  });
  
  // Check if user has permission to add/edit/delete
  const hasEditPermission = ["admin", "manager", "mitra"].includes(currentUser.role);
  
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Daftar Klien</CardTitle>
            <CardDescription>Kelola data klien KAP MGI GAR SURABAYA</CardDescription>
          </div>
          
          {hasEditPermission && (
            <Button className="mt-4 md:mt-0 bg-black text-white hover:bg-gray-800" onClick={openAddClientDialog}>
              <Plus size={18} className="mr-2" />
              Tambah Klien
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Cari klien..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="active">Aktif</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Selesai</SelectItem>
              <SelectItem value="inactive">Tidak Aktif</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="rounded-md border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Nama Klien</TableHead>
                  <TableHead>Industri</TableHead>
                  <TableHead>Kontak</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.length > 0 ? (
                  filteredClients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell 
                        className="font-medium cursor-pointer hover:text-kap-blue hover:underline"
                        onClick={() => handleClientClick(client.id)}
                      >
                        {client.name}
                      </TableCell>
                      <TableCell>{client.industry}</TableCell>
                      <TableCell>
                        <div>{client.contact}</div>
                        <div className="text-sm text-gray-500">{client.email}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusColors[client.status]}>
                          {statusLabels[client.status]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {hasEditPermission ? (
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEditClientDialog(client)}
                            >
                              <Edit size={16} />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-600"
                              onClick={() => openDeleteConfirmation(client)}
                            >
                              <Trash2 size={16} />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleClientClick(client.id)}
                          >
                            Lihat Dokumen
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                      Tidak ada data klien yang ditemukan
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>

      {/* Add/Edit Client Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Klien" : "Tambah Klien Baru"}
            </DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Perbarui informasi klien di bawah ini"
                : "Masukkan informasi klien baru di bawah ini"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Perusahaan</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nama perusahaan"
                  disabled={!hasEditPermission}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="industry">Industri</Label>
                <Select
                  value={formData.industry}
                  onValueChange={(value) => handleSelectChange("industry", value)}
                  disabled={!hasEditPermission}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih industri" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact">Nama Kontak</Label>
                <Input
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  placeholder="Nama kontak"
                  disabled={!hasEditPermission}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Kontak</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email kontak"
                  disabled={!hasEditPermission}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Nomor Telepon</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Nomor telepon"
                  disabled={!hasEditPermission}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange("status", value)}
                  disabled={!hasEditPermission}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Aktif</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Selesai</SelectItem>
                    <SelectItem value="inactive">Tidak Aktif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Alamat</Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Alamat lengkap"
                rows={3}
                disabled={!hasEditPermission}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Batal
            </Button>
            {hasEditPermission && (
              <Button onClick={handleAddClient}>
                {isEditing ? "Simpan Perubahan" : "Tambah Klien"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Confirm Delete Dialog */}
      <Dialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus klien "{currentClient?.name}"? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
            <Button variant="outline" onClick={() => setConfirmDeleteOpen(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleDeleteClient}>
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ClientsList;
