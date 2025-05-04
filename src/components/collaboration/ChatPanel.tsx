
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Send, Upload, User, Users } from 'lucide-react';

interface Message {
  id: number;
  sender: {
    id: number;
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  isFile?: boolean;
  fileName?: string;
  fileType?: string;
  fileUrl?: string;
}

interface User {
  id: number;
  name: string;
  role: string;
  online: boolean;
  avatar: string;
}

interface Group {
  id: number;
  name: string;
  members: number;
  unread: number;
}

interface ChatPanelProps {
  selectedUser: User | null;
  selectedGroup: Group | null;
  users: User[];
}

const ChatPanel = ({ selectedUser, selectedGroup, users }: ChatPanelProps) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [potentialMembers, setPotentialMembers] = useState<{id: number, name: string, checked: boolean}[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Generate mock messages for demo
  useEffect(() => {
    if (selectedUser || selectedGroup) {
      const mockMessages: Message[] = [];
      
      // Current user (as if it's you)
      const currentUser = {
        id: 999,
        name: "Anda",
        avatar: "https://i.pravatar.cc/150?img=9"
      };
      
      // Messages for personal chat
      if (selectedUser) {
        mockMessages.push(
          {
            id: 1,
            sender: {
              id: selectedUser.id,
              name: selectedUser.name,
              avatar: selectedUser.avatar
            },
            content: `Halo, ada yang bisa saya bantu?`,
            timestamp: "10:30"
          },
          {
            id: 2,
            sender: currentUser,
            content: "Saya ingin menanyakan tentang laporan audit terakhir",
            timestamp: "10:31"
          },
          {
            id: 3,
            sender: {
              id: selectedUser.id,
              name: selectedUser.name,
              avatar: selectedUser.avatar
            },
            content: "Tentu, saya sudah mengirimkannya melalui email",
            timestamp: "10:32"
          },
          {
            id: 4,
            sender: {
              id: selectedUser.id,
              name: selectedUser.name,
              avatar: selectedUser.avatar
            },
            content: "Berikut saya lampirkan sekali lagi",
            timestamp: "10:33"
          },
          {
            id: 5,
            sender: {
              id: selectedUser.id,
              name: selectedUser.name,
              avatar: selectedUser.avatar
            },
            content: "File laporan audit Q2",
            timestamp: "10:33",
            isFile: true,
            fileName: "Laporan_Audit_Q2.pdf",
            fileType: "pdf",
            fileUrl: "#"
          }
        );
      }
      
      // Messages for group chat
      if (selectedGroup) {
        const otherMembers = [users[0], users[1], users[2]];
        
        mockMessages.push(
          {
            id: 1,
            sender: {
              id: otherMembers[0].id,
              name: otherMembers[0].name,
              avatar: otherMembers[0].avatar
            },
            content: `Selamat datang di grup ${selectedGroup.name}`,
            timestamp: "09:15"
          },
          {
            id: 2,
            sender: {
              id: otherMembers[1].id,
              name: otherMembers[1].name,
              avatar: otherMembers[1].avatar
            },
            content: "Saya sudah mengupload dokumen terbaru untuk review",
            timestamp: "09:20"
          },
          {
            id: 3,
            sender: currentUser,
            content: "Terima kasih, saya akan segera mereviewnya",
            timestamp: "09:22"
          },
          {
            id: 4,
            sender: {
              id: otherMembers[2].id,
              name: otherMembers[2].name,
              avatar: otherMembers[2].avatar
            },
            content: "Berikut data tambahan",
            timestamp: "09:25",
            isFile: true,
            fileName: "Data_Pendukung.xlsx",
            fileType: "excel",
            fileUrl: "#"
          }
        );
      }
      
      setMessages(mockMessages);
    } else {
      setMessages([]);
    }
    
    // Set potential members for add dialog
    setPotentialMembers(
      users.map(user => ({
        id: user.id,
        name: user.name,
        checked: false
      }))
    );
  }, [selectedUser, selectedGroup, users]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    
    const newMessage: Message = {
      id: Date.now(),
      sender: {
        id: 999, // Current user ID
        name: "Anda",
        avatar: "https://i.pravatar.cc/150?img=9" // Current user avatar
      },
      content: messageInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
    setMessageInput('');
    
    // Simulate response after a delay
    if (selectedUser && selectedUser.online) {
      setTimeout(() => {
        const responseMessage: Message = {
          id: Date.now() + 1,
          sender: {
            id: selectedUser.id,
            name: selectedUser.name,
            avatar: selectedUser.avatar
          },
          content: `Terima kasih atas pesannya. Saya akan merespons segera.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages(prev => [...prev, responseMessage]);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleFileSubmit = () => {
    if (!uploadedFile) return;
    
    // Check file size (max 10MB)
    if (uploadedFile.size > 10 * 1024 * 1024) {
      toast({
        title: "File terlalu besar",
        description: "Ukuran file maksimal adalah 10MB",
        variant: "destructive"
      });
      return;
    }
    
    // Add file message
    const newFileMessage: Message = {
      id: Date.now(),
      sender: {
        id: 999, // Current user ID
        name: "Anda",
        avatar: "https://i.pravatar.cc/150?img=9"
      },
      content: "File dikirim",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isFile: true,
      fileName: uploadedFile.name,
      fileType: uploadedFile.type.split('/')[1] || 'file',
      fileUrl: "#" // In a real app, this would be the URL to the uploaded file
    };
    
    setMessages([...messages, newFileMessage]);
    setUploadedFile(null);
    setIsUploadDialogOpen(false);
    
    toast({
      title: "File berhasil diunggah",
      description: `${uploadedFile.name} telah dikirim`
    });
  };

  const handleAddMembers = () => {
    const selectedMembers = potentialMembers.filter(member => member.checked);
    
    if (selectedMembers.length === 0) {
      toast({
        title: "Tidak ada anggota yang dipilih",
        description: "Pilih minimal satu anggota untuk ditambahkan",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, you would send this to your backend
    toast({
      title: "Anggota berhasil ditambahkan",
      description: `${selectedMembers.length} anggota baru telah ditambahkan ke grup`
    });
    
    // Reset checkboxes
    setPotentialMembers(potentialMembers.map(member => ({
      ...member,
      checked: false
    })));
    
    setIsAddMemberDialogOpen(false);
  };

  const toggleMemberSelection = (id: number) => {
    setPotentialMembers(potentialMembers.map(member => 
      member.id === id ? { ...member, checked: !member.checked } : member
    ));
  };

  // If no chat is selected
  if (!selectedUser && !selectedGroup) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center p-6">
        <Users size={48} className="text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Tidak ada chat yang dipilih</h3>
        <p className="text-gray-500 max-w-md">
          Pilih pengguna dari daftar "Tim Online" untuk memulai chat personal, 
          atau pilih grup dari daftar "Grup Chat" untuk berpartisipasi dalam diskusi grup.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[600px]">
      {/* Chat Header */}
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex items-center">
          {selectedUser ? (
            <>
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={selectedUser.avatar} />
                <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{selectedUser.name}</h3>
                <p className="text-xs text-gray-500">{selectedUser.role} · {selectedUser.online ? 'Online' : 'Offline'}</p>
              </div>
            </>
          ) : (
            <>
              <div className="h-10 w-10 mr-3 bg-blue-100 rounded-full flex items-center justify-center">
                <Users size={20} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">{selectedGroup?.name}</h3>
                <p className="text-xs text-gray-500">{selectedGroup?.members} anggota</p>
              </div>
            </>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-2">
          {selectedGroup && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsAddMemberDialogOpen(true)}
            >
              <PlusCircle size={16} className="mr-2" />
              <span>Tambah Anggota</span>
            </Button>
          )}
          <Button
            variant="outline" 
            size="sm"
            onClick={() => setIsUploadDialogOpen(true)}
          >
            <Upload size={16} className="mr-2" />
            <span>Upload</span>
          </Button>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender.id === 999 ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex ${message.sender.id === 999 ? 'flex-row-reverse' : 'flex-row'} max-w-[80%]`}>
              <Avatar className="h-8 w-8 mt-1 mx-2">
                <AvatarImage src={message.sender.avatar} />
                <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className={`flex ${message.sender.id === 999 ? 'justify-end' : 'justify-start'}`}>
                  <span className="text-xs text-gray-500 mb-1">
                    {message.sender.id !== 999 && `${message.sender.name} · `}{message.timestamp}
                  </span>
                </div>
                {message.isFile ? (
                  <div className={`rounded-lg p-3 ${message.sender.id === 999 ? 'bg-blue-500 text-white' : 'bg-gray-100'} inline-block`}>
                    <div className="flex items-center">
                      <div className="bg-white/20 p-2 rounded mr-3">
                        {message.fileType === 'pdf' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        )}
                        {message.fileType === 'excel' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        )}
                        {!['pdf', 'excel'].includes(message.fileType || '') && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{message.fileName}</div>
                        <div className="flex mt-1">
                          <a 
                            href={message.fileUrl} 
                            className="text-xs bg-white/20 hover:bg-white/30 py-1 px-2 rounded mr-2"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Buka
                          </a>
                          <a 
                            href={message.fileUrl} 
                            download
                            className="text-xs bg-white/20 hover:bg-white/30 py-1 px-2 rounded"
                          >
                            Unduh
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={`rounded-lg p-3 ${message.sender.id === 999 ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
                    {message.content}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Box */}
      <div className="p-4 border-t flex items-center">
        <Input
          type="text"
          placeholder="Ketik pesan..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-grow mr-2"
        />
        <Button onClick={handleSendMessage} disabled={!messageInput.trim()}>
          <Send size={18} />
        </Button>
      </div>
      
      {/* Add Member Dialog */}
      <Dialog open={isAddMemberDialogOpen} onOpenChange={setIsAddMemberDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Anggota ke Grup</DialogTitle>
            <DialogDescription>
              Pilih pengguna yang ingin ditambahkan ke grup "{selectedGroup?.name}"
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4 max-h-[300px] overflow-y-auto">
            {potentialMembers.map((member) => (
              <div key={member.id} className="flex items-center space-x-3">
                <Checkbox
                  id={`member-${member.id}`}
                  checked={member.checked}
                  onCheckedChange={() => toggleMemberSelection(member.id)}
                />
                <label
                  htmlFor={`member-${member.id}`}
                  className="flex items-center space-x-2 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{member.name}</span>
                </label>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddMemberDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleAddMembers}>
              Tambahkan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* File Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unggah File</DialogTitle>
            <DialogDescription>
              Pilih file yang ingin diunggah dan dibagikan
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <label 
                htmlFor="picture" 
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-1">Klik untuk memilih file atau seret file ke sini</p>
                <p className="text-xs text-gray-400">Maks. 10MB</p>
                <input 
                  id="picture" 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileUpload} 
                />
              </label>
            </div>
            
            {uploadedFile && (
              <div className="bg-blue-50 p-3 rounded flex items-center">
                <div className="bg-blue-100 p-2 rounded mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1 truncate">
                  <p className="font-medium text-sm">{uploadedFile.name}</p>
                  <p className="text-xs text-gray-500">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="ml-2"
                  onClick={() => setUploadedFile(null)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleFileSubmit} disabled={!uploadedFile}>
              Unggah
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatPanel;
