
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight, ChevronLeft, MessageCircle, Send } from "lucide-react";
import { useChat } from "@/hooks/use-chat";
import { useIsMobile } from "@/hooks/use-mobile";

type ChatSidebarProps = {
  currentUserId?: number;
};

const ChatSidebar = ({ currentUserId = 0 }: ChatSidebarProps) => {
  const {
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
  } = useChat(currentUserId);

  const isMobile = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(!isMobile);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      closeChat();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Format timestamp to readable format
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div
      className={`${
        isExpanded ? "w-72 md:w-80" : "w-12 md:w-14"
      } h-screen bg-white border-l border-gray-200 flex flex-col fixed right-0 top-0 transition-all duration-300 z-10`}
    >
      <div className="flex items-center p-2 border-b border-gray-200 justify-between">
        {isExpanded && <h2 className="font-semibold text-lg">Chat</h2>}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleExpand}
          className="ml-auto"
          aria-label={isExpanded ? "Collapse chat" : "Expand chat"}
        >
          {isExpanded ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      {isExpanded ? (
        <>
          {!isChatOpen ? (
            <ScrollArea className="flex-1 p-2">
              <div className="space-y-1">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectMember(member.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-kap-navy text-white">
                            {member.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <span
                          className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white ${
                            member.status === "online"
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-gray-500">
                          {member.status === "online"
                            ? "Online"
                            : member.lastSeen
                            ? `${new Date(member.lastSeen).toLocaleDateString()}`
                            : "Offline"}
                        </p>
                      </div>
                    </div>
                    {messages[member.id]?.length > 0 && (
                      <div className="h-5 w-5 bg-kap-navy rounded-full flex items-center justify-center">
                        <span className="text-xs text-white">
                          {messages[member.id]?.length || 0}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <>
              <div className="p-2 border-b border-gray-200 flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => closeChat()}
                  className="mr-2"
                  aria-label="Back to members"
                >
                  <ChevronLeft size={18} />
                </Button>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-kap-navy text-white">
                      {selectedMember?.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{selectedMember?.name}</p>
                    <p className="text-xs text-gray-500">
                      {selectedMember?.status === "online"
                        ? "Online"
                        : selectedMember?.lastSeen
                        ? `Last seen ${new Date(
                            selectedMember.lastSeen
                          ).toLocaleDateString()}`
                        : "Offline"}
                    </p>
                  </div>
                </div>
              </div>

              <ScrollArea className="flex-1 p-3">
                <div className="space-y-3">
                  {currentMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.senderId === currentUserId
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-2 ${
                          message.senderId === currentUserId
                            ? "bg-kap-navy text-white"
                            : "bg-gray-100"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.senderId === currentUserId
                              ? "text-gray-300"
                              : "text-gray-500"
                          }`}
                        >
                          {formatTime(new Date(message.timestamp))}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-2 border-t border-gray-200">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Tulis pesan..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="flex-1"
                  />
                  <Button
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    aria-label="Send message"
                  >
                    <Send size={18} />
                  </Button>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="flex flex-col h-full items-center pt-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleChat}
            className="rounded-full h-10 w-10"
            aria-label="Open chat"
          >
            <MessageCircle size={20} />
          </Button>
          {members.filter((m) => m.status === "online").length > 0 && (
            <div className="mt-2 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {members.filter((m) => m.status === "online").length}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatSidebar;
