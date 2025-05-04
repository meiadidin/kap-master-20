
import React, { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ChatPanel from "@/components/collaboration/ChatPanel";
import FileManager from "@/components/collaboration/FileManager";
import DocumentViewer from "@/components/collaboration/DocumentViewer";
import UserList from "@/components/collaboration/UserList";
import { Bell, File, MessageSquare, PlusCircle, Users } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Simulasi data pengguna online
const onlineUsers = [
  { id: 1, name: "Ahmad Faisal", role: "Partner", online: true, avatar: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "Budi Santoso", role: "Senior Auditor", online: true, avatar: "https://i.pravatar.cc/150?img=2" },
  { id: 3, name: "Siti Rahma", role: "Auditor", online: false, avatar: "https://i.pravatar.cc/150?img=3" },
  { id: 4, name: "Diana Putri", role: "Tax Consultant", online: true, avatar: "https://i.pravatar.cc/150?img=4" },
];

// Simulasi data grup chat
const chatGroups = [
  { id: 1, name: "Audit PT Maju Bersama", members: 5, unread: 3 },
  { id: 2, name: "Pajak Tahunan Klien", members: 8, unread: 0 },
  { id: 3, name: "Konsultasi Internal", members: 12, unread: 7 },
];

// Simulasi data dokumen terbaru
const recentDocuments = [
  { id: 1, name: "Laporan Audit Q2.pdf", type: "pdf", size: "2.4 MB", updated: "2 jam yang lalu", user: "Ahmad Faisal" },
  { id: 2, name: "Rekonsiliasi Pajak.xlsx", type: "excel", size: "1.8 MB", updated: "Kemarin", user: "Diana Putri" },
  { id: 3, name: "SOP Audit Internal.docx", type: "word", size: "856 KB", updated: "3 hari yang lalu", user: "Budi Santoso" },
];

const Collaboration = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<number | null>(null);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [notifications, setNotifications] = useState<{id: number, message: string}[]>([]);

  // Simulasi notifikasi masuk
  useEffect(() => {
    const timer = setTimeout(() => {
      const newNotification = {
        id: Date.now(),
        message: "Anda menerima pesan baru dari Ahmad Faisal"
      };
      
      setNotifications(prev => [...prev, newNotification]);
      
      toast({
        title: "Pesan Baru",
        description: newNotification.message,
      });
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [toast]);

  const handleUserSelect = (userId: number) => {
    setSelectedUser(userId);
    setSelectedGroup(null);
    setSelectedDocument(null);
    setActiveTab("chat");
  };

  const handleGroupSelect = (groupId: number) => {
    setSelectedGroup(groupId);
    setSelectedUser(null);
    setSelectedDocument(null);
    setActiveTab("chat");
  };

  const handleDocumentSelect = (docId: number) => {
    setSelectedDocument(docId);
    setSelectedUser(null);
    setSelectedGroup(null);
    setActiveTab("documents");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero 
        title="Portal Kolaborasi" 
        subtitle="Kolaborasi tim dan klien dalam satu platform terintegrasi"
        image="/img/hero-bg-4.jpg"
        showButton={false}
        height="h-[300px]"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Daftar User dan Grup */}
          <div className="lg:col-span-1 space-y-6">
            {/* Panel User Online */}
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-kap-navy">Tim Online</h3>
                <Badge className="bg-green-500">{onlineUsers.filter(u => u.online).length} online</Badge>
              </div>
              <UserList 
                users={onlineUsers} 
                onUserSelect={handleUserSelect}
                selectedUserId={selectedUser}
              />
            </div>

            {/* Panel Grup Chat */}
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-kap-navy">Grup Chat</h3>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setShowCreateGroup(true)}
                >
                  <PlusCircle size={18} />
                </Button>
              </div>
              <ul className="space-y-2">
                {chatGroups.map((group) => (
                  <li key={group.id}>
                    <Button 
                      variant={selectedGroup === group.id ? "default" : "ghost"} 
                      className="w-full justify-between"
                      onClick={() => handleGroupSelect(group.id)}
                    >
                      <div className="flex items-center">
                        <Users className="mr-2" size={18} />
                        <span>{group.name}</span>
                      </div>
                      <div className="flex items-center">
                        {group.unread > 0 && (
                          <Badge className="bg-red-500 mr-2">{group.unread}</Badge>
                        )}
                        <span className="text-xs text-gray-500">{group.members}</span>
                      </div>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dokumen Terbaru */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-kap-navy mb-4">Dokumen Terbaru</h3>
              <ul className="space-y-2">
                {recentDocuments.map((doc) => (
                  <li key={doc.id}>
                    <Button 
                      variant={selectedDocument === doc.id ? "default" : "ghost"} 
                      className="w-full justify-between"
                      onClick={() => handleDocumentSelect(doc.id)}
                    >
                      <div className="flex items-center">
                        <File className="mr-2" size={18} />
                        <span className="truncate max-w-[150px]">{doc.name}</span>
                      </div>
                      <span className="text-xs text-gray-500">{doc.updated}</span>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="overview">Ikhtisar</TabsTrigger>
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="documents">Dokumen</TabsTrigger>
              </TabsList>
              
              {/* Overview Tab */}
              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold text-kap-navy mb-4">Aktivitas Terbaru</h3>
                    <ul className="space-y-4">
                      <li className="pb-3 border-b">
                        <p className="text-sm"><strong>Ahmad Faisal</strong> mengunggah dokumen baru</p>
                        <p className="text-xs text-gray-500">2 jam yang lalu</p>
                      </li>
                      <li className="pb-3 border-b">
                        <p className="text-sm"><strong>Diana Putri</strong> mengomentari Laporan Audit Q2</p>
                        <p className="text-xs text-gray-500">5 jam yang lalu</p>
                      </li>
                      <li>
                        <p className="text-sm"><strong>Budi Santoso</strong> membuat grup chat baru</p>
                        <p className="text-xs text-gray-500">Kemarin</p>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold text-kap-navy mb-4">Pengumuman</h3>
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-md">
                        <h4 className="font-medium">Update Sistem</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Portal kolaborasi akan diperbarui dengan fitur baru pada tanggal 15 Juni 2023.
                        </p>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-md">
                        <h4 className="font-medium">Pemeliharaan Terjadwal</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Sistem akan mengalami pemeliharaan pada 10 Juni 2023, pukul 22:00 - 23:00 WIB.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Chat Tab */}
              <TabsContent value="chat">
                <div className="bg-white rounded-lg shadow">
                  <ChatPanel 
                    selectedUser={selectedUser ? onlineUsers.find(u => u.id === selectedUser) : null} 
                    selectedGroup={selectedGroup ? chatGroups.find(g => g.id === selectedGroup) : null}
                    users={onlineUsers}
                  />
                </div>
              </TabsContent>
              
              {/* Documents Tab */}
              <TabsContent value="documents">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow">
                    <FileManager 
                      selectedDocument={selectedDocument} 
                      documents={recentDocuments}
                      onDocumentSelect={handleDocumentSelect}
                    />
                  </div>
                  <div className="lg:col-span-2 bg-white rounded-lg shadow">
                    <DocumentViewer 
                      document={selectedDocument ? recentDocuments.find(d => d.id === selectedDocument) : null}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collaboration;
