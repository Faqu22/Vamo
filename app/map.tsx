import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { PlanItem } from '@/components/ui/plan-item';
import { useThemeColor } from '@/hooks/use-theme-color';
import { MOCK_PLANS, Plan } from '@/mocksdata/plans';
import { Stack } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen() {
  const cardColor = useThemeColor({}, 'card');

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Mapa de Planes' }} />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -34.58,
          longitude: -58.42,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {MOCK_PLANS.map((plan) => (
          <Marker key={plan.id} coordinate={plan.coordinate} title={plan.title} />
        ))}
      </MapView>
      <View style={styles.listContainer}>
        <FlatList
          data={MOCK_PLANS}
          renderItem={({ item }) => (
            <View style={styles.planItemContainer}>
              <PlanItem item={item} />
            </View>
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  listContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  listContent: {
    paddingHorizontal: 10,
  },
  planItemContainer: {
    width: 250,
    marginHorizontal: 5,
  },
});