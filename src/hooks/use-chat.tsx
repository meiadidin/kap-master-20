
import { useState } from "react";

// Tipe untuk pesan
interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  timestamp: string;
}

// Tipe untuk anggota chat
interface Member {
  id: number;
  name: string;
  avatar: string;
  status: "online" | "offline";
  lastSeen?: string;
}

// Dummy data anggota chat
const dummyMembers: Member[] = [
  { id: 1, name: "Admin Utama", avatar: "AU", status: "online" },
  { id: 2, name: "Manager", avatar: "MN", status: "online" },
  { id: 3, name: "Auditor Senior", avatar: "AS", status: "offline", lastSeen: "2024-04-01T15:30:00" },
  { id: 4, name: "PT Maju Bersama", avatar: "MB", status: "offline", lastSeen: "2024-04-02T10:15:00" },
  { id: 5, name: "Mitra Utama", avatar: "MU", status: "online" }
];

// Dummy data pesan chat
const dummyMessages: Record<number, Message[]> = {
  1: [
    { id: 1, senderId: 0, receiverId: 1, content: "Halo Admin, bagaimana perkembangan laporan audit?", timestamp: "2024-04-02T09:30:00" },
    { id: 2, senderId: 1, receiverId: 0, content: "Halo, laporan audit sedang dalam proses finalisasi. Akan selesai hari ini.", timestamp: "2024-04-02T09:35:00" },
    { id: 3, senderId: 0, receiverId: 1, content: "Bagus, terima kasih infonya.", timestamp: "2024-04-02T09:36:00" }
  ],
  2: [
    { id: 1, senderId: 0, receiverId: 2, content: "Selamat pagi Manager, ada update untuk proyek baru?", timestamp: "2024-04-02T08:45:00" },
    { id: 2, senderId: 2, receiverId: 0, content: "Pagi, kita akan meeting dengan klien baru jam 14:00 hari ini.", timestamp: "2024-04-02T08:50:00" }
  ],
  3: [
    { id: 1, senderId: 0, receiverId: 3, content: "Tolong review dokumen yang sudah saya kirim kemarin.", timestamp: "2024-04-01T14:20:00" }
  ],
  4: [],
  5: [
    { id: 1, senderId: 5, receiverId: 0, content: "Dokumen yang Anda minta sudah saya upload.", timestamp: "2024-04-02T10:05:00" }
  ]
};

export const useChat = (currentUserId: number) => {
  const [members] = useState<Member[]>(dummyMembers);
  const [messages, setMessages] = useState<Record<number, Message[]>>(dummyMessages);
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  // Mendapatkan member yang dipilih
  const selectedMember = members.find(member => member.id === selectedMemberId) || null;
  
  // Mendapatkan pesan yang sedang aktif
  const currentMessages = selectedMemberId ? messages[selectedMemberId] || [] : [];

  // Memilih member untuk chat
  const handleSelectMember = (memberId: number) => {
    setSelectedMemberId(memberId);
    setIsChatOpen(true);
  };

  // Mengirim pesan
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedMemberId) return;

    const newMsg: Message = {
      id: currentMessages.length > 0 ? Math.max(...currentMessages.map(m => m.id)) + 1 : 1,
      senderId: currentUserId,
      receiverId: selectedMemberId,
      content: newMessage.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => ({
      ...prev,
      [selectedMemberId]: [...(prev[selectedMemberId] || []), newMsg]
    }));

    setNewMessage("");
  };

  // Buka/tutup panel chat
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen) {
      setSelectedMemberId(null);
    }
  };

  // Tutup chat
  const closeChat = () => {
    setIsChatOpen(false);
    setSelectedMemberId(null);
  };

  return {
    members,
    selectedMember,
    selectedMemberId,
    currentMessages,
    messages,
    newMessage,
    isChatOpen,
    handleSelectMember,
    setNewMessage,
    handleSendMessage,
    toggleChat,
    closeChat
  };
};
