import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';
import { StyleSheet, TextInput, Pressable } from 'react-native';

export default function HomeScreen() {
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const primaryColor = useThemeColor({}, 'primary');
  const borderColor = useThemeColor({}, 'border');

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        ¿Qué pinta hoy?
      </ThemedText>

      <TextInput
        placeholder="Fútbol, tomar algo, ir al cine..."
        placeholderTextColor="#999"
        style={[styles.input, { backgroundColor: cardColor, color: textColor, borderColor }]}
      />

      <Pressable style={styles.button}>
        <ThemedText style={styles.buttonText}>Estoy para cualquiera</ThemedText>
      </Pressable>

      <ThemedView style={styles.separator}>
        <ThemedView style={[styles.line, { backgroundColor: borderColor }]} />
        <ThemedText style={styles.separatorText}>o</ThemedText>
        <ThemedView style={[styles.line, { backgroundColor: borderColor }]} />
      </ThemedView>

      <Pressable style={[styles.button, styles.mapButton, { backgroundColor: primaryColor }]}>
        <IconSymbol name="map.fill" color="#fff" size={20} />
        <ThemedText style={[styles.buttonText, { color: '#fff' }]}>
          Abrir mapa de planes
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
    width: '100%',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e9e9e9',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  mapButton: {
    flexDirection: 'row',
    gap: 10,
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
  },
  separatorText: {
    marginHorizontal: 10,
    color: '#999',
  },
});