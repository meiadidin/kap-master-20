
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
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { usePermissions } from "./hooks/usePermissions";
import { formSchema, FormValues } from "./schema/teamMemberSchema";
import BasicInfoFields from "./form-fields/BasicInfoFields";
import ProfessionalInfoFields from "./form-fields/ProfessionalInfoFields";
import CompetenciesField from "./form-fields/CompetenciesField";

interface AddTeamMemberFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const AddTeamMemberForm = ({ isOpen, onClose, onSubmit }: AddTeamMemberFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { canAddTeamMember } = usePermissions();

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
        skills: values.competencies.map(id => {
          const comp = competencies.find(comp => comp.id === id);
          return comp ? comp.label : "";
        }).filter(label => label !== "")
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
            <div className="space-y-6">
              {/* Basic Information */}
              <BasicInfoFields form={form} disabled={!canAddTeamMember || isSubmitting} />
              
              {/* Professional Information */}
              <ProfessionalInfoFields form={form} disabled={!canAddTeamMember || isSubmitting} />
              
              {/* Competencies */}
              <CompetenciesField form={form} disabled={!canAddTeamMember || isSubmitting} />
            </div>

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

// Import competencies for the formatting logic
import { competencies } from "./schema/teamMemberSchema";
