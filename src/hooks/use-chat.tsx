
import { useState } from "react";

type Message = {
  id: number;
  senderId: number;
  content: string;
  timestamp: Date;
};

type Member = {
  id: number;
  name: string;
  avatar: string;
  role: string;
  status: "online" | "offline";
  lastSeen?: Date;
};

// Dummy chat members data
const dummyMembers: Member[] = [
  {
    id: 1,
    name: "Admin Utama",
    avatar: "AU",
    role: "admin",
    status: "online",
  },
  {
    id: 2,
    name: "Admin Sekunder",
    avatar: "AS",
    role: "admin",
    status: "offline",
    lastSeen: new Date(Date.now() - 3600000), // 1 hour ago
  },
  {
    id: 3,
    name: "Manajer Tim",
    avatar: "MT",
    role: "manager",
    status: "online",
  },
  {
    id: 4,
    name: "Auditor Senior",
    avatar: "AS",
    role: "auditor",
    status: "offline",
    lastSeen: new Date(Date.now() - 7200000), // 2 hours ago
  },
  {
    id: 5,
    name: "Auditor Junior",
    avatar: "AJ",
    role: "auditor",
    status: "online",
  },
  {
    id: 6,
    name: "PT Maju Bersama",
    avatar: "MB",
    role: "client",
    status: "offline",
    lastSeen: new Date(Date.now() - 86400000), // 1 day ago
  },
  {
    id: 7,
    name: "CV Teknologi Nusantara",
    avatar: "TN",
    role: "client",
    status: "online",
  },
];

// Dummy messages for each conversation
const dummyMessages: Record<number, Message[]> = {
  1: [
    {
      id: 1,
      senderId: 1,
      content: "Halo, bagaimana perkembangan audit PT Sejahtera?",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: 2,
      senderId: 0, // Current user
      content: "Berjalan lancar, dokumen sudah 80% diperiksa",
      timestamp: new Date(Date.now() - 3540000),
    },
    {
      id: 3,
      senderId: 1,
      content: "Bagus, perkiraan kapan akan selesai?",
      timestamp: new Date(Date.now() - 3480000),
    },
  ],
  3: [
    {
      id: 1,
      senderId: 3,
      content: "Saya sudah mengirim dokumen jadwal untuk bulan depan",
      timestamp: new Date(Date.now() - 86400000),
    },
    {
      id: 2,
      senderId: 0, // Current user
      content: "Terima kasih, akan saya cek segera",
      timestamp: new Date(Date.now() - 86000000),
    },
  ],
  5: [
    {
      id: 1,
      senderId: 5,
      content: "Ada file yang perlu direvisi untuk PT Bintang",
      timestamp: new Date(Date.now() - 7200000),
    },
  ],
  7: [
    {
      id: 1,
      senderId: 7,
      content: "Selamat pagi, kami sudah mengunggah dokumen keuangan",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: 2,
      senderId: 0, // Current user
      content: "Terima kasih, akan kami proses segera",
      timestamp: new Date(Date.now() - 3540000),
    },
  ],
};

export function useChat(currentUserId = 0) {
  const [members] = useState<Member[]>(dummyMembers);
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Record<number, Message[]>>(dummyMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  const selectedMember = members.find((member) => member.id === selectedMemberId);
  const currentMessages = selectedMemberId ? messages[selectedMemberId] || [] : [];

  const handleSelectMember = (memberId: number) => {
    setSelectedMemberId(memberId);
    setIsChatOpen(true);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedMemberId) return;

    const newMsg: Message = {
      id: (currentMessages.length > 0 ? Math.max(...currentMessages.map(m => m.id)) : 0) + 1,
      senderId: currentUserId,
      content: newMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => ({
      ...prev,
      [selectedMemberId]: [...(prev[selectedMemberId] || []), newMsg],
    }));

    setNewMessage("");
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  return {
    members,
    selectedMember,
    selectedMemberId,
    currentMessages,
    newMessage,
    isChatOpen,
    handleSelectMember,
    setNewMessage,
    handleSendMessage,
    toggleChat,
    closeChat,
  };
}
