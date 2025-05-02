
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Plus, Mail, UserPlus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type UserData = {
  name: string;
  email: string;
  role: string;
};

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  lastLogin: string;
  initial: string;
}

const UsersList = ({ currentUser }: { currentUser: UserData }) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showInactive, setShowInactive] = useState(false);
  const [currentTab, setCurrentTab] = useState("all");
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  
  // Sample users data
  const [users, setUsers] = useState<User[]>([
    { 
      id: "1", 
      name: "Admin Utama", 
      email: "admin@kapgar.com", 
      role: "admin", 
      status: "active", 
      lastLogin: "01 Apr 2024, 08:30", 
      initial: "AU"
    },
    { 
      id: "2", 
      name: "Admin Sekunder", 
      email: "admin2@kapgar.com", 
      role: "admin", 
      status: "active", 
      lastLogin: "02 Apr 2024, 10:15", 
      initial: "AS"
    },
    { 
      id: "3", 
      name: "Manager", 
      email: "manager@kapgar.com", 
      role: "manager", 
      status: "active",
      lastLogin: "01 Apr 2024, 09:20", 
      initial: "M"
    },
    { 
      id: "4", 
      name: "Auditor Senior", 
      email: "auditor1@kapgar.com", 
      role: "auditor", 
      status: "active", 
      lastLogin: "02 Apr 2024, 12:30", 
      initial: "AS"
    },
    { 
      id: "5", 
      name: "Auditor Junior", 
      email: "auditor2@kapgar.com", 
      role: "auditor", 
      status: "active", 
      lastLogin: "01 Apr 2024, 14:45", 
      initial: "AJ"
    },
    { 
      id: "6", 
      name: "PT Maju Bersama", 
      email: "client1@example.com", 
      role: "client", 
      status: "active", 
      lastLogin: "01 Apr 2024, 11:10", 
      initial: "PMB"
    },
    { 
      id: "7", 
      name: "CV Teknologi Nusantara", 
      email: "client2@example.com", 
      role: "client", 
      status: "active", 
      lastLogin: "30 Mar 2024, 15:25", 
      initial: "CTN"
    },
    { 
      id: "8", 
      name: "PT Sejahtera Abadi", 
      email: "client3@example.com", 
      role: "client", 
      status: "inactive", 
      lastLogin: "25 Mar 2024, 09:40", 
      initial: "PSA"
    },
    { 
      id: "9", 
      name: "Mitra Utama", 
      email: "mitra1@kapgar.com", 
      role: "mitra", 
      status: "active", 
      lastLogin: "02 Apr 2024, 11:05", 
      initial: "MU"
    },
    { 
      id: "10", 
      name: "Dr. Gideon Setyo Budiwitjaksono", 
      email: "managingpartner@kapgar.com", 
      role: "managingpartner", 
      status: "active", 
      lastLogin: "02 Apr 2024, 08:15", 
      initial: "GS"
    },
    { 
      id: "11", 
      name: "Hendri Yanto", 
      email: "partner1@kapgar.com", 
      role: "partner", 
      status: "active", 
      lastLogin: "01 Apr 2024, 10:30", 
      initial: "HY"
    }
  ]);

  const [inviteForm, setInviteForm] = useState({
    email: '',
    role: 'client'
  });

  const [newUserForm, setNewUserForm] = useState({
    name: '',
    email: '',
    role: 'client',
    password: '',
    confirmPassword: ''
  });

  // Handle invite submission
  const handleInviteSubmit = () => {
    toast({
      title: "Undangan Terkirim",
      description: `Undangan telah dikirim ke ${inviteForm.email}`,
    });
    setInviteDialogOpen(false);
    // Reset form
    setInviteForm({ email: '', role: 'client' });
  };

  // Handle add user submission
  const handleAddUserSubmit = () => {
    // Validate form
    if (!newUserForm.name || !newUserForm.email || !newUserForm.password) {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua field yang wajib diisi",
        variant: "destructive"
      });
      return;
    }
    
    if (newUserForm.password !== newUserForm.confirmPassword) {
      toast({
        title: "Error",
        description: "Password dan konfirmasi password tidak cocok",
        variant: "destructive"
      });
      return;
    }

    // Add new user
    const initials = newUserForm.name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);

    const newUser: User = {
      id: (users.length + 1).toString(),
      name: newUserForm.name,
      email: newUserForm.email,
      role: newUserForm.role,
      status: "active",
      lastLogin: "-",
      initial: initials
    };

    setUsers([...users, newUser]);
    setAddUserDialogOpen(false);
    
    toast({
      title: "Pengguna Berhasil Ditambahkan",
      description: `${newUserForm.name} telah ditambahkan sebagai ${newUserForm.role}`,
    });
    
    // Reset form
    setNewUserForm({
      name: '',
      email: '',
      role: 'client',
      password: '',
      confirmPassword: ''
    });
  };

  // Toggle user status
  const toggleUserStatus = (userId: string) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        const newStatus = user.status === "active" ? "inactive" : "active";
        return { ...user, status: newStatus };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    
    const targetUser = users.find(u => u.id === userId);
    if (targetUser) {
      toast({
        title: `Status Diperbarui`,
        description: `${targetUser.name} sekarang ${targetUser.status === "active" ? "tidak aktif" : "aktif"}`,
      });
    }
  };

  // Delete user
  const handleDeleteUser = (userId: string) => {
    const targetUser = users.find(u => u.id === userId);
    if (!targetUser) return;
    
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    
    toast({
      title: "Pengguna Dihapus",
      description: `${targetUser.name} telah dihapus dari sistem`,
    });
  };

  // Filter users based on search, role, status
  const filteredUsers = users.filter(user => {
    const matchSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchRole = filterRole === "all" || user.role === filterRole;
    const matchStatus = filterStatus === "all" || user.status === filterStatus;
    const matchInactive = showInactive ? true : user.status === "active";
    const matchTab = 
      (currentTab === "all") || 
      (currentTab === "staff" && ["admin", "manager", "auditor", "managingpartner", "partner"].includes(user.role)) ||
      (currentTab === "client" && user.role === "client") ||
      (currentTab === "mitra" && user.role === "mitra");

    return matchSearch && matchRole && matchStatus && matchInactive && matchTab;
  });

  // Get role display name
  const getRoleDisplayName = (role: string) => {
    const roles: Record<string, string> = {
      "admin": "Admin",
      "manager": "Manager",
      "auditor": "Auditor",
      "client": "Klien",
      "mitra": "Mitra",
      "managingpartner": "Managing Partner",
      "partner": "Partner"
    };
    
    return roles[role] || role;
  };

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
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline" onClick={() => setInviteDialogOpen(true)}>
              <Mail size={18} className="mr-2" />
              Undang
            </Button>
            <Button onClick={() => setAddUserDialogOpen(true)}>
              <UserPlus size={18} className="mr-2" />
              Tambah Pengguna
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Cari pengguna..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={filterRole} onValueChange={setFilterRole}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Semua Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Role</SelectItem>
              <SelectItem value="managingpartner">Managing Partner</SelectItem>
              <SelectItem value="partner">Partner</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="auditor">Auditor</SelectItem>
              <SelectItem value="client">Klien</SelectItem>
              <SelectItem value="mitra">Mitra</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Semua Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="active">Aktif</SelectItem>
              <SelectItem value="inactive">Tidak Aktif</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center mb-6">
          <Label className="flex items-center space-x-2">
            <Switch 
              checked={showInactive} 
              onCheckedChange={setShowInactive} 
            />
            <span>Tampilkan pengguna tidak aktif</span>
          </Label>
        </div>

        <Tabs defaultValue="all" value={currentTab} onValueChange={setCurrentTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">Semua Pengguna</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
            <TabsTrigger value="client">Klien</TabsTrigger>
            <TabsTrigger value="mitra">Mitra</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="rounded-md border overflow-hidden">
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
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-kap-navy text-white">
                            {user.initial}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        user.role === "admin" || user.role === "managingpartner" || user.role === "partner" 
                          ? "bg-blue-100 text-blue-800 border-blue-200"
                          : user.role === "manager" || user.role === "auditor"
                          ? "bg-green-100 text-green-800 border-green-200" 
                          : user.role === "client"
                          ? "bg-amber-100 text-amber-800 border-amber-200"
                          : "bg-purple-100 text-purple-800 border-purple-200"
                      }>
                        {getRoleDisplayName(user.role)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Badge variant={user.status === "active" ? "default" : "secondary"} className={
                          user.status === "active" 
                            ? "bg-green-100 text-green-800 border-green-200" 
                            : "bg-gray-100 text-gray-800 border-gray-200"
                        }>
                          {user.status === "active" ? "Aktif" : "Tidak Aktif"}
                        </Badge>
                        <Switch 
                          className="ml-2" 
                          checked={user.status === "active"}
                          onCheckedChange={() => toggleUserStatus(user.id)}
                          disabled={user.email === currentUser.email}
                        />
                      </div>
                    </TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="icon">
                          <Pencil size={16} />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-500 hover:text-red-600"
                          onClick={() => handleDeleteUser(user.id)}
                          disabled={user.email === currentUser.email}
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

        {/* Invite User Dialog */}
        <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Undang Pengguna Baru</DialogTitle>
              <DialogDescription>
                Kirim undangan ke email untuk bergabung dengan sistem.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  placeholder="email@contoh.com" 
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select 
                  value={inviteForm.role}
                  onValueChange={(value) => setInviteForm(prev => ({ ...prev, role: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client">Klien</SelectItem>
                    <SelectItem value="mitra">Mitra</SelectItem>
                    <SelectItem value="auditor">Auditor</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setInviteDialogOpen(false)}>
                Batal
              </Button>
              <Button type="submit" onClick={handleInviteSubmit}>
                Kirim Undangan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add User Dialog */}
        <Dialog open={addUserDialogOpen} onOpenChange={setAddUserDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Pengguna Baru</DialogTitle>
              <DialogDescription>
                Buat akun pengguna baru dengan role yang sesuai.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input 
                    id="name" 
                    placeholder="Nama lengkap pengguna"
                    value={newUserForm.name}
                    onChange={(e) => setNewUserForm(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="email@contoh.com"
                    value={newUserForm.email}
                    onChange={(e) => setNewUserForm(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select 
                  value={newUserForm.role}
                  onValueChange={(value) => setNewUserForm(prev => ({ ...prev, role: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client">Klien</SelectItem>
                    <SelectItem value="mitra">Mitra</SelectItem>
                    <SelectItem value="auditor">Auditor</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="partner">Partner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Masukkan password"
                  value={newUserForm.password}
                  onChange={(e) => setNewUserForm(prev => ({ ...prev, password: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  placeholder="Konfirmasi password"
                  value={newUserForm.confirmPassword}
                  onChange={(e) => setNewUserForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddUserDialogOpen(false)}>
                Batal
              </Button>
              <Button type="submit" onClick={handleAddUserSubmit}>
                Tambah Pengguna
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default UsersList;
