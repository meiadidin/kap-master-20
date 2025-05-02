
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Users, FileText, Briefcase, Calendar, TrendingUp } from "lucide-react";

// Dummy data for charts
const clientTrendData = [
  { name: 'Jan', aktif: 15 },
  { name: 'Feb', aktif: 18 },
  { name: 'Mar', aktif: 25 },
  { name: 'Apr', aktif: 22 },
  { name: 'Mei', aktif: 28 },
  { name: 'Jun', aktif: 32 },
];

const statusDistributionData = [
  { name: 'Aktif', value: 35, color: '#2563eb' },
  { name: 'Pending', value: 15, color: '#f59e0b' },
  { name: 'Selesai', value: 25, color: '#10b981' },
  { name: 'Dibatalkan', value: 5, color: '#ef4444' },
];

const pendapatanData = [
  { name: 'Jan', pendapatan: 25000000 },
  { name: 'Feb', pendapatan: 32000000 },
  { name: 'Mar', pendapatan: 28000000 },
  { name: 'Apr', pendapatan: 35000000 },
  { name: 'Mei', pendapatan: 42000000 },
  { name: 'Jun', pendapatan: 38000000 },
];

const dokumentPerKlienData = [
  { name: 'PT Maju Bersama', dokumen: 15 },
  { name: 'CV Teknologi', dokumen: 8 },
  { name: 'PT Sejahtera', dokumen: 12 },
  { name: 'PT Bintang', dokumen: 7 },
  { name: 'PT Global', dokumen: 9 },
];

type UserData = {
  name: string;
  email: string;
  role: string;
};

const DashboardOverview = ({ currentUser }: { currentUser: UserData }) => {
  // Set summary data based on user role
  const summaryData = () => {
    if (currentUser.role === "admin" || currentUser.role === "manager") {
      return [
        { title: "Total Klien", value: "35", icon: <Users className="text-blue-500" size={24} />, color: "bg-blue-100" },
        { title: "Dokumen", value: "142", icon: <FileText className="text-emerald-500" size={24} />, color: "bg-emerald-100" },
        { title: "Proyek Aktif", value: "12", icon: <Briefcase className="text-amber-500" size={24} />, color: "bg-amber-100" },
        { title: "Laporan Bulan Ini", value: "8", icon: <Calendar className="text-purple-500" size={24} />, color: "bg-purple-100" },
      ];
    } else if (currentUser.role === "auditor" || currentUser.role === "mitra") {
      return [
        { title: "Klien Ditugaskan", value: "8", icon: <Users className="text-blue-500" size={24} />, color: "bg-blue-100" },
        { title: "Dokumen Diproses", value: "27", icon: <FileText className="text-emerald-500" size={24} />, color: "bg-emerald-100" },
        { title: "Audit Berjalan", value: "4", icon: <Briefcase className="text-amber-500" size={24} />, color: "bg-amber-100" },
        { title: "Deadline Dekat", value: "2", icon: <Calendar className="text-red-500" size={24} />, color: "bg-red-100" },
      ];
    } else {
      // Client view
      return [
        { title: "Total Dokumen", value: "15", icon: <FileText className="text-blue-500" size={24} />, color: "bg-blue-100" },
        { title: "Menunggu Review", value: "3", icon: <TrendingUp className="text-amber-500" size={24} />, color: "bg-amber-100" },
        { title: "Selesai Diproses", value: "12", icon: <Briefcase className="text-emerald-500" size={24} />, color: "bg-emerald-100" },
        { title: "Laporan Siap", value: "8", icon: <Calendar className="text-purple-500" size={24} />, color: "bg-purple-100" },
      ];
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
  };
  
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <Card className="bg-gradient-to-r from-kap-navy to-blue-700 text-white">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold">Selamat Datang, {currentUser.name}!</h2>
          <p className="opacity-90 mt-2">
            {currentUser.role === "client" 
              ? "Selamat datang di portal klien KAP MGI GAR SURABAYA." 
              : "Selamat datang di sistem manajemen KAP MGI GAR SURABAYA."}
          </p>
        </CardContent>
      </Card>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryData().map((item, index) => (
          <Card key={index}>
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">{item.title}</p>
                <p className="text-2xl font-bold">{item.value}</p>
              </div>
              <div className={`p-3 rounded-full ${item.color}`}>
                {item.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Charts section - for admin, manager, auditor, and mitra */}
      {currentUser.role !== "client" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Clients Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Tren Klien Aktif</CardTitle>
              <CardDescription>Jumlah klien aktif dalam 6 bulan terakhir</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={clientTrendData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="aktif" stroke="#2563eb" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Client Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Distribusi Status Klien</CardTitle>
              <CardDescription>Persentase klien berdasarkan status</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}`, 'Jumlah']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Revenue Trend - Only for admin and manager */}
          {(currentUser.role === "admin" || currentUser.role === "manager") && (
            <Card>
              <CardHeader>
                <CardTitle>Tren Pendapatan</CardTitle>
                <CardDescription>Pendapatan dalam 6 bulan terakhir</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={pendapatanData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `${value/1000000}M`} />
                    <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Pendapatan']} />
                    <Legend />
                    <Line type="monotone" dataKey="pendapatan" stroke="#10b981" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}

          {/* Documents per Client */}
          <Card>
            <CardHeader>
              <CardTitle>Dokumen per Klien</CardTitle>
              <CardDescription>Jumlah dokumen yang diproses per klien</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dokumentPerKlienData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="dokumen" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Client-specific Charts */}
      {currentUser.role === "client" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Dokumen Berdasarkan Status</CardTitle>
              <CardDescription>Distribusi dokumen Anda berdasarkan status</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Selesai', value: 12, color: '#10b981' },
                      { name: 'Dalam Proses', value: 3, color: '#f59e0b' },
                      { name: 'Butuh Revisi', value: 2, color: '#ef4444' },
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {[
                      { name: 'Selesai', value: 12, color: '#10b981' },
                      { name: 'Dalam Proses', value: 3, color: '#f59e0b' },
                      { name: 'Butuh Revisi', value: 2, color: '#ef4444' },
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}`, 'Jumlah']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Aktivitas Dokumen</CardTitle>
              <CardDescription>Dokumen yang diproses dalam 6 bulan terakhir</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { name: 'Jan', dokumen: 2 },
                    { name: 'Feb', dokumen: 4 },
                    { name: 'Mar', dokumen: 3 },
                    { name: 'Apr', dokumen: 1 },
                    { name: 'Mei', dokumen: 3 },
                    { name: 'Jun', dokumen: 2 },
                  ]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="dokumen" stroke="#8b5cf6" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DashboardOverview;
