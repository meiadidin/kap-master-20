
import LoginForm from "@/components/LoginForm";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-6 md:p-8 rounded-lg shadow">
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
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Login</h2>
          <p className="mt-2 text-sm text-gray-600">
            Portal Mitra & Klien
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
