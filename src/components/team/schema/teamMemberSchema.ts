
import * as z from "zod";

// Define available competencies
export const competencies = [
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

// Define available positions
export const positions = [
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

// Define form schema using zod for validation
export const formSchema = z.object({
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

export type FormValues = z.infer<typeof formSchema>;
