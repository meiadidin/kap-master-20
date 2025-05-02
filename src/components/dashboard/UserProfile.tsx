
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Pencil } from "lucide-react";

type UserData = {
  name: string;
  email: string;
  role: string;
};

const UserProfile = ({ currentUser }: { currentUser: UserData }) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  // User profile demo data
  const [profileData, setProfileData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    role: currentUser.role,
    position: getRoleDescription(currentUser.role),
    phone: "081234567890",
    address: "Jl. HR. Rasuna Said Blok X-5 Kav. 2-3, Jakarta Selatan",
    about: "Profesional berpengalaman di bidang akuntansi dan audit dengan fokus pada pengembangan layanan terbaik untuk klien."
  });

  function getRoleDescription(role: string): string {
    const roles: Record<string, string> = {
      "admin": "Administrator",
      "manager": "Manager",
      "auditor": "Auditor",
      "client": "Klien",
      "mitra": "Mitra",
      "managingpartner": "Managing Partner",
      "partner": "Partner"
    };
    
    return roles[role] || role;
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleSaveProfile = () => {
    // In a real app, this would save to backend
    setIsEditing(false);
    toast({
      title: "Profil Berhasil Disimpan",
      description: "Perubahan pada profil Anda telah disimpan.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Profil Pengguna</CardTitle>
            <CardDescription>
              Kelola informasi profil akun Anda
            </CardDescription>
          </div>
          <Button 
            className="mt-4 md:mt-0" 
            onClick={() => setIsEditing(!isEditing)}
          >
            <Pencil size={18} className="mr-2" />
            Edit Profil
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="personal">
          <TabsList className="mb-6">
            <TabsTrigger value="personal">Informasi Pribadi</TabsTrigger>
            <TabsTrigger value="security">Keamanan</TabsTrigger>
            <TabsTrigger value="professional">Profesional</TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal">
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex flex-col items-center">
                  <Avatar className="h-28 w-28">
                    <AvatarFallback className="bg-kap-navy text-white text-2xl">
                      {getInitials(profileData.name)}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="space-y-4 flex-1">
                  <div>
                    <h2 className="text-2xl font-bold">{profileData.name}</h2>
                    <p className="text-gray-500">{profileData.position}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Mail className="text-gray-400 mt-1" size={20} />
                      <div>
                        <p className="text-gray-500">Email</p>
                        <p>{profileData.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Phone className="text-gray-400 mt-1" size={20} />
                      <div>
                        <p className="text-gray-500">Nomor Telepon</p>
                        <p>{profileData.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <MapPin className="text-gray-400 mt-1" size={20} />
                      <div>
                        <p className="text-gray-500">Alamat</p>
                        <p>{profileData.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-gray-500 mb-2">Tentang Saya</p>
                <p>{profileData.about}</p>
              </div>

              {isEditing && (
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-semibold">Edit Informasi Pribadi</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nama Lengkap</label>
                      <Input 
                        value={profileData.name} 
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input 
                        value={profileData.email} 
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        disabled
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nomor Telepon</label>
                      <Input 
                        value={profileData.phone} 
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Alamat</label>
                      <Input 
                        value={profileData.address} 
                        onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium">Tentang Saya</label>
                      <Textarea 
                        value={profileData.about} 
                        onChange={(e) => setProfileData({...profileData, about: e.target.value})}
                        rows={4}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 pt-2">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Batal
                    </Button>
                    <Button onClick={handleSaveProfile}>
                      Simpan Perubahan
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Keamanan Akun</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password Saat Ini</label>
                    <Input type="password" placeholder="Masukkan password saat ini" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password Baru</label>
                    <Input type="password" placeholder="Masukkan password baru" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Konfirmasi Password Baru</label>
                    <Input type="password" placeholder="Konfirmasi password baru" />
                  </div>
                </div>
                <div className="pt-2">
                  <Button>Ubah Password</Button>
                </div>
              </div>

              <div className="border-t pt-6 space-y-4">
                <h3 className="text-lg font-medium">Verifikasi Dua Faktor</h3>
                <p className="text-gray-500">
                  Tambahkan lapisan keamanan tambahan ke akun Anda dengan verifikasi dua faktor.
                </p>
                <Button variant="outline">Aktifkan Verifikasi Dua Faktor</Button>
              </div>
            </div>
          </TabsContent>

          {/* Professional Tab */}
          <TabsContent value="professional">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Informasi Profesional</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Jabatan</label>
                    <Input value={profileData.position} disabled />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Departemen</label>
                    <Input placeholder="Finance & Accounting" disabled />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tanggal Bergabung</label>
                    <Input placeholder="01/01/2020" disabled />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Status Karyawan</label>
                    <Input placeholder="Tetap" disabled />
                  </div>
                </div>
              </div>

              <div className="border-t pt-6 space-y-4">
                <h3 className="text-lg font-medium">Sertifikasi & Lisensi</h3>
                <div className="space-y-2">
                  {currentUser.role === "managingpartner" || currentUser.role === "partner" ? (
                    <div className="rounded-lg border p-4">
                      <p className="font-medium">Certified Public Accountant (CPA)</p>
                      <p className="text-sm text-gray-500">Dikeluarkan oleh: Institut Akuntan Publik Indonesia</p>
                      <p className="text-sm text-gray-500">Tanggal Berlaku: 01/01/2020 - 31/12/2025</p>
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">Tidak ada sertifikasi yang ditambahkan.</p>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
