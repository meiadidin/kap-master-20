
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <span className="text-kap-navy font-poppins font-bold text-2xl">KAP</span>
            <span className="text-kap-gold font-poppins font-bold text-2xl ml-1">Indonesia</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-kap-navy hover:text-kap-blue font-medium">
              Beranda
            </Link>
            <Link to="/tentang-kami" className="text-kap-navy hover:text-kap-blue font-medium">
              Tentang Kami
            </Link>
            <Link to="/layanan" className="text-kap-navy hover:text-kap-blue font-medium">
              Layanan
            </Link>
            <Link to="/tim-kami" className="text-kap-navy hover:text-kap-blue font-medium">
              Tim Kami
            </Link>
            <Link to="/kontak" className="text-kap-navy hover:text-kap-blue font-medium">
              Kontak
            </Link>
            <Link to="/login">
              <Button className="bg-kap-navy hover:bg-kap-blue text-white flex items-center space-x-2">
                <User size={18} />
                <span>Login</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-kap-navy hover:text-kap-blue focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-kap-navy hover:text-kap-blue font-medium"
                onClick={toggleMenu}
              >
                Beranda
              </Link>
              <Link
                to="/tentang-kami"
                className="text-kap-navy hover:text-kap-blue font-medium"
                onClick={toggleMenu}
              >
                Tentang Kami
              </Link>
              <Link
                to="/layanan"
                className="text-kap-navy hover:text-kap-blue font-medium"
                onClick={toggleMenu}
              >
                Layanan
              </Link>
              <Link
                to="/tim-kami"
                className="text-kap-navy hover:text-kap-blue font-medium"
                onClick={toggleMenu}
              >
                Tim Kami
              </Link>
              <Link
                to="/kontak"
                className="text-kap-navy hover:text-kap-blue font-medium"
                onClick={toggleMenu}
              >
                Kontak
              </Link>
              <Link
                to="/login"
                className="bg-kap-navy text-white py-2 px-4 rounded flex items-center justify-center space-x-2"
                onClick={toggleMenu}
              >
                <User size={18} />
                <span>Login</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
