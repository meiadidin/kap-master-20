import LoginForm from "@/components/LoginForm";
import { Link } from "react-router-dom";
const Login = () => {
  return <div className="login-container">
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
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Login</h2>
            <p className="mt-2 text-base text-gray-600">
              Portal Mitra & Klien
            </p>
          </div>
          <LoginForm />
          
          {/* Contact Information for Registration */}
          <div className="text-center text-sm text-gray-500 pt-4">
            <p>Belum memiliki akun? Hubungi kami untuk registrasi</p>
            <div className="mt-2 flex flex-col sm:flex-row justify-center gap-2">
              <a href="tel:+62123456789" className="text-kap-blue hover:text-kap-navy font-medium">
                (021) 2345-6789
              </a>
              <span className="hidden sm:inline">atau</span>
              <a href="mailto:info@kapgar.com" className="text-kap-blue hover:text-kap-navy font-medium">
                info@kapgar.com
              </a>
            </div>
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
    </div>;
};
export default Login;