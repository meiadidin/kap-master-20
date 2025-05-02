
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MitraOverview from "./mitra/MitraOverview";
import DocumentManager from "./mitra/DocumentManager";

type UserData = {
  name: string;
  email: string;
  role: string;
};

const MitraDocumentManager = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documents">Dokumen</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <MitraOverview />
        </TabsContent>
        
        <TabsContent value="documents">
          <DocumentManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MitraDocumentManager;
