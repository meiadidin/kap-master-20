
import React from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface User {
  id: number;
  name: string;
  role: string;
  online: boolean;
  avatar: string;
}

interface UserListProps {
  users: User[];
  onUserSelect: (userId: number) => void;
  selectedUserId: number | null;
}

const UserList = ({ users, onUserSelect, selectedUserId }: UserListProps) => {
  return (
    <ul className="space-y-2">
      {users.map((user) => (
        <li key={user.id}>
          <Button 
            variant={selectedUserId === user.id ? "default" : "ghost"} 
            className="w-full justify-start"
            onClick={() => onUserSelect(user.id)}
          >
            <div className="flex items-center w-full">
              <div className="relative">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {user.online && (
                  <span className="absolute bottom-0 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                )}
              </div>
              <div className="flex-grow text-left">
                <div className="font-medium text-sm">{user.name}</div>
                <div className="text-xs text-gray-500">{user.role}</div>
              </div>
              <div>
                {user.online ? (
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 text-xs">
                    Online
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200 text-xs">
                    Offline
                  </Badge>
                )}
              </div>
            </div>
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
