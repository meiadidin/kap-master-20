
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TeamMemberFormProps {
  isOpen: boolean;
  onClose: () => void;
}

// Define the skills available for selection
const skillOptions = [
  "Audit Keuangan",
  "Audit Internal",
  "PPh Badan",
  "PPN",
  "Tax Planning",
  "Perencanaan Pajak",
  "Transfer Pricing",
  "Manajemen Risiko",
  "Due Diligence",
  "Laporan Keuangan",
  "Rekonsiliasi"
];

const TeamMemberForm = ({ isOpen, onClose }: TeamMemberFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    email: "",
    phone: "",
    experience: "",
    skills: [] as string[],
    image: null as File | null,
  });

  const [errors, setErrors] = useState({
    name: "",
    position: "",
    email: "",
    phone: "",
    experience: "",
  });

  const positions = [
    "Managing Partner",
    "Partner",
    "Senior Manager",
    "Manager",
    "Senior Auditor",
    "Auditor",
    "Senior Tax Consultant",
    "Tax Consultant",
    "Senior Consultant",
    "Consultant",
    "Accounting Staff",
    "Staff"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Clear the error for this field when the user starts typing again
    setErrors(prev => ({ ...prev, [name]: "" }));
    
    // Handle experience as a number
    if (name === "experience") {
      // Only allow numbers
      if (value === "" || /^\d+$/.test(value)) {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
      return;
    }
    
    // Handle phone number input
    if (name === "phone") {
      // Only allow numbers and plus sign at the beginning
      if (value === "" || /^\+?\d*$/.test(value)) {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setErrors(prev => ({ ...prev, position: "" }));
    setFormData(prev => ({ ...prev, position: value }));
  };

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => {
      const updatedSkills = prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill];
      
      return { ...prev, skills: updatedSkills };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData(prev => ({ ...prev, image: e.target.files?.[0] || null }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      position: "",
      email: "",
      phone: "",
      experience: "",
    };
    
    let isValid = true;
    
    // Validate required fields
    if (!formData.name.trim()) {
      newErrors.name = "Nama lengkap wajib diisi";
      isValid = false;
    }
    
    if (!formData.position) {
      newErrors.position = "Posisi wajib dipilih";
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi";
      isValid = false;
    } else {
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Format email tidak valid";
        isValid = false;
      }
    }
    
    // Phone number validation (optional but must be valid if provided)
    if (formData.phone && !/^\+?[0-9]{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Nomor telepon tidak valid (10-15 digit)";
      isValid = false;
    }
    
    // Experience validation (optional but must be a number if provided)
    if (formData.experience && !/^\d+$/.test(formData.experience)) {
      newErrors.experience = "Pengalaman harus berupa angka";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      toast({
        title: "Form tidak lengkap",
        description: "Silakan perbaiki kesalahan pada form",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Prepare form data for API
    const apiData = {
      ...formData,
      experience: formData.experience ? parseInt(formData.experience) : 0
    };
    
    try {
      // In a real implementation, you would send the form data to the API
      // const formDataToSend = new FormData();
      // Object.entries(apiData).forEach(([key, value]) => {
      //   if (key !== 'image') {
      //     formDataToSend.append(key, String(value));
      //   }
      // });
      // if (apiData.image) {
      //   formDataToSend.append('image', apiData.image);
      // }
      // 
      // const response = await fetch('/api/team/add', {
      //   method: 'POST',
      //   body: formDataToSend,
      // });
      // if (!response.ok) throw new Error('Failed to add team member');
      
      // For now, we'll simulate a successful response after a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Anggota Tim Berhasil Ditambahkan",
        description: `${formData.name} telah ditambahkan sebagai ${formData.position}`,
      });
      
      // Reset form and close dialog
      setFormData({
        name: "",
        position: "",
        email: "",
        phone: "",
        experience: "",
        skills: [],
        image: null,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Gagal Menambahkan Anggota Tim",
        description: "Terjadi kesalahan saat menambahkan anggota tim. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-kap-navy">
            Tambah Anggota Tim
          </DialogTitle>
          <DialogDescription>
            Silakan lengkapi formulir di bawah untuk menambahkan anggota tim baru.
            Bidang dengan tanda <span className="text-red-500">*</span> wajib diisi.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Nama */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Nama Lengkap <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Masukkan nama lengkap"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name}</p>
            )}
          </div>
          
          {/* Posisi */}
          <div className="space-y-2">
            <Label htmlFor="position">
              Posisi <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.position}
              onValueChange={handleSelectChange}
            >
              <SelectTrigger id="position" className={`w-full ${errors.position ? "border-red-500" : ""}`}>
                <SelectValue placeholder="Pilih posisi" />
              </SelectTrigger>
              <SelectContent>
                {positions.map((position) => (
                  <SelectItem key={position} value={position}>
                    {position}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.position && (
              <p className="text-sm text-red-500 mt-1">{errors.position}</p>
            )}
          </div>
          
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="example@email.com"
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>
          
          {/* Nomor Telepon */}
          <div className="space-y-2">
            <Label htmlFor="phone">
              Nomor Telepon
            </Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Masukkan nomor telepon (contoh: 081234567890)"
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && (
              <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
            )}
          </div>
          
          {/* Pengalaman */}
          <div className="space-y-2">
            <Label htmlFor="experience">
              Pengalaman (tahun)
            </Label>
            <Input
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              placeholder="Contoh: 5"
              className={errors.experience ? "border-red-500" : ""}
            />
            {errors.experience && (
              <p className="text-sm text-red-500 mt-1">{errors.experience}</p>
            )}
          </div>
          
          {/* Keahlian */}
          <div className="space-y-2">
            <Label>Keahlian</Label>
            <div className="grid grid-cols-2 gap-2">
              {skillOptions.map((skill) => (
                <div key={skill} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`skill-${skill}`}
                    checked={formData.skills.includes(skill)}
                    onChange={() => handleSkillToggle(skill)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <Label htmlFor={`skill-${skill}`} className="text-sm">
                    {skill}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Upload Foto */}
          <div className="space-y-2">
            <Label htmlFor="image">
              Foto Profil
            </Label>
            <Input
              id="image"
              name="image"
              type="file"
              onChange={handleFileChange}
              accept="image/jpeg, image/png"
            />
            <p className="text-xs text-gray-500 mt-1">
              Format yang diterima: JPG atau PNG, ukuran maksimum 2MB
            </p>
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
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TeamMemberForm;
