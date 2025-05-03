
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

const TeamMemberForm = ({ isOpen, onClose }: TeamMemberFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    email: "",
    phone: "",
    experience: "",
    skills: "",
    image: null as File | null,
  });

  const positions = [
    "Partner",
    "Managing Partner",
    "Senior Manager",
    "Manager",
    "Senior Auditor",
    "Auditor",
    "Staff"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, position: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({ ...prev, image: e.target.files?.[0] || null }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.position || !formData.email) {
      toast({
        title: "Form tidak lengkap",
        description: "Nama, posisi, dan email wajib diisi",
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
    
    setIsSubmitting(true);
    
    // Simulate API call to /api/team/add
    try {
      // In a real implementation, you would send the form data to the API
      // const response = await fetch('/api/team/add', {
      //   method: 'POST',
      //   body: JSON.stringify(formData),
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
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
        skills: "",
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
              required
            />
          </div>
          
          {/* Posisi */}
          <div className="space-y-2">
            <Label htmlFor="position">
              Posisi <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.position}
              onValueChange={handleSelectChange}
              required
            >
              <SelectTrigger id="position" className="w-full">
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
              required
            />
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
              placeholder="Masukkan nomor telepon"
            />
          </div>
          
          {/* Pengalaman */}
          <div className="space-y-2">
            <Label htmlFor="experience">
              Pengalaman
            </Label>
            <Textarea
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              placeholder="Deskripsi pengalaman kerja"
              className="min-h-[100px]"
            />
          </div>
          
          {/* Keahlian */}
          <div className="space-y-2">
            <Label htmlFor="skills">
              Keahlian
            </Label>
            <Textarea
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              placeholder="Deskripsi keahlian"
              className="min-h-[100px]"
            />
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
              className="bg-kap-navy hover:bg-kap-blue text-white"
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
