import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import MapView, { MapPressEvent, Marker } from 'react-native-maps';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { MOCK_LOCATION_RESULTS, LocationSearchResult } from '@/mocksdata/locations';
import { NewPlan } from '@/types/new-plan';

interface Props {
  planData: Partial<NewPlan>;
  setPlanData: React.Dispatch<React.SetStateAction<Partial<NewPlan>>>;
}

const BUENOS_AIRES_REGION = {
  latitude: -34.6037,
  longitude: -58.3816,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export function Step3Location({ planData, setPlanData }: Props) {
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'border');
  const iconColor = useThemeColor({}, 'icon');

  const [searchQuery, setSearchQuery] = useState(planData.location?.name || '');
  const [searchResults, setSearchResults] = useState<LocationSearchResult[]>([]);
  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
  const mapRef = useRef<MapView>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);
    })();
  }, []);

  useEffect(() => {
    if (userLocation && !planData.location) {
      mapRef.current?.animateToRegion(
        {
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        1000
      );
    }
  }, [userLocation]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.length > 2) {
      const filteredResults = MOCK_LOCATION_RESULTS.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectLocation = (location: LocationSearchResult) => {
    setPlanData((prev) => ({
      ...prev,
      location: {
        name: location.name,
        address: location.address,
        latitude: location.coordinate.latitude,
        longitude: location.coordinate.longitude,
      },
    }));
    setSearchQuery(location.name);
    setSearchResults([]);
    Keyboard.dismiss();
    mapRef.current?.animateToRegion({
      ...location.coordinate,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  const handleMapPress = async (event: MapPressEvent) => {
    const { coordinate } = event.nativeEvent;
    setSearchResults([]);
    Keyboard.dismiss();

    let locationName = 'Ubicación en el mapa';
    let locationAddress = `${coordinate.latitude.toFixed(4)}, ${coordinate.longitude.toFixed(4)}`;

    try {
      const results = await Location.reverseGeocodeAsync(coordinate);
      if (results.length > 0) {
        const addr = results[0];
        locationName = addr.name || `${addr.street || ''} ${addr.streetNumber || ''}`.trim();
        locationAddress = `${addr.city || ''}, ${addr.region || ''}`.trim();
      }
    } catch (error) {
      console.error('Reverse geocoding failed', error);
    }

    setPlanData((prev) => ({
      ...prev,
      location: {
        name: locationName,
        address: locationAddress,
        ...coordinate,
      },
    }));
    setSearchQuery(locationName);
  };

  const handleClearLocation = () => {
    setPlanData((prev) => ({ ...prev, location: undefined, locationDescription: '' }));
    setSearchQuery('');
    setSearchResults([]);
    if (userLocation) {
      mapRef.current?.animateToRegion({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  const getInitialRegion = () => {
    if (planData.location) {
      return {
        latitude: planData.location.latitude,
        longitude: planData.location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
    }
    if (userLocation) {
      return {
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
    }
    return BUENOS_AIRES_REGION;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}
    >
      <ScrollView
        ref={scrollViewRef}
        style={styles.container}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <ThemedText type="title">¿Dónde nos encontramos?</ThemedText>
        <View style={styles.searchContainer}>
          <View style={[styles.searchBar, { backgroundColor: cardColor, borderColor }]}>
            <IconSymbol name="magnifyingglass" color={iconColor} size={20} />
            <TextInput
              placeholder="Buscar lugar o dirección"
              placeholderTextColor="#999"
              style={[styles.input, { color: textColor }]}
              value={searchQuery}
              onChangeText={handleSearch}
            />
            {planData.location && (
              <Pressable onPress={handleClearLocation} style={styles.clearButton}>
                <IconSymbol name="xmark.circle.fill" color={iconColor} size={20} />
              </Pressable>
            )}
          </View>
          {searchResults.length > 0 && (
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Pressable
                  style={[styles.resultItem, { borderBottomColor: borderColor }]}
                  onPress={() => handleSelectLocation(item)}
                >
                  <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
                  <ThemedText style={{ fontSize: 14, color: iconColor }}>{item.address}</ThemedText>
                </Pressable>
              )}
              style={[styles.resultsList, { backgroundColor: cardColor, borderColor }]}
            />
          )}
        </View>

        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={getInitialRegion()}
          onPress={handleMapPress}
          showsUserLocation
        >
          {planData.location && (
            <Marker
              coordinate={{
                latitude: planData.location.latitude,
                longitude: planData.location.longitude,
              }}
            />
          )}
        </MapView>

        <ThemedText style={styles.label}>Descripción (opcional)</ThemedText>
        <TextInput
          placeholder="Ej: Nos vemos en la puerta principal"
          placeholderTextColor="#999"
          value={planData.locationDescription}
          onChangeText={(text) => setPlanData((prev) => ({ ...prev, locationDescription: text }))}
          style={[
            styles.descriptionInput,
            { color: textColor, borderColor, backgroundColor: cardColor },
          ]}
          multiline
          onFocus={() => {
            setTimeout(() => {
              scrollViewRef.current?.scrollToEnd({ animated: true });
            }, 100);
          }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    width: '100%',
  },
  searchContainer: {
    marginTop: 20,
    zIndex: 10,
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
  clearButton: {
    padding: 5,
    marginLeft: 5,
  },
  resultsList: {
    position: 'absolute',
    top: 55,
    left: 0,
    right: 0,
    maxHeight: 200,
    borderRadius: 15,
    borderWidth: 1,
  },
  resultItem: {
    padding: 15,
    borderBottomWidth: 1,
  },
  map: {
    height: 250,
    borderRadius: 15,
    marginTop: 20,
    overflow: 'hidden',
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  descriptionInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
  },
});