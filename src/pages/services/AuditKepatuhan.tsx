
import ServiceDetail from "@/components/ServiceDetail";

const AuditKepatuhan = () => {
  const relatedServices = [
    {
      title: "Audit Keuangan",
      description: "Audit independen atas laporan keuangan untuk memastikan kepatuhan terhadap standar akuntansi yang berlaku.",
      link: "/layanan/audit-keuangan"
    },
    {
      title: "Review Keuangan",
      description: "Prosedur analitis dan inquiries untuk memberikan tingkat keyakinan terbatas atas laporan keuangan.",
      link: "/layanan/review-keuangan"
    },
    {
      title: "Kepatuhan Pajak",
      description: "Penyusunan dan pelaporan SPT Tahunan dan Bulanan untuk memastikan kepatuhan terhadap kewajiban perpajakan.",
      link: "/layanan/kepatuhan-pajak"
    }
  ];
  
  const content = (
    <>
      <h2 className="text-2xl font-bold mb-4">Layanan Audit Kepatuhan</h2>
      <p className="mb-4">
        Audit kepatuhan adalah evaluasi independen untuk menilai sejauh mana entitas mematuhi 
        persyaratan, regulasi, atau ketentuan tertentu yang berlaku. Layanan ini membantu 
        memastikan bahwa organisasi beroperasi sesuai dengan peraturan perundang-undangan, 
        kebijakan internal, atau persyaratan perjanjian tertentu.
      </p>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Jenis Audit Kepatuhan</h3>
      <p className="mb-4">
        Kami menyediakan berbagai jenis audit kepatuhan, meliputi:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">Audit kepatuhan regulasi industri spesifik</li>
        <li className="mb-2">Audit kepatuhan perpajakan</li>
        <li className="mb-2">Audit kepatuhan kontraktual dan perjanjian</li>
        <li className="mb-2">Audit kepatuhan terhadap kebijakan dan prosedur internal</li>
        <li className="mb-2">Audit kepatuhan terhadap persyaratan bantuan pemerintah</li>
      </ul>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Proses Audit Kepatuhan</h3>
      <p className="mb-4">
        Metodologi audit kepatuhan kami mencakup:
      </p>
      <ol className="list-decimal pl-6 mb-6">
        <li className="mb-2">
          <strong>Perencanaan</strong> - Identifikasi peraturan dan persyaratan yang berlaku
        </li>
        <li className="mb-2">
          <strong>Penilaian Risiko</strong> - Mengevaluasi area dengan risiko ketidakpatuhan tinggi
        </li>
        <li className="mb-2">
          <strong>Pengujian Kepatuhan</strong> - Memeriksa bukti dan dokumentasi untuk memverifikasi kepatuhan
        </li>
        <li className="mb-2">
          <strong>Evaluasi Hasil</strong> - Menganalisis temuan dan menilai tingkat kepatuhan
        </li>
        <li className="mb-2">
          <strong>Pelaporan</strong> - Menyusun laporan dengan temuan dan rekomendasi perbaikan
        </li>
      </ol>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Manfaat Audit Kepatuhan</h3>
      <p className="mb-4">
        Layanan audit kepatuhan kami memberikan berbagai manfaat, termasuk:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">Identifikasi pelanggaran atau ketidakpatuhan yang perlu diperbaiki</li>
        <li className="mb-2">Mengurangi risiko sanksi, denda, atau konsekuensi hukum lainnya</li>
        <li className="mb-2">Meningkatkan tata kelola perusahaan dan praktik bisnis yang etis</li>
        <li className="mb-2">Memperkuat sistem pengendalian internal</li>
        <li className="mb-2">Meningkatkan kepercayaan pemangku kepentingan terhadap organisasi</li>
      </ul>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Pendekatan Kami</h3>
      <p className="mb-4">
        Tim audit kepatuhan kami memiliki keahlian di berbagai industri dan peraturan, 
        memungkinkan kami untuk memberikan layanan yang disesuaikan dengan kebutuhan spesifik Anda. 
        Kami tidak hanya mengidentifikasi area ketidakpatuhan, tetapi juga memberikan rekomendasi 
        praktis untuk memperbaiki masalah dan mencegah ketidakpatuhan di masa mendatang.
      </p>
    </>
  );

  return (
    <ServiceDetail
      title="Audit Kepatuhan"
      description="Evaluasi kepatuhan entitas terhadap persyaratan, regulasi, atau ketentuan tertentu"
      heroImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80"
      content={content}
      relatedServices={relatedServices}
    />
  );
};

export default AuditKepatuhan;
