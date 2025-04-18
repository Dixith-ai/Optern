import { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  email: string;
  type: 'student' | 'company';
  subscription?: {
    plan: 'basic' | 'pro' | 'elite';
    status: 'active' | 'expired';
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, type: 'student' | 'company') => void;
  logout: () => void;
  subscribe: (plan: 'basic' | 'pro' | 'elite') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string, type: 'student' | 'company') => {
    // In a real app, this would make an API call
    setUser({
      id: '1',
      email,
      type
    });
  };

  const logout = () => {
    setUser(null);
  };

  const subscribe = (plan: 'basic' | 'pro' | 'elite') => {
    if (user) {
      setUser({
        ...user,
        subscription: {
          plan,
          status: 'active'
        }
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, subscribe }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}