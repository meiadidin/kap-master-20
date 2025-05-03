import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock data for clients and team members
const mockClients = [
  { id: 1, name: "PT Maju Bersama" },
  { id: 2, name: "CV Teknologi Nusantara" },
  { id: 3, name: "PT Sejahtera Abadi" },
  { id: 4, name: "PT Bintang Timur" },
  { id: 5, name: "PT Global Indonesia" },
  { id: 6, name: "CV Mandiri Jaya" },
];

const mockTeamMembers = [
  { id: 1, name: "Ahmad Faisal" },
  { id: 2, name: "Budi Santoso" },
  { id: 3, name: "Siti Rahma" },
  { id: 4, name: "Diana Putri" },
  { id: 5, name: "Rio Andika" },
  { id: 6, name: "Anita Wijaya" },
];

const auditTypes = [
  "Audit Laporan Keuangan",
  "Review Pajak",
  "Due Diligence",
  "Audit Internal",
  "Audit Kepatuhan",
  "Audit Operasional",
];

const statusOptions = [
  { value: "upcoming", label: "Akan Datang" },
  { value: "ongoing", label: "Sedang Berjalan" },
  { value: "completed", label: "Selesai" },
  { value: "delayed", label: "Tertunda" },
];

const priorityOptions = [
  { value: "high", label: "Tinggi" },
  { value: "medium", label: "Sedang" },
  { value: "low", label: "Rendah" },
];

// Form schema with Zod validation - Fixed validation method
const formSchema = z.object({
  client: z.string({
    required_error: "Silakan pilih klien",
  }),
  auditType: z.string({
    required_error: "Silakan pilih jenis audit",
  }),
  startDate: z.date({
    required_error: "Silakan pilih tanggal mulai",
  }),
  endDate: z.date({
    required_error: "Silakan pilih tanggal selesai",
  }),
  team: z.array(z.string()).min(1, {
    message: "Pilih minimal 1 anggota tim",
  }),
  status: z.string({
    required_error: "Silakan pilih status",
  }),
  priority: z.string({
    required_error: "Silakan pilih prioritas",
  }),
  notes: z.string().optional(),
}).refine((data) => {
  // Check if endDate is after startDate
  return !data.startDate || !data.endDate || data.endDate >= data.startDate;
}, {
  message: "Tanggal selesai harus setelah tanggal mulai",
  path: ["endDate"], // Show error on the endDate field
});

type FormValues = z.infer<typeof formSchema>;

