
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-kap-navy text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <span className="text-white font-poppins font-bold text-2xl">KAP</span>
              <span className="text-kap-gold font-poppins font-bold text-2xl ml-1">Indonesia</span>
            </div>
            <p className="text-gray-300 mb-4">
              Memberikan solusi akuntansi profesional dan terpercaya untuk membantu bisnis Anda berkembang dengan dasar keuangan yang kuat.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-kap-gold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-kap-gold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-kap-gold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-kap-gold transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/tentang-kami" className="text-gray-300 hover:text-kap-gold transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/layanan" className="text-gray-300 hover:text-kap-gold transition-colors">
                  Layanan
                </Link>
              </li>
              <li>
                <Link to="/tim-kami" className="text-gray-300 hover:text-kap-gold transition-colors">
                  Tim Kami
                </Link>
              </li>
              <li>
                <Link to="/kontak" className="text-gray-300 hover:text-kap-gold transition-colors">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Informasi Kontak</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="mr-2 text-kap-gold flex-shrink-0 mt-1" size={18} />
                <span className="text-gray-300">
                  Gedung Menara Kadin Indonesia Lt. 15, Jl. HR. Rasuna Said Blok X-5 Kav. 2-3, Jakarta Selatan 12950
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 text-kap-gold flex-shrink-0" size={18} />
                <span className="text-gray-300">(021) 5274362</span>
              </div>
              <div className="flex items-center">
                <Mail className="mr-2 text-kap-gold flex-shrink-0" size={18} />
                <span className="text-gray-300">info@kapindonesia.co.id</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 mt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} KAP Indonesia. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
