
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setLoading(false);
      
      // For demo purposes - would be replaced with actual authentication
      if (formData.email && formData.password) {
        toast({
          title: "Login Berhasil",
          description: "Selamat datang kembali di portal KAP Indonesia.",
        });
      } else {
        toast({
          title: "Login Gagal",
          description: "Email atau password tidak valid. Silakan coba lagi.",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
          <a href="#" className="text-sm text-kap-blue hover:underline">
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