interface AddAuditScheduleFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const AddAuditScheduleForm = ({ isOpen, onClose, onSubmit }: AddAuditScheduleFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<string[]>([]);
  
  // Check user permissions
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
  const canAddSchedule = ['managingpartner', 'partner'].includes(currentUser.role || '');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "upcoming",
      team: [],
    },
  });

  const handleFormSubmit = async (data: FormValues) => {
    // Check permissions - this is double security in case someone bypasses the UI restrictions
    if (!canAddSchedule) {
      toast({
        title: "Akses Ditolak",
        description: "Anda tidak memiliki izin untuk menambahkan jadwal audit.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, you would make an API call here
      // For now, we'll just simulate it with a timeout
      
      // Prepare data for submission
      const formattedData = {
        client: mockClients.find(c => c.name === data.client)?.name,
        auditType: data.auditType,
        startDate: format(data.startDate, "yyyy-MM-dd"),
        endDate: format(data.endDate, "yyyy-MM-dd"),
        status: data.status,
        priority: data.priority,
        team: data.team,
        notes: data.notes || "",
      };
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Pass data back to parent
      onSubmit(formattedData);
      
      // Reset form
      form.reset();
      setSelectedTeamMembers([]);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal menambahkan jadwal audit. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleTeamMemberSelect = (memberName: string) => {
    // Toggle selection
    if (selectedTeamMembers.includes(memberName)) {
      const filtered = selectedTeamMembers.filter(name => name !== memberName);
      setSelectedTeamMembers(filtered);
      form.setValue('team', filtered);
    } else {
      const updated = [...selectedTeamMembers, memberName];
      setSelectedTeamMembers(updated);
      form.setValue('team', updated);
    }
    
    // Trigger validation
    form.trigger('team');
  };
  
  const formatDate = (date?: Date) => {
    if (!date) return "Pilih tanggal";
    return format(date, "d MMMM yyyy", { locale: id });
  };

  // Handle form cancel
  const handleCancel = () => {
    form.reset();
    setSelectedTeamMembers([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-kap-navy">Tambah Jadwal Audit Baru</DialogTitle>
          <DialogDescription>
            Masukkan detail jadwal audit yang ingin ditambahkan.
            {!canAddSchedule && (
              <div className="mt-2 text-red-600">
                Anda tidak memiliki izin untuk menambahkan jadwal audit.
              </div>
            )}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Client Selection */}
              <FormField
                control={form.control}
                name="client"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Klien</FormLabel>
                    <Select
                      disabled={!canAddSchedule || isSubmitting}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih klien" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {mockClients.map((client) => (
                            <SelectItem key={client.id} value={client.name}>
                              {client.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Audit Type */}
              <FormField
                control={form.control}
                name="auditType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis Audit</FormLabel>
                    <Select
                      disabled={!canAddSchedule || isSubmitting}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih jenis audit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {auditTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Start Date */}
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal Mulai</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                            disabled={!canAddSchedule || isSubmitting}
                          >
                            {field.value ? formatDate(field.value) : "Pilih tanggal"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          locale={id}
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* End Date */}
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal Selesai</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                            disabled={!canAddSchedule || isSubmitting}
                          >
                            {field.value ? formatDate(field.value) : "Pilih tanggal"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          locale={id}
                          disabled={(date) => {
                            const startDate = form.getValues("startDate");
                            return startDate ? date < startDate : false;
                          }}
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Status */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      disabled={!canAddSchedule || isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {statusOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Priority */}
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prioritas</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      disabled={!canAddSchedule || isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih prioritas" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {priorityOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Team Members */}
            <FormField
              control={form.control}
              name="team"
              render={() => (
                <FormItem>
                  <FormLabel>Tim Audit</FormLabel>
                  <FormDescription>Pilih minimal 1 anggota tim untuk audit ini.</FormDescription>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {mockTeamMembers.map((member) => (
                        <div 
                          key={member.id}
                          className={cn(
                            "flex items-center space-x-2 border rounded-md p-2 cursor-pointer transition-all",
                            selectedTeamMembers.includes(member.name)
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          )}
                          onClick={() => !isSubmitting && canAddSchedule && handleTeamMemberSelect(member.name)}
                        >
                          <div 
                            className={cn(
                              "w-4 h-4 border rounded-sm flex items-center justify-center",
                              selectedTeamMembers.includes(member.name)
                                ? "bg-blue-500 border-blue-500"
                                : "border-gray-300"
                            )}
                          >
                            {selectedTeamMembers.includes(member.name) && (
                              <Check className="h-3 w-3 text-white" />
                            )}
                          </div>
                          <span className="text-sm">{member.name}</span>
                        </div>
                      ))}
                    </div>
                    {selectedTeamMembers.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedTeamMembers.map((name) => (
                          <Badge key={name} variant="secondary">
                            {name}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {form.formState.errors.team && (
                      <p className="text-sm font-medium text-red-500">
                        {form.formState.errors.team.message}
                      </p>
                    )}
                  </div>
                </FormItem>
              )}
            />

            {/* Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catatan Tambahan</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Masukkan catatan tambahan untuk jadwal audit ini (opsional)"
                      className="resize-none min-h-[100px]"
                      disabled={!canAddSchedule || isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Batal
              </Button>
              <Button
                type="submit"
                className="bg-kap-navy hover:bg-kap-blue text-white"
                disabled={!canAddSchedule || isSubmitting}
              >
                {isSubmitting ? "Menyimpan..." : "Simpan Jadwal Audit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAuditScheduleForm;
