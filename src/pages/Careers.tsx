
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Clock, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const Careers = () => {
  // Sample job openings data
  const jobOpenings = [
    {
      id: 1,
      title: "Senior Auditor",
      department: "Audit",
      location: "Surabaya",
      type: "Full-time",
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
      title: "Tax Consultant",
      department: "Perpajakan",
      location: "Surabaya",
      type: "Full-time",
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
      title: "Junior Auditor",
      department: "Audit",
      location: "Surabaya",
      type: "Full-time",
      postedDate: "2 Mei 2025",
      description: "Membantu tim audit dalam pelaksanaan prosedur audit dan dokumentasi.",
      requirements: [
        "Sarjana Akuntansi",
        "Fresh graduate atau pengalaman 0-1 tahun",
        "Pengetahuan tentang standar akuntansi dan audit",
        "Kemampuan bekerja dalam tim"
      ]
    },
    {
      id: 4,
      title: "Accounting Specialist",
      department: "Akuntansi",
      location: "Surabaya",
      type: "Full-time",
      postedDate: "30 April 2025",
      description: "Membantu klien dalam penyusunan laporan keuangan dan implementasi sistem akuntansi.",
      requirements: [
        "Sarjana Akuntansi",
        "Pengalaman 2+ tahun di bidang akuntansi",
        "Pemahaman yang baik tentang PSAK",
        "Kemampuan mengoperasikan software akuntansi"
      ]
    },
    {
      id: 5,
      title: "Risk Management Consultant",
      department: "Konsultasi",
      location: "Surabaya",
      type: "Full-time",
      postedDate: "29 April 2025",
      description: "Membantu klien mengidentifikasi dan mengelola risiko bisnis dan keuangan.",
      requirements: [
        "Sarjana Akuntansi/Manajemen/Ekonomi",
        "Pengalaman 3+ tahun di bidang manajemen risiko",
        "Sertifikasi terkait manajemen risiko",
        "Kemampuan analitis dan komunikasi yang baik"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title="Karir di KAP Gideon Adi & Rekan Surabaya"
        subtitle="Bergabunglah dengan tim profesional kami dan kembangkan karir Anda di bidang akuntansi, audit, dan perpajakan"
        image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
        showButton={false}
      />

      {/* Career Introduction */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-kap-navy mb-6">Lowongan Pekerjaan</h2>
            <p className="text-gray-600">
              Kami selalu mencari talenta terbaik untuk bergabung dengan tim profesional kami. Jika Anda memiliki passion di bidang akuntansi, perpajakan, atau keuangan, dan ingin mengembangkan karir di lingkungan yang dinamis dan mendukung, temukan peluang karir yang sesuai dengan minat dan keahlian Anda.
            </p>
          </div>

          {/* Job Listings */}
          <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
            {jobOpenings.map((job) => (
              <Card key={job.id} className="overflow-hidden border-l-4 border-l-kap-navy">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className="bg-kap-navy text-white">{job.department}</Badge>
                        <Badge variant="outline" className="text-gray-600">{job.type}</Badge>
                      </div>
                      <h3 className="text-xl font-bold text-kap-navy mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPin size={16} className="mr-1" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock size={16} className="mr-1" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-1" />
                          <span>Diposting: {job.postedDate}</span>
                        </div>
                      </div>
                      <p className="mb-4">{job.description}</p>
                      <div>
                        <h4 className="font-semibold mb-2">Persyaratan:</h4>
                        <ul className="list-disc pl-5">
                          {job.requirements.map((requirement, index) => (
                            <li key={index} className="mb-1">{requirement}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <Button className="bg-kap-navy hover:bg-kap-blue text-white w-full md:w-auto">
                        Lamar Sekarang
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No jobs message - will show if jobOpenings array is empty */}
          {jobOpenings.length === 0 && (
            <div className="text-center p-8 bg-gray-50 rounded-lg max-w-2xl mx-auto">
              <Briefcase className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-xl font-semibold mb-2">Tidak Ada Lowongan Saat Ini</h3>
              <p className="text-gray-600">
                Saat ini tidak ada posisi yang tersedia. Silakan periksa kembali nanti atau kirimkan lamaran spontan Anda.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-kap-navy mb-6 text-center">Proses Lamaran</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-12 h-12 bg-kap-navy rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">1</div>
                <h3 className="font-semibold text-lg mb-2">Lamaran</h3>
                <p className="text-gray-600">Kirim CV dan surat lamaran Anda untuk posisi yang tersedia</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-12 h-12 bg-kap-navy rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">2</div>
                <h3 className="font-semibold text-lg mb-2">Wawancara</h3>
                <p className="text-gray-600">Proses seleksi melalui wawancara dan tes kompetensi</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-12 h-12 bg-kap-navy rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">3</div>
                <h3 className="font-semibold text-lg mb-2">Bergabung</h3>
                <p className="text-gray-600">Mulai perjalanan karir profesional Anda bersama kami</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-kap-navy mb-6 text-center">Mengapa Bergabung Dengan Kami</h2>
            <div className="bg-kap-navy text-white rounded-lg shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 md:p-12">
                  <h3 className="text-xl font-bold mb-6">Benefit & Pengembangan Karir</h3>
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
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-kap-gold rounded-full mr-3"></div>
                      <p>Paket kompensasi yang kompetitif</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-kap-gold rounded-full mr-3"></div>
                      <p>Program kesehatan dan kesejahteraan karyawan</p>
                    </div>
                  </div>
                </div>
                <div className="bg-cover bg-center h-64 md:h-auto" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80')" }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spontaneous Application */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-kap-navy mb-4">Tidak Menemukan Posisi yang Sesuai?</h2>
            <p className="text-gray-600 mb-8">
              Kami selalu terbuka untuk talenta berbakat. Jika Anda tidak menemukan posisi yang sesuai, Anda dapat mengirimkan lamaran spontan.
            </p>
            <Link to="/kontak">
              <Button className="bg-kap-navy hover:bg-kap-blue text-white px-8">
                Kirim Lamaran Spontan
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
