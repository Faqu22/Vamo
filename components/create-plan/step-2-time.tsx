import { ScrollView, StyleSheet, View } from 'react-native';

import { OptionButton } from '@/components/ui/option-button';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { NewPlan } from '@/types/new-plan';

interface Props {
  planData: Partial<NewPlan>;
  setPlanData: React.Dispatch<React.SetStateAction<Partial<NewPlan>>>;
}

const WHEN_OPTIONS: NewPlan['when'][] = ['Ahora', 'Próx 3 h', 'Esta noche'];
const DURATION_OPTIONS = [20, 30, 45, 60];

export function Step2Time({ planData, setPlanData }: Props) {
  const secondaryTextColor = useThemeColor({}, 'icon');
  const primaryColor = useThemeColor({}, 'primary');

  return (
    <ScrollView style={styles.container}>
      <ThemedText type="title">Cuándo y cuánto dura</ThemedText>
      <ThemedText style={[styles.subtitle, { color: secondaryTextColor }]}>
        Podés cambiarlo después
      </ThemedText>

      <ThemedText style={styles.label}>Cuándo</ThemedText>
      <View style={styles.optionsContainer}>
        {WHEN_OPTIONS.map((item) => (
          <OptionButton
            key={item}
            label={item}
            isActive={planData.when === item}
            onPress={() => setPlanData((prev) => ({ ...prev, when: item }))}
          />
        ))}
      </View>

      <ThemedText style={styles.label}>
        Duración{' '}
        <ThemedText style={{ color: primaryColor, fontWeight: 'bold' }}>
          {planData.duration} min
        </ThemedText>
      </ThemedText>
      <View style={styles.optionsContainer}>
        {DURATION_OPTIONS.map((item) => (
          <OptionButton
            key={item}
            label={`${item}'`}
            isActive={planData.duration === item}
            onPress={() => setPlanData((prev) => ({ ...prev, duration: item }))}
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
  label: {
    fontWeight: '600',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: -4,
  },
});