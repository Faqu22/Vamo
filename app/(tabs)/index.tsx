import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { FilterButton } from '@/components/ui/filter-button';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { PlanItem } from '@/components/ui/plan-item';
import { useThemeColor } from '@/hooks/use-theme-color';
import { INTERESTS } from '@/mocksdata/interests';
import { MOCK_PLANS } from '@/mocksdata/plans';

const BOTTOM_SHEET_TOP_OFFSET = 100; // Espacio en la parte superior cuando está expandido

export default function HomeScreen() {
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'border');
  const iconColor = useThemeColor({}, 'icon');
  const backgroundColor = useThemeColor({}, 'background');
  const grabberColor = useThemeColor({ light: '#ccc', dark: '#555' }, 'icon');

  const [isFiltersVisible, setFiltersVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const animatedHeight = useSharedValue(0);

  // --- Lógica del panel deslizable ---
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const COLLAPSED_HEIGHT = SCREEN_HEIGHT / 3;
  const EXPANDED_TRANSLATE_Y = -SCREEN_HEIGHT + BOTTOM_SHEET_TOP_OFFSET;
  const COLLAPSED_TRANSLATE_Y = -COLLAPSED_HEIGHT;

  const translateY = useSharedValue(COLLAPSED_TRANSLATE_Y);
  const context = useSharedValue({ y: 0 });

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = context.value.y + event.translationY;
      // Limitar el arrastre para que no se salga de los límites
      translateY.value = Math.max(translateY.value, EXPANDED_TRANSLATE_Y);
      translateY.value = Math.min(translateY.value, COLLAPSED_TRANSLATE_Y);
    })
    .onEnd(() => {
      // Animar al punto más cercano (expandido o contraído)
      if (translateY.value < -SCREEN_HEIGHT / 2) {
        translateY.value = withSpring(EXPANDED_TRANSLATE_Y, { damping: 30 });
      } else {
        translateY.value = withSpring(COLLAPSED_TRANSLATE_Y, { damping: 30 });
      }
    });

  const bottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });
  // --- Fin de la lógica del panel ---

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

      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            styles.bottomSheetContainer,
            { backgroundColor: cardColor, top: SCREEN_HEIGHT },
            bottomSheetStyle,
          ]}
        >
          <View style={[styles.line, { backgroundColor: grabberColor }]} />
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
            contentContainerStyle={{ paddingBottom: 50 }}
          />
        </Animated.View>
      </GestureDetector>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchSection: {
    padding: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
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
  // Bottom Sheet styles
  bottomSheetContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    borderRadius: 25,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 5,
  },
  line: {
    width: 75,
    height: 4,
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2,
  },
  plansTitle: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  planItemWrapper: {
    marginBottom: 10,
    marginHorizontal: 20,
  },
});