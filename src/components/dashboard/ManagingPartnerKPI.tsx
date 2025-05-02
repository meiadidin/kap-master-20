
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from "recharts";
import { AlertTriangle, CheckCircle2, Clock } from "lucide-react";

const kpiData = [
  { name: "Target Klien", target: 20, achieved: 15, progress: 75, color: "#2563eb" },
  { name: "Penyelesaian Audit", target: 35, achieved: 28, progress: 80, color: "#10b981" },
  { name: "Peningkatan Pendapatan", target: 15, achieved: 12, progress: 80, color: "#f59e0b" },
  { name: "Kepuasan Klien", target: 95, achieved: 92, progress: 97, color: "#8b5cf6" },
];

const monthlyPerformance = [
  { name: "Jan", target: 10, achieved: 8 },
  { name: "Feb", target: 12, achieved: 10 },
  { name: "Mar", target: 15, achieved: 12 },
  { name: "Apr", target: 15, achieved: 13 },
  { name: "Mei", target: 18, achieved: 15 },
  { name: "Jun", target: 20, achieved: 18 },
];

const statusData = [
  { name: "Selesai", value: 28, color: "#10b981" },
  { name: "Dalam Proses", value: 15, color: "#f59e0b" },
  { name: "Belum Dimulai", value: 7, color: "#ef4444" },
];

const ManagingPartnerKPI = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Indikator Kinerja Utama</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((item, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{item.name}</CardTitle>
              <CardDescription>
                {item.achieved} dari {item.target}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{item.progress}%</span>
                  <span className="text-sm text-gray-500">{item.target}</span>
                </div>
                <Progress value={item.progress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pencapaian Target Bulanan</CardTitle>
            <CardDescription>Perbandingan target dan pencapaian aktual</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyPerformance}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="target" fill="#94a3b8" name="Target" />
                <Bar dataKey="achieved" fill="#2563eb" name="Pencapaian" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Status Proyek</CardTitle>
            <CardDescription>Distribusi status proyek aktif</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Status Tugas Prioritas</CardTitle>
          <CardDescription>Tugas-tugas prioritas yang perlu diselesaikan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4 flex items-start gap-4">
              <div className="bg-amber-100 p-2 rounded-full">
                <Clock className="text-amber-600" size={20} />
              </div>
              <div>
                <h3 className="font-medium">Audit Laporan Keuangan PT Maju Sejahtera</h3>
                <p className="text-sm text-gray-500">Tenggat: 15 Juni 2024</p>
                <div className="mt-2">
                  <Progress value={65} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">Progres: 65%</p>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4 flex items-start gap-4">
              <div className="bg-red-100 p-2 rounded-full">
                <AlertTriangle className="text-red-600" size={20} />
              </div>
              <div>
                <h3 className="font-medium">Review Pajak PT Global Nusantara</h3>
                <p className="text-sm text-gray-500">Tenggat: 5 Juni 2024</p>
                <div className="mt-2">
                  <Progress value={25} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">Progres: 25%</p>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4 flex items-start gap-4">
              <div className="bg-green-100 p-2 rounded-full">
                <CheckCircle2 className="text-green-600" size={20} />
              </div>
              <div>
                <h3 className="font-medium">Konsultasi Perencanaan Pajak CV Teknologi</h3>
                <p className="text-sm text-gray-500">Tenggat: 20 Mei 2024</p>
                <div className="mt-2">
                  <Progress value={100} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">Progres: 100% (Selesai)</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManagingPartnerKPI;
