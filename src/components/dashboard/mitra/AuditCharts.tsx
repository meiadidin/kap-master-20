
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid,
} from "recharts";

// Chart data for audit types
const auditTypeData = [
  { name: "Laporan Keuangan", value: 10 },
  { name: "Pajak", value: 7 },
  { name: "Internal", value: 5 },
  { name: "Kepatuhan", value: 3 }
];

// Chart data for monthly audits
const monthlyAuditsData = [
  { name: "Jan", completed: 3, ongoing: 1 },
  { name: "Feb", completed: 2, ongoing: 2 },
  { name: "Mar", completed: 4, ongoing: 3 },
  { name: "Apr", completed: 1, ongoing: 4 },
  { name: "Mei", completed: 0, ongoing: 5 },
  { name: "Jun", completed: 0, ongoing: 3 },
];

// Chart colors
const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#6366f1"];

const AuditCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Distribusi Jenis Audit</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={auditTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {auditTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </RechartsPieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Audit Bulanan 2024</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyAuditsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" name="Selesai" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="ongoing" name="Dalam Proses" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditCharts;
