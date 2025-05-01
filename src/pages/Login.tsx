
import LoginForm from "@/components/LoginForm";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-kap-navy p-6">
          <div className="flex justify-center">
            <div className="text-center">
              <span className="text-white font-poppins font-bold text-2xl">KAP MGI GAR</span>
              <span className="text-kap-gold font-poppins font-bold text-2xl ml-1">SURABAYA</span>
            </div>
          </div>
        </div>
        
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-kap-navy mb-2">Portal Klien</h1>
            <p className="text-gray-600">
              Masuk untuk mengakses layanan dan dokumen Anda
            </p>
          </div>
          
          <LoginForm />
          
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Belum memiliki akun?{" "}
              <Link to="/kontak" className="text-kap-blue hover:underline">
                Hubungi kami
              </Link>{" "}
              untuk registrasi
            </p>
            <p className="mt-2 text-gray-600">
              <Link to="/lupa-password" className="text-kap-blue hover:underline">
                Lupa Password?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
