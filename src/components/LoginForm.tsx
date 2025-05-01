
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

// Dummy user data for different roles
const dummyUsers = [
  { email: "admin@kapgar.com", password: "admin123", role: "admin", name: "Admin Utama" },
  { email: "admin2@kapgar.com", password: "admin123", role: "admin", name: "Admin Sekunder" },
  { email: "manager@kapgar.com", password: "manager123", role: "manager", name: "Manajer Tim" },
  { email: "auditor1@kapgar.com", password: "audit123", role: "auditor", name: "Auditor Senior" },
  { email: "auditor2@kapgar.com", password: "audit123", role: "auditor", name: "Auditor Junior" },
  { email: "client1@example.com", password: "client123", role: "client", name: "PT Maju Bersama" },
  { email: "client2@example.com", password: "client123", role: "client", name: "CV Teknologi Nusantara" },
  { email: "client3@example.com", password: "client123", role: "client", name: "PT Sejahtera Abadi" },
  { email: "client4@example.com", password: "client123", role: "client", name: "PT Bintang Timur" },
  { email: "client5@example.com", password: "client123", role: "client", name: "PT Global Indonesia" }
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
      <div>
        <label htmlFor="role" className="block text-sm font-medium mb-2">
          Tipe Akun
        </label>
        <Select 
          value={formData.role} 
          onValueChange={handleRoleChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Pilih tipe akun" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Administrator</SelectItem>
            <SelectItem value="manager">Manajer</SelectItem>
            <SelectItem value="auditor">Auditor</SelectItem>
            <SelectItem value="client">Klien</SelectItem>
            <SelectItem value="any">Semua Tipe</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Masukkan alamat email Anda"
          required
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-2">
          Password
        </label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            placeholder="Masukkan password Anda"
            required
            className="w-full pr-10"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            onClick={toggleShowPassword}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <div className="mt-2 text-right">
          <a href="/lupa-password" className="text-sm text-kap-blue hover:underline">
            Lupa password?
          </a>
        </div>
      </div>

      <Button
        type="submit"
        className="bg-kap-navy hover:bg-kap-blue text-white w-full"
        disabled={loading}
      >
        {loading ? "Memproses..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
