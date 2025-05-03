
import ServiceDetail from "@/components/ServiceDetail";

const PenyusunanLaporan = () => {
  const relatedServices = [
    {
      title: "Pembukuan & Akuntansi",
      description: "Pengelolaan pembukuan dan pencatatan transaksi keuangan secara akurat dan tepat waktu.",
      link: "/layanan/pembukuan-akuntansi"
    },
    {
      title: "Konsultasi Sistem Akuntansi",
      description: "Pengembangan dan implementasi sistem akuntansi yang efektif dan sesuai kebutuhan bisnis.",
      link: "/layanan/konsultasi-sistem"
    },
    {
      title: "Audit Keuangan",
      description: "Audit independen atas laporan keuangan untuk memastikan kepatuhan terhadap standar akuntansi yang berlaku.",
      link: "/layanan/audit-keuangan"
    }
  ];
  
  const content = (
    <>
      <h2 className="text-2xl font-bold mb-4">Layanan Penyusunan Laporan Keuangan</h2>
      <p className="mb-4">
        Layanan penyusunan laporan keuangan kami membantu perusahaan menyiapkan laporan keuangan 
        yang akurat dan sesuai dengan standar akuntansi yang berlaku di Indonesia, seperti 
        Standar Akuntansi Keuangan (SAK), SAK Entitas Tanpa Akuntabilitas Publik (ETAP), atau 
        SAK Entitas Mikro, Kecil, dan Menengah (EMKM) sesuai dengan kebutuhan perusahaan.
      </p>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Jenis Laporan Keuangan</h3>
      <p className="mb-4">
        Kami menyusun berbagai jenis laporan keuangan, meliputi:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">Laporan Posisi Keuangan (Neraca)</li>
        <li className="mb-2">Laporan Laba Rugi dan Penghasilan Komprehensif Lain</li>
        <li className="mb-2">Laporan Perubahan Ekuitas</li>
        <li className="mb-2">Laporan Arus Kas</li>
        <li className="mb-2">Catatan atas Laporan Keuangan</li>
        <li className="mb-2">Laporan keuangan konsolidasian untuk grup perusahaan</li>
        <li className="mb-2">Laporan keuangan untuk tujuan khusus</li>
      </ul>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Proses Penyusunan Laporan Keuangan</h3>
      <p className="mb-4">
        Metodologi kami dalam penyusunan laporan keuangan meliputi:
      </p>
      <ol className="list-decimal pl-6 mb-6">
        <li className="mb-2">
          <strong>Pengumpulan Data</strong> - Mengumpulkan semua dokumen dan informasi keuangan yang diperlukan
        </li>
        <li className="mb-2">
          <strong>Verifikasi dan Analisis</strong> - Memverifikasi keakuratan data dan melakukan analisis keuangan
        </li>
        <li className="mb-2">
          <strong>Penyusunan Jurnal dan Buku Besar</strong> - Mencatat transaksi ke dalam jurnal dan mempostingnya ke buku besar
        </li>
        <li className="mb-2">
          <strong>Penyesuaian</strong> - Membuat penyesuaian yang diperlukan sesuai dengan prinsip akuntansi
        </li>
        <li className="mb-2">
          <strong>Penyusunan Laporan</strong> - Menyusun laporan keuangan sesuai dengan format standar yang berlaku
        </li>
        <li className="mb-2">
          <strong>Review dan Finalisasi</strong> - Melakukan review untuk memastikan keakuratan dan kelengkapan laporan
        </li>
      </ol>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Standar Akuntansi yang Digunakan</h3>
      <p className="mb-4">
        Kami dapat menyusun laporan keuangan sesuai dengan berbagai standar, termasuk:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">Standar Akuntansi Keuangan (SAK)</li>
        <li className="mb-2">SAK Entitas Tanpa Akuntabilitas Publik (ETAP)</li>
        <li className="mb-2">SAK Entitas Mikro, Kecil, dan Menengah (EMKM)</li>
        <li className="mb-2">Standar Akuntansi Pemerintahan (SAP) untuk entitas pemerintah</li>
        <li className="mb-2">International Financial Reporting Standards (IFRS) jika diperlukan</li>
      </ul>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Manfaat Layanan Penyusunan Laporan Keuangan</h3>
      <p className="mb-4">
        Dengan menggunakan layanan penyusunan laporan keuangan kami, klien akan memperoleh manfaat berikut:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">Laporan keuangan yang akurat dan sesuai standar</li>
        <li className="mb-2">Kepatuhan terhadap persyaratan pelaporan</li>
        <li className="mb-2">Informasi keuangan yang andal untuk pengambilan keputusan</li>
        <li className="mb-2">Dokumentasi keuangan yang terorganisir dengan baik</li>
        <li className="mb-2">Pendampingan profesional dalam interpretasi laporan keuangan</li>
        <li className="mb-2">Efisiensi waktu dan sumber daya internal</li>
      </ul>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Pendekatan Kami</h3>
      <p className="mb-4">
        Tim akuntansi kami memiliki pengalaman luas dalam penyusunan laporan keuangan untuk 
        berbagai industri dan ukuran perusahaan. Kami memahami bahwa setiap bisnis memiliki 
        kebutuhan unik, dan kami menyesuaikan pendekatan kami untuk memastikan laporan keuangan 
        tidak hanya memenuhi persyaratan regulasi tetapi juga memberikan nilai tambah bagi manajemen.
      </p>
      <p className="mb-4">
        Kami bekerja dengan ketelitian tinggi dan selalu mengikuti perkembangan standar akuntansi 
        untuk memastikan laporan keuangan yang kami susun sesuai dengan praktik terbaik dan 
        peraturan terkini.
      </p>
    </>
  );

  return (
    <ServiceDetail
      title="Penyusunan Laporan Keuangan"
      description="Penyusunan laporan keuangan sesuai dengan standar akuntansi yang berlaku di Indonesia"
      heroImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80"
      content={content}
      relatedServices={relatedServices}
    />
  );
};

export default PenyusunanLaporan;
