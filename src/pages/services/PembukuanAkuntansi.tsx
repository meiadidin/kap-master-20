
import ServiceDetail from "@/components/ServiceDetail";

const PembukuanAkuntansi = () => {
  const relatedServices = [
    {
      title: "Penyusunan Laporan Keuangan",
      description: "Penyusunan laporan keuangan sesuai dengan standar akuntansi yang berlaku di Indonesia.",
      link: "/layanan/penyusunan-laporan"
    },
    {
      title: "Konsultasi Sistem Akuntansi",
      description: "Pengembangan dan implementasi sistem akuntansi yang efektif dan sesuai kebutuhan bisnis.",
      link: "/layanan/konsultasi-sistem"
    },
    {
      title: "Kepatuhan Pajak",
      description: "Penyusunan dan pelaporan SPT Tahunan dan Bulanan untuk memastikan kepatuhan terhadap kewajiban perpajakan.",
      link: "/layanan/kepatuhan-pajak"
    }
  ];
  
  const content = (
    <>
      <h2 className="text-2xl font-bold mb-4">Layanan Pembukuan & Akuntansi</h2>
      <p className="mb-4">
        Layanan pembukuan dan akuntansi kami menyediakan pengelolaan transaksi keuangan 
        sehari-hari dan pencatatan akuntansi yang akurat untuk bisnis dari berbagai skala. 
        Kami membantu perusahaan mempertahankan catatan keuangan yang terorganisir dan 
        up-to-date, memberikan dasar yang kuat untuk pelaporan keuangan dan pengambilan keputusan.
      </p>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Lingkup Layanan Pembukuan & Akuntansi</h3>
      <p className="mb-4">
        Layanan pembukuan dan akuntansi kami mencakup:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">Pencatatan transaksi keuangan harian</li>
        <li className="mb-2">Pemeliharaan buku besar dan buku pembantu</li>
        <li className="mb-2">Rekonsiliasi bank</li>
        <li className="mb-2">Pemrosesan penggajian</li>
        <li className="mb-2">Pengelolaan piutang dan hutang</li>
        <li className="mb-2">Perhitungan dan pelaporan pajak bulanan</li>
        <li className="mb-2">Penyiapan laporan keuangan berkala</li>
        <li className="mb-2">Implementasi dan pemeliharaan sistem pembukuan</li>
      </ul>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Pendekatan Layanan Pembukuan & Akuntansi</h3>
      <p className="mb-4">
        Pendekatan kami dalam pembukuan dan akuntansi meliputi:
      </p>
      <ol className="list-decimal pl-6 mb-6">
        <li className="mb-2">
          <strong>Peniliaian Kebutuhan</strong> - Memahami proses bisnis dan kebutuhan spesifik klien
        </li>
        <li className="mb-2">
          <strong>Pengaturan Sistem</strong> - Mengatur atau mengoptimalkan sistem pembukuan yang sesuai
        </li>
        <li className="mb-2">
          <strong>Pengumpulan Data</strong> - Mengumpulkan dan mengorganisir dokumen transaksi keuangan
        </li>
        <li className="mb-2">
          <strong>Pemrosesan Transaksi</strong> - Mencatat dan mengklasifikasikan transaksi secara akurat
        </li>
        <li className="mb-2">
          <strong>Rekonsiliasi</strong> - Melakukan rekonsiliasi regular untuk memastikan akurasi
        </li>
        <li className="mb-2">
          <strong>Pelaporan</strong> - Menyiapkan laporan keuangan dan manajemen sesuai kebutuhan
        </li>
        <li className="mb-2">
          <strong>Review</strong> - Melakukan review berkala terhadap catatan keuangan
        </li>
      </ol>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Model Layanan</h3>
      <p className="mb-4">
        Kami menawarkan berbagai model layanan pembukuan dan akuntansi untuk memenuhi kebutuhan spesifik klien:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">
          <strong>Layanan Penuh</strong> - Kami menangani seluruh fungsi pembukuan dan akuntansi Anda
        </li>
        <li className="mb-2">
          <strong>Layanan Parsial</strong> - Kami menangani aspek-aspek tertentu dari pembukuan Anda
        </li>
        <li className="mb-2">
          <strong>Supervisi</strong> - Kami mengawasi dan memberikan panduan kepada staf pembukuan internal Anda
        </li>
        <li className="mb-2">
          <strong>Layanan Perbaikan</strong> - Kami membantu memperbaiki dan memperbarui catatan keuangan yang tertinggal
        </li>
      </ul>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Manfaat Layanan Pembukuan & Akuntansi</h3>
      <p className="mb-4">
        Dengan menggunakan layanan pembukuan dan akuntansi kami, klien mendapatkan berbagai manfaat:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">Akurasi dan konsistensi dalam pencatatan keuangan</li>
        <li className="mb-2">Penghematan waktu dan sumber daya internal</li>
        <li className="mb-2">Informasi keuangan yang tepat waktu untuk pengambilan keputusan</li>
        <li className="mb-2">Kepatuhan terhadap persyaratan pencatatan dan pelaporan</li>
        <li className="mb-2">Pengurangan risiko kesalahan dan penipuan</li>
        <li className="mb-2">Visibilitas yang lebih baik terhadap posisi keuangan perusahaan</li>
        <li className="mb-2">Dasar yang solid untuk perencanaan pajak</li>
      </ul>
      
      <h3 className="text-xl font-semibold mb-3 mt-6">Keunggulan Tim Kami</h3>
      <p className="mb-4">
        Tim pembukuan dan akuntansi kami terdiri dari profesional berpengelaman yang memiliki:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">Pengetahuan komprehensif tentang prinsip dan praktik akuntansi</li>
        <li className="mb-2">Pemahaman tentang berbagai industri dan kebutuhan spesifiknya</li>
        <li className="mb-2">Keterampilan dalam menggunakan berbagai software akuntansi</li>
        <li className="mb-2">Komitmen terhadap ketelitian dan ketepatan waktu</li>
        <li className="mb-2">Kemampuan untuk menjelaskan konsep keuangan dengan cara yang mudah dipahami</li>
      </ul>
      
      <p className="mb-4">
        Kami memahami bahwa setiap bisnis memiliki kebutuhan unik, dan kami menyesuaikan layanan 
        kami untuk memenuhi persyaratan spesifik Anda, memberikan solusi pembukuan yang efisien, 
        akurat, dan sesuai dengan tujuan bisnis Anda.
      </p>
    </>
  );

  return (
    <ServiceDetail
      title="Pembukuan & Akuntansi"
      description="Pengelolaan pembukuan dan pencatatan transaksi keuangan secara akurat dan tepat waktu"
      heroImage="https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&q=80"
      content={content}
      relatedServices={relatedServices}
    />
  );
};

export default PembukuanAkuntansi;
