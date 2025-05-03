
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Phone, Book, FileText, DollarSign, Award, Send, Upload } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface JobApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
}

const JobApplicationForm = ({ isOpen, onClose, jobTitle }: JobApplicationFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    experience: "",
    salary: "",
    skills: "",
    resume: null as File | null,
    coverLetter: null as File | null,
    transcript: null as File | null,
  });

  const educationLevels = [
    "D3 - Diploma",
    "S1 - Sarjana",
    "S2 - Magister",
    "S3 - Doktor",
    "Lainnya"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({ ...prev, [fieldName]: e.target.files?.[0] || null }));
    }
  };

  const handleSelectChange = (value: string, fieldName: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.education) {
      toast({
        title: "Form tidak lengkap",
        description: "Silakan isi semua bidang yang diperlukan",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Format email tidak valid",
        description: "Silakan masukkan alamat email yang valid",
        variant: "destructive",
      });
      return;
    }
    
    // Phone validation (simple Indonesian format)
    const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast({
        title: "Format nomor telepon tidak valid",
        description: "Silakan masukkan nomor telepon yang valid",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Here you would typically send the data to a server
    // For this example, we'll simulate a server request
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Lamaran Berhasil Dikirim",
        description: `Terima kasih telah melamar untuk posisi ${jobTitle}. Tim kami akan meninjau lamaran Anda.`,
      });
      onClose();
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        education: "",
        experience: "",
        salary: "",
        skills: "",
        resume: null,
        coverLetter: null,
        transcript: null,
      });
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-kap-navy">
            Lamaran untuk posisi {jobTitle}
          </DialogTitle>
          <DialogDescription>
            Silakan lengkapi formulir di bawah untuk mengirimkan lamaran Anda.
            Bidang dengan tanda <span className="text-red-500">*</span> wajib diisi.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Nama */}
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center">
              <User className="mr-2 h-4 w-4 text-kap-navy" />
              Nama Lengkap <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Masukkan nama lengkap Anda"
              required
            />
          </div>
          
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center">
              <Mail className="mr-2 h-4 w-4 text-kap-navy" />
              Email <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="email@example.com"
              required
            />
          </div>
          
          {/* Telepon */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center">
              <Phone className="mr-2 h-4 w-4 text-kap-navy" />
              Nomor Telepon <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Contoh: 081234567890"
              required
            />
          </div>
          
          {/* Pendidikan */}
          <div className="space-y-2">
            <Label htmlFor="education" className="flex items-center">
              <Book className="mr-2 h-4 w-4 text-kap-navy" />
              Pendidikan Terakhir <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select
              value={formData.education}
              onValueChange={(value) => handleSelectChange(value, "education")}
              required
            >
              <SelectTrigger id="education" className="w-full">
                <SelectValue placeholder="Pilih pendidikan terakhir" />
              </SelectTrigger>
              <SelectContent>
                {educationLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Pengalaman */}
          <div className="space-y-2">
            <Label htmlFor="experience" className="flex items-center">
              <FileText className="mr-2 h-4 w-4 text-kap-navy" />
              Pengalaman
            </Label>
            <Textarea
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              placeholder="Ceritakan pengalaman kerja Anda yang relevan"
              className="min-h-[120px]"
            />
          </div>
          
          {/* Unggah CV */}
          <div className="space-y-2">
            <Label htmlFor="resume" className="flex items-center">
              <FileText className="mr-2 h-4 w-4 text-kap-navy" />
              Unggah CV (PDF, Maks 5MB)
            </Label>
            <div className="flex items-center">
              <Input
                id="resume"
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileChange(e, "resume")}
                className="flex-1"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              * Format yang diterima: PDF, ukuran maksimum 5MB
            </p>
          </div>
          
          {/* Unggah Surat Lamaran */}
          <div className="space-y-2">
            <Label htmlFor="coverLetter" className="flex items-center">
              <FileText className="mr-2 h-4 w-4 text-kap-navy" />
              Unggah Surat Lamaran (PDF, Maks 5MB)
            </Label>
            <div className="flex items-center">
              <Input
                id="coverLetter"
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileChange(e, "coverLetter")}
                className="flex-1"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              * Format yang diterima: PDF, ukuran maksimum 5MB
            </p>
          </div>
          
          {/* Unggah Transkrip */}
          <div className="space-y-2">
            <Label htmlFor="transcript" className="flex items-center">
              <FileText className="mr-2 h-4 w-4 text-kap-navy" />
              Unggah Transkrip (PDF, Maks 5MB)
            </Label>
            <div className="flex items-center">
              <Input
                id="transcript"
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileChange(e, "transcript")}
                className="flex-1"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              * Format yang diterima: PDF, ukuran maksimum 5MB
            </p>
          </div>
          
          {/* Ekspektasi Gaji */}
          <div className="space-y-2">
            <Label htmlFor="salary" className="flex items-center">
              <DollarSign className="mr-2 h-4 w-4 text-kap-navy" />
              Ekspektasi Gaji
            </Label>
            <Input
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleInputChange}
              placeholder="Masukkan ekspektasi gaji Anda (contoh: 8.000.000 - 10.000.000)"
            />
          </div>
          
          {/* Keahlian */}
          <div className="space-y-2">
            <Label htmlFor="skills" className="flex items-center">
              <Award className="mr-2 h-4 w-4 text-kap-navy" />
              Keahlian
            </Label>
            <Textarea
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              placeholder="Sebutkan keahlian yang Anda miliki (contoh: Audit, Pajak, Akuntansi Keuangan, dll)"
              className="min-h-[100px]"
            />
          </div>
          
          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="bg-kap-navy hover:bg-kap-blue text-white gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Mengirim...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Kirim Lamaran
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JobApplicationForm;
