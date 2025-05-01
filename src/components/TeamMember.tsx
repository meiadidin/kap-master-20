
import { Card, CardContent } from "@/components/ui/card";

interface TeamMemberProps {
  name: string;
  position: string;
  image: string;
  bio: string;
}

const TeamMember = ({ name, position, image, bio }: TeamMemberProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="h-64 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-kap-navy mb-1">{name}</h3>
        <p className="text-kap-blue mb-4">{position}</p>
        <p className="text-gray-600">{bio}</p>
      </CardContent>
    </Card>
  );
};

export default TeamMember;
