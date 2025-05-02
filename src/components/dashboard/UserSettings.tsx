
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Mail, Smartphone, Bell, Globe } from "lucide-react";

type UserData = {
  name: string;
  email: string;
  role: string;
};

const UserSettings = ({ currentUser }: { currentUser: UserData }) => {
  const { toast } = useToast();
  // Notification settings state
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    systemUpdates: false,
    marketingEmails: false
  });

  // Display settings state
  const [displaySettings, setDisplaySettings] = useState({
    darkMode: false,
    compactView: false,
    highContrast: false,
    largeText: false
  });

  // Security settings state
  const [securitySettings, setSecuritySettings] = useState({
    loginAlerts: true,
    twoFactorAuth: false,
    sessionTimeout: true,
    dataEncryption: true
  });

  const handleSaveSettings = () => {
    toast({
      title: "Pengaturan Disimpan",
      description: "Perubahan pengaturan Anda telah disimpan.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pengaturan</CardTitle>
        <CardDescription>
          Kelola preferensi dan pengaturan akun Anda
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="notifications">
          <TabsList className="mb-6">
            <TabsTrigger value="notifications">Notifikasi</TabsTrigger>
            <TabsTrigger value="display">Tampilan</TabsTrigger>
            <TabsTrigger value="security">Keamanan</TabsTrigger>
          </TabsList>

          {/* Notification Settings Tab */}
          <TabsContent value="notifications">
            <div className="space-y-6">
              <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Mail className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="font-medium">Email Notifikasi</h4>
                    <p className="text-sm text-gray-500">Terima notifikasi melalui email</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.emailNotifications}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, emailNotifications: checked }))}
                />
              </div>

              <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Smartphone className="h-6 w-6 text-green-700" />
                  </div>
                  <div>
                    <h4 className="font-medium">Notifikasi Push</h4>
                    <p className="text-sm text-gray-500">Terima notifikasi push pada perangkat</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.pushNotifications}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, pushNotifications: checked }))}
                />
              </div>

              <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 p-2 rounded-full">
                    <Bell className="h-6 w-6 text-amber-700" />
                  </div>
                  <div>
                    <h4 className="font-medium">Pembaruan Sistem</h4>
                    <p className="text-sm text-gray-500">Terima pembaruan tentang fitur baru</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.systemUpdates}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, systemUpdates: checked }))}
                />
              </div>

              <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Globe className="h-6 w-6 text-purple-700" />
                  </div>
                  <div>
                    <h4 className="font-medium">Email Marketing</h4>
                    <p className="text-sm text-gray-500">Terima email mengenai layanan dan promosi</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.marketingEmails}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, marketingEmails: checked }))}
                />
              </div>
            </div>
          </TabsContent>

          {/* Display Settings Tab */}
          <TabsContent value="display">
            <div className="space-y-6">
              <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                <div>
                  <h4 className="font-medium">Mode Gelap</h4>
                  <p className="text-sm text-gray-500">Ubah tampilan aplikasi ke mode gelap</p>
                </div>
                <Switch
                  checked={displaySettings.darkMode}
                  onCheckedChange={(checked) => setDisplaySettings(prev => ({ ...prev, darkMode: checked }))}
                />
              </div>

              <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                <div>
                  <h4 className="font-medium">Tampilan Kompak</h4>
                  <p className="text-sm text-gray-500">Tampilkan lebih banyak konten dalam satu layar</p>
                </div>
                <Switch
                  checked={displaySettings.compactView}
                  onCheckedChange={(checked) => setDisplaySettings(prev => ({ ...prev, compactView: checked }))}
                />
              </div>

              <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                <div>
                  <h4 className="font-medium">Kontras Tinggi</h4>
                  <p className="text-sm text-gray-500">Tingkatkan keterbacaan dengan kontras yang lebih tinggi</p>
                </div>
                <Switch
                  checked={displaySettings.highContrast}
                  onCheckedChange={(checked) => setDisplaySettings(prev => ({ ...prev, highContrast: checked }))}
                />
              </div>

              <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                <div>
                  <h4 className="font-medium">Teks Besar</h4>
                  <p className="text-sm text-gray-500">Tingkatkan ukuran teks untuk keterbacaan yang lebih baik</p>
                </div>
                <Switch
                  checked={displaySettings.largeText}
                  onCheckedChange={(checked) => setDisplaySettings(prev => ({ ...prev, largeText: checked }))}
                />
              </div>
            </div>
          </TabsContent>

          {/* Security Settings Tab */}
          <TabsContent value="security">
            <div className="space-y-6">
              <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                <div>
                  <h4 className="font-medium">Peringatan Login</h4>
                  <p className="text-sm text-gray-500">Terima peringatan saat terjadi login baru</p>
                </div>
                <Switch
                  checked={securitySettings.loginAlerts}
                  onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, loginAlerts: checked }))}
                />
              </div>

              <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                <div>
                  <h4 className="font-medium">Otentikasi Dua Faktor</h4>
                  <p className="text-sm text-gray-500">Tingkatkan keamanan dengan otentikasi tambahan</p>
                </div>
                <Switch
                  checked={securitySettings.twoFactorAuth}
                  onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, twoFactorAuth: checked }))}
                />
              </div>

              <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                <div>
                  <h4 className="font-medium">Batas Waktu Sesi</h4>
                  <p className="text-sm text-gray-500">Logout otomatis setelah 30 menit tidak aktif</p>
                </div>
                <Switch
                  checked={securitySettings.sessionTimeout}
                  onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: checked }))}
                />
              </div>

              <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                <div>
                  <h4 className="font-medium">Enkripsi Data</h4>
                  <p className="text-sm text-gray-500">Enkripsi data sensitif saat transmisi</p>
                </div>
                <Switch
                  checked={securitySettings.dataEncryption}
                  onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, dataEncryption: checked }))}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <Button onClick={handleSaveSettings}>
            Simpan Pengaturan
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserSettings;
