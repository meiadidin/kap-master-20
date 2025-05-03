
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { BookOpen, FileText, Search, Users, Calendar, Info } from "lucide-react";

const Services = () => {
  const auditServices = [
    {
      title: "Audit Keuangan",
      description: "Audit independen atas laporan keuangan untuk memastikan kepatuhan terhadap standar akuntansi yang berlaku.",
      icon: <BookOpen size={24} />,
      link: "/layanan/audit-keuangan"
    }, 
    {
      title: "Review Keuangan",
      description: "Prosedur analitis dan inquiries untuk memberikan tingkat keyakinan terbatas atas laporan keuangan.",
      icon: <Search size={24} />,
      link: "/layanan/review-keuangan"
    }, 
    {
      title: "Audit Kepatuhan",
      description: "Evaluasi kepatuhan entitas terhadap persyaratan, regulasi, atau ketentuan tertentu.",
      icon: <FileText size={24} />,
      link: "/layanan/audit-kepatuhan"
    }
  ];

  const taxServices = [
    {
      title: "Perencanaan Pajak",
      description: "Strategi perpajakan untuk mengoptimalkan posisi pajak perusahaan dalam kerangka peraturan yang berlaku.",
      icon: <Calendar size={24} />,
      link: "/layanan/perencanaan-pajak"
    }, 
    {
      title: "Kepatuhan Pajak",
      description: "Penyusunan dan pelaporan SPT Tahunan dan Bulanan untuk memastikan kepatuhan terhadap kewajiban perpajakan.",
      icon: <FileText size={24} />,
      link: "/layanan/kepatuhan-pajak"
    }, 
    {
      title: "Konsultasi Perpajakan",
      description: "Saran dan pendampingan dalam menangani masalah perpajakan kompleks dan sengketa pajak.",
      icon: <Info size={24} />,
      link: "/layanan/konsultasi-perpajakan"
    }
  ];

  const accountingServices = [
    {
      title: "Penyusunan Laporan Keuangan",
      description: "Penyusunan laporan keuangan sesuai dengan standar akuntansi yang berlaku di Indonesia.",
      icon: <FileText size={24} />,
      link: "/layanan/penyusunan-laporan"
    }, 
    {
      title: "Pembukuan & Akuntansi",
      description: "Pengelolaan pembukuan dan pencatatan transaksi keuangan secara akurat dan tepat waktu.",
      icon: <BookOpen size={24} />,
      link: "/layanan/pembukuan-akuntansi"
    }, 
    {
      title: "Konsultasi Sistem Akuntansi",
      description: "Pengembangan dan implementasi sistem akuntansi yang efektif dan sesuai kebutuhan bisnis.",
      icon: <Search size={24} />,
      link: "/layanan/konsultasi-sistem"
    }
  ];

  const advisoryServices = [
    {
      title: "Due Diligence",
      description: "Investigasi menyeluruh atas aspek keuangan dan operasional perusahaan target dalam proses akuisisi atau merger.",
      icon: <Search size={24} />,
      link: "/layanan/due-diligence"
    }, 
    {
      title: "Restrukturisasi Perusahaan",
      description: "Strategi dan implementasi perubahan struktur perusahaan untuk meningkatkan efisiensi dan nilai.",
      icon: <Users size={24} />,
      link: "/layanan/restrukturisasi"
    }, 
    {
      title: "Manajemen Risiko",
      description: "Identifikasi, analisis, dan mitigasi risiko bisnis untuk memastikan keberlanjutan operasional.",
      icon: <Info size={24} />,
      link: "/layanan/manajemen-risiko"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero 
        title="Layanan Kami" 
        subtitle="Solusi akuntansi dan keuangan komprehensif untuk mendukung pertumbuhan dan kepatuhan bisnis Anda"
        image="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&q=80"
        showButton={false}
      />

      {/* Services Introduction */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-kap-navy mb-6">Layanan Profesional yang Kami Tawarkan</h2>
            <p className="text-gray-600">
              Kami menyediakan berbagai layanan akuntansi dan keuangan yang disesuaikan dengan kebutuhan spesifik bisnis Anda. Dengan keahlian mendalam di berbagai industri, kami membantu Anda mencapai kepatuhan, efisiensi, dan pertumbuhan.
            </p>
          </div>

          <Tabs defaultValue="audit" className="max-w-5xl mx-auto">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="audit">Audit & Asuransi</TabsTrigger>
              <TabsTrigger value="tax">Pajak</TabsTrigger>
              <TabsTrigger value="accounting">Akuntansi</TabsTrigger>
              <TabsTrigger value="advisory">Advisory</TabsTrigger>
            </TabsList>
            <TabsContent value="audit" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {auditServices.map((service, index) => (
                  <ServiceCard 
                    key={index} 
                    title={service.title} 
                    description={service.description} 
                    icon={service.icon} 
                    link={service.link} 
                  />
                ))}
              </div>
              <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h3 className="text-xl font-semibold text-kap-navy mb-4">Mengapa Memilih Layanan Audit Kami?</h3>
                <p className="text-gray-600 mb-4">
                  Tim audit kami memiliki pengalaman luas dalam berbagai industri dan mengedepankan independensi serta profesionalisme dalam setiap penugasan.
                </p>
                <p className="text-gray-600">
                  Dengan pendekatan berbasis risiko dan teknologi audit terkini, kami memberikan hasil audit yang akurat dan bernilai tambah bagi klien.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="tax" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {taxServices.map((service, index) => (
                  <ServiceCard 
                    key={index} 
                    title={service.title} 
                    description={service.description} 
                    icon={service.icon} 
                    link={service.link} 
                  />
                ))}
              </div>
              <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h3 className="text-xl font-semibold text-kap-navy mb-4">Keunggulan Layanan Pajak Kami</h3>
                <p className="text-gray-600 mb-4">
                  Tim pajak kami memiliki pemahaman mendalam tentang peraturan perpajakan terkini dan mampu memberikan solusi yang optimal sesuai dengan karakteristik bisnis Anda.
                </p>
                <p className="text-gray-600">
                  Kami membantu Anda mencapai kepatuhan pajak sekaligus mengidentifikasi peluang pengoptimalan beban pajak secara legal.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="accounting" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {accountingServices.map((service, index) => (
                  <ServiceCard 
                    key={index} 
                    title={service.title} 
                    description={service.description} 
                    icon={service.icon} 
                    link={service.link} 
                  />
                ))}
              </div>
              <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h3 className="text-xl font-semibold text-kap-navy mb-4">Manfaat Layanan Akuntansi Kami</h3>
                <p className="text-gray-600 mb-4">
                  Dengan layanan akuntansi kami, Anda dapat fokus pada bisnis inti sementara kami menangani aspek keuangan dan pelaporan secara profesional dan tepat waktu.
                </p>
                <p className="text-gray-600">
                  Kami membantu Anda memiliki informasi keuangan yang akurat sebagai dasar pengambilan keputusan bisnis yang tepat.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="advisory" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {advisoryServices.map((service, index) => (
                  <ServiceCard 
                    key={index} 
                    title={service.title} 
                    description={service.description} 
                    icon={service.icon} 
                    link={service.link} 
                  />
                ))}
              </div>
              <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h3 className="text-xl font-semibold text-kap-navy mb-4">Nilai Tambah Layanan Advisory</h3>
                <p className="text-gray-600 mb-4">
                  Tim advisory kami memiliki pengalaman lintas industri dan kemampuan analitis yang tinggi untuk membantu Anda menghadapi tantangan bisnis kompleks.
                </p>
                <p className="text-gray-600">
                  Kami memberikan pandangan objektif dan solusi praktis untuk mendorong pertumbuhan dan keberlanjutan bisnis Anda.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-kap-navy mb-4">Industri yang Kami Layani</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Pengalaman kami meliputi berbagai sektor industri, dengan pemahaman mendalam terhadap tantangan dan kebutuhan spesifik masing-masing.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-lg shadow-md text-center bg-zinc-50">
              <h3 className="text-lg font-semibold text-kap-navy mb-2">Perbankan & Jasa Keuangan</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-semibold text-kap-navy mb-2">Manufaktur</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-semibold text-kap-navy mb-2">Real Estate & Properti</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-semibold text-kap-navy mb-2">Ritel & Konsumen</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-semibold text-kap-navy mb-2">Teknologi & Telekomunikasi</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-semibold text-kap-navy mb-2">Energi & Sumber Daya</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-semibold text-kap-navy mb-2">Kesehatan & Farmasi</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-semibold text-kap-navy mb-2">Pendidikan & Nirlaba</h3>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-kap-navy mb-6">
            Siap untuk Memulai?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Hubungi tim kami untuk konsultasi awal dan temukan bagaimana kami dapat membantu bisnis Anda mencapai tujuan keuangan dan kepatuhan.
          </p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <Link to="/kontak">
              <Button className="bg-kap-navy hover:bg-kap-blue text-white px-8">
                Hubungi Kami
              </Button>
            </Link>
            <Link to="/tim-kami">
              <Button variant="outline" className="border-kap-navy text-kap-navy hover:bg-kap-navy hover:text-white px-8">
                Kenali Tim Kami
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
