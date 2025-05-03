
import React from 'react';
import ServiceOrderForm from '@/components/ServiceOrderForm';

const ServiceOrderPage = () => {
  return (
    <div>
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
