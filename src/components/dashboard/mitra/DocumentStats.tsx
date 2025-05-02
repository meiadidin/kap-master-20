
import { FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface DocumentStatsProps {
  totalDocuments: number;
  completedDocuments: number;
  inProgressDocuments: number;
  reviewDocuments: number;
}

const DocumentStats: React.FC<DocumentStatsProps> = ({ 
  totalDocuments, 
  completedDocuments, 
  inProgressDocuments, 
  reviewDocuments 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardContent className="p-6 flex items-center">
          <div className="bg-blue-500 p-3 rounded-full mr-4">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-blue-700 font-medium">Total Dokumen</p>
            <h3 className="text-2xl font-bold text-blue-900">{totalDocuments}</h3>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <CardContent className="p-6 flex items-center">
          <div className="bg-green-500 p-3 rounded-full mr-4">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-green-700 font-medium">Dokumen Selesai</p>
            <h3 className="text-2xl font-bold text-green-900">{completedDocuments}</h3>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
        <CardContent className="p-6 flex items-center">
          <div className="bg-amber-500 p-3 rounded-full mr-4">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-amber-700 font-medium">Dalam Proses</p>
            <h3 className="text-2xl font-bold text-amber-900">{inProgressDocuments}</h3>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
        <CardContent className="p-6 flex items-center">
          <div className="bg-purple-500 p-3 rounded-full mr-4">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-purple-700 font-medium">Dokumen Review</p>
            <h3 className="text-2xl font-bold text-purple-900">{reviewDocuments}</h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentStats;
