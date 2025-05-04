
import { Phone, Mail, Award, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface TeamMemberProps {
  member: {
    id: string;
    name: string;
    position: string;
    email: string;
    phone: string;
    experience: string;
    skills: string[];
    workload: number;
    initials: string;
  };
}

const TeamMemberCard = ({ member }: TeamMemberProps) => {
  // Get workload color based on percentage
  const getWorkloadColor = (workload: number) => {
    if (workload >= 90) return "bg-red-500";
    if (workload >= 75) return "bg-amber-500";
    return "bg-green-500";
  };

  return (
    <Card className="overflow-hidden">
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          {/* Avatar with Initials */}
          <div 
            className={`flex items-center justify-center w-14 h-14 rounded-full text-white font-bold text-lg
              ${member.workload >= 90 ? 'bg-red-600' : 
                member.workload >= 75 ? 'bg-amber-600' : 'bg-kap-navy'}`}
          >
            {member.initials}
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-kap-navy">{member.name}</h3>
            <p className="text-gray-600">{member.position}</p>
          </div>
          
          {/* Workload indicator */}
          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-500 mb-1">Beban Kerja</span>
            <Badge 
              variant="outline"
              className={`${
                member.workload >= 90 ? 'border-red-500 bg-red-50 text-red-700' : 
                member.workload >= 75 ? 'border-amber-500 bg-amber-50 text-amber-700' : 
                'border-green-500 bg-green-50 text-green-700'
              }`}
            >
              {member.workload}%
            </Badge>
          </div>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-start gap-3">
            <Mail className="w-4 h-4 mt-1 text-gray-500" />
            <span className="text-sm text-gray-700">{member.email}</span>
          </div>
          
          <div className="flex items-start gap-3">
            <Phone className="w-4 h-4 mt-1 text-gray-500" />
            <span className="text-sm text-gray-700">{member.phone}</span>
          </div>
          
          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 mt-1 text-gray-500" />
            <span className="text-sm text-gray-700">Pengalaman: {member.experience}</span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Keahlian:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {member.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Beban Kerja</span>
            <span className="text-xs font-medium">{member.workload}%</span>
          </div>
          <Progress value={member.workload} className={getWorkloadColor(member.workload)} />
        </div>
        
        <div className="flex justify-between mt-4 pt-4 border-t border-gray-100">
          <Button variant="outline" size="sm">
            Lihat Detail
          </Button>
          <Button variant="outline" size="sm">
            Atur Tugas
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TeamMemberCard;
