
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AddTeamMemberForm from "@/components/team/AddTeamMemberForm";
import TeamMemberCard from "@/components/team/TeamMemberCard";
import TeamMemberSkeleton from "@/components/team/TeamMemberSkeleton";
import { useToast } from "@/hooks/use-toast";

// Mock data for team members - in a real app, this would come from an API
const initialTeamMembers = [
  {
    id: "1",
    name: "Ahmad Faisal",
    position: "Senior Auditor",
    email: "ahmad.faisal@kapgar.com",
    phone: "081234567890",
    experience: "5 tahun",
    skills: ["Audit Keuangan", "Audit Internal"],
    workload: 85,
    initials: "AF"
  },
  {
    id: "2",
    name: "Siti Rahma",
    position: "Manager Pajak",
    email: "siti.rahma@kapgar.com",
    phone: "081234567891",
    experience: "7 tahun",
    skills: ["PPh Badan", "PPN", "Tax Planning"],
    workload: 75,
    initials: "SR"
  },
  {
    id: "3",
    name: "Budi Santoso",
    position: "Junior Auditor",
    email: "budi.santoso@kapgar.com",
    phone: "081234567892",
    experience: "2 tahun",
    skills: ["Audit Keuangan"],
    workload: 90,
    initials: "BS"
  },
  {
    id: "4",
    name: "Diana Putri",
    position: "Senior Tax Consultant",
    email: "diana.putri@kapgar.com",
    phone: "081234567893",
    experience: "6 tahun",
    skills: ["PPh Badan", "Perencanaan Pajak", "Transfer Pricing"],
    workload: 60,
    initials: "DP"
  },
  {
    id: "5",
    name: "Rio Andika",
    position: "Senior Consultant",
    email: "rio.andika@kapgar.com",
    phone: "081234567894",
    experience: "5 tahun",
    skills: ["Manajemen Risiko", "Due Diligence"],
    workload: 80,
    initials: "RA"
  },
  {
    id: "6",
    name: "Anita Wijaya",
    position: "Accounting Staff",
    email: "anita.wijaya@kapgar.com",
    phone: "081234567895",
    experience: "3 tahun",
    skills: ["Laporan Keuangan", "Rekonsiliasi"],
    workload: 70,
    initials: "AW"
  }
];

const TeamManagement = () => {
  const { toast } = useToast();
  const [isAddTeamMemberOpen, setIsAddTeamMemberOpen] = useState(false);
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("Semua");

  // Check user permissions from session storage
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
  const canAddTeamMember = ['managingpartner', 'partner'].includes(currentUser.role || '');

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleAddTeamMember = (newMember) => {
    // In real implementation, this would send data to the backend
    // For this demo, we'll just add to the local state
    
    // Create a new team member object
    const member = {
      id: (teamMembers.length + 1).toString(),
      name: newMember.name,
      position: newMember.position,
      email: newMember.email,
      phone: newMember.phone,
      experience: newMember.experience + " tahun",
      skills: newMember.skills,
      workload: Math.floor(Math.random() * 30) + 60, // Random workload between 60-90%
      initials: newMember.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    };
    
    // Update team members list
    setTeamMembers([...teamMembers, member]);
    
    // Close modal and show success message
    setIsAddTeamMemberOpen(false);
    
    toast({
      title: "Anggota tim berhasil ditambahkan!",
      description: `${newMember.name} telah ditambahkan sebagai ${newMember.position}`,
    });
  };

  // Filter team members based on search query
  const filteredTeamMembers = teamMembers.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.position.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterValue === "Semua") {
      return matchesSearch;
    }
    
    return matchesSearch && member.position.includes(filterValue);
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-kap-navy">Manajemen Tim</h1>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Input
              type="search"
              placeholder="Cari anggota tim..."
              className="w-60 md:w-80"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          
          <div className="flex items-center space-x-2">
            {canAddTeamMember && (
              <Button 
                className="bg-kap-navy hover:bg-kap-blue text-white gap-2"
                onClick={() => setIsAddTeamMemberOpen(true)}
              >
                <Plus size={16} />
                Tambah Anggota
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Team member grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          // Show skeletons while loading
          Array(6).fill(0).map((_, index) => (
            <TeamMemberSkeleton key={index} />
          ))
        ) : filteredTeamMembers.length > 0 ? (
          // Show team members
          filteredTeamMembers.map((member) => (
            <TeamMemberCard 
              key={member.id} 
              member={member} 
            />
          ))
        ) : (
          // No results
          <div className="col-span-3 py-20 text-center">
            <p className="text-gray-500 text-lg">Tidak ada anggota tim yang ditemukan.</p>
          </div>
        )}
      </div>

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
