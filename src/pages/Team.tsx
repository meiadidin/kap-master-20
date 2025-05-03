
import { useState } from "react";
import Hero from "@/components/Hero";
import TeamMember from "@/components/TeamMember";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TeamMemberForm from "@/components/TeamMemberForm";

const Team = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Check user role from session storage (this should be replaced with a proper auth system)
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{"role": ""}');
  const canAddMembers = ['managingpartner', 'partner'].includes(currentUser?.role || '');

  // Team members data
  const teamMembers = [
    {
      name: "Dr. Gideon Setyo Budiwitjaksono",
      position: "Managing Partner",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      bio: "Dr. Gideon memiliki pengalaman lebih dari 20 tahun dalam audit keuangan dan konsultasi bisnis. Beliau adalah ahli dalam audit sektor publik dan keuangan perusahaan multinasional."
    },
    {
      name: "Hendri Yanto",
      position: "Partner",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      bio: "Hendri adalah spesialis dalam bidang perpajakan dan struktur keuangan perusahaan. Dengan lebih dari 15 tahun pengalaman, beliau telah membantu banyak klien dalam optimasi perpajakan."
    },
    {
      name: "Anita Wijaya",
      position: "Senior Manager",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      bio: "Anita memiliki keahlian dalam manajemen risiko dan audit internal. Dengan latar belakang di industri perbankan, beliau membawa perspektif yang berharga dalam implementasi sistem kontrol internal."
    },
    {
      name: "Budi Santoso",
      position: "Manager",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      bio: "Budi adalah spesialis dalam akuntansi forensik dan investigasi fraud. Beliau telah menangani berbagai kasus kompleks dan memberikan kesaksian ahli dalam persidangan."
    },
    {
      name: "Diana Putri",
      position: "Senior Auditor",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1061&q=80",
      bio: "Diana memiliki spesialisasi dalam audit laporan keuangan dan kepatuhan regulasi. Dengan pengalaman di berbagai industri, beliau mampu memberikan insight yang berharga bagi klien."
    },
    {
      name: "Ahmad Faisal",
      position: "Auditor",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      bio: "Ahmad fokus pada implementasi sistem akuntansi dan teknologi informasi. Beliau membantu klien dalam mengoptimalkan proses bisnis mereka melalui solusi teknologi."
    },
    {
      name: "Siti Rahma",
      position: "Staff",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      bio: "Siti adalah anggota tim yang berdedikasi dengan keahlian dalam pembukuan dan penyusunan laporan keuangan. Beliau saat ini sedang mempersiapkan diri untuk sertifikasi akuntan profesional."
    },
    {
      name: "Rio Andika",
      position: "Staff",
      image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      bio: "Rio memiliki latar belakang dalam analisis data dan statistik. Beliau berkontribusi dalam pengembangan metodologi audit yang lebih efisien dan berbasis data."
    },
  ];

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen">
      <Hero
        title="Tim Profesional Kami"
        subtitle="Berkenalan dengan tim ahli kami yang siap memberikan solusi terbaik untuk kebutuhan akuntansi dan audit bisnis Anda"
        image="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
        showButton={false}
      />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h2 className="text-3xl font-bold text-kap-navy mb-4">Manajemen Tim</h2>
              <p className="text-gray-600 max-w-3xl">
                Tim kami terdiri dari para profesional berpengalaman dengan keahlian yang beragam di bidang akuntansi, perpajakan, dan konsultasi bisnis.
              </p>
            </div>
            
            {/* "Tambah Anggota" button - only visible to Managing Partner and Partner roles */}
            {canAddMembers && (
              <div className="flex justify-center md:justify-end">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-6 py-5 h-auto rounded-md"
                  onClick={handleOpenForm}
                >
                  <Plus size={20} />
                  <span className="text-base">Tambah Anggota</span>
                </Button>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember
                key={index}
                name={member.name}
                position={member.position}
                image={member.image}
                bio={member.bio}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Team Member Form Modal */}
      <TeamMemberForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
      />
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-kap-navy mb-6">
            Bergabung dengan Tim Kami
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            Kami selalu mencari talenta-talenta terbaik untuk bergabung dengan tim profesional kami.
            Jika Anda memiliki passion di bidang akuntansi, perpajakan, atau audit, kunjungi halaman karir kami.
          </p>
          <Button className="bg-kap-navy hover:bg-kap-blue text-white px-8" asChild>
            <a href="/karir">Lihat Lowongan</a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Team;
