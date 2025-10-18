import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { FrequentPlace } from '@/mocksdata/places';

export function FrequentPlaceItem({ item }: { item: FrequentPlace }) {
  const secondaryTextColor = useThemeColor({}, 'icon');

  return (
    <ThemedView style={styles.container}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} contentFit="cover" />
      <View style={styles.info}>
        <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
        <ThemedText style={{ color: secondaryTextColor, fontSize: 14 }}>{item.address}</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
});