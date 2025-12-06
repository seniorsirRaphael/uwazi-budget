import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "citizen" | "journalist" | "official";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo credentials for each role
export const DEMO_CREDENTIALS = {
  citizen: { email: "citizen@uwazi.ke", password: "citizen123", name: "Sarah Wanjiku" },
  journalist: { email: "journalist@uwazi.ke", password: "journalist123", name: "David Omondi" },
  official: { email: "official@uwazi.ke", password: "official123", name: "Mwangi Kamau" },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("uwazi_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Check against demo credentials
    for (const [role, creds] of Object.entries(DEMO_CREDENTIALS)) {
      if (creds.email === email && creds.password === password) {
        const newUser: User = {
          id: `user-${role}`,
          email: creds.email,
          name: creds.name,
          role: role as UserRole,
        };
        setUser(newUser);
        localStorage.setItem("uwazi_user", JSON.stringify(newUser));
        return { success: true };
      }
    }
    return { success: false, error: "Invalid email or password" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("uwazi_user");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
