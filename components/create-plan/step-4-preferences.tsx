import { ScrollView, StyleSheet, Switch, View } from 'react-native';

import { OptionButton } from '@/components/ui/option-button';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { NewPlan } from '@/types/new-plan';

interface Props {
  planData: Partial<NewPlan>;
  setPlanData: React.Dispatch<React.SetStateAction<Partial<NewPlan>>>;
}

const CAPACITY_OPTIONS: NewPlan['capacity'][] = ['1:1', 3, 4, 6];
const VISIBILITY_OPTIONS: NewPlan['visibility'][] = ['Público', 'Solo por invitación'];

export function Step4Preferences({ planData, setPlanData }: Props) {
  const primaryColor = useThemeColor({}, 'primary');
  const cardColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');

  return (
    <ScrollView style={styles.container}>
      <ThemedText type="title">Cupo y preferencias</ThemedText>

      <ThemedText style={styles.label}>Cupo</ThemedText>
      <View style={styles.optionsContainer}>
        {CAPACITY_OPTIONS.map((item) => (
          <OptionButton
            key={item}
            label={String(item)}
            isActive={planData.capacity === item}
            onPress={() => setPlanData((prev) => ({ ...prev, capacity: item }))}
          />
        ))}
      </View>

      <View style={[styles.row, { backgroundColor: cardColor, borderColor }]}>
        <ThemedText>Solo mujeres</ThemedText>
        <Switch
          value={planData.womenOnly}
          onValueChange={(value) => setPlanData((prev) => ({ ...prev, womenOnly: value }))}
          trackColor={{ false: '#767577', true: primaryColor }}
          thumbColor={'#f4f3f4'}
        />
      </View>

      <ThemedText style={styles.label}>Rango de edad</ThemedText>
      <View
        style={[
          styles.row,
          { backgroundColor: cardColor, borderColor, justifyContent: 'center', paddingVertical: 16 },
        ]}
      >
        <ThemedText>{planData.ageRange}</ThemedText>
      </View>

      <ThemedText style={styles.label}>Visibilidad</ThemedText>
      <View style={styles.optionsContainer}>
        {VISIBILITY_OPTIONS.map((item) => (
          <OptionButton
            key={item}
            label={item}
            isActive={planData.visibility === item}
            onPress={() => setPlanData((prev) => ({ ...prev, visibility: item }))}
            fullWidth
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 10,
  },
});