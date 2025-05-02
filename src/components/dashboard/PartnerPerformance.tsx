
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Mail } from "lucide-react";

// Data performa partner
const partners = [
  {
    id: 1,
    name: "Hendri Yanto",
    role: "Partner - Audit",
    performance: 92,
    clients: 15,
    revenue: 850000000,
    trend: "up",
    avatar: "HY"
  },
  {
    id: 2,
    name: "Joko Santoso",
    role: "Partner - Pajak",
    performance: 88,
    clients: 12,
    revenue: 720000000,
    trend: "up",
    avatar: "JS"
  },
  {
    id: 3,
    name: "Rina Wijaya",
    role: "Partner - Konsultasi",
    performance: 85,
    clients: 9,
    revenue: 580000000,
    trend: "down",
    avatar: "RW"
  },
  {
    id: 4,
    name: "Budi Hartono",
    role: "Partner - Audit",
    performance: 90,
    clients: 14,
    revenue: 820000000,
    trend: "up",
    avatar: "BH"
  },
];

// Data trend pendapatan per partner
const revenueData = [
  { name: "Jan", partner1: 65000000, partner2: 52000000, partner3: 48000000, partner4: 63000000 },
  { name: "Feb", partner1: 72000000, partner2: 58000000, partner3: 45000000, partner4: 68000000 },
  { name: "Mar", partner1: 68000000, partner2: 60000000, partner3: 50000000, partner4: 65000000 },
  { name: "Apr", partner1: 75000000, partner2: 62000000, partner3: 42000000, partner4: 70000000 },
  { name: "Mei", partner1: 70000000, partner2: 59000000, partner3: 48000000, partner4: 71000000 },
  { name: "Jun", partner1: 80000000, partner2: 65000000, partner3: 52000000, partner4: 75000000 },
];

// Data klien per partner
const clientData = [
  { name: "Partner 1", value: 15 },
  { name: "Partner 2", value: 12 },
  { name: "Partner 3", value: 9 },
  { name: "Partner 4", value: 14 },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
};

const PartnerPerformance = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Kinerja Partner</h1>
      
      {/* Kartu Kinerja Partner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {partners.map((partner) => (
          <Card key={partner.id} className="overflow-hidden">
            <CardHeader className="pb-2 flex flex-row items-start justify-between">
              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarFallback className="bg-kap-navy text-white">
                    {partner.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{partner.name}</CardTitle>
                  <CardDescription>{partner.role}</CardDescription>
                </div>
              </div>
              {partner.trend === "up" ? (
                <Badge className="bg-green-100 text-green-800 flex items-center">
                  <TrendingUp size={14} className="mr-1" />
                  Meningkat
                </Badge>
              ) : (
                <Badge className="bg-red-100 text-red-800 flex items-center">
                  <TrendingDown size={14} className="mr-1" />
                  Menurun
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
                <div>
                  <p className="text-sm text-gray-500">Performa</p>
                  <div className="flex items-center">
                    <span className="text-xl font-bold mr-2">{partner.performance}%</span>
                    <Progress value={partner.performance} className="h-2 flex-1" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Klien</p>
                  <p className="text-xl font-bold">{partner.clients}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pendapatan</p>
                  <p className="text-xl font-bold">{formatCurrency(partner.revenue).replace('Rp', 'Rp ')}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-gray-50 flex justify-between">
              <Button variant="outline" size="sm">Lihat Detail</Button>
              <Button variant="ghost" size="sm" className="flex items-center">
                <Mail size={16} className="mr-2" />
                Kirim Pesan
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* Grafik Pendapatan Partner */}
      <Card>
        <CardHeader>
          <CardTitle>Trend Pendapatan Partner</CardTitle>
          <CardDescription>Perbandingan pendapatan 6 bulan terakhir</CardDescription>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={revenueData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `${value/1000000}M`} />
              <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Pendapatan']} />
              <Legend />
              <Line type="monotone" dataKey="partner1" stroke="#2563eb" name="Hendri Yanto" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="partner2" stroke="#10b981" name="Joko Santoso" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="partner3" stroke="#f59e0b" name="Rina Wijaya" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="partner4" stroke="#8b5cf6" name="Budi Hartono" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      {/* Distribusi Klien per Partner */}
      <Card>
        <CardHeader>
          <CardTitle>Distribusi Klien per Partner</CardTitle>
          <CardDescription>Jumlah klien yang ditangani setiap partner</CardDescription>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={clientData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Jumlah Klien" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default PartnerPerformance;
