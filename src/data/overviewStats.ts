
export type OverviewStat = {
  id: string;
  title: string;
  value: number;
  icon: string;
  color: string;
  href: string;
};

export const overviewStats: OverviewStat[] = [
  {
    id: "total-clients",
    title: "Total Klien",
    value: 35,
    icon: "users",
    color: "bg-blue-50",
    href: "/dashboard/clients",
  },
  {
    id: "documents",
    title: "Dokumen",
    value: 142,
    icon: "file-text",
    color: "bg-green-50",
    href: "/dashboard/documents",
  },
  {
    id: "active-projects",
    title: "Proyek Aktif",
    value: 12,
    icon: "briefcase",
    color: "bg-amber-50",
    href: "/dashboard/projects",
  },
  {
    id: "monthly-reports",
    title: "Laporan Bulan Ini",
    value: 8,
    icon: "calendar",
    color: "bg-purple-50",
    href: "/dashboard/reports",
  },
];
