import { ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { DarkAppTheme, LightTheme } from '@/constants/theme';
import { AuthProvider } from '@/contexts/auth-context';
import { useColorScheme } from '@/hooks/use-color-scheme';

// LogBox.ignoreAllLogs(true);

// // Captura errores globales para evitar el red screen
// if (!__DEV__) {
//   // En producción no hace falta, pero por las dudas
//   console.error = () => {};
// } else {
//   const originalHandler = ErrorUtils.getGlobalHandler && ErrorUtils.getGlobalHandler();
//   ErrorUtils.setGlobalHandler((error, isFatal) => {
//     console.log('Error capturado:', error);
//     // Evita el red screen mostrando algo custom o nada
//     // Por ejemplo:
//     // Alert.alert('Ocurrió un error, pero seguimos funcionando.');
//     // o simplemente no hacer nada:
//   });
// }

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkAppTheme : LightTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="edit-profile" options={{ presentation: 'modal' }} />
            <Stack.Screen
              name="(create-plan)"
              options={{ presentation: 'modal', headerShown: false }}
            />
            <Stack.Screen name="login" options={{ presentation: 'modal', title: 'Iniciar Sesión' }} />
            <Stack.Screen name="register" options={{ presentation: 'modal', title: 'Registrarse' }} />
            <Stack.Screen name="profile/[id]" options={{ title: 'Perfil' }} />
            <Stack.Screen
              name="messages/[id]"
              options={{ presentation: 'card', headerBackTitle: 'Mensajes' }}
            />
          </Stack>
        </ThemeProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}