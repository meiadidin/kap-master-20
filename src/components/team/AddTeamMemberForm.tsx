
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// Define available positions
const positions = [
  "Managing Partner",
  "Partner",
  "Senior Advisor",
  "Managing Digital",
  "Senior Manager",
  "Manager",
  "Senior Auditor",
  "Junior Auditor",
  "Senior Tax Consultant",
  "Tax Consultant",
  "Senior Consultant",
  "Consultant",
  "Accounting Staff"
];

// Define available competencies
const competencies = [
  { id: "audit-keuangan", label: "Audit Keuangan" },
  { id: "audit-internal", label: "Audit Internal" },
  { id: "pph-badan", label: "PPh Badan" },
  { id: "pph-baker", label: "PPh Baker" },
  { id: "ppn", label: "PPN" },
  { id: "tax-planning", label: "Tax Planning" },
  { id: "perencanaan-pajak", label: "Perencanaan Pajak" },
  { id: "percussion-pajak", label: "Percussion Pajak" },
  { id: "transfer-pricing", label: "Transfer Pricing" },
  { id: "manajemen-risiko", label: "Manajemen Risiko" },
  { id: "due-diligence", label: "Due Diligence" },
  { id: "laporan-keuangan", label: "Laporan Keuangan" },
  { id: "rekonsiliasi", label: "Rekonsiliasi" }
];

// Define form schema using zod for validation
const formSchema = z.object({
  name: z.string().min(1, { message: "Nama lengkap wajib diisi" }),
  email: z.string().email({ message: "Format email tidak valid" }),
  phone: z.string()
    .min(10, { message: "Nomor telepon minimal 10 digit" })
    .max(15, { message: "Nomor telepon maksimal 15 digit" })
    .regex(/^\d+$/, { message: "Nomor telepon hanya boleh berisi angka" }),
  position: z.string({ required_error: "Posisi wajib dipilih" }),
  experience: z.string()
    .min(1, { message: "Pengalaman wajib diisi" })
    .regex(/^\d+$/, { message: "Pengalaman harus berupa angka" }),
  competencies: z.array(z.string())
    .min(1, { message: "Pilih minimal 1 kompetensi" })
});

type FormValues = z.infer<typeof formSchema>;

interface AddTeamMemberFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const AddTeamMemberForm = ({ isOpen, onClose, onSubmit }: AddTeamMemberFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      position: "",
      experience: "",
      competencies: []
    }
  });

  // Check user permissions
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
  const canAddTeamMember = ['managingpartner', 'partner'].includes(currentUser.role || '');

  const handleSubmit = async (values: FormValues) => {
    if (!canAddTeamMember) {
      toast({
        title: "Akses Ditolak",
        description: "Anda tidak memiliki izin untuk menambahkan anggota tim.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Format data before submitting
      const formattedData = {
        ...values,
        skills: values.competencies.map(id => 
          competencies.find(comp => comp.id === id)?.label || ""
        ).filter(label => label !== "")
      };
      
      onSubmit(formattedData);
      form.reset();
    } catch (error) {
      toast({
        title: "Gagal menambahkan anggota",
        description: "Periksa kembali data yang dimasukkan.",
        variant: "destructive",
      });
      console.error("Error adding team member:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-kap-navy">Tambah Anggota Tim</DialogTitle>
          <DialogDescription>
            Lengkapi formulir di bawah untuk menambahkan anggota tim baru.
            Semua field wajib diisi.
            {!canAddTeamMember && (
              <div className="mt-2 text-red-600">
                Anda tidak memiliki izin untuk menambahkan anggota tim.
              </div>
            )}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 py-4">
            {/* Nama Lengkap */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Masukkan nama lengkap" 
                      {...field} 
                      disabled={!canAddTeamMember || isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="contoh@email.com" 
                      type="email" 
                      {...field} 
                      disabled={!canAddTeamMember || isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Nomor Telepon */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Telepon</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="08123456789" 
                      {...field} 
                      disabled={!canAddTeamMember || isSubmitting}
                      maxLength={15}
                      onChange={(e) => {
                        // Only allow numbers
                        const value = e.target.value.replace(/\D/g, '');
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Posisi/Role */}
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Posisi/Role</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    disabled={!canAddTeamMember || isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih posisi" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {positions.map((position) => (
                        <SelectItem key={position} value={position}>
                          {position}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Pengalaman */}
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pengalaman (tahun)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Contoh: 5" 
                      {...field} 
                      disabled={!canAddTeamMember || isSubmitting}
                      onChange={(e) => {
                        // Only allow numbers
                        const value = e.target.value.replace(/\D/g, '');
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Kompetensi */}
            <FormField
              control={form.control}
              name="competencies"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Kompetensi</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Pilih kompetensi yang dikuasai
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {competencies.map((competency) => (
                      <FormField
                        key={competency.id}
                        control={form.control}
                        name="competencies"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={competency.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  disabled={!canAddTeamMember || isSubmitting}
                                  checked={field.value?.includes(competency.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, competency.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== competency.id
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {competency.label}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
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
                disabled={!canAddTeamMember || isSubmitting}
              >
                {isSubmitting ? "Menyimpan..." : "Simpan"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTeamMemberForm;
