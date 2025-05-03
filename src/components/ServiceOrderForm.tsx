
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ServiceCard from './ServiceCard';
import { Building2, BarChart3, FileSearch, FileSpreadsheet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const serviceCategories = [
  {
    id: "audit",
    title: "Audit",
    description: "Layanan audit keuangan, kepatuhan, dan operasional untuk memastikan kehandalan laporan keuangan dan kepatuhan terhadap regulasi.",
    icon: <FileSearch size={24} />,
    options: [
      "Audit Laporan Keuangan",
      "Audit Kepatuhan",
      "Review Keuangan"
    ]
  },
  {
    id: "tax",
    title: "Pajak",
    description: "Layanan perpajakan mulai dari perencanaan pajak, kepatuhan pajak, hingga konsultasi masalah perpajakan khusus.",
    icon: <Building2 size={24} />,
    options: [
      "Perencanaan Pajak", 
      "Kepatuhan Pajak",
      "Konsultasi Perpajakan"
    ]
  },
  {
    id: "investigation",
    title: "Investigasi",
    description: "Layanan investigasi untuk mendeteksi fraud, audit forensik, dan due diligence untuk merger dan akuisisi.",
    icon: <FileSearch size={24} />,
    options: [
      "Due Diligence",
      "Audit Forensik",
      "Penyelidikan Fraud"
    ]
  },
  {
    id: "financial",
    title: "Finansial",
    description: "Layanan konsultasi keuangan termasuk penyusunan laporan keuangan, pembukuan, dan implementasi sistem akuntansi.",
    icon: <FileSpreadsheet size={24} />,
    options: [
      "Penyusunan Laporan Keuangan",
      "Pembukuan dan Akuntansi",
      "Konsultasi Sistem Akuntansi"
    ]
  }
];

const ServiceOrderForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    npwp: '',
    message: '',
    documents: null as FileList | null
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleServiceCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedService(null);
    setStep(2);
  };

  const handleServiceSelect = (service: string) => {
    setSelectedService(service);
    setStep(3);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error once field is filled
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData(prev => ({
        ...prev,
        documents: e.target.files
      }));
      
      if (formErrors.documents) {
        setFormErrors(prev => ({
          ...prev,
          documents: ''
        }));
      }
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/;
    
    if (!formData.companyName.trim()) {
      errors.companyName = 'Nama perusahaan wajib diisi';
    }
    
    if (!formData.contactPerson.trim()) {
      errors.contactPerson = 'Nama kontak wajib diisi';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email wajib diisi';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Format email tidak valid';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Nomor telepon wajib diisi';
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = 'Format nomor telepon tidak valid (gunakan format: 08xxxxxxxxxx)';
    }
    
    if (!formData.address.trim()) {
      errors.address = 'Alamat wajib diisi';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Formulir belum lengkap",
        description: "Mohon lengkapi semua field yang wajib diisi",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Permintaan layanan berhasil dikirim",
        description: "Tim kami akan menghubungi Anda segera untuk tindak lanjut",
      });
      
      // Redirect back to homepage
      navigate("/");
    }, 1500);
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
      if (step === 2) {
        setSelectedCategory(null);
      }
      if (step === 3) {
        setSelectedService(null);
      }
    } else {
      navigate("/login");
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-kap-navy mb-2">Pilih Kategori Layanan</h2>
              <p className="text-gray-600">Silakan pilih kategori layanan yang Anda butuhkan</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {serviceCategories.map(category => (
                <ServiceCard 
                  key={category.id}
                  title={category.title}
                  description={category.description}
                  icon={category.icon}
                  onSelect={() => handleServiceCategorySelect(category.id)}
                />
              ))}
            </div>
          </div>
        );
        
      case 2:
        const category = serviceCategories.find(cat => cat.id === selectedCategory);
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-kap-navy mb-2">
                Pilih Layanan {category?.title}
              </h2>
              <p className="text-gray-600">Pilih jenis layanan spesifik yang Anda butuhkan</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {category?.options.map((option, index) => (
                <Card 
                  key={index} 
                  className="cursor-pointer transition-all hover:shadow-md border-gray-200"
                  onClick={() => handleServiceSelect(option)}
                >
                  <CardContent className="pt-6 pb-6">
                    <h3 className="font-semibold text-center text-kap-navy mb-4">{option}</h3>
                    <Button className="w-full bg-kap-navy hover:bg-kap-blue">
                      Pilih
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-kap-navy mb-2">Informasi Perusahaan</h2>
              <p className="text-gray-600">Mohon lengkapi data perusahaan Anda</p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Layanan yang Dipilih</CardTitle>
                <CardDescription>
                  {selectedService} - {serviceCategories.find(cat => cat.id === selectedCategory)?.title}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">
                        Nama Perusahaan <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className={formErrors.companyName ? "border-red-500" : ""}
                      />
                      {formErrors.companyName && (
                        <p className="text-sm text-red-500">{formErrors.companyName}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contactPerson">
                        Nama Kontak <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="contactPerson"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        className={formErrors.contactPerson ? "border-red-500" : ""}
                      />
                      {formErrors.contactPerson && (
                        <p className="text-sm text-red-500">{formErrors.contactPerson}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={formErrors.email ? "border-red-500" : ""}
                      />
                      {formErrors.email && (
                        <p className="text-sm text-red-500">{formErrors.email}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        Nomor Telepon <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={formErrors.phone ? "border-red-500" : ""}
                      />
                      {formErrors.phone && (
                        <p className="text-sm text-red-500">{formErrors.phone}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">
                      Alamat Perusahaan <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`min-h-[80px] ${formErrors.address ? "border-red-500" : ""}`}
                    />
                    {formErrors.address && (
                      <p className="text-sm text-red-500">{formErrors.address}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="npwp">NPWP</Label>
                    <Input
                      id="npwp"
                      name="npwp"
                      value={formData.npwp}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="documents">Dokumen Pendukung</Label>
                    <Input
                      id="documents"
                      name="documents"
                      type="file"
                      onChange={handleFileChange}
                      multiple
                      accept=".pdf,.doc,.docx,.xls,.xlsx"
                    />
                    <p className="text-xs text-gray-500">
                      Format yang diterima: PDF, Word, Excel (Maks. 10MB)
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Pesan Tambahan</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="min-h-[120px]"
                      placeholder="Jelaskan kebutuhan spesifik Anda terkait layanan yang dipilih"
                    />
                  </div>
                  
                  <div className="flex justify-between pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={goBack}
                    >
                      Kembali
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-[#D4AF37] hover:bg-[#C09E2F] text-white min-w-[120px]"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Mengirim..." : "Kirim Permintaan"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-10">
          <div className="flex items-center justify-center">
            <div className="flex items-center w-full max-w-3xl justify-between">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="relative">
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                    stepNumber < step 
                      ? "bg-kap-blue border-kap-blue text-white" 
                      : stepNumber === step 
                        ? "bg-white border-kap-blue text-kap-blue" 
                        : "bg-white border-gray-300 text-gray-400"
                  }`}>
                    {stepNumber < step ? (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      stepNumber
                    )}
                  </div>
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-center w-32">
                    <span className={`text-sm ${
                      step >= stepNumber ? "text-kap-navy font-medium" : "text-gray-500"
                    }`}>
                      {stepNumber === 1 ? 'Pilih Kategori' : 
                       stepNumber === 2 ? 'Pilih Layanan' : 'Data Perusahaan'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center w-full max-w-3xl mx-auto mt-5">
            <div className="h-1 flex-1 bg-gray-200 mx-5">
              <div className={`h-full bg-kap-blue transition-all duration-300 ${
                step > 1 ? 'w-1/2' : 'w-0'
              } ${step > 2 ? 'w-full' : ''}`}></div>
            </div>
          </div>
        </div>
        
        {/* Step Content */}
        {renderStepContent()}
      </div>
    </div>
  );
};

export default ServiceOrderForm;
