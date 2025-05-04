
import { useState, useEffect } from "react";
import { 
  Bell, 
  Search, 
  Plus, 
  Upload, 
  Users, 
  User, 
  FileText, 
  MessageCircle,
  Send,
  PlusCircle,
  File,
  Image,
  FileUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

// Data dummy untuk simulasi
const DUMMY_USERS = [
  { id: 1, name: "Agus Pranoto", role: "Partner", status: "online", lastSeen: new Date(), avatar: "AP" },
  { id: 2, name: "Budi Santoso", role: "Auditor", status: "online", lastSeen: new Date(), avatar: "BS" },
  { id: 3, name: "Citra Dewi", role: "Manager", status: "offline", lastSeen: new Date(Date.now() - 3600000), avatar: "CD" },
  { id: 4, name: "Dani Pratama", role: "Auditor", status: "online", lastSeen: new Date(), avatar: "DP" },
  { id: 5, name: "Eko Saputra", role: "Admin", status: "offline", lastSeen: new Date(Date.now() - 7200000), avatar: "ES" },
];

const DUMMY_GROUPS = [
  { id: 1, name: "Audit Tim A", members: [1, 2, 4], unread: 3, lastMessage: "Laporan bulanan sudah selesai" },
  { id: 2, name: "Project Finansial 2025", members: [1, 3, 5], unread: 0, lastMessage: "Meeting besok jam 10 pagi" },
  { id: 3, name: "Diskusi Perpajakan", members: [2, 3, 4, 5], unread: 5, lastMessage: "Ada perubahan regulasi baru" },
  { id: 4, name: "Pengembangan Sistem", members: [1, 5], unread: 0, lastMessage: "Update sistem sudah di-deploy" }
];

const DUMMY_MESSAGES = {
  // Pesan dari user 2
  "2": [
    { id: 1, senderId: 2, content: "Halo, bagaimana progress audit kita?", timestamp: new Date(Date.now() - 3600000) },
    { id: 2, senderId: 999, content: "Sudah 80% selesai, tinggal finalisasi", timestamp: new Date(Date.now() - 3500000) },
    { id: 3, senderId: 2, content: "Bagus, kapan kira-kira bisa selesai?", timestamp: new Date(Date.now() - 3400000) },
    { id: 4, senderId: 999, content: "Target akhir minggu ini", timestamp: new Date(Date.now() - 3300000) },
  ],
  // Pesan dari grup 1
  "group_1": [
    { id: 1, senderId: 2, senderName: "Budi Santoso", content: "Update progress audit minggu ini", timestamp: new Date(Date.now() - 86400000) },
    { id: 2, senderId: 4, senderName: "Dani Pratama", content: "Sudah selesai untuk bagian keuangan", timestamp: new Date(Date.now() - 82800000) },
    { id: 3, senderId: 1, senderName: "Agus Pranoto", content: "Bagus, tolong siapkan presentasi", timestamp: new Date(Date.now() - 79200000) },
    { id: 4, senderId: 2, senderName: "Budi Santoso", content: "Laporan bulanan sudah selesai", timestamp: new Date(Date.now() - 43200000) },
  ]
};

const DUMMY_FILES = [
  { id: 1, name: "Laporan Audit 2024.pdf", size: "2.4 MB", uploadedBy: "Agus Pranoto", date: new Date(Date.now() - 604800000), type: "pdf" },
  { id: 2, name: "Presentasi Finansial.pptx", size: "5.1 MB", uploadedBy: "Citra Dewi", date: new Date(Date.now() - 432000000), type: "pptx" },
  { id: 3, name: "Data Analisis.xlsx", size: "1.8 MB", uploadedBy: "Budi Santoso", date: new Date(Date.now() - 259200000), type: "xlsx" },
  { id: 4, name: "Meeting Minutes.docx", size: "650 KB", uploadedBy: "Dani Pratama", date: new Date(Date.now() - 172800000), type: "docx" },
  { id: 5, name: "Grafik Performa.png", size: "1.2 MB", uploadedBy: "Agus Pranoto", date: new Date(Date.now() - 86400000), type: "png" },
];

const DUMMY_NOTIFICATIONS = [
  { id: 1, content: "Agus Pranoto mengunggah dokumen baru", time: "5 menit yang lalu", read: false },
  { id: 2, content: "Budi Santoso mengomentari laporan keuangan", time: "30 menit yang lalu", read: false },
  { id: 3, content: "Jadwal meeting dengan Tim A telah diubah", time: "2 jam yang lalu", read: true },
  { id: 4, content: "Citra Dewi mengirim permintaan revisi", time: "5 jam yang lalu", read: true },
];

const Collaboration = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [currentMessages, setCurrentMessages] = useState<any[]>([]);
  const [notifications, setNotifications] = useState(DUMMY_NOTIFICATIONS);
  const [showNotifications, setShowNotifications] = useState(false);
  const { toast } = useToast();

  // Memuat pesan berdasarkan chat yang dipilih
  useEffect(() => {
    if (selectedChat) {
      if (selectedChat.startsWith("group_")) {
        const groupId = selectedChat.replace("group_", "");
        setCurrentMessages(DUMMY_MESSAGES[`group_${groupId}`] || []);
      } else {
        setCurrentMessages(DUMMY_MESSAGES[selectedChat] || []);
      }
    } else {
      setCurrentMessages([]);
    }
  }, [selectedChat]);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage = {
      id: Math.floor(Math.random() * 1000),
      senderId: 999, // ID pengguna saat ini (simulasi)
      content: messageInput,
      timestamp: new Date()
    };

    setCurrentMessages([...currentMessages, newMessage]);
    setMessageInput("");
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleCreateGroup = () => {
    toast({
      title: "Grup Baru",
      description: "Fitur pembuatan grup baru akan segera tersedia",
    });
  };

  const handleCreateTopic = () => {
    toast({
      title: "Topik Baru",
      description: "Fitur pembuatan topik diskusi baru akan segera tersedia",
    });
  };

  const handleUploadFile = () => {
    toast({
      title: "Upload File",
      description: "Fitur upload file akan segera tersedia",
    });
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setShowNotifications(false);
    toast({
      title: "Notifikasi",
      description: "Semua notifikasi telah ditandai sebagai dibaca",
    });
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Media Kolaborasi</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => setShowNotifications(!showNotifications)} className="relative">
            <Bell size={18} />
            {unreadNotifications > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                {unreadNotifications}
              </Badge>
            )}
          </Button>
          {showNotifications && (
            <Card className="absolute mt-2 right-6 top-16 w-80 z-50 shadow-lg">
              <CardContent className="p-3">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Notifikasi</h4>
                  <Button variant="ghost" size="sm" onClick={handleMarkAllRead}>
                    Tandai semua dibaca
                  </Button>
                </div>
                <ScrollArea className="h-60">
                  <div className="space-y-2">
                    {notifications.map(notification => (
                      <div 
                        key={notification.id}
                        className={`p-2 rounded-md ${notification.read ? 'bg-gray-50' : 'bg-blue-50'}`}
                      >
                        <p className="text-sm">{notification.content}</p>
                        <p className="text-xs text-gray-500">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5">
        {/* Sidebar kolaborasi */}
        <div className="col-span-12 md:col-span-3 lg:col-span-3 border rounded-lg">
          <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between p-3 border-b">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="groups">Grup</TabsTrigger>
              </TabsList>
              <Button variant="ghost" size="icon" onClick={activeTab === "personal" ? handleCreateTopic : handleCreateGroup}>
                <Plus size={18} />
              </Button>
            </div>

            <div className="p-3">
              <div className="relative mb-3">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input 
                  type="search" 
                  placeholder={`Cari ${activeTab === "personal" ? "kontak" : "grup"}...`} 
                  className="pl-8" 
                />
              </div>
              
              <TabsContent value="personal" className="m-0">
                <ScrollArea className="h-[calc(100vh-250px)]">
                  <div className="space-y-1">
                    {DUMMY_USERS.map(user => (
                      <div 
                        key={user.id}
                        className={`flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-gray-100 ${selectedChat === user.id.toString() ? 'bg-gray-100' : ''}`}
                        onClick={() => setSelectedChat(user.id.toString())}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <Avatar className="h-9 w-9">
                              <AvatarFallback className="bg-kap-navy text-white">
                                {user.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <span 
                              className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white ${
                                user.status === "online" ? "bg-green-500" : "bg-gray-300"
                              }`}
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.role}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="groups" className="m-0">
                <ScrollArea className="h-[calc(100vh-250px)]">
                  <div className="space-y-1">
                    {DUMMY_GROUPS.map(group => (
                      <div 
                        key={group.id}
                        className={`flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-gray-100 ${selectedChat === `group_${group.id}` ? 'bg-gray-100' : ''}`}
                        onClick={() => setSelectedChat(`group_${group.id}`)}
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-blue-600 text-white">
                              {group.name.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="text-sm font-medium">{group.name}</p>
                            <p className="text-xs text-gray-500 truncate">{group.lastMessage}</p>
                          </div>
                        </div>
                        {group.unread > 0 && (
                          <Badge>{group.unread}</Badge>
                        )}
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-2"
                      onClick={handleCreateGroup}
                    >
                      <PlusCircle className="mr-1 h-4 w-4" /> Group Baru
                    </Button>
                  </div>
                </ScrollArea>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Area pesan dan konten */}
        <div className="col-span-12 md:col-span-9 lg:col-span-6 border rounded-lg">
          {selectedChat ? (
            <>
              <div className="border-b p-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-kap-navy text-white">
                      {selectedChat.startsWith('group_') 
                        ? DUMMY_GROUPS.find(g => `group_${g.id}` === selectedChat)?.name.substring(0, 2) || 'G'
                        : DUMMY_USERS.find(u => u.id.toString() === selectedChat)?.avatar || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">
                      {selectedChat.startsWith('group_') 
                        ? DUMMY_GROUPS.find(g => `group_${g.id}` === selectedChat)?.name || 'Grup'
                        : DUMMY_USERS.find(u => u.id.toString() === selectedChat)?.name || 'Pengguna'}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {selectedChat.startsWith('group_') 
                        ? `${DUMMY_GROUPS.find(g => `group_${g.id}` === selectedChat)?.members.length || 0} anggota`
                        : DUMMY_USERS.find(u => u.id.toString() === selectedChat)?.status === 'online' ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
              </div>

              <ScrollArea className="h-[calc(100vh-300px)] p-4">
                <div className="space-y-4">
                  {currentMessages.map(msg => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.senderId === 999 ? "justify-end" : "justify-start"}`}
                    >
                      {msg.senderId !== 999 && selectedChat.startsWith('group_') && (
                        <Avatar className="h-8 w-8 mr-2 mt-1">
                          <AvatarFallback className="bg-kap-navy text-white text-xs">
                            {msg.senderName ? msg.senderName.substring(0, 2) : 'U'}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`max-w-[75%] rounded-lg p-3 ${
                          msg.senderId === 999
                            ? "bg-kap-navy text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {msg.senderId !== 999 && selectedChat.startsWith('group_') && (
                          <p className="text-xs font-medium mb-1">
                            {msg.senderName}
                          </p>
                        )}
                        <p className="text-sm">{msg.content}</p>
                        <p
                          className={`text-xs mt-1 text-right ${
                            msg.senderId === 999 ? "text-gray-300" : "text-gray-500"
                          }`}
                        >
                          {formatTime(new Date(msg.timestamp))}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="border-t p-3">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={handleUploadFile} title="Upload File">
                    <Upload size={18} />
                  </Button>
                  <Input 
                    placeholder="Ketik pesan..." 
                    className="flex-1" 
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button 
                    variant="default" 
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                  >
                    <Send size={18} />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-6 text-center">
              <MessageCircle size={48} className="text-gray-300 mb-4" />
              <h3 className="text-xl font-medium">Komunikasi & Kolaborasi</h3>
              <p className="text-gray-500 mt-2">
                Pilih kontak atau grup untuk memulai percakapan
              </p>
            </div>
          )}
        </div>

        {/* Informasi dan file */}
        <div className="col-span-12 md:col-span-12 lg:col-span-3 border rounded-lg">
          <Tabs defaultValue="files">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="files">File</TabsTrigger>
              <TabsTrigger value="users">Tim Online</TabsTrigger>
            </TabsList>

            <TabsContent value="files" className="p-3">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">File Bersama</h3>
                <Button variant="outline" size="sm" onClick={handleUploadFile}>
                  <Upload size={16} className="mr-1" />
                  Upload
                </Button>
              </div>
              <ScrollArea className="h-[calc(100vh-250px)]">
                <div className="space-y-2">
                  {DUMMY_FILES.map(file => (
                    <div key={file.id} className="flex items-start p-2 rounded-md border hover:bg-gray-50 cursor-pointer">
                      <div className="h-9 w-9 rounded bg-gray-100 flex items-center justify-center mr-3">
                        {file.type === 'pdf' && <FileText size={18} className="text-red-500" />}
                        {file.type === 'docx' && <File size={18} className="text-blue-500" />}
                        {file.type === 'xlsx' && <FileText size={18} className="text-green-500" />}
                        {file.type === 'pptx' && <FileText size={18} className="text-orange-500" />}
                        {(file.type === 'png' || file.type === 'jpg') && <Image size={18} className="text-purple-500" />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">{file.size}</p>
                        <p className="text-xs text-gray-500">{new Date(file.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="users" className="p-3">
              <h3 className="font-medium mb-3">Status Tim</h3>
              <ScrollArea className="h-[calc(100vh-250px)]">
                <div className="space-y-2">
                  {DUMMY_USERS.map(user => (
                    <div key={user.id} className="flex items-center justify-between p-2 rounded-md border hover:bg-gray-50">
                      <div className="flex items-center">
                        <div className="relative mr-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-kap-navy text-white">
                              {user.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <span 
                            className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white ${
                              user.status === "online" ? "bg-green-500" : "bg-gray-300"
                            }`}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.role}</p>
                        </div>
                      </div>
                      <Badge variant={user.status === "online" ? "default" : "outline"} className="ml-2">
                        {user.status === "online" ? "Online" : "Offline"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Collaboration;
