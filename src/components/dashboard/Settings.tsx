
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Bell, Globe, Moon, Sun, History, Shield, Save } from "lucide-react";

type UserData = {
  name: string;
  email: string;
  role: string;
};

const Settings = ({ currentUser }: { currentUser: UserData }) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    theme: "light",
    language: "id",
    notifications: {
      email: true,
      browser: true,
      updates: false,
      marketing: false,
    },
    security: {
      twoFactor: false,
      sessionTimeout: "30",
      loginHistory: false,
    }
  });
  
  const handleThemeChange = (value: string) => {
    setSettings(prev => ({
      ...prev,
      theme: value
    }));
  };
  
  const handleLanguageChange = (value: string) => {
    setSettings(prev => ({
      ...prev,
      language: value
    }));
  };
  
  const handleNotificationToggle = (key: string) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key as keyof typeof prev.notifications]
      }
    }));
  };
  
  const handleSecurityToggle = (key: string) => {
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [key]: !prev.security[key as keyof typeof prev.security]
      }
    }));
  };
  
  const handleSecurityChange = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [key]: value
      }
    }));
  };
  
  const handleSaveSettings = () => {
    toast({
      title: "Pengaturan Disimpan",
      description: "Pengaturan Anda telah berhasil diperbarui.",
    });
  };
  
  return (
    <div className="space-y-6">
      {/* Appearance Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Tampilan</CardTitle>
          <CardDescription>
            Sesuaikan tampilan aplikasi sesuai preferensi Anda
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label>Tema</Label>
              <RadioGroup
                value={settings.theme}
                onValueChange={handleThemeChange}
                className="flex space-x-2 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="light" />
                  <Label htmlFor="light" className="flex items-center cursor-pointer">
                    <Sun size={18} className="mr-1 text-amber-500" />
                    Terang
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dark" id="dark" />
                  <Label htmlFor="dark" className="flex items-center cursor-pointer">
                    <Moon size={18} className="mr-1 text-indigo-400" />
                    Gelap
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="system" id="system" />
                  <Label htmlFor="system" className="cursor-pointer">Sistem</Label>
                </div>
              </RadioGroup>
            </div>
          
            <div>
              <Label htmlFor="language">Bahasa</Label>
              <Select value={settings.language} onValueChange={handleLanguageChange}>
                <SelectTrigger id="language" className="w-full sm:w-[240px] mt-2">
                  <SelectValue placeholder="Pilih bahasa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id">Bahasa Indonesia</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center">
            <Bell className="mr-2" size={18} />
            <CardTitle>Notifikasi</CardTitle>
          </div>
          <CardDescription>
            Kelola preferensi notifikasi Anda
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifikasi</Label>
                <p className="text-sm text-gray-500">
                  Terima pemberitahuan tentang dokumen dan aktivitas melalui email
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={settings.notifications.email}
                onCheckedChange={() => handleNotificationToggle('email')}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="browser-notifications">Notifikasi Browser</Label>
                <p className="text-sm text-gray-500">
                  Tampilkan pemberitahuan di browser saat Anda online
                </p>
              </div>
              <Switch
                id="browser-notifications"
                checked={settings.notifications.browser}
                onCheckedChange={() => handleNotificationToggle('browser')}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="updates-notifications">Pemberitahuan Pembaruan</Label>
                <p className="text-sm text-gray-500">
                  Terima pemberitahuan tentang pembaruan dan fitur baru
                </p>
              </div>
              <Switch
                id="updates-notifications"
                checked={settings.notifications.updates}
                onCheckedChange={() => handleNotificationToggle('updates')}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="marketing-notifications">Email Marketing</Label>
                <p className="text-sm text-gray-500">
                  Terima informasi penawaran dan newsletter KAP MGI GAR SURABAYA
                </p>
              </div>
              <Switch
                id="marketing-notifications"
                checked={settings.notifications.marketing}
                onCheckedChange={() => handleNotificationToggle('marketing')}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Security Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center">
            <Shield className="mr-2" size={18} />
            <CardTitle>Keamanan</CardTitle>
          </div>
          <CardDescription>
            Pengaturan keamanan untuk akun Anda
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="two-factor">Otentikasi Dua Faktor</Label>
                <p className="text-sm text-gray-500">
                  Tambahkan lapisan keamanan ekstra ke akun Anda
                </p>
              </div>
              <Switch
                id="two-factor"
                checked={settings.security.twoFactor}
                onCheckedChange={() => handleSecurityToggle('twoFactor')}
              />
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label htmlFor="session-timeout">Batas Waktu Sesi</Label>
              <p className="text-sm text-gray-500">
                Otomatis logout setelah periode tidak aktif
              </p>
              <Select 
                value={settings.security.sessionTimeout}
                onValueChange={(value) => handleSecurityChange('sessionTimeout', value)}
              >
                <SelectTrigger id="session-timeout" className="w-full sm:w-[240px] mt-1">
                  <SelectValue placeholder="Pilih durasi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 menit</SelectItem>
                  <SelectItem value="30">30 menit</SelectItem>
                  <SelectItem value="60">1 jam</SelectItem>
                  <SelectItem value="120">2 jam</SelectItem>
                  <SelectItem value="never">Tidak pernah</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center">
                  <History size={18} className="mr-2" />
                  <Label htmlFor="login-history">Riwayat Login</Label>
                </div>
                <p className="text-sm text-gray-500">
                  Dapatkan notifikasi ketika ada login baru pada akun Anda
                </p>
              </div>
              <Switch
                id="login-history"
                checked={settings.security.loginHistory}
                onCheckedChange={() => handleSecurityToggle('loginHistory')}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Language Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center">
            <Globe className="mr-2" size={18} />
            <CardTitle>Bahasa & Regional</CardTitle>
          </div>
          <CardDescription>
            Pengaturan bahasa dan format regional
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="date-format">Format Tanggal</Label>
              <Select defaultValue="dmy">
                <SelectTrigger id="date-format" className="w-full sm:w-[240px] mt-2">
                  <SelectValue placeholder="Pilih format tanggal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dmy">DD/MM/YYYY (31/12/2023)</SelectItem>
                  <SelectItem value="mdy">MM/DD/YYYY (12/31/2023)</SelectItem>
                  <SelectItem value="ymd">YYYY-MM-DD (2023-12-31)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="number-format">Format Angka</Label>
              <Select defaultValue="id">
                <SelectTrigger id="number-format" className="w-full sm:w-[240px] mt-2">
                  <SelectValue placeholder="Pilih format angka" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id">Indonesia (1.000.000,00)</SelectItem>
                  <SelectItem value="en">English (1,000,000.00)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="timezone">Zona Waktu</Label>
              <Select defaultValue="asia-jakarta">
                <SelectTrigger id="timezone" className="w-full sm:w-[240px] mt-2">
                  <SelectValue placeholder="Pilih zona waktu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asia-jakarta">Asia/Jakarta (GMT+7)</SelectItem>
                  <SelectItem value="asia-makassar">Asia/Makassar (GMT+8)</SelectItem>
                  <SelectItem value="asia-jayapura">Asia/Jayapura (GMT+9)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="flex items-center">
          <Save size={16} className="mr-2" />
          Simpan Pengaturan
        </Button>
      </div>
    </div>
  );
};

export default Settings;
