
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

const Register = () => {
  const { toast } = useToast();
  const { signUp, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // If user is already logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" />;
  }

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

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    // Validation
    if (!formData.name.trim()) {
      setLoading(false);
      return toast({
        title: "Nama Diperlukan",
        description: "Silakan masukkan nama Anda.",
        variant: "destructive",
      });
    }
    
    if (!formData.email.trim()) {
      setLoading(false);
      return toast({
        title: "Email Diperlukan",
        description: "Silakan masukkan email Anda.",
        variant: "destructive",
      });
    }
    
    if (formData.password.length < 6) {
      setLoading(false);
      return toast({
        title: "Password Terlalu Pendek",
        description: "Password harus minimal 6 karakter.",
        variant: "destructive",
      });
    }
    
    if (formData.password !== formData.confirmPassword) {
      setLoading(false);
      return toast({
        title: "Password Tidak Cocok",
        description: "Password dan konfirmasi password harus sama.",
        variant: "destructive",
      });
    }
    
    try {
      const { success, error } = await signUp(
        formData.email, 
        formData.password,
        formData.name
      );
      
      if (success) {
        toast({
          title: "Registrasi Berhasil",
          description: "Silahkan cek email Anda untuk verifikasi.",
        });
      } else {
        toast({
          title: "Registrasi Gagal",
          description: error || "Terjadi kesalahan saat mendaftar.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Registrasi Gagal",
        description: "Terjadi kesalahan saat mendaftar.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="login-card">
          <div className="text-center">
            <Link to="/" className="inline-block">
              <div className="flex flex-col items-center">
                <div className="flex items-center">
                  <span className="text-kap-navy font-merriweather font-bold text-lg">KAP</span>
                  <span className="text-kap-gold font-merriweather font-bold ml-1 text-lg">Surabaya</span>
                </div>
                <span className="text-gray-500 text-sm italic font-montserrat">a member of mgi worldwide</span>
              </div>
            </Link>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Register</h2>
            <p className="mt-2 text-base text-gray-600">
              Buat Akun Baru
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            <div className="space-y-2">
              <Label htmlFor="name" className="block text-sm font-medium text-gray-900">
                Nama Lengkap
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap Anda"
                required
                className="w-full py-2.5 px-3 rounded-md border border-gray-300 focus:ring-1 focus:ring-blue-500"
              />
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
              <Label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimal 6 karakter"
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
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">
                Konfirmasi Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Ulangi password Anda"
                  required
                  className="w-full py-2.5 px-3 rounded-md border border-gray-300 focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                  onClick={toggleShowConfirmPassword}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full flex items-center justify-center py-2.5 bg-gradient-to-r from-kap-navy to-kap-blue text-white rounded-md hover:from-kap-navy hover:to-kap-navy font-medium transition-all duration-300 gap-2"
              disabled={loading}
            >
              <UserPlus size={18} />
              {loading ? "Memproses..." : "Daftar"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Sudah memiliki akun?{" "}
              <Link to="/login" className="text-kap-blue hover:text-kap-navy font-medium">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      {/* Right side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="login-overlay"></div>
        <img src="/lovable-uploads/c783253a-9f5b-40c8-b96a-cf337753932a.png" alt="Professional team meeting" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12 bg-sky-700">
          <div className="max-w-lg">
            <h2 className="font-bold mb-6 text-center text-3xl my-[13px] mx-[14px]">Selamat Datang di Portal KAP Gideon Adi & Rekan Surabaya</h2>
            <p className="text-xl mb-8 text-justify">
              Akses dokumen, laporan audit, dan komunikasi dengan tim kami dengan mudah melalui portal terintegrasi.
            </p>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
              <div className="flex items-center mb-4">
                <div className="h-3 w-3 rounded-full bg-green-400 mr-2"></div>
                <p className="text-lg font-medium">Sistem Terintegrasi</p>
              </div>
              <div className="flex items-center mb-4">
                <div className="h-3 w-3 rounded-full bg-yellow-400 mr-2"></div>
                <p className="text-lg font-medium">Akses Dokumen Realtime</p>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-red-400 mr-2"></div>
                <p className="text-lg font-medium">Komunikasi Terpusat</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
