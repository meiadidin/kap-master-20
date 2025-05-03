
import ServiceDetail from "@/components/ServiceDetail";

const PerencanaanPajak = () => {
  const relatedServices = [
    {
      title: "Kepatuhan Pajak",
      description: "Penyusunan dan pelaporan SPT Tahunan dan Bulanan untuk memastikan kepatuhan terhadap kewajiban perpajakan.",
      link: "/layanan/kepatuhan-pajak"
    },
    {
      title: "Konsultasi Perpajakan",
      description: "Saran dan pendampingan dalam menangani masalah perpajakan kompleks dan sengketa pajak.",
      link: "/layanan/konsultasi-perpajakan"
    },
    {
      title: "Audit Kepatuhan",
      description: "Evaluasi kepatuhan entitas terhadap persyaratan, regulasi, atau ketentuan tertentu.",
      link: "/layanan/audit-kepatuhan"
    }
  ];
  
  const content = (
    <>
      <h2 className="text-2xl font-bold mb-4">Layanan Perencanaan Pajak</h2>
      <p className="mb-4">
        Perencanaan pajak adalah proses strategis untuk mengoptimalkan posisi pajak 
        perusahaan dengan cara yang legal dan etis, sesuai dengan peraturan perpajakan 
        yang berlaku. Tujuan utamanya adalah memaksimalkan efisiensi pajak sambil 
        memastikan kepatuhan penuh terhadap semua kewajiban perpajakan.
      </p>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Lingkup Layanan Perencanaan Pajak</h3>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">Penstrukturan transaksi bisnis yang efisien secara pajak</li>
        <li className="mb-2">Optimalisasi insentif dan fasilitas perpajakan</li>
        <li className="mb-2">Perencanaan Pajak Penghasilan (PPh) Badan dan Orang Pribadi</li>
        <li className="mb-2">Perencanaan Pajak Pertambahan Nilai (PPN)</li>
        <li className="mb-2">Perencanaan pajak untuk transaksi internasional dan transfer pricing</li>
        <li className="mb-2">Perencanaan pajak untuk merger, akuisisi, dan restrukturisasi perusahaan</li>
      </ul>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Proses Perencanaan Pajak</h3>
      <p className="mb-4">
        Pendekatan kami dalam perencanaan pajak meliputi langkah-langkah berikut:
      </p>
      <ol className="list-decimal pl-6 mb-6">
        <li className="mb-2">
          <strong>Analisis Situasi Perpajakan</strong> - Evaluasi menyeluruh terhadap struktur, transaksi, dan posisi pajak perusahaan saat ini
        </li>
        <li className="mb-2">
          <strong>Identifikasi Peluang</strong> - Mengidentifikasi area di mana efisiensi pajak dapat ditingkatkan dalam kerangka hukum
        </li>
        <li className="mb-2">
          <strong>Pengembangan Strategi</strong> - Merancang strategi perpajakan yang sesuai dengan tujuan bisnis dan kepatuhan regulasi
        </li>
        <li className="mb-2">
          <strong>Implementasi</strong> - Membantu penerapan strategi yang telah dirancang
        </li>
        <li className="mb-2">
          <strong>Pemantauan & Evaluasi</strong> - Mengevaluasi efektivitas strategi dan melakukan penyesuaian sesuai perubahan peraturan
        </li>
      </ol>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Manfaat Perencanaan Pajak</h3>
      <p className="mb-4">
        Layanan perencanaan pajak kami memberikan berbagai keuntungan, termasuk:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">Penghematan biaya pajak dalam batas hukum yang berlaku</li>
        <li className="mb-2">Minimalisasi risiko perpajakan dan exposure audit</li>
        <li className="mb-2">Peningkatan arus kas melalui pengelolaan waktu pembayaran pajak secara efisien</li>
        <li className="mb-2">Kepatuhan terhadap perkembangan peraturan perpajakan terbaru</li>
        <li className="mb-2">Pendekatan proaktif terhadap manajemen pajak</li>
      </ul>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Pendekatan Kami</h3>
      <p className="mb-4">
        Tim konsultan perpajakan kami memiliki pemahaman mendalam tentang peraturan perpajakan Indonesia 
        dan perkembangannya. Kami berkomitmen untuk memberikan solusi perencanaan pajak yang 
        tidak hanya meminimalkan beban pajak, tetapi juga sepenuhnya mematuhi regulasi dan 
        menghindari risiko perpajakan di masa depan. Keseimbangan antara efisiensi dan kepatuhan 
        adalah prinsip utama dalam pendekatan kami.
      </p>
    </>
  );

  return (
    <ServiceDetail
      title="Perencanaan Pajak"
      description="Strategi perpajakan untuk mengoptimalkan posisi pajak perusahaan dalam kerangka peraturan yang berlaku"
      heroImage="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80"
      content={content}
      relatedServices={relatedServices}
    />
  );
};

export default PerencanaanPajak;
