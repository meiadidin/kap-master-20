
import { useState, useEffect } from 'react';

interface UserRole {
  role?: string;
}

export function usePermissions() {
  const [currentUser, setCurrentUser] = useState<UserRole>({});
  const [canAddTeamMember, setCanAddTeamMember] = useState(false);

  useEffect(() => {
    // Get user permissions from session storage
    const user = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    setCurrentUser(user);
    
    // Check if user has appropriate role for team member management
    const hasPermission = ['managingpartner', 'partner'].includes(user.role || '');
    setCanAddTeamMember(hasPermission);
  }, []);

  return {
    currentUser,
    canAddTeamMember
  };
}
