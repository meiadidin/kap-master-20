import React, { useState, useEffect, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatPanel from "@/components/collaboration/ChatPanel";
import FileManager from "@/components/collaboration/FileManager";
import DocumentViewer from "@/components/collaboration/DocumentViewer";
import UserList from "@/components/collaboration/UserList";
import { Bell, File, MessageSquare, PlusCircle, Users, Download, Plus, Folder } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Label } from '@/components/ui/label';

// Simulasi data pengguna online
const onlineUsers = [{
  id: 1,
  name: "Ahmad Faisal",
  role: "Partner",
  online: true,
  avatar: "https://i.pravatar.cc/150?img=1"
}, {
  id: 2,
  name: "Budi Santoso",
  role: "Senior Auditor",
  online: true,
  avatar: "https://i.pravatar.cc/150?img=2"
}, {
  id: 3,
  name: "Siti Rahma",
  role: "Auditor",
  online: false,
  avatar: "https://i.pravatar.cc/150?img=3"
}, {
  id: 4,
  name: "Diana Putri",
  role: "Tax Consultant",
  online: true,
  avatar: "https://i.pravatar.cc/150?img=4"
}, {
  id: 5,
  name: "Joko Widodo",
  role: "Manager",
  online: false,
  avatar: "https://i.pravatar.cc/150?img=5"
}, {
  id: 6,
  name: "Maya Indah",
  role: "Accounting",
  online: true,
  avatar: "https://i.pravatar.cc/150?img=6"
}];

// Simulasi data grup chat
const chatGroups = [{
  id: 1,
  name: "Audit PT Maju Bersama",
  members: 5,
  unread: 3
}, {
  id: 2,
  name: "Pajak Tahunan Klien",
  members: 8,
  unread: 0
}, {
  id: 3,
  name: "Konsultasi Internal",
  members: 12,
  unread: 7
}];

