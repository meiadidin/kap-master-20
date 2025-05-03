
import ServiceDetail from "@/components/ServiceDetail";

const AuditKeuangan = () => {
  const relatedServices = [
    {
      title: "Review Keuangan",
      description: "Prosedur analitis dan inquiries untuk memberikan tingkat keyakinan terbatas atas laporan keuangan.",
      link: "/layanan/review-keuangan"
    },
    {
      title: "Audit Kepatuhan",
      description: "Evaluasi kepatuhan entitas terhadap persyaratan, regulasi, atau ketentuan tertentu.",
      link: "/layanan/audit-kepatuhan"
    },
    {
      title: "Penyusunan Laporan Keuangan",
      description: "Penyusunan laporan keuangan sesuai dengan standar akuntansi yang berlaku di Indonesia.",
      link: "/layanan/penyusunan-laporan"
    }
  ];
  
  const content = (
    <>
      <h2 className="text-2xl font-bold mb-4">Layanan Audit Keuangan</h2>
      <p className="mb-4">
        Audit keuangan adalah evaluasi independen dan objektif atas laporan keuangan perusahaan untuk 
        memastikan kewajaran dan kepatuhan terhadap standar akuntansi yang berlaku. Kami melakukan 
        audit keuangan dengan metodologi yang terstruktur dan sesuai dengan standar audit yang berlaku.
      </p>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Tujuan Audit Keuangan</h3>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">Memberikan keyakinan bahwa laporan keuangan bebas dari kesalahan material</li>
        <li className="mb-2">Memastikan kepatuhan terhadap standar akuntansi yang berlaku</li>
        <li className="mb-2">Meningkatkan kredibilitas laporan keuangan bagi pemangku kepentingan</li>
        <li className="mb-2">Mengidentifikasi area yang memerlukan perbaikan dalam sistem pengendalian internal</li>
      </ul>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Proses Audit Keuangan</h3>
      <p className="mb-4">
        Proses audit keuangan kami meliputi:
      </p>
      <ol className="list-decimal pl-6 mb-6">
        <li className="mb-2">
          <strong>Perencanaan Audit</strong> - Memahami bisnis klien, mengidentifikasi risiko, dan menentukan 
          materialitas serta strategi audit
        </li>
        <li className="mb-2">
          <strong>Pengujian Pengendalian</strong> - Mengevaluasi efektivitas sistem pengendalian internal perusahaan
        </li>
        <li className="mb-2">
          <strong>Pengujian Substantif</strong> - Melakukan verifikasi langsung terhadap saldo akun dan transaksi
        </li>
        <li className="mb-2">
          <strong>Pengujian Analitis</strong> - Analisis tren dan rasio untuk mengidentifikasi anomali
        </li>
        <li className="mb-2">
          <strong>Kesimpulan dan Pelaporan</strong> - Mengevaluasi temuan audit dan menerbitkan laporan audit
        </li>
      </ol>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Manfaat Bagi Klien</h3>
      <p className="mb-4">
        Layanan audit keuangan kami memberikan berbagai manfaat, termasuk:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">Meningkatkan kepercayaan investor, kreditor, dan pemangku kepentingan lainnya</li>
        <li className="mb-2">Memperkuat tata kelola perusahaan dan transparansi</li>
        <li className="mb-2">Mengidentifikasi peluang untuk meningkatkan efisiensi operasional</li>
        <li className="mb-2">Memenuhi persyaratan regulasi dan hukum</li>
        <li className="mb-2">Meminimalkan risiko penipuan dan penyalahgunaan aset</li>
      </ul>
    </>
  );

  return (
    <ServiceDetail
      title="Audit Keuangan"
      description="Audit independen atas laporan keuangan untuk memastikan kepatuhan terhadap standar akuntansi yang berlaku"
      heroImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80"
      content={content}
      relatedServices={relatedServices}
    />
  );
};

export default AuditKeuangan;
