
import Hero from "@/components/Hero";
import ContactForm from "@/components/ContactForm";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Contact = () => {
  const officeLocations = [
    {
      city: "Jakarta",
      address: "Gedung Menara Kadin Indonesia Lt. 15, Jl. HR. Rasuna Said Blok X-5 Kav. 2-3, Jakarta Selatan 12950",
      phone: "(021) 5274362",
      email: "jakarta@kapindonesia.co.id"
    },
    {
      city: "Surabaya",
      address: "Gedung Graha Pena Lt. 10, Jl. Ahmad Yani 88, Surabaya 60231",
      phone: "(031) 8539437",
      email: "surabaya@kapindonesia.co.id"
    },
    {
      city: "Medan",
      address: "Wisma HSBC Lt. 6, Jl. Diponegoro No. 11, Medan 20152",
      phone: "(061) 4529388",
      email: "medan@kapindonesia.co.id"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title="Hubungi Kami"
        subtitle="Tim kami siap membantu menjawab pertanyaan dan memberikan solusi untuk kebutuhan bisnis Anda"
        image="https://images.unsplash.com/photo-1560264280-88b68371db39?auto=format&fit=crop&q=80"
        showButton={false}
        height="h-[400px]"
      />

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-kap-navy mb-6">Kontak Kami</h2>
            <p className="text-gray-600">
              Kami siap mendengarkan kebutuhan Anda. Hubungi kami untuk pertanyaan, konsultasi awal, atau untuk membuat janji pertemuan dengan tim ahli kami.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-lg shadow-md p-8 text-center flex flex-col items-center">
              <div className="bg-kap-light p-4 rounded-full mb-4">
                <Phone className="text-kap-navy" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-kap-navy mb-2">Telepon</h3>
              <p className="text-gray-600">(021) 5274362</p>
              <p className="text-gray-600 mt-1">0811-9876-5432</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 text-center flex flex-col items-center">
              <div className="bg-kap-light p-4 rounded-full mb-4">
                <Mail className="text-kap-navy" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-kap-navy mb-2">Email</h3>
              <p className="text-gray-600">info@kapindonesia.co.id</p>
              <p className="text-gray-600 mt-1">admin@kapindonesia.co.id</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 text-center flex flex-col items-center">
              <div className="bg-kap-light p-4 rounded-full mb-4">
                <Clock className="text-kap-navy" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-kap-navy mb-2">Jam Operasional</h3>
              <p className="text-gray-600">Senin - Jumat: 09:00 - 17:00</p>
              <p className="text-gray-600 mt-1">Sabtu: 09:00 - 13:00</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-kap-navy mb-6">Kirim Pesan</h3>
              <p className="text-gray-600 mb-8">
                Isi formulir di bawah ini dan tim kami akan segera menghubungi Anda dalam waktu 1x24 jam.
              </p>
              <ContactForm />
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-kap-navy mb-6">Lokasi Kantor</h3>
              
              <div className="grid grid-cols-1 gap-8">
                {officeLocations.map((office, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6">
                    <h4 className="text-xl font-semibold text-kap-navy mb-4">Kantor {office.city}</h4>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <MapPin className="text-kap-gold flex-shrink-0 mr-3 mt-1" size={18} />
                        <span className="text-gray-600">{office.address}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="text-kap-gold flex-shrink-0 mr-3" size={18} />
                        <span className="text-gray-600">{office.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="text-kap-gold flex-shrink-0 mr-3" size={18} />
                        <span className="text-gray-600">{office.email}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-8 pb-16">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-kap-navy mb-6 text-center">Lokasi Kami</h3>
          <div className="bg-gray-200 rounded-lg h-[400px] overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2888408331373!2d106.83040931536932!3d-6.224169662712197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3ea2c5c41cf%3A0x26be4c69eb55cd08!2sMenara%20Kadin%20Indonesia!5e0!3m2!1sen!2sid!4v1620203868513!5m2!1sen!2sid" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              title="Google Maps - Lokasi KAP Indonesia"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
