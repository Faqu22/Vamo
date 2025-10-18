import React, { useState } from 'react';
import { Keyboard, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { FilterButton } from '@/components/ui/filter-button';
import { IconSymbol } from '@/components/ui/icon-symbol';
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
        {isFiltersVisible && (
          <>
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
          </>
        )}
      </View>

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
    zIndex: 10, // Ensure it's above the map
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
  map: {
    flex: 1,
  },
});