
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export type UserData = {
  name: string;
  email: string;
  role: string;
};

export const useDashboardAuth = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  
  useEffect(() => {
    // Check if user is logged in
    if (!user) {
      navigate("/login");
      return;
    }
    
    // Set currentUser from Supabase user data
    setCurrentUser({
      name: user.user_metadata?.name || user.email?.split('@')[0] || "User",
      email: user.email || "",
      role: user.user_metadata?.role || "client"
    });
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return {
    currentUser,
    handleLogout
  };
};
