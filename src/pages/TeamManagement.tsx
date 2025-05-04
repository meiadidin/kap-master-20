
import React from "react";
import AddTeamMemberForm from "@/components/team/AddTeamMemberForm";
import SearchAndFilterBar from "@/components/team/SearchAndFilterBar";
import TeamMemberGrid from "@/components/team/TeamMemberGrid";
import { useTeamManagement } from "@/components/team/hooks/useTeamManagement";

const TeamManagement = () => {
  const {
    isAddTeamMemberOpen,
    setIsAddTeamMemberOpen,
    filteredTeamMembers,
    loading,
    searchQuery,
    setSearchQuery,
    handleAddTeamMember,
    canAddTeamMember
  } = useTeamManagement();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-kap-navy">Manajemen Tim</h1>
        
        <SearchAndFilterBar 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddClick={() => setIsAddTeamMemberOpen(true)}
          canAddTeamMember={canAddTeamMember}
        />
      </div>

      {/* Team member grid */}
      <TeamMemberGrid 
        loading={loading}
        members={filteredTeamMembers}
      />

      {/* Add Team Member Modal */}
      <AddTeamMemberForm 
        isOpen={isAddTeamMemberOpen}
        onClose={() => setIsAddTeamMemberOpen(false)}
        onSubmit={handleAddTeamMember}
      />
    </div>
  );
};

export default TeamManagement;
