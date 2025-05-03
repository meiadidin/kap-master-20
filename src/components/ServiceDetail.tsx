
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ServiceDetailProps {
  title: string;
  description: string;
  heroImage: string;
  content: React.ReactNode;
  relatedServices?: {
    title: string;
    description: string;
    link: string;
  }[];
}

const ServiceDetail = ({
  title,
  description,
  heroImage,
  content,
  relatedServices,
}: ServiceDetailProps) => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title={title}
        subtitle={description}
        image={heroImage}
        showButton={false}
      />

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link to="/layanan" className="inline-flex items-center text-kap-blue hover:text-kap-navy mb-10">
              <ArrowLeft size={18} className="mr-2" />
              <span>Kembali ke Layanan</span>
            </Link>
            
            <div className="prose max-w-none">
              {content}
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices && relatedServices.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-kap-navy mb-4">Layanan Terkait</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Temukan layanan lain yang mungkin sesuai dengan kebutuhan bisnis Anda
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {relatedServices.map((service, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                  <h3 className="text-xl font-semibold mb-3 text-kap-navy">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <Link to={service.link} className="inline-flex items-center text-kap-blue hover:text-kap-navy font-medium">
                    <span>Pelajari lebih lanjut</span>
                    <ArrowRight size={18} className="ml-2" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-kap-navy mb-6">
            Butuh informasi lebih lanjut?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Tim ahli kami siap membantu Anda dengan kebutuhan spesifik bisnis Anda.
            Hubungi kami untuk konsultasi tanpa biaya.
          </p>
          <Link to="/kontak">
            <Button className="bg-kap-navy hover:bg-kap-blue text-white px-8">
              Hubungi Kami
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
