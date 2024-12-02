import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { message } from "antd";
import { fetchIdToken, loginUser, logoutUser } from "../firebase-auth/authService";

interface User {
  name: string;
  email: string;
};

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  
  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/user-data", {
        withCredentials: true,
      });
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

 
  const login = async (email: string, password: string) => {
    try {
      
      await loginUser(email, password);
      const idToken = await fetchIdToken();
      if (!idToken) {
        throw new Error("Failed to fetch ID token.");
      }

      await axios.post(
        "http://localhost:3000/api/session-login",
        { idToken },
        { withCredentials: true }
      );

      await fetchUser();
      ;
    } catch (error) {
      console.error("Login failed:", error);
      throw error; 
    }
  };
  
  const logout = async () => {
    try {

      await logoutUser();
      await axios.post(
        "http://localhost:3000/api/session-logout",
        {},
        { withCredentials: true }
      );

      setUser(null);
      message.success("Logout successful!");
    } catch (error) {
      console.error("Logout failed:", error);
      message.error("Logout failed. Please try again.");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
