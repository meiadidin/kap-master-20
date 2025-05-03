
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onSelect?: () => void;
  link?: string;
}

const ServiceCard = ({ title, description, icon, onSelect, link }: ServiceCardProps) => {
  const handleClick = () => {
    if (onSelect) {
      onSelect();
    }
  };

  const renderButton = () => {
    if (link) {
      return (
        <Link to={link} className="w-full">
          <Button 
            className="w-full bg-kap-navy hover:bg-kap-blue text-white"
          >
            Lihat Detail
          </Button>
        </Link>
      );
    }
    
    return (
      <Button 
        onClick={handleClick} 
        className="w-full bg-kap-navy hover:bg-kap-blue text-white"
      >
        Pilih Layanan Ini
      </Button>
    );
  };

  return (
    <Card className="h-full transition-all duration-300 hover:shadow-lg border-gray-200">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-kap-light text-kap-navy">
            {icon}
          </div>
          <h3 className="font-semibold text-lg text-kap-navy">{title}</h3>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-gray-600">{description}</p>
      </CardContent>
      <CardFooter>
        {renderButton()}
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
