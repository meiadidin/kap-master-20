
import ServiceDetail from "@/components/ServiceDetail";

const KonsultasiPerpajakan = () => {
  const relatedServices = [
    {
      title: "Perencanaan Pajak",
      description: "Strategi perpajakan untuk mengoptimalkan posisi pajak perusahaan dalam kerangka peraturan yang berlaku.",
      link: "/layanan/perencanaan-pajak"
    },
    {
      title: "Kepatuhan Pajak",
      description: "Penyusunan dan pelaporan SPT Tahunan dan Bulanan untuk memastikan kepatuhan terhadap kewajiban perpajakan.",
      link: "/layanan/kepatuhan-pajak"
    },
    {
      title: "Audit Kepatuhan",
      description: "Evaluasi kepatuhan entitas terhadap persyaratan, regulasi, atau ketentuan tertentu.",
      link: "/layanan/audit-kepatuhan"
    }
  ];
  
  const content = (
    <>
      <h2 className="text-2xl font-bold mb-4">Layanan Konsultasi Perpajakan</h2>
      <p className="mb-4">
        Layanan konsultasi perpajakan kami menyediakan saran dan pendampingan profesional 
        dalam menangani berbagai masalah perpajakan kompleks dan sengketa pajak. Kami membantu 
        klien memahami implikasi perpajakan dari keputusan bisnis dan menavigasi kompleksitas 
        peraturan perpajakan Indonesia.
      </p>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Lingkup Layanan Konsultasi Perpajakan</h3>
      <p className="mb-4">
        Kami menawarkan konsultasi perpajakan komprehensif dalam berbagai bidang, meliputi:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">Konsultasi umum terkait perpajakan bisnis dan individu</li>
        <li className="mb-2">Bantuan dalam keberatan dan banding pajak</li>
        <li className="mb-2">Konsultasi transfer pricing dan dokumentasi</li>
        <li className="mb-2">Pendampingan dalam sengketa pajak dan pemeriksaan pajak</li>
        <li className="mb-2">Konsultasi perpajakan untuk transaksi internasional</li>
        <li className="mb-2">Konsultasi perpajakan untuk merger, akuisisi, dan restrukturisasi</li>
        <li className="mb-2">Pengembalian kelebihan pembayaran pajak (restitusi)</li>
        <li className="mb-2">Permohonan fasilitas perpajakan</li>
      </ul>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Pendekatan Konsultasi Perpajakan</h3>
      <p className="mb-4">
        Proses konsultasi perpajakan kami mencakup:
      </p>
      <ol className="list-decimal pl-6 mb-6">
        <li className="mb-2">
          <strong>Identifikasi Masalah</strong> - Memahami secara mendalam isu perpajakan yang dihadapi klien
        </li>
        <li className="mb-2">
          <strong>Analisis Peraturan</strong> - Menganalisis peraturan perpajakan yang relevan dan preseden kasus serupa
        </li>
        <li className="mb-2">
          <strong>Pengembangan Solusi</strong> - Merumuskan strategi dan pendekatan untuk menyelesaikan masalah
        </li>
        <li className="mb-2">
          <strong>Pendampingan Implementasi</strong> - Membantu klien dalam mengimplementasikan solusi yang direkomendasikan
        </li>
        <li className="mb-2">
          <strong>Representasi</strong> - Mewakili klien dalam interaksi dengan otoritas pajak jika diperlukan
        </li>
        <li className="mb-2">
          <strong>Pemantauan Berkelanjutan</strong> - Mengevaluasi efektivitas solusi dan melakukan penyesuaian sesuai kebutuhan
        </li>
      </ol>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Manfaat Konsultasi Perpajakan</h3>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">Penyelesaian masalah perpajakan kompleks dengan pendekatan profesional</li>
        <li className="mb-2">Pengurangan risiko sengketa pajak dan konsekuensi negatif lainnya</li>
        <li className="mb-2">Kepastian dalam perlakuan perpajakan untuk keputusan bisnis penting</li>
        <li className="mb-2">Penyelesaian sengketa pajak dengan pendekatan strategis</li>
        <li className="mb-2">Akses ke ahli perpajakan dengan pengalaman luas di berbagai industri</li>
      </ul>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Keunggulan Tim Konsultasi Perpajakan Kami</h3>
      <p className="mb-4">
        Tim konsultan perpajakan kami menawarkan:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">Pengalaman dan keahlian dalam menangani berbagai kasus perpajakan kompleks</li>
        <li className="mb-2">Pemahaman mendalam tentang peraturan perpajakan Indonesia dan perkembangannya</li>
        <li className="mb-2">Pengetahuan tentang praktik dan kebijakan otoritas pajak</li>
        <li className="mb-2">Pendekatan praktis dalam menyelesaikan masalah perpajakan</li>
        <li className="mb-2">Jaringan profesional yang kuat untuk menangani kasus lintas bidang</li>
      </ul>
      
      <p className="mb-4">
        Kami berkomitmen untuk memberikan solusi perpajakan yang tidak hanya efektif dalam menyelesaikan 
        masalah saat ini, tetapi juga membantu mencegah masalah serupa di masa depan melalui 
        pendekatan yang proaktif dan edukasi kepada klien.
      </p>
    </>
  );

  return (
    <ServiceDetail
      title="Konsultasi Perpajakan"
      description="Saran dan pendampingan dalam menangani masalah perpajakan kompleks dan sengketa pajak"
      heroImage="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80"
      content={content}
      relatedServices={relatedServices}
    />
  );
};

export default KonsultasiPerpajakan;
