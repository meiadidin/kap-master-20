
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone, BookOpen, Search, FileText, Users, ArrowRight } from "lucide-react";

const Index = () => {
  const featuredServices = [
    {
      title: "Audit & Asuransi",
      description: "Layanan audit independen dan berkualitas untuk memastikan laporan keuangan Anda sesuai standar dan regulasi.",
      icon: <BookOpen size={24} />,
      link: "/layanan/audit-keuangan"
    }, 
    {
      title: "Konsultasi Pajak",
      description: "Konsultasi strategi perpajakan yang efektif untuk optimalisasi beban pajak dengan tetap mematuhi peraturan.",
      icon: <FileText size={24} />,
      link: "/layanan/konsultasi-perpajakan"
    }, 
    {
      title: "Akuntansi & Pembukuan",
      description: "Pengelolaan pembukuan dan laporan keuangan yang akurat dan profesional untuk membantu pengambilan keputusan bisnis.",
      icon: <Search size={24} />,
      link: "/layanan/pembukuan-akuntansi"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero 
        title="Solusi Akuntansi Profesional untuk Bisnis Anda" 
        subtitle="Kantor Akuntan Publik terpercaya dengan layanan komprehensif untuk membantu bisnis Anda berkembang dengan landasan keuangan yang kuat."
        image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80"
        buttonText="Konsultasi Sekarang"
        buttonLink="/kontak"
      />

      {/* Services Overview Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-kap-navy mb-4">Layanan Utama Kami</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Kami menyediakan berbagai layanan profesional untuk mendukung kebutuhan finansial dan pelaporan bisnis Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <ServiceCard 
                key={index} 
                title={service.title} 
                description={service.description} 
                icon={service.icon} 
                link={service.link} 
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/layanan">
              <Button variant="outline" className="border-kap-navy text-kap-navy hover:bg-kap-navy hover:text-white">
                Lihat Semua Layanan
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-kap-navy mb-6">Mengapa Memilih Kami?</h2>
              <p className="text-gray-600 mb-8">
                Dengan pengalaman lebih dari 15 tahun dalam industri, kami telah membantu ratusan perusahaan di Indonesia mengelola aspek keuangan dan perpajakan mereka dengan efektif dan sesuai regulasi.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-kap-light p-2 rounded-full mr-4">
                    <Users className="text-kap-navy" size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-kap-navy mb-2">Tim Profesional</h3>
                    <p className="text-gray-600">
                      Tim kami terdiri dari akuntan bersertifikasi dan profesional perpajakan dengan pengalaman luas.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-kap-light p-2 rounded-full mr-4">
                    <BookOpen className="text-kap-navy" size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-kap-navy mb-2">Keahlian Industri</h3>
                    <p className="text-gray-600">
                      Pengalaman mendalam dalam berbagai sektor industri dengan pemahaman tantangan spesifik pada setiap sektor.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-kap-light p-2 rounded-full mr-4">
                    <FileText className="text-kap-navy" size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-kap-navy mb-2">Kepatuhan & Kualitas</h3>
                    <p className="text-gray-600">
                      Komitmen pada standar tertinggi dan kepatuhan terhadap regulasi terkini dalam setiap layanan kami.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80" 
                alt="Tim Profesional KAP Indonesia" 
                className="rounded-lg shadow-xl w-full object-cover" 
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-kap-light-gold p-3 rounded-full">
                    <Phone size={24} className="text-kap-navy" />
                  </div>
                  <div>
                    <p className="text-gray-600">Butuh konsultasi?</p>
                    <a 
                      href="tel:+6221527436" 
                      className="text-xl font-semibold text-kap-navy hover:text-kap-blue"
                    >
                      (021) 5274362
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-kap-navy text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Siap untuk Mengoptimalkan Keuangan Bisnis Anda?
            </h2>
            <p className="text-lg mb-8">
              Jadwalkan konsultasi gratis dengan tim ahli kami untuk mendiskusikan kebutuhan bisnis Anda dan temukan solusi terbaik.
            </p>
            <Link to="/kontak">
              <Button className="bg-kap-gold hover:bg-kap-light-gold text-kap-navy hover:text-kap-navy font-medium text-lg px-8 py-6">
                Hubungi Kami Sekarang
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
