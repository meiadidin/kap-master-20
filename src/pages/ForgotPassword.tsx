
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const ForgotPassword = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Simple email validation
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!isValidEmail(email)) {
      toast({
        title: "Error",
        description: "Silakan masukkan alamat email yang valid.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate sending reset password email
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast({
        title: "Email Terkirim",
        description: "Instruksi reset password telah dikirim ke email Anda.",
      });
    }, 1500);
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
            <h1 className="text-2xl font-bold text-kap-navy mb-2 font-merriweather">Lupa Password?</h1>
            {!submitted ? (
              <p className="text-gray-600 font-montserrat">
                Masukkan alamat email Anda untuk menerima instruksi reset password
              </p>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Mail className="text-green-600" size={32} />
                </div>
                <p className="text-gray-600 font-montserrat">
                  Periksa email Anda untuk instruksi reset password. Jika Anda tidak menerima email dalam beberapa menit, periksa folder spam Anda.
                </p>
              </div>
            )}
          </div>
          
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 font-montserrat">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan alamat email Anda"
                  required
                  className="w-full font-montserrat"
                />
              </div>
              
              <Button
                type="submit"
                className="bg-kap-navy hover:bg-kap-blue text-white w-full font-montserrat"
                disabled={loading}
              >
                {loading ? "Memproses..." : "Kirim Instruksi Reset"}
              </Button>
            </form>
          ) : (
            <Button
              onClick={() => setSubmitted(false)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 w-full mt-4 font-montserrat"
            >
              Kirim Ulang
            </Button>
          )}
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

export default ForgotPassword;
