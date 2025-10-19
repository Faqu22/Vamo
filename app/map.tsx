import { Stack } from 'expo-router';
import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { PlanDetailModal } from '@/components/modals/plan-detail-modal';
import { PlanItem } from '@/components/ui/plan-item';
import { MOCK_PLANS } from '@/mocksdata/plans';
import { Plan } from '@/types/plan';

export default function MapScreen() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

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
          <Marker
            key={plan.id}
            coordinate={plan.coordinate}
            title={plan.title}
            onPress={() => setSelectedPlan(plan)}
          />
        ))}
      </MapView>
      <View style={styles.listContainer}>
        <FlatList
          data={MOCK_PLANS}
          renderItem={({ item }) => (
            <View style={styles.planItemContainer}>
              <PlanItem item={item} onPress={() => setSelectedPlan(item)} />
            </View>
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>

      {selectedPlan && <PlanDetailModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />}
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