
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { ArrowDownRight, ArrowUpRight, DollarSign, TrendingUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Button } from "@/components/ui/button";

// Data pendapatan
const revenueData = [
  { name: "Jan", pendapatan: 1250000000, biaya: 750000000, profit: 500000000 },
  { name: "Feb", pendapatan: 1320000000, biaya: 780000000, profit: 540000000 },
  { name: "Mar", pendapatan: 1400000000, biaya: 820000000, profit: 580000000 },
  { name: "Apr", pendapatan: 1280000000, biaya: 760000000, profit: 520000000 },
  { name: "Mei", pendapatan: 1500000000, biaya: 850000000, profit: 650000000 },
  { name: "Jun", pendapatan: 1650000000, biaya: 950000000, profit: 700000000 },
];

// Data distribusi pendapatan per layanan
const serviceRevenueData = [
  { name: "Audit", value: 650000000, color: "#2563eb" },
  { name: "Pajak", value: 450000000, color: "#10b981" },
  { name: "Konsultasi", value: 350000000, color: "#f59e0b" },
  { name: "Akuntansi", value: 200000000, color: "#8b5cf6" },
];

// Data pertumbuhan klien
const clientGrowthData = [
  { name: "Q1 2023", klien: 25 },
  { name: "Q2 2023", klien: 28 },
  { name: "Q3 2023", klien: 32 },
  { name: "Q4 2023", klien: 35 },
  { name: "Q1 2024", klien: 38 },
  { name: "Q2 2024", klien: 42 },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);
};

const FinancialMetrics = () => {
  const [period, setPeriod] = useState("semester");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Metrik Finansial</h1>
        <div className="flex items-center">
          <span className="mr-2">Periode:</span>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pilih periode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="quarter">Kuartal Terakhir</SelectItem>
              <SelectItem value="semester">Semester Terakhir</SelectItem>
              <SelectItem value="year">Tahun Terakhir</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Ringkasan Finansial */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500">Pendapatan Total</p>
              <p className="text-2xl font-bold">Rp 8,4M</p>
              <div className="flex items-center mt-1 text-green-600">
                <ArrowUpRight size={16} />
                <span className="text-xs">12% dari periode lalu</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-blue-100 text-blue-800">
              <DollarSign size={24} />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500">Profit Bersih</p>
              <p className="text-2xl font-bold">Rp 3,5M</p>
              <div className="flex items-center mt-1 text-green-600">
                <ArrowUpRight size={16} />
                <span className="text-xs">8% dari periode lalu</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-green-100 text-green-800">
              <TrendingUp size={24} />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500">Margin Profit</p>
              <p className="text-2xl font-bold">41,6%</p>
              <div className="flex items-center mt-1 text-red-600">
                <ArrowDownRight size={16} />
                <span className="text-xs">2% dari periode lalu</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-amber-100 text-amber-800">
              <DollarSign size={24} />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500">Rata-rata per Klien</p>
              <p className="text-2xl font-bold">Rp 200JT</p>
              <div className="flex items-center mt-1 text-green-600">
                <ArrowUpRight size={16} />
                <span className="text-xs">5% dari periode lalu</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-purple-100 text-purple-800">
              <DollarSign size={24} />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Grafik Pendapatan & Profit */}
      <Card>
        <CardHeader>
          <CardTitle>Trend Pendapatan & Profit</CardTitle>
          <CardDescription>Perbandingan pendapatan, biaya, dan profit</CardDescription>
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
              <Tooltip formatter={(value) => [formatCurrency(Number(value)), '']} />
              <Legend />
              <Line type="monotone" dataKey="pendapatan" stroke="#2563eb" name="Pendapatan" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="biaya" stroke="#ef4444" name="Biaya" />
              <Line type="monotone" dataKey="profit" stroke="#10b981" name="Profit" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribusi Pendapatan per Layanan */}
        <Card>
          <CardHeader>
            <CardTitle>Distribusi Pendapatan per Layanan</CardTitle>
            <CardDescription>Persentase pendapatan berdasarkan jenis layanan</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={serviceRevenueData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {serviceRevenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Pendapatan']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Pertumbuhan Klien */}
        <Card>
          <CardHeader>
            <CardTitle>Pertumbuhan Jumlah Klien</CardTitle>
            <CardDescription>Trend pertumbuhan klien dalam 6 kuartal terakhir</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={clientGrowthData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="klien" name="Jumlah Klien" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button variant="outline">Ekspor Data</Button>
        <Button>Unduh Laporan Lengkap</Button>
      </div>
    </div>
  );
};

export default FinancialMetrics;
