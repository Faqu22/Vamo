import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';
import { MOCK_ACTIVE_USERS } from '@/mocksdata/active-users';
import { MOCK_PLANS } from '@/mocksdata/plans';
import { Link } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Keyboard,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import MapView, { Marker } from 'react-native-maps';

type GenderFilter = 'male' | 'female' | 'other' | null;

export default function HomeScreen() {
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const primaryColor = useThemeColor({}, 'primary');
  const borderColor = useThemeColor({}, 'border');
  const iconColor = useThemeColor({}, 'icon');

  const [genderFilter, setGenderFilter] = useState<GenderFilter>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const filteredUsers = useMemo(() => {
    if (!genderFilter) {
      return MOCK_ACTIVE_USERS;
    }
    return MOCK_ACTIVE_USERS.filter((user) => user.gender === genderFilter);
  }, [genderFilter]);

  const handleGenderFilterToggle = () => {
    const genders: GenderFilter[] = [null, 'female', 'male', 'other'];
    const currentIndex = genders.indexOf(genderFilter);
    const nextIndex = (currentIndex + 1) % genders.length;
    setGenderFilter(genders[nextIndex]);
  };

  const getGenderFilterText = () => {
    if (genderFilter === 'female') return 'Sexo: Femenino';
    if (genderFilter === 'male') return 'Sexo: Masculino';
    if (genderFilter === 'other') return 'Sexo: Otro';
    return 'Sexo';
  };

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(isInputFocused ? 105 : 0, {
        duration: 300,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
      opacity: withTiming(isInputFocused ? 1 : 0, {
        duration: 250,
      }),
    };
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.upperContainer}>
          <ThemedText type="title" style={styles.title}>
            ¿Qué pinta hoy?
          </ThemedText>

          <TextInput
            placeholder="Fútbol, tomar algo, ir al cine..."
            placeholderTextColor="#999"
            style={[styles.input, { backgroundColor: cardColor, color: textColor, borderColor }]}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />

          <Animated.View style={[styles.animatedWrapper, animatedContainerStyle]}>
            <View style={styles.filtersContainer}>
              <Pressable style={[styles.filterButton, { backgroundColor: cardColor, borderColor }]}>
                <ThemedText style={styles.filterButtonText}>Edad</ThemedText>
              </Pressable>
              <Pressable
                onPress={handleGenderFilterToggle}
                style={[
                  styles.filterButton,
                  { backgroundColor: cardColor, borderColor },
                  genderFilter ? { backgroundColor: primaryColor, borderColor: primaryColor } : {},
                ]}
              >
                <ThemedText
                  style={[styles.filterButtonText, genderFilter ? { color: '#fff' } : {}]}
                >
                  {getGenderFilterText()}
                </ThemedText>
              </Pressable>
              <Pressable style={[styles.filterButton, { backgroundColor: cardColor, borderColor }]}>
                <ThemedText style={styles.filterButtonText}>Intereses</ThemedText>
              </Pressable>
            </View>

            <View style={[styles.counterContainer, { backgroundColor: cardColor, borderColor }]}>
              <IconSymbol name="person.2.fill" color={iconColor} size={20} />
              <ThemedText style={styles.counterText}>
                {filteredUsers.length} personas activas ahora
              </ThemedText>
            </View>
          </Animated.View>

          <Pressable style={[styles.mainButton, { backgroundColor: cardColor }]}>
            <ThemedText style={[styles.buttonText, { color: textColor }]}>
              Estoy para cualquiera
            </ThemedText>
          </Pressable>
        </ThemedView>

        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: -34.58,
              longitude: -58.42,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            scrollEnabled={false}
            zoomEnabled={false}
          >
            {MOCK_PLANS.map((plan) => (
              <Marker key={plan.id} coordinate={plan.coordinate} title={plan.title} />
            ))}
          </MapView>
          <Link href="/map" asChild>
            <Pressable
              style={[
                styles.mapButton,
                { backgroundColor: cardColor, borderWidth: 1, borderColor },
              ]}
            >
              <IconSymbol name="checkmark.circle.fill" color="#4CAF50" size={22} />
              <ThemedText style={[styles.buttonText, { color: textColor }]}>
                {MOCK_PLANS.length} planes activos cerca
              </ThemedText>
            </Pressable>
          </Link>
        </View>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperContainer: {
    flex: 2.5,
    justifyContent: 'center',
    padding: 20,
    gap: 15,
  },
  mapContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  animatedWrapper: {
    gap: 15,
    overflow: 'hidden',
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  counterText: {
    fontSize: 16,
    fontWeight: '600',
  },
  mainButton: {
    width: '100%',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  mapButton: {
    flexDirection: 'row',
    gap: 10,
    position: 'absolute',
    bottom: 20,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 5,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});