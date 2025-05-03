
import { useState } from "react";
import Hero from "@/components/Hero";
import JobCard from "@/components/JobCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

// Sample job listings data
const jobListings = [
  {
    id: 1,
    category: "Audit",
    jobType: "Full-time",
    title: "Senior Auditor",
    location: "Surabaya",
    fullTime: true,
    postedDate: "3 Mei 2025",
    description: "Bertanggung jawab untuk melakukan audit keuangan pada klien dari berbagai industri.",
    requirements: [
      "Sarjana Akuntansi",
      "Pengalaman 3+ tahun di bidang audit",
      "Memiliki sertifikasi CPA/CA",
      "Kemampuan analitis yang baik"
    ]
  },
  {
    id: 2,
    category: "Perpajakan",
    jobType: "Full-time",
    title: "Tax Consultant",
    location: "Surabaya",
    fullTime: true,
    postedDate: "1 Mei 2025",
    description: "Memberikan konsultasi perpajakan dan solusi perencanaan pajak untuk klien korporasi.",
    requirements: [
      "Sarjana Perpajakan/Akuntansi",
      "Pengalaman 2+ tahun di bidang perpajakan",
      "Bersertifikasi Konsultan Pajak",
      "Pemahaman mendalam tentang peraturan perpajakan Indonesia"
    ]
  },
  {
    id: 3,
    category: "Akuntansi",
    jobType: "Full-time",
    title: "Junior Accountant",
    location: "Surabaya",
    fullTime: true,
    postedDate: "28 April 2025",
    description: "Membantu dalam penyusunan laporan keuangan dan pembukuan untuk klien.",
    requirements: [
      "Minimal D3 Akuntansi",
      "Fresh graduate dipersilahkan melamar",
      "Memahami prinsip dasar akuntansi",
      "Teliti dan detail-oriented"
    ]
  },
  {
    id: 4,
    category: "Audit",
    jobType: "Part-time",
    title: "Audit Assistant",
    location: "Surabaya",
    fullTime: false,
    postedDate: "25 April 2025",
    description: "Membantu tim audit dalam pengumpulan data dan dokumentasi audit.",
    requirements: [
      "Mahasiswa tingkat akhir jurusan Akuntansi",
      "Memahami prinsip dasar audit",
      "Kemampuan komunikasi yang baik",
      "Dapat bekerja di bawah tekanan"
    ]
  }
];

const Careers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  
  // Filter jobs based on search term and filters
  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = categoryFilter === "all" || job.category === categoryFilter;
    const matchesType = typeFilter === "all" || 
      (typeFilter === "fulltime" && job.fullTime) || 
      (typeFilter === "parttime" && !job.fullTime);
      
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="min-h-screen">
      <Hero
        title="Karir di MGI Gideon Adi & Rekan"
        subtitle="Bergabunglah dengan tim kami dan kembangkan karir Anda di bidang akuntansi, audit, dan perpajakan"
        image="/lovable-uploads/c783253a-9f5b-40c8-b96a-cf337753932a.png"
        showButton={false}
        height="h-[400px]"
      />
      
      <section className="py-12 bg-kap-light">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-kap-navy mb-8 text-center">
              Temukan Posisi yang Sesuai dengan Keahlian Anda
            </h2>
            
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Cari posisi..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kategori</SelectItem>
                    <SelectItem value="Audit">Audit</SelectItem>
                    <SelectItem value="Perpajakan">Perpajakan</SelectItem>
                    <SelectItem value="Akuntansi">Akuntansi</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipe Pekerjaan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Tipe</SelectItem>
                    <SelectItem value="fulltime">Full-time</SelectItem>
                    <SelectItem value="parttime">Part-time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-6">
              {filteredJobs.length > 0 ? (
                filteredJobs.map(job => (
                  <JobCard
                    key={job.id}
                    category={job.category}
                    jobType={job.jobType}
                    title={job.title}
                    location={job.location}
                    fullTime={job.fullTime}
                    postedDate={job.postedDate}
                    description={job.description}
                    requirements={job.requirements}
                  />
                ))
              ) : (
                <div className="text-center py-16 bg-white rounded-lg border">
                  <h3 className="text-xl font-medium text-gray-600">Tidak ditemukan posisi yang sesuai</h3>
                  <p className="text-gray-500 mt-2">Silakan ubah filter pencarian Anda</p>
                  <Button 
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchTerm("");
                      setCategoryFilter("all");
                      setTypeFilter("all");
                    }}
                  >
                    Reset Filter
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-kap-navy mb-6">
            Tidak menemukan posisi yang sesuai?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Kami selalu mencari talenta berbakat untuk bergabung dengan tim kami. Kirimkan CV Anda dan kami akan menghubungi jika ada posisi yang cocok.
          </p>
          <a href="mailto:karir@kapgarsurabaya.co.id">
            <Button className="bg-kap-gold hover:bg-amber-500 text-kap-navy">
              Kirim CV Anda
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Careers;
