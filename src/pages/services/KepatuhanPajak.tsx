
import ServiceDetail from "@/components/ServiceDetail";

const KepatuhanPajak = () => {
  const relatedServices = [
    {
      title: "Perencanaan Pajak",
      description: "Strategi perpajakan untuk mengoptimalkan posisi pajak perusahaan dalam kerangka peraturan yang berlaku.",
      link: "/layanan/perencanaan-pajak"
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
      <h2 className="text-2xl font-bold mb-4">Layanan Kepatuhan Pajak</h2>
      <p className="mb-4">
        Layanan kepatuhan pajak kami membantu perusahaan dan individu memenuhi seluruh 
        kewajiban perpajakan mereka secara tepat waktu dan akurat sesuai dengan peraturan 
        yang berlaku. Kepatuhan yang konsisten mengurangi risiko sanksi, denda, dan 
        pemeriksaan pajak yang tidak perlu.
      </p>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Lingkup Layanan Kepatuhan Pajak</h3>
      <p className="mb-4">
        Kami menyediakan berbagai layanan kepatuhan pajak, meliputi:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">Penyusunan dan pelaporan SPT Tahunan PPh Badan</li>
        <li className="mb-2">Penyusunan dan pelaporan SPT Tahunan PPh Orang Pribadi</li>
        <li className="mb-2">Penyusunan dan pelaporan SPT Masa PPN</li>
        <li className="mb-2">Penyusunan dan pelaporan SPT Masa PPh Pasal 21/26</li>
        <li className="mb-2">Penyusunan dan pelaporan SPT Masa PPh Pasal 23/26</li>
        <li className="mb-2">Penyusunan dan pelaporan SPT Masa PPh Pasal 4 ayat 2</li>
        <li className="mb-2">Pendampingan dalam pemeriksaan pajak</li>
        <li className="mb-2">Rekonsiliasi fiskal dan perhitungan pajak</li>
      </ul>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Proses Layanan Kepatuhan Pajak</h3>
      <ol className="list-decimal pl-6 mb-6">
        <li className="mb-2">
          <strong>Pengumpulan Data</strong> - Mengumpulkan dan menganalisis dokumen dan informasi keuangan yang relevan
        </li>
        <li className="mb-2">
          <strong>Rekonsiliasi Fiskal</strong> - Menghitung penyesuaian fiskal untuk menentukan penghasilan kena pajak
        </li>
        <li className="mb-2">
          <strong>Perhitungan Pajak</strong> - Menghitung kewajiban pajak sesuai dengan peraturan perpajakan yang berlaku
        </li>
        <li className="mb-2">
          <strong>Penyusunan SPT</strong> - Menyusun SPT dan lampiran sesuai dengan ketentuan perpajakan
        </li>
        <li className="mb-2">
          <strong>Pelaporan</strong> - Memastikan pelaporan SPT tepat waktu dan sesuai prosedur
        </li>
        <li className="mb-2">
          <strong>Dokumentasi</strong> - Menyiapkan dan mengelola dokumentasi pendukung untuk memenuhi persyaratan pelaporan
        </li>
      </ol>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Manfaat Layanan Kepatuhan Pajak</h3>
      <p className="mb-4">
        Dengan menggunakan layanan kepatuhan pajak kami, klien akan memperoleh manfaat berikut:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">Kepatuhan penuh terhadap peraturan perpajakan yang berlaku</li>
        <li className="mb-2">Minimalisasi risiko sanksi dan denda pajak</li>
        <li className="mb-2">Penyelesaian kewajiban perpajakan tepat waktu</li>
        <li className="mb-2">Dokumentasi perpajakan yang terorganisir dengan baik</li>
        <li className="mb-2">Pengurangan beban administratif internal terkait perpajakan</li>
        <li className="mb-2">Akses ke konsultan berpengalaman yang mengikuti perkembangan regulasi perpajakan</li>
      </ul>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Pendekatan Kami</h3>
      <p className="mb-4">
        Tim kepatuhan pajak kami memiliki pengalaman luas dan pengetahuan mendalam 
        tentang peraturan perpajakan Indonesia. Kami bekerja secara teliti dan sistematis 
        untuk memastikan kepatuhan yang konsisten. Kami juga terus memperbarui pengetahuan 
        kami seiring dengan perkembangan peraturan perpajakan, sehingga dapat memberikan 
        layanan yang selalu up-to-date sesuai ketentuan yang berlaku.
      </p>
      <p className="mb-4">
        Pendekatan proaktif kami membantu mengantisipasi potensi masalah perpajakan 
        sebelum terjadi, sehingga klien dapat fokus pada pengembangan bisnis mereka 
        dengan keyakinan bahwa aspek perpajakan dikelola dengan profesional.
      </p>
    </>
  );

  return (
    <ServiceDetail
      title="Kepatuhan Pajak"
      description="Penyusunan dan pelaporan SPT Tahunan dan Bulanan untuk memastikan kepatuhan terhadap kewajiban perpajakan"
      heroImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80"
      content={content}
      relatedServices={relatedServices}
    />
  );
};

export default KepatuhanPajak;
