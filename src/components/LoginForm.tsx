
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const LoginForm = () => {
  const { toast } = useToast();
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "client"
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      role: value,
    }));
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { success, error } = await signIn(formData.email, formData.password);
      
      if (!success) {
        toast({
          title: "Login Gagal",
          description: error || "Email atau password tidak valid. Silakan coba lagi.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login Gagal",
        description: "Terjadi kesalahan saat login.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="role" className="block text-sm font-medium text-gray-900">
            Tipe Akun
          </Label>
          <Select 
            value={formData.role} 
            onValueChange={handleRoleChange}
          >
            <SelectTrigger className="w-full py-2.5 px-3 rounded-md border border-gray-300 bg-white focus:ring-1 focus:ring-blue-500">
              <SelectValue placeholder="Pilih tipe akun" />
            </SelectTrigger>
            <SelectContent className="z-50">
              {/* Mengubah urutan pilihan sesuai permintaan */}
              <SelectItem value="client">Klien</SelectItem>
              <SelectItem value="mitra">Mitra</SelectItem>
              <SelectItem value="auditor">Auditor</SelectItem>
              <SelectItem value="manager">Manajer</SelectItem>
              <SelectItem value="partner">Partner</SelectItem>
              <SelectItem value="managingpartner">Managing Partner</SelectItem>
              <SelectItem value="admin">Administrator</SelectItem>
              <SelectItem value="any">Semua Tipe</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="block text-sm font-medium text-gray-900">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Masukkan alamat email Anda"
            required
            className="w-full py-2.5 px-3 rounded-md border border-gray-300 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Password
            </Label>
            <Link to="/lupa-password" className="text-sm text-kap-blue hover:text-kap-navy">
              Lupa password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="Masukkan password Anda"
              required
              className="w-full py-2.5 px-3 rounded-md border border-gray-300 focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
              onClick={toggleShowPassword}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className="h-4 w-4 text-kap-blue focus:ring-kap-blue border-gray-300 rounded"
          />
          <Label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
            Ingat Saya
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full flex items-center justify-center py-2.5 bg-gradient-to-r from-kap-navy to-kap-blue text-white rounded-md hover:from-kap-navy hover:to-kap-navy font-medium transition-all duration-300 gap-2"
          disabled={loading}
        >
          <LogIn size={18} />
          {loading ? "Memproses..." : "Masuk"}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Atau login dengan</span>
          </div>
        </div>

        <button
          type="button"
          className="w-full flex items-center justify-center py-2.5 px-3 border rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
          Google
        </button>
      </form>

      {/* Order Baru Button */}
      <div className="pt-4 text-center">
        <Link to="/pesan-layanan" className="block">
          <Button 
            className="w-full bg-[#D4AF37] hover:bg-[#C09E2F] text-white font-medium transition-all duration-300"
          >
            Order Baru
          </Button>
        </Link>
      </div>
      <div className="text-center text-sm text-gray-600">
        <p>Pesan layanan profesional baru sekarang.</p>
      </div>
    </div>
  );
};

export default LoginForm;
