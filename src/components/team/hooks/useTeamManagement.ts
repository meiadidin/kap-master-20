
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { FormValues } from "../schema/teamMemberSchema";
import { usePermissions } from "./usePermissions";

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

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  experience: string;
  skills: string[];
  workload: number;
  initials: string;
}

export function useTeamManagement() {
  const { toast } = useToast();
  const [isAddTeamMemberOpen, setIsAddTeamMemberOpen] = useState(false);
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("Semua");
  const { canAddTeamMember } = usePermissions();

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleAddTeamMember = (newMember: FormValues) => {
    // In real implementation, this would send data to the backend
    // For this demo, we'll just add to the local state
    
    // Create a new team member object
    const member: TeamMember = {
      id: (teamMembers.length + 1).toString(),
      name: newMember.name,
      position: newMember.position,
      email: newMember.email,
      phone: newMember.phone,
      experience: newMember.experience + " tahun",
      skills: newMember.competencies,
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

  return {
    isAddTeamMemberOpen,
    setIsAddTeamMemberOpen,
    teamMembers,
    filteredTeamMembers,
    loading,
    searchQuery,
    setSearchQuery,
    filterValue,
    setFilterValue,
    handleAddTeamMember,
    canAddTeamMember
  };
}
