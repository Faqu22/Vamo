import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { FilterButton } from '@/components/ui/filter-button';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { PlanItem } from '@/components/ui/plan-item';
import { useThemeColor } from '@/hooks/use-theme-color';
import { INTERESTS } from '@/mocksdata/interests';
import { MOCK_PLANS } from '@/mocksdata/plans';

export default function HomeScreen() {
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'border');
  const iconColor = useThemeColor({}, 'icon');
  const backgroundColor = useThemeColor({}, 'background');

  const [isFiltersVisible, setFiltersVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const animatedHeight = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: animatedHeight.value,
      opacity: withTiming(animatedHeight.value > 0 ? 1 : 0, { duration: 150 }),
      overflow: 'hidden',
    };
  });

  useEffect(() => {
    animatedHeight.value = withTiming(isFiltersVisible ? 100 : 0, {
      duration: 300,
    });
  }, [isFiltersVisible]);

  const toggleFilter = (interest: string) => {
    setActiveFilters((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.searchSection, { backgroundColor }]}>
        <View style={[styles.searchBar, { backgroundColor: cardColor, borderColor }]}>
          <IconSymbol name="magnifyingglass" color={iconColor} size={20} />
          <TextInput
            placeholder="¿Qué te pintó hacer hoy?"
            placeholderTextColor="#999"
            style={[styles.input, { color: textColor }]}
            onFocus={() => setFiltersVisible(true)}
          />
        </View>

        <Animated.View style={animatedStyle}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersContainer}
          >
            {INTERESTS.map((interest) => (
              <FilterButton
                key={interest}
                label={interest}
                isActive={activeFilters.includes(interest)}
                onPress={() => toggleFilter(interest)}
              />
            ))}
          </ScrollView>
          <Pressable
            onPress={() => {
              setFiltersVisible(false);
              Keyboard.dismiss();
            }}
          >
            <ThemedText style={{ textAlign: 'center', padding: 8, color: iconColor }}>
              Cerrar
            </ThemedText>
          </Pressable>
        </Animated.View>
      </View>

      <View style={styles.mapContainer}>
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
      </View>

      <View style={styles.plansContainer}>
        <ThemedText type="subtitle" style={styles.plansTitle}>
          Planes Cercanos
        </ThemedText>
        <FlatList
          data={MOCK_PLANS}
          renderItem={({ item }) => (
            <View style={styles.planItemWrapper}>
              <PlanItem item={item} />
            </View>
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchSection: {
    padding: 10,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 3,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  filtersContainer: {
    paddingVertical: 10,
  },
  mapContainer: {
    flex: 2,
    marginHorizontal: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  plansContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  plansTitle: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  planItemWrapper: {
    marginBottom: 10,
  },
});