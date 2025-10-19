import { ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { OptionButton } from '@/components/ui/option-button';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { NewPlan } from '@/types/new-plan';

interface Props {
  planData: Partial<NewPlan>;
  setPlanData: React.Dispatch<React.SetStateAction<Partial<NewPlan>>>;
}

const SUGGESTIONS = [
  'Tomar un café',
  'Pasear al perro',
  'Jugar al fútbol',
  'Salir a correr',
  'Ver una película',
  'Probar un bar nuevo',
];

export function Step1Activity({ planData, setPlanData }: Props) {
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'border');
  const secondaryTextColor = useThemeColor({}, 'icon');

  const handleSelectSuggestion = (suggestion: string) => {
    setPlanData((prev) => ({ ...prev, activity: suggestion }));
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedText type="title">¿Qué querés hacer?</ThemedText>
      <ThemedText style={[styles.subtitle, { color: secondaryTextColor }]}>
        Podés escribir lo que quieras o elegir una sugerencia
      </ThemedText>
      <TextInput
        value={planData.activity}
        onChangeText={(text) => setPlanData((prev) => ({ ...prev, activity: text }))}
        placeholder="Ej.: café, fútbol 5, caminar, cine..."
        placeholderTextColor="#999"
        style={[styles.input, { color: textColor, borderColor, backgroundColor: cardColor }]}
      />
      <ThemedText style={styles.suggestionTitle}>Sugerencias</ThemedText>
      <View style={styles.suggestionsContainer}>
        {SUGGESTIONS.map((item) => (
          <OptionButton
            key={item}
            label={item}
            isActive={planData.activity === item}
            onPress={() => handleSelectSuggestion(item)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  suggestionTitle: {
    fontWeight: '600',
    marginBottom: 10,
  },
  suggestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: -4,
  },
});