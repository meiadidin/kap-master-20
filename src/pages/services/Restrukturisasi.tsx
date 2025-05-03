
import ServiceDetail from "@/components/ServiceDetail";

const Restrukturisasi = () => {
  const relatedServices = [
    {
      title: "Due Diligence",
      description: "Investigasi menyeluruh atas aspek keuangan dan operasional perusahaan target dalam proses akuisisi atau merger.",
      link: "/layanan/due-diligence"
    },
    {
      title: "Manajemen Risiko",
      description: "Identifikasi, analisis, dan mitigasi risiko bisnis untuk memastikan keberlanjutan operasional.",
      link: "/layanan/manajemen-risiko"
    },
    {
      title: "Konsultasi Perpajakan",
      description: "Saran dan pendampingan dalam menangani masalah perpajakan kompleks dan sengketa pajak.",
      link: "/layanan/konsultasi-perpajakan"
    }
  ];
  
  const content = (
    <>
      <h2 className="text-2xl font-bold mb-4">Layanan Restrukturisasi Perusahaan</h2>
      <p className="mb-4">
        Layanan restrukturisasi perusahaan kami membantu organisasi merancang dan 
        mengimplementasikan perubahan struktural yang dapat meningkatkan efisiensi 
        operasional, mengoptimalkan posisi keuangan, dan meningkatkan nilai perusahaan. 
        Baik dalam konteks pertumbuhan, pemulihan dari kesulitan keuangan, atau adaptasi 
        terhadap perubahan pasar, kami menyediakan solusi restrukturisasi komprehensif.
      </p>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Bentuk Restrukturisasi Perusahaan</h3>
      <p className="mb-4">
        Kami menawarkan konsultasi dan implementasi untuk berbagai bentuk restrukturisasi, termasuk:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">Restrukturisasi Operasional</li>
        <li className="mb-2">Restrukturisasi Keuangan</li>
        <li className="mb-2">Restrukturisasi Hutang</li>
        <li className="mb-2">Restrukturisasi Organisasi</li>
        <li className="mb-2">Restrukturisasi Pajak</li>
        <li className="mb-2">Restrukturisasi Aset</li>
        <li className="mb-2">Merger dan Akuisisi</li>
        <li className="mb-2">Divestasi dan Spin-off</li>
      </ul>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Proses Restrukturisasi Perusahaan</h3>
      <p className="mb-4">
        Pendekatan kami dalam restrukturisasi perusahaan meliputi langkah-langkah berikut:
      </p>
      <ol className="list-decimal pl-6 mb-6">
        <li className="mb-2">
          <strong>Diagnostik</strong> - Analisis mendalam terhadap situasi saat ini dan identifikasi area-area yang memerlukan perubahan
        </li>
        <li className="mb-2">
          <strong>Pengembangan Strategi</strong> - Merancang rencana restrukturisasi yang sesuai dengan tujuan strategis perusahaan
        </li>
        <li className="mb-2">
          <strong>Analisis Dampak</strong> - Menilai dampak potensial dari berbagai opsi restrukturisasi
        </li>
        <li className="mb-2">
          <strong>Perencanaan Implementasi</strong> - Mengembangkan rencana implementasi terperinci
        </li>
        <li className="mb-2">
          <strong>Implementasi</strong> - Menerapkan perubahan secara terkoordinasi
        </li>
        <li className="mb-2">
          <strong>Pemantauan dan Penyesuaian</strong> - Mengevaluasi hasil dan melakukan penyesuaian yang diperlukan
        </li>
        <li className="mb-2">
          <strong>Stabilisasi</strong> - Memastikan keberlanjutan perubahan dan manfaatnya
        </li>
      </ol>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Restrukturisasi Operasional</h3>
      <p className="mb-4">
        Restrukturisasi operasional berfokus pada peningkatan efisiensi dan efektivitas operasi perusahaan, yang meliputi:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">Optimalisasi proses bisnis</li>
        <li className="mb-2">Pengelolaan biaya dan efisiensi</li>
        <li className="mb-2">Restrukturisasi lini produk atau layanan</li>
        <li className="mb-2">Perampingan struktur organisasi</li>
        <li className="mb-2">Outsourcing atau insourcing fungsi bisnis</li>
        <li className="mb-2">Digitalisasi dan otomatisasi</li>
      </ul>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Restrukturisasi Keuangan</h3>
      <p className="mb-4">
        Restrukturisasi keuangan bertujuan untuk memperbaiki posisi keuangan dan memaksimalkan nilai untuk pemangku kepentingan:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">Restrukturisasi modal dan struktur hutang</li>
        <li className="mb-2">Negosiasi dengan kreditur</li>
        <li className="mb-2">Refinancing</li>
        <li className="mb-2">Divestasi aset non-inti</li>
        <li className="mb-2">Perubahan kebijakan manajemen kas</li>
        <li className="mb-2">Perencanaan pajak dan optimalisasi struktur legal</li>
      </ul>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Manfaat Restrukturisasi Perusahaan</h3>
      <p className="mb-4">
        Restrukturisasi yang direncanakan dan diimplementasikan dengan baik dapat memberikan berbagai manfaat, termasuk:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">Peningkatan profitabilitas dan kinerja keuangan</li>
        <li className="mb-2">Peningkatan efisiensi operasional</li>
        <li className="mb-2">Pengurangan biaya dan peningkatan produktivitas</li>
        <li className="mb-2">Perbaikan posisi kompetitif</li>
        <li className="mb-2">Optimalisasi arus kas</li>
        <li className="mb-2">Pengurangan keterpaparan risiko</li>
        <li className="mb-2">Penciptaan nilai jangka panjang</li>
      </ul>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Pendekatan Kami</h3>
      <p className="mb-4">
        Tim restrukturisasi perusahaan kami memiliki pengalaman luas dalam mengelola proyek-proyek 
        transformasi yang kompleks di berbagai industri. Kami memahami bahwa setiap situasi 
        restrukturisasi bersifat unik dan memerlukan pendekatan yang disesuaikan.
      </p>
      <p className="mb-4">
        Kami bekerja secara kolaboratif dengan manajemen dan pemangku kepentingan kunci untuk 
        mengembangkan solusi yang praktis dan berkelanjutan. Fokus kami adalah tidak hanya pada 
        hasil jangka pendek, tetapi juga pada penciptaan nilai jangka panjang dan keberlanjutan bisnis.
      </p>
    </>
  );

  return (
    <ServiceDetail
      title="Restrukturisasi Perusahaan"
      description="Strategi dan implementasi perubahan struktur perusahaan untuk meningkatkan efisiensi dan nilai"
      heroImage="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80"
      content={content}
      relatedServices={relatedServices}
    />
  );
};

export default Restrukturisasi;
