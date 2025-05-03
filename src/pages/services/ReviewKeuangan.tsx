
import ServiceDetail from "@/components/ServiceDetail";

const ReviewKeuangan = () => {
  const relatedServices = [
    {
      title: "Audit Keuangan",
      description: "Audit independen atas laporan keuangan untuk memastikan kepatuhan terhadap standar akuntansi yang berlaku.",
      link: "/layanan/audit-keuangan"
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
      <h2 className="text-2xl font-bold mb-4">Layanan Review Keuangan</h2>
      <p className="mb-4">
        Review keuangan adalah prosedur yang memberikan tingkat keyakinan terbatas 
        bahwa tidak diperlukan modifikasi material terhadap laporan keuangan agar sesuai 
        dengan standar akuntansi yang berlaku. Review berbeda dengan audit karena memiliki 
        lingkup yang lebih terbatas dan tidak dirancang untuk memberikan keyakinan memadai.
      </p>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Karakteristik Review Keuangan</h3>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">Fokus utama pada prosedur analitis dan inquiries</li>
        <li className="mb-2">Memberikan keyakinan terbatas (negative assurance)</li>
        <li className="mb-2">Biaya lebih rendah dibandingkan audit penuh</li>
        <li className="mb-2">Waktu penyelesaian lebih singkat dibandingkan audit</li>
      </ul>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Proses Review Keuangan</h3>
      <p className="mb-4">
        Proses review keuangan kami meliputi:
      </p>
      <ol className="list-decimal pl-6 mb-6">
        <li className="mb-2">
          <strong>Perencanaan Review</strong> - Memahami industri dan operasional klien
        </li>
        <li className="mb-2">
          <strong>Prosedur Analitis</strong> - Menganalisis rasio dan tren keuangan untuk mengidentifikasi area yang mungkin memerlukan perhatian
        </li>
        <li className="mb-2">
          <strong>Inquiries</strong> - Mengajukan pertanyaan kepada manajemen tentang prinsip dan praktik akuntansi
        </li>
        <li className="mb-2">
          <strong>Prosedur Tambahan</strong> - Melaksanakan prosedur tambahan jika ditemukan area yang memerlukan investigasi lebih lanjut
        </li>
        <li className="mb-2">
          <strong>Pelaporan</strong> - Menyusun laporan review yang menyatakan apakah auditor mengetahui adanya modifikasi material yang diperlukan
        </li>
      </ol>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Kapan Review Keuangan Tepat Digunakan?</h3>
      <p className="mb-4">
        Review keuangan sangat cocok untuk:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">Perusahaan yang tidak memiliki kewajiban audit, tetapi membutuhkan keyakinan terbatas atas laporan keuangan</li>
        <li className="mb-2">Perusahaan yang sedang mempersiapkan diri untuk audit di masa mendatang</li>
        <li className="mb-2">Keperluan internal manajemen dalam pengambilan keputusan</li>
        <li className="mb-2">Pelaporan kepada bank atau kreditor yang tidak mensyaratkan audit penuh</li>
      </ul>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Manfaat Review Keuangan</h3>
      <p className="mb-4">
        Manfaat utama review keuangan meliputi:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">Biaya lebih rendah dibandingkan audit penuh</li>
        <li className="mb-2">Memberikan tingkat keyakinan yang memadai untuk banyak keperluan bisnis</li>
        <li className="mb-2">Identifikasi area yang memerlukan perbaikan dalam pelaporan keuangan</li>
        <li className="mb-2">Meningkatkan kredibilitas laporan keuangan bagi pihak ketiga</li>
        <li className="mb-2">Dapat diselesaikan dalam waktu yang lebih singkat</li>
      </ul>
    </>
  );

  return (
    <ServiceDetail
      title="Review Keuangan"
      description="Prosedur analitis dan inquiries untuk memberikan tingkat keyakinan terbatas atas laporan keuangan"
      heroImage="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80"
      content={content}
      relatedServices={relatedServices}
    />
  );
};

export default ReviewKeuangan;
