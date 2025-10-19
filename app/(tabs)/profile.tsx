import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet } from 'react-native';

import { ProfileView } from '@/components/profile/profile-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useProfile } from '@/hooks/use-profile';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function ProfileScreen() {
  const { user, isLoading, isError } = useProfile();
  const router = useRouter();

  const cardColor = useThemeColor({}, 'card');
  const primaryColor = useThemeColor({}, 'primary');

  if (isLoading) {
    return (
      <ThemedView style={styles.centeredContainer}>
        <ActivityIndicator size="large" color={primaryColor} />
      </ThemedView>
    );
  }

  if (isError || !user) {
    return (
      <ThemedView style={styles.centeredContainer}>
        <ThemedText type="subtitle" style={{ marginBottom: 20 }}>
          Únete a Vamo
        </ThemedText>
        <ThemedText style={{ textAlign: 'center', marginBottom: 30, paddingHorizontal: 20 }}>
          Inicia sesión o crea una cuenta para ver tu perfil y empezar a crear planes.
        </ThemedText>
        <Pressable
          style={[styles.button, { backgroundColor: primaryColor }]}
          onPress={() => router.push('/login')}
        >
          <ThemedText style={styles.buttonText}>Iniciar Sesión</ThemedText>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            { backgroundColor: cardColor, borderWidth: 1, borderColor: primaryColor },
          ]}
          onPress={() => router.push('/register')}
        >
          <ThemedText style={[styles.buttonText, { color: primaryColor }]}>Registrarse</ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  return <ProfileView user={user} isCurrentUser />;
}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '80%',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});