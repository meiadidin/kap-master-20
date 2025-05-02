
import LoginForm from "@/components/LoginForm";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-white to-gray-100">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center">
            <Link to="/" className="inline-block">
              <div className="flex flex-col items-center">
                <div className="flex items-center">
                  <span className="text-kap-navy font-poppins font-bold text-2xl">MGI Gideon Adi & Rekan</span>
                  <span className="text-kap-gold font-poppins font-bold text-2xl ml-1">SURABAYA</span>
                </div>
                <span className="text-gray-500 text-sm italic">a member of mgi worldwide</span>
              </div>
            </Link>
            <h2 className="mt-8 text-3xl font-extrabold text-gray-900">Login</h2>
            <p className="mt-2 text-base text-gray-600">
              Portal Mitra & Klien
            </p>
          </div>
          <LoginForm />
          <div className="mt-6 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Atau login dengan</span>
              </div>
            </div>
            <div className="mt-6 flex justify-center gap-3">
              <button className="w-1/2 flex items-center justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <svg className="h-5 w-5 mr-2" aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm5-14H7v2h10V8zm0 4H7v2h10v-2zm-3 4H7v2h7v-2z" fill="currentColor" />
                </svg>
                Google
              </button>
              <button className="w-1/2 flex items-center justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <svg className="h-5 w-5 mr-2" aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm5-14H7v2h10V8zm0 4H7v2h10v-2zm-3 4H7v2h7v-2z" fill="currentColor" />
                </svg>
                Apple
              </button>
            </div>
          </div>
          
          {/* Added Forgot Password Link and Contact Information */}
          <div className="space-y-4 pt-4">
            <div className="text-center">
              <Link to="/lupa-password" className="text-kap-blue hover:text-kap-navy transition-colors">
                Lupa password?
              </Link>
            </div>
            <div className="text-center text-sm text-gray-500 border-t pt-4">
              <p>Belum memiliki akun?</p>
              <p className="mt-1">
                Silakan hubungi kami di{" "}
                <a href="tel:+62123456789" className="text-kap-blue hover:text-kap-navy font-medium">
                  (021) 2345-6789
                </a>{" "}
                atau{" "}
                <a href="mailto:info@kapgar.com" className="text-kap-blue hover:text-kap-navy font-medium">
                  info@kapgar.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-kap-navy/90 to-kap-blue/80"></div>
        <img 
          src="/lovable-uploads/c783253a-9f5b-40c8-b96a-cf337753932a.png" 
          alt="Professional team meeting" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12">
          <div className="max-w-lg">
            <h2 className="text-4xl font-bold mb-6">Selamat Datang di Portal KAP</h2>
            <p className="text-xl mb-8">
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

export default Login;
