
import ServiceDetail from "@/components/ServiceDetail";

const DueDiligence = () => {
  const relatedServices = [
    {
      title: "Restrukturisasi Perusahaan",
      description: "Strategi dan implementasi perubahan struktur perusahaan untuk meningkatkan efisiensi dan nilai.",
      link: "/layanan/restrukturisasi"
    },
    {
      title: "Manajemen Risiko",
      description: "Identifikasi, analisis, dan mitigasi risiko bisnis untuk memastikan keberlanjutan operasional.",
      link: "/layanan/manajemen-risiko"
    },
    {
      title: "Audit Keuangan",
      description: "Audit independen atas laporan keuangan untuk memastikan kepatuhan terhadap standar akuntansi yang berlaku.",
      link: "/layanan/audit-keuangan"
    }
  ];
  
  const content = (
    <>
      <h2 className="text-2xl font-bold mb-4">Layanan Due Diligence</h2>
      <p className="mb-4">
        Due diligence adalah proses investigasi menyeluruh terhadap aspek keuangan, operasional, 
        legal, dan komersial suatu perusahaan target dalam proses akuisisi, merger, atau investasi. 
        Layanan due diligence kami memberikan pemahaman komprehensif tentang perusahaan target, 
        mengidentifikasi risiko potensial, dan menilai kesesuaiannya dengan tujuan strategis Anda.
      </p>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Jenis Due Diligence</h3>
      <p className="mb-4">
        Kami menyediakan berbagai layanan due diligence, meliputi:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">Due Diligence Keuangan</li>
        <li className="mb-2">Due Diligence Pajak</li>
        <li className="mb-2">Due Diligence Operasional</li>
        <li className="mb-2">Due Diligence Komersial</li>
        <li className="mb-2">Due Diligence IT</li>
        <li className="mb-2">Due Diligence SDM</li>
        <li className="mb-2">Due Diligence ESG (Environmental, Social, and Governance)</li>
      </ul>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Proses Due Diligence</h3>
      <p className="mb-4">
        Pendekatan kami dalam melakukan due diligence meliputi:
      </p>
      <ol className="list-decimal pl-6 mb-6">
        <li className="mb-2">
          <strong>Perencanaan</strong> - Mendefinisikan ruang lingkup, tujuan, dan timeline
        </li>
        <li className="mb-2">
          <strong>Pengumpulan Data</strong> - Mengumpulkan dokumen dan informasi yang relevan
        </li>
        <li className="mb-2">
          <strong>Analisis Mendalam</strong> - Melakukan penelitian dan analisis terhadap data yang dikumpulkan
        </li>
        <li className="mb-2">
          <strong>Verifikasi</strong> - Melakukan verifikasi terhadap informasi kunci
        </li>
        <li className="mb-2">
          <strong>Identifikasi Risiko</strong> - Mengidentifikasi risiko dan tantangan potensial
        </li>
        <li className="mb-2">
          <strong>Penilaian Nilai</strong> - Mengevaluasi nilai dan potensi sinergi
        </li>
        <li className="mb-2">
          <strong>Pelaporan</strong> - Menyusun laporan komprehensif dengan temuan dan rekomendasi
        </li>
      </ol>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Due Diligence Keuangan</h3>
      <p className="mb-4">
        Due diligence keuangan, yang merupakan fokus utama kami, mencakup aspek-aspek berikut:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">Analisis laporan keuangan historis dan proyeksi</li>
        <li className="mb-2">Evaluasi kualitas pendapatan dan keberlanjutannya</li>
        <li className="mb-2">Analisis struktur biaya dan efisiensi operasional</li>
        <li className="mb-2">Penilaian aset dan kewajiban</li>
        <li className="mb-2">Identifikasi risiko off-balance sheet</li>
        <li className="mb-2">Analisis arus kas dan modal kerja</li>
        <li className="mb-2">Evaluasi kebijakan akuntansi dan praktik pelaporan</li>
      </ul>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Manfaat Due Diligence</h3>
      <p className="mb-4">
        Due diligence yang dilakukan dengan baik memberikan berbagai manfaat, termasuk:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">Identifikasi risiko dan kewajiban tersembunyi</li>
        <li className="mb-2">Validasi asumsi nilai dan harga</li>
        <li className="mb-2">Informasi untuk negosiasi struktur transaksi</li>
        <li className="mb-2">Pemahaman yang lebih baik tentang target dan pasar</li>
        <li className="mb-2">Identifikasi peluang nilai tambah pasca-akuisisi</li>
        <li className="mb-2">Dasar untuk strategi integrasi</li>
        <li className="mb-2">Mitigasi risiko transaksi</li>
      </ul>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Keahlian Tim Due Diligence Kami</h3>
      <p className="mb-4">
        Tim due diligence kami terdiri dari profesional berpengalaman dengan keahlian dalam:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">Akuntansi dan pelaporan keuangan</li>
        <li className="mb-2">Pajak dan kepatuhan regulasi</li>
        <li className="mb-2">Valuasi bisnis</li>
        <li className="mb-2">Analisis operasional</li>
        <li className="mb-2">Manajemen risiko</li>
        <li className="mb-2">Berbagai industri spesifik</li>
      </ul>
      
      <p className="mb-4">
        Kami memahami bahwa setiap transaksi memiliki karakteristik unik dan tujuan strategis tertentu. 
        Oleh karena itu, kami menyesuaikan pendekatan due diligence kami untuk memenuhi kebutuhan 
        spesifik klien, memastikan bahwa informasi yang paling relevan dan berharga diidentifikasi 
        dan dianalisis secara menyeluruh.
      </p>
    </>
  );

  return (
    <ServiceDetail
      title="Due Diligence"
      description="Investigasi menyeluruh atas aspek keuangan dan operasional perusahaan target dalam proses akuisisi atau merger"
      heroImage="https://images.unsplash.com/photo-1513223848047-2456e15b4f7d?auto=format&fit=crop&q=80"
      content={content}
      relatedServices={relatedServices}
    />
  );
};

export default DueDiligence;
