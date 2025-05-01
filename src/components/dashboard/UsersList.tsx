
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Dummy users data
const dummyUsers = [
  {
    id: 1,
    name: "Admin Utama",
    email: "admin@kapgar.com",
    role: "admin",
    status: "active",
    lastLogin: "2024-04-28T08:15:30"
  },
  {
    id: 2,
    name: "Admin Sekunder",
    email: "admin2@kapgar.com",
    role: "admin",
    status: "active",
    lastLogin: "2024-04-28T09:32:15"
  },
  {
    id: 3,
    name: "Manajer Tim",
    email: "manager@kapgar.com",
    role: "manager",
    status: "active",
    lastLogin: "2024-04-27T14:20:45"
  },
  {
    id: 4,
    name: "Auditor Senior",
    email: "auditor1@kapgar.com",
    role: "auditor",
    status: "active",
    lastLogin: "2024-04-28T10:15:10"
  },
  {
    id: 5,
    name: "Auditor Junior",
    email: "auditor2@kapgar.com",
    role: "auditor",
    status: "active",
    lastLogin: "2024-04-27T11:42:30"
  },
  {
    id: 6,
    name: "PT Maju Bersama",
    email: "client1@example.com",
    role: "client",
    status: "active",
    lastLogin: "2024-04-26T15:30:20"
  },
  {
    id: 7,
    name: "CV Teknologi Nusantara",
    email: "client2@example.com",
    role: "client",
    status: "active",
    lastLogin: "2024-04-28T08:50:40"
  },
  {
    id: 8,
    name: "PT Sejahtera Abadi",
    email: "client3@example.com",
    role: "client",
    status: "inactive",
    lastLogin: "2024-04-15T09:12:05"
  },
  {
    id: 9,
    name: "PT Bintang Timur",
    email: "client4@example.com",
    role: "client",
    status: "active",
    lastLogin: "2024-04-27T16:45:10"
  },
  {
    id: 10,
    name: "PT Global Indonesia",
    email: "client5@example.com",
    role: "client",
    status: "active",
    lastLogin: "2024-04-26T10:25:35"
  }
];

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}

const UsersList = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>(dummyUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "client",
    password: "",
    confirmPassword: "",
    status: "active"
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  
  const openAddUserDialog = () => {
    setIsEditing(false);
    setFormData({
      name: "",
      email: "",
      role: "client",
      password: "",
      confirmPassword: "",
      status: "active"
    });
    setDialogOpen(true);
  };
  
  const openEditUserDialog = (user: User) => {
    setIsEditing(true);
    setCurrentUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      password: "",
      confirmPassword: "",
      status: user.status
    });
    setDialogOpen(true);
  };
  
  const openDeleteConfirmation = (user: User) => {
    setCurrentUser(user);
    setConfirmDeleteOpen(true);
  };
  
  const handleSaveUser = () => {
    // Validation
    if (!formData.name || !formData.email || !formData.role) {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua field yang diperlukan",
        variant: "destructive"
      });
      return;
    }
    
    if (!isEditing && (!formData.password || formData.password.length < 6)) {
      toast({
        title: "Error",
        description: "Password harus minimal 6 karakter",
        variant: "destructive"
      });
      return;
    }
    
    if (!isEditing && formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Password dan konfirmasi password tidak cocok",
        variant: "destructive"
      });
      return;
    }
    
    // For adding new user
    if (!isEditing) {
      const newUser = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: formData.status,
        lastLogin: "-"
      };
      
      setUsers([...users, newUser]);
      toast({
        title: "Berhasil",
        description: "Pengguna baru telah ditambahkan"
      });
    } 
    // For editing existing user
    else if (currentUser) {
      const updatedUsers = users.map(user => 
        user.id === currentUser.id ? { 
          ...user, 
          name: formData.name,
          email: formData.email,
          role: formData.role,
          status: formData.status,
        } : user
      );
      setUsers(updatedUsers);
      toast({
        title: "Berhasil",
        description: "Data pengguna telah diperbarui"
      });
    }
    
    setDialogOpen(false);
  };
  
  const handleDeleteUser = () => {
    if (currentUser) {
      // Check if user is the only admin
      if (
        currentUser.role === "admin" && 
        users.filter(user => user.role === "admin").length <= 1
      ) {
        toast({
          title: "Error",
          description: "Tidak dapat menghapus admin terakhir",
          variant: "destructive"
        });
        setConfirmDeleteOpen(false);
        return;
      }
      
      const updatedUsers = users.filter(user => user.id !== currentUser.id);
      setUsers(updatedUsers);
      toast({
        title: "Berhasil",
        description: "Pengguna telah dihapus"
      });
      setConfirmDeleteOpen(false);
    }
  };
  
  // Filter users
  const filteredUsers = users.filter(user => {
    const roleMatch = filterRole === "all" || user.role === filterRole;
    
    const searchMatch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return roleMatch && searchMatch;
  });
  
  // Format date
  const formatDate = (dateString: string) => {
    if (dateString === "-") return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  
  const roleLabels: Record<string, string> = {
    admin: "Administrator",
    manager: "Manajer",
    auditor: "Auditor",
    client: "Klien"
  };
  
  const statusColors: Record<string, string> = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800"
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Manajemen Pengguna</CardTitle>
            <CardDescription>Kelola pengguna sistem KAP MGI GAR SURABAYA</CardDescription>
          </div>
          
          <Button className="mt-4 md:mt-0" onClick={openAddUserDialog}>
            <Plus size={18} className="mr-2" />
            Tambah Pengguna
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Cari pengguna..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={filterRole} onValueChange={setFilterRole}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Role</SelectItem>
              <SelectItem value="admin">Administrator</SelectItem>
              <SelectItem value="manager">Manajer</SelectItem>
              <SelectItem value="auditor">Auditor</SelectItem>
              <SelectItem value="client">Klien</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="rounded-md border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Login Terakhir</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {roleLabels[user.role] || user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusColors[user.status]}>
                          {user.status === "active" ? "Aktif" : "Tidak Aktif"}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(user.lastLogin)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditUserDialog(user)}
                          >
                            <Edit size={16} />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600"
                            onClick={() => openDeleteConfirmation(user)}
                            disabled={user.role === "admin" && users.filter(u => u.role === "admin").length <= 1}
                          >
                            <Trash2 size={16} />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                      Tidak ada pengguna yang ditemukan
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>

      {/* Add/Edit User Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Pengguna" : "Tambah Pengguna Baru"}
            </DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Perbarui informasi pengguna di bawah ini"
                : "Masukkan informasi pengguna baru di bawah ini"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nama lengkap"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email pengguna"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => handleSelectChange("role", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="manager">Manajer</SelectItem>
                    <SelectItem value="auditor">Auditor</SelectItem>
                    <SelectItem value="client">Klien</SelectItem>
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
                    <SelectItem value="inactive">Tidak Aktif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {!isEditing && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Konfirmasi password"
                  />
                </div>
              </div>
            )}
            
            {isEditing && (
              <div className="border rounded-md p-4 bg-amber-50 text-amber-800">
                <p className="text-sm">
                  Untuk mengubah password, gunakan fitur reset password di halaman profil pengguna.
                </p>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSaveUser}>
              {isEditing ? "Simpan Perubahan" : "Tambah Pengguna"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Confirm Delete Dialog */}
      <Dialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus pengguna "{currentUser?.name}"? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
            <Button variant="outline" onClick={() => setConfirmDeleteOpen(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default UsersList;