// Simulasi data dokumen terbaru
const recentDocuments = [{
  id: 1,
  name: "Laporan Audit Q2.pdf",
  type: "pdf",
  size: "2.4 MB",
  updated: "2 jam yang lalu",
  user: "Ahmad Faisal"
}, {
  id: 2,
  name: "Rekonsiliasi Pajak.xlsx",
  type: "excel",
  size: "1.8 MB",
  updated: "Kemarin",
  user: "Diana Putri"
}, {
  id: 3,
  name: "SOP Audit Internal.docx",
  type: "word",
  size: "856 KB",
  updated: "3 hari yang lalu",
  user: "Budi Santoso"
}, {
  id: 4,
  name: "Data Klien.zip",
  type: "zip",
  size: "5.2 MB",
  updated: "5 jam yang lalu",
  user: "Maya Indah"
}];
const Collaboration = () => {
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<number | null>(null);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [notifications, setNotifications] = useState<{
    id: number;
    message: string;
  }[]>([]);
  const [isAddingGroup, setIsAddingGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupTopic, setNewGroupTopic] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<{
    id: number;
    name: string;
    checked: boolean;
  }[]>([]);

  // Simulate notifications
  useEffect(() => {
    const timer = setTimeout(() => {
      const newNotification = {
        id: Date.now(),
        message: "Anda menerima pesan baru dari Ahmad Faisal"
      };
      setNotifications(prev => [...prev, newNotification]);
      toast({
        title: "Pesan Baru",
        description: newNotification.message
      });
    }, 10000);
    return () => clearTimeout(timer);
  }, [toast]);

  // Setup selected members state for group creation
  useEffect(() => {
    setSelectedMembers(onlineUsers.map(user => ({
      id: user.id,
      name: user.name,
      checked: false
    })));
  }, []);
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
  const handleDownload = (docId: number) => {
    const doc = recentDocuments.find(d => d.id === docId);
    if (doc) {
      toast({
        title: "File Diunduh",
        description: `${doc.name} sedang diunduh...`
      });

      // Simulate download delay
      setTimeout(() => {
        toast({
          title: "Unduhan Selesai",
          description: `${doc.name} berhasil diunduh.`
        });
      }, 1500);
    }
  };
  const toggleMemberSelection = (id: number) => {
    setSelectedMembers(selectedMembers.map(member => member.id === id ? {
      ...member,
      checked: !member.checked
    } : member));
  };
  const handleCreateGroup = () => {
    if (!newGroupName.trim()) {
      toast({
        title: "Nama Grup Diperlukan",
        description: "Silakan masukkan nama untuk grup baru.",
        variant: "destructive"
      });
      return;
    }
    const checkedMembers = selectedMembers.filter(member => member.checked);
    if (checkedMembers.length === 0) {
      toast({
        title: "Anggota Grup Diperlukan",
        description: "Pilih minimal satu anggota untuk grup baru.",
        variant: "destructive"
      });
      return;
    }

    // Add the new group (in a real app, this would be an API call)
    const newGroup = {
      id: chatGroups.length + 1,
      name: newGroupName,
      members: checkedMembers.length,
      unread: 0,
      topic: newGroupTopic
    };

    // Reset form and close dialog
    setNewGroupName("");
    setNewGroupTopic("");
    setSelectedMembers(selectedMembers.map(member => ({
      ...member,
      checked: false
    })));
    setIsAddingGroup(false);
    toast({
      title: "Grup Baru Dibuat",
      description: `Grup "${newGroupName}" berhasil dibuat dengan ${checkedMembers.length} anggota.`
    });
  };
  return <div className="min-h-screen max-h-screen flex flex-col bg-gray-50">
      {/* Header Section */}
      <div className="text-white py-8 bg-slate-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2 text-slate-950 my-[4px] mx-0">Media Kolaborasi Member</h1>
          <p className="text-slate-950">Kolaborasi tim dan klien dalam satu platform terintegrasi</p>
        </div>
      </div>

      {/* Main Content Area with fixed height */}
      <div className="flex-1 overflow-hidden container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-full">
          {/* Sidebar - fixed height with internal scroll */}
          <div className="lg:col-span-1 space-y-6 h-[calc(100vh-220px)] flex flex-col overflow-hidden">
            {/* Panel User Online */}
            <div className="bg-white p-4 rounded-lg shadow flex-1 overflow-hidden flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-kap-navy">Tim Online</h3>
                <Badge className="bg-green-500">{onlineUsers.filter(u => u.online).length} online</Badge>
              </div>
              <div className="flex-1 overflow-y-auto">
                <UserList users={onlineUsers} onUserSelect={handleUserSelect} selectedUserId={selectedUser} />
              </div>
            </div>

            {/* Panel Grup Chat */}
            <div className="bg-white p-4 rounded-lg shadow flex-1 overflow-hidden flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-kap-navy">Grup Chat</h3>
                <Button variant="ghost" size="icon" onClick={() => setIsAddingGroup(true)}>
                  <PlusCircle size={18} />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <ul className="space-y-2">
                  {chatGroups.map(group => <li key={group.id}>
                      <Button variant={selectedGroup === group.id ? "default" : "ghost"} className="w-full justify-between" onClick={() => handleGroupSelect(group.id)}>
                        <div className="flex items-center">
                          <Users className="mr-2" size={18} />
                          <span>{group.name}</span>
                        </div>
                        <div className="flex items-center">
                          {group.unread > 0 && <Badge className="bg-red-500 mr-2">{group.unread}</Badge>}
                          <span className="text-xs text-gray-500">{group.members}</span>
                        </div>
                      </Button>
                    </li>)}
                </ul>
              </div>
            </div>

            {/* Dokumen Terbaru */}
            <div className="bg-white p-4 rounded-lg shadow flex-1 overflow-hidden flex flex-col">
              <h3 className="text-lg font-semibold text-kap-navy mb-4">Dokumen Terbaru</h3>
              <div className="flex-1 overflow-y-auto">
                <ul className="space-y-2">
                  {recentDocuments.map(doc => <li key={doc.id} className="flex">
                      <Button variant={selectedDocument === doc.id ? "default" : "ghost"} className="flex-grow justify-between" onClick={() => handleDocumentSelect(doc.id)}>
                        <div className="flex items-center">
                          <File className="mr-2" size={18} />
                          <span className="truncate max-w-[120px]">{doc.name}</span>
                        </div>
                        <span className="text-xs text-gray-500">{doc.updated}</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDownload(doc.id)} title="Download File">
                        <Download size={16} />
                      </Button>
                    </li>)}
                </ul>
              </div>
            </div>
          </div>

          {/* Main Content - fixed height with internal scroll */}
          <div className="lg:col-span-3 h-[calc(100vh-220px)] overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full flex flex-col">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="overview">Ikhtisar</TabsTrigger>
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="documents">Dokumen</TabsTrigger>
              </TabsList>
              
              {/* All TabsContent need to be flex-1 and overflow-auto */}
              
              {/* Overview Tab */}
              <TabsContent value="overview" className="flex-1 overflow-auto">
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
                      <li className="pb-3 border-b">
                        <p className="text-sm"><strong>Maya Indah</strong> mengunggah Data Klien.zip</p>
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
              <TabsContent value="chat" className="flex-1 overflow-auto">
                <div className="bg-white rounded-lg shadow h-full">
                  <ChatPanel selectedUser={selectedUser ? onlineUsers.find(u => u.id === selectedUser) : null} selectedGroup={selectedGroup ? chatGroups.find(g => g.id === selectedGroup) : null} users={onlineUsers} />
                </div>
              </TabsContent>
              
              {/* Documents Tab */}
              <TabsContent value="documents" className="flex-1 overflow-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
                  <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow overflow-auto">
                    <FileManager selectedDocument={selectedDocument} documents={recentDocuments} onDocumentSelect={handleDocumentSelect} />
                  </div>
                  <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-auto">
                    <DocumentViewer document={selectedDocument ? recentDocuments.find(d => d.id === selectedDocument) : null} />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Dialog for creating new group */}
      <Dialog open={isAddingGroup} onOpenChange={setIsAddingGroup}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Buat Group Baru</DialogTitle>
            <DialogDescription>
              Buat grup chat baru dengan memilih nama, topik, dan anggota tim
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="groupName">Nama Group</Label>
              <Input id="groupName" placeholder="Masukkan nama group" value={newGroupName} onChange={e => setNewGroupName(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="groupTopic">Topik (opsional)</Label>
              <Input id="groupTopic" placeholder="Masukkan topik diskusi" value={newGroupTopic} onChange={e => setNewGroupTopic(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Pilih Anggota</Label>
              <ScrollArea className="h-[200px] border rounded-md p-2">
                <div className="space-y-2">
                  {selectedMembers.map(member => <div key={member.id} className="flex items-center space-x-2">
                      <Checkbox id={`member-${member.id}`} checked={member.checked} onCheckedChange={() => toggleMemberSelection(member.id)} />
                      <Label htmlFor={`member-${member.id}`} className="text-sm cursor-pointer">
                        {member.name}
                      </Label>
                    </div>)}
                </div>
              </ScrollArea>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingGroup(false)}>
              Batal
            </Button>
            <Button onClick={handleCreateGroup}>
              <Plus size={16} className="mr-2" />
              Buat Grup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>;
};
export default Collaboration;