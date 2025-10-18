import { ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';

import { DarkAppTheme, LightTheme } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

// Evita que la pantalla de bienvenida se oculte automáticamente
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Oculta la pantalla de bienvenida una vez que se determina el esquema de color
    if (colorScheme) {
      SplashScreen.hideAsync();
    }
  }, [colorScheme]);

  if (!colorScheme) {
    return null; // No renderizar nada hasta que se determine el esquema de color
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkAppTheme : LightTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="map" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}