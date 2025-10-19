import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { ProfileView } from '@/components/profile/profile-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useUserProfile } from '@/hooks/use-user-profile';

export default function UserProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user, isLoading, isError } = useUserProfile(id);
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
        <ThemedText>No se pudo cargar el perfil.</ThemedText>
      </ThemedView>
    );
  }

  return <ProfileView user={user} />;
}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});