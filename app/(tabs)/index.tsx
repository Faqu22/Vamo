import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
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
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { PlanDetailModal } from '@/components/modals/plan-detail-modal';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { FilterButton } from '@/components/ui/filter-button';
import { FloatingActionButton } from '@/components/ui/floating-action-button';
import { IconSymbol, IconSymbolName } from '@/components/ui/icon-symbol';
import { PlanItem } from '@/components/ui/plan-item';
import { UserLocationMarker } from '@/components/ui/user-location-marker';
import { useAuth } from '@/contexts/auth-context';
import { usePlans } from '@/hooks/use-plans';
import { useProfile } from '@/hooks/use-profile';
import { useThemeColor } from '@/hooks/use-theme-color';
import { INTERESTS } from '@/mocksdata/interests';
import { Plan } from '@/types/plan';

const BOTTOM_SHEET_TOP_OFFSET = 100;
const TAB_BAR_HEIGHT = 80; // Altura aproximada de la barra de navegación inferior

const PLAN_ICONS: Record<string, IconSymbolName> = {
  sport: 'person.2.fill',
  social: 'person.2.fill',
  culture: 'person.2.fill',
};

export default function HomeScreen() {
  const router = useRouter();
  const { authenticated } = useAuth();
  const { user } = useProfile();
  
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

  const { plans, isLoading: isLoadingPlans } = usePlans({
    latitude: userLocation?.coords.latitude,
    longitude: userLocation?.coords.longitude,
    interests: activeFilters,
    activity: searchQuery,
  });

  const mapRef = useRef<MapView>(null);
  const animatedHeight = useSharedValue(0);

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
      translateY.value = Math.max(translateY.value, EXPANDED_TRANSLATE_Y);
      translateY.value = Math.min(translateY.value, COLLAPSED_TRANSLATE_Y);
    })
    .onEnd(() => {
      if (translateY.value < -SCREEN_HEIGHT / 2) {
        translateY.value = withTiming(EXPANDED_TRANSLATE_Y, {
          duration: 300,
          easing: Easing.out(Easing.quad),
        });
      } else {
        translateY.value = withTiming(COLLAPSED_TRANSLATE_Y, {
          duration: 300,
          easing: Easing.out(Easing.quad),
        });
      }
    });

  const bottomSheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const animatedStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
    opacity: withTiming(animatedHeight.value > 0 ? 1 : 0, { duration: 150 }),
    overflow: 'hidden',
  }));

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

  const handleCreatePlanPress = () => {
    if (authenticated && user) {
      router.push('/(create-plan)/step1');
    } else {
      Alert.alert(
        'Registro Requerido',
        'Para crear un plan, necesitás registrarte o iniciar sesión.',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Iniciar Sesión',
            onPress: () => router.push('/login'),
          },
          {
            text: 'Registrarse',
            onPress: () => router.push('/register'),
          },
        ]
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
              longitude: plan.location_longitude,
            }}
            title={plan.activity}
            onPress={() => setSelectedPlan(plan)}
          >
            <View style={[styles.markerContainer, { backgroundColor: primaryColor }]}>
              <IconSymbol name={'person.2.fill'} color="#fff" size={18} />
            </View>
          </Marker>
        ))}
      </MapView>

      <FloatingActionButton
        iconName="location.fill"
        onPress={centerOnUserLocation}
        bottomPosition={TAB_BAR_HEIGHT + 20}
        side="left"
      />
      <FloatingActionButton
        iconName="plus"
        onPress={handleCreatePlanPress}
        bottomPosition={TAB_BAR_HEIGHT + 20}
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
            { backgroundColor: cardColor, top: SCREEN_HEIGHT, zIndex: 20 },
            bottomSheetStyle,
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
    height: '100%',
    width: '100%',
    position: 'absolute',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
  markerContainer: {
    padding: 8,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});