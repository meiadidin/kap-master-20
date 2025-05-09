
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Check } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

const ResetPassword = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    // Check if we have a hash fragment in the URL, which indicates
    // Supabase redirected the user here after clicking the reset password link
    const hash = window.location.hash;
    if (!hash) {
      toast({
        title: "Invalid Link",
        description: "Tautan reset password tidak valid atau telah kadaluarsa.",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [navigate, toast]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (password.length < 6) {
      toast({
        title: "Password Terlalu Pendek",
        description: "Password harus minimal 6 karakter.",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Password Tidak Cocok",
        description: "Password dan konfirmasi password harus sama.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message || "Terjadi kesalahan saat reset password.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Password Updated",
          description: "Password Anda telah berhasil diubah. Silakan login dengan password baru Anda.",
        });
        navigate("/login");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat reset password.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full">
        <CardHeader className="bg-kap-navy p-6">
          <div className="flex justify-center">
            <Link to="/" className="flex items-center">
              <span className="text-white font-merriweather font-bold text-2xl">KAP MGI GAR</span>
              <span className="text-kap-gold font-merriweather font-bold text-2xl ml-1">SURABAYA</span>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-kap-navy mb-2 font-merriweather">Reset Password</h1>
            <p className="text-gray-600 font-montserrat">
              Silakan masukkan password baru Anda
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium mb-2 font-montserrat">
                Password Baru
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  required
                  className="w-full font-montserrat"
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
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2 font-montserrat">
                Konfirmasi Password
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi password baru Anda"
                  required
                  className="w-full font-montserrat"
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
              className="bg-kap-navy hover:bg-kap-blue text-white w-full font-montserrat flex items-center justify-center gap-2"
              disabled={loading}
            >
              <Check size={18} />
              {loading ? "Memproses..." : "Ubah Password"}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="justify-center p-6 pt-0">
          <p className="text-center text-gray-600 font-montserrat">
            <Link to="/login" className="text-kap-blue hover:underline">
              Kembali ke halaman login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResetPassword;
