import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PlanDetailModal } from '@/components/modals/plan-detail-modal';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { FilterButton } from '@/components/ui/filter-button';
import { FloatingActionButton } from '@/components/ui/floating-action-button';
import { IconSymbol, IconSymbolName } from '@/components/ui/icon-symbol';
import { PlanItem } from '@/components/ui/plan-item';
import { UserLocationMarker } from '@/components/ui/user-location-marker';
import { usePlans } from '@/hooks/use-plans';
import { useThemeColor } => '@/hooks/use-theme-color';
import { INTERESTS } from '@/mocksdata/interests';
import { Plan } from '@/types/plan';

const BOTTOM_SHEET_TOP_OFFSET = 100; // Distancia desde la parte superior de la pantalla cuando está completamente expandido
const TAB_BAR_HEIGHT = 80; // Altura aproximada de la barra de navegación inferior
const MIN_SHEET_HEIGHT_PX = 250; // Altura mínima fija para el estado colapsado del menú

const PLAN_ICONS: Record<string, IconSymbolName> = {
  sport: 'person.2.fill',
  social: 'person.2.fill',
  culture: 'person.2.fill',
};

export default function HomeScreen() {
  const router = useRouter();
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'border');
  const iconColor = useThemeColor({}, 'icon');
  const backgroundColor = useThemeColor({}, 'background');
  const grabberColor = useThemeColor({ light: '#ccc', dark: '#555' }, 'icon');
  const primaryColor = useThemeColor({}, 'primary');

  const [isFiltersVisible, setFiltersVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);

  const insets = useSafeAreaInsets();

  const { plans, isLoading: isLoadingPlans } = usePlans({
    latitude: userLocation?.coords.latitude,
    longitude: userLocation?.coords.longitude,
    interests: activeFilters,
    activity: searchQuery,
  });

  const mapRef = useRef<MapView>(null);
  const animatedFilterHeight = useSharedValue(0);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);
    })();
  }, []);

  const { height: SCREEN_HEIGHT } = useWindowDimensions();

  // Altura total que ocupan la barra de navegación y el área segura inferior
  const bottomOffset = TAB_BAR_HEIGHT + insets.bottom;

  // Altura mínima visible del menú (colapsado)
  const minSheetHeight = MIN_SHEET_HEIGHT_PX;
  // Altura máxima del menú (expandido), desde su 'bottom' hasta el 'BOTTOM_SHEET_TOP_OFFSET'
  const maxSheetHeight = SCREEN_HEIGHT - BOTTOM_SHEET_TOP_OFFSET - bottomOffset;

  const sheetHeight = useSharedValue(minSheetHeight); // La altura inicial del menú es la mínima
  const context = useSharedValue({ height: minSheetHeight });

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { height: sheetHeight.value };
    })
    .onUpdate((event) => {
      const newHeight = context.value.height - event.translationY;
      sheetHeight.value = Math.max(minSheetHeight, Math.min(maxSheetHeight, newHeight));
    })
    .onEnd(() => {
      const midpoint = (minSheetHeight + maxSheetHeight) / 2;
      if (sheetHeight.value > midpoint) {
        sheetHeight.value = withTiming(maxSheetHeight, {
          duration: 300,
          easing: Easing.out(Easing.quad),
        });
      } else {
        sheetHeight.value = withTiming(minSheetHeight, {
          duration: 300,
          easing: Easing.out(Easing.quad),
        });
      }
    });

  const bottomSheetStyle = useAnimatedStyle(() => ({
    height: sheetHeight.value,
  }));

  const animatedFilterSectionStyle = useAnimatedStyle(() => ({
    height: animatedFilterHeight.value,
    opacity: withTiming(animatedFilterHeight.value > 0 ? 1 : 0, { duration: 150 }),
    overflow: 'hidden',
  }));

  useEffect(() => {
    animatedFilterHeight.value = withTiming(isFiltersVisible ? 100 : 0, {
      duration: 300,
    });
  }, [isFiltersVisible]);

  const toggleFilter = (interest: string) => {
    setActiveFilters((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const centerOnUserLocation = () => {
    if (mapRef.current && userLocation) {
      mapRef.current.animateToRegion(
        {
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        },
        1000
      );
    }
  };

  const mapRegion = userLocation
    ? {
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    : {
        latitude: -34.967132,
        longitude: -54.948601,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };

  return (
    <ThemedView style={styles.container}>
      <MapView ref={mapRef} style={styles.map} region={mapRegion}>
        {userLocation && (
          <Marker coordinate={userLocation.coords} title="Tu Ubicación">
            <UserLocationMarker />
          </Marker>
        )}
        {plans?.map((plan) => (
          <Marker
            key={plan.id}
            coordinate={{
              latitude: plan.location_latitude,
              longitude: plan.location_longitude
            }}
            title={plan.activity}
            onPress={() => setSelectedPlan(plan)}
          >
            <View style={[styles.markerContainer, { backgroundColor: primaryColor }]}>
              <IconSymbol
                name={'person.2.fill'}
                color="#fff"
                size={18}
              />
            </View>
          </Marker>
        ))}
      </MapView>

      <FloatingActionButton
        iconName="location.fill"
        onPress={centerOnUserLocation}
        bottomPosition={bottomOffset + 20} // Ajustado para estar por encima del menú colapsado
        side="left"
      />
      <FloatingActionButton
        iconName="plus"
        onPress={() => router.push('/(create-plan)/step1')}
        bottomPosition={bottomOffset + 20} // Ajustado para estar por encima del menú colapsado
        side="right"
      />

      <View style={[styles.searchSection, { backgroundColor }]}>
        <View style={[styles.searchBar, { backgroundColor: cardColor, borderColor }]}>
          <IconSymbol name="magnifyingglass" color={iconColor} size={20} />
          <TextInput
            placeholder="¿Qué te pintó hacer hoy?"
            placeholderTextColor="#999"
            style={[styles.input, { color: textColor }]}
            onFocus={() => setFiltersVisible(true)}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <Animated.View style={animatedFilterSectionStyle}>
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
            {
              backgroundColor: cardColor,
              bottom: bottomOffset, // Anclado a la parte inferior
              zIndex: 20,
            },
            bottomSheetStyle, // Aplica la altura animada
          ]}
        >
          <View style={[styles.line, { backgroundColor: grabberColor }]} />
          <ThemedText type="subtitle" style={styles.plansTitle}>
            Planes Cercanos
          </ThemedText>
          {isLoadingPlans ? (
            <ActivityIndicator style={{ marginTop: 20 }} color={primaryColor} />
          ) : (
            <FlatList
              data={plans || []}
              renderItem={({ item }) => (
                <View style={styles.planItemWrapper}>
                  <PlanItem item={item} onPress={() => setSelectedPlan(item)} />
                </View>
              )}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 50 }}
            />
          )}
        </Animated.View>
      </GestureDetector>

      {selectedPlan && (
        <PlanDetailModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
      )}
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
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
  bottomSheetContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 20,
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
  markerContainer: {
    padding: 8,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});