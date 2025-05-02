
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Search, PlusCircle, Edit, Trash2, UserPlus, Mail } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}

const dummyUsers: User[] = [
  { id: 1, name: "Admin Utama", email: "admin@kapgar.com", role: "admin", status: "active", lastLogin: "2024-04-01T08:30:00" },
  { id: 2, name: "Admin Sekunder", email: "admin2@kapgar.com", role: "admin", status: "active", lastLogin: "2024-04-02T10:15:00" },
  { id: 3, name: "Manager", email: "manager@kapgar.com", role: "manager", status: "active", lastLogin: "2024-04-01T09:20:00" },
  { id: 4, name: "Auditor Senior", email: "auditor1@kapgar.com", role: "auditor", status: "active", lastLogin: "2024-04-02T12:30:00" },
  { id: 5, name: "Auditor Junior", email: "auditor2@kapgar.com", role: "auditor", status: "active", lastLogin: "2024-04-01T14:45:00" },
  { id: 6, name: "PT Maju Bersama", email: "client1@example.com", role: "client", status: "active", lastLogin: "2024-04-01T11:10:00" },
  { id: 7, name: "CV Teknologi Nusantara", email: "client2@example.com", role: "client", status: "active", lastLogin: "2024-04-02T09:30:00" },
  { id: 8, name: "PT Sejahtera Abadi", email: "client3@example.com", role: "client", status: "inactive", lastLogin: "2024-03-15T10:20:00" },
  { id: 9, name: "PT Bintang Timur", email: "client4@example.com", role: "client", status: "active", lastLogin: "2024-04-01T16:15:00" },
  { id: 10, name: "PT Global Indonesia", email: "client5@example.com", role: "client", status: "active", lastLogin: "2024-03-30T15:40:00" },
  { id: 11, name: "Mitra Utama", email: "mitra1@kapgar.com", role: "mitra", status: "active", lastLogin: "2024-04-01T08:50:00" }
];

const statusColors: Record<string, string> = {
  "active": "bg-green-100 text-green-800",
  "inactive": "bg-gray-100 text-gray-800",
  "pending": "bg-amber-100 text-amber-800",
  "blocked": "bg-red-100 text-red-800"
};

const statusLabels: Record<string, string> = {
  "active": "Aktif",
  "inactive": "Tidak Aktif",
  "pending": "Pending",
  "blocked": "Diblokir"
};

