
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileText, ClipboardCheck, Clock, FileArchive, Users, Briefcase, Calendar } from "lucide-react";
import OverviewCard from "../OverviewCard";
import { overviewStats } from "@/data/overviewStats";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Sample data for mitra documents status counting
const mitraDocuments = [
  {
    id: 1,
    name: "Laporan Keuangan PT Maju Bersama",
    type: "financial",
    client: "PT Maju Bersama",
    lastModified: "2024-04-15T08:30:00",
    status: "completed"
  },
  {
    id: 2,
    name: "Audit Internal CV Teknologi",
    type: "audit",
    client: "CV Teknologi Nusantara",
    lastModified: "2024-04-10T14:20:00",
    status: "in_progress"
  },
  {
    id: 3,
    name: "Laporan Pajak PT Sejahtera",
    type: "tax",
    client: "PT Sejahtera Abadi",
    lastModified: "2024-04-05T11:45:00",
    status: "review"
  },
  {
    id: 4,
    name: "Registrasi Klien Baru",
    type: "registration",
    client: "PT Bintang Timur",
    lastModified: "2024-03-30T09:15:00",
    status: "completed"
  },
  {
    id: 5,
    name: "Proyeksi Keuangan 2024",
    type: "financial",
    client: "PT Global Indonesia",
    lastModified: "2024-03-22T13:50:00",
    status: "in_progress"
  }
];

// Sample data for activity chart
const activityData = [
  { name: "Jan", dokumen: 2 },
  { name: "Feb", dokumen: 4 },
  { name: "Mar", dokumen: 3 },
  { name: "Apr", dokumen: 1 },
  { name: "Mei", dokumen: 3 },
  { name: "Jun", dokumen: 2 },
];

// Colors for pie chart
const COLORS = ['#10B981', '#F59E0B', '#EF4444'];

const MitraOverview = () => {
  // Calculate statistics
  const totalDocuments = mitraDocuments.length;
  const completedDocuments = mitraDocuments.filter(doc => doc.status === "completed").length;
  const inProgressDocuments = mitraDocuments.filter(doc => doc.status === "in_progress").length;
  const reviewDocuments = mitraDocuments.filter(doc => doc.status === "review").length;
  
  // Data for pie chart
  const pieData = [
    { name: "Selesai", value: completedDocuments, percentage: Math.round((completedDocuments / totalDocuments) * 100) },
    { name: "Dalam Proses", value: inProgressDocuments, percentage: Math.round((inProgressDocuments / totalDocuments) * 100) },
    { name: "Butuh Revisi", value: reviewDocuments, percentage: Math.round((reviewDocuments / totalDocuments) * 100) },
  ];
  
  // Loading state for skeleton
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Map icon names to components
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "users":
        return <Users className="text-blue-600" />;
      case "file-text":
        return <FileText className="text-green-600" />;
      case "briefcase":
        return <Briefcase className="text-amber-600" />;
      case "calendar":
        return <Calendar className="text-purple-600" />;
      default:
        return <FileText className="text-blue-600" />;
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-kap-navy text-white rounded-lg p-6">
        <h1 className="text-2xl font-bold">Selamat Datang, PT Maju Bersama!</h1>
        <p className="text-gray-200 mt-1">Selamat datang di portal klien KAP MGI GAR SURABAYA.</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((stat) => (
          <OverviewCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            icon={getIconComponent(stat.icon)}
            href={stat.href}
            color={stat.color}
            isLoading={isLoading}
          />
        ))}
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Dokumen Berdasarkan Status</CardTitle>
            <p className="text-sm text-gray-500">Distribusi dokumen Anda berdasarkan status</p>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex flex-col items-center justify-center">
              {isLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="space-y-4 w-full">
                    <div className="flex justify-center">
                      <div className="w-40 h-40 rounded-full border-4 border-gray-200 border-t-blue-500 animate-spin"></div>
                    </div>
                    <div className="space-y-2 w-full">
                      <div className="flex justify-between">
                        <div className="w-1/4 h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-1/4 h-4 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip formatter={(value) => [value, 'Jumlah Dokumen']} />
                  </PieChart>
                </ResponsiveContainer>
              )}
              <div className="flex justify-center mt-4 space-x-6">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                  <span className="text-xs">Selesai: {pieData[0].percentage}%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-amber-500 rounded-full mr-1"></div>
                  <span className="text-xs">Dalam Proses: {pieData[1].percentage}%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
                  <span className="text-xs">Butuh Revisi: {pieData[2].percentage}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Aktivitas Dokumen</CardTitle>
            <p className="text-sm text-gray-500">Dokumen yang diproses dalam 6 bulan terakhir</p>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              {isLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="space-y-4 w-full">
                    <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-full h-60 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="dokumen" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }} 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Progress Section */}
      <Card>
        <CardHeader>
          <CardTitle>Status Dokumen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Selesai</span>
                  <span className="text-sm font-medium">{completedDocuments}/{totalDocuments}</span>
                </div>
                <Progress value={(completedDocuments / totalDocuments) * 100} className="h-2 bg-gray-100">
                  <div className="h-full bg-green-500 rounded-full" />
                </Progress>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Dalam Proses</span>
                  <span className="text-sm font-medium">{inProgressDocuments}/{totalDocuments}</span>
                </div>
                <Progress value={(inProgressDocuments / totalDocuments) * 100} className="h-2 bg-gray-100">
                  <div className="h-full bg-amber-500 rounded-full" />
                </Progress>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Butuh Revisi</span>
                  <span className="text-sm font-medium">{reviewDocuments}/{totalDocuments}</span>
                </div>
                <Progress value={(reviewDocuments / totalDocuments) * 100} className="h-2 bg-gray-100">
                  <div className="h-full bg-red-500 rounded-full" />
                </Progress>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MitraOverview;
