import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { MOCK_USER } from '@/mocksdata/user';
import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

export default function ProfileScreen() {
  const user = MOCK_USER;
  const secondaryTextColor = useThemeColor({}, 'icon');

  return (
    <ThemedView style={styles.container}>
      <Image source={{ uri: user.profilePictureUrl }} style={styles.profilePicture} />
      <ThemedText type="title" style={styles.name}>
        {user.name}
      </ThemedText>
      <ThemedText style={[styles.age, { color: secondaryTextColor }]}>{user.age} años</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    marginBottom: 10,
  },
  age: {
    fontSize: 20,
  },
});