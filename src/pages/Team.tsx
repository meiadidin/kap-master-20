
import Hero from "@/components/Hero";
import TeamMember from "@/components/TeamMember";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Team = () => {
  const leadershipTeam = [
    {
      name: "Ahmad Santoso, CPA",
      position: "Managing Partner",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80",
      bio: "Berpengalaman lebih dari 20 tahun dalam audit dan konsultasi keuangan perusahaan besar di berbagai industri."
    },
    {
      name: "Siti Rahayu, CA",
      position: "Partner, Audit & Asuransi",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80",
      bio: "Spesialis dalam audit keuangan dengan fokus pada sektor perbankan dan jasa keuangan."
    },
    {
      name: "Budi Wijaya, MSc",
      position: "Partner, Konsultasi Pajak",
      image: "https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?auto=format&fit=crop&q=80",
      bio: "Ahli perpajakan dengan pengalaman luas dalam penanganan kasus pajak kompleks dan perencanaan pajak perusahaan."
    }
  ];

  const auditTeam = [
    {
      name: "Anita Wulandari, CPA",
      position: "Senior Manager, Audit",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80",
      bio: "Memiliki pengalaman lebih dari 12 tahun dalam audit keuangan perusahaan publik dan manufaktur."
    },
    {
      name: "Deni Setiawan, CA",
      position: "Manager, Audit",
      image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80",
      bio: "Spesialis audit di sektor retail dan FMCG dengan keahlian dalam audit berbasis risiko."
    },
    {
      name: "Maya Anggraini, CPA",
      position: "Manager, Audit",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
      bio: "Berpengalaman dalam audit perusahaan teknologi dan startup dengan fokus pada prosedur analitis."
    }
  ];

  const taxTeam = [
    {
      name: "Rudi Hartono, MSc",
      position: "Senior Manager, Pajak",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
      bio: "Ahli dalam perpajakan internasional dan transfer pricing dengan pengalaman 15 tahun."
    },
    {
      name: "Dewi Safitri, SE, Ak",
      position: "Manager, Pajak",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
      bio: "Spesialis kepatuhan pajak korporasi dan perencanaan pajak efisien bagi perusahaan multi-nasional."
    },
    {
      name: "Eko Purnomo, SE, BKP",
      position: "Manager, Pajak",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
      bio: "Berpengalaman dalam penanganan sengketa pajak dan restitusi PPN dengan tingkat keberhasilan tinggi."
    }
  ];

  const accountingTeam = [
    {
      name: "Indra Kusuma, CA",
      position: "Senior Manager, Akuntansi",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80",
      bio: "Ahli dalam penyusunan laporan keuangan sesuai PSAK dan IFRS dengan pengalaman lebih dari 10 tahun."
    },
    {
      name: "Lisa Permata, SE, Ak",
      position: "Manager, Akuntansi",
      image: "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&q=80",
      bio: "Spesialis dalam implementasi sistem akuntansi dan integrasi proses bisnis dengan teknologi."
    },
    {
      name: "Hendra Gunawan, ACCA",
      position: "Manager, Akuntansi",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80",
      bio: "Berpengalaman dalam konsolidasi laporan keuangan dan akuntansi untuk transaksi kompleks."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title="Tim KAP Indonesia"
        subtitle="Keahlian dan pengalaman kami menjamin layanan profesional terbaik untuk bisnis Anda"
        image="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&q=80"
        showButton={false}
      />

      {/* Team Introduction */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-kap-navy mb-6">Temui Para Ahli Kami</h2>
            <p className="text-gray-600">
              Tim kami terdiri dari profesional berpengalaman dan bersertifikasi di bidang akuntansi, perpajakan, dan keuangan. Dengan keahlian mendalam di berbagai industri, kami siap memberikan solusi terbaik untuk kebutuhan bisnis Anda.
            </p>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-bold text-kap-navy mb-8 text-center">Pimpinan KAP</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {leadershipTeam.map((member, index) => (
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

          <Tabs defaultValue="audit" className="mt-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-kap-navy mb-6">Tim Profesional Kami</h3>
              <TabsList className="inline-flex">
                <TabsTrigger value="audit">Tim Audit</TabsTrigger>
                <TabsTrigger value="tax">Tim Pajak</TabsTrigger>
                <TabsTrigger value="accounting">Tim Akuntansi</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="audit" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {auditTeam.map((member, index) => (
                  <TeamMember
                    key={index}
                    name={member.name}
                    position={member.position}
                    image={member.image}
                    bio={member.bio}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="tax" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {taxTeam.map((member, index) => (
                  <TeamMember
                    key={index}
                    name={member.name}
                    position={member.position}
                    image={member.image}
                    bio={member.bio}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="accounting" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {accountingTeam.map((member, index) => (
                  <TeamMember
                    key={index}
                    name={member.name}
                    position={member.position}
                    image={member.image}
                    bio={member.bio}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Certifications & Education */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-kap-navy mb-4">Sertifikasi & Kualifikasi</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Tim profesional kami memiliki berbagai sertifikasi dan kualifikasi yang diakui secara nasional dan internasional.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="font-semibold text-kap-navy">Certified Public Accountant (CPA)</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="font-semibold text-kap-navy">Chartered Accountant (CA)</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="font-semibold text-kap-navy">Certified Tax Consultant</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="font-semibold text-kap-navy">Certified Internal Auditor (CIA)</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="font-semibold text-kap-navy">ACCA</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="font-semibold text-kap-navy">Certified Fraud Examiner (CFE)</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="font-semibold text-kap-navy">Bersertifikasi Konsultan Pajak</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="font-semibold text-kap-navy">Chartered Financial Analyst (CFA)</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-kap-navy text-white rounded-lg shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Bergabunglah dengan Tim Kami</h2>
                <p className="mb-6">
                  Kami selalu mencari talenta terbaik untuk bergabung dengan tim profesional kami. Jika Anda memiliki passion di bidang akuntansi, perpajakan, atau keuangan, dan ingin mengembangkan karir di lingkungan yang dinamis dan mendukung, kami ingin mengenal Anda.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-kap-gold rounded-full mr-3"></div>
                    <p>Pengembangan profesional berkelanjutan</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-kap-gold rounded-full mr-3"></div>
                    <p>Lingkungan kerja kolaboratif</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-kap-gold rounded-full mr-3"></div>
                    <p>Kesempatan belajar dari para ahli</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-kap-gold rounded-full mr-3"></div>
                    <p>Jalur karir yang jelas</p>
                  </div>
                </div>
                <button className="mt-8 bg-kap-gold hover:bg-kap-light-gold text-kap-navy font-medium px-6 py-3 rounded">
                  Lihat Lowongan
                </button>
              </div>
              <div className="bg-cover bg-center h-64 md:h-auto" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80')" }}></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
