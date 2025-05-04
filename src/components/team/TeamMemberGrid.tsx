
import React from "react";
import { TeamMember } from "./hooks/useTeamManagement";
import TeamMemberCard from "./TeamMemberCard";
import TeamMemberSkeleton from "./TeamMemberSkeleton";

interface TeamMemberGridProps {
  loading: boolean;
  members: TeamMember[];
}

const TeamMemberGrid: React.FC<TeamMemberGridProps> = ({ loading, members }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6).fill(0).map((_, index) => (
          <TeamMemberSkeleton key={index} />
        ))}
      </div>
    );
  }
  
  if (members.length === 0) {
    return (
      <div className="col-span-3 py-20 text-center">
        <p className="text-gray-500 text-lg">Tidak ada anggota tim yang ditemukan.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {members.map((member) => (
        <TeamMemberCard 
          key={member.id} 
          member={member} 
        />
      ))}
    </div>
  );
};

export default TeamMemberGrid;
