import { useRouter } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Image, Platform } from 'react-native';
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
    const data = await fetcherPost('/auth/register', userData);
    await saveToken(data.access);
    setAuthenticated(true);

    try {
      // Subir foto de perfil por defecto
      const asset = Image.resolveAssetSource(require('../assets/images/foto-perfil.webp'));
      const uri = asset.uri;

      const formData = new FormData();
      const fileName = uri.split('/').pop() || 'foto-perfil.webp';
      const fileType = 'image/webp';

      formData.append('avatar', {
        uri: Platform.OS === 'ios' ? uri.replace('file://', '') : uri,
        name: fileName,
        type: fileType,
      } as any);

      await fetcherPost('/profile/me/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch (error) {
      console.error('Failed to upload default profile picture:', error);
      // Error no crítico, continuar con el flujo de inicio de sesión
    }

    mutate('/profile/me');
    router.back();
  };

  const logout = async () => {
    await deleteToken();
    setAuthenticated(false);
    mutate('/profile/me', null, false); // Limpiar datos del perfil
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