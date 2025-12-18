import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import type { AuthResponse, AuthRequest } from '../api/types';

interface AuthContextProps {
  token: string | null;
  setToken: (t: string | null) => void;
  login: (payload: AuthRequest) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(() => {
    const stored = localStorage.getItem('jwt');
    return stored ?? null;
  });

  const navigate = useNavigate();

  const setToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem('jwt', newToken);
    } else {
      localStorage.removeItem('jwt');
    }
    setTokenState(newToken);
  };

  // src/context/AuthContext.tsx   (only the login function changes)
const login = async (payload: AuthRequest) => {
  const { data } = await api.post<AuthResponse>('/api/auth/login', payload);
  setToken(data.token);
  // 👉 send the user to the Home page after a successful login
  navigate('/home', { replace: true });
};


  const logout = () => {
    setToken(null);
    navigate('/login', { replace: true });
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
