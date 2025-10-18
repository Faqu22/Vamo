import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Friend } from '@/types/friend';

export function FriendItem({ item }: { item: Friend }) {
  return (
    <ThemedView style={styles.container}>
      <Image source={{ uri: item.profilePictureUrl }} style={styles.image} />
      <ThemedText style={styles.name} numberOfLines={1}>
        {item.name}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    margin: 5,
    backgroundColor: 'transparent',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  name: {
    textAlign: 'center',
    fontWeight: '500',
  },
});