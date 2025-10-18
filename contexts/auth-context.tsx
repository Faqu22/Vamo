import { useRouter } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSWRConfig } from 'swr';

import api from '@/lib/api';
import { deleteToken, getToken, saveToken } from '@/lib/auth-storage';

interface AuthContextType {
  login: (credentials: any) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  authenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { mutate } = useSWRConfig();
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      if (token) {
        setAuthenticated(true);
      }
      setIsLoading(false);
    };
    checkToken();
  }, []);

  const login = async (credentials: any) => {
    const { data } = await api.post('/auth/login', credentials);
    await saveToken(data.access);
    setAuthenticated(true);
    mutate('/profile/me');
    router.back();
  };

  const register = async (userData: any) => {
    console.log("aaa");
    console.log(userData);
    const { data } = await api.post('/auth/register', userData);
    console.log("response: ", data)
    await saveToken(data.access);
    setAuthenticated(true);
    mutate('/profile/me');
    router.back();
  };

  const logout = async () => {
    await deleteToken();
    setAuthenticated(false);
    mutate('/profile/me', null, false); // Clear profile data
  };

  return (
    <AuthContext.Provider value={{ login, register, logout, authenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}