const UserManagement = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>(dummyUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showInactiveUsers, setShowInactiveUsers] = useState(true);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "client",
    status: "active"
  });
  
  const [inviteEmails, setInviteEmails] = useState("");
  const [inviteRole, setInviteRole] = useState("client");
  
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
  
  const handleAddUser = () => {
    if (!formData.name || !formData.email || !formData.role) {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua field yang diperlukan",
        variant: "destructive"
      });
      return;
    }
    
    const newUser = {
      id: users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: formData.status,
      lastLogin: "-"
    };
    
    setUsers([...users, newUser]);
    setIsAddUserDialogOpen(false);
    
    toast({
      title: "Pengguna Ditambahkan",
      description: "Pengguna baru telah berhasil ditambahkan"
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      role: "client",
      status: "active"
    });
  };
  
  const handleEditUser = () => {
    if (!formData.name || !formData.email || !formData.role || !selectedUser) {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua field yang diperlukan",
        variant: "destructive"
      });
      return;
    }
    
    const updatedUsers = users.map(user => 
      user.id === selectedUser.id ? 
      { ...user, name: formData.name, email: formData.email, role: formData.role, status: formData.status } : 
      user
    );
    
    setUsers(updatedUsers);
    setIsEditUserDialogOpen(false);
    
    toast({
      title: "Pengguna Diperbarui",
      description: "Informasi pengguna telah berhasil diperbarui"
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      role: "client",
      status: "active"
    });
  };
  
  const handleDeleteUser = () => {
    if (selectedUser) {
      const updatedUsers = users.filter(user => user.id !== selectedUser.id);
      setUsers(updatedUsers);
      setIsDeleteDialogOpen(false);
      
      toast({
        title: "Pengguna Dihapus",
        description: "Pengguna telah berhasil dihapus"
      });
    }
  };
  
  const handleInviteUsers = () => {
    const emails = inviteEmails.split(',').map(email => email.trim()).filter(email => email);
    
    if (emails.length === 0) {
      toast({
        title: "Error",
        description: "Mohon masukkan minimal satu alamat email",
        variant: "destructive"
      });
      return;
    }
    
    setIsInviteDialogOpen(false);
    
    toast({
      title: "Undangan Terkirim",
      description: `Undangan telah dikirim ke ${emails.length} pengguna`
    });
    
    // Reset form
    setInviteEmails("");
    setInviteRole("client");
  };
  
  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setIsEditUserDialogOpen(true);
  };
  
  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };
  
  const toggleUserStatus = (userId: number, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    );
    
    setUsers(updatedUsers);
    
    toast({
      title: "Status Diperbarui",
      description: `Status pengguna diubah menjadi ${statusLabels[newStatus]}`
    });
  };
  
  // Format date to readable format
  const formatDate = (dateString: string) => {
    if (dateString === "-") return "-";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Filter users
  const filteredUsers = users.filter(user => {
    const roleMatch = filterRole === "all" || user.role === filterRole;
    const statusMatch = filterStatus === "all" || user.status === filterStatus;
    const inactiveMatch = showInactiveUsers || user.status !== "inactive";
    
    const searchMatch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return roleMatch && statusMatch && searchMatch && inactiveMatch;
  });
  
  // Group users by role for the active tabs
  const staffUsers = filteredUsers.filter(user => ["admin", "manager", "auditor"].includes(user.role));
  const clientUsers = filteredUsers.filter(user => user.role === "client");
  const mitraUsers = filteredUsers.filter(user => user.role === "mitra");
  
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Manajemen Pengguna</CardTitle>
            <CardDescription>
              Kelola pengguna dan hak akses sistem
            </CardDescription>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button
              variant="outline"
              onClick={() => setIsInviteDialogOpen(true)}
            >
              <Mail className="mr-2 h-4 w-4" />
              Undang
            </Button>
            <Button 
              onClick={() => setIsAddUserDialogOpen(true)}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Tambah Pengguna
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Cari pengguna..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Role</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="auditor">Auditor</SelectItem>
                <SelectItem value="client">Klien</SelectItem>
                <SelectItem value="mitra">Mitra</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="inactive">Tidak Aktif</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="blocked">Diblokir</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mb-4">
          <Switch
            id="show-inactive"
            checked={showInactiveUsers}
            onCheckedChange={setShowInactiveUsers}
          />
          <Label htmlFor="show-inactive">Tampilkan pengguna tidak aktif</Label>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">Semua Pengguna</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
            <TabsTrigger value="clients">Klien</TabsTrigger>
            <TabsTrigger value="mitra">Mitra</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="rounded-md border">
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
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarFallback className="bg-kap-navy text-white">
                                  {user.name.split(' ').map(word => word[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              {user.name}
                            </div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-kap-light text-kap-navy">
                              {user.role === "admin" ? "Admin" :
                               user.role === "manager" ? "Manager" :
                               user.role === "auditor" ? "Auditor" :
                               user.role === "client" ? "Klien" : "Mitra"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Badge variant="outline" className={statusColors[user.status]}>
                                {statusLabels[user.status]}
                              </Badge>
                              <Switch
                                className="ml-2"
                                checked={user.status === "active"}
                                onCheckedChange={() => toggleUserStatus(user.id, user.status)}
                              />
                            </div>
                          </TableCell>
                          <TableCell>{formatDate(user.lastLogin)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditClick(user)}
                              >
                                <Edit size={16} />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-500 hover:text-red-600"
                                onClick={() => handleDeleteClick(user)}
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
          </TabsContent>
          
          <TabsContent value="staff">
            <div className="rounded-md border">
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
                    {staffUsers.length > 0 ? (
                      staffUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarFallback className="bg-kap-navy text-white">
                                  {user.name.split(' ').map(word => word[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              {user.name}
                            </div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-kap-light text-kap-navy">
                              {user.role === "admin" ? "Admin" :
                              user.role === "manager" ? "Manager" : "Auditor"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Badge variant="outline" className={statusColors[user.status]}>
                                {statusLabels[user.status]}
                              </Badge>
                              <Switch
                                className="ml-2"
                                checked={user.status === "active"}
                                onCheckedChange={() => toggleUserStatus(user.id, user.status)}
                              />
                            </div>
                          </TableCell>
                          <TableCell>{formatDate(user.lastLogin)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditClick(user)}
                              >
                                <Edit size={16} />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-500 hover:text-red-600"
                                onClick={() => handleDeleteClick(user)}
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
                          Tidak ada pengguna staff yang ditemukan
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="clients">
            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Login Terakhir</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clientUsers.length > 0 ? (
                      clientUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarFallback className="bg-kap-blue text-white">
                                  {user.name.split(' ').map(word => word[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              {user.name}
                            </div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Badge variant="outline" className={statusColors[user.status]}>
                                {statusLabels[user.status]}
                              </Badge>
                              <Switch
                                className="ml-2"
                                checked={user.status === "active"}
                                onCheckedChange={() => toggleUserStatus(user.id, user.status)}
                              />
                            </div>
                          </TableCell>
                          <TableCell>{formatDate(user.lastLogin)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditClick(user)}
                              >
                                <Edit size={16} />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-500 hover:text-red-600"
                                onClick={() => handleDeleteClick(user)}
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
                        <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                          Tidak ada klien yang ditemukan
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="mitra">
            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Login Terakhir</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mitraUsers.length > 0 ? (
                      mitraUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarFallback className="bg-kap-gold text-white">
                                  {user.name.split(' ').map(word => word[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              {user.name}
                            </div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Badge variant="outline" className={statusColors[user.status]}>
                                {statusLabels[user.status]}
                              </Badge>
                              <Switch
                                className="ml-2"
                                checked={user.status === "active"}
                                onCheckedChange={() => toggleUserStatus(user.id, user.status)}
                              />
                            </div>
                          </TableCell>
                          <TableCell>{formatDate(user.lastLogin)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditClick(user)}
                              >
                                <Edit size={16} />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-500 hover:text-red-600"
                                onClick={() => handleDeleteClick(user)}
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
                        <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                          Tidak ada mitra yang ditemukan
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      {/* Add User Dialog */}
      <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Tambah Pengguna Baru</DialogTitle>
            <DialogDescription>
              Tambahkan pengguna baru ke sistem
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Masukkan nama lengkap"
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
                placeholder="Masukkan alamat email"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => handleSelectChange("role", value)}
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder="Pilih role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="auditor">Auditor</SelectItem>
                  <SelectItem value="client">Klien</SelectItem>
                  <SelectItem value="mitra">Mitra</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="inactive">Tidak Aktif</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleAddUser}>
              Tambah Pengguna
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit User Dialog */}
      <Dialog open={isEditUserDialogOpen} onOpenChange={setIsEditUserDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Pengguna</DialogTitle>
            <DialogDescription>
              Perbarui informasi pengguna
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nama Lengkap</Label>
              <Input
                id="edit-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Masukkan nama lengkap"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Masukkan alamat email"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-role">Role</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => handleSelectChange("role", value)}
              >
                <SelectTrigger id="edit-role">
                  <SelectValue placeholder="Pilih role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="auditor">Auditor</SelectItem>
                  <SelectItem value="client">Klien</SelectItem>
                  <SelectItem value="mitra">Mitra</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger id="edit-status">
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="inactive">Tidak Aktif</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="blocked">Diblokir</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditUserDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleEditUser}>
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete User Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Hapus Pengguna</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus pengguna ini? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="py-2">
              <div className="flex items-center space-x-3 p-3 border rounded-md bg-gray-50">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-kap-navy text-white">
                    {selectedUser.name.split(' ').map(word => word[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedUser.name}</p>
                  <p className="text-sm text-gray-500">{selectedUser.email}</p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              Hapus Pengguna
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Invite Users Dialog */}
      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Undang Pengguna</DialogTitle>
            <DialogDescription>
              Kirim undangan email kepada pengguna baru
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="invite-emails">Alamat Email</Label>
              <Textarea
                id="invite-emails"
                value={inviteEmails}
                onChange={(e) => setInviteEmails(e.target.value)}
                placeholder="Masukkan alamat email (pisahkan dengan koma untuk banyak email)"
                rows={4}
              />
              <p className="text-sm text-gray-500">Pisahkan beberapa alamat email dengan koma</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="invite-role">Role</Label>
              <Select
                value={inviteRole}
                onValueChange={setInviteRole}
              >
                <SelectTrigger id="invite-role">
                  <SelectValue placeholder="Pilih role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="auditor">Auditor</SelectItem>
                  <SelectItem value="client">Klien</SelectItem>
                  <SelectItem value="mitra">Mitra</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleInviteUsers}>
              Kirim Undangan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default UserManagement;
