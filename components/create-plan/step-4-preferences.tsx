import { Alert, Pressable, ScrollView, StyleSheet, Switch, TextInput, View } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { OptionButton } from '@/components/ui/option-button';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { NewPlan } from '@/types/new-plan';
import { Select } from '../ui/select';

interface Props {
  planData: Partial<NewPlan>;
  setPlanData: React.Dispatch<React.SetStateAction<Partial<NewPlan>>>;
}

const GENDER_OPTIONS: { label: string; value: NewPlan['genderPreference'] }[] = [
  { label: 'Sin preferencia', value: 'any' },
  { label: 'Masculino', value: 'male' },
  { label: 'Femenino', value: 'female' },
];
const VISIBILITY_OPTIONS: NewPlan['visibility'][] = ['Público', 'Con Aprobación'];
const VISIBILITY_DESCRIPTIONS: Record<NewPlan['visibility'], string> = {
  Público: 'Cualquier persona puede ver y unirse a tu plan.',
  'Con Aprobación': 'Las personas solicitan unirse y vos aceptás o rechazás.',
};

export function Step4Preferences({ planData, setPlanData }: Props) {
  const primaryColor = useThemeColor({}, 'primary');
  const cardColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');
  const textColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');
  const secondaryTextColor = useThemeColor({}, 'icon');

  const handleAgeChange = (field: 'min' | 'max', value: string) => {
    const numValue = Number(value);
    if (!isNaN(numValue)) {
      setPlanData((prev) => ({
        ...prev,
        ageRange: { ...prev.ageRange!, [field]: numValue },
      }));
    }
  };

  const showFlexibilityInfo = () => {
    Alert.alert(
      '¿Qué es un plan flexible?',
      'Un plan flexible indica que la actividad principal es una sugerencia, pero el grupo está abierto a otras ideas que puedan surgir en el momento.'
    );
  };

  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.contentContainer}
    >
      <ThemedText type="title">Preferencias del plan</ThemedText>

      <ThemedText style={styles.label}>Cupo (incluyéndote)</ThemedText>
      <TextInput
        style={[styles.input, { backgroundColor: cardColor, borderColor, color: textColor }]}
        keyboardType="numeric"
        value={String(planData.capacity)}
        onChangeText={(text) =>
          setPlanData((prev) => ({ ...prev, capacity: Number(text) || 0 }))
        }
      />

      <ThemedText style={styles.label}>Preferencia de género</ThemedText>
      <Select
        options={GENDER_OPTIONS}
        selectedValue={planData.genderPreference!}
        onValueChange={(value) => setPlanData((prev) => ({ ...prev, genderPreference: value }))}
      />

      <ThemedText style={styles.label}>Rango de edad</ThemedText>
      <View style={styles.ageRangeContainer}>
        <TextInput
          style={[styles.input, styles.ageInput, { backgroundColor: cardColor, borderColor, color: textColor }]}
          keyboardType="numeric"
          placeholder="Mín."
          value={String(planData.ageRange?.min)}
          onChangeText={(text) => handleAgeChange('min', text)}
        />
        <ThemedText style={styles.ageSeparator}>-</ThemedText>
        <TextInput
          style={[styles.input, styles.ageInput, { backgroundColor: cardColor, borderColor, color: textColor }]}
          keyboardType="numeric"
          placeholder="Máx."
          value={String(planData.ageRange?.max)}
          onChangeText={(text) => handleAgeChange('max', text)}
        />
      </View>

      <View style={[styles.row, { backgroundColor: cardColor, borderColor, marginTop: 20 }]}>
        <View style={styles.flexibleLabelContainer}>
          <ThemedText>Plan flexible</ThemedText>
          <Pressable onPress={showFlexibilityInfo} style={styles.infoIcon}>
            <IconSymbol name="questionmark.circle.fill" size={20} color={iconColor} />
          </Pressable>
        </View>
        <Switch
          value={planData.isFlexible}
          onValueChange={(value) => setPlanData((prev) => ({ ...prev, isFlexible: value }))}
          trackColor={{ false: '#767577', true: primaryColor }}
          thumbColor={'#f4f3f4'}
        />
      </View>

      <ThemedText style={styles.label}>Visibilidad</ThemedText>
      <View style={styles.visibilityOptionsContainer}>
        {VISIBILITY_OPTIONS.map((item) => (
          <View key={item} style={styles.visibilityOptionWrapper}>
            <OptionButton
              label={item}
              isActive={planData.visibility === item}
              onPress={() => setPlanData((prev) => ({ ...prev, visibility: item }))}
              fullWidth
            />
            <ThemedText style={[styles.visibilityDescription, { color: secondaryTextColor }]}>
              {VISIBILITY_DESCRIPTIONS[item]}
            </ThemedText>
          </View>
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
  contentContainer: {
    paddingBottom: 40,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },
  visibilityOptionsContainer: {
    gap: 15,
  },
  visibilityOptionWrapper: {
    flex: 1,
  },
  visibilityDescription: {
    fontSize: 14,
    marginTop: 6,
    paddingHorizontal: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  ageRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ageInput: {
    flex: 1,
    textAlign: 'center',
  },
  ageSeparator: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  flexibleLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    marginLeft: 8,
  },
});