
import Hero from "@/components/Hero";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AboutUs = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title="Tentang Kami"
        subtitle="Membangun kepercayaan melalui integritas dan keahlian dalam layanan akuntansi dan keuangan"
        image="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80"
        showButton={false}
      />

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-kap-navy mb-6">Komitmen Kami</h2>
              <p className="text-gray-600 mb-4">
                Kami didirikan dengan visi menjadi kantor akuntan publik terdepan yang memberikan layanan akuntansi dan keuangan berkualitas tinggi dengan integritas dan profesionalisme.
              </p>
              <p className="text-gray-600 mb-4">
                Kami berkomitmen untuk memberikan solusi yang tepat dan efektif bagi setiap klien, dengan memahami kebutuhan spesifik mereka dan menghadirkan pendekatan yang disesuaikan.
              </p>
              <p className="text-gray-600">
                Dengan tim profesional yang berpengalaman dan bersertifikasi, kami mengedepankan nilai-nilai transparansi, akurasi, dan kepatuhan dalam setiap layanan kami.
              </p>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80"
                  alt="Kantor Kami"
                  className="rounded-lg shadow-md h-64 object-cover w-full"
                />
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80"
                  alt="Tim Kami"
                  className="rounded-lg shadow-md h-64 object-cover w-full"
                />
                <img
                  src="https://images.unsplash.com/photo-1573167582108-002d16d9d71e?auto=format&fit=crop&q=80"
                  alt="Layanan Kami"
                  className="rounded-lg shadow-md h-64 object-cover w-full"
                />
                <img
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80"
                  alt="Klien Kami"
                  className="rounded-lg shadow-md h-64 object-cover w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History & Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="history" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="history" className="text-lg py-3">Sejarah Kami</TabsTrigger>
              <TabsTrigger value="values" className="text-lg py-3">Nilai-Nilai Kami</TabsTrigger>
            </TabsList>
            <TabsContent value="history" className="pt-4">
              <div className="space-y-8">
                <div className="flex">
                  <div className="flex-shrink-0 mr-6">
                    <div className="w-16 h-16 rounded-full bg-kap-navy flex items-center justify-center text-white font-semibold">
                      2008
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-kap-navy mb-2">Pendirian</h3>
                    <p className="text-gray-600">
                      KAP Indonesia didirikan oleh sekelompok akuntan berpengalaman dengan visi memberikan layanan akuntansi profesional yang berkualitas tinggi.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 mr-6">
                    <div className="w-16 h-16 rounded-full bg-kap-navy flex items-center justify-center text-white font-semibold">
                      2012
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-kap-navy mb-2">Ekspansi Layanan</h3>
                    <p className="text-gray-600">
                      Memperluas layanan untuk mencakup konsultasi perpajakan dan manajemen keuangan, dengan penambahan tim ahli di bidang tersebut.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 mr-6">
                    <div className="w-16 h-16 rounded-full bg-kap-navy flex items-center justify-center text-white font-semibold">
                      2016
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-kap-navy mb-2">Kerja Sama Internasional</h3>
                    <p className="text-gray-600">
                      Membentuk aliansi strategis dengan firma akuntansi internasional untuk memperluas jangkauan layanan dan meningkatkan standar praktik.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 mr-6">
                    <div className="w-16 h-16 rounded-full bg-kap-navy flex items-center justify-center text-white font-semibold">
                      2020
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-kap-navy mb-2">Transformasi Digital</h3>
                    <p className="text-gray-600">
                      Mengadopsi teknologi terbaru dan solusi digital untuk meningkatkan efisiensi dan akurasi layanan kepada klien.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="values" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-kap-navy mb-3">Integritas</h3>
                  <p className="text-gray-600">
                    Kami menjunjung tinggi kejujuran dan etika dalam setiap aspek pekerjaan kami. Kepercayaan adalah fondasi hubungan kami dengan klien.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-kap-navy mb-3">Keunggulan</h3>
                  <p className="text-gray-600">
                    Kami berkomitmen untuk memberikan standar tertinggi dalam setiap layanan, dengan terus mengembangkan keahlian dan pengetahuan tim kami.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-kap-navy mb-3">Kolaborasi</h3>
                  <p className="text-gray-600">
                    Kami percaya bahwa kerja sama yang erat dengan klien dan antar tim adalah kunci keberhasilan dalam memberikan solusi yang optimal.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-kap-navy mb-3">Inovasi</h3>
                  <p className="text-gray-600">
                    Kami terus mencari cara baru dan lebih baik untuk memberikan layanan, dengan mengadopsi teknologi dan metodologi terbaru.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Core Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-kap-navy mb-4">Tim Inti</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Dipimpin oleh profesional berpengalaman dengan keahlian mendalam di bidang akuntansi, perpajakan, dan keuangan perusahaan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80" 
                  alt="Ahmad Santoso" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-kap-navy mb-1">Ahmad Santoso, CPA</h3>
                <p className="text-kap-blue mb-3">Managing Partner</p>
                <p className="text-gray-600">
                  Berpengalaman lebih dari 20 tahun dalam audit dan konsultasi keuangan perusahaan besar di berbagai industri.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80" 
                  alt="Siti Rahayu" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-kap-navy mb-1">Siti Rahayu, CA</h3>
                <p className="text-kap-blue mb-3">Partner, Audit & Asuransi</p>
                <p className="text-gray-600">
                  Spesialis dalam audit keuangan dengan fokus pada sektor perbankan dan jasa keuangan.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64">
                <img 
                  src="https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?auto=format&fit=crop&q=80" 
                  alt="Budi Wijaya" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-kap-navy mb-1">Budi Wijaya, MSc</h3>
                <p className="text-kap-blue mb-3">Partner, Konsultasi Pajak</p>
                <p className="text-gray-600">
                  Ahli perpajakan dengan pengalaman luas dalam penanganan kasus pajak kompleks dan perencanaan pajak perusahaan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-kap-navy text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-kap-gold">15+</div>
              <p className="text-lg">Tahun Pengalaman</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-kap-gold">500+</div>
              <p className="text-lg">Klien Puas</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-kap-gold">50+</div>
              <p className="text-lg">Profesional</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-kap-gold">20+</div>
              <p className="text-lg">Industri Dilayani</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
