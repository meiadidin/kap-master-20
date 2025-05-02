
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Shield, Briefcase, Mail, Phone, MapPin, Calendar, Edit } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

type UserData = {
  name: string;
  email: string;
  role: string;
};

const UserProfile = ({ currentUser }: { currentUser: UserData }) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: currentUser.name,
    email: currentUser.email,
    phone: "081234567890",
    position: currentUser.role === "admin" ? "Administrator" : 
             currentUser.role === "manager" ? "Manajer" :
             currentUser.role === "auditor" ? "Auditor Senior" : 
             currentUser.role === "mitra" ? "Mitra Utama" : "Klien",
    address: "Jl. HR. Rasuna Said Blok X-5 Kav. 2-3, Jakarta Selatan",
    bio: "Profesional berpengalaman di bidang akuntansi dan audit dengan fokus pada pengembangan layanan terbaik untuk klien."
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate saving profile data
    setTimeout(() => {
      setIsEditing(false);
      
      toast({
        title: "Profil Diperbarui",
        description: "Informasi profil Anda telah berhasil diperbarui.",
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Profil Pengguna</CardTitle>
              <CardDescription>
                Kelola informasi profil akun Anda
              </CardDescription>
            </div>
            <Button 
              variant={isEditing ? "outline" : "default"}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Batal" : (
                <>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profil
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-2 md:grid-cols-3 lg:max-w-md">
              <TabsTrigger value="personal">Informasi Pribadi</TabsTrigger>
              <TabsTrigger value="security">Keamanan</TabsTrigger>
              {currentUser.role !== "client" && (
                <TabsTrigger value="professional">Profesional</TabsTrigger>
              )}
            </TabsList>
            
            {/* Personal Information */}
            <TabsContent value="personal" className="space-y-6">
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Nama Lengkap</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={profileData.fullName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleInputChange}
                          disabled
                          type="email"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Nomor Telepon</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="position">Jabatan</Label>
                        <Input
                          id="position"
                          name="position"
                          value={profileData.position}
                          onChange={handleInputChange}
                          disabled={["admin", "manager", "auditor", "client", "mitra"].includes(currentUser.role)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Alamat</Label>
                      <Input
                        id="address"
                        name="address"
                        value={profileData.address}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Biografi Singkat</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={profileData.bio}
                        onChange={handleInputChange}
                        rows={4}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsEditing(false)}
                    >
                      Batal
                    </Button>
                    <Button type="submit">
                      Simpan Perubahan
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center space-x-6">
                    <Avatar className="h-24 w-24 border-2">
                      <AvatarFallback className="text-xl bg-kap-navy text-white">
                        {profileData.fullName.split(' ').map(word => word[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <h2 className="text-xl font-semibold">{profileData.fullName}</h2>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Shield size={16} className="mr-1" />
                        <span>{profileData.position}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{profileData.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Nomor Telepon</p>
                        <p className="font-medium">{profileData.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start col-span-1 md:col-span-2">
                      <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Alamat</p>
                        <p className="font-medium">{profileData.address}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Tentang Saya</h3>
                    <p className="text-gray-700">{profileData.bio}</p>
                  </div>
                </div>
              )}
            </TabsContent>
            
            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Ubah Password</CardTitle>
                  <CardDescription>
                    Perbarui password akun Anda untuk keamanan yang lebih baik
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Password Saat Ini</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Password Baru</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    <Button>Perbarui Password</Button>
                  </form>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Login Dua Faktor</CardTitle>
                  <CardDescription>
                    Tingkatkan keamanan akun Anda dengan verifikasi dua langkah
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Autentikasi Dua Faktor</h3>
                      <p className="text-sm text-gray-500">Lindungi akun Anda dengan kode verifikasi tambahan</p>
                    </div>
                    <Button variant="outline">Aktifkan</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Professional Tab */}
            {currentUser.role !== "client" && (
              <TabsContent value="professional" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Informasi Profesional</CardTitle>
                    <CardDescription>
                      Detail profesional dan informasi karir Anda
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-start">
                        <Briefcase className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Jabatan</p>
                          <p className="font-medium">{profileData.position}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Bergabung Sejak</p>
                          <p className="font-medium">15 Januari 2020</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mt-4">
                      <h3 className="font-medium">Spesialisasi</h3>
                      <div className="flex flex-wrap gap-2">
                        <div className="bg-kap-light text-kap-navy px-3 py-1 rounded-full text-sm">
                          Audit Keuangan
                        </div>
                        <div className="bg-kap-light text-kap-navy px-3 py-1 rounded-full text-sm">
                          Perpajakan
                        </div>
                        <div className="bg-kap-light text-kap-navy px-3 py-1 rounded-full text-sm">
                          Konsultasi Bisnis
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mt-4">
                      <h3 className="font-medium">Sertifikasi</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li>Certified Public Accountant (CPA)</li>
                        <li>Chartered Accountant (CA)</li>
                        <li>Bersertifikat Konsultan Pajak (BKP)</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
