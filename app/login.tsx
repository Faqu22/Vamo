import { useHeaderHeight } from '@react-navigation/elements'; // Importar useHeaderHeight
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert, // Importar Platform
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/contexts/auth-context';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const primaryColor = useThemeColor({}, 'primary');
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'border');

  const headerHeight = useHeaderHeight(); // Obtener la altura del header
  const keyboardVerticalOffset = Platform.OS === 'ios' ? headerHeight : 0; // Ajustar offset para iOS

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Campos requeridos', 'Por favor, ingresa tu email y contraseña.');
      return;
    }
    setIsLoading(true);
    try {
      await login({ email, password });
    } catch (error: any) {
      Alert.alert(
        'Error de inicio de sesión',
        error.message || 'No se pudo iniciar sesión. Inténtalo de nuevo.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <SafeAreaView style={styles.safeArea}>
          <ThemedText type="title" style={styles.title}>
            ¡Hola de nuevo!
          </ThemedText>
          <TextInput
            style={[styles.input, { color: textColor, borderColor, backgroundColor: cardColor }]}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
          <TextInput
            style={[styles.input, { color: textColor, borderColor, backgroundColor: cardColor }]}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#999"
          />
          <Pressable
            style={[styles.button, { backgroundColor: primaryColor }]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <ThemedText style={styles.buttonText}>Iniciar Sesión</ThemedText>
            )}
          </Pressable>
          <Pressable onPress={() => router.push('/register')}>
            <ThemedText style={styles.linkText}>
              ¿No tenés cuenta? <ThemedText style={{ color: primaryColor }}>Registrate</ThemedText>
            </ThemedText>
          </Pressable>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginBottom: 30,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkText: {
    marginTop: 20,
  },
});