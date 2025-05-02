
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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Bell, Mail, Lock, Smartphone, Globe, Moon, Sun } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type UserData = {
  name: string;
  email: string;
  role: string;
};

const UserSettings = ({ currentUser }: { currentUser: UserData }) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      updates: false,
      marketing: false,
    },
    appearance: {
      theme: "system",
      fontSize: "medium",
      language: "id"
    },
    security: {
      twoFactor: false,
      sessions: [
        { device: "Chrome / Windows 10", location: "Jakarta, Indonesia", active: true, lastActive: "Sekarang" },
        { device: "Mobile App / Android", location: "Jakarta, Indonesia", active: false, lastActive: "2 hari yang lalu" }
      ]
    }
  });

  const handleNotificationChange = (field: keyof typeof settings.notifications) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: !prev.notifications[field]
      }
    }));
  };

  const handleThemeChange = (value: string) => {
    setSettings(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        theme: value
      }
    }));
  };

  const handleFontSizeChange = (value: string) => {
    setSettings(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        fontSize: value
      }
    }));
  };

  const handleLanguageChange = (value: string) => {
    setSettings(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        language: value
      }
    }));
  };

  const handleTwoFactorChange = () => {
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        twoFactor: !prev.security.twoFactor
      }
    }));

    if (!settings.security.twoFactor) {
      toast({
        title: "Autentikasi Dua Faktor",
        description: "Petunjuk aktivasi telah dikirim ke email Anda.",
      });
    }
  };

  const saveSettings = () => {
    toast({
      title: "Pengaturan Disimpan",
      description: "Pengaturan Anda telah berhasil diperbarui.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Pengaturan</CardTitle>
          <CardDescription>
            Kelola preferensi dan pengaturan akun Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="notifications" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-1 md:grid-cols-3 lg:max-w-md">
              <TabsTrigger value="notifications">Notifikasi</TabsTrigger>
              <TabsTrigger value="appearance">Tampilan</TabsTrigger>
              <TabsTrigger value="security">Keamanan</TabsTrigger>
            </TabsList>
            
            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email Notifikasi</h3>
                      <p className="text-sm text-gray-500">Terima notifikasi melalui email</p>
                    </div>
                  </div>
                  <Switch 
                    checked={settings.notifications.email}
                    onCheckedChange={() => handleNotificationChange("email")}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-full">
                      <Smartphone className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Notifikasi Push</h3>
                      <p className="text-sm text-gray-500">Terima notifikasi push pada perangkat</p>
                    </div>
                  </div>
                  <Switch 
                    checked={settings.notifications.push}
                    onCheckedChange={() => handleNotificationChange("push")}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-amber-100 rounded-full">
                      <Bell className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Pembaruan Sistem</h3>
                      <p className="text-sm text-gray-500">Terima pembaruan tentang fitur baru</p>
                    </div>
                  </div>
                  <Switch 
                    checked={settings.notifications.updates}
                    onCheckedChange={() => handleNotificationChange("updates")}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-full">
                      <Globe className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email Marketing</h3>
                      <p className="text-sm text-gray-500">Terima email mengenai layanan dan promosi</p>
                    </div>
                  </div>
                  <Switch 
                    checked={settings.notifications.marketing}
                    onCheckedChange={() => handleNotificationChange("marketing")}
                  />
                </div>
              </div>
              
              <Button onClick={saveSettings}>
                Simpan Pengaturan
              </Button>
            </TabsContent>
            
            {/* Appearance Tab */}
            <TabsContent value="appearance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tema Tampilan</CardTitle>
                  <CardDescription>
                    Sesuaikan tampilan aplikasi dengan preferensi Anda
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <Label>Tema</Label>
                      <RadioGroup 
                        value={settings.appearance.theme}
                        onValueChange={handleThemeChange}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="light" id="light" />
                          <Label htmlFor="light" className="flex items-center">
                            <Sun className="h-4 w-4 mr-2" />
                            Terang
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="dark" id="dark" />
                          <Label htmlFor="dark" className="flex items-center">
                            <Moon className="h-4 w-4 mr-2" />
                            Gelap
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="system" id="system" />
                          <Label htmlFor="system">Mengikuti Sistem</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <Label htmlFor="font-size">Ukuran Font</Label>
                      <Select 
                        value={settings.appearance.fontSize}
                        onValueChange={handleFontSizeChange}
                      >
                        <SelectTrigger id="font-size">
                          <SelectValue placeholder="Pilih ukuran font" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Kecil</SelectItem>
                          <SelectItem value="medium">Sedang</SelectItem>
                          <SelectItem value="large">Besar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <Label htmlFor="language">Bahasa</Label>
                      <Select 
                        value={settings.appearance.language}
                        onValueChange={handleLanguageChange}
                      >
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Pilih bahasa" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="id">Indonesia</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Button onClick={saveSettings}>
                Simpan Pengaturan
              </Button>
            </TabsContent>
            
            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Keamanan Akun</CardTitle>
                  <CardDescription>
                    Kelola opsi keamanan untuk melindungi akun Anda
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-kap-light rounded-full">
                        <Lock className="h-5 w-5 text-kap-navy" />
                      </div>
                      <div>
                        <h3 className="font-medium">Autentikasi Dua Faktor</h3>
                        <p className="text-sm text-gray-500">Tingkatkan keamanan dengan verifikasi tambahan</p>
                      </div>
                    </div>
                    <Switch 
                      checked={settings.security.twoFactor}
                      onCheckedChange={handleTwoFactorChange}
                    />
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Sesi Aktif</h3>
                    <div className="space-y-3">
                      {settings.security.sessions.map((session, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="space-y-1">
                            <div className="font-medium">{session.device}</div>
                            <div className="text-sm text-gray-500">
                              {session.location} • {session.active ? (
                                <span className="text-green-600">Aktif sekarang</span>
                              ) : (
                                <span>Aktif {session.lastActive}</span>
                              )}
                            </div>
                          </div>
                          {!session.active && (
                            <Button variant="outline" size="sm">
                              Akhiri Sesi
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Ubah Password</CardTitle>
                  <CardDescription>
                    Perbarui password akun Anda secara rutin untuk keamanan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Password Saat Ini</Label>
                      <Input type="password" id="current-password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Password Baru</Label>
                      <Input type="password" id="new-password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Konfirmasi Password Baru</Label>
                      <Input type="password" id="confirm-password" />
                    </div>
                    <Button>Perbarui Password</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserSettings;
