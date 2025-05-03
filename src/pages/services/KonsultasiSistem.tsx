
import ServiceDetail from "@/components/ServiceDetail";

const KonsultasiSistem = () => {
  const relatedServices = [
    {
      title: "Pembukuan & Akuntansi",
      description: "Pengelolaan pembukuan dan pencatatan transaksi keuangan secara akurat dan tepat waktu.",
      link: "/layanan/pembukuan-akuntansi"
    },
    {
      title: "Penyusunan Laporan Keuangan",
      description: "Penyusunan laporan keuangan sesuai dengan standar akuntansi yang berlaku di Indonesia.",
      link: "/layanan/penyusunan-laporan"
    },
    {
      title: "Manajemen Risiko",
      description: "Identifikasi, analisis, dan mitigasi risiko bisnis untuk memastikan keberlanjutan operasional.",
      link: "/layanan/manajemen-risiko"
    }
  ];
  
  const content = (
    <>
      <h2 className="text-2xl font-bold mb-4">Layanan Konsultasi Sistem Akuntansi</h2>
      <p className="mb-4">
        Layanan konsultasi sistem akuntansi kami membantu perusahaan mengembangkan, 
        mengimplementasikan, dan mengoptimalkan sistem akuntansi yang efisien dan efektif 
        sesuai dengan kebutuhan bisnis mereka. Kami membantu klien memanfaatkan teknologi 
        untuk meningkatkan proses akuntansi dan pelaporan keuangan mereka.
      </p>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Lingkup Layanan Konsultasi Sistem Akuntansi</h3>
      <p className="mb-4">
        Layanan konsultasi sistem akuntansi kami mencakup:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">Evaluasi sistem akuntansi yang ada</li>
        <li className="mb-2">Desain dan pengembangan sistem akuntansi baru</li>
        <li className="mb-2">Seleksi dan implementasi software akuntansi</li>
        <li className="mb-2">Pengembangan bagan akun dan struktur pelaporan</li>
        <li className="mb-2">Integrasi sistem akuntansi dengan sistem lain</li>
        <li className="mb-2">Pengembangan kontrol internal dan prosedur akuntansi</li>
        <li className="mb-2">Pelatihan staf dalam penggunaan sistem</li>
        <li className="mb-2">Optimalisasi proses akuntansi</li>
      </ul>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Proses Konsultasi Sistem Akuntansi</h3>
      <p className="mb-4">
        Pendekatan kami dalam konsultasi sistem akuntansi meliputi:
      </p>
      <ol className="list-decimal pl-6 mb-6">
        <li className="mb-2">
          <strong>Analisis Kebutuhan</strong> - Memahami proses bisnis, kebutuhan pelaporan, dan tujuan sistem akuntansi klien
        </li>
        <li className="mb-2">
          <strong>Evaluasi Sistem Saat Ini</strong> - Mengidentifikasi kekuatan dan kelemahan sistem yang ada (jika ada)
        </li>
        <li className="mb-2">
          <strong>Pengembangan Rekomendasi</strong> - Merancang solusi sistem yang sesuai dengan kebutuhan klien
        </li>
        <li className="mb-2">
          <strong>Pemilihan Software</strong> - Membantu dalam pemilihan software akuntansi yang tepat (jika diperlukan)
        </li>
        <li className="mb-2">
          <strong>Implementasi</strong> - Mendukung dalam pengembangan dan implementasi sistem baru
        </li>
        <li className="mb-2">
          <strong>Pelatihan</strong> - Melatih pengguna dalam mengoperasikan sistem baru
        </li>
        <li className="mb-2">
          <strong>Evaluasi Pasca-implementasi</strong> - Memastikan sistem berfungsi sesuai kebutuhan dan melakukan penyesuaian jika diperlukan
        </li>
      </ol>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Software Akuntansi</h3>
      <p className="mb-4">
        Kami memiliki pengalaman dengan berbagai software akuntansi dan dapat memberikan rekomendasi 
        dan dukungan implementasi untuk solusi yang paling sesuai dengan kebutuhan bisnis Anda, termasuk:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">Software akuntansi lokal</li>
        <li className="mb-2">Software akuntansi internasional</li>
        <li className="mb-2">Solusi berbasis cloud</li>
        <li className="mb-2">Sistem ERP terintegrasi</li>
        <li className="mb-2">Solusi akuntansi khusus industri</li>
      </ul>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Manfaat Konsultasi Sistem Akuntansi</h3>
      <p className="mb-4">
        Dengan menggunakan layanan konsultasi sistem akuntansi kami, klien dapat memperoleh manfaat berikut:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">Peningkatan efisiensi proses akuntansi</li>
        <li className="mb-2">Pengurangan kesalahan manual dan duplikasi kerja</li>
        <li className="mb-2">Pelaporan keuangan yang lebih tepat waktu dan akurat</li>
        <li className="mb-2">Pengambilan keputusan yang lebih baik berdasarkan informasi keuangan real-time</li>
        <li className="mb-2">Pengendalian internal yang lebih kuat</li>
        <li className="mb-2">Skalabilitas sistem untuk mengakomodasi pertumbuhan bisnis</li>
        <li className="mb-2">Kepatuhan terhadap persyaratan pelaporan dan regulasi</li>
      </ul>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Pendekatan Kami</h3>
      <p className="mb-4">
        Tim konsultasi sistem akuntansi kami menggabungkan keahlian akuntansi dengan 
        pengetahuan teknologi informasi untuk memberikan solusi yang tidak hanya memenuhi 
        persyaratan teknis tetapi juga sesuai dengan praktik akuntansi yang baik dan kebutuhan bisnis klien.
      </p>
      <p className="mb-4">
        Kami memahami bahwa setiap bisnis memiliki keunikan dan kompleksitas tersendiri. 
        Oleh karena itu, kami selalu mengadopsi pendekatan yang disesuaikan untuk setiap 
        klien, memastikan bahwa sistem akuntansi yang diimplementasikan benar-benar sesuai 
        dengan kebutuhan spesifik mereka.
      </p>
    </>
  );

  return (
    <ServiceDetail
      title="Konsultasi Sistem Akuntansi"
      description="Pengembangan dan implementasi sistem akuntansi yang efektif dan sesuai kebutuhan bisnis"
      heroImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80"
      content={content}
      relatedServices={relatedServices}
    />
  );
};

export default KonsultasiSistem;
