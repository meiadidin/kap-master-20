
import React from 'react';
import { Helmet } from 'react-helmet';
import ServiceOrderForm from '@/components/ServiceOrderForm';

const ServiceOrderPage = () => {
  return (
    <div>
      <Helmet>
        <title>Pesan Layanan Profesional - MGI Gideon Adi & Rekan Surabaya</title>
        <meta name="description" content="Pesan layanan audit, pajak, investigasi, dan konsultasi finansial dari MGI Gideon Adi & Rekan Surabaya." />
      </Helmet>
      
      <div className="bg-gradient-to-b from-kap-navy to-kap-blue text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Pesan Layanan Profesional</h1>
            <p className="text-lg opacity-90">
              Kami menyediakan berbagai layanan profesional untuk membantu pertumbuhan dan kepatuhan bisnis Anda.
            </p>
          </div>
        </div>
      </div>

      <ServiceOrderForm />
    </div>
  );
};

export default ServiceOrderPage;
