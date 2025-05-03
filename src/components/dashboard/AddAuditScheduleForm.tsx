import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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

// Form schema with Zod validation - Fixed refine method
const formSchema = z.object({
  clientId: z.number({
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
  }).superRefine((endDate, ctx) => {
    // Get the startDate from the context
    const startDate = ctx.parent.startDate;
    if (startDate && endDate < startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Tanggal selesai harus setelah tanggal mulai",
      });
    }
  }),
  teamMembers: z.array(z.number()).min(1, {
    message: "Pilih minimal 1 anggota tim",
  }),
  status: z.string({
    required_error: "Silakan pilih status",
  }),
  priority: z.string({
    required_error: "Silakan pilih prioritas",
  }),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AddAuditScheduleFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddAuditScheduleForm: React.FC<AddAuditScheduleFormProps> = ({
  isOpen,
  onClose,
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<number[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamMembers: [],
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    console.log("Form data submitted:", data);

    // Simulate API call with timeout
    setTimeout(() => {
      setIsSubmitting(false);
      // Show success notification
      toast({
        title: "Jadwal audit berhasil dibuat",
        description: `Jadwal audit untuk ${mockClients.find(c => c.id === data.clientId)?.name} telah berhasil ditambahkan.`,
      });
      form.reset();
      setSelectedTeamMembers([]);
      onClose();
    }, 1000);
  };

  const toggleTeamMember = (memberId: number) => {
    if (selectedTeamMembers.includes(memberId)) {
      setSelectedTeamMembers(selectedTeamMembers.filter(id => id !== memberId));
      form.setValue('teamMembers', form.getValues('teamMembers').filter(id => id !== memberId));
    } else {
      setSelectedTeamMembers([...selectedTeamMembers, memberId]);
      form.setValue('teamMembers', [...form.getValues('teamMembers'), memberId]);
    }
    form.trigger('teamMembers');
  };

  const formatDate = (date?: Date) => {
    if (!date) return "Pilih tanggal";
    return format(date, "d MMMM yyyy", { locale: id });
  };

  const getTeamMemberNames = () => {
    return selectedTeamMembers
      .map((id) => mockTeamMembers.find((m) => m.id === id)?.name)
      .filter(Boolean)
      .join(", ");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tambah Jadwal Audit Baru</DialogTitle>
          <DialogDescription>
            Masukkan detail jadwal audit yang ingin ditambahkan.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Client Selection */}
              <FormField
                control={form.control}
                name="clientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Klien</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className="w-full justify-between"
                          >
                            {field.value
                              ? mockClients.find((client) => client.id === field.value)?.name
                              : "Pilih klien"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Cari klien..." />
                          <CommandEmpty>Tidak ada klien yang ditemukan.</CommandEmpty>
                          <CommandGroup>
                            {mockClients.map((client) => (
                              <CommandItem
                                key={client.id}
                                value={client.name}
                                onSelect={() => {
                                  form.setValue("clientId", client.id);
                                  form.trigger("clientId");
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    field.value === client.id ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {client.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              name="teamMembers"
              render={() => (
                <FormItem>
                  <FormLabel>Tim Audit</FormLabel>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {mockTeamMembers.map((member) => (
                        <div key={member.id} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`member-${member.id}`}
                            checked={selectedTeamMembers.includes(member.id)}
                            onChange={() => toggleTeamMember(member.id)}
                            className="rounded border-gray-300"
                          />
                          <label htmlFor={`member-${member.id}`} className="text-sm">
                            {member.name}
                          </label>
                        </div>
                      ))}
                    </div>
                    {selectedTeamMembers.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {selectedTeamMembers.map((id) => (
                          <Badge key={id} variant="outline" className="bg-blue-50">
                            {mockTeamMembers.find((m) => m.id === id)?.name}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <FormMessage />
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
                      placeholder="Masukkan catatan tambahan (opsional)"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Tambahkan informasi penting lainnya terkait jadwal audit ini.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Batal
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Menyimpan..." : "Simpan Jadwal"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAuditScheduleForm;
