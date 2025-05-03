import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
interface HeroProps {
  title: string;
  subtitle?: string;
  image: string;
  showButton?: boolean;
  buttonText?: string;
  buttonLink?: string;
  overlay?: boolean;
  height?: string;
  position?: string;
}
const Hero = ({
  title,
  subtitle,
  image,
  showButton = true,
  buttonText = "Konsultasi Sekarang",
  buttonLink = "/kontak",
  overlay = true,
  height = "h-[500px]",
  position = "bg-center"
}: HeroProps) => {
  return <div className={`relative ${height} ${position} bg-cover bg-no-repeat w-full flex items-center`} style={{
    backgroundImage: `url(${image})`
  }}>
      {overlay && <div className="absolute inset-0 hero-gradient"></div>}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold text-white mb-4 md:text-5xl">{title}</h1>
          {subtitle && <p className="text-lg md:text-xl text-white/90 mb-8">
              {subtitle}
            </p>}
          {showButton && <Link to={buttonLink}>
              <Button className="bg-kap-gold hover:bg-kap-light-gold text-kap-navy hover:text-kap-blue font-medium text-lg px-8 py-6">
                {buttonText}
              </Button>
            </Link>}
        </div>
      </div>
    </div>;
};
export default Hero;