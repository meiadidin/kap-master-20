
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
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Phone, MapPin, Lock, Save, CheckCircle } from "lucide-react";

type UserData = {
  name: string;
  email: string;
  role: string;
};

const UserProfile = ({ currentUser }: { currentUser: UserData }) => {
  const { toast } = useToast();
  const [profileData, setProfileData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: "08123456789", // dummy data
    address: "Jl. Contoh No. 123, Jakarta", // dummy data
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      toast({
        title: "Berhasil",
        description: "Profil berhasil diperbarui",
      });
    }
    setIsEditing(!isEditing);
  };
  
  const handleChangePassword = () => {
    // Basic validation
    if (!passwordData.currentPassword) {
      toast({
        title: "Error",
        description: "Password saat ini diperlukan",
        variant: "destructive",
      });
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password baru harus minimal 6 karakter",
        variant: "destructive",
      });
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "Password baru dan konfirmasi tidak cocok",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate password change
    setTimeout(() => {
      setPasswordDialogOpen(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      
      toast({
        title: "Berhasil",
        description: "Password berhasil diubah",
      });
    }, 500);
  };
  
  // Get role label
  const getRoleLabel = (role: string) => {
    const roleLabels: Record<string, string> = {
      admin: "Administrator",
      manager: "Manajer",
      auditor: "Auditor",
      client: "Klien"
    };
    
    return roleLabels[role] || role;
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profil Pengguna</CardTitle>
          <CardDescription>
            Lihat dan kelola informasi profil Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Image */}
            <div className="flex flex-col items-center space-y-3">
              <div className="w-32 h-32 rounded-full bg-kap-light flex items-center justify-center">
                <span className="text-kap-navy text-5xl font-bold">
                  {profileData.name.charAt(0)}
                </span>
              </div>
              <p className="text-sm text-gray-500">{getRoleLabel(currentUser.role)}</p>
              <Button variant="outline" disabled={!isEditing} className="w-full">
                Ubah Foto
              </Button>
            </div>
            
            {/* Profile Form */}
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center">
                    <User size={16} className="mr-2" /> Nama Lengkap
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center">
                    <Mail size={16} className="mr-2" /> Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    disabled={true} // Email usually can't be changed directly
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center">
                    <Phone size={16} className="mr-2" /> Nomor Telepon
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center">
                  <MapPin size={16} className="mr-2" /> Alamat
                </Label>
                <Input
                  id="address"
                  name="address"
                  value={profileData.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              
              <Separator className="my-2" />
              
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  className="flex items-center"
                  onClick={() => setPasswordDialogOpen(true)}
                >
                  <Lock size={16} className="mr-2" />
                  Ubah Password
                </Button>
                
                <Button 
                  onClick={handleEditToggle} 
                  className={isEditing ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  {isEditing ? (
                    <>
                      <Save size={16} className="mr-2" />
                      Simpan Perubahan
                    </>
                  ) : (
                    "Edit Profil"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Password Change Dialog */}
      <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ubah Password</DialogTitle>
            <DialogDescription>
              Masukkan password lama dan password baru Anda.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Password Saat Ini</Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={handlePasswordInputChange}
                placeholder="Masukkan password saat ini"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">Password Baru</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={handlePasswordInputChange}
                placeholder="Masukkan password baru"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordInputChange}
                placeholder="Masukkan ulang password baru"
              />
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-sm">
              <p className="flex items-start text-amber-800">
                <CheckCircle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                Password harus minimal 6 karakter dan mengandung kombinasi huruf dan angka.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setPasswordDialogOpen(false)}
            >
              Batal
            </Button>
            <Button onClick={handleChangePassword}>
              Ubah Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserProfile;
