import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';
import { MOCK_PLANS } from '@/mocksdata/plans';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function HomeScreen() {
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const primaryColor = useThemeColor({}, 'primary');
  const borderColor = useThemeColor({}, 'border');

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.upperContainer}>
        <ThemedText type="title" style={styles.title}>
          ¿Qué pinta hoy?
        </ThemedText>

        <TextInput
          placeholder="Fútbol, tomar algo, ir al cine..."
          placeholderTextColor="#999"
          style={[styles.input, { backgroundColor: cardColor, color: textColor, borderColor }]}
        />

        <Pressable style={[styles.button, { backgroundColor: cardColor }]}>
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
          <Pressable style={[styles.button, styles.mapButton, { backgroundColor: primaryColor }]}>
            <IconSymbol name="map.fill" color="#fff" size={20} />
            <ThemedText style={[styles.buttonText, { color: '#fff' }]}>
              Abrir mapa de planes
            </ThemedText>
          </Pressable>
        </Link>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperContainer: {
    flex: 2,
    justifyContent: 'center',
    padding: 20,
  },
  mapContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    width: '90%',
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
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});