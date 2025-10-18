import { useRouter } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSWRConfig } from 'swr';

import { deleteToken, getToken, saveToken } from '@/lib/auth-storage';
import { fetcherPost } from '@/lib/axios';

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
    const data = await fetcherPost('/auth/login', credentials);
    await saveToken(data.access);
    setAuthenticated(true);
    mutate('/profile/me');
    router.back();
  };

  const register = async (userData: any) => {
    console.log("1");
    const data = await fetcherPost('/auth/register', userData);
    console.log("2", data)
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