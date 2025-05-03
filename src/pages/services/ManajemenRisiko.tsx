
import ServiceDetail from "@/components/ServiceDetail";

const ManajemenRisiko = () => {
  const relatedServices = [
    {
      title: "Due Diligence",
      description: "Investigasi menyeluruh atas aspek keuangan dan operasional perusahaan target dalam proses akuisisi atau merger.",
      link: "/layanan/due-diligence"
    },
    {
      title: "Restrukturisasi Perusahaan",
      description: "Strategi dan implementasi perubahan struktur perusahaan untuk meningkatkan efisiensi dan nilai.",
      link: "/layanan/restrukturisasi"
    },
    {
      title: "Audit Kepatuhan",
      description: "Evaluasi kepatuhan entitas terhadap persyaratan, regulasi, atau ketentuan tertentu.",
      link: "/layanan/audit-kepatuhan"
    }
  ];
  
  const content = (
    <>
      <h2 className="text-2xl font-bold mb-4">Layanan Manajemen Risiko</h2>
      <p className="mb-4">
        Layanan manajemen risiko kami membantu organisasi mengidentifikasi, menganalisis, dan 
        mengelola risiko bisnis yang dapat mempengaruhi pencapaian tujuan strategis mereka. 
        Dalam lingkungan bisnis yang semakin kompleks dan tidak pasti, manajemen risiko yang 
        efektif menjadi komponen kritis untuk memastikan keberlanjutan operasional dan 
        melindungi nilai perusahaan.
      </p>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Kategori Risiko yang Kami Tangani</h3>
      <p className="mb-4">
        Kami menyediakan layanan manajemen risiko yang komprehensif untuk berbagai kategori risiko, meliputi:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">Risiko Keuangan</li>
        <li className="mb-2">Risiko Operasional</li>
        <li className="mb-2">Risiko Strategis</li>
        <li className="mb-2">Risiko Kepatuhan dan Regulasi</li>
        <li className="mb-2">Risiko Reputasi</li>
        <li className="mb-2">Risiko Teknologi dan Keamanan Informasi</li>
        <li className="mb-2">Risiko ESG (Environmental, Social, and Governance)</li>
      </ul>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Framework Manajemen Risiko</h3>
      <p className="mb-4">
        Pendekatan manajemen risiko kami selaras dengan standar dan framework manajemen risiko yang diakui secara internasional, seperti:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">ISO 31000</li>
        <li className="mb-2">COSO Enterprise Risk Management Framework</li>
        <li className="mb-2">Framework manajemen risiko industri spesifik</li>
      </ul>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Proses Manajemen Risiko</h3>
      <p className="mb-4">
        Proses manajemen risiko kami meliputi langkah-langkah berikut:
      </p>
      <ol className="list-decimal pl-6 mb-6">
        <li className="mb-2">
          <strong>Penetapan Konteks</strong> - Memahami lingkungan bisnis, tujuan strategis, dan selera risiko organisasi
        </li>
        <li className="mb-2">
          <strong>Identifikasi Risiko</strong> - Mengidentifikasi risiko potensial yang dapat mempengaruhi pencapaian tujuan
        </li>
        <li className="mb-2">
          <strong>Analisis Risiko</strong> - Menilai kemungkinan dan dampak dari setiap risiko yang diidentifikasi
        </li>
        <li className="mb-2">
          <strong>Evaluasi Risiko</strong> - Menentukan prioritas dan tingkat risiko berdasarkan kriteria yang ditetapkan
        </li>
        <li className="mb-2">
          <strong>Perlakuan Risiko</strong> - Mengembangkan strategi untuk mengelola risiko (menghindari, mengurangi, mentransfer, atau menerima)
        </li>
        <li className="mb-2">
          <strong>Pemantauan dan Review</strong> - Memantau efektivitas kontrol risiko dan perubahan profil risiko secara berkelanjutan
        </li>
        <li className="mb-2">
          <strong>Komunikasi dan Konsultasi</strong> - Memastikan komunikasi yang efektif dengan pemangku kepentingan tentang risiko
        </li>
      </ol>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Layanan Manajemen Risiko Spesifik</h3>
      <p className="mb-4">
        Layanan manajemen risiko spesifik yang kami tawarkan meliputi:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">Penilaian risiko perusahaan</li>
        <li className="mb-2">Pengembangan framework manajemen risiko</li>
        <li className="mb-2">Desain dan evaluasi kontrol internal</li>
        <li className="mb-2">Manajemen risiko keuangan</li>
        <li className="mb-2">Manajemen risiko operasional</li>
        <li className="mb-2">Manajemen risiko kepatuhan</li>
        <li className="mb-2">Pengembangan rencana keberlanjutan bisnis</li>
        <li className="mb-2">Manajemen krisis dan respon insiden</li>
      </ul>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Manfaat Manajemen Risiko</h3>
      <p className="mb-4">
        Manajemen risiko yang efektif memberikan berbagai manfaat bagi organisasi, termasuk:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">Pengambilan keputusan yang lebih baik dengan mempertimbangkan risiko</li>
        <li className="mb-2">Peningkatan ketahanan bisnis dan kemampuan beradaptasi</li>
        <li className="mb-2">Pengurangan volatilitas dan kejutan operasional</li>
        <li className="mb-2">Perlindungan reputasi dan nilai perusahaan</li>
        <li className="mb-2">Kepatuhan terhadap persyaratan regulasi dan hukum</li>
        <li className="mb-2">Alokasi sumber daya yang lebih efektif</li>
        <li className="mb-2">Peningkatan kepercayaan pemangku kepentingan</li>
      </ul>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Pendekatan Kami</h3>
      <p className="mb-4">
        Tim manajemen risiko kami terdiri dari profesional berpengalaman dengan keahlian lintas 
        industri dan berbagai jenis risiko. Kami memahami bahwa setiap organisasi memiliki profil 
        risiko unik, dan kami bekerja secara kolaboratif dengan klien untuk mengembangkan solusi 
        manajemen risiko yang sesuai dengan kebutuhan spesifik dan budaya organisasi mereka.
      </p>
      <p className="mb-4">
        Pendekatan kami bersifat praktis dan berorientasi pada nilai, memastikan bahwa upaya 
        manajemen risiko fokus pada risiko yang paling material dan menghasilkan manfaat nyata 
        bagi bisnis. Kami tidak hanya membantu klien mengidentifikasi dan memitigasi risiko, 
        tetapi juga mengidentifikasi peluang yang dapat muncul dari pengelolaan risiko yang efektif.
      </p>
    </>
  );

  return (
    <ServiceDetail
      title="Manajemen Risiko"
      description="Identifikasi, analisis, dan mitigasi risiko bisnis untuk memastikan keberlanjutan operasional"
      heroImage="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80"
      content={content}
      relatedServices={relatedServices}
    />
  );
};

export default ManajemenRisiko;
