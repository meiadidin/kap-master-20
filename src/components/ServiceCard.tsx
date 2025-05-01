
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  className?: string;
}

const ServiceCard = ({ title, description, icon, link, className }: ServiceCardProps) => {
  return (
    <div className={cn("bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100", className)}>
      <div className="bg-kap-light inline-flex p-3 rounded-full mb-6 text-kap-navy">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-kap-navy">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <Link to={link} className="flex items-center text-kap-blue hover:text-kap-navy font-medium">
        <span>Pelajari lebih lanjut</span>
        <ArrowRight size={18} className="ml-2" />
      </Link>
    </div>
  );
};

export default ServiceCard;
