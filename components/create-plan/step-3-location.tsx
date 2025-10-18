import { ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { NewPlan } from '@/types/new-plan';

interface Props {
  planData: Partial<NewPlan>;
  setPlanData: React.Dispatch<React.SetStateAction<Partial<NewPlan>>>;
}

export function Step3Location({ planData, setPlanData }: Props) {
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'border');
  const iconColor = useThemeColor({}, 'icon');
  const backgroundColor = useThemeColor({ light: '#e9f6fc', dark: '#1c2a3a' }, 'background');

  return (
    <ScrollView style={styles.container}>
      <ThemedText type="title">¿Dónde nos encontramos?</ThemedText>
      <View style={[styles.searchBar, { backgroundColor: cardColor, borderColor }]}>
        <IconSymbol name="magnifyingglass" color={iconColor} size={20} />
        <TextInput
          placeholder="Buscar lugar cercano"
          placeholderTextColor="#999"
          style={[styles.input, { color: textColor }]}
          value={planData.location?.name}
          onChangeText={(text) =>
            setPlanData((prev) => ({
              ...prev,
              location: { ...prev.location, name: text, latitude: 0, longitude: 0 },
            }))
          }
        />
      </View>
      <View style={[styles.mapPlaceholder, { backgroundColor, borderColor }]}>
        <IconSymbol name="map.fill" color={iconColor} size={40} />
        <ThemedText style={{ color: iconColor, marginTop: 10 }}>Mini mapa</ThemedText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    marginTop: 20,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  mapPlaceholder: {
    height: 200,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
});