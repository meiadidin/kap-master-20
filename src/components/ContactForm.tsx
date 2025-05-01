
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      
      toast({
        title: "Pesan Terkirim",
        description: "Terima kasih telah menghubungi kami. Tim kami akan segera menghubungi Anda.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Nama Lengkap
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Masukkan nama lengkap Anda"
            required
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Masukkan alamat email Anda"
            required
            className="w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Nomor Telepon
          </label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Masukkan nomor telepon Anda"
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-2">
            Subjek
          </label>
          <Input
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Masukkan subjek pesan"
            required
            className="w-full"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Pesan
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tuliskan pesan Anda di sini"
          required
          className="w-full min-h-[150px]"
        />
      </div>

      <Button
        type="submit"
        className="bg-kap-navy hover:bg-kap-blue text-white w-full md:w-auto px-8"
        disabled={loading}
      >
        {loading ? "Mengirim..." : "Kirim Pesan"}
      </Button>
    </form>
  );
};

export default ContactForm;
