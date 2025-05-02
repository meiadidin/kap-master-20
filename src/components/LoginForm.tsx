
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
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";

// Dummy user data for different roles
const dummyUsers = [
  { email: "admin@kapgar.com", password: "admin123", role: "admin", name: "Admin Utama" },
  { email: "admin2@kapgar.com", password: "admin123", role: "admin", name: "Admin Sekunder" },
  { email: "manager@kapgar.com", password: "manager123", role: "manager", name: "Manager" },
  { email: "auditor1@kapgar.com", password: "audit123", role: "auditor", name: "Auditor Senior" },
  { email: "auditor2@kapgar.com", password: "audit123", role: "auditor", name: "Auditor Junior" },
  { email: "client1@example.com", password: "client123", role: "client", name: "PT Maju Bersama" },
  { email: "client2@example.com", password: "client123", role: "client", name: "CV Teknologi Nusantara" },
  { email: "client3@example.com", password: "client123", role: "client", name: "PT Sejahtera Abadi" },
  { email: "client4@example.com", password: "client123", role: "client", name: "PT Bintang Timur" },
  { email: "client5@example.com", password: "client123", role: "client", name: "PT Global Indonesia" },
  { email: "mitra1@kapgar.com", password: "mitra123", role: "mitra", name: "Mitra Utama" }
];

const LoginForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
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
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setLoading(false);
      
      // Check if user exists in our dummy data
      const user = dummyUsers.find(
        user => 
          user.email === formData.email && 
          user.password === formData.password && 
          (formData.role === "any" || user.role === formData.role)
      );
      
      if (user) {
        // Save user in session storage or context
        sessionStorage.setItem('currentUser', JSON.stringify({
          name: user.name,
          email: user.email,
          role: user.role
        }));
        
        toast({
          title: "Login Berhasil",
          description: `Selamat datang kembali, ${user.name}`,
        });
        
        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        toast({
          title: "Login Gagal",
          description: "Email, password, atau tipe akun tidak valid. Silakan coba lagi.",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="role" className="text-gray-700">
          Tipe Akun
        </Label>
        <Select 
          value={formData.role} 
          onValueChange={handleRoleChange}
        >
          <SelectTrigger className="w-full rounded-lg border-gray-300 focus:ring-kap-blue">
            <SelectValue placeholder="Pilih tipe akun" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Administrator</SelectItem>
            <SelectItem value="manager">Manajer</SelectItem>
            <SelectItem value="auditor">Auditor</SelectItem>
            <SelectItem value="client">Klien</SelectItem>
            <SelectItem value="mitra">Mitra</SelectItem>
            <SelectItem value="any">Semua Tipe</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-700">
          Email
        </Label>
        <div className="relative">
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="nama@perusahaan.com"
            required
            className="w-full pl-10 rounded-lg border-gray-300 focus:ring-kap-blue"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-gray-700">
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            className="w-full pl-10 pr-10 rounded-lg border-gray-300 focus:ring-kap-blue"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
            onClick={toggleShowPassword}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
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
      </div>

      <Button
        type="submit"
        className="bg-gradient-to-r from-kap-navy to-kap-blue hover:from-kap-blue hover:to-kap-navy text-white w-full py-2.5 rounded-lg flex items-center justify-center transition-all duration-300"
        disabled={loading}
      >
        {loading ? (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <LogIn size={18} className="mr-2" />
        )}
        {loading ? "Memproses..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